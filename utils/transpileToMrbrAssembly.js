const fs = require("fs");
const { extname } = require("path");
const path = require("path");
const { exit } = require("process");
const { MrbrTranspileFile } = require("./MrbrTranspileFile");
const { MrbrJSFileStructure } = require("./MrbrJSFileStructure")
const { generateDeclarations } = require("./mrbrTranspileFunctions/generateDeclarations")
const { generateFileReferences } = require("./mrbrTranspileFunctions/generateFileReferences")
const args = require("yargs").argv;
//const regex = /^\/{3}\s*(?<mrbrTag>\<mrbr.*?\/\>)\s*$|(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)|(^(?<export>\s*export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]+)?(\s*{))/mg;
const typescriptFileExtension = ".ts";
const { generateManifest } = require("./mrbrTranspileFunctions/generateManifest");
//const { match } = require("assert");
var UglifyJS = require("uglify-js");


let { findStartAndEndInFile } = require("./mrbrTranspileFunctions/findObjectStartAndEndInFile");
const { isTemplateExpression } = require("typescript");


// let res = findStartAndEndInFile(`import { Mrbr_IO_FileType } from "./FileType";
// export class Mrbr_IO_File {
//     constructor(fileType, root, entryName, id, isAsync, isModule) {
//         let self = this, mrbrIOFileTYpe = Mrbr_IO_FileType;
//         self.fileType = fileType;
//         self.entryName = entryName;
//         if (id) {
//             self.id = id;
//         }
//         else {
//             self.id = self.newId();
//         }
//         self.isAsync = isAsync;
//         self.isModule = isModule;
//         self.root = root;
//         switch (fileType) {
//             case Mrbr_IO_FileType.Component:
//                 const componentToFileNameRegex = /\[._]/g;
//                 self.fileName = entryName.replace(componentToFileNameRegex, "/");
//                 if (!root) {
//                     self.root = self.fileName = self.fileName.substring(0, self.fileName.indexOf("/"));
//                 }
//                 break;
//             default:
//                 break;
//         }
//     }
//     get fileType() { return this._fileType; }
//     ;
//     set fileType(value) { this._fileType = value; }
//     ;
//     newId() {
//         const currentDate = new Date();
//         var epochTicks = 621355968000000000;
//         var ticksPerMillisecond = 10000;
//         var ticks = epochTicks + (currentDate.getTime() * ticksPerMillisecond);
//         const suffix = Math.floor(Math.random() * 100);
//         const prefix = "script";
//         const id = "{prefix}_{ticks}_{suffix}";
//         return id;
//     }
// }
// Mrbr_IO_Fetch.emptyString = "";
// Mrbr_IO_Fetch.loadProgressEvent = "fetch_loadProgress";
// Mrbr_IO_Fetch.messageEvent = "fetch_message";
// Mrbr_IO_Fetch.contentEncodingHeaderName = "content-encoding";
// Mrbr_IO_Fetch.contentLengthHeaderName = "content-length";
// Mrbr_IO_Fetch.customFileSizeHeaderName = "x-file-size";
// Mrbr_IO_Fetch.cancelRequestRejectMessage = "Cancel requested before server response.";
// Mrbr_IO_Fetch.readableStreamNotSupportedMessage = "ReadableStream not supported in browser";
// Mrbr_IO_Fetch.cancellingDownloadRequestMessage = "Cancel download requested";
// Mrbr_IO_Fetch.cancellingDownloadMessage = "Cancelling current download";
// Mrbr_IO_Fetch.cancellingReadMessage = "Canceling read";


// `, 27)
// console.log(res)
// exit(0)


//const parseString = require("xml2js").parseString;

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

/*
    Get all files to transpile to MrbrAssembly
*/

const sourceFiles = [];
RecurseFolders(resolvedSourceFolder, sourceFiles);

