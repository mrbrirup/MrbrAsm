import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";
import { Mrbr_UI_Bootstrap_Controls_Navbar } from "./Navbar";

export class Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas implements Mrbr_UI_Bootstrap_Controls_INavbarControls {
    private static _navbar_offcanvas_toggler_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _navbar_offcanvas_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _navbar_offcanvas_header_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _navbar_offcanvas_body_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _navbar_offcanvas_title_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _navbar_close_button_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private _bodyElement: HTMLDivElement;
    private _buttonElement: HTMLButtonElement;
    private _disabled: boolean = false;
    private _headerElement: HTMLDivElement;
    private _headerVisble: boolean = true;
    private _name: string;
    private _offCanvas: HTMLDivElement;
    private _position: typeof Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas.positions[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas.positions] = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas.positions.end;
    private _titleElement: HTMLHeadingElement;
    private _title: string = "Menu";
    private _togglerElement: HTMLButtonElement;

    public get NAVBAR_OFFCANVAS_TOGGLER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas;
        (!cls._navbar_offcanvas_toggler_config) && (cls._navbar_offcanvas_toggler_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("navbar-toggler")
            .Attributes({ "type": "button" })
            .Properties({ type: "button" })
            .Data({ bsToggle: "offcanvas" })
            .Template(`<span class="navbar-toggler-icon"></span>`))

        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_offcanvas_toggler_config);
    }

    public get NAVBAR_OFFCANVAS_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas;
        (!cls._navbar_offcanvas_config) && (cls._navbar_offcanvas_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_offcanvas_config);
    }
    public get NAVBAR_OFFCANVAS_HEADER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas;
        (!cls._navbar_offcanvas_header_config) && (cls._navbar_offcanvas_header_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas-header"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_offcanvas_header_config);
    }

    public get NAVBAR_CLOSE_BUTTON_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas;
        (!cls._navbar_close_button_config) && (cls._navbar_close_button_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("btn-close")
            .Attributes({ "type": "button" })
            .Aria({ label: "Close" })
            .Data({ bsDismiss: "offcanvas" }))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_close_button_config);
    }
    public get NAVBAR_OFFCANVAS_BODY_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas;
        (!cls._navbar_offcanvas_body_config) && (cls._navbar_offcanvas_body_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas-body"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_offcanvas_body_config);
    }
    public get NAVBAR_OFFCANVAS_TITLE_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas;
        (!cls._navbar_offcanvas_title_config) && (cls._navbar_offcanvas_title_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas-title"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_offcanvas_title_config);
    }

    public static positions = {
        start: "offcanvas-start",
        end: "offcanvas-end",
        top: "offcanvas-top",
        bottom: "offcanvas-bottom",
    } as const;
    constructor(name: string) { this.name = name; }
    build(hostNavbar: Mrbr_UI_Bootstrap_Controls_Navbar, hostElement?: HTMLElement): Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas {
        const
            self = this,
            id = hostNavbar.$cls.createId(self.name),
            bodyName = `${self.name}_body`,
            collapseName = `${self.name}_collapse`,
            headerName = `${self.name}_header`,
            titleName = `${self.name}_title`,
            togglerName = `${self.name}_toggler`,
            closeButtonName = `${self.name}_close_button`,
            togglerId = `${id}_toggler`,
            offCanvasId = `${id}_offcanvas`;
        self.togglerElement = <HTMLButtonElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(togglerName, "button", self.NAVBAR_OFFCANVAS_TOGGLER_CONFIG
            .Id(togglerId)
            .Data({ bsTarget: `#${offCanvasId}` })
            .Aria({ controls: offCanvasId })));
        self.titleElement = <HTMLHeadingElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(titleName, "h5", self.NAVBAR_OFFCANVAS_TITLE_CONFIG
            .Id(titleName)));
        self.buttonElement = <HTMLButtonElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(closeButtonName, "button", self.NAVBAR_CLOSE_BUTTON_CONFIG));
        self.bodyElement = <HTMLDivElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(bodyName, "div", self.NAVBAR_OFFCANVAS_BODY_CONFIG));
        self.headerElement = <HTMLDivElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(headerName, "div", self.NAVBAR_OFFCANVAS_HEADER_CONFIG
            .Children([self.titleElement, self.buttonElement])));
        self.offCanvasElement = <HTMLDivElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(collapseName, "div", self.NAVBAR_OFFCANVAS_CONFIG
            .Id(offCanvasId)
            .Aria({ labelledBy: togglerId })
            .Properties({ tabIndex: -1 })
            .Children([self.headerElement, self.bodyElement])));

        self.disabled = self._disabled;
        self.headerVisible = self._headerVisble;
        self.position = self._position;
        self.title = self._title;

        hostNavbar.defaultContainerElement.appendChild(self.togglerElement);
        hostNavbar.defaultContainerElement.appendChild(self.offCanvasElement);
        hostNavbar.defaultContainerElementName = bodyName;
        hostNavbar.navbarControls.set(self.name, self);

        return this;
    }
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
    public get position(): typeof Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas.positions[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas.positions] { return this._position; }
    public set position(value: typeof Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas.positions[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas.positions]) {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas,
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
    public get togglerElement(): HTMLButtonElement { return this._togglerElement; }
    public set togglerElement(value: HTMLButtonElement) { this._togglerElement = value; }

    active: boolean;



}