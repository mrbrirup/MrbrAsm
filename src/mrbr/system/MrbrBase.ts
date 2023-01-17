/*
The MIT License (MIT)
Copyright © 2022 mrbrirup

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { Mrbr_Assembly_MrbrConfig } from '../assembly/mrbrConfig';
import { Mrbr_System_Promise } from './Promise';
import { Mrbr_IO_Fetch } from '../io/Fetch';
import { Mrbr_IO_File } from '../io/File';
import { Mrbr_IO_FilePromise } from '../io/FilePromise';
import { Mrbr_IO_FileType } from '../io/FileType';
import { Mrbr_IO_LoadCssElement } from '../io/LoadCssElement';//mrbr:optional
import { Mrbr_IO_LoadCssLink } from '../io/LoadCssLink';//mrbr:optional
import { Mrbr_IO_LoadScript } from '../io/LoadScript';//mrbr:optional
import { Mrbr_IO_LoadScriptElement } from '../io/LoadScriptElement';//mrbr:optional
import { Mrbr_IO_LoadScriptLink } from '../io/LoadScriptLink';//mrbr:optional
import { Mrbr_IO_ManifestPromise } from '../io/ManifestPromise';
import { Mrbr_IO_ManifestRequirements } from '../io/ManifestRequirements';

type fileLoaderDelegate = (file: Mrbr_IO_File) => Mrbr_IO_FilePromise;

/**
 * Null operation function as place holder for loading functions later
 * @date 22/08/2022 - 19:59:37
 *
 * @typedef {nullFileFunction}
 */
type nullFileFunction = (file: Mrbr_IO_File) => Mrbr_IO_FilePromise;

/**
 * Loading Function delegate
 * Replaced when Loading Function is loaded
 * @date 22/08/2022 - 20:00:18
 *
 * @typedef {loadFunction}
 */
type loadFunction = (file: Mrbr_IO_File) => Mrbr_IO_FilePromise;

/**
 * Base Class for all MrbrAssembly functions
 * Created instance used for loading and recording all other functionality
 * @date 22/08/2022 - 20:01:54
 *
 * @export
 * @class MrbrBase
 * @typedef {MrbrBase}
 * @extends {EventTarget}
 */
