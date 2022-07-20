const fs = require("fs");
const { extname } = require("path");
const path = require("path");
const { exit } = require("process");
const { MrbrTranspileFile } = require("./MrbrTranspileFile");
const args = require("yargs").argv;
const typescriptFileExtension = ".ts";
const parseString = require("xml2js").parseString;
class MrbrJSFileStructure {
    sourceFileDirectivesRegex = /^\/{3}\s*(?<mrbrTag><mrbr.*?\/>)\s*$|(^(?<import>import)\s*\{*\s*(?<assembly>\S*?)\s*\}*\s*from\s*(?<fileName>'.*?'|".*?")[\s;]*?\s*?$)|(^(?<export>\s*export\s+)(?<exportType>(class|enum))\s+(?<exportName>(\S[\S_]+)?)(?<genericType>\<\s*\S+\s*\>)*(?<extends>\s+extends\s+)*(?<baseClass>\S[\S_]+)?(\s*{))/mg;
    manifestEntries = [];
    manifestEntriesStartBlock = `manifest: [`;
    manifestEntriesEndBlock = `],`;
    definitions = [];
    fileStartBlock = `(_ => {\r\n\t{`;
    fileEndBlock = `\t}\r\n)()`;
    definitionsStartBlock = `definitions: [`
    definitionsEndBlock = `]`;
    mrbrDirectives;
    transpileFile;
    sourceFileContents;
    jsSourceFileContents;
    declarations;
    imports;
    encoding = 'utf8';
    constructor(transpileFile) {
        let self = this;
        self.transpileFile = transpileFile;
        self.sourceFileContents = fs.readFileSync(self.transpileFile.longSourceFileName, self.encoding)
        self.jsSourceFileContents = fs.readFileSync(self.transpileFile.longDestinationFileName, self.encoding)
        let matches = [];
        let match;
        while ((match = self.sourceFileDirectivesRegex.exec(self.jsSourceFileContents)) !== null) {
            if (match.index === self.sourceFileDirectivesRegex.lastIndex) {
                self.sourceFileDirectivesRegex.lastIndex++;
                continue;
            }
            matches.push(match);
        }
        self.declarations = matches.filter(match => match.groups?.exportType)
        self.imports = matches.filter(match => match.groups?.import);
        self.mrbrDirectives = matches.filter(match => match.groups?.mrbrTag);
    }
    processTranspileFile() {

    }
    get requiresManifest() {
        const self = this,
            mrbrDirectivesXmlTag = "mrbrDirectives";
        let mrbrDirectives;
        parseString(`<${mrbrDirectivesXmlTag}>${self.mrbrDirectives.map(mrbrTag => mrbrTag.groups.mrbrTag).join("\r\n")}</${mrbrDirectivesXmlTag}>`, (err, result) => mrbrDirectives = result);
        const doesRequireManifest = mrbrDirectives?.mrbrDirectives?.mrbr
            ?.filter(attribute => attribute?.$?.manifest)
            .reduce((_, current) => (current.$?.manifest === "true"), true);
        return (doesRequireManifest === undefined ? true : doesRequireManifest);
    }
    toString() {
        return "";
    }
}
exports.MrbrJSFileStructure = MrbrJSFileStructure;