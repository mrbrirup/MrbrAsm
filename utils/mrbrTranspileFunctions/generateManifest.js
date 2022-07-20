let ManifestEntryType = {
    component: "component"
}
let ManifestEntry = class {
    _importCommand;
    _assembly;
    _entryName
    _manifestEntryType;

    constructor(importCommand, assembly, entryName, manifestEntryType) {
        this._importCommand = importCommand;
        this._assembly = assembly;
        this._entryName = entryName;
        this._manifestEntryType = manifestEntryType;
    }
    get entryName() { return this._entryName }
    set entryName(value) { this._entryName = value }
    get assembly() { return this._assembly }
    set assembly(value) { this._assembly = value }
    get importCommand() { return this._importCommand }
    set importCommand(value) { this._importCommand = value }
    get manifestEntryType() { return this._manifestEntryType }
    set manifestEntryType(value) { this._manifestEntryType = value }
    toString() {
        const self = this;
        let result;
        switch (self.manifestEntryType) {
            case ManifestEntryType.component:
                //constructor(fileType: Mrbr_IO_FileType, fileName: string, id: string | null, isAsync: boolean, isModule: boolean) {
                const isAsync = "false",
                    isModule = "false",
                    assemblyRoot = self.assembly.substr(0, self.assembly.indexOf("_"))
                result = `new Mrbr_IO_File(Mrbr_IO_FileType.Component, "${assemblyRoot}",  "${this.entryName}", ${isAsync}, ${isModule})`;
                break;

            default:
                result = null;
                break;
        }
        return result;
    }
}
let generateManifestEntry = (manifestEntry) => {
    //console.log("\t", importMatch.groups["import"], importMatch.groups["assembly"], importMatch.groups["fileName"])
    return manifestEntry.toString()

}
let generateManifest = (importMatches) => {
    const manifestEntries = [];
    importMatches.forEach(importMatch => {
        let fileNameRegex = /"(?<dqFileName>.+?)"|'(?<sqFileName>.+?)'|`(?<tFileName>.+?)`/
        let fileName = importMatch.groups["fileName"];
        let fileNameMatch = fileNameRegex.exec(fileName)
        let unquotedFileName = fileNameMatch.groups["dqFileName"] || fileNameMatch.groups["sqFileName"] || fileNameMatch.groups["tqFileName"];
        let manifestEntry = new ManifestEntry(importMatch.groups["import"], importMatch.groups["assembly"], unquotedFileName, ManifestEntryType.component)
        manifestEntries.push(generateManifestEntry(manifestEntry));
    });
    return manifestEntries;
}
exports.ManifestEntry = ManifestEntry;
exports.ManifestEntryType = ManifestEntryType;
exports.generateManifestEntry = generateManifestEntry;
exports.generateManifest = generateManifest;