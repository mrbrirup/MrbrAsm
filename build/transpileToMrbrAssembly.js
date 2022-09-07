const
    fs = require("fs"),
    path = require("path"),
    { exit } = require("process"),
    { MrbrTranspileFile } = require("./MrbrTranspileFile"),
    args = require("yargs").argv,
    typescriptFileExtension = ".ts",
    UglifyJS = require("uglify-js"),
    esprima = require('esprima'),
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
    mrbrBaseSourceFile = "MrbrBase.ts",
    writtenFiles = [];
RecurseFolders(resolvedSourceFolder, sourceFiles);
createMrbrBaseFile(mrbrBaseSourceFile);
const mrbrJSRootDirectory = path.resolve(destinationFolder),
    mrbrAsmRootDirectory = path.join(mrbrJSRootDirectory, "asm")
writtenFiles.splice(0, writtenFiles.length);
sourceFiles.forEach(sourceFile => createMrbrAssemblyFile(sourceFile));


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
    if (writtenFiles.indexOf(sourceFileName) >= 0) { return; }
    writtenFiles.push(sourceFileName);
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
        includeClassExtension = (classDeclarationMatch?.groups?.extends && classDeclarationMatch?.groups?.baseClass) ? (` extends (${classDeclarationMatch?.groups?.baseClass.replace(/_/g, ".")}) `) : "";
    if (classDeclarationMatch) {
        const //classExtension = (includeClassExtension.length > 0) ? (` extends mrbrClassExtension `) : "",
            exportName = classDeclarationMatch?.groups?.exportName,
            outputTextArray = [
                //`${includeClassExtension} ${((sourceFileName === mrbrBaseSourceFile) ? "let" : "")} ${exportName} = ${exportType} ${includeClassExtension}`.replace(/ {2}/, " "), ,
                `${((sourceFileName === mrbrBaseSourceFile) ? "let" : "")} ${exportName} = ${exportType} ${includeClassExtension}`.replace(/ {2}/, " "), ,
                destinationContent.substring(classDeclarationRegex.lastIndex - 1),
                ...((sourceFileName === mrbrBaseSourceFile) ? [
                    `MrbrBase.Namespace.createAssembly(window, "Mrbr");`,
                    `Mrbr.System.MrbrBase = MrbrBase;`
                ] : [])
            ],
            code = generateCode(outputTextArray.join("\r\n"), importedReferences.map(importedReference => importedReference.assembly).concat([exportName]));
            let assemblyPath = path.dirname(mrbrJSRootFile);
            !fs.existsSync(assemblyPath) && fs.mkdirSync(assemblyPath, { recursive: true });
        (sourceFileName === mrbrBaseSourceFile) ? fs.writeFileSync(mrbrJSRootFile, code + "\r\n") : fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
        //console.log(importedReferences);
        importedReferences.forEach(importedReference => {
            if (importedReference.exclude === false) {
                createMrbrBaseFile(`${importedReference.assembly.replace(/_/g, "\\")}.ts`);
            }
        });
        let sourceCode = fs.readFileSync(mrbrJSRootFile, "utf8")
        fs.writeFileSync(mrbrJSRootFile, prettify(sourceCode, true))
    }
    else {
        let enumFunctionRegex = /export\s+var\s+(?<assembly>[\w$]+)\s*;\s*(?<function>\(function \s*\((\1)\)\s{)(?<text>[\s\S]+)\}\)\s*\(\1\s*[|]{2}\s*\(\1\s*=\s*\{\}\)\);\s*/gm,
            functionRegex = /(?<fullMatch>(?<exportFunction>export\s+function\s+)(?<assembly>[\w]+)(?<parameters>\([\s\S]*?\))\s*\{)/gm;
        let match = null;
        if ((match = enumFunctionRegex.exec(destinationContent)) !== null) {
            code = generateCode(match.groups.text, [match.groups.assembly]);
            fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
        }
        else if ((match = functionRegex.exec(destinationContent)) !== null) {
            code = generateCode(`${match.groups.assembly} = function ${match.groups.parameters} { ${destinationContent.substring(functionRegex.lastIndex)}`, [match.groups.assembly]);
            fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
        }
        else {
            throw new Error(`${sourceFileName} has no Class or Function definition`)
        }
    }
}

