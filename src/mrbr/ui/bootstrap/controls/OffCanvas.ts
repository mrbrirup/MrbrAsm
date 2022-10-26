import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_OffCanvas extends Mrbr_UI_Controls_Control {

    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_OffCanvas { return Mrbr_UI_Bootstrap_Controls_OffCanvas; }


    //#region Private Static Configuration
    private static _offcanvas_toggler_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_header_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_body_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_title_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _close_button_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    //#endregion Private Static Configuration
    //#region Private Property Fields
    private _bodyElement: HTMLDivElement;
    private _buttonElement: HTMLButtonElement;
    private _disabled: boolean = false;
    private _headerElement: HTMLDivElement;
    private _headerVisble: boolean = true;
    private _name: string;
    private _offCanvas: HTMLDivElement;
    private _position: typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions[keyof typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions] = Mrbr_UI_Bootstrap_Controls_OffCanvas.positions.end;
    private _titleElement: HTMLHeadingElement;
    private _title: string = "";
    private _togglerElement: HTMLElement;
    private _offCanvasTheme: typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.themes[keyof typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.themes] = Mrbr_UI_Bootstrap_Controls_OffCanvas.themes.light;
    //#endregion Private Property Fields
    //#region Public Configuration Properties
    public get OFFCANVAS_TOGGLER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._offcanvas_toggler_config) && (self.$cls._offcanvas_toggler_config = new self.$ctrlPrm()
            .Classes("navbar-toggler")
            .Attributes({ "type": "button" })
            .Properties({ type: "button" })
            .Data({ bsToggle: "offcanvas" })
            .Template(`<i class="bi bi-list"></i>`))

        return Object.assign(new self.$ctrlPrm(), self.$cls._offcanvas_toggler_config);
    }

    public get OFFCANVAS_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;;
        (!self.$cls._offcanvas_config) && (self.$cls._offcanvas_config = new self.$ctrlPrm()
            .Classes("offcanvas"))
        return Object.assign(new self.$ctrlPrm(), self.$cls._offcanvas_config);
    }
    public get OFFCANVAS_HEADER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._offcanvas_header_config) && (self.$cls._offcanvas_header_config = new self.$ctrlPrm()
            .Classes("offcanvas-header"))
        return Object.assign(new self.$ctrlPrm(), self.$cls._offcanvas_header_config);
    }

    public get CLOSE_BUTTON_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._close_button_config) && (self.$cls._close_button_config = new self.$ctrlPrm()
            .Classes("btn-close")
            .Attributes({ "type": "button" })
            .Aria({ label: "Close" })
            .Data({ bsDismiss: "offcanvas" }))
        return Object.assign(new self.$ctrlPrm(), self.$cls._close_button_config);
    }
    public get OFFCANVAS_BODY_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._offcanvas_body_config) && (self.$cls._offcanvas_body_config = new self.$ctrlPrm()
            .Classes("offcanvas-body"))
        return Object.assign(new self.$ctrlPrm(), self.$cls._offcanvas_body_config);
    }
    public get OFFCANVAS_TITLE_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._offcanvas_title_config) && (self.$cls._offcanvas_title_config = new self.$ctrlPrm()
            .Classes("offcanvas-title"))
        return Object.assign(new self.$ctrlPrm(), self.$cls._offcanvas_title_config);
    }
    //#endregion Public Configuration Properties
    //#region Public Static Enums
    public static positions = {
        start: "offcanvas-start",
        end: "offcanvas-end",
        top: "offcanvas-top",
        bottom: "offcanvas-bottom",
    } as const;

    public static themes = {
        light: "light",
        dark: "dark"
    } as const;
    //#endregion Public Static Enums


    constructor(rootElementName: string) {
        super(rootElementName);
    }

    //#region Protected OffCanvas Ids
    protected get togglerName(): string { return `${this.name}_toggler`; }
    protected togglerId: string;
    protected offCanvasId: string;
    //#endregion Protected OffCanvas Ids
    //#region Public Methods
    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_OffCanvas> {
        const cls = this.$cls;
        const self = this,
            id = self.togglerElement?.id || self.$cls.createId(self.rootElementName),
            bodyName = `${self.rootElementName}_body`,
            headerName = `${self.rootElementName}_header`,
            titleName = `${self.rootElementName}_title`,
            togglerName = self.togglerName,
            closeButtonName = `${self.rootElementName}_close_button`,
            togglerId = self.togglerId || `${id}_toggler`,
            offCanvasId = self.offCanvasId || `${id}_offcanvas`,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_OffCanvas>("Mrbr_UI_Bootstrap_Controls_OffCanvas:initialise");

        super.initialise(args)
            .then(manifest => {
                self.$mrbr.loadManifest(Mrbr_UI_Bootstrap_Controls_OffCanvas[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(() => {
                        (self.togglerElement) ?
                            (self.assignElementConfig(self.togglerElement, self.OFFCANVAS_TOGGLER_CONFIG
                                .Id(togglerId)
                                .Data({ bsTarget: `#${offCanvasId}` })
                                .Aria({ controls: offCanvasId }))) :
                            (self.togglerElement = <HTMLButtonElement>self.createElement(new self.$ctrlCfg(togglerName, "button", self.OFFCANVAS_TOGGLER_CONFIG
                                .Id(togglerId)
                                .Data({ bsTarget: `#${offCanvasId}` })
                                .Aria({ controls: offCanvasId }))));
                        self.titleElement = <HTMLHeadingElement>self.createElement(new self.$ctrlCfg(titleName, "h5", self.OFFCANVAS_TITLE_CONFIG
                            .Id(titleName)));
                        self.buttonElement = <HTMLButtonElement>self.createElement(new self.$ctrlCfg(closeButtonName, "button", self.CLOSE_BUTTON_CONFIG));
                        self.bodyElement = <HTMLDivElement>self.createElement(new self.$ctrlCfg(bodyName, "div", self.OFFCANVAS_BODY_CONFIG));
                        self.headerElement = <HTMLDivElement>self.createElement(new self.$ctrlCfg(headerName, "div", self.OFFCANVAS_HEADER_CONFIG
                            .Children([self.titleElement, self.buttonElement])));
                        self.offCanvasElement = <HTMLDivElement>self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.OFFCANVAS_CONFIG
                            .Id(offCanvasId)
                            .Aria({ labelledBy: togglerId })
                            .Properties({ tabIndex: -1 })
                            .Children([self.headerElement, self.bodyElement])));

                        self.disabled = self._disabled;
                        self.headerVisible = self._headerVisble;
                        self.position = self._position;
                        self.title = self._title;
                        self.defaultContainerElementName = bodyName;
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }
    //#endregion Public Methods
    //#region Public Properties
    public get bodyElement(): HTMLDivElement { return this._bodyElement; }
    public set bodyElement(value: HTMLDivElement) { this._bodyElement = value; }
    public get buttonElement(): HTMLButtonElement { return this._buttonElement; }
    public set buttonElement(value: HTMLButtonElement) { this._buttonElement = value; }
    public get disabled(): boolean { return this._disabled; }
    public set disabled(value: boolean) {
        const self = this;
        [self.togglerElement, self.offCanvasElement].filter(element => !!element).forEach(element => element.classList.toggle("pe-none", value))
        self._disabled = value;
    }
    public get headerElement(): HTMLDivElement { return this._headerElement; }
    public set headerElement(value: HTMLDivElement) { this._headerElement = value; }
    public get headerVisible(): boolean { return this._headerVisble; }
    public set headerVisible(value: boolean) {
        const self = this;
        self.headerElement?.classList.toggle("visually-hidden", !value);
        self._headerVisble = value;
    }
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    public get offCanvasElement(): HTMLDivElement { return this._offCanvas; }
    public set offCanvasElement(value: HTMLDivElement) { this._offCanvas = value; }
    public get offCanvasTheme(): typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.themes[keyof typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.themes] { return this._offCanvasTheme; }
    public set offCanvasTheme(value: typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.themes[keyof typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.themes]) {
        const self = this,
            isDark = value === self.$cls.themes.dark;
        if (self.offCanvasElement) {
            self.offCanvasElement.classList.toggle("text-bg-dark", isDark);
            self.buttonElement.classList.toggle("btn-close-white", isDark);
        }
        self._offCanvasTheme = value;
    }
    public get position(): typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions[keyof typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions] { return this._position; }
    public set position(value: typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions[keyof typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions]) {
        const cls = Mrbr_UI_Bootstrap_Controls_OffCanvas,
            self = this,
            positions = cls.positions;
        if (self.offCanvasElement) {
            self.offCanvasElement.classList.toggle(self._position, false);
            self.offCanvasElement.classList.toggle(value, true);
        }
        this._position = value;
    }
    public get title(): string { return this._title; }
    public set title(value: string) {
        const self = this;
        self.titleElement && (self.titleElement.innerText = value)
        self._title = value;
    }

    public get titleElement(): HTMLHeadingElement { return this._titleElement; }
    public set titleElement(value: HTMLHeadingElement) { this._titleElement = value; }
    public get togglerElement(): HTMLElement { return this._togglerElement; }
    public set togglerElement(value: HTMLElement) { this._togglerElement = value; }

    active: boolean;
    //#endregion Public Properties

}