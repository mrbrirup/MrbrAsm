import { MrbrBase } from "../system/MrbrBase";//exclude
import { Mrbr_IO_FileType } from "./FileType";
import { Mrbr_IO_Path } from "./Path";
export class Mrbr_IO_File {
    _fileType: Mrbr_IO_FileType;
    _entry: any;
    _fileName: string;
    _id: string;
    _root: string;
    _loadingPromise?: Promise<any>;
    _attributes: object
    _data?: object
    _extension: string;
    constructor(fileType: Mrbr_IO_FileType, root: string | null | undefined, entry: any, extension: string, attributes?: object, data?: object) {
        const self = this,
            mrbrIOFileType = Mrbr_IO_FileType,
            ns = MrbrBase.Namespace;
        //debugger
        self.fileType = fileType;
        self.entry = entry;
        self.data = data;
        self.root = root;
        self.extension = extension;
        switch (fileType) {

            case mrbrIOFileType.Component:
                if (ns.isNamespace(self.entry) === true) {
                    self.root = entry[ns.ROOT];
                    let fileName = ns.namespace(self.entry).replace(/\./g, "/");
                    let rootPath = MrbrBase.mrbrInstance.paths.get(self.root) || "";
                    self.fileName = Mrbr_IO_Path.join([rootPath, fileName], false) + `.${self.extension}`;
                }
                // const componentToFileNameRegex = /[._]/g,
                // ns = MrbrBase.Namespace;
                // if (ns.isNamespace(self.entryName)) {
                //     self.fileName = ns.namespace(self.entryName).replace(/_/g, "/")
                // }
                // else {
                //     self.fileName = self.entryName.replace(/_/g, "/")
                // }
                // self.fileName = entryName.replace(componentToFileNameRegex, "/");
                // if (!root) {
                //     self.root = self.fileName.substring(0, self.fileName.indexOf("/"))
                // }
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
    get entry(): string { return this._entry; }
    set entry(value: string) { this._entry = value; }
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
    static component(entry: any): Mrbr_IO_File {
        let componentFile = new Mrbr_IO_File(Mrbr_IO_FileType.Component, null, entry, "js");        
        return componentFile;
    }
}