/*
The MIT License (MIT)
Copyright © 2022 mrbrirup
https://github.com/mrbrirup/MrbrAsm/blob/main/LICENSE
*/
import { MrbrBase } from "../system/MrbrBase";//optional
import { Mrbr_IO_FileOptions } from "./FileOptions";
import { Mrbr_IO_FilePromise } from "./FilePromise";
import { Mrbr_IO_LoadRequirements } from "./LoadRequirements";
import { Mrbr_IO_FileType } from "./FileType";
import { Mrbr_IO_Path } from "./Path";
export class Mrbr_IO_File {

    private _entry: any;
    private _extension: string;
    private _fileType: Mrbr_IO_FileType;
    private _fileName: string;
    private _id: string;
    private _loadingPromise?: Mrbr_IO_FilePromise;
    private _options: Mrbr_IO_FileOptions;
    private _root: string;
    private _loadRequirement: Mrbr_IO_LoadRequirements = Mrbr_IO_LoadRequirements.optional;
    private $cls = Mrbr_IO_File;
    private $ns = MrbrBase.Namespace;
    private $options = Mrbr_IO_FileOptions;
    private $path = Mrbr_IO_Path;
    private $type = Mrbr_IO_FileType;
    constructor(fileType: Mrbr_IO_FileType, root: string | null | undefined, entry: any, extension: string, loadRequirement: Mrbr_IO_LoadRequirements = Mrbr_IO_LoadRequirements.optional, options?: Mrbr_IO_FileOptions) {
        const self = this;
        self.entry = entry;
        self.extension = extension;
        self.fileType = fileType;
        self.id = self.$cls.createId(self.fileType);
        self.loadRequirement = loadRequirement;
        self.root = root;
        switch (fileType) {
            case self.$type.Component:
                if (self.$ns.isNamespace(self.entry) === true) {
                    self.root = entry[self.$ns.ROOT];
                    let fileName = self.$ns.namespace(self.entry).replace(/\./g, "/");
                    let rootPath = MrbrBase.mrbrInstance.paths.get(self.root) || "";
                    self.fileName = self.$path.join([rootPath, fileName], false) + `.${self.extension}`;
                }
                break;
            default:
                break;
        }
    }
    get attributes(): object { return this.options?._attributes; }
    set attributes(value: object) { this.options._attributes = value; }
    get data(): object { return this.options?._data; }
    set data(value: object) { this.options._data = value; }
    get entry(): string { return this._entry; }
    set entry(value: string) { this._entry = value; }
    get extension(): string { return this._extension; }
    set extension(value: string) { this._extension = value }
    get fileName(): string { return this._fileName; }
    set fileName(value: string) { this._fileName = value; }
    get fileType(): Mrbr_IO_FileType { return this._fileType; };
    set fileType(value: Mrbr_IO_FileType) { this._fileType = value; };
    get id(): string { return this._id; }
    set id(value: string) { this._id = value; }
    get loadingPromise(): Mrbr_IO_FilePromise { return this._loadingPromise; }
    set loadingPromise(value: Mrbr_IO_FilePromise) { this._loadingPromise = value; }
    public get loadRequirement(): Mrbr_IO_LoadRequirements { return this._loadRequirement; }
    public set loadRequirement(value: Mrbr_IO_LoadRequirements) { this._loadRequirement = value; }
    public get options(): Mrbr_IO_FileOptions { return this._options; }
    public set options(value: Mrbr_IO_FileOptions) { const self = this; self._options && (_ => self._options = new self.$options())(); this._options = value; }
    get root(): string { return this._root; }
    set root(value: string) { this._root = value; }
    setData(value: object): Mrbr_IO_File { this.data = value; return this; }
    setAttributes(value: object): Mrbr_IO_File { this.attributes = value; return this; }
    static createId(prefix: string) { return `${prefix}_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`; }
    static component(entry: any): Mrbr_IO_File {
        let io = MrbrBase.mrbrInstance.host.Mrbr.IO;
        let componentFile = new io.File(io.FileType.Component, null, entry, "js");
        return componentFile;
    }
}