const fs = require("fs");
const path = require("path");
const { exit, getMaxListeners } = require("process");
const { MrbrTranspileFile } = require("./MrbrTranspileFile");
const args = require("yargs").argv;
//const regex = /^\/{3}\s*(?<mrbrTag>\<mrbr.*?\/\>)\s*$|(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)|(^(?<export>\s*export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]+)?(\s*{))/mg;
const typescriptFileExtension = ".ts";
const { generateManifest } = require("./mrbrTranspileFunctions/generateManifest");
var UglifyJS = require("uglify-js");
const esprima = require('esprima'),
    estraverse = require("estraverse"),
    escodegen = require("escodegen");

/*
    Get Paths
*/

let sourceFolder = args.source;
let destinationFolder = args.dest;
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


const sourceFiles = [],
    mrbrJSRootFile = path.join(destinationFolder, "asm/mrbr.js"),
    mrbrBaseSourceFile = "MrbrBase.ts";
RecurseFolders(resolvedSourceFolder, sourceFiles);
createMrbrBaseFile(mrbrBaseSourceFile);

/*
    Get all files to transpile to MrbrAssembly
*/
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

function createMrbrBaseFile(sourceFileName) {
    const sourceFile = sourceFiles.find(sourceFile => sourceFile.shortSourceFileName.substring(sourceFile.shortSourceFileName.length - sourceFileName.length).toLowerCase() === sourceFileName.toLowerCase()),
        importedReferences = [],
        importReferenceRegex = /(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?(\s*?|(\s*\/{2}\s*?(?<exclude>exclude)))$)/gm,
        sourceContent = fs.readFileSync(sourceFile.longSourceFileName, "utf8"),
        classDeclarationRegex = /(?<exportStatement>(?<export>export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_$]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]*)?(?<end>\s*?){)/gm;
    while ((importMatch = importReferenceRegex.exec(sourceContent)) !== null) {
        if (importMatch.index === importReferenceRegex.lastIndex) { importReferenceRegex.lastIndex++; }
        importedReferences.push({ assembly: importMatch?.groups?.assembly, exclude: importMatch?.groups?.exclude === "exclude" })
    }
    const destinationContent = fs.readFileSync(sourceFile.longDestinationFileName, "utf-8"),
        classDeclarationMatch = classDeclarationRegex.exec(destinationContent),
        exportType = classDeclarationMatch?.groups?.exportType,
        includeClassExtension = (classDeclarationMatch?.groups?.extends && classDeclarationMatch?.groups?.baseClass) ? (`var mrbrClassExtension = (${classDeclarationMatch?.groups?.baseClass});\r\n`) : "";
    if (!classDeclarationMatch) {
        //console.log("!classDeclarationMatchs:", sourceFileName)
        return
    }
    const classExtension = (includeClassExtension.length > 0) ? (` extends mrbrClassExtension `) : "",
        exportName = classDeclarationMatch?.groups?.exportName,
        outputTextArray = [
            `${includeClassExtension} ${((sourceFileName === mrbrBaseSourceFile) ? "let" : "")} ${exportName} = ${exportType} ${classExtension}`.replace(/ {2}/, " "), ,
            destinationContent.substring(classDeclarationRegex.lastIndex - 1),
            ...((sourceFileName === mrbrBaseSourceFile) ? [`MrbrBase.Namespace.createAssembly(window, "Mrbr");`] : [])
        ],
        code = generateCode(outputTextArray.join("\r\n"), importedReferences.map(importedReference => importedReference.assembly).concat([exportName]));
    (sourceFileName === mrbrBaseSourceFile) ? fs.writeFileSync(mrbrJSRootFile, code + "\r\n") : fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
    importedReferences.forEach(importedReference => createMrbrBaseFile(`${importedReference.assembly.replace(/_/g, "\\")}.ts`));
}

function generateCode(text, replaceNames) {
    if (!replaceNames || replaceNames.length === 0) { return text; }
    const ast = esprima.parseScript(text)
    estraverse.traverse(ast, {
        enter: function (node, parent) { if (node.type !== "Program") { return estraverse.VisitorOption.Skip; } },
        leave: function (node, parent) {
            if (node.type === "Program") { traverseNodes(node, replaceNames) }
            return node;
        }
    });
    return escodegen.generate(ast)
}
function traverseNodes(node, replaceNames) {
    if (!node) { return; }
    if (node.type === "Identifier") {
        if (replaceNames.indexOf(node.name) >= 0) { node.name = node.name.replace(/_/g, ".") }
        return;
    }
    Object.keys(node).forEach(key => {
        if (Array.isArray(node[key]) === false) {
            if (node[key]?.hasOwnProperty("type") === true) { traverseNodes(node[key], replaceNames) }
        }
        else {
            node[key].forEach(nodeItem => { if (nodeItem?.hasOwnProperty("type") === true) { traverseNodes(nodeItem, replaceNames); } })
        }
    })
}