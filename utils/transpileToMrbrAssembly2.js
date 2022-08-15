const fs = require("fs");
const path = require("path");
const { exit, getMaxListeners } = require("process");
const { MrbrTranspileFile } = require("./MrbrTranspileFile");
const args = require("yargs").argv;
//const regex = /^\/{3}\s*(?<mrbrTag>\<mrbr.*?\/\>)\s*$|(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)|(^(?<export>\s*export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]+)?(\s*{))/mg;
const typescriptFileExtension = ".ts";
const { generateManifest } = require("./mrbrTranspileFunctions/generateManifest");
var UglifyJS = require("uglify-js");


let { findStartAndEndInFile } = require("./mrbrTranspileFunctions/findObjectStartAndEndInFile");
const { isTemplateExpression } = require("typescript");
const { tokeniseTextBlocks } = require("./mrbrTranspileFunctions/tokeniseTextBlocks");

/*
    Get Paths
*/

let sourceFolder = args.source || null;
let destinationFolder = args.dest || null;
if (sourceFolder === null || destinationFolder == null) {
    console.log("Source and destination folders must be specified.")
    console.log(`Source: ${sourceFolder}`);
    console.log(`Destination: ${destinationFolder}`);
    exit(1)
}

let resolvedSourceFolder = path.resolve(sourceFolder);
let resolvedDestinationFolder = path.resolve(destinationFolder);
if (
    fs.existsSync(resolvedSourceFolder) === false ||
    fs.statSync(resolvedSourceFolder).isDirectory() === false
) {
    console.error(`Source Folder ${resolvedSourceFolder} does not exist`)
    exit(1)
}
if (
    fs.existsSync(resolvedDestinationFolder) === false ||
    fs.statSync(resolvedDestinationFolder).isDirectory() === false
) {
    console.error(`Destination Folder ${resolvedDestinationFolder} does not exist`)
    exit(1)
}
console.info(`transpile from ${resolvedSourceFolder} to ${resolvedDestinationFolder}`);

/*
    Get all files to transpile to MrbrAssembly
*/

const sourceFiles = [];
RecurseFolders(resolvedSourceFolder, sourceFiles);

function RecurseFolders(folder, files) {
    fs.readdirSync(folder).forEach(file => {
        const sourceAbsoluteFileName = path.join(folder, file);
        const javascriptSourceAbsoluteFileName = path.join(resolvedDestinationFolder, sourceAbsoluteFileName.substring(resolvedSourceFolder.length, sourceAbsoluteFileName.length - 2) + "js");
        const assemblyDestinationAbsoluteFileName = path.join(resolvedDestinationFolder, "asm", sourceAbsoluteFileName.substring(resolvedSourceFolder.length, sourceAbsoluteFileName.length - 2) + "js");
        if (fs.statSync(sourceAbsoluteFileName).isDirectory()) { return RecurseFolders(sourceAbsoluteFileName, files); }
        const extName = path.extname(sourceAbsoluteFileName).toLowerCase();
        if (extName === typescriptFileExtension) {
            const parseName = path.parse(sourceAbsoluteFileName).name;
            if (parseName?.length > 2 && parseName.substring(parseName.length - 2, parseName.length) !== ".d") {
                let fileNamesMatch = (fs.existsSync(javascriptSourceAbsoluteFileName) === true && fs.statSync(javascriptSourceAbsoluteFileName).isFile() === true);
                return files.push(new
                    MrbrTranspileFile(sourceAbsoluteFileName,
                        javascriptSourceAbsoluteFileName,
                        fileNamesMatch,
                        resolvedSourceFolder,
                        resolvedDestinationFolder,
                        assemblyDestinationAbsoluteFileName
                    ));
            }
        }
    });
}
const mrbrBaseName = "MrbrBase"

const splice = function (text, start, delCount, newSubStr) {
    return text.slice(0, start) + newSubStr + text.slice(start + Math.abs(delCount));
};
const mrbrJSRootFile = path.join(destinationFolder, "asm/mrbr.js")
let mrbrBaseSourceFile = "MrbrBase.ts",
    sourceFileName = mrbrBaseSourceFile
let fileCreated = false;
let sourceFile = sourceFiles.find(sourceFile => sourceFile.shortSourceFileName.substring(sourceFile.shortSourceFileName.length - sourceFileName.length).toLowerCase() === sourceFileName.toLowerCase());
let sourceContent = fs.readFileSync(sourceFile.longSourceFileName, "utf8")
console.log(tokeniseTextBlocks(sourceContent).tokens.length);
let res = tokeniseTextBlocks(sourceContent).tokens
let counter = 0;
let lastToken = res[counter]
while (counter < res.length) {
    counter++;
    let thisToken = res[counter]
    console.log(lastToken.blockType,`###${sourceContent.substring(lastToken.index, thisToken.index + 1)}###`)
    //console.log(lastToken.blockType, lastToken.index, thisToken.index)
    counter++;
    lastToken = res[counter]
}