export class MrbrBase extends EventTarget {
    public static readonly COMPONENT_NAME: symbol = Symbol("mrbr_component_name");
    public static readonly MANIFEST: symbol = Symbol("mrbr_component_manifest");
    static cacheTimeOut: number = 5000;
    static temporaryObjectTimeOut: number = 5000;
    static defaultMrbrPath: string = "/mrbr/";
    static _mrbr: MrbrBase;
    private _config: Mrbr_Assembly_MrbrConfig;
    private _paths: Map<string, string>;
    private _entries: any;
    private _files: any;
    private _index: any;
    private _assembly: Map<string, any> = new Map<string, any>();
    private _loadFunctionMap: Map<string, loadFunction> = null;
    private _host: any;
    private $promise: typeof Mrbr_System_Promise;
    private $mnfPrm: typeof Mrbr_IO_ManifestPromise;
    private $filePrm: typeof Mrbr_IO_FilePromise;
    private $file: typeof Mrbr_IO_File;
    private $fileType: typeof Mrbr_IO_FileType;
    _loadScript: nullFileFunction = null;
    _loadScriptElement: nullFileFunction = null;
    _loadScriptLink: nullFileFunction = null;
    _loadCssLink: nullFileFunction = null;
    _loadCssElement: nullFileFunction = null;
    //private componentFileReferences = new Map<string, Mrbr_IO_FilePromise>();
    /**
     * Autogenerating Namespace from Proxied Maps to Authogenerate a class
     * Any reference form the root that is not assigned to a different value creates a new level of the namespace
     * The following line adds adds IO to Mrbr, File to IO and = class changes the last value of the Namespace to an object
     * <code>
     *      Mrbr.IO.File = class {} 
     * </code>
     * @date 22/08/2022 - 20:04:05
     *
     * @class
     * @extends {Map<string, any>}
     */
    static Namespace = class extends Map<string, any> {

        /**
         * Checks if current object at the end of namespace is a Namespace object
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:02:58
         *
         * @static
         * @type {Symbol}
         */
        static IS_NAMESPACE = Symbol("__namespace__");

        /**
         * Gets the number of entries in a namespace
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:08:21
         *
         * @static
         * @type {Symbol}
         */
        static SIZE = Symbol("__size__");

        /**
         * Get the Target Map in the namespace
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:08:58
         *
         * @static
         * @type {*}
         */
        static TARGET = Symbol("__target__");

        /**
         * Get the Name of the target Map
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:09:43
         *
         * @static
         * @type {Symbol}
         */
        static NAME = Symbol("__name__");

        /**
         * Link to Parent object for navigation and getting full namespace names and root objects
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:10:17
         *
         * @static
         * @type {Symbol}
         */
        static PARENT = Symbol("__parent__");

        /**
         * Get the fullname of the Namespace
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:10:51
         *
         * @static
         * @type {Symbol}
         */
        static TO_STRING = Symbol("__tostring__");

        /**
         * Checks if a Namespace object is assignable
         * If it is a namespace map and the Map has no entries then another value can be assigned to it
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:11:18
         *
         * @static
         * @type {Symbol}
         */
        static ASSIGNABLE = Symbol("__assignable__");

        /**
         * Get the root object for the namespace
         * Mrbr.IO.File root is Mrbr.
         * Used for getting paths for Mrbr Assembly files
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:12:16
         *
         * @static
         * @type {*}
         */
        static ROOT = Symbol("__root__");

        /**
         * Not used
         * Reserved for setting binding comtexts
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:13:50
         *
         * @static
         * @type {Symbol}
         */
        static BIND = Symbol("__bind__");

        /**
         * Converts a Namespace into its current object
         * Passing Mrbr.IO.File to a method and assigning a value to it
         * will still have the Namespace as value
         * Using 
         * <code>
         *   Mrbr.IO.File[MrbrBase.Namespace.TO_OBJECT] will return the File object assigned to the Mrbr.IO namespace
         * </code>
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:14:19
         *
         * @static
         * @type {Symbol}
         */
        static TO_OBJECT = Symbol("__toobject__");

        /**
         * Returns the iterable collection of Keys for the Target
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:17:01
         *
         * @static
         * @type {Symbol}
         */
        static KEYS = Symbol("__keys__");

        /**
         * Returns collections of Keys for Target as an Array
         * Uses Symbol as unique values to avoid namespace name clashes
         * @date 22/08/2022 - 20:17:51
         *
         * @static
         * @type {Symbol}
         */
        static KEY_ARRAY = Symbol("__keyarray__");




        /**
         * Namespace Component Name          
         * @date 10/09/2022 - 23:53:24
         *
         * @static
         * @type {string}
         */
        static NAMESPACE_COMPONENT_NAME: string = "Mrbr.System.MrbrBase.Namespace";


        /**
         * @date 22/08/2022 - 20:20:03
         *
         * @constructor
         * @param {*} parent parent object that host the namespace object, e.g. Window
         * @param {string} name name of the namespace part to create
         */
        constructor(parent: any, name: string) {
            super()
            const self = this,
                ns = MrbrBase.Namespace;
            self[ns.PARENT] = parent;
            self[ns.NAME] = name;
            self[ns.IS_NAMESPACE] = true;
            self[MrbrBase.COMPONENT_NAME] = "Mrbr.System.MrbrBase.Namespace";
            self[MrbrBase.MANIFEST] = null;
            /// returns this as a Proxied Map    
            return new Proxy(self, ns.PROXY_HANDLER);
        }
        /**
         * 
         * @param target Namespace to convert to Object
         * @returns Object assigned to last part of the namespace or the namespace if nothing else has been assigned to it
         */
        static toObject(target: any): object {
            return target[MrbrBase.Namespace.TO_OBJECT]
        }
        /**
         * Check if an object is a Namespace object
         * @date 22/08/2022 - 20:23:09
         *
         * @static
         * @param {object} target Object to be checked, true if Namespace
         * @returns {boolean}
         */
        static isNamespace(target: any): boolean { return target[MrbrBase.Namespace.IS_NAMESPACE]; }


        /**
         * Can named part be assigned another Namespace part
         * The object must be a Namespace and must have zero entries
         * @date 22/08/2022 - 20:25:46
         *
         * @static
         * @param {*} target
         * @returns {boolean}
         */
        static isAssignable(target: any): boolean {
            return target[MrbrBase.Namespace.ASSIGNABLE]
        }

        /**
         * Return full namespace name from Namespace
         * @date 22/08/2022 - 20:27:53
         *
         * @static
         * @param {*} target target object to check and return Namespace
         * @returns {string} dot separated namespace name
         */
        static namespace(target: any): string {
            return target[MrbrBase.Namespace.TO_STRING]
        }

        /**
         * Proxy handler for Map to auto create Namespace parts 
         * Each part is cheacked to see if it exists on the Map, if not it is created as a new Namespace 
         * @date 22/08/2022 - 20:29:03
         *
         * @static
         * @type {ProxyHandler<any>}
         */
        static PROXY_HANDLER: ProxyHandler<any> = {

            /**
             * Get the Namespace part values
             * @date 22/08/2022 - 20:30:23
             *
             * @param {Map<string, any>} target Target Map Namespace
             * @param {(string | Symbol)} name Part name of Namespace
             * @returns {any} Namespace part, assigned value or value from static Symbols
             */
            get(target: Map<string, any>, name: string | Symbol): any {
                const ns = MrbrBase.Namespace;
                if (typeof name === "string") {
                    return target.get(name) ?? target.set(<string>name, new ns(target, <string>name)).get(name);
                }
                switch (name) {
                    case ns.KEYS: return target.keys();
                    case ns.KEY_ARRAY: return Array.from(target.keys());
                    case ns.TO_OBJECT: {
                        let namespace = [target[ns.NAME]],
                            parent = target[ns.PARENT],
                            lastParent = null;
                        parent && namespace.push(parent[ns.NAME])
                        while (parent) {
                            lastParent = parent;
                            parent = parent[ns.PARENT];
                            (parent && parent[ns.NAME]) && namespace.push(parent[ns.NAME]);
                        }
                        namespace.reverse().forEach(value => lastParent = lastParent[value])
                        return lastParent;
                    }
                    case ns.IS_NAMESPACE: return target[ns.IS_NAMESPACE];
                    case ns.SIZE: return target.size;
                    case ns.TARGET: return target;
                    case ns.NAME: return target[ns.NAME];
                    case ns.PARENT: return target[ns.PARENT];
                    case ns.ASSIGNABLE: return !(!target[ns.IS_NAMESPACE] || (target[ns.SIZE] > 0));
                    case ns.ROOT: {
                        let parent = target[ns.PARENT],
                            root = "";
                        parent && (() => root = parent[ns.NAME])()
                        while (parent) {
                            parent = parent[ns.PARENT];
                            (parent && parent[ns.NAME]) && (() => root = parent[ns.NAME])();
                        }
                        return root;
                    }
                    case ns.TO_STRING: {
                        let namespace = [target[ns.NAME]],
                            parent = target[ns.PARENT];
                        parent && namespace.push(parent[ns.NAME]);
                        while (parent) {
                            parent = parent[ns.PARENT];
                            (parent && parent[ns.NAME]) && namespace.push(parent[ns.NAME]);
                        }
                        return namespace.reverse().join(".");
                    }
                }
            },

            /**
             * Sets value for the Target Namespace Part
             * @date 22/08/2022 - 20:32:34
             *
             * @param {Map<string, any>} target Namespace Part
             * @param {(string | Symbol)} name Name of Namespace to get
             * @param {*} value value to set the Namespace part to
             * @returns {boolean} has value been set
             */
            set(target: Map<string, any>, name: string | Symbol, value: any) {
                const ns = MrbrBase.Namespace;
                if (typeof name === "string") {
                    /// Set value of an empty Target Namespace
                    let namedTarget,
                        namedTargetInstanceOfMap;
                    if (
                        (target[ns.SIZE] === 0 && target[ns.IS_NAMESPACE] === true) ||
                        (!(namedTarget ??= target.get(<string>name))) ||
                        ((namedTargetInstanceOfMap ??= namedTarget instanceof Map) === false) ||
                        (namedTargetInstanceOfMap &&
                            (
                                (namedTarget[ns.IS_NAMESPACE] === false) ||
                                (namedTarget[ns.SIZE] === 0 && namedTarget[ns.IS_NAMESPACE] === true)
                            )
                        )
                    ) {
                        target.set(<string>name, value);
                        return true;
                    }
                    if (namedTargetInstanceOfMap &&
                        namedTarget[ns.SIZE] > 0 &&
                        namedTarget[ns.IS_NAMESPACE] === true) {
                        throw new Error(`${namedTarget[ns.NAME]} is not an empty Namespace`);
                    }
                    return false;
                }

                /// Static Symbols are returned with no action
                switch (name) {
                    case ns.IS_NAMESPACE:
                    case ns.SIZE:
                    case ns.TARGET:
                    case ns.NAME:
                    case ns.PARENT:
                    case ns.TO_STRING:
                    case ns.ASSIGNABLE:
                    case ns.ROOT:
                    case ns.BIND:
                    case ns.TO_OBJECT:
                    case ns.KEYS:
                    case ns.KEY_ARRAY:
                        return true
                }
            }
        }
        /**
         * 
         * @param parent Create a new Namespace object as child of Parent
         * @param name Name of Namespace Part to create 
         * @returns new empty Namespace object
         */
        static createAssembly(parent, name): typeof MrbrBase.Namespace {
            parent[name] = new MrbrBase.Namespace(parent, name);
            return parent[name];
        }
    }
    constructor(host?: any) {
        super();
        const self = this,
            assembly = self.assembly;
        host && (_ => self.host = host)();
        MrbrBase._mrbr = this;
        MrbrBase.Namespace.createAssembly(self.host, "Mrbr")
        //MrbrBase.Namespace.createAssembly(window, 'Mrbr');
        self._entries = new Proxy(assembly, {
            get(target, name): any {
                return (target.has(name as string)) ? (target.get(name as string)).result : undefined;
            }
        })
        self._index = new Proxy(assembly, {
            get(target, name): any {
                return (target.has(name as string)) ? target.get(name as string) : undefined;
            },
            set(target, name, value): true {
                target.set((name as string), value);
                return true;
            }
        })
        self._files = new Proxy(assembly, {
            get(target, name) {
                return (target.has(name as string)) ? (target.get(name as string)).file : undefined;
            }
        })
        self.setAliases();
    }
    public CreateNamespace(name: string | Array<string>): MrbrBase {
        [name].flat().forEach(name => MrbrBase.Namespace.createAssembly(this.host, name));
        return this;
    }
    /**
     * Singleton for MrbrBase.
     * Allows reference to instance through Class instead of having to add dummy reference to every file
     * @date 22/08/2022 - 20:55:06
     *
     * @static
     * @readonly
     * @type {MrbrBase}
     */
    public static get mrbrInstance(): MrbrBase { return MrbrBase._mrbr; }

