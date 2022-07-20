((host) => {
    console.log(host)
    host["mrbr"]["Mrbr_Assembly"] =
        //import './mrbrConfig';
        //import "../io/File";
        //import { Mrbr_IO_FileType } from "../io/FileType";
        //import Mrbr_IO_File_Json from 'json!./assembly/mrbr.json'
        //import Mrbr_IO_File_Text from 'text!./mrbr.txt'
        //console.log(Mrbr_IO_File_Json);
        //export class Mrbr_Assembly {
        class Mrbr_Assembly {
            constructor(config) {
                const self = this;
                self.config = config;
                console.log("new Mrbr_Assembly_MrbrConfig");
            }
            initialise() {
                const self = this;
                let resolveResult, rejectResult, initialiseResult = new Promise((resolve, reject) => {
                    resolveResult = resolve;
                    rejectResult = reject;
                });
                if (window["Mrbr"] === undefined || window["Mrbr"] === null) {
                    window["Mrbr"] = {};
                }
                console.log("Initted, init!!!");
                resolveResult(self);
                return initialiseResult;
            }
            load(file) {
                const self = this;
                let resolveResult, rejectResult, loadResult = new Promise((resolve, reject) => {
                    resolveResult = resolve;
                    rejectResult = reject;
                });
                switch (file.fileType) {
                    case Mrbr_IO_FileType.Text:
                        break;
                    case Mrbr_IO_FileType.Text:
                        break;
                    case Mrbr_IO_FileType.Json:
                        break;
                    case Mrbr_IO_FileType.Script:
                        break;
                    case Mrbr_IO_FileType.ScriptElement:
                        self.loadScriptElement(file);
                        break;
                    case Mrbr_IO_FileType.ScriptLink:
                        break;
                    case Mrbr_IO_FileType.CssElement:
                        break;
                    case Mrbr_IO_FileType.CssLink:
                        break;
                    case Mrbr_IO_FileType.Html:
                        break;
                    case Mrbr_IO_FileType.Component:
                        break;
                    case Mrbr_IO_FileType.Other:
                        break;
                    default:
                        break;
                }
                return loadResult;
            }
            loadText() { }
            loadJson() { }
            loadScript() { }
            loadScriptElement(file) {
                let resolveResult, rejectResult;
                const script = document.createElement('script'), loadResult = new Promise((resolve, reject) => {
                    resolveResult = resolve;
                    rejectResult = reject;
                });
                script.id = file.id;
                script.setAttribute('src', file.fileName);
                if (file.isAsync) {
                    script.setAttribute('async', '');
                }
                if (file.isModule) {
                    script.setAttribute('type', 'module');
                }
                script.onload = () => {
                    script.onload = null;
                    script.onerror = null;
                    resolveResult(file);
                };
                script.onerror = () => {
                    script.onload = null;
                    script.onerror = null;
                    rejectResult(file);
                };
                document.head.appendChild(script);
                return loadResult;
            }
            loadScriptLink(file) {
                let resolveResult, rejectResult;
                const script = document.createElement('script'), loadResult = new Promise((resolve, reject) => {
                    resolveResult = resolve;
                    rejectResult = reject;
                });
                script.id = file.id;
                script.setAttribute('src', file.fileName);
                if (file.isAsync) {
                    script.setAttribute('async', '');
                }
                if (file.isModule) {
                    script.setAttribute('type', 'module');
                }
                script.onload = () => {
                    script.onload = null;
                    script.onerror = null;
                    resolveResult(file);
                };
                script.onerror = () => {
                    script.onload = null;
                    script.onerror = null;
                    rejectResult(file);
                };
                document.head.appendChild(script);
                return loadResult;
            }
            loadCssElement() { }
            loadCssLink() { }
            loadHtml() { }
            loadComponent() { }
            loadOther() { }
            onReady(config) {
                let self = this, fnResolve;
                const eventNames = Mrbr_Assembly.eventNames;
                const fnReady = () => {
                    document.removeEventListener(eventNames.document.DOMContentLoaded, fnReady);
                    document.removeEventListener(eventNames.document.load, fnReady);
                    window.removeEventListener(eventNames.window.load, fnReady);
                    window.removeEventListener(eventNames.window.DOMContentLoaded, fnReady);
                    fnResolve();
                };
                return new Promise(function (resolve, reject) {
                    fnResolve = resolve;
                    self.initialise()
                        .then(() => {
                            document.onreadystatechange = function () {
                                if (document.readyState === Mrbr_Assembly.documentStates.complete) {
                                    fnReady();
                                }
                            };
                            if (document.readyState === Mrbr_Assembly.documentStates.complete) {
                                resolve(Mrbr_Assembly.readyStates.complete);
                            }
                            else {
                                document.addEventListener(eventNames.document.DOMContentLoaded, fnReady);
                                document.addEventListener(eventNames.document.load, fnReady);
                                window.addEventListener(eventNames.window.load, fnReady);
                                window.addEventListener(eventNames.window.DOMContentLoaded, fnReady);
                            }
                        });
                });
            }
        }
    /**
    * When run in the Browser provides an onReady function.
    * Once Assembly.initialised is resolved events are set for when browser DOM is "ready"
    * @returns {Promise} DOM is "ready"
    */
    Mrbr_Assembly.eventNames = {
        document: {
            DOMContentLoaded: "DOMContentLoaded",
            load: "load"
        },
        window: {
            DOMContentLoaded: "DOMContentLoaded",
            load: "load"
        }
    };
    Mrbr_Assembly.documentStates = {
        complete: "complete"
    };
    Mrbr_Assembly.readyStates = {
        complete: "complete"
    };
})