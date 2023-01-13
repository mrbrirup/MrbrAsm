import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Forms_Dialog } from "./Dialog";
type NavigationButtons = {
    name: string,
    src: string,
    order: number,
    eventType: string
}

export class Mrbr_UI_Bootstrap_Forms_UrlDialog extends Mrbr_UI_Bootstrap_Forms_Dialog {
    _history: Array<string> = [];
    public static IFRAME_ELEMENT_NAME: string = "iframeBrowserPanel";
    public static BROWSER_ELEMENT_NAME: string = "iframeBrowserPanel";
    constructor() {
        super();
    }
    protected _iFrameConfig(): Mrbr_UI_Controls_ControlConfig {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        return new ctrlCfg(Mrbr_UI_Bootstrap_Forms_UrlDialog.BROWSER_ELEMENT_NAME, "div",
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes("h-100 w-100")
                .Children([
                    new ctrlCfg(Mrbr_UI_Bootstrap_Forms_UrlDialog.IFRAME_ELEMENT_NAME, "iframe",
                        new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                            .Classes(["w-100 h-100"]))
                ])
        )
    }
    private _url: string = "";
    public get url(): string {
        return this._url;
    }
    public set url(value: string) {
        this._url = value;
    }

    iFrameLoadStart(event) {
        console.log("loadStart:", "event")
    }
    iFramePopState(event) {
        console.log("popstate: ", "event")
    }
    iFrameLoaded(event) {
        console.log("loaded: ", "event")
    }
    private _navigationBar: HTMLElement;
    _navigationButtons: HTMLElement

    public get navigationBar(): HTMLElement {
        return this.elements["navigationContainer"];
    }
    public set navigationBar(value: HTMLElement) {
        this._navigationBar = value;
    }

    public get iFrame(): HTMLIFrameElement {
        return this.elements["iframeContainer"]
    }
    public set iFrame(value: HTMLIFrameElement) {
        this.elements["iframeContainer"] = value;
    }
    initialise(...args): Mrbr_System_Promise<any> {
        const self = this,
            initalisePromise = Mrbr_System_Promise.create("");
        super.initialise(args)
            .then(_ => {
                MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MANIFEST])
                    .then(_ => {
                        self.customConfiguration.add(Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME,
                            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                                .Classes(["mrbr-dialog-handle-drag", "container-fluid", "bg-dark", "d-flex", "user-select-none", "pe-0"])
                                .Styles({ height: "10rem" })
                                .LightTheme("bg-light")
                                .DarkTheme("bg-dark")
                        );
                        self.createElement(self._iFrameConfig());
                        self
                            .elements[Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME]
                            .appendChild(self.elements[Mrbr_UI_Bootstrap_Forms_UrlDialog.IFRAME_ELEMENT_NAME])
                        self.elements[Mrbr_UI_Bootstrap_Forms_UrlDialog.IFRAME_ELEMENT_NAME].src = self.url;
                        initalisePromise.resolve(this);
                    })
            })
        return initalisePromise;
    }
    drawDialog() {
        const self = this;
        super.drawDialog();

    }
    show() {
        const self = this;
        super.show()
    }
    showDialog() {
        super.show()
    }
    createTitleBar() {
        const self = this;
        if (self.titleBar !== true) { return; }
        let titleBarConfig = self.titleBarConfig;
        //Object.assign(titleBarConfig.styles, { backgroundColor: "red" })
        // const index = titleBarConfig.classes.indexOf("bg-dark");
        // if (index > -1) { 
        //     (titleBarConfig.classes as Array<string>).splice(index, 1);
        // }
        self.createElement(titleBarConfig)
        self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME].prepend(self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME]);
    }
}