    /**
     * Configuration file passed to initialise function
     * @date 22/08/2022 - 20:59:30
     *
     * @public
     * @type {Mrbr_Assembly_MrbrConfig}
     */
    public get config(): Mrbr_Assembly_MrbrConfig {
        return this._config;
    }

    /**
     * Configuration file passed to initialise function
     */
    public set config(value: Mrbr_Assembly_MrbrConfig) {
        this._config = value;
    }


    /**
     * Paths to Mrbr Assembly and Mrbr Assembly compliant objects
     * @date 22/08/2022 - 21:00:49
     *
     * @readonly
     * @type {Map<string, string>}
     */
    get paths(): Map<string, string> { return this._paths ??= new Map<string, string>(); }

    /**
     * Host object, usually a global object globalThis or Window 
     * @date 22/08/2022 - 21:01:37
     *
     * @public
     * @type {*}
     */
    public get host(): any {
        return this._host;
    }

    /**
     * Host object, usually a global object globalThis or Window
     */
    public set host(value: any) {
        this._host = value;
    }

    /**
     * Assembly refernces.
     * Functionality to be reviewed
     * @date 22/08/2022 - 21:03:22
     *
     * @type {Map<string, any>}
     */
    get assembly(): Map<string, any> { return this._assembly; }

    /**
     * Assembly refernces.
    Functionality to be reviewed
     */
    set assembly(value: Map<string, any>) { this._assembly = value; }

