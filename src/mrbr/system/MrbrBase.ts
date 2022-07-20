/// <mrbr manifest="false" />
import { Mrbr_Assembly_MrbrConfig } from '../assembly/mrbrConfig'
import { Mrbr_Collections_Dictionary } from '../collections/Dictionary';
import { Mrbr_Collections_KeyValuePair } from '../collections/KeyValuePair';
import { Mrbr_IO_Fetch } from '../io/Fetch';
import { Mrbr_IO_File } from '../io/File';
import { Mrbr_IO_FileType } from '../io/FileType';
import { Mrbr_IO_Path } from '../io/Path';

type nullFunction = (file: Mrbr_IO_File) => Promise<any> | null;

export class MrbrBase extends EventTarget {
    static cacheTimeOut: number = 5000;
    static temporaryObjectTimeOut: number = 5000;
    config: Mrbr_Assembly_MrbrConfig;

    static _paths: Map<string, string> = new Map();
    static defaultMrbrPath: string = "/mrbr/";
    host: any;
    _entries: any;
    _files: any;
    _mrbr: MrbrBase;
    get mrbr(): MrbrBase { return this._mrbr; }
    constructor(assemblyEntries: Object) {
        super();
        const self = this;
        if ((assemblyEntries as any)["Mrbr_Collections_Dictionary"]) {
            ((self.constructor as any).assembly as Mrbr_Collections_Dictionary<string, any>) = new (assemblyEntries as any)["Mrbr_Collections_Dictionary"]();
        }
        self._entries =
            new Proxy(
                (self.statics as any).assembly,
                {
                    get(target, name) {
                        return (target.has(((name as unknown) as string))) ? (target.get(((name as unknown) as string))).result : undefined;
                    }
                }
            )
        self._files =
            new Proxy(
                (self.statics as MrbrBase).assembly,
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
        this._mrbr = mrbr;
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
        let mrbrPath = (self.constructor as any)._paths.get("Mrbr") || document?.currentScript?.dataset?.pathMrbr || (self.constructor as any).defaultMrbrPath;
        //if (!(self.constructor as any)._paths) {
        //(self.constructor as any)._paths.set("Mrbr", mrbrPath)
        //}
        let manifest =
            [
                new Mrbr_IO_File(Mrbr_IO_FileType.Component, "Mrbr", "Mrbr_Assembly_MrbrConfig", null, false, false)
                // ,
                // new entries["Mrbr_IO_File"](entries["Mrbr_IO_FileType"].Component, "Mrbr", "Mrbr_IO_File", false, false),
                // new entries["Mrbr_IO_File"](entries["Mrbr_IO_FileType"].Component, "Mrbr", "Mrbr_IO_FileType", false, false),
                // new entries["Mrbr_IO_File"](entries["Mrbr_IO_FileType"].Component, "Mrbr", "Mrbr_Assembly_MrbrConfig", false, false)
            ];
        self.loadManifest(manifest)
            .then(_ => {
                initialiseResolve(self);
            })
            .catch(err => {
                initialiseReject(err)
            });
        return initialisePromise
    }
    loadManifest(manifest: Array<Mrbr_IO_File>): Promise<any> {
        let self = this,
            loadReject: Function, loadResolve: Function,
            loadPromise = new Promise((resolve, reject) => { loadReject = reject, loadResolve = resolve })
        let manifestEntries = [];
        manifest.forEach(manifestEntry => manifestEntries.push(self.load(manifestEntry)))
        Promise.all(manifestEntries)
            .then(_ => {
                loadResolve(self)
            }
            )
        // .catch(err => loadReject(err))
        return loadPromise;
    }
    load(file: Mrbr_IO_File): Promise<any> {
        const self = this,
            mrbrIOFile = Mrbr_IO_File,
            mrbrIOFileType = Mrbr_IO_FileType;
        let resolveResult: Function,
            rejectResult: Function;//,            loadResultPromise: Promise<any>;
        if (self.asm[file.entryName]) {
            return self.asm[file.entryName].file.filePromise;
        }
        self.asm[file.entryName] = { file: file, result: null };
        if (!file.loadingPromise) {
            file.loadingPromise = new Promise((resolve, reject) => {
                resolveResult = resolve;
                rejectResult = reject;
            });
        }
        else {
            return file.loadingPromise;
        }
        //console.log(file.entryName);
        //console.log(self.asm[file.entryName]);
        switch (file.fileType) {
            // case mrbrIOFileType.Text:
            //     break;
            // case mrbrIOFileType.Text:
            //     break;
            // case mrbrIOFileType.Json:
            //     break;
            // case mrbrIOFileType.Script:
            //     break;
            case mrbrIOFileType.ScriptElement:
                self.loadScriptElement(file)
                .then(result=> resolveResult(result))
                .catch(err => rejectResult(err))
                break;
            case mrbrIOFileType.ScriptLink:
                self.loadScriptLink(file)
                .then(result=> resolveResult(result))
                .catch(err => rejectResult(err))
                break;
            // case mrbrIOFileType.CssElement:
            //     break;
            // case mrbrIOFileType.CssLink:
            //     break;
            // case mrbrIOFileType.Html:
            //     break;
            case mrbrIOFileType.Component:
                self.loadComponent(file)
                .then(result => resolveResult(resolveResult))
                .catch(err => rejectResult(err))
                break;
            // case mrbrIOFileType.Other:
            //     break;
            default:
                break;
        }
        return file.loadingPromise;
    }
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
                        var res = new Function("mrbr", "returnManifest", txt)(mrbr, true);
                        if (res && Array.isArray(res) && res.length > 0) {
                            self.loadManifest(res)
                                .then(result => {
                                    setTimeout(fileResolve(result), 0);
                                })
                        }
                        else {
                            setTimeout(fileResolve(result), 0);
                        }
                    })
            })
            .catch(err => fileReject(err));
            return filePromise;
    }
    loadText() { }
    loadJson() { }
    loadScript() { }
    //_loadScriptElement : null | (file: Mrbr_IO_File): Promise<any>{return null};
    _loadScriptElement: nullFunction = null;
    _loadScriptLink: nullFunction = null;
    loadScriptElement(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        if (self._loadScriptElement) { return self._loadScriptElement(file); }
        let fileReject: Function, fileResolve: Function,
            filePromise = new Promise((resolve, reject) => { fileReject = reject, fileResolve = resolve });
        let manifest = [new Mrbr_IO_File(Mrbr_IO_FileType.Component, "Mrbr", "Mrbr_IO_LoadScriptElement", null, false, false)];
        self.loadManifest(manifest)
            .then(result => {
                self._loadScriptElement = mrbr._entries["Mrbr_IO_LoadScriptElement"].bind(self);
                self._loadScriptElement(file)
                    .then(_ => {
                        fileResolve(result)
                    })
            })
            .catch(err => fileReject(err));
        return filePromise;
    }
    loadScriptLink(file: Mrbr_IO_File): Promise<any> {
        const self = this;
        if (self._loadScriptLink) { return self._loadScriptLink(file); }
        let fileReject: Function, fileResolve: Function,
            filePromise = new Promise((resolve, reject) => { fileReject = reject, fileResolve = resolve });
        let manifest = [new Mrbr_IO_File(Mrbr_IO_FileType.Component, "Mrbr", "Mrbr_IO_LoadScriptLink", null, false, false)];
        self.loadManifest(manifest)
            .then(result => {
                self._loadScriptLink = mrbr._entries["Mrbr_IO_LoadScriptLink"].bind(self);
                self._loadScriptLink(file)
                    .then(_ => {
                        fileResolve(result)
                    })
                    .catch(err => fileReject(err))
            })
            .catch(err => fileReject(err));
        return filePromise;
    }
    loadCssElement() { }
    loadCssLink() { }
    loadHtml() { }
    loadOther() { }

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