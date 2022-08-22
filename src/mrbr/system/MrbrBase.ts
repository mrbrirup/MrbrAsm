/// <mrbr manifest="false" />
import { Mrbr_Assembly_MrbrConfig } from '../assembly/mrbrConfig';
import { Mrbr_IO_Fetch } from '../io/Fetch';
import { Mrbr_IO_File } from '../io/File';
import { Mrbr_IO_FileType } from '../io/FileType';
import { Mrbr_IO_LoadCssElement } from '../io/LoadCssElement';//exclude
import { Mrbr_IO_LoadCssLink } from '../io/LoadCssLink';//exclude
import { Mrbr_IO_LoadScript } from '../io/LoadScript';//exclude
import { Mrbr_IO_LoadScriptElement } from '../io/LoadScriptElement';//exclude
import { Mrbr_IO_LoadScriptLink } from '../io/LoadScriptLink';//exclude


/**
 * Null operation function as place holder for loading functions later
 * @date 22/08/2022 - 19:59:37
 *
 * @typedef {nullFunction}
 */
type nullFunction = (file: Mrbr_IO_File) => Promise<any> | null;

/**
 * Loading Function delegate
 * Replaced when Loading Function is loaded
 * @date 22/08/2022 - 20:00:18
 *
 * @typedef {loadFunction}
 */
type loadFunction = (file: Mrbr_IO_File) => Promise<any> | null;

/**
 * Creates a Promise and returns the reslove and reject as separate parameters to be used outside of Promise block
 * @date 22/08/2022 - 20:01:00
 *
 * @typedef {mrbrPromise}
 */
