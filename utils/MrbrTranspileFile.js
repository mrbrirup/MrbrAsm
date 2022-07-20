class MrbrTranspileFile {
    shortSourceFileName;
    shortDestinationFileName;
    longSourceFileName;
    longDestinationFileName;
    matchedFiles = false;
    assemblyFileName;
    static sourceFolder;
    static destinationFolder;
    constructor(longSourceFileName, longDestinationFileName, matchedFiles, resolvedSourceFolder, resolvedDestinationFolder,assemblyFileName) {
        //console.log(resolvedSourceFolder, resolvedDestinationFolder);
        this.longSourceFileName = longSourceFileName;
        this.longDestinationFileName = longDestinationFileName;
        this.matchedFiles = matchedFiles;
        this.shortSourceFileName = longSourceFileName.substring(resolvedSourceFolder.length);
        this.shortDestinationFileName = longDestinationFileName.substring(resolvedDestinationFolder.length).replaceAll("\\", "/");
        this.assemblyFileName = assemblyFileName;
    }
}
exports.MrbrTranspileFile = MrbrTranspileFile;