    /**
     * Assembly references
     * Functionality to be reviewed
     * @date 22/08/2022 - 21:04:06
     *
     * @readonly
     * @type {*}
     */
    get asm() { return this._index; }

    /**
     * Assembly references
     * Functionality to be reviewed
     * @date 22/08/2022 - 21:04:28
     *
     * @readonly
     * @type {*}
     */
    get entries() { return this._entries; }

    /**
     * Files References
     * Functionality to be reviewed
     * @date 22/08/2022 - 21:04:53
     *
     * @readonly
     * @type {*}
     */
    get files() { return this._files; }

    /**
     * Initialise MrbrBase
     * @date 22/08/2022 - 21:05:27
     *
     * @param {Mrbr_Assembly_MrbrConfig} config
     * @returns {Promise<any>} Promise for initialisation completed
     */
    public initialise(config: Mrbr_Assembly_MrbrConfig): Mrbr_System_Promise<MrbrBase> {
        const self = this;
        self.setAliases();
        const
            promise = self.$promise.create("MrbrBase.initialise");//,
        //self_paths = self._paths;
        self.config = config;
        !(self.host) && (_ => {
            var global: any = global || null;
            self.host = ((window as any) || (global) || (globalThis as any));
        })();
        self.Paths(config?.paths);
        /// If browser based
        (document) && (_ => {
            const mrbrCss: HTMLStyleElement = document.createElement("style");
            mrbrCss.textContent = `:root { --mrbr-root-folder :"${self.paths.get("Mrbr")}";}`;
            document.head.appendChild(mrbrCss);
        })()
        promise.resolve(self);
        return promise;
    }