function RecurseFolders(folder, files) {
    fs.readdirSync(folder).forEach(file => {
        const sourceAbsoluteFileName = path.join(folder, file);
        const javascriptSourceAbsoluteFileName = path.join(resolvedDestinationFolder, sourceAbsoluteFileName.substring(resolvedSourceFolder.length, sourceAbsoluteFileName.length - 2) + "js");
        const assemblyDestinationAbsoluteFileName = path.join(resolvedDestinationFolder,"asm", sourceAbsoluteFileName.substring(resolvedSourceFolder.length, sourceAbsoluteFileName.length - 2) + "js");
        //const destinationAbsoluteFileName = path.join(resolvedDestinationFolder, sourceAbsoluteFileName.substring(resolvedSourceFolder.length, sourceAbsoluteFileName.length - 2) + "js");
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




let sourceMrbrFolder = path.resolve(sourceFolder, "mrbr/system"),
    mrbrTSRootFileName = path.join(sourceMrbrFolder, "/mrbrbase.ts"),
    fileManifestEntries = [];
let parentRootObject = { objectName: "MrbrBase", sourceFileName: mrbrTSRootFileName, children: [] }
fileManifestEntries.push(parentRootObject)
generateFileReferences(mrbrTSRootFileName, sourceMrbrFolder, fileManifestEntries, parentRootObject)

const mrbrJSRootDirectory = path.resolve(destinationFolder)
const mrbrJSRootFile = path.join(destinationFolder, "asm/mrbr.js")
const mrbrJSRootMiniFile = path.join(destinationFolder, "min/mrbr.min.js")
sourceMrbrFolder = path.resolve(sourceFolder)

let fileCreated = false;
fileManifestEntries.forEach(entry => entry.destinationFileName = entry.sourceFileName.substring(sourceMrbrFolder.length))
fileManifestEntries.forEach(entry => {
    let dName = entry.destinationFileName;
    dName = `${dName.substring(0, dName.length-2)}js`
    entry.destinationFileName = (path.join(mrbrJSRootDirectory, entry.destinationFileName))
    entry.destinationFileName = `${entry.destinationFileName.substring(0, entry.destinationFileName.length - 2)}js`
    const baseName = path.basename(entry.destinationFileName)
    const assemblyDestinationAbsoluteFileName = path.join(resolvedDestinationFolder,"asm", dName);
    //const assemblyDestinationAbsoluteFileName = path.join(resolvedDestinationFolder,"asm", entry.destinationFileName.substring(resolvedSourceFolder.length, entry.destinationFileName.length - 2) + "js");
    entry.assemblyFileName = assemblyDestinationAbsoluteFileName;
})




for (const sourceFile of sourceFiles) {
    const regex = /^\/{3}\s*(?<mrbrTag>\<mrbr.*?\/\>)\s*$|(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)|(^(?<export>\s*export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]+)?(\s*{))/mg;

    const transpileFile = new MrbrJSFileStructure(sourceFile);
    //console.log(transpileFile.shortSourceFileName)
    const splitFileName = sourceFile?.shortSourceFileName?.split("\\");
    //console.log(sourceFile, sourceFile?.shortSourceFileName, splitFileName)
    if (!splitFileName || splitFileName[splitFileName?.length - 1].toLowerCase() !== "mrbrbase.ts") {
        //continue;
    }
    //console.log(transpileFile);
    //console.log(transpileFile, sourceFile);
    const componentImports = [];
    const fileContents = fs.readFileSync(sourceFile.longSourceFileName)
    const matches = [];
    let match;
    while ((match = regex.exec(fileContents)) !== null) {
        if (match.index === regex.lastIndex) { regex.lastIndex++; }
        else {
            matches.push(match);
        }
    }
    regex.lastIndex = 0;
    const jsFileContents = fs.readFileSync(sourceFile.longDestinationFileName, 'utf8')
    //console.log("jsFileContents: ", sourceFile.longDestinationFileName, jsFileContents.length)
    const jsMatches = [];
    match = null;
    while ((match = regex.exec(jsFileContents)) !== null) {
        if (match.index === regex.lastIndex) { regex.lastIndex++; }
        else {
            jsMatches.push(match);
        }
    }



    let declarationMatches = jsMatches.filter(match => {
        let exportType = match.groups?.exportType;
        if (exportType) { return match; }
        return null;
    });
    let importMatches = matches.filter(match => {
        let importMatch = match.groups?.import;
        if (importMatch) { return match; }
        return null;
    })
    let mrbrTagBatches = matches.filter(match => {
        let mrbrTagMatch = match.groups?.mrbrTag;
        if (mrbrTagMatch) { return match; }
        return null;
    })
    let generatedManifest = `[\t\r\n${generateManifest(importMatches).join(",\t\r\n")}\r\n\t]`
    let declarationArray = [];
    let generatedDeclarations = generateDeclarations(jsFileContents, importMatches);
    //let generatedDeclarations = generateDeclarations(jsFileContents, fileManifestEntries);

    importMatches.forEach(match => {
        let replaceRx = new RegExp(match.groups["assembly"], "mg")
        //generatedDeclarations = generatedDeclarations.replace(replaceRx, `mrbr.asm['${match.groups["assembly"]}'].result`);

    })

    declarationArray.push(generatedDeclarations)
    if (declarationArray?.length) {
        let newFileContents = declarationArray.join("\r\n");
        let commentImportsRegex = /^import.+(;|$)/gm
        newFileContents = newFileContents.replaceAll(commentImportsRegex, "//import")

        //fs.writeFileSync(sourceFile.longDestinationFileName, newFileContents);
        let assemblyPath = path.dirname(sourceFile.assemblyFileName);
        !fs.existsSync(assemblyPath) && fs.mkdirSync(assemblyPath, {recursive: true});
        fs.writeFileSync(sourceFile.assemblyFileName, newFileContents);
        //assemblyDestinationAbsoluteFileName
    }
}

let addedEntries = [];
fileManifestEntries
    .flat()
    .forEach(entry => {
        if (!addedEntries.includes(entry.objectName)) {
            addedEntries.push(entry.objectName);
            contents = fs.readFileSync(entry.assemblyFileName, "utf-8");
            //contents = fs.readFileSync(entry.destinationFileName, "utf-8");
            let commentImportsRegex = /^import.+(;|$)/gm
            contents = contents.replaceAll(commentImportsRegex, "//import")
            if (fileCreated === false) {
                fs.writeFileSync(mrbrJSRootFile, "((self, returnManifest) => {\r\n");

                //fs.writeFileSync(mrbrJSRootFile, contents);
                fs.appendFileSync(mrbrJSRootFile, contents);
                fileCreated = true;
            }
            else {
                fs.appendFileSync(mrbrJSRootFile, contents);
            }
        }
    })
let output = [];
output.push(`let cfg = {`);
addedEntries = [];
fileManifestEntries
.flat()
.forEach(entry => {
    if (!addedEntries.includes(entry.objectName)) {
        addedEntries.push(entry.objectName)
        output.push(`${entry.objectName} : ${entry.objectName},`)
    }
});
output.push(`}`);
//output.push(`mrbr = (((self) => self)(this)).mrbr || new MrbrBase(cfg);`)
output.push(`mrbr = self["mrbr"] = self["mrbr"] || new MrbrBase(cfg);`)
//
addedEntries = [];
output.push(`setTimeout(() => {`)
fileManifestEntries
.flat()
.forEach(entry => {
    if (!addedEntries.includes(entry.objectName)) {
        addedEntries.push(entry.objectName)
        output.push(`${entry.objectName} = null;`)
    }
});
//output.push(`setTimeout(() => {${entry.objectName} = null;}, MrbrBase.temporaryObjectTimeOut);`)
output.push(`cfg = null;}, MrbrBase.temporaryObjectTimeOut);`)
output.push("})(this, false)")
output.push("")
fs.appendFileSync(mrbrJSRootFile, output.join("\r\n"));

var minifySource = fs.readFileSync(mrbrJSRootFile, "utf-8")
var result = UglifyJS.minify(minifySource);
console.log(result.error);
fs.writeFileSync(mrbrJSRootMiniFile, result.code)
