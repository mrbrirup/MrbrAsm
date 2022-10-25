import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";

export class Mrbr_UI_Bootstrap_Controls_OffCanvas extends Mrbr_UI_Controls_Control {
    private static _offcanvas_toggler_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_header_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_body_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _offcanvas_title_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _close_button_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private _bodyElement: HTMLDivElement;
    private _buttonElement: HTMLButtonElement;
    private _disabled: boolean = false;
    private _headerElement: HTMLDivElement;
    private _headerVisble: boolean = true;
    private _name: string;
    private _offCanvas: HTMLDivElement;
    private _position: typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions[keyof typeof Mrbr_UI_Bootstrap_Controls_OffCanvas.positions] = Mrbr_UI_Bootstrap_Controls_OffCanvas.positions.end;
    private _titleElement: HTMLHeadingElement;
    private _title: string = "Menu";
    private _togglerElement: HTMLElement;

    public get OFFCANVAS_TOGGLER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_OffCanvas;
        (!cls._offcanvas_toggler_config) && (cls._offcanvas_toggler_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("navbar-toggler")
            .Attributes({ "type": "button" })
            .Properties({ type: "button" })
            .Data({ bsToggle: "offcanvas" })
            .Styles({ width: "2rem", height: "2rem", scale: "2" })
            .Template(`<i class="bi bi-list"></i>`))

        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._offcanvas_toggler_config);
    }

    public get OFFCANVAS_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_OffCanvas;
        (!cls._offcanvas_config) && (cls._offcanvas_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._offcanvas_config);
    }
    public get OFFCANVAS_HEADER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_OffCanvas;
        (!cls._offcanvas_header_config) && (cls._offcanvas_header_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas-header"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._offcanvas_header_config);
    }

    public get CLOSE_BUTTON_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_OffCanvas;
        (!cls._close_button_config) && (cls._close_button_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("btn-close")
            .Attributes({ "type": "button" })
            .Aria({ label: "Close" })
            .Data({ bsDismiss: "offcanvas" }))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._close_button_config);
    }
    public get OFFCANVAS_BODY_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_OffCanvas;
        (!cls._offcanvas_body_config) && (cls._offcanvas_body_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas-body"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._offcanvas_body_config);
    }
    public get OFFCANVAS_TITLE_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_OffCanvas;
        (!cls._offcanvas_title_config) && (cls._offcanvas_title_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("offcanvas-title"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._offcanvas_title_config);
    }

    public static positions = {
        start: "offcanvas-start",
        end: "offcanvas-end",
        top: "offcanvas-top",
        bottom: "offcanvas-bottom",
    } as const;
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    get $cls() { return Mrbr_UI_Bootstrap_Controls_OffCanvas; }



    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_OffCanvas> {
        const cls = this.$cls;
        const self = this,
            id = self.togglerElement?.id || self.$cls.createId(self.rootElementName),
            bodyName = `${self.rootElementName}_body`,
            headerName = `${self.rootElementName}_header`,
            titleName = `${self.rootElementName}_title`,
            togglerName = `${self.rootElementName}_toggler`,
            closeButtonName = `${self.rootElementName}_close_button`,
            togglerId = `${id}_toggler`,
            offCanvasId = `${id}_offcanvas`,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_OffCanvas>("Mrbr_UI_Bootstrap_Controls_OffCanvas:initialise");
        super.initialise(args)
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

        return initialisePromise;
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

}