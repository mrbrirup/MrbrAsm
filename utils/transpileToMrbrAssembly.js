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
var UglifyJS = require("uglify-js");


let { findStartAndEndInFile } = require("./mrbrTranspileFunctions/findObjectStartAndEndInFile");
const { isTemplateExpression } = require("typescript");

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
    dName = `${dName.substring(0, dName.length - 2)}js`
    entry.destinationFileName = (path.join(mrbrJSRootDirectory, entry.destinationFileName))
    entry.destinationFileName = `${entry.destinationFileName.substring(0, entry.destinationFileName.length - 2)}js`
    const baseName = path.basename(entry.destinationFileName)
    const assemblyDestinationAbsoluteFileName = path.join(resolvedDestinationFolder, "asm", dName);
    entry.assemblyFileName = assemblyDestinationAbsoluteFileName;
})




for (const sourceFile of sourceFiles) {
    const regex = /^\/{3}\s*(?<mrbrTag>\<mrbr.*?\/\>)\s*$|(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)|(^(?<export>\s*export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]+)?(\s*{))/mg;
    const splitFileName = sourceFile?.shortSourceFileName?.split("\\");
    if (!splitFileName || splitFileName[splitFileName?.length - 1].toLowerCase() !== "mrbrbase.ts") {
        //continue;
    }
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
    let generatedDeclarations = generateDeclarations(jsFileContents, importMatches);
    sourceFile.objectName = generatedDeclarations.exportName;
    let declarationFileContents = generatedDeclarations.declaration;
    let commentImportsRegex = /^import.+(;|$)/gm
    declarationFileContents = declarationFileContents.replaceAll(commentImportsRegex, "//import")

    //fs.writeFileSync(sourceFile.longDestinationFileName, newFileContents);
    let assemblyPath = path.dirname(sourceFile.assemblyFileName);
    !fs.existsSync(assemblyPath) && fs.mkdirSync(assemblyPath, { recursive: true });
    let declarationFileName = `${sourceFile.assemblyFileName.substring(0, sourceFile.assemblyFileName.length - 2)}declaration.js`
    sourceFile.declarationFileName = declarationFileName;
    fs.writeFileSync(declarationFileName, declarationFileContents);


    let manifestFileContents = generatedDeclarations.importedReferences;
    let manifestFileName = `${sourceFile.assemblyFileName.substring(0, sourceFile.assemblyFileName.length - 2)}manifest.js`
    sourceFile.manifestFileName = manifestFileName;
    fs.writeFileSync(manifestFileName, manifestFileContents);

    let exportName = generatedDeclarations.exportName;

    let output = []


    output.push("mrbr.loadManifest([")
    output.push(manifestFileContents)
    output.push("])")
    output.push(".then(result =>{")
    output.push("")
    output.push(declarationFileContents)
    output.push("")
    output.push(`if (mrbr?.assembly?.get("${exportName}")) {\r\n\tlet mrbrAsm = mrbr.asm["${exportName}"];\r\n\tmrbrAsm ? mrbrAsm.result = ${exportName} : mrbrAsm = { file: null, result: ${exportName} }\r\n\t}`)
    output.push(`completedPromise.resolve("${exportName}");`);
    output.push("})")
    output.push("")
    fs.writeFileSync(sourceFile.assemblyFileName, output.join("\r\n"));
}
//console.log(fileManifestEntries.flat())

let addedEntries = [];
let mrbrBaseManifestEntries = fileManifestEntries.flat();
let referencedMrbrBaseManifestEntries = [];
mrbrBaseManifestEntries.forEach(entry => {
    if (!addedEntries.includes(entry.objectName)) {
        addedEntries.push(entry.objectName);
        let referencedSourceFile = sourceFiles.find(sourceFile => sourceFile.objectName === entry.objectName);
        referencedMrbrBaseManifestEntries.push(referencedSourceFile)
    }

})

referencedMrbrBaseManifestEntries
    .forEach(entry => {
        contents = fs.readFileSync(entry.declarationFileName, "utf-8");
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
    })
let output = [];
output.push(`let cfg = {`);
addedEntries = [];
referencedMrbrBaseManifestEntries
    .forEach(entry => output.push(`${entry.objectName} : ${entry.objectName},`));
output.push(`}`);
//output.push(`mrbr = (((self) => self)(this)).mrbr || new MrbrBase(cfg);`)
output.push(`mrbr = self["mrbr"] = self["mrbr"] || new MrbrBase(cfg);`)
//
addedEntries = [];
output.push(`setTimeout(() => {`)
output.push(`cfg = null;}, MrbrBase.temporaryObjectTimeOut);`)
output.push("})(this, false)")
output.push("")
fs.appendFileSync(mrbrJSRootFile, output.join("\r\n"));
var minifySource = fs.readFileSync(mrbrJSRootFile, "utf-8")
var result = UglifyJS.minify(minifySource, {compress: true});
console.log(result.error);
fs.writeFileSync(mrbrJSRootMiniFile, result.code)