//createMrbrBaseFile(mrbrBaseSourceFile);
function createMrbrBaseFile(sourceFileName) {
    let sourceFile = sourceFiles.find(sourceFile => sourceFile.shortSourceFileName.substring(sourceFile.shortSourceFileName.length - sourceFileName.length).toLowerCase() === sourceFileName.toLowerCase());
    const importedReferences = [];
    const regex = /(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?(\s*?|(\s*\/{2}\s*?(?<exclude>exclude)))$)/gm
    //console.log(baseSourceFile)
    //console.log(baseSourceFile.longSourceFileName)
    let sourceContent = fs.readFileSync(sourceFile.longSourceFileName, "utf8")
    let importMatch;
    while ((importMatch = regex.exec(sourceContent)) !== null) {
        if (importMatch.index === regex.lastIndex) { regex.lastIndex++; }
        let assembly, exclude
        if (importMatch?.groups?.import) { assembly = importMatch?.groups?.assembly }
        exclude = importMatch?.groups?.exclude === "exclude";
        importedReferences.push({ assembly: assembly, exclude: exclude })
    }
    sourceContent = null;
    //let outputFileName = baseSourceFile.longDestinationFileName
    //console.log(outputFileName)

    let outputFileName = path.join(resolvedDestinationFolder, "mrbr\\mrbr.js")
    //console.log("outputFileName: ", outputFileName)

    let classDeclarationRegex = /(?<exportStatement>(?<export>export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_$]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]*)?(?<end>\s*?){)/gm;

    let destinationContent = fs.readFileSync(sourceFile.longDestinationFileName, "utf-8")

    let classDeclarationMatch = classDeclarationRegex.exec(destinationContent)

    destinationContent = destinationContent.substring(classDeclarationRegex.lastIndex - 1)
    //console.log(sourceFileName, mrbrBaseSourceFile)

    let exportType = classDeclarationMatch?.groups?.exportType,
        startPosition = classDeclarationMatch?.index;
    let includeClassExtension = "\r\n";
    if (!classDeclarationMatch) {
        console.log("!classDeclarationMatchs:", sourceFileName)
        return
    }
    if (classDeclarationMatch.groups?.extends && classDeclarationMatch.groups?.baseClass) {
        let baseClass = classDeclarationMatch.groups?.baseClass;
        if (importedReferences.map(importedReference => importedReference.assembly).indexOf(baseClass) > -1) {
            includeClassExtension = (`var mrbrClassExtension = (${classDeclarationMatch.groups?.baseClass.replace(/_/gm, '.')});\r\n`);
        }
        else {
            includeClassExtension = (`var mrbrClassExtension = (${classDeclarationMatch.groups?.baseClass});\r\n`);
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
    let replaceText;
    if (sourceFileName === mrbrBaseSourceFile) {
        replaceText = `${includeClassExtension}let ${exportName} = ${exportType} ${classExtension}`.replace(/ {2}/, " ")
    }
    else {
        replaceText = `${includeClassExtension}${exportName.replace(/_/g, '.')} = ${exportType} ${classExtension}`.replace(/ {2}/, " ")
    }
    let outputTextArray = [
        //"Hello",
        replaceText,
        destinationContent
    ]

    if (!fileCreated) {
        outputTextArray.push(`MrbrBase.Namespace.createAssembly(window, "Mrbr");`)
        //outputTextArray.push(`let Mrbr = new MrbrBase({});`)

    }
    let outputText = outputTextArray.join("\r\n");
    //updateReferences(exportName, 0, outputText, exportName)
    importedReferences.forEach(importedReference => {
        let assemblyName = importedReference.assembly.toString();
        let dotAssemblyName = assemblyName.replace(/_/g, ".").toString();
        console.log(assemblyName, dotAssemblyName)
        //outputText = outputText.replaceAll(assemblyName, dotAssemblyName)
        //let rx = new RegExp(`Mrbr_IO_Fetch`, "g")
        //let rx = new RegExp(assemblyName, "g")
        //outputText = outputText.replaceAll(rx, dotAssemblyName)
        //console.log(outputText)

        //let assemblyName = entry.assembly;
        outputText = updateReferences(assemblyName, 0, outputText, dotAssemblyName)
        //outputText = updateReferences(dotAssemblyName, 0, outputText, assemblyName)

        if (!fileCreated) {
            fs.writeFileSync(mrbrJSRootFile, outputText);
            fileCreated = true
        }
        else {
            fs.appendFileSync(mrbrJSRootFile, outputText);

        }
    });
    importedReferences.forEach(entry => {
    });


    importedReferences.forEach(importedReference => {
        let importedFileName = `${importedReference.assembly.replace(/_/g, "\\")}.ts`
        createMrbrBaseFile(importedFileName);
    });







}


const notFound = -1;
function updateReferences(manifestEntry, startPosition, text, exportName) {

    const replaceText = `${manifestEntry}`
    let indexOf = 0;//startPosition;// + replaceText.length + 1;
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

            let replaceReferenceText = `${replaceText.replace(/_/g, ".")}`;
            //let replaceReferenceText = `####hello####`;
            console.log("replaced:", replaceText, replaceReferenceText)
            text = splice(text, indexOf, replaceText.length, replaceReferenceText);
            indexOf++;
            //indexOf = 0;
            textLength = text.length;
        }
        indexOf = text.indexOf(replaceText, indexOf);
        textLength = text.length;
    }
    textLength = text.length;

    return text;
}