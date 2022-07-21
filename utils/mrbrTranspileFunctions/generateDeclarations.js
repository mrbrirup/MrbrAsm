
const { findStartAndEndInFile } = require("./findObjectStartAndEndInFile")

const mrbrBaseName = "MrbrBase"

splice = function (text, start, delCount, newSubStr) {
    return text.slice(0, start) + newSubStr + text.slice(start + Math.abs(delCount));
};

const notFound = -1;
function updateReferences(manifestEntry, startPosition, text, exportName) {

    const replaceText = `${manifestEntry}`
    let indexOf = startPosition + replaceText.length + 1;
    let loop = 0;
    let textLength = text.length;
    indexOf = text.indexOf(replaceText, indexOf);
    while (indexOf >= 0 && indexOf < textLength) {
        //while ((indexOf = text.indexOf(manifestEntry, indexOf)) !== notFound) {
        loop++;
        let quoteType = "";
        let endRegex = /[\w$]{1}/
        let match = null;
        //endRegex.lastIndex = 0;
        if (indexOf > 0) {
            quoteType = text.substring(indexOf - 1, indexOf);
        }
        //if(fullReferenceRegex.exec(text.substring(indexOf + manifestEntry.length , indexOf + manifestEntry.length + 1))   ) 
        //if (quoteType === '"' || quoteType === "'" || quoteType === "`" || quoteType === "$") {
        if (quoteType === '"' || quoteType === "'" || quoteType === "`") {
            //indexOf++;
            indexOf++;
            //indexOf+= replaceText.length;
        }
        else if ((match = endRegex.exec(text.substring(indexOf + manifestEntry.length, indexOf + manifestEntry.length + 1))) !== null) {
            indexOf++;
        }
        else if (manifestEntry === "MrbrBase" && exportName === "MrbrBase") {
            indexOf++;
        }
        else {

            let replaceReferenceText = `mrbr.entries["${replaceText}"]`;
            text = splice(text, indexOf, replaceText.length, replaceReferenceText);
            //indexOf = startPosition + replaceText.length + 1;
            indexOf++;
            textLength = text.length;
        }
        indexOf = text.indexOf(replaceText, indexOf);
        textLength = text.length;
    }
    textLength = text.length;

    //if (manifestEntry.children) {        manifestEntry.children.forEach(entry => text = updateReferences(entry, startPosition, text))    }
    return text;
}

