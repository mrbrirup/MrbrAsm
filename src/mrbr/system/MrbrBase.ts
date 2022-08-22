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
import { Mrbr_IO_Path } from '../io/Path';

type nullFunction = (file: Mrbr_IO_File) => Promise<any> | null;
type loadFunction = (file: Mrbr_IO_File) => Promise<any> | null;
type mrbrPromise = {
    promise: Promise<any>;
    reject: Function;
    resolve: Function;
}
export class MrbrBase extends EventTarget {
    static Namespace = class extends Map<string, any> {
        static IS_NAMESPACE = Symbol("__ma_namespace__");
        static SIZE = Symbol("__ma_namespace__size__");
        static TARGET = Symbol("__ma_namespace__target__");
        static NAME = Symbol("__ma_namespace__name__");
        static PARENT = Symbol("__ma_namespace__parent__");
        static TO_STRING = Symbol("__ma_namespace__tostring__");
        static ASSIGNABLE = Symbol("__ma_namespace__assignable__");
        static ROOT = Symbol("__ma_namespace__root__");
        static BIND = Symbol("__ma_namespace__bind__");
        static TO_OBJECT = Symbol("__ma_namespace__toobject__");
        constructor(parent: any, name: string) {
            super()
            const self = this;
            const ns = MrbrBase.Namespace;
            self[ns.PARENT] = parent;
            self[ns.NAME] = name;
            self[ns.IS_NAMESPACE] = true;
            return new Proxy(self, ns.PROXY_HANDLER);
        }
        static toObject(target: any) {
            return target[MrbrBase.Namespace.TO_OBJECT]
        }
        static isNamespace(target: any) {
            return target[MrbrBase.Namespace.IS_NAMESPACE]
        }
        static isAssignable(target: any) {
            return target[MrbrBase.Namespace.ASSIGNABLE]
        }
        static namespace(target: any) {
            return target[MrbrBase.Namespace.TO_STRING]
        }
        static PROXY_HANDLER: ProxyHandler<any> = {
            get(target: Map<string, any>, name: string | Symbol) {
                const ns = MrbrBase.Namespace;
                switch (name) {
                    case ns.TO_OBJECT: {

                        let namespace = [target[ns.NAME]]
                        let parent = target[ns.PARENT];
                        if (parent) { namespace.push(parent[ns.NAME]) }
                        let lastParent = null;
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
                        let namespace = [target[ns.NAME]]
                        let parent = target[ns.PARENT];
                        let root = "";
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
                    default:
                        if (target.has(<string>name) === false) {
                            target.set(<string>name, new ns(target, <string>name))
                        }
                }
                return (target.has(<string>name)) ? (target.get(<string>name)) : null;
            },
            set(target: Map<string, any>, name: string | Symbol, value: any) {
                const ns = MrbrBase.Namespace;
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
                        return true
                }
                if (target[ns.SIZE] === 0 &&
                    target[ns.IS_NAMESPACE] === true) {
                    target.set(<string>name, value);
                    return true;
                }
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
                if (namedTarget instanceof Map &&
                    namedTarget[ns.SIZE] > 0 &&
                    namedTarget[ns.IS_NAMESPACE] === true) {
                    throw new Error(`${namedTarget[ns.NAME]} is not an empty Namespace`);
                }
                return false;
            }
        }
        static createAssembly(parent, name): typeof MrbrBase.Namespace {
            parent[name] = new MrbrBase.Namespace(parent, name);
            return parent[name];
        }
    }



    static cacheTimeOut: number = 5000;
    static temporaryObjectTimeOut: number = 5000;
    config: Mrbr_Assembly_MrbrConfig;

