import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";

export class Mrbr_UI_Bootstrap_Controls_Modal extends Mrbr_UI_Controls_Control {
    //#region Public Static Fields
    public static readonly MODAL_NAME: string = "modal";
    public static readonly MODAL_DIALOG_NAME: string = "modal_dialog";
    public static readonly MODAL_CONTENT_NAME: string = "modal_content";
    public static readonly MODAL_HEADER_NAME: string = "modal_header";
    public static readonly MODAL_BODY_NAME: string = "modal_body";
    public static readonly MODAL_FOOTER_NAME: string = "modal_footer";
    public static readonly MODAL_TITLE_NAME: string = "modal_titlebar";
    public static readonly MODAL_CLOSE_BUTTON_NAME: string = "modal_close_button";
    public static readonly MODAL_SHOWING_EVENT: string = "show.bs.modal";
    public static readonly MODAL_SHOWN_EVENT: string = "shown.bs.modal";
    public static readonly MODAL_HIDING_EVENT: string = "hide.bs.modal";
    public static readonly MODAL_HIDDEN_EVENT: string = "hidden.bs.modal";
    public static readonly MODAL_HIDE_PREVENTED_EVENT: string = "hidePrevented.bs.modal";
    //#endregion Public Static Fields
    //#region Public Static Enums
    public static readonly fullScreenSizings = {
        none: "",
        default: "modal-fullscreen",
        sm: "modal-fullscreen-sm-down",
        md: "modal-fullscreen-md-down",
        lg: "modal-fullscreen-lg-down",
        xl: "modal-fullscreen-xl-down",
        xxl: "modal-fullscreen-xxl-down"
    } as const
    public static readonly dialigSizings = {
        sm: "modal-sm",
        lg: "modal-lg",
        xl: "modal-xl",
        default: ""
    } as const
    //#endregion Public Static Enums
    //#region Private Fields
    private _dialogTitleText: string;
    private _closeButton: boolean = false;
    private _fade: boolean = false;
    private _footer: boolean = true;
    private _header: boolean = true;
    private _fullScreenSizing: typeof Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings[keyof typeof Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings] = Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings.none;
    private _modalSize: typeof Mrbr_UI_Bootstrap_Controls_Modal.dialigSizings[keyof typeof Mrbr_UI_Bootstrap_Controls_Modal.dialigSizings] = Mrbr_UI_Bootstrap_Controls_Modal.dialigSizings.default;
    private _staticBackdrop: boolean = false;
    private _title: boolean = true;
    private _verticalCenter: boolean = false;
    private _scrollable: boolean = false;
    //#endregion Private Fields
    //#region Public Properties
    public get dialogTitleText(): string { return this._dialogTitleText; }
    public set dialogTitleText(value: string) { this._dialogTitleText = value; }
    public get fade(): boolean { return this._fade; }
    public set fade(value: boolean) {
        const self = this;
        self._fade = value;
        self.rootElement && self.classes(self.rootElement, value ? self.$clsActions.Add : self.$clsActions.Remove, "fade");
    }
    public get header(): boolean { return this._header; }
    public set header(value: boolean) { this._header = value; }
    public get footer(): boolean { return this._footer; }
    public set footer(value: boolean) { this._footer = value; }
    public get scrollable(): boolean { return this._scrollable; }
    public set scrollable(value: boolean) {
        const
            self = this,
            modalDialog = self.elements[self.$cls.MODAL_DIALOG_NAME];
        self._scrollable = value;
        modalDialog && self.classes(modalDialog, value ? self.$clsActions.Add : self.$clsActions.Remove, "modal-dialog-scrollable");
    }
    public get title(): boolean { return this._title; }
    public set title(value: boolean) { this._title = value; }
    public get closeButton(): boolean { return this._closeButton; }
    public set closeButton(value: boolean) { this._closeButton = value; }
    public get staticBackdrop(): boolean { return this._staticBackdrop; }
    public set staticBackdrop(value: boolean) {
        const self = this;
        self._staticBackdrop = value;
        self.rootElement && self.dataset(self.rootElement, { bsBackdrop: value ? "static" : self.$cls.DELETE });
    }
    public get verticalCenter(): boolean { return this._verticalCenter; }
    public set verticalCenter(value: boolean) {
        const
            self = this,
            modalDialog = self.elements[self.$cls.MODAL_DIALOG_NAME];
        modalDialog && self.classes(modalDialog, value ? self.$clsActions.Add : self.$clsActions.Remove, "modal-dialog-centered");
        self._verticalCenter = value;
    }
    public get modalSize(): typeof Mrbr_UI_Bootstrap_Controls_Modal.dialigSizings[keyof typeof Mrbr_UI_Bootstrap_Controls_Modal.dialigSizings] { return this._modalSize; }
    public set modalSize(value: typeof Mrbr_UI_Bootstrap_Controls_Modal.dialigSizings[keyof typeof Mrbr_UI_Bootstrap_Controls_Modal.dialigSizings]) {
        const self = this;
        self.rootElement && self.classes(self.rootElement, self.$clsActions.Remove, self._modalSize);
        self.rootElement && self.classes(self.rootElement, self.$clsActions.Add, value);
        self._modalSize = value;
    }
    public get fullScreenSizing(): typeof Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings[keyof typeof Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings] { return this._fullScreenSizing; }
    public set fullScreenSizing(value: typeof Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings[keyof typeof Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings]) {
        const self = this;
        self.rootElement && self.classes(self.rootElement, self.$clsActions.Remove, self._fullScreenSizing);
        self.rootElement && self.classes(self.rootElement, self.$clsActions.Add, value);
        this._fullScreenSizing = value;
    }
    //#endregion Public Properties
    //#region Private Properties
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Modal { return Mrbr_UI_Bootstrap_Controls_Modal; }
    //#endregion Private Properties
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    //#region Public Methods
    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Modal> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Modal>("Modal:initialise");
        super.initialise(args)
            .then(async _ => {
                await self.setDefaultConfig();
                let
                    modelLabelId = self.$cls.createId("modalLabel"),
                    modalFooter,
                    modalBody,
                    closeButton,
                    modalTitleBar,
                    modalHeader;

                if (self.footer) {
                    modalFooter = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_FOOTER_NAME, "div", self.configuration(self.$cls.MODAL_FOOTER_NAME))
                        .Properties({ innerText: "Footer" }))
                }
                modalBody = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_BODY_NAME, "div", self.configuration(self.$cls.MODAL_BODY_NAME))
                    .Properties({ innerText: "..." })
                );
                if (self.closeButton) {
                    closeButton = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_CLOSE_BUTTON_NAME, "div", self.configuration(self.$cls.MODAL_CLOSE_BUTTON_NAME)));
                }
                if (self.title) {
                    modalTitleBar = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_TITLE_NAME, "h1", self.configuration(self.$cls.MODAL_TITLE_NAME))
                        .Id(modelLabelId)
                        .Properties({ innerText: self.dialogTitleText }))
                }
                if (self.header) {
                    modalHeader = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_HEADER_NAME, "div", self.configuration(self.$cls.MODAL_HEADER_NAME))
                        .Children([modalTitleBar, closeButton].filter(element => element !== null && element !== undefined)))
                }
                const
                    modalContent = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_CONTENT_NAME, "div", self.configuration(self.$cls.MODAL_CONTENT_NAME))
                        .Children([modalHeader, modalBody, modalFooter].filter(element => element !== null && element !== undefined))
                    ),
                    modalDialog = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.MODAL_DIALOG_NAME, "div", self.configuration(self.$cls.MODAL_DIALOG_NAME))
                        .Children([modalContent])
                    ),
                    modal = self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.MODAL_NAME))
                        .Aria({ "labelledby": `#${modelLabelId}`, hidden: true })
                        .Children([modalDialog])
                    );
                self.defaultContainerElementName = self.$cls.MODAL_BODY_NAME;
                self.fade = self._fade;
                self.fullScreenSizing = self._fullScreenSizing;
                self.modalSize = self._modalSize;
                self.scrollable = self._scrollable;
                self.staticBackdrop = self._staticBackdrop;
                self.verticalCenter = self._verticalCenter;
                const msee = Mrbr_System_Events_EventHandler;
                self.events[self.$cls.MODAL_SHOWING_EVENT] = new msee(self.$cls.MODAL_SHOWING_EVENT, self.rootElement, (event: Event) => { self.dispatchEvent(new CustomEvent(self.$cls.MODAL_SHOWING_EVENT, event)); }, self)
                self.events[self.$cls.MODAL_HIDING_EVENT] = new msee(self.$cls.MODAL_HIDING_EVENT, self.rootElement, (event: Event) => { self.dispatchEvent(new CustomEvent(self.$cls.MODAL_HIDING_EVENT, event)); }, self)
                self.events[self.$cls.MODAL_SHOWN_EVENT] = new msee(self.$cls.MODAL_SHOWN_EVENT, self.rootElement, (event: Event) => { self.dispatchEvent(new CustomEvent(self.$cls.MODAL_SHOWN_EVENT, event)); }, self)
                self.events[self.$cls.MODAL_HIDDEN_EVENT] = new msee(self.$cls.MODAL_HIDDEN_EVENT, self.rootElement, (event: Event) => { self.dispatchEvent(new CustomEvent(self.$cls.MODAL_HIDDEN_EVENT, event)); }, self)

                initalisePromise.resolve(self);
            })
            .catch(error => {
                initalisePromise.reject(error);
            });
        return initalisePromise;
    }
    //#endregion Public Methods
    //#region Private Methods
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Modal> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Modal>("Modal:setDefaultConfig");
        super.setDefaultConfig()
            .then(_ => {

                !self.hasConfiguration(self.$cls.MODAL_NAME) && self.defaultConfig.add(self.$cls.MODAL_NAME, new self.$ctrlPrm()
                    .Classes("modal")
                    .Properties({ tabIndex: -1 }));
                !self.hasConfiguration(self.$cls.MODAL_DIALOG_NAME) && self.defaultConfig.add(self.$cls.MODAL_DIALOG_NAME, new self.$ctrlPrm()
                    .Classes("modal-dialog"));
                !self.hasConfiguration(self.$cls.MODAL_CONTENT_NAME) && self.defaultConfig.add(self.$cls.MODAL_CONTENT_NAME, new self.$ctrlPrm()
                    .Classes("modal-content"));
                !self.hasConfiguration(self.$cls.MODAL_HEADER_NAME) && self.defaultConfig.add(self.$cls.MODAL_HEADER_NAME, new self.$ctrlPrm()
                    .Classes("modal-header"));
                !self.hasConfiguration(self.$cls.MODAL_BODY_NAME) && self.defaultConfig.add(self.$cls.MODAL_BODY_NAME, new self.$ctrlPrm()
                    .Classes("modal-body"));
                !self.hasConfiguration(self.$cls.MODAL_FOOTER_NAME) && self.defaultConfig.add(self.$cls.MODAL_FOOTER_NAME, new self.$ctrlPrm()
                    .Classes("modal-footer"));
                !self.hasConfiguration(self.$cls.MODAL_TITLE_NAME) && self.defaultConfig.add(self.$cls.MODAL_TITLE_NAME, new self.$ctrlPrm()
                    .Classes("modal-title fs-5"));
                !self.hasConfiguration(self.$cls.MODAL_CLOSE_BUTTON_NAME) && self.defaultConfig.add(self.$cls.MODAL_CLOSE_BUTTON_NAME, new self.$ctrlPrm()
                    .Classes("btn-close")
                    .Data({ bsDismiss: "modal" })
                    .Properties({ type: "button" })
                    .Aria({ label: "Close" })
                );

                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => {
                setDefaultConfigPromise.reject(error);
            });
        return setDefaultConfigPromise;
    }
    //#endregion Private Methods
}