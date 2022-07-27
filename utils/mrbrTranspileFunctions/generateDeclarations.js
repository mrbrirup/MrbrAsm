
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
        loop++;
        let quoteType = "";
        let endRegex = /[\w$]{1}/
        let match = null;
        if (indexOf > 0) {
            quoteType = text.substring(indexOf - 1, indexOf);
        }
        if (quoteType === '"' || quoteType === "'" || quoteType === "`") {
            indexOf++;
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
            indexOf++;
            textLength = text.length;
        }
        indexOf = text.indexOf(replaceText, indexOf);
        textLength = text.length;
    }
    textLength = text.length;

    return text;
}

exports.generateDeclarations = function (input, fileManifestEntries) {
    const importedReferences = [];
    //const regex = /(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)/gm;
    const regex = /(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?(\s*?|(\s*\/{2}\s*?(?<exclude>exclude)))$)/gm
    let importMatch;

    while ((importMatch = regex.exec(input)) !== null) {
        if (importMatch.index === regex.lastIndex) { regex.lastIndex++; }
        let assembly, exclude
        if (importMatch?.groups?.import) { assembly = importMatch?.groups?.assembly }
        exclude = importMatch?.groups?.exclude === "exclude";
        importedReferences.push({ assembly: assembly, exclude: exclude })
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
                startPosition = classDeclarationMatch?.index;
            let includeClassExtension = "\r\n";
            if (classDeclarationMatch.groups?.extends && classDeclarationMatch.groups?.baseClass) {
                let baseClass = classDeclarationMatch.groups?.baseClass;                
                if (importedReferences.map(importedReference => importedReference.assembly).indexOf(baseClass) > -1) {
                    includeClassExtension = (`\r\nvar mrbrClassExtension = (mrbr.entries["${classDeclarationMatch.groups?.baseClass}"]);\r\n`);
                }
                else {
                    includeClassExtension = (`\r\nvar mrbrClassExtension = (${classDeclarationMatch.groups?.baseClass});\r\n`);
                }
            }
            else {
                includeClassExtension = "";
            }
            if (includeClassExtension.length > 0) {
                classExtension = (` extends mrbrClassExtension `);
            } else {
                classExtension = "";
            }
            exportName = classDeclarationMatch?.groups?.exportName;
            if (exportName === mrbrBaseName) { isMrbrBase = true }
            const replaceText = `${includeClassExtension}let ${exportName} = ${exportType} ${classExtension}`
            declarationBody = splice(declarationBody, startPosition, classDeclarationMatch.groups.exportStatement.length - classDeclarationMatch.groups.end.length, replaceText)
            let findResult = findStartAndEndInFile(declarationBody, classDeclarationMatch.index);
            if (findResult.level !== 0) { throw new Error(`Block mismatch in ${classDeclarationMatch.groups?.exportName}`) }
            let postDeclarationProperties = declarationBody.substring(findResult.endPosition);
            declarationBody = declarationBody.substring(classDeclarationMatch.index, findResult.endPosition);

            //declarationBody = updateReferences(exportName, startPosition, declarationBody, exportName)
            declarationBody = updateReferences(exportName, startPosition+replaceText.length, declarationBody, exportName)
            importedReferences.forEach(entry => {
                let assemblyName = entry.assembly;
                declarationBody = updateReferences(assemblyName, 0, declarationBody, exportName)
            });

            declarationBody = `${declarationBody}\r\n${postDeclarationProperties}`
        }
    }

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
        declarationBody = updateReferences(exportName, exportFunctionMatch.index + exportFunctionMatch.groups.exportStatement.length, declarationBody, exportName)
        importedReferences.forEach(entry => {
            let assemblyName = entry.assembly;
            declarationBody = updateReferences(assemblyName, 0, declarationBody, exportName)
        });
    }

    if (!isMrbrBase) {
        output.push(`mrbr.loadManifest([`)
        output.push(importedReferences.filter(entry => entry.exclude === false).map(include => (`new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, "Mrbr", "${include.assembly}", null, false, false)`)).join(",\r\n"));
        output.push(`]).then(_ => {`)



    }
    output.push(declarationBody);
    if (!isMrbrBase) { output.push(`if (mrbr?.assembly?.get("${exportName}")) { let mrbrAsm = mrbr.asm["${exportName}"]; mrbrAsm ? mrbrAsm.result = ${exportName} : mrbrAsm = { file: null, result: ${exportName} }}`) }
    output.push("})");
    output.push("");
    return {
        declaration: declarationBody,
        importedReferences: importedReferences.filter(entry => entry.exclude === false).map(include => (`new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, "Mrbr", "${include.assembly}", null, false, false)`)).join(",\r\n"),
        //importedReferences: importedReferences.map(include => (`new mrbr.entries["Mrbr_IO_File"](mrbr.entries["Mrbr_IO_FileType"].Component, "Mrbr", "${include}", null, false, false)`)).join(",\r\n"),
        exportName: exportName
    }
}


