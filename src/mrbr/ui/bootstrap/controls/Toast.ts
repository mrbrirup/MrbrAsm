import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Toast extends Mrbr_UI_Controls_Control {
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Toast { return Mrbr_UI_Bootstrap_Controls_Toast; }
    public static readonly HEADER_NAME: string = "toast_header";
    public static readonly BODY_NAME: string = "toast_body";
    private static readonly HEADER_SELECTOR: string = ".toast-header";
    private static readonly IMAGE_SELECTOR: string = "img";
    private static readonly TITLE_SELECTOR = "strong";
    private static readonly SUBTITLE_SELECTOR = "small";
    private static readonly CLOSE_BUTTON_SELECTOR: string = "button.btn-close";


    //#region Elements Configuration
    private _toastConfig: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private _headerConfig: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private _bodyConfig: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    public get toastConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self._toastConfig) && (self._toastConfig = new self.$ctrlPrm()
            .Classes("toast")
            .Properties({ role: "alert" })
            .Aria({ "live": "assertive", "atomic": "true" })
        );
        return self._toastConfig;
    }
    public get headerConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self._headerConfig) && (self._headerConfig = new self.$ctrlPrm()
            .Classes("toast-header")
            .Template(`<img class="rounded me-2">
            <strong class="me-auto"></strong>
            <small></small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`)
        );
        return self._headerConfig;
    }
    public get bodyConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self._bodyConfig) && (self._bodyConfig = new self.$ctrlPrm()
            .Classes("toast-body")
        );
        return self._bodyConfig;
    }

    //#endregion Elements Configuration

    private _showHeader: boolean = true;
    private _imageSource: string;
    private _imageAltText: string;
    private _subTitle: string;
    private _title: string;
    public get headerElement(): HTMLElement {
        const self = this;
        return (self.rootElement) ? <HTMLDivElement>self.rootElement.querySelector(self.$cls.HEADER_SELECTOR) : null;
    }
    public get titleElement(): HTMLElement {
        const self = this;
        return (self.headerElement) ? <HTMLElement>self.headerElement.querySelector(self.$cls.TITLE_SELECTOR) : null;
    }
    public get subtitleElement(): HTMLElement {
        const self = this;
        return (self.headerElement) ? <HTMLElement>self.headerElement.querySelector(self.$cls.SUBTITLE_SELECTOR) : null;
    }
    public get closeButton(): HTMLElement {
        const self = this;
        return (self.headerElement) ? <HTMLElement>self.headerElement.querySelector(self.$cls.CLOSE_BUTTON_SELECTOR) : null;
    }
    public get bodyElement(): HTMLElement {
        const self = this;
        return self.elements[self.$cls.BODY_NAME]
    }
    public get imageElement(): HTMLImageElement {
        const self = this;
        return (self.headerElement) ? <HTMLImageElement>self.headerElement.querySelector(self.$cls.IMAGE_SELECTOR) : null;
    }
    public get showHeader(): boolean { return this._showHeader; }
    public set showHeader(value: boolean) {
        const self = this;
        self._showHeader = value;
        self.headerElement && self.classes(self.headerElement, value ? self.$clsActions.Remove : self.$clsActions.Add, "visually-hidden");
    }
    public get imageAltText(): string { return this._imageAltText; }
    public set imageAltText(value: string) {
        const self = this;
        self._imageAltText = value;
        self.imageElement && value && (self.imageElement.alt = value);
    }
    public get title(): string { return this._title; }
    public set title(value: string) {
        const self = this;
        self._title = value;
        self.titleElement && value && (self.titleElement.innerText = value);
    }
    public get subTitle(): string { return this._subTitle; }
    public set subTitle(value: string) {
        const self = this;
        self._subTitle = value;
        self.subtitleElement && value && (self.subtitleElement.innerText = value);
    }
    public get imageSource(): string { return this._imageSource; }
    public set imageSource(value: string) {
        const self = this;
        self._imageSource = value;
        self.imageElement && value && (self.imageElement.src = value);
    }
    private _bodyText: string;
    public get bodyText(): string { return this.bodyElement.innerText; }
    public set bodyText(value: string) {
        const self = this;
        self._bodyText = value;
        self.bodyElement && value && (self.bodyElement.innerText = value);
    }

    constructor(rootElementName: string)
    constructor(rootElementName: string, title: string, bodyText: string)
    constructor(rootElementName: string, title?: string, bodyText?: string) {
        super(rootElementName);
        const self = this;
        self.title = title;
        self.bodyText = bodyText;
    }
    public Title(value: string): Mrbr_UI_Bootstrap_Controls_Toast {
        const self = this;
        self.title = value;
        return self;
    }
    public SubTitle(value: string): Mrbr_UI_Bootstrap_Controls_Toast {
        const self = this;
        self.subTitle = value;
        return self;
    }
    public Image(imageSource: string, imageAlt: string): Mrbr_UI_Bootstrap_Controls_Toast {
        const self = this;
        self.imageSource = imageSource;
        self.imageAltText = imageAlt;
        return self;

    }
    public BodyText(value: string): Mrbr_UI_Bootstrap_Controls_Toast {
        const self = this;
        self.bodyText = value;
        return self;
    }


    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toast> {
        const self = this,
            initialisePromise = Mrbr_System_Promise.create<Mrbr_UI_Bootstrap_Controls_Toast>("Mrbr_UI_Bootstrap_Controls_Toast.initialise");
        self.$mrbrInstance.loadManifest(self.$cls[MrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(() => {
                let header = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.HEADER_NAME, "div", self.headerConfig)),
                    body = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.BODY_NAME, "div", self.bodyConfig));
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.toastConfig
                    .Children([header, body])
                ));
                self.defaultContainerElementName = self.$cls.BODY_NAME;

                self.showHeader = self._showHeader;
                self.title = self._title;
                self.subTitle = self._subTitle;
                self.imageSource = self._imageSource;
                self.imageAltText = self._imageAltText;
                self.bodyText = self._bodyText;

                initialisePromise.resolve(self);
            })

        return initialisePromise;
    }
    public get boostrapInstance() {
        const self = this;
        return self.$mrbrInstance.host.bootstrap.Toast.getOrCreateInstance(self.rootElement);
    }

    public show(): Mrbr_UI_Bootstrap_Controls_Toast {
        const self = this;
        self.boostrapInstance.show();
        return self;
    }
    public hide(): Mrbr_UI_Bootstrap_Controls_Toast {
        const self = this;
        self.boostrapInstance.hide();
        return self;
    }
    public dispose(): Mrbr_UI_Bootstrap_Controls_Toast {
        const self = this;
        self.boostrapInstance.dispose();
        self.rootElement && self.rootElement.remove();
        super.dispose();
        return self;
    }
    public onHide(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["hideEvent"] = new Mrbr_System_Events_EventHandler(
            "hide.bs.toast",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["hideEvent"];
    }
    public onHidden(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["hiddenEvent"] = new Mrbr_System_Events_EventHandler(
            "hidden.bs.toast",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["hiddenEvent"];
    }
    public onShow(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["showEvent"] = new Mrbr_System_Events_EventHandler(
            "show.bs.toast",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["showEvent"];
    }
    public onShown(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["shownEvent"] = new Mrbr_System_Events_EventHandler(
            "shown.bs.toast",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["shownEvent"];
    }
}