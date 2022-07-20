import { Mrbr_IO_FileType } from "./FileType";

export class Mrbr_IO_File {
    _fileType: Mrbr_IO_FileType;
    get fileType(): Mrbr_IO_FileType { return this._fileType; };
    set fileType(value: Mrbr_IO_FileType) { this._fileType = value; };
    entryName: string;
    fileName: string;
    id: string;
    isAsync: boolean;
    isModule: boolean
    root: string;
    loadingPromise?: Promise<any>;
    attributes: object
    constructor(fileType: Mrbr_IO_FileType, root: string | null | undefined, entryName: string, id: string | null, isAsync: boolean, isModule: boolean, attributes?: object) {
        let self = this,
            mrbrIOFileTYpe = Mrbr_IO_FileType;
        self.fileType = fileType;
        self.entryName = entryName;
        if (id) { self.id = id; }
        else { self.id = self.newId(); }
        self.isAsync = isAsync;
        self.isModule = isModule;
        self.root = root;
        switch (fileType) {
            case Mrbr_IO_FileType.Component:
                const componentToFileNameRegex = /\[._]/g
                self.fileName = entryName.replace(componentToFileNameRegex, "/");
                if (!root) {
                    self.root = self.fileName = self.fileName.substring(0, self.fileName.indexOf("/"))
                }
                break;
            default:
                break;
        }
        self.attributes = attributes;
    }
    newId() {
        const currentDate = new Date();
        var epochTicks = 621355968000000000;
        var ticksPerMillisecond = 10000;
        var ticks = epochTicks + (currentDate.getTime() * ticksPerMillisecond);
        const suffix = Math.floor(Math.random() * 100);
        const prefix = "script";
        const id = `${prefix}_${ticks}_${suffix}`;
        return id;
    }
}
