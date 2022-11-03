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

/**
 * A file to load
 * @date 03/11/2022 - 05:37:27
 *
 * @export
 * @class Mrbr_IO_File
 * @typedef {Mrbr_IO_File}
 */
export class Mrbr_IO_File {

    
    /**
     * Entry to load
     * @date 03/11/2022 - 05:57:43
     *
     * @private
     * @type {*}
     */
    private _entry: any;
    
    /**
     * File load extension
     * @date 03/11/2022 - 05:58:03
     *
     * @private
     * @type {string}
     */
    private _extension: string;
    
    /**
     * File Type to load
     * @date 03/11/2022 - 05:58:19
     *
     * @private
     * @type {Mrbr_IO_FileType}
     */
    private _fileType: Mrbr_IO_FileType;
    
    /**
     * Filename to load
     * @date 03/11/2022 - 05:58:31
     *
     * @private
     * @type {string}
     */
    private _fileName: string;
    
    /**
     * File Load Request Id
     * @date 03/11/2022 - 05:58:39
     *
     * @private
     * @type {string}
     */
    private _id: string;
    
    /**
     * File load promise
     * @date 03/11/2022 - 05:58:48
     *
     * @private
     * @type {?Mrbr_IO_FilePromise}
     */
    private _loadingPromise?: Mrbr_IO_FilePromise;
    
    /**
     * Additional options to apply to file load request
     * @date 03/11/2022 - 05:59:03
     *
     * @private
     * @type {Mrbr_IO_FileOptions}
     */
    private _options: Mrbr_IO_FileOptions;
    
    /**
     * Root of namespace
     * @date 03/11/2022 - 05:59:16
     *
     * @private
     * @type {string}
     */
    private _root: string;
    
    /**
     * File load requirements, required, optional, etc.
     * @date 03/11/2022 - 05:59:30
     *
     * @private
     * @type {Mrbr_IO_LoadRequirements}
     */
    private _loadRequirement: Mrbr_IO_LoadRequirements = Mrbr_IO_LoadRequirements.optional;    
    
    /**
     * Alias to MrbrBase.Namespace
     * @date 03/11/2022 - 05:59:59
     *
     * @private
     * @type {*}
     */
    private $ns = MrbrBase.Namespace;
    
    /**
     * Alias to Mrbr_IO_FileOptions
     * @date 03/11/2022 - 06:00:17
     *
     * @private
     * @type {typeof Mrbr_IO_FileOptions}
     */
    private $options = Mrbr_IO_FileOptions;
    
    /**
     * Alias to Mrbr_IO_Path
     * @date 03/11/2022 - 06:00:32
     *
     * @private
     * @type {typeof Mrbr_IO_Path}
     */
    private $path = Mrbr_IO_Path;
    
    /**
     * Alias to Mrbr_IO_FileType
     * @date 03/11/2022 - 06:00:46
     *
     * @private
     * @type {typeof Mrbr_IO_FileType}
     */
    private $type = Mrbr_IO_FileType;

    
    /**
     * Creates an instance of Mrbr_IO_File.
     * @date 03/11/2022 - 05:38:10
     *
     * @constructor
     * @param {Mrbr_IO_FileType} fileType The type of file
     * @param {(string | null | undefined)} root root name of namespace
     * @param {*} entry
     * @param {string} extension        file extension
     * @param {Mrbr_IO_LoadRequirements} [loadRequirement=Mrbr_IO_LoadRequirements.optional]
     * @param {?Mrbr_IO_FileOptions} [options] Additional file options
     */
    constructor(fileType: Mrbr_IO_FileType, root: string | null | undefined, entry: any, extension: string, loadRequirement: Mrbr_IO_LoadRequirements = Mrbr_IO_LoadRequirements.optional, options?: Mrbr_IO_FileOptions) {
        this.entry = entry;
        this.extension = extension;
        this.fileType = fileType;
        this.loadRequirement = loadRequirement;
        this.root = root;
        switch (fileType) {
            case this.$type.Component:
                if (this.$ns.isNamespace(this.entry) === true) {
                    this.root = entry[this.$ns.ROOT];
                    let fileName = this.$ns.namespace(this.entry).replace(/\./g, "/");
                    let rootPath = MrbrBase.mrbrInstance.paths.get(this.root) || "";
                    this.fileName = this.$path.join([rootPath, fileName], false) + `.${this.extension}`;
                }
                break;
            default:
                break;
        }
    }
    
    /**
     * Additional options to apply to file load request
     * @date 03/11/2022 - 05:39:45
     *
     * @type {object}
     */
    get attributes(): object { return this.options?._attributes; }
    