    /**
     * Set paths for Mrbr Assembly and Mrbr Assembly compliant objects
     * @date 18/12/2022 - 15:14:06
     *
     * @public
     * @param {object} paths
     * @returns {MrbrBase}
     */
    public Paths(paths: object): MrbrBase {
        if (!paths) return this;
        Object.keys(paths).forEach(key => this.paths.set(key, paths[key]));
        return this;
    }


    private setAliases() {
        const self = this;
        self.$promise = Mrbr_System_Promise;
        self.$mnfPrm = Mrbr_IO_ManifestPromise;
        self.$filePrm = Mrbr_IO_FilePromise;
        self.$file = Mrbr_IO_File
        self.$fileType = Mrbr_IO_FileType;
    }
    /**
     * Load a manifest, a single or array of Mrbr.IO.File 
     * @date 22/08/2022 - 21:13:01
     *
     * @public
     * @param {(Array<Mrbr_IO_File> | Mrbr_IO_File)} manifest
     * @returns {Promise<any>}
     */
    public loadManifest(manifest: Array<Mrbr_IO_File> | Mrbr_IO_File, loadRequirement: Mrbr_IO_ManifestRequirements = Mrbr_IO_ManifestRequirements.default): Mrbr_IO_ManifestPromise {
        const self = this,
            _manifest = manifest instanceof Array ? manifest : [manifest];
        if (!manifest || _manifest.length === 0) { return self.$mnfPrm.createResolved("MrbrBase.loadManifest", _manifest); }
        const promise = self.$mnfPrm.create("MrbrBase.loadManifest", _manifest);
        Promise.all(_manifest.map(manifestEntry => self.load(manifestEntry).promise))
            .then(_ => promise.resolve())
            .catch(err => promise.reject(err));
        return promise;
    }

