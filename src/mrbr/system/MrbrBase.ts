/// <mrbr manifest="false" />
import { Mrbr_Assembly_MrbrConfig } from '../assembly/mrbrConfig'
import { Mrbr_Collections_Dictionary } from '../collections/Dictionary';
import { Mrbr_IO_Fetch } from '../io/Fetch';
import { Mrbr_IO_File } from '../io/File';
import { Mrbr_IO_FileType } from '../io/FileType';
import { Mrbr_IO_Path } from '../io/Path';

type nullFunction = (file: Mrbr_IO_File) => Promise<any> | null;
type loadFunction = (file: Mrbr_IO_File) => Promise<any> | null;
export class MrbrBase extends EventTarget {
    static cacheTimeOut: number = 5000;
    static temporaryObjectTimeOut: number = 5000;
    config: Mrbr_Assembly_MrbrConfig;

    static _paths: Map<string, string> = new Map();
    static defaultMrbrPath: string = "/mrbr/";
    host: any;
    _entries: any;
    _files: any;
    static _mrbr: MrbrBase;
    get mrbr(): MrbrBase { return MrbrBase._mrbr; }
    set mrbr(value: MrbrBase) { MrbrBase._mrbr = value; }
    static get mrbrInstance(): MrbrBase { return MrbrBase._mrbr; }
    constructor(assemblyEntries: Object) {
        super();
        const self = this,
            mrbrCollectionsDictionary: string = "Mrbr_Collections_Dictionary";
        if ((assemblyEntries as any)[mrbrCollectionsDictionary]) {
            ((self.constructor as any).assembly as Mrbr_Collections_Dictionary<string, any>) = new (assemblyEntries as any)[mrbrCollectionsDictionary]();
        }
        let statics = (self.statics as any).assembly;
        self._entries =
            new Proxy(
                statics,
                {
                    get(target, name) {
                        return (target.has(((name as unknown) as string))) ? (target.get(((name as unknown) as string))).result : undefined;
                    }
                }
            )
        self._files =
            new Proxy(
                statics,
                {
                    get(target, name) {
                        return (target.has(((name as unknown) as string))) ? (target.get(((name as unknown) as string))).file : undefined;
                    }
                }
            )

        Object.keys(assemblyEntries)
            .forEach(property => {
                self.asm[property] = { file: { loadingPromise: Promise.resolve() }, result: (assemblyEntries as any)[property] };
            })
        assemblyEntries = null;
        self.mrbr = mrbr;
    }
    static assembly: Mrbr_Collections_Dictionary<string, any>
    get paths(): Map<string, string> {
        return (this.constructor as any)._paths;
    }
    get assembly(): Mrbr_Collections_Dictionary<string, any> { return (this.statics as any).assembly; }
    get asm() { return (this.statics as any).assembly.index; }
    get entries() { return this._entries; }
    get files() { return this._files; }
    get statics(): MrbrBase { return ((this.constructor as any) as MrbrBase); }
    initialise(config: Mrbr_Assembly_MrbrConfig) {
        let self = this,
            initialiseReject: Function, initialiseResolve: Function,
            initialisePromise = new Promise((resolve, reject) => { initialiseReject = reject, initialiseResolve = resolve });
        self.config = config;
        let global: any; global = global || null;
        self.host = ((window as any) || (global) || (globalThis as any));


        if (config.paths) {
            Object.keys(config.paths).forEach(key => (self.constructor as any)._paths.set(key, config.paths[key]));
            //(self.constructor as any)._paths.set("Mrbr", mrbrPath)
        }
        //let mrbrPath = (self.constructor as any)._paths.get("Mrbr") || document?.currentScript?.dataset?.pathMrbr || (self.constructor as any).defaultMrbrPath;
        initialiseResolve(self);
        //if (!(self.constructor as any)._paths) {
        //(self.constructor as any)._paths.set("Mrbr", mrbrPath)
        //}
        return initialisePromise
    }
    loadManifest(manifest: Array<Mrbr_IO_File> | Mrbr_IO_File): Promise<any> {
        let self = this,
            loadReject: Function, loadResolve: Function,
            loadPromise = new Promise((resolve, reject) => { loadReject = reject, loadResolve = resolve })
        Promise.all((Array.isArray(manifest) ? manifest : [manifest]).map(manifestEntry => self.load(manifestEntry)))
            .then(_ => loadResolve(self))
            .catch(err => loadReject(err));
        return loadPromise;
    }
    _loadFunctionMap: Map<string, loadFunction> = null;
    get loadFunctionMap(): Map<string, loadFunction> {
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
            mrbrIOFileType = Mrbr_IO_FileType;
        let resolveResult: Function,
            rejectResult: Function;
        if (self.asm[file.entryName]?.file?.loadingPromise) {
            return self.asm[file.entryName].file.loadingPromise;
        }
        self.asm[file.entryName] = { file: file, result: null };
        if (!file.loadingPromise) {
            file.loadingPromise = new Promise((resolve, reject) => {
                resolveResult = resolve;
                rejectResult = reject;
            });
        }
        self.loadFunctionMap.get(file.fileType)(file)
            .then(result => resolveResult(result))
            .catch(err => rejectResult(err))
        return file.loadingPromise;
    }
    _loadScript: nullFunction = null;
    _loadScriptElement: nullFunction = null;
    _loadScriptLink: nullFunction = null;
    _loadCssLink: nullFunction = null;
    _loadCssElement: nullFunction = null;
    loadComponent(file: Mrbr_IO_File) {
        const self = this,
            componentName = file.entryName;
        let mrbrFetch = new Mrbr_IO_Fetch();
        file.fileName = file.entryName.replace(/_/g, "/")
        let root = self.paths.get(file.root) || "";
        let componentPath = Mrbr_IO_Path.join([root, file.fileName], false) + ".js";
        let fileReject: Function, fileResolve: Function,
            filePromise = new Promise((resolve, reject) => { fileReject = reject, fileResolve = resolve });
        mrbrFetch.fetch(componentPath, {})
            .then(result => {
                result.text()
                    .then((txt: any) => {

                        self.loadManifest(new Function("mrbr", "returnManifest", "data", txt).bind(self)(mrbr, true, file.data))
                            .then(result => {
                                setTimeout(fileResolve(result), 0);
                            })
                    })
            })
            .catch(err => fileReject(err));
        return filePromise;
    }
    loadText() { }
    loadJson() { }
    loadScript(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        if (self._loadScript) { return self._loadScript(file); }
        return self.addFileFunction(file, self, "_loadScript", "Mrbr_IO_LoadScript");
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
        let addFunctionReject: Function, addFunctionResolve: Function,
            addFunctionPromise = new Promise((resolve, reject) => { addFunctionReject = reject, addFunctionResolve = resolve });
        let manifest = new Mrbr_IO_File(Mrbr_IO_FileType.Component, null, newFunctionName, null, false, false);
        self.loadManifest(manifest)
            .then(result => {
                target[targetFunctionName] = mrbr._entries[newFunctionName].bind(target);
                addFunctionResolve(target[targetFunctionName])
            })
            .catch(err => addFunctionReject(err));
        return addFunctionPromise;
    }
    addFileFunction(file: Mrbr_IO_File, target: any, targetFunctionName: string, newFunctionName: string, root?: string): Promise<any> {
        const self = this;
        let addFileFunctionReject: Function, addFileFunctionResolve: Function,
            addFileFunctionPromise = new Promise((resolve, reject) => { addFileFunctionReject = reject, addFileFunctionResolve = resolve });
        self.addFunction(target, targetFunctionName, newFunctionName)
            .then(fn => {
                fn(file)
                    .then(result => { addFileFunctionResolve(result) })
                    .catch(err => addFileFunctionReject(err))
            })
            .catch(err => addFileFunctionReject(err))
        return addFileFunctionPromise;
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
            fnResolve: Function;
        const eventNames = (self.constructor as typeof MrbrBase).eventNames;
        const fnReady = () => {
            [document, window].forEach(hostObject => [eventNames.DOMContentLoaded, eventNames.load].forEach(eventName => hostObject.removeEventListener(eventName, fnReady)));
            fnResolve(self)
        }
        function readyStateChange() {
            if (document.readyState === (self.constructor as typeof MrbrBase).documentStates.complete) {
                document.removeEventListener(eventNames.readyStateChange, readyStateChange)
                fnReady();
            }
        }
        return new Promise(function (resolve, reject) {
            fnResolve = resolve;
            document.readyState === (self.constructor as typeof MrbrBase).documentStates.complete ?
                resolve(self) :
                (() => {
                    [document, window].forEach(hostObject => [eventNames.DOMContentLoaded, eventNames.load].forEach(eventName => hostObject.addEventListener(eventName, fnReady)));
                    document.addEventListener(eventNames.readyStateChange, readyStateChange);
                })()
        })
    }

}
let mrbr: MrbrBase;