type mrbrPromise = {
    promise: Promise<any>;
    reject: Function;
    resolve: Function;
}

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
    static cacheTimeOut: number = 5000;
    static temporaryObjectTimeOut: number = 5000;
    static defaultMrbrPath: string = "/mrbr/";
    static componentParameters: string = "mrbr,data,resolve,reject";
    static _mrbr: MrbrBase;
    private _config: Mrbr_Assembly_MrbrConfig;
    private _paths: Map<string, string> = new Map();
    private _entries: any;
    private _files: any;
    private _index: any;
    private _assembly: Map<string, any> = new Map<string, any>();
    private _loadFunctionMap: Map<string, loadFunction> = null;
    private _host: any;
    _loadScript: nullFunction = null;
    _loadScriptElement: nullFunction = null;
    _loadScriptLink: nullFunction = null;
    _loadCssLink: nullFunction = null;
    _loadCssElement: nullFunction = null;
    private componentFileReferences = new Map<string, any>();
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
        static isNamespace(target: any): boolean {
            return target[MrbrBase.Namespace.IS_NAMESPACE]
        }

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
                switch (name) {
                    case ns.KEYS: return target.keys();
                    case ns.KEY_ARRAY: return Array.from(target.keys());
                    case ns.TO_OBJECT: {
                        let namespace = [target[ns.NAME]],
                            parent = target[ns.PARENT],
                            lastParent = null;
                        if (parent) { namespace.push(parent[ns.NAME]) }
                        while (parent) {
                            lastParent = parent;
                            parent = parent[ns.PARENT];
                            if (parent && parent[ns.NAME]) {
                                namespace.push(parent[ns.NAME])
                            }
                        }
                        namespace.reverse().forEach(value => {
                            lastParent = lastParent[value];
                        })
                        return lastParent;
                    }
                    case ns.IS_NAMESPACE: {
                        return target[ns.IS_NAMESPACE]
                    };
                    case ns.SIZE: return target.size;
                    case ns.TARGET: return target;
                    case ns.NAME: return target[ns.NAME];
                    case ns.PARENT: return target[ns.PARENT];
                    case ns.ASSIGNABLE: {
                        if (!target[ns.IS_NAMESPACE]) { return false; }
                        if (target[ns.SIZE] > 0) { return false; }
                        return true;
                    }
                    case ns.ROOT: {
                        let parent = target[ns.PARENT],
                            root = "";
                        if (parent) { root = parent[ns.NAME]; }
                        while (parent) {
                            parent = parent[ns.PARENT];
                            if (parent && parent[ns.NAME]) { root = parent[ns.NAME]; }
                        }
                        return root;
                    }
                    case ns.TO_STRING: {
                        let namespace = [target[ns.NAME]]
                        let parent = target[ns.PARENT];
                        if (parent) { namespace.push(parent[ns.NAME]) }
                        while (parent) {
                            parent = parent[ns.PARENT];
                            if (parent && parent[ns.NAME]) { namespace.push(parent[ns.NAME]) }
                        }
                        return namespace.reverse().join(".");
                    }
                    /// Create a new Namespace part in target Namespace
                    default:
                        if (target.has(<string>name) === false) {
                            target.set(<string>name, new ns(target, <string>name))
                        }
                }
                return (target.has(<string>name)) ? (target.get(<string>name)) : null;
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
                /// Set value of an empty Target Namespace
                if (target[ns.SIZE] === 0 &&
                    target[ns.IS_NAMESPACE] === true) {
                    target.set(<string>name, value);
                    return true;
                }
                /// If the Namespace part has already been created check if the value can be assigne to it
                let namedTarget = target.get(<string>name);
                if (
                    !namedTarget ||
                    (namedTarget instanceof Map === false) ||
                    (namedTarget instanceof Map &&
                        namedTarget[ns.IS_NAMESPACE] === false) ||
                    (namedTarget instanceof Map &&
                        namedTarget[ns.SIZE] === 0 &&
                        namedTarget[ns.IS_NAMESPACE] === true)) {
                    target.set(<string>name, value);
                    return true;
                }
                /// Throw error if attempting to set a value for the Namespace Part that already has entries
                if (namedTarget instanceof Map &&
                    namedTarget[ns.SIZE] > 0 &&
                    namedTarget[ns.IS_NAMESPACE] === true) {
                    throw new Error(`${namedTarget[ns.NAME]} is not an empty Namespace`);
                }
                return false;
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
    constructor() {
        super();
        const self = this,
            assembly = self.assembly;
        MrbrBase.Namespace.createAssembly(window, 'Mrbr');
        self._entries = new Proxy(assembly, {
            get(target, name) {
                return (target.has(name as string)) ? (target.get(name as string)).result : undefined;
            }
        })
        self._index = new Proxy(assembly, {
            get(target, name) {
                return (target.has(name as string)) ? target.get(name as string) : undefined;
            },
            set(target, name, value) {
                target.set((name as string), value);
                return true;
            }
        })
        self._files = new Proxy(assembly, {
            get(target, name) {
                return (target.has(name as string)) ? (target.get(name as string)).file : undefined;
            }
        })
        MrbrBase._mrbr = this;
        MrbrBase.Namespace.createAssembly(window, "Mrbr")
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
    get paths(): Map<string, string> {
        return this._paths;
    }

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
    initialise(config: Mrbr_Assembly_MrbrConfig): Promise<any> {
        const self = this,
            promise = self.createPromise(),
            self_paths = self._paths;
        self.config = config;
        var global: any = global || null;
        self.host = ((window as any) || (global) || (globalThis as any));
        if (config?.paths) {
            Object.keys(config.paths).forEach(key => self_paths.set(key, config.paths[key]));
        }
        /// If browser based
        if (document) {
            const mrbrCss: HTMLStyleElement = document.createElement("style");
            mrbrCss.textContent = `:root { --mrbr-root-folder :"${self.paths.get("Mrbr")}";}`;
            document.head.appendChild(mrbrCss);
        }

        promise.resolve(self);
        return promise.promise;
    }

    /**
     * Load a manifest, a single or array of Mrbr.IO.File 
     * @date 22/08/2022 - 21:13:01
     *
     * @public
     * @param {(Array<Mrbr_IO_File> | Mrbr_IO_File)} manifest
     * @returns {Promise<any>}
     */
    public loadManifest(manifest: Array<Mrbr_IO_File> | Mrbr_IO_File): Promise<any> {
        if (!manifest || (Array.isArray(manifest) && manifest.length === 0)) { return Promise.resolve(); }
        const self = this,
            promise = self.createPromise();
        Promise.all((Array.isArray(manifest) ? manifest : [manifest]).map(manifestEntry => self.load(manifestEntry)))
            .then(values => {
                promise.resolve(values)
            })
            .catch(err => promise.reject(err));
        return promise.promise;
    }

    /**
     * Mapping to delgates for loading Mrbr.IO.FileTypes
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
    load(file: Mrbr_IO_File): Promise<any> {
        const self = this,
            promise = self.createPromise();
        if (file.fileType === Mrbr_IO_FileType.Component) {
            self.loadComponent(file)
                .then(component => {
                    promise.resolve(component);
                });
        }
        else if (self.loadFunctionMap.has(file.fileType)) {
            self.loadFunctionMap.get(file.fileType)(file)
                .then(result => promise.resolve(result))
                .catch(err => promise.reject(err))
        }
        else {
            throw new Error("not a file option");
        }
        return promise.promise;
    }

    /**
     * Create a promise that externalises reject and resolve to avoid nesting in Promise
     * @date 22/08/2022 - 21:30:21
     *
     * @returns {mrbrPromise}
     */
    createPromise(): mrbrPromise {
        let _reject: Function, _resolve: Function;
        return {
            promise: new Promise((resolve, reject) => { _reject = reject, _resolve = resolve }),
            reject: _reject,
            resolve: _resolve
        }
    }

    /**
     * Load an Mrbr Assembly compliant component
     * @date 22/08/2022 - 21:31:16
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>} Promise of loading component
     */
    loadComponent(file: Mrbr_IO_File): Promise<any> {
        const self = this,
            ns = MrbrBase.Namespace;
        if (!ns.isNamespace(file.entry)) {
            return Promise.resolve(file);
        }
        const mrbrFetch = new Mrbr_IO_Fetch(),
            promise = self.createPromise(),
            namespace = ns.namespace(file.entry),
            prms = MrbrBase.componentParameters,
            instance = MrbrBase.mrbrInstance,
            fn = Function;
        //  If a file loading is already in progress for this Component as load requests can be in parallel
        //  Get the promise from the first component load request
        if (self.componentFileReferences.has(namespace)) {
            file._loadingPromise = self.componentFileReferences.get(namespace)._loadingPromise;
            return file._loadingPromise.promise;
        }
        //  Create a promise for a Component not previously requested
        file._loadingPromise = {
            promise: promise.promise,
            reject: promise.reject,
            resolve: promise.resolve
        }
        self.componentFileReferences.set(ns.namespace(file.entry), file);
        /// Fetch file
        mrbrFetch
            .fetch(file.fileName, {})
            .then(result => {
                result
                    .text()
                    .then((txt: any) => {
                        let loadedPromise = self.createPromise();
                        fn(prms, txt).bind(self)(instance, file.data, loadedPromise.resolve, loadedPromise.reject);
                        loadedPromise.promise
                            .then(entry => self.componentFileReferences.get(entry)._loadingPromise.resolve(file))
                            .catch(err => console.log(`error: `, err))
                    })
            })
            .catch(err => {
                promise.reject(err)
            });
        return this.componentFileReferences.get(namespace)._loadingPromise.promise
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
    loadScript(file: Mrbr_IO_File): Promise<any> {
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
    loadScriptElement(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadScriptElement ? self._loadScriptElement(file) : self.addFileFunction(self, "_loadScriptElement", Mrbr_IO_LoadScriptElement);
    }

    /**
     * Load add script link functionality on demand and adds to dom
     * @date 22/08/2022 - 21:49:57
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadScriptLink(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        if (self._loadScriptLink) {
            return self._loadScriptLink(file);
        }
        const promise = self.createPromise();
        self.addFileFunction(self, "_loadScriptLink", Mrbr_IO_LoadScriptLink)
            .then(_ => {
                self._loadScriptLink = Mrbr_IO_LoadScriptLink.bind(self);
                promise.resolve(file);
                return self._loadScriptLink(file);
            })
        return promise.promise;

    }

    /**
     * Loads create css element on demand and adds css element
     * @date 22/08/2022 - 21:51:09
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadCssElement(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadCssElement ? self._loadCssElement(file) : self.addFileFunction(self, "_loadCssElement", Mrbr_IO_LoadCssElement);
    }

    /**
     * Loads create css element link on demand and adds link to dom
     * @date 22/08/2022 - 21:52:12
     *
     * @param {Mrbr_IO_File} file
     * @returns {Promise<any>}
     */
    loadCssLink(file: Mrbr_IO_File): Promise<any> {

        const self = this;
        if (self._loadCssLink) {
            return self._loadCssLink(file);
        }
        const promise = self.createPromise();
        self.addFileFunction(self, "_loadCssLink", Mrbr_IO_LoadCssLink)
            .then(_ => {
                self._loadCssLink = Mrbr_IO_LoadCssLink.bind(self);
                promise.resolve(file);
                return self._loadCssLink(file);
            })
        return promise.promise;
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
    addFunction(target: any, targetFunctionName: string, functionToLoad: any): Promise<any> {
        const self = this;
        if (target[targetFunctionName]) { return Promise.resolve(target[targetFunctionName]); }
        if (!MrbrBase.Namespace.isNamespace(functionToLoad)) {
            target[targetFunctionName] = functionToLoad;
            return Promise.resolve(functionToLoad);
        }
        const promise = self.createPromise();
        self.loadManifest(Mrbr_IO_File.component(functionToLoad))
            .then(result => {
                promise.resolve(target[targetFunctionName])
            })
            .catch(err => promise.reject(err));
        return promise.promise;
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
    addFileFunction(target: any, targetFunctionName: string, functionToLoad: any): Promise<any> {
        const self = this,
            promise = self.createPromise();
        self.addFunction(target, targetFunctionName, functionToLoad)
            .then(fn => {
                promise.resolve(fn)
            })
            .catch(err => promise.reject(err))
        return promise.promise;
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
var mrbr: MrbrBase = new MrbrBase();