    /**
     * Mapping to delegates for loading Mrbr.IO.FileTypes
     * @date 22/08/2022 - 21:17:48
     *
     * @private
     * @readonly
     * @type {Map<string, loadFunction>}
     */
    private get loadFunctionMap(): Map<string, loadFunction> {
        if (this._loadFunctionMap) { return this._loadFunctionMap; }
        const self = this,
            mif = Mrbr_IO_FileType;

        const slf = self._loadFunctionMap = new Map<string, loadFunction>(),
            slfsb = slf.set.bind(slf);
        [[mif.Script, self.loadScript.bind(self)],
        [mif.ScriptElement, self.loadScriptElement.bind(self)],
        [mif.ScriptLink, self.loadScriptLink.bind(self)],
        [mif.CssElement, self.loadCssElement.bind(self)],
        [mif.CssLink, self.loadCssLink.bind(self)],
        [mif.Component, self.loadComponent.bind(self)]
        ].forEach(entry => slfsb(entry[0], entry[1]))

        return self._loadFunctionMap;
    }


    /**
     * Load a file based on its FileType
     * @date 22/08/2022 - 21:29:22
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>} Promise fo Loading file
     */
    load(file: Mrbr_IO_File): Mrbr_IO_FilePromise {
        const self = this,
            mift = self.$fileType;
        switch (file.fileType) {
            case mift.Component:
                return self.loadComponent(file);
            case mift.ScriptLink:
                return self.loadScriptLink(file)
            case mift.CssLink:
                return self.loadCssLink(file)
            case mift.CssElement:
            case mift.Html:
            case mift.Json:
            case mift.Other:
            case mift.Resource:
            case mift.Script:
            case mift.ScriptElement:
            case mift.Text:
                throw new Error("File Operation Not Implemented");
            default:
                throw new Error("not a file option");
        }
    }





    _loadComponentMemo: fileLoaderDelegate;


    /**
     * Load an Mrbr Assembly compliant component
     * @date 22/08/2022 - 21:31:16
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>} Promise of loading component
     */
    loadComponent(file: Mrbr_IO_File, manifestRequirement: Mrbr_IO_ManifestRequirements = Mrbr_IO_ManifestRequirements.default): Mrbr_IO_FilePromise {

        const self = this;
        if (self._loadComponentMemo) { return self._loadComponentMemo(file); }
        const ns = MrbrBase.Namespace,
            nsNamespace = ns.namespace,
            nsIsNamespace = ns.isNamespace,
            _compName = MrbrBase.COMPONENT_NAME,
            _compManifest = MrbrBase.MANIFEST,
            namespaceComponentName: string = MrbrBase.Namespace.NAMESPACE_COMPONENT_NAME,
            componentParameters: string = "mrbr,data,resolve,reject,symbols",
            instance = MrbrBase.mrbrInstance,
            fn = Function;
        self._loadComponentMemo = (file => {
            const fileEntry = file.entry;


            if (fileEntry[_compName]) {
                if (self.$filePrm.promises.has(fileEntry[_compName])) {
                    let prm = self.$filePrm.promises.get(fileEntry[_compName]);
                    prm.resolve();
                    return prm;
                }
                return self.$filePrm.createResolved("", file);
            }

            if (!nsIsNamespace(fileEntry)) {
                if (self.$filePrm.promises.has(nsNamespace(fileEntry))) {
                    file.loadingPromise = self.$filePrm.promises.get(nsNamespace(fileEntry))
                    file.loadingPromise.resolve();
                    return file.loadingPromise;
                }
                return self.$filePrm.createResolved("", file);
            }
            if (nsIsNamespace(file.entry) && self.$filePrm.promises.has(nsNamespace(fileEntry))) {
                return self.$filePrm.promises.get(nsNamespace(fileEntry));
            }
            let fileEntryName = nsNamespace(fileEntry)
            file.loadingPromise = self.$filePrm.create(fileEntryName, file);
            /// Fetch file
            new Mrbr_IO_Fetch()
                .fetch(file.fileName, {})
                .then(result => {
                    result
                        .text()
                        .then((componentText: string) => {
                            let loadedPromise = self.$promise.create<Mrbr_IO_Fetch>(`Mrbr_IO_Fetch:${file.fileName}`);
                            fn(componentParameters, componentText).bind(self)(instance, file.data, loadedPromise.executor.resolve, loadedPromise.executor.reject, { componentName: _compName, manifest: _compManifest });
                            loadedPromise
                                .then(entry => {
                                    let entryManifest = ((entry && entry[_compName] !== namespaceComponentName && (entry as any)[_compManifest]));
                                    if (!entryManifest) { file.loadingPromise.resolve(); return; }
                                    if (manifestRequirement !== Mrbr_IO_ManifestRequirements.default) { file.loadingPromise.resolve(); return; }
                                    self.loadManifest(entryManifest)
                                        .then(_ => file.loadingPromise.resolve())
                                        .catch(err => file.loadingPromise.reject({ error: err, manifest: entryManifest }));

                                })
                                .catch(err => file.loadingPromise.reject({ error: err, file: file }))
                        })
                })
                .catch(err => {
                    file.loadingPromise.reject(err)
                });
            return file.loadingPromise;
        });
        return self.loadComponent(file);
    }
    loadText() { }
    loadJson() { }

