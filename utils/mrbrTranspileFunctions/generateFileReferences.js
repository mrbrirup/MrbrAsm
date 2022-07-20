const fs = require("fs");
const path = require("path");
let generateFileReferences = function (fileName, directory, mrbrRootManifest, parentObject) {

    let importRegex = /(?<import>import)\s*{\s*(?<objectName>\w+)\s*}\s+(?<from>from)\s*(?<fileDefinition>(?<quoteStart>['"`])(?<fileName>.*)(?<quoteEnd>['"`]))(;|$)/gm

    let match;

    let sourceFileContents = fs.readFileSync(fileName, "utf-8");

    while ((match = importRegex.exec(sourceFileContents)) !== null) {
        if (match.index === importRegex.lastIndex) {
            importRegex.lastIndex++;
        }
        let currentFileName = path.join(directory, `${match.groups.fileName}.ts`)

        let newObject = { objectName: match.groups.objectName, sourceFileName: currentFileName, children:[] }
        mrbrRootManifest.push(newObject)
        parentObject.children.push(newObject)
        generateFileReferences(currentFileName, path.dirname(currentFileName), mrbrRootManifest, newObject)
    }
}
exports.generateFileReferences = generateFileReferences