function createMrbrAssemblyFile(sourceFile) {
    if (writtenFiles.indexOf(sourceFile.shortSourceFileName) >= 0) { return; }
    console.log("sourceFile.longDestinationFileName: ", sourceFile.longDestinationFileName)
    console.log("sourceFile.shortSourceFileName: ", sourceFile.shortSourceFileName)
    writtenFiles.push(sourceFile.shortSourceFileName);
    const importedReferences = [],
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
        includeClassExtension = "",
        destinationFileName = path.join(mrbrAsmRootDirectory, sourceFile.longDestinationFileName.substring(resolvedDestinationFolder.length));

    let assemblyPath = path.dirname(destinationFileName);
    !fs.existsSync(assemblyPath) && fs.mkdirSync(assemblyPath, { recursive: true });
    let exportName,
        code;
    if (classDeclarationMatch) {
        const classExtension = ((classDeclarationMatch?.groups?.baseClass?.length || 0) > 0) ? (` extends ((${classDeclarationMatch?.groups?.baseClass}))`) : "";
        exportName = classDeclarationMatch?.groups?.exportName;
        let outputTextArray = [
            `${includeClassExtension}${exportName} = ${exportType} ${classExtension}`.replace(/ {2}/, " "), ,
            destinationContent.substring(classDeclarationRegex.lastIndex - 1)
        ];
        code = generateCode(outputTextArray.join("\r\n"), importedReferences.map(importedReference => importedReference.assembly).concat([exportName]));
        if ((classDeclarationMatch?.groups?.baseClass?.length || 0) > 0) {
            //console.log("classDeclarationMatch?.groups?.baseClass?.length")
            code = code.replace(new RegExp(classDeclarationMatch?.groups?.baseClass.replace(/_/g, "."), ""), `(${classDeclarationMatch?.groups?.baseClass.replace(/_/g, ".")})`);
        }
    }
    else {
        let enumFunctionRegex = /export\s+var\s+(?<assembly>[\w$]+)\s*;\s*(?<function>\(function \s*\((\1)\)\s{)(?<text>[\s\S]+)\}\)\s*\(\1\s*[|]{2}\s*\(\1\s*=\s*\{\}\)\);\s*/gm,
            functionRegex = /(?<fullMatch>(?<exportFunction>export\s+function\s+)(?<assembly>[\w]+)(?<parameters>\([\s\S]*?\))\s*\{)/gm;
        let match = null;
        if ((match = enumFunctionRegex.exec(destinationContent)) !== null) {
            exportName = match.groups.assembly;
            code = generateCode(match.groups.text, importedReferences.map(importedReference => importedReference.assembly).concat([exportName]));
        }
        else if ((match = functionRegex.exec(destinationContent)) !== null) {
            exportName = match.groups.assembly;
            code = generateCode(`${match.groups.assembly} = function ${match.groups.parameters} { ${destinationContent.substring(functionRegex.lastIndex)}`, importedReferences.map(importedReference => importedReference.assembly).concat([exportName]));
        }
        else {
            throw new Error(`No Class or Function definition`)
        }
    }
    if (exportName) {
        let manifest = []
        console.log(exportName, destinationFileName);

        if (importedReferences?.length > 0) {
            manifest = manifest.concat(...[importedReferences.filter(entry => entry.exclude === false).map(include => (`${" ".repeat(8)}miofc(${include.assembly.replace(/_/g, ".")})`))])
        }
        let source = prettify(`((mrbr, data, resolve, reject)=>{
            ${manifest?.length ? "const miofc = Mrbr.IO.File.component, manifest = [ " + manifest.join(",\r\n") + "]" : ""}
            ${manifest?.length ? "mrbr.loadManifest( manifest )\r\n" : ""}
            ${manifest?.length ? ".then(_ =>{" : ""}
                ${code}\r\n
                ${manifest?.length ? exportName.replace(/_/g, '.') + ".manifest = manifest" : ""}
                setTimeout(()=>{ resolve("${exportName.replace(/_/g, ".")}")},0)
                ${manifest?.length ? "})" : ""}
                ${manifest?.length ? ".catch(err => reject(err))" : ""}
        })(mrbr, data, resolve, reject)
    `, true)
        fs.writeFileSync(destinationFileName, source)
    }
}

function prettify(code, beautify = false) {
    var options = {
        compress: true,
        mangle: false,
        output: {
            beautify: beautify
        }
    };
    var result = UglifyJS.minify(code, options);
    return result.code;
}

function generateCode(text, replaceNames) {
    if (!replaceNames || replaceNames.length === 0) { return text; }
    const ast = esprima.parseScript(text)
    estraverse.traverse(ast, {
        enter: function (node, parent) { if (node.type !== "Program") { return estraverse.VisitorOption.Skip; } },
        leave: function (node, parent) {
            if (node.type === "Program") { traverseNodes(node, replaceNames) }
        }
    });
    return escodegen.generate(ast);
}
function traverseNodes(node, replaceNames) {
    if (!node || (Array.isArray(node) === false && node instanceof Object === false)) { return; }
    if (node.type === "Identifier" && replaceNames.indexOf(node.name) >= 0) {
        node.name = node.name.replace(/_/g, ".")
    }
    else if (node.hasOwnProperty("name") && replaceNames.indexOf(node.name) >= 0) {
        node.name = node.name.replace(/_/g, ".")
    }
    for (const key in node) {
        const nodeKey = node[key];
        Array.isArray(nodeKey) ?
            nodeKey.forEach(nodeItem => { traverseNodes(nodeItem, replaceNames); }) :
            traverseNodes(nodeKey, replaceNames);
    };
}