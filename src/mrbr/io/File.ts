import { Mrbr_IO_FileType } from "./FileType";

export class Mrbr_IO_File {
    _fileType: Mrbr_IO_FileType;
    _entryName: string;
    _fileName: string;
    _id: string;
    _root: string;
    _loadingPromise?: Promise<any>;
    _attributes: object
    _data?: object
    _extension: string;
    constructor(fileType: Mrbr_IO_FileType, root: string | null | undefined, entryName: string, extension: string, attributes?: object, data?: object) {
        let self = this,
            mrbrIOFileType = Mrbr_IO_FileType;
        self.fileType = fileType;
        self.entryName = entryName;
        self.data = data;
        self.root = root;
        self.extension = extension;
        switch (fileType) {
            case mrbrIOFileType.Component:
                const componentToFileNameRegex = /[._]/g
                self.fileName = entryName.replace(componentToFileNameRegex, "/");
                if (!root) {
                    self.root = self.fileName.substring(0, self.fileName.indexOf("/"))
                }
                break;
            default:
                break;
        }
        self.attributes = attributes;
    }
    get fileType(): Mrbr_IO_FileType { return this._fileType; };
    set fileType(value: Mrbr_IO_FileType) { this._fileType = value; };
    get extension(): string { return this._extension; }
    set extension(value: string) { this._extension = value }
    get entryName(): string { return this._entryName; }
    set entryName(value: string) { this._entryName = value; }
    get fileName(): string { return this._fileName; }
    set fileName(value: string) { this._fileName = value; }
    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }
    get root(): string { return this._root; }
    set root(value: string) { this._root = value; }
    get loadingPromise(): Promise<any> { return this._loadingPromise; }
    set loadingPromise(value: Promise<any>) { this._loadingPromise = value; }
    get attributes(): object { return this._attributes; }
    set attributes(value: object) { this._attributes = value; }
    get data(): object { return this._data; }
    set data(value: object) { this._data = value; }
    setData(value: object): Mrbr_IO_File { this.data = value; return this; }
    setAttributes(value: object): Mrbr_IO_File { this.attributes = value; return this; }
    static createId(prefix: string) { return `${prefix}_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`; }
    static component(entryName: string, root?: string | null | undefined): Mrbr_IO_File {
        return new Mrbr_IO_File(Mrbr_IO_FileType.Component, root, entryName, "js");
    }
}