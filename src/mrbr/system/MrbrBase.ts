/// <mrbr manifest="false" />
import { Mrbr_Assembly_MrbrConfig } from '../assembly/mrbrConfig'
import { Mrbr_IO_Fetch } from '../io/Fetch';
import { Mrbr_IO_File } from '../io/File';
import { Mrbr_IO_FileType } from '../io/FileType';
import { Mrbr_IO_Path } from '../io/Path';

type nullFunction = (file: Mrbr_IO_File) => Promise<any> | null;
type loadFunction = (file: Mrbr_IO_File) => Promise<any> | null;
type mrbrPromise = {
    promise: Promise<any>;
    reject:Function;
    resolve: Function;
}
export class MrbrBase extends EventTarget {
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
        self.mrbr = mrbr;
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
            promise = self._promise(),
            self_paths = self._paths;
        self.config = config;
        let global: any; global = global || null;
        self.host = ((window as any) || (global) || (globalThis as any));
        if (config?.paths) {
            Object.keys(config.paths).forEach(key => self_paths.set(key, config.paths[key]));
        }

        promise.resolve(self);
        return promise.promise;
    }
    loadManifest(manifest: Array<Mrbr_IO_File> | Mrbr_IO_File): Promise<any> {
        let self = this,
            promise = self._promise();
        Promise.all((Array.isArray(manifest) ? manifest : [manifest]).map(manifestEntry => self.load(manifestEntry)))
            .then(_ => promise.resolve(self))
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
        const self = this,
            self_asm = self.asm;
        if (self_asm[file.entryName]?.file?.loadingPromise) {
            return self_asm[file.entryName].file.loadingPromise;
        }
        self.asm[file.entryName] = { file: file, result: null };
        // let resolveResult: Function,
        //     rejectResult: Function;
        let promise = self._promise();
        if (!file.loadingPromise) {
            file.loadingPromise = promise.promise;
        }
        self.loadFnMap.get(file.fileType)(file)
            .then(result => promise.resolve(result))
            .catch(err => promise.reject(err))
        return file.loadingPromise;
    }
    _loadScript: nullFunction = null;
    _loadScriptElement: nullFunction = null;
    _loadScriptLink: nullFunction = null;
    _loadCssLink: nullFunction = null;
    _loadCssElement: nullFunction = null;
    _promise(): mrbrPromise {
        let _reject: Function, _resolve: Function;
        return {
            promise: new Promise((resolve, reject) => { _reject = reject, _resolve = resolve }),
            reject: _reject,
            resolve: _resolve
        }
    }
    
    loadComponent(file: Mrbr_IO_File) {
        const self = this,
            componentName = file.entryName;
        file.fileName = file.entryName.replace(/_/g, "/")
        let mrbrFetch = new Mrbr_IO_Fetch(),
            root = self.paths.get(file.root) || "",
            componentPath = Mrbr_IO_Path.join([root, file.fileName], false) + ".js",
            promise = self._promise();
        mrbrFetch.fetch(componentPath, {})
            .then(result => {
                result.text()
                    .then((txt: any) => {
                        self.loadManifest(new Function("mrbr", "returnManifest", "data", txt).bind(self)(mrbr, true, file.data))
                            .then(result => {
                                setTimeout(promise.resolve(result), 0);
                            })
                    })
            })
            .catch(err => promise.reject(err));
        return promise.promise;
    }
    loadText() { }
    loadJson() { }
    loadScript(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadScript ? self._loadScript(file) : self.addFileFunction(file, self, "_loadScript", "Mrbr_IO_LoadScript");
    }
    loadScriptElement(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadScriptElement ? self._loadScriptElement(file) : self.addFileFunction(file, self, "_loadScriptElement", "Mrbr_IO_LoadScriptElement");
    }
    loadScriptLink(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadScriptLink ? self._loadScriptLink(file) : self.addFileFunction(file, self, "_loadScriptLink", "Mrbr_IO_LoadScriptLink");
    }
    loadCssElement(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadCssLink ? self._loadCssLink(file) : self.addFileFunction(file, self, "_loadCssElement", "Mrbr_IO_LoadCssElement");
    }
    loadCssLink(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        return self._loadCssLink ? self._loadCssLink(file) : self.addFileFunction(file, self, "_loadCssLink", "Mrbr_IO_LoadCssLink");
    }
    loadHtml() { }
    loadOther() { }
    addFunction(target: any, targetFunctionName: string, newFunctionName: string, root?: string): Promise<any> {
        const self = this;
        if (target[targetFunctionName]) { return Promise.resolve(); }
        let promise = self._promise()
        let manifest = new Mrbr_IO_File(Mrbr_IO_FileType.Component, null, newFunctionName, null, false, false);
        self.loadManifest(manifest)
            .then(result => {
                target[targetFunctionName] = mrbr._entries[newFunctionName].bind(target);
                promise.resolve(target[targetFunctionName])
            })
            .catch(err => promise.reject(err));
        return promise.promise;
    }
    addFileFunction(file: Mrbr_IO_File, target: any, targetFunctionName: string, newFunctionName: string, root?: string): Promise<any> {
        const self = this;
        let promise = self._promise();
        self.addFunction(target, targetFunctionName, newFunctionName)
            .then(fn => {
                fn(file)
                    .then(result => { promise.resolve(result) })
                    .catch(err => promise.reject(err))
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
        let self = this,
            fnResolve: Function,
            self_constructor = self.constructor,
            doc = document,
            win = window;
        const eventNames = (self_constructor as typeof MrbrBase).eventNames;
        const fnReady = () => {
            [doc, win].forEach(hostObject => [eventNames.DOMContentLoaded, eventNames.load].forEach(eventName => hostObject.removeEventListener(eventName, fnReady)));
            fnResolve(self)
        }
        function readyStateChange() {
            if (doc.readyState === (self_constructor as typeof MrbrBase).documentStates.complete) {
                doc.removeEventListener(eventNames.readyStateChange, readyStateChange)
                fnReady();
            }
        }
        return new Promise(function (resolve, reject) {
            fnResolve = resolve;
            doc.readyState === (self_constructor as typeof MrbrBase).documentStates.complete ?
                resolve(self) :
                (() => {
                    [doc, win].forEach(hostObject => [eventNames.DOMContentLoaded, eventNames.load].forEach(eventName => hostObject.addEventListener(eventName, fnReady)));
                    doc.addEventListener(eventNames.readyStateChange, readyStateChange);
                })()
        })
    }

}
let mrbr: MrbrBase;