exports.generateDeclarations = function (input, fileManifestEntries) {
    //console.log(fileManifestEntries)
    const importedReferences = [];
    const regex = /(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)/gm;

    // Alternative syntax using RegExp constructor
    // const regex = new RegExp('(^(?<import>import)\\s*\\{*\\s*(?<assembly>\\S*?)\\s*\\}*\\s*from\\s*(?<fileName>\'.*?\'|".*?")[\\s;]*?\\s*?$)', 'gm')

    let importMatch;

    while ((importMatch = regex.exec(input)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (importMatch.index === regex.lastIndex) { regex.lastIndex++; }
        if (importMatch?.groups?.import) {
            importedReferences.push(importMatch?.groups?.assembly)
        }
    }





    /*
    Export Classes
    */
    let classDeclarationRegex = /(?<exportStatement>(?<export>export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_$]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]*)?(?<end>\s*?){)/gm;
    classDeclarationRegex.lastIndex = 0,
        isMrbrBase = false;
    const output = [];
    let declarationBody = input;
    let referencedIncludes = [];
    let exportName;

    if ((classDeclarationMatch = classDeclarationRegex.exec(declarationBody)) != null && classDeclarationMatch.groups?.exportStatement) {
        if (classDeclarationMatch.groups?.exportStatement) {
            let exportType = classDeclarationMatch?.groups?.exportType,
                startPosition = classDeclarationMatch?.index,
                classExtension = classDeclarationMatch.groups?.extends && classDeclarationMatch.groups?.baseClass ? (` extends ${classDeclarationMatch.groups?.baseClass} `) : "";
            exportName = classDeclarationMatch?.groups?.exportName;
            if (exportName === mrbrBaseName) { isMrbrBase = true }
            const replaceText = `let ${exportName} = ${exportType} ${classExtension}`
            declarationBody = splice(declarationBody, startPosition, classDeclarationMatch.groups.exportStatement.length - classDeclarationMatch.groups.end.length, replaceText)
            //let findResult = findStartAndEndInFile(declarationBody, classDeclarationMatch.index + classDeclarationMatch.groups?.exportStatement.length - 1);
            let findResult = findStartAndEndInFile(declarationBody, classDeclarationMatch.index);
            if (findResult.level !== 0) { throw new Error(`Block mismatch in ${classDeclarationMatch.groups?.exportName}`) }
            let postDeclarationProperties = declarationBody.substring(findResult.endPosition);
            declarationBody = declarationBody.substring(classDeclarationMatch.index, findResult.endPosition);

            //console.log(fileManifestEntries.filter(entry => entry.objectName === exportName))
            //fileManifestEntries.filter(entry => entry.objectName === exportName)?.children?
            declarationBody = updateReferences(exportName, startPosition, declarationBody, exportName)
            importedReferences.forEach(entry => {
                declarationBody = updateReferences(entry, 0, declarationBody, exportName)
            });

            declarationBody = `${declarationBody}\r\n${postDeclarationProperties}`
        }
    }
    //console.log("exportName: ", exportName, importedReferences)


    /*
        Export Enums
    */
    const exportEnumRegex = /(?<exportStatement>(?<exportKeyword>export)\s+(?<variableType>var|const|let)\s+(?<exportName>[\w$]+)\s*(?<end>;|$))/gm;
    let exportEnumMatch = null;
    if ((exportEnumMatch = exportEnumRegex.exec(declarationBody)) !== null && exportEnumMatch?.groups?.exportStatement) {
        exportName = exportEnumMatch?.groups?.exportName;
        declarationBody = splice(declarationBody, exportEnumMatch.index, exportEnumMatch.groups?.exportStatement.length, `${exportEnumMatch.groups.variableType} ${exportEnumMatch.groups.exportName}${exportEnumMatch.groups.end}`)
    }

    /*
        Export Functions
    */
    const exportFunctionRegex = /(?<exportStatement>(?<exportKeyword>export)\s+(?<function>|function)\s+(?<exportName>[\w$]+)\s*(?<methodSignature>\((?<parameters>[\s\S]*)?\))\s*\{)/gm;
    let exportFunctionMatch = null;
    if ((exportFunctionMatch = exportFunctionRegex.exec(declarationBody)) !== null && exportFunctionMatch?.groups?.exportStatement) {
        exportName = exportFunctionMatch?.groups?.exportName;
        declarationBody = splice(declarationBody, exportFunctionMatch.index, exportFunctionMatch.groups?.exportStatement.length, `let ${exportFunctionMatch.groups.exportName} = function${exportFunctionMatch.groups.methodSignature}{`)
        declarationBody = updateReferences(exportName, exportFunctionMatch.index+exportFunctionMatch.groups.exportStatement.length, declarationBody, exportName)
        importedReferences.forEach(entry => {
            declarationBody = updateReferences(entry, 0, declarationBody, exportName)
        });
    }






    output.push(declarationBody);


    if (!isMrbrBase) {
        output.push(`if (mrbr?.assembly?.get("${exportName}")) { let mrbrAsm = mrbr.asm["${exportName}"]; mrbrAsm ? mrbrAsm.result = ${exportName} : mrbrAsm = { file: null, result: ${exportName} }}`)
        output.push("if(returnManifest) { return [");

        //output.push(fileManifestEntries.filter(entry => entry.objectName === exportName).map(include => (`new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, "Mrbr", "${include.objectName}", null, false, false)`)).join(",\r\n"));
        output.push(importedReferences.map(include => (`new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, "Mrbr", "${include}", null, false, false)`)).join(",\r\n"));
        output.push("];}");
    }

    //referencedIncludes.forEach(include => output.push(`setTimeout(() => { ${tempNamePrefix}${include.source} = null} , mrbr.entries["${mrbrBaseName}"].temporaryObjectTimeOut);`));
    output.push("");
    //output.push(`setTimeout(() => { ${mrbrBaseName} = null} , mrbr.entries["${mrbrBaseName}"].temporaryObjectTimeOut);`);
    return output.join("\r\n");
}


