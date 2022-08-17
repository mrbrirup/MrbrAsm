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

let sourceFolder = args.source || "./src";
let destinationFolder = args.dest || "./dist";
//let sourceFolder = args.source || null;
//let destinationFolder = args.dest || null;
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
let mrbrBaseSourceFile = "MrbrBase.ts";
let fileCreated = false;
// let sourceFile = sourceFiles.find(sourceFile => sourceFile.shortSourceFileName.substring(sourceFile.shortSourceFileName.length - sourceFileName.length).toLowerCase() === sourceFileName.toLowerCase());
// let sourceContent = fs.readFileSync(sourceFile.longSourceFileName, "utf8")
// console.log(tokeniseTextBlocks(sourceContent).tokens.length);
// let res = tokeniseTextBlocks(sourceContent).tokens
// let counter = 0;
// let lastToken = res[counter]
// while (counter < res.length) {
//     counter++;
//     let thisToken = res[counter]
//     console.log(lastToken.blockType,`###${sourceContent.substring(lastToken.index, thisToken.index + 1)}###`)
//     //console.log(lastToken.blockType, lastToken.index, thisToken.index)
//     counter++;
//     lastToken = res[counter]
// }
var esprima = require('esprima')
var estraverse = require("estraverse")
let escodegen = require("escodegen");
let expressionTypes = [
    "ThisExpression", "Identifier ", "Literal", "ArrayExpression", "ObjectExpression",
    "FunctionExpression", "ArrowFunctionExpression", "ClassExpression", "TaggedTemplateExpression",
    "MemberExpression", "Super", "MetaProperty", "NewExpression", "CallExpression", "UpdateExpression",
    "AwaitExpression", "UnaryExpression", "BinaryExpression", "LogicalExpression", "ConditionalExpression",
    "YieldExpression", "AssignmentExpression", "SequenceExpression",
]
createMrbrBaseFile(mrbrBaseSourceFile);
function createMrbrBaseFile(sourceFileName) {
    //debugger
    let sourceFile = sourceFiles.find(sourceFile => sourceFile.shortSourceFileName.substring(sourceFile.shortSourceFileName.length - sourceFileName.length).toLowerCase() === sourceFileName.toLowerCase());
    const importedReferences = [];
    const regex = /(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?(\s*?|(\s*\/{2}\s*?(?<exclude>exclude)))$)/gm
    //console.log("sourceFile.longSourceFileName: ", sourceFile.longSourceFileName)
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
    //let outputFileName = path.join(resolvedDestinationFolder, "mrbr\\mrbr.js")
    let classDeclarationRegex = /(?<exportStatement>(?<export>export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_$]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]*)?(?<end>\s*?){)/gm;

    let destinationContent = fs.readFileSync(sourceFile.longDestinationFileName, "utf-8")

    let classDeclarationMatch = classDeclarationRegex.exec(destinationContent)

    destinationContent = destinationContent.substring(classDeclarationRegex.lastIndex - 1)
    let exportType = classDeclarationMatch?.groups?.exportType,
        startPosition = classDeclarationMatch?.index;
    let includeClassExtension = "\r\n";
    if (!classDeclarationMatch) {
        //console.log("!classDeclarationMatchs:", sourceFileName)
        return
    }
    if (classDeclarationMatch.groups?.extends && classDeclarationMatch.groups?.baseClass) {
        let baseClass = classDeclarationMatch.groups?.baseClass;
        if (importedReferences.map(importedReference => importedReference.assembly).indexOf(baseClass) > -1) {
            includeClassExtension = (`var mrbrClassExtension = (${classDeclarationMatch.groups?.baseClass});\r\n`);
            //includeClassExtension = (`var mrbrClassExtension = (${classDeclarationMatch.groups?.baseClass.replace(/_/gm, '.')});\r\n`);
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
        replaceText = `${includeClassExtension}${exportName} = ${exportType} ${classExtension}`.replace(/ {2}/, " ")
    }
    let outputTextArray = [
        //"Hello",
        replaceText,
        destinationContent
    ]

    if (fileCreated === false) {
        outputTextArray.push(`MrbrBase.Namespace.createAssembly(window, "Mrbr");`)
        //outputTextArray.push(`let Mrbr = new MrbrBase({});`)

    }
    let outputText = "\r\n" + outputTextArray.join("\r\n") + "\r\n";

    const ast = esprima.parseScript(outputText)


    let replaceNames = importedReferences.map(importedReference => importedReference.assembly).concat([exportName])
    console.log(replaceNames);
    let set1 = new Set();
    estraverse.traverse(ast, {
        enter: function (node, parent) {
            //if (expressionTypes.indexOf(node.type) < 0) { return estraverse.VisitorOption.Skip; }
            if (node.type === "CallExpression") {
                if (//node.callee.type === "Super" ||
                    node.type === "Literal"
                ) {
                    return estraverse.VisitorOption.Skip;
                }
            }

        },
        leave: function (node, parent) {
            if (node.type === "Program") {
                //let programKeys = Object.keys(node)
                console.log("Program")
                //console.log(programKeys);
                traverseNodes(node)
            }
            return node;
        }
    });


    function traverseNodes(node) {
        //if (expressionTypes.indexOf(node.type) < 0) { return; }
        if (!node) { return; }
        if (!node?.type) {
            console.log(node)
            //debugger
        }
        switch (node.type) {
            case "Program":
                node.body.forEach(bodyNode => traverseNodes(bodyNode));
                break;
            case "VariableDeclaration":
                node.declarations.forEach(declaration => { traverseNodes(declaration) })
                break;
            case "VariableDeclarator":
                console.log("id and init: ", node.id, node.init)
                traverseNodes(node.id)
                traverseNodes(node.init)
                break;
            case "AssignmentExpression":
                traverseNodes(node.left)
                traverseNodes(node.right)
                break;
            case "ExpressionStatement":
                //console.log("ExpressionStatement")
                traverseNodes(node.expression)
                break;
            case "Identifier":
                if (replaceNames.indexOf(node.name) >= 0) { node.name = node.name.replace(/_/g, ".") }
                break;
            case "MemberExpression":
                traverseNodes(node.object)
                traverseNodes(node.property)
                break;
            case "ClassDeclaration":
                traverseNodes(node.id)
                traverseNodes(node.body);
                break;
            case "ClassBody":
                node.body.forEach(body => { traverseNodes(body) })
                break;
            case "MethodDefinition":
                traverseNodes(node.key);
                traverseNodes(node.value);
                traverseNodes(node.params);
                break;
            // case "BlockStatement":
            //     node.body.forEach(body => { traverseNodes(body) })
            //     break;
            default:
                let keys = Object.keys(node)
                keys.forEach(key => {
                    if (Array.isArray(node[key]) === false) {
                        if (node[key]?.hasOwnProperty("type") === true) {
                            traverseNodes(node[key]);
                        }
                    }
                    else {
                        let nodeArray = node[key];
                        nodeArray.forEach(nodeItem => {
                            if (nodeItem?.hasOwnProperty("type") === true) {
                                traverseNodes(nodeItem);
                            }
                        })
                    }
                })
                break;
        }


        // //if (node.type)            let nodeKeys = Object.keys(node);
        // nodeKeys?.forEach(nodeEntry => {
        //     if (Array.isArray(node[nodeEntry])) {
        //         node[nodeEntry].forEach(nodeEntryItem => traverseNodes(nodeEntryItem))
        //         //node[nodeEntry].forEach(nodeEntryItem => console.log(nodeEntryItem))
        //         //console.log("Array", node)
        //     }
        //     else {
        //         //console.log(node, nodeKeys.join(","))
        //         console.log("Single", nodeEntry)
        //         //traverseNodes(node[nodeEntry])
        //     }
        // })

    }






    let code = escodegen.generate(ast)

    if (fileCreated === false) {
        fs.writeFileSync(mrbrJSRootFile, code);
        fileCreated = true
    }
    else {
        fs.appendFileSync(mrbrJSRootFile, "\r\n" + code + "\r\n");
    }
    //    console.log(set1)
    //});
    if (1 < 2) {

        importedReferences.forEach(importedReference => {
            let importedFileName = `${importedReference.assembly.replace(/_/g, "\\")}.ts`
            //console.log("importedFileName: ", importedFileName)
            createMrbrBaseFile(importedFileName);
        });

    }


}