    /**
     * Additional options to apply to file load request
     */
    set attributes(value: object) { this.options._attributes = value; }
    
    /**
     * Addition data to apply to file load request
     * @date 03/11/2022 - 05:40:16
     *
     * @type {object}
     */
    get data(): object { return this.options?._data; }
    
    /**
     * Addition data to apply to file load request
     */
    set data(value: object) { this.options._data = value; }
    
    /**
     * Entry to load
     * @date 03/11/2022 - 05:40:56
     *
     * @type {string}
     */
    get entry(): string { return this._entry; }
    
    /**
     * Entry to load
     */
    set entry(value: string) { this._entry = value; }
    
    /**
     * File name extension
     * @date 03/11/2022 - 05:41:16
     *
     * @type {string}
     */
    get extension(): string { return this._extension; }
    
    /**
     * File name extension
     */
    set extension(value: string) { this._extension = value }
    
    /**
     * Filename to load
     * @date 03/11/2022 - 05:41:31
     *
     * @type {string}
     */
    get fileName(): string { return this._fileName; }
    
    /**
     * Filename to load
     */
    set fileName(value: string) { this._fileName = value; }
    
    /**
     * File type to load
     * @date 03/11/2022 - 05:41:46
     *
     * @type {Mrbr_IO_FileType}
     */
    get fileType(): Mrbr_IO_FileType { return this._fileType; };
    
    /**
     * File type to load
     */
    set fileType(value: Mrbr_IO_FileType) { this._fileType = value; };
    
    /**
     * File Load Request Id
     * @date 03/11/2022 - 05:41:59
     *
     * @type {string}
     */
    get id(): string { return this._id; }
    
    /**
     * File Load Request Id
     */
    set id(value: string) { this._id = value; }
    
    /**
     * File Promise when loading file, multiple request for the sma efile share the same promise
     * @date 03/11/2022 - 05:42:25
     *
     * @type {Mrbr_IO_FilePromise}
     */
    get loadingPromise(): Mrbr_IO_FilePromise { return this._loadingPromise; }
    
    /**
     * File Promise when loading file, multiple request for the sma efile share the same promise
     */
    set loadingPromise(value: Mrbr_IO_FilePromise) { this._loadingPromise = value; }
    
    /**
     * Loading requirements, e.g. optional, required, etc.
     * @date 03/11/2022 - 05:43:15
     *
     * @public
     * @type {Mrbr_IO_LoadRequirements}
     */
    public get loadRequirement(): Mrbr_IO_LoadRequirements { return this._loadRequirement; }
    
    /**
     * Loading requirements, e.g. optional, required, etc.
     */
    public set loadRequirement(value: Mrbr_IO_LoadRequirements) { this._loadRequirement = value; }
    
    /**
     * Additional options to apply to file load request, data and attributes
     * @date 03/11/2022 - 05:44:36
     *
     * @public
     * @type {Mrbr_IO_FileOptions}
     */
    public get options(): Mrbr_IO_FileOptions { return this._options; }
    
    /**
     * Additional options to apply to file load request, data and attributes
     */
    public set options(value: Mrbr_IO_FileOptions) { const self = this; self._options && (_ => self._options = new self.$options())(); this._options = value; }
    
    /**
     * Root of namespace for namespaced objects
     * @date 03/11/2022 - 05:45:13
     *
     * @type {string}
     */
    get root(): string { return this._root; }
    
    /**
     * Root of namespace for namespaced objects
     */
    set root(value: string) { this._root = value; }
    
    /**
     * Set Data on file load request
     * @date 03/11/2022 - 05:45:38
     *
     * @param {object} value
     * @returns {Mrbr_IO_File}
     */
    setData(value: object): Mrbr_IO_File { this.data = value; return this; }
    
    /**
     * Set Attributes on file load request
     * @date 03/11/2022 - 05:46:00
     *
     * @param {object} value
     * @returns {Mrbr_IO_File}
     */
    setAttributes(value: object): Mrbr_IO_File { this.attributes = value; return this; }
    
    /**
     * Create an id for the file load request
     * @date 03/11/2022 - 05:46:10
     *
     * @static
     * @param {string} prefix
     * @returns {string}
     */
    static createId(prefix: string) { return `${prefix}_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`; }
    
    /**
     * Create a file load request for a component
     * @date 03/11/2022 - 05:46:20
     *
     * @static
     * @param {*} entry
     * @returns {Mrbr_IO_File}
     */
    static component(entry: any): Mrbr_IO_File {
        let io = MrbrBase.mrbrInstance.host.Mrbr.IO;
        let componentFile = new io.File(io.FileType.Component, null, entry, "js");
        return componentFile;
    }
}