    _paths: Map<string, string> = new Map();
    static defaultMrbrPath: string = "/mrbr/";
    host: any;
    _entries: any;
    _files: any;
    _index: any;
    static _mrbr: MrbrBase;
    get mrbr(): MrbrBase { return MrbrBase._mrbr; }
    set mrbr(value: MrbrBase) { MrbrBase._mrbr = value; }
    static get mrbrInstance(): MrbrBase { return MrbrBase._mrbr; }
    constructor(assemblyEntries: Object) {
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

        Object.keys(assemblyEntries)
            .forEach(property => {
                self.asm[property] = { file: { loadingPromise: Promise.resolve() }, result: (assemblyEntries as any)[property] };
            })
        assemblyEntries = null;
        self.mrbr = this;
        MrbrBase.Namespace.createAssembly(window, "Mrbr")
    }
    _assembly: Map<string, any> = new Map<string, any>();
    get paths(): Map<string, string> {
        return this._paths;
    }
    get assembly(): Map<string, any> { return this._assembly; }
    set assembly(value: Map<string, any>) { this._assembly = value; }
    get asm() { return this._index; }
    get entries() { return this._entries; }
    get files() { return this._files; }
    initialise(config: Mrbr_Assembly_MrbrConfig) {
        let self = this,
            promise = self.createPromise(),
            self_paths = self._paths;
        self.config = config;
        let global: any; global = global || null;
        self.host = ((window as any) || (global) || (globalThis as any));
        if (config?.paths) {
            Object.keys(config.paths).forEach(key => self_paths.set(key, config.paths[key]));
        }
        const mrbrCss: HTMLStyleElement = document.createElement("style");
        mrbrCss.textContent = `:root { --mrbr-root-folder :"${self.paths.get("Mrbr")}";}`;
        document.head.appendChild(mrbrCss);

        promise.resolve(self);
        return promise.promise;
    }
    loadManifest(manifest: Array<Mrbr_IO_File> | Mrbr_IO_File): Promise<any> {
        const self = this,
            promise = self.createPromise();
        if (!manifest) { return Promise.resolve(); }
        if (Array.isArray(manifest) && manifest.length === 0) { return Promise.resolve(); }
        let manifestArray = Array.isArray(manifest) ? manifest : [manifest];
        let loadingManifestEntries = [];
        manifestArray.forEach(manifestEntry => loadingManifestEntries.push(self.load(manifestEntry)))
        //manifestArray.map(manifestEntry => self.load(manifestEntry));
        console.log("loadingManifestEntries: start")
        Promise.all(loadingManifestEntries)
            .then(values => {
                console.log("loadingManifestEntries: all")
                promise.resolve(values)
            })
            .catch(err => promise.reject(err));
        return promise.promise;
    }
    _loadFunctionMap: Map<string, loadFunction> = null;
    get loadFnMap(): Map<string, loadFunction> {
        const self = this,
            mrbrIOFileType = Mrbr_IO_FileType
        if (self._loadFunctionMap) { return self._loadFunctionMap }
        self._loadFunctionMap = new Map<string, loadFunction>();
        const self_loadFunctionMap = self._loadFunctionMap,
            self_loadFunctionMapSet = self_loadFunctionMap.set.bind(self_loadFunctionMap)
        self_loadFunctionMapSet(mrbrIOFileType.Script, self.loadScript.bind(self));
        self_loadFunctionMapSet(mrbrIOFileType.ScriptElement, self.loadScriptElement.bind(self));
        self_loadFunctionMapSet(mrbrIOFileType.ScriptLink, self.loadScriptLink.bind(self));
        self_loadFunctionMapSet(mrbrIOFileType.CssElement, self.loadCssElement.bind(self));
        self_loadFunctionMapSet(mrbrIOFileType.CssLink, self.loadCssLink.bind(self));
        self_loadFunctionMapSet(mrbrIOFileType.Component, self.loadComponent.bind(self));

        return self._loadFunctionMap;
    }