    /**
     * Loads run script functionality on demand then loads script
     * @date 22/08/2022 - 21:47:06
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadScript(file: Mrbr_IO_File): Mrbr_IO_FilePromise | Mrbr_System_Promise<any> {
        const self = this;
        return self._loadScript ? self._loadScript(file) : self.addFileFunction(self, "_loadScript", Mrbr_IO_LoadScript);
    }

    /**
     * Loads add script element functionality on demand then loads script
     * @date 22/08/2022 - 21:47:58
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadScriptElement(file: Mrbr_IO_File): Mrbr_IO_FilePromise | Mrbr_System_Promise<any> {
        const self = this;
        return self._loadScriptElement ? self._loadScriptElement(file) : self.addFileFunction(self, "_loadScriptElement", Mrbr_IO_LoadScriptElement);
    }


    /**
     * Loads create css element link on demand and adds link to dom
     * @date 22/08/2022 - 21:52:12
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadCssLink(file: Mrbr_IO_File): Mrbr_IO_FilePromise {
        const self = this;
        if (self._loadCssLink) { return self._loadCssLink(file); }
        const filePromise = self.$filePrm.create("MrbrBase.loadCssLink", file);
        self.loadComponent(self.$file.component(Mrbr_IO_LoadCssLink))
            .then(_ => {
                self._loadCssLink = Mrbr_IO_LoadCssLink.bind(self)
                self.loadCssLink(file)
                    .then(_ => filePromise.resolve())
                    .catch(err => filePromise.reject(err))
            })
        return filePromise;
    }


    /**
     * Load add script link functionality on demand and adds to dom
     * @date 22/08/2022 - 21:49:57
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadScriptLink(file: Mrbr_IO_File): Mrbr_IO_FilePromise {
        const self = this;
        if (self._loadScriptLink) { return self._loadScriptLink(file); }
        const filePromise: Mrbr_IO_FilePromise = self.$filePrm.create("MrbrBase.loadScriptLink", file);

        self.loadComponent(self.$file.component(Mrbr_IO_LoadScriptLink))
            .then(_ => {
                self._loadScriptLink = Mrbr_IO_LoadScriptLink.bind(self)
                self.loadScriptLink(file)
                    .then(_ => setTimeout(() => {
                        filePromise.resolve();
                    }, 0))
                    .catch(err => filePromise.reject(err))
            })
        return filePromise;
    }
    /**
     * On demand loading FileType functionality loading
     * @date 22/08/2022 - 21:56:50
     *
     * @param {Mrbr_IO_File} file
     * @param {*} target
     * @param {string} targetFunctionName
     * @param {*} functionToLoad
     * @returns {Promise<any>}
     */
    addFileFunction(target: any, targetFunctionName: string, functionToLoad: any): Mrbr_System_Promise<any> {
        const self = this,
            promise = self.$promise.create("MrbrBase.addFileFunction");
        self.addFunction(target, targetFunctionName, functionToLoad)
            .then(fn => promise.resolve(fn))
            .catch(err => promise.reject(err))
        return promise;
    }
    /**
     * Loads create css element on demand and adds css element
     * @date 22/08/2022 - 21:51:09
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadCssElement(file: Mrbr_IO_File): Mrbr_IO_FilePromise | Mrbr_System_Promise<any> {
        const self = this;
        return self._loadCssElement ? self._loadCssElement(file) : self.addFileFunction(self, "_loadCssElement", Mrbr_IO_LoadCssElement);
    }

    /**
     * Loads load html functionality on demand
     * Not implemented yet 
     * @date 22/08/2022 - 21:53:06
     */
    loadHtml() { throw new Error("Load HTML not implemented"); }

