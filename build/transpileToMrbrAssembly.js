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


const
    rxImportReference = /^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")\s*;{0,1}\s*((\s*?)(\/{2}\s*?(?<mrbrConfig>[\S\s]*?))){0,1}$/gm,
    rxClassDeclaration = /(?<exportStatement>(?<export>export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_$]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]*)?(?<end>\s*?)\s*((?<implements>implements \S[\S_]*)|\s*?)\s*?{)/gm,
    rxInterface = /(?<keyword_export>export)\s+(?<keyword_interface>interface)\s+(?<interface_name>\S[\S]*)\s+{/gm,
    rxEnumFunction = /export\s+var\s+(?<assembly>[\w$]+)\s*;\s*(?<function>\(function \s*\((\1)\)\s{)(?<text>[\s\S]+)\}\)\s*\(\1\s*[|]{2}\s*\(\1\s*=\s*\{\}\)\);\s*/gm,
    rxFunction = /(?<fullMatch>(?<exportFunction>export\s+function\s+)(?<assembly>[\w]+)(?<parameters>\([\s\S]*?\))\s*\{)/gm;

const sourceFiles = [],
    mrbrJSRootFile = path.join(destinationFolder, "asm/mrbr.js"),
    mrbrBaseSourceFile = "MrbrBase.ts",
    writtenFiles = [],
    fileTypeMap = new Map();
RecurseFolders(resolvedSourceFolder, sourceFiles);
createMrbrBaseFile(mrbrBaseSourceFile);
const mrbrJSRootDirectory = path.resolve(destinationFolder),
    mrbrAsmRootDirectory = path.join(mrbrJSRootDirectory, "asm")
writtenFiles.splice(0, writtenFiles.length);
sourceFiles.forEach(sourceFile => createMrbrAssemblyFile(sourceFile));

function mrbrConfigToConfig(mrbrOptions) {
    const config = {};
    if (mrbrOptions?.length > 0) {
        const options = mrbrOptions.split(",");
        options.forEach(option => {
            const optionParts = option.split(":");
            if (optionParts[0].toLowerCase() === "mrbr") {
                let value = optionParts[1].split("=");
                if (value.length === 1) {
                    config[value[0]] = true;
                }
                else {
                    config[value[0]] = value[1];
                }
            }
        });
    }
    return config;
}

const extensionsForCopyFiles = [
    "css",
    "svg"
]

extensionsForCopyFiles.forEach(extension => CopyFilesRecursively(resolvedSourceFolder, `${mrbrAsmRootDirectory}`, `.${extension}`));


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
        importReferenceRegex = cloneRegex(rxImportReference),
        sourceContent = fs.readFileSync(sourceFile.longSourceFileName, "utf8"),
        classDeclarationRegex = cloneRegex(rxClassDeclaration),
        interfaceRegex = cloneRegex(rxInterface);
    if (interfaceMatch = interfaceRegex.exec(sourceContent) !== null) {
        return;
    }
    while ((importMatch = importReferenceRegex.exec(sourceContent)) !== null) {
        if (importMatch.index === importReferenceRegex.lastIndex) { importReferenceRegex.lastIndex++; }
        let importTest = importMatch?.groups?.assembly.toLowerCase() === "mrbrbase" ? "Mrbr_System_MrbrBase" : importMatch?.groups?.assembly
        if (!fileTypeMap.get(importTest)) {
            let fileType = getExportType(importTest);
            fileTypeMap.set(importTest, fileType);
        }
        if (fileTypeMap.get(importTest) !== "interface") {
            console.log("config: ", importMatch?.groups?.assembly, importMatch?.groups?.mrbrConfig, mrbrConfigToConfig(importMatch?.groups?.mrbrConfig));
            let config = mrbrConfigToConfig(importMatch?.groups?.mrbrConfig);
            importedReferences.push({ assembly: importMatch?.groups?.assembly, config: config });
            // if (config.optional !== true && config.exclude !== true) {

            // }
        }






    }
    const destinationContent = fs.readFileSync(sourceFile.longDestinationFileName, "utf-8"),
        classDeclarationMatch = classDeclarationRegex.exec(destinationContent),
        exportType = classDeclarationMatch?.groups?.exportType,
        includeClassExtension = (classDeclarationMatch?.groups?.extends && classDeclarationMatch?.groups?.baseClass) ? (` extends(${classDeclarationMatch?.groups?.baseClass.replace(/_/g, ".")}) `) : "";
    if (classDeclarationMatch) {
        const //classExtension = (includeClassExtension.length > 0) ? (` extends mrbrClassExtension `) : "",
            exportName = classDeclarationMatch?.groups?.exportName;
        let firstLine = "";
        if (sourceFileName === mrbrBaseSourceFile) {
            firstLine = `let ${exportName} = ${exportType} ${includeClassExtension} `.replace(/ {2}/, " ");
        }
        else {
            firstLine = `let ${exportName} = ${exportName.replace(/_/g, ".")} = ${exportType} ${includeClassExtension} `.replace(/ {2}/, " ");
        }
        //`${((sourceFileName === mrbrBaseSourceFile) ? "let" : "")} ${exportName} = ${exportType} ${includeClassExtension} `.replace(/ {2}/, " "), ,
        const outputTextArray = [
            //`${ includeClassExtension } ${ ((sourceFileName === mrbrBaseSourceFile) ? "let" : "") } ${ exportName } = ${ exportType } ${ includeClassExtension } `.replace(/ {2}/, " "), ,
            firstLine,
            destinationContent.substring(classDeclarationRegex.lastIndex - 1),
            ...((sourceFileName === mrbrBaseSourceFile) ? [
                `MrbrBase.Namespace.createAssembly(window, "Mrbr"); `,
                `Mrbr.System.MrbrBase = MrbrBase; `,
                `Mrbr.System.MrbrBase[MrbrBase.MRBR_COMPONENT_NAME] = "Mrbr.System.MrbrBase"; `
            ] : [])
        ],
            code = generateCode(outputTextArray.join("\r\n"), importedReferences.map(importedReference => importedReference.assembly).concat([exportName]), "class", exportName);
        let assemblyPath = path.dirname(mrbrJSRootFile);
        !fs.existsSync(assemblyPath) && fs.mkdirSync(assemblyPath, { recursive: true });
        (sourceFileName === mrbrBaseSourceFile) ? fs.writeFileSync(mrbrJSRootFile, code + "\r\n") : fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
        //console.log(importedReferences);
        importedReferences.forEach(importedReference => {

            if (importedReference.config?.exclude !== true) {
                if (importedReference.config?.optional !== true) {
                    createMrbrBaseFile(`${importedReference.assembly.replace(/_/g, "\\")}.ts`);
                }
            }
        });
        let sourceCode = fs.readFileSync(mrbrJSRootFile, "utf8")
        //let namespaceNames = importedReferences.filter(importedReference => importedReference.config?.optional === false).map(importedReference => `${importedReference.assembly.replace(/_/g, ".")} [MrbrBase.MRBR_COMPONENT_NAME] = "${importedReference.assembly.replace(/_/g, ".")}"`);
        let namespaceNames = importedReferences
            .filter(importedReference => importedReference.config?.optional !== true && importedReference.config?.exclude !== true)
            .map(importedReference => `${importedReference.assembly.replace(/_/g, ".")} [MrbrBase.MRBR_COMPONENT_NAME] = "${importedReference.assembly.replace(/_/g, ".")}"`);
        fs.writeFileSync(mrbrJSRootFile, prettify(`${sourceCode} \r\n${namespaceNames.join(";\r\n")} \r\n`, true))
    }
    else {
        try {

            let enumFunctionRegex = cloneRegex(rxEnumFunction),
                functionRegex = cloneRegex(rxFunction);
            let match = null;
            if ((match = enumFunctionRegex.exec(destinationContent)) !== null) {
                code = generateCode(`let ${match.groups.assembly} = ${match.groups.assembly.replace(/_/g, ".")}\r\n` + match.groups.text, [match.groups.assembly], "enum", match.groups.assembly);
                fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
            }
            else if ((match = functionRegex.exec(destinationContent)) !== null) {
                code = generateCode(`let ${match.groups.assembly} = ${match.groups.assembly.replace(/_/g, ".")}\r\n` + ` = function ${match.groups.parameters} { ${destinationContent.substring(functionRegex.lastIndex)} `, [match.groups.assembly], "function", match.groups.assembly);
                fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
            }
            else {
                throw new Error(`${sourceFileName} has no Class or Function definition`)
            }
        } catch (error) {
            console.log(error);

        }
    }
}



function getExportType(assemblyName) {
    let sourceFileName = assemblyName.replace(/_/gm, "/") + ".ts";
    let fullSourceFileName = path.join(resolvedSourceFolder, sourceFileName);
    let exists = fs.existsSync(fullSourceFileName);
    let importReferenceRegex = cloneRegex(rxImportReference),
        sourceContent = fs.readFileSync(fullSourceFileName, "utf8"),
        classDeclarationRegex = cloneRegex(rxClassDeclaration),
        interfaceRegex = cloneRegex(rxInterface),
        enumFunctionRegex = cloneRegex(rxEnumFunction),
        functionRegex = cloneRegex(rxFunction);
    let fileType = "unknown";
    if (classDeclarationMatch = classDeclarationRegex.exec(sourceContent) !== null) {
        fileType = "class";
    }
    else if (interfaceDeclarationMatch = interfaceRegex.exec(sourceContent) !== null) {
        fileType = "interface";
    }
    else if (enumMatch = enumFunctionRegex.exec(sourceContent) !== null) {
        fileType = "enum";
    }
    else if (functionMatch = functionRegex.exec(sourceContent) !== null) {
        fileType = "function";
    }
    return fileType;
}


function createMrbrAssemblyFile(sourceFile) {
    if (writtenFiles.indexOf(sourceFile.shortSourceFileName) >= 0) { return; }
    //console.log("sourceFile.longDestinationFileName: ", sourceFile.longDestinationFileName)
    //console.log("sourceFile.shortSourceFileName: ", sourceFile.shortSourceFileName)
    writtenFiles.push(sourceFile.shortSourceFileName);
    const importedReferences = [],
        importReferenceRegex = cloneRegex(rxImportReference),
        sourceContent = fs.readFileSync(sourceFile.longSourceFileName, "utf8"),
        classDeclarationRegex = cloneRegex(rxClassDeclaration),
        interfaceRegex = cloneRegex(rxInterface);
    if (interfaceMatch = interfaceRegex.exec(sourceContent) !== null) {
        return;
    }
    while ((importMatch = importReferenceRegex.exec(sourceContent)) !== null) {
        if (importMatch.index === importReferenceRegex.lastIndex) { importReferenceRegex.lastIndex++; }
        let importTest = importMatch?.groups?.assembly.toLowerCase() === "mrbrbase" ? "Mrbr_System_MrbrBase" : importMatch?.groups?.assembly
        if (!fileTypeMap.get(importTest)) {
            let fileType = getExportType(importTest);
            fileTypeMap.set(importTest, fileType);
        }
        if (fileTypeMap.get(importTest) !== "interface") {
            importedReferences.push({ assembly: importMatch?.groups?.assembly, config: mrbrConfigToConfig(importMatch?.groups?.mrbrConfig) });
        }
    }
    const destinationContent = fs.readFileSync(sourceFile.longDestinationFileName, "utf-8"),
        classDeclarationMatch = classDeclarationRegex.exec(destinationContent),
        exportType = classDeclarationMatch?.groups?.exportType,
        includeClassExtension = "",
        destinationFileName = path.join(mrbrAsmRootDirectory, sourceFile.longDestinationFileName.substring(resolvedDestinationFolder.length));

    let assemblyPath = path.dirname(destinationFileName);
    !fs.existsSync(assemblyPath) && fs.mkdirSync(assemblyPath, { recursive: true });
    let exportName,
        code,
        preloadAssembly = "";
    if (classDeclarationMatch) {
        const classExtension = ((classDeclarationMatch?.groups?.baseClass?.length || 0) > 0) ? (` extends ((${classDeclarationMatch?.groups?.baseClass}))`) : "";
        preloadAssembly = classDeclarationMatch?.groups?.baseClass || "";
        if (preloadAssembly.indexOf("_") > 0) {
            preloadAssembly = preloadAssembly.replace(/_/g, ".");
        }
        else {
            preloadAssembly = "";
        }
        exportName = classDeclarationMatch?.groups?.exportName;
        let outputTextArray = [
            `let ${exportName} = ${includeClassExtension}${exportName.replace(/_/g, ".")} = ${exportType} ${classExtension} `.replace(/ {2}/, " "), ,
            destinationContent.substring(classDeclarationRegex.lastIndex - 1)
        ];
        code = generateCode(outputTextArray.join("\r\n"), importedReferences.map(importedReference => importedReference.assembly).concat([exportName]), "class", exportName);
        if ((classDeclarationMatch?.groups?.baseClass?.length || 0) > 0) {
            //console.log("classDeclarationMatch?.groups?.baseClass?.length")
            code = code.replace(new RegExp(classDeclarationMatch?.groups?.baseClass.replace(/_/g, "."), ""), `(${classDeclarationMatch?.groups?.baseClass.replace(/_/g, ".")})`);
        }
    }
    else {
        try {

            let enumFunctionRegex = cloneRegex(rxEnumFunction),
                functionRegex = cloneRegex(rxFunction);
            let match = null;
            if ((match = enumFunctionRegex.exec(destinationContent)) !== null) {
                exportName = match.groups.assembly;
                code = generateCode(`let ${match.groups.assembly} = ${match.groups.assembly.replace(/_/g, ".")}\r\n` + match.groups.text, importedReferences.map(importedReference => importedReference.assembly).concat([exportName]), "enum", exportName);
            }
            else if ((match = functionRegex.exec(destinationContent)) !== null) {
                exportName = match.groups.assembly;
                code = generateCode(`let ${match.groups.assembly} = ${match.groups.assembly.replace(/_/g, ".")}\r\n` + ` = function ${match.groups.parameters} { ${destinationContent.substring(functionRegex.lastIndex)} `, importedReferences.map(importedReference => importedReference.assembly).concat([exportName]), "function", exportName);
            }
            else {
                throw new Error(`No Class or Function definition`)
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }
    if (exportName) {
        let manifest = []
        if (importedReferences?.length > 0) {
            importedReferences.forEach(importedReference => {
                let loadRequirementArray = [];
                if (importedReference.config?.exclude !== true && importedReference.assembly?.name?.toLowerCase() !== "mrbrbase") {
                    importedReference.config?.default && loadRequirementArray.push("default");
                    importedReference.config?.required && loadRequirementArray.push("required");
                    importedReference.config?.optional && loadRequirementArray.push("optional");
                    importedReference.config?.cascade && loadRequirementArray.push("cascade");
                    importedReference.config?.force && loadRequirementArray.push("force");
                }
                let loadRequirement = loadRequirementArray.map(_loadRequirement => `mir.${_loadRequirement}`).join(" | ");
                manifest.push(`${" ".repeat(8)} miofc(${importedReference.assembly.replace(/_/g, ".")}  ${loadRequirementArray?.length > 0 ? "," : ""} ${loadRequirement})`);
            })

            //}
            //    manifest = manifest.concat(...[importedReferences.filter(entry => entry.optional === false).filter(entry => entry.assembly?.name?.toLowerCase() !== "mrbrbase").map(include => (`${" ".repeat(8)} miofc(${include.assembly.replace(/_/g, ".")})`))])
        }
        let source = prettify(`((mrbr, data, resolve, reject, symbols) => {
            ${!(classDeclarationMatch) ? "if (MrbrBase.Namespace.isNamespace(" + exportName.replace(/_/g, '.') + ")){" + exportName.replace(/_/g, '.') + " = {}; } " : ""}
            ${manifest?.length ? "const miofc = Mrbr.IO.File.component, mir= Mrbr.IO.LoadRequirements;\r\n" : ""}
            ${preloadAssembly?.length ? `mrbr.loadManifest( miofc(${preloadAssembly},  mir.required) )\r\n` : ""}
            ${preloadAssembly?.length ? ".then(_ =>{" : ""}
            ${code} \r\n
                ${manifest?.length ? exportName + "[symbols.manifest] = [ " + manifest.join(",\r\n") + "]" : ""}                
                ${exportName} [symbols.componentName] = "${exportName.replace(/_/g, '.')}";
    setTimeout(() => { resolve(${exportName.replace(/_/g, ".")}) }, 0)
                ${preloadAssembly?.length ? "})" : ""}
                ${preloadAssembly?.length ? ".catch(err => reject(err))" : ""}
})(mrbr, data, resolve, reject, symbols)
            `, true)
        fs.writeFileSync(destinationFileName, source)
    }
}

function prettify(code, beautify = false) {
    return code;
    // var options = {
    //     compress: {
    //         drop_debugger: true
    //       },
    //     mangle: false,
    //     output: {
    //         beautify: beautify
    //     }
    // };
    // var result = UglifyJS.minify(code, options);
    // var result = UglifyJS.minify(code);
    // return result.code;
}

function generateCode(text, replaceNames, exportType, exportName) {
    if (!replaceNames || replaceNames.length === 0) { return text; }
    const ast = esprima.parseScript(text);
    let foundFirst = false;
    estraverse.traverse(ast, {
        enter: function (node, parent) { if (node.type !== "Program") { return estraverse.VisitorOption.Skip; } },
        leave: function (node, parent) {
            let isBodyExpression = false;
            if (parent?.type === "Program") {
                if (node.type === "ExpressionStatement") {
                    if (
                        node.expression.type === "AssignmentExpression" &&
                        node.expression.left.type === "MemberExpression" &&
                        node.expression.left.object.type === "Identifier" &&
                        node.expression.left.object.name === exportName) {
                        isBodyExpression = true;
                    }
                    traverseNodes(node, replaceNames, isBodyExpression)
                }
                else if (node.type === "VariableDeclaration") {
                    node.declarations.forEach(declarator => {
                        for (const key in declarator) {
                            const nodeKey = declarator[key];
                            if (nodeKey instanceof Object) {
                                if (Array.isArray(nodeKey)) {
                                    nodeKey.forEach(nodeItem => {
                                        traverseNodes(nodeItem, replaceNames, (
                                            nodeItem.id?.type === "Identifier" &&
                                            nodeItem.id?.name === exportName)
                                        );
                                    })
                                }
                                else {
                                    traverseNodes(nodeKey, replaceNames, (
                                        nodeKey.type === "Identifier" &&
                                        nodeKey.name === exportName));

                                }
                            }
                        };
                    })
                }
                else {
                    traverseNodes(node, replaceNames, isBodyExpression)
                }
            }
        }
    });
    return escodegen.generate(ast);
}
function traverseNodes(node, replaceNames, bodyExpression = false) {
    if (!node || (Array.isArray(node) === false && node instanceof Object === false)) { return; }
    if (node.type === "Identifier" && replaceNames.indexOf(node.name) >= 0) {
        if (!bodyExpression) { node.name = node.name.replace(/_/g, ".") }
    }
    else if (node.hasOwnProperty("name") && replaceNames.indexOf(node.name) >= 0) {
        if (!bodyExpression) { node.name = node.name.replace(/_/g, ".") }
    }
    if (bodyExpression) { return; }
    for (const key in node) {
        const nodeKey = node[key];
        Array.isArray(nodeKey) ?
            nodeKey.forEach(nodeItem => { traverseNodes(nodeItem, replaceNames); }) :
            traverseNodes(nodeKey, replaceNames);
    };
}

function getExtension(filename) {
    const lastIndexOfDot = filename.lastIndexOf('.');
    return (lastIndexOfDot < 0) ? '' : filename.substr(lastIndexOfDot);
}


function GetFileListRecursively(targetpath, extension, depth = -1) {
    let result = [],
        dirEntries = fs.readdirSync(targetpath);
    dirEntries.forEach(file => {
        const filepath = path.join(targetpath, file),
            isDir = fs.lstatSync(filepath).isDirectory();
        (isDir || (!isDir && getExtension(filepath).toLowerCase() === extension.toLowerCase())) && result.push({ path: filepath, isDir: isDir })
        if (isDir) {
            if (depth == 0) return result;
            result = result.concat(GetFileListRecursively(filepath, extension, depth - 1));
        }
    });
    return result;
};

function CopyFilesRecursively(sourcePath, destinationPath, extension) {
    (!fs.existsSync(destinationPath)) && fs.mkdirSync(destinationPath, { recursive: true });
    GetFileListRecursively(sourcePath, extension)
        .forEach(node => {
            const newPath = path.join(destinationPath, node.path.substring(sourcePath.length));
            try {
                fs.accessSync(sourcePath, fs.constants.R_OK);
                fs.accessSync(destinationPath, fs.constants.W_OK);
                (node.isDir && !fs.existsSync(newPath)) && fs.mkdirSync(newPath, { recursive: true });
                !node.isDir && fs.copyFile(node.path, newPath, err => { if (err) throw err });
            }
            catch (ex) {
                console.log(
                    (_ => {
                        switch (ex.errno) {
                            case -2: return `File "${node.path}" doesn't exist.`;
                            case -13: return `Could not access "${path.resolve(destinationPath)}"`;
                            default: return `Could not copy "${node.path}" to "${newPath}"`;
                        }
                    })()
                )
            }
        });
};

function cloneRegex(regex) {
    return new RegExp(regex.source, regex.flags);
}