    load(file: Mrbr_IO_File): Promise<any> {
        const self = this;//,
        //self_asm = self.asm;
        let promise = self.createPromise();
        if (file.fileType === Mrbr_IO_FileType.Component) {
            self.loadComponent(file)
                .then(component => {
                    if (MrbrBase.Namespace.isNamespace(file.entry)) {
                        let namespaceToObject = MrbrBase.Namespace.toObject(file.entry);
                        if (namespaceToObject && !MrbrBase.Namespace.isNamespace(namespaceToObject) && namespaceToObject["manifest"]) {
                            self.loadManifest(namespaceToObject.manifest)
                                .then(_ => {
                                    console.log("namespaceToObject.manifest: completed ",)
                                    promise.resolve(file);
                                })
                        }
                        else {

                            promise.resolve(file);
                        }
                    }
                    else {
                        promise.resolve(component);
                    }
                });
        }
        else if (self.loadFnMap.has(file.fileType)) {
            self.loadFnMap.get(file.fileType)(file)
                .then(result => promise.resolve(result))
                .catch(err => promise.reject(err))
        }
        else {
            throw new Error("not a file option");
        }
        return promise.promise;
    }
    _loadScript: nullFunction = null;
    _loadScriptElement: nullFunction = null;
    _loadScriptLink: nullFunction = null;
    _loadCssLink: nullFunction = null;
    _loadCssElement: nullFunction = null;
    createPromise(): mrbrPromise {
        let _reject: Function, _resolve: Function;
        return {
            promise: new Promise((resolve, reject) => { _reject = reject, _resolve = resolve }),
            reject: _reject,
            resolve: _resolve
        }
    }
    loadinComponents = new Map<string, any>();
    loadComponent(file: Mrbr_IO_File): Promise<any> {
        const self = this,
            //componentName = file.entry,
            ns = MrbrBase.Namespace;
        let mrbrFetch = new Mrbr_IO_Fetch(),
            //root = self.paths.get(file.root) || "",
            //root = self.paths.get("Mrbr") || "",
            promise = self.createPromise();
        if (!ns.isNamespace(file.entry)) {
            promise.resolve(file);
            return promise.promise;
        }


        let namespace = ns.namespace(file.entry);
        if (this.loadinComponents.has(namespace)) {
            file._loadingPromise = this.loadinComponents.get(namespace)._loadingPromise;
            return file._loadingPromise.promise;
        }
        file._loadingPromise = {
            promise: promise.promise,
            reject: promise.reject,
            resolve: promise.resolve
        }
        this.loadinComponents.set(ns.namespace(file.entry), file);
        mrbrFetch
            .fetch(file.fileName, {})
            .then(result => {
                result
                    .text()
                    .then((txt: any) => {
                        let loadedPromise = self.createPromise();
                        new Function("mrbr", "data", "resolve", "reject", txt).bind(self)(mrbr, file.data, loadedPromise.resolve, loadedPromise.reject);
                        loadedPromise.promise
                            .then(entry => {
                                this.loadinComponents.get(entry)._loadingPromise.resolve(file)
                            })
                            .catch(err => console.log(`error: `, err))
                    })
            })
            .catch(err => {
                promise.reject(err)
            });
        return this.loadinComponents.get(namespace)._loadingPromise.promise
    }
    loadText() { }
    loadJson() { }
    loadScript(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadScript ? self._loadScript(file) : self.addFileFunction(file, self, "_loadScript", Mrbr_IO_LoadScript);
    }
    loadScriptElement(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadScriptElement ? self._loadScriptElement(file) : self.addFileFunction(file, self, "_loadScriptElement", Mrbr_IO_LoadScriptElement);
    }
    loadScriptLink(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        if (self._loadScriptLink) {
            return self._loadScriptLink(file);
        }
        else {
            let promise = self.createPromise();
            self.addFileFunction(file, self, "_loadScriptLink", Mrbr_IO_LoadScriptLink)
                .then(_ => {
                    self._loadScriptLink = Mrbr_IO_LoadScriptLink.bind(self);
                    promise.resolve(file);
                    return self._loadScriptLink(file);
                })
            return promise.promise;
        }
    }
    loadCssElement(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadCssLink ? self._loadCssLink(file) : self.addFileFunction(file, self, "_loadCssElement", Mrbr_IO_LoadCssElement);
    }
    loadCssLink(file: Mrbr_IO_File): Promise<any> {

        const self = this;
        if (self._loadCssLink) {
            return self._loadCssLink(file);
        }
        else {
            let promise = self.createPromise();
            self.addFileFunction(file, self, "_loadCssLink", Mrbr_IO_LoadCssLink)
                .then(_ => {
                    self._loadCssLink = Mrbr_IO_LoadCssLink.bind(self);
                    promise.resolve(file);
                    return self._loadCssLink(file);
                })
            return promise.promise;
        }
    }
    loadHtml() { }
    loadOther() { }
    addFunction(target: any, targetFunctionName: string, functionToLoad: any): Promise<any> {
        const self = this;
        if (target[targetFunctionName]) { return Promise.resolve(target[targetFunctionName]); }
        if (!MrbrBase.Namespace.isNamespace(functionToLoad)) {
            target[targetFunctionName] = functionToLoad;
            return Promise.resolve(functionToLoad);
        }
        let promise = self.createPromise()
        let manifest = Mrbr_IO_File.component(functionToLoad);
        console.log("addFunction: start")
        self.loadManifest(manifest)
            .then(result => {
                console.log("addFunction: then")
                promise.resolve(target[targetFunctionName])
            })
            .catch(err => promise.reject(err));
        return promise.promise;
    }
    addFileFunction(file: Mrbr_IO_File, target: any, targetFunctionName: string, functionToLoad: any): Promise<any> {
        const self = this;
        let promise = self.createPromise();
        self.addFunction(target, targetFunctionName, functionToLoad)
            .then(fn => {
                //console.log("addedFunction: ", targetFunctionName)
                promise.resolve(fn)
            })
            .catch(err => promise.reject(err))
        return promise.promise;
    }
    static eventNames = {
        DOMContentLoaded: "DOMContentLoaded",
        load: "load",
        readyStateChange: "readyStateChange"
    }
    static documentStates = {
        complete: "complete"
    }
    static readyStates = {
        complete: "complete"
    }
    /**
     * When run in the Browser provides an onReady function.
     * Once Assembly.initialised is resolved events are set for when browser DOM is "ready"
     * @returns {Promise} DOM is "ready"
     */
    onReady(config: any) {
        const readyStateChange_Handler = readyStateChange;
        let self = this,
            fnResolve: Function,
            self_constructor = self.constructor,
            doc = document,
            win = window;
        const eventNames = (self_constructor as typeof MrbrBase).eventNames;
        const fnReady = () => {
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
var mrbr: MrbrBase = new MrbrBase({});