    /**
     * Loads load other file type functionality on demand
     * Not implemented yet
     * @date 22/08/2022 - 21:53:49
     */
    loadOther() { throw new Error("Load other file type not implemented"); }

    /**
     * Loads a function on demand
     * @date 22/08/2022 - 21:55:16
     *
     * @param {*} target
     * @param {string} targetFunctionName
     * @param {*} functionToLoad
     * @returns {Promise<any>}
     */
    addFunction(target: any, targetFunctionName: string, functionToLoad: any): Mrbr_System_Promise<any> {
        const self = this;
        if (target[targetFunctionName]) {
            let retVal = self.$promise.create<any>("MrbrBase.addFunction")
            retVal.resolve(target[targetFunctionName])
            return retVal;
        }
        if (!MrbrBase.Namespace.isNamespace(functionToLoad)) {
            target[targetFunctionName] = functionToLoad;


            let retVal = self.$promise.create<any>("MrbrBase.addFunction")
            retVal.resolve(functionToLoad)
            return retVal;
        }
        //const promise = self.createPromise("MrbrBase.addFunction");
        let promise: Mrbr_IO_ManifestPromise = self.loadManifest(self.$file.component(functionToLoad));
        promise
            .then(_ => promise.resolve())
            .catch(err => promise.reject(err));
        return promise;
    }



    /**
     * Event Names for onReady
     * @date 22/08/2022 - 21:59:41
     *
     * @static
     * @type {{ DOMContentLoaded: string; load: string; readyStateChange: string; }}
     */
    static eventNames = {
        DOMContentLoaded: "DOMContentLoaded",
        load: "load",
        readyStateChange: "readyStateChange"
    }

    /**
     * Document states for onReady
     * @date 22/08/2022 - 22:00:27
     *
     * @static
     * @type {{ complete: string; }}
     */
    static documentStates = {
        complete: "complete"
    }

    /**
     * When run in the Browser provides an onReady function.
     * Once MrbrBase.initialised is resolved events are set for when browser DOM is ready
     * @returns {Promise} DOM is ready
     */
    onReady() {
        let fnResolve: Function;
        const readyStateChange_Handler = readyStateChange,
            self = this,
            self_constructor = self.constructor,
            doc = document,
            win = window,
            eventNames = (self_constructor as typeof MrbrBase).eventNames,
            fnReady = () => {
                [doc, win].forEach(hostObject => [eventNames.DOMContentLoaded, eventNames.load].forEach(eventName => hostObject.removeEventListener(eventName, fnReady)));
                doc.removeEventListener(eventNames.readyStateChange, readyStateChange_Handler)
                fnResolve(self)
            }
        function readyStateChange() {
            if (doc.readyState === (self_constructor as typeof MrbrBase).documentStates.complete) {
                doc.removeEventListener(eventNames.readyStateChange, readyStateChange_Handler)
                fnReady();
            }
        }
        return new Promise(function (resolve, reject) {
            fnResolve = resolve;
            doc.readyState === (self_constructor as typeof MrbrBase).documentStates.complete ? (() => {
                doc.removeEventListener(eventNames.readyStateChange, readyStateChange_Handler);
                resolve(self);
            })()
                :
                (() => {
                    [doc, win].forEach(hostObject => [eventNames.DOMContentLoaded, eventNames.load].forEach(eventName => hostObject.addEventListener(eventName, fnReady)));
                    doc.addEventListener(eventNames.readyStateChange, readyStateChange_Handler);
                })()
        })
    }
}

/**
 * Create global MrbrBase instance
 * @date 22/08/2022 - 22:03:23
 *
 * @type {MrbrBase}
 */
var mrbr: MrbrBase = new MrbrBase(this);