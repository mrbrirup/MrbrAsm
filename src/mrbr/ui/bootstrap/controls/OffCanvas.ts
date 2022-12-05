import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_Interactions } from "../utilities/interactions";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_OffCanvasPositions } from "./OffCanvasPositions";
import { Mrbr_UI_Bootstrap_Controls_OffCanvasThemes } from "./OffCanvasThemes";





export class Mrbr_UI_Bootstrap_Controls_OffCanvas extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    //#region Public Static Constants

    /**
     * Internal OffCanvas name
     * @date 05/12/2022 - 05:09:13
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly OFFCANVAS: string = "offcanvas";

    /**
     * Internal OffCanvas toggler element name
     * @date 05/12/2022 - 05:09:27
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly OFFCANVAS_TOGGLER: string = "offcanvas_toggler";

    /**
     * Internal OffCanvas Header element name
     * @date 05/12/2022 - 05:10:00
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly OFFCANVAS_HEADER: string = "offcanvas_header";

    /**
     * Internal OffCanvas close button name
     * @date 05/12/2022 - 05:10:19
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly OFFCANVAS_CLOSE_BUTTON: string = "offcanvas_close_button";

    /**
     * Internal OffCanvas Body Element name
     * @date 05/12/2022 - 05:10:39
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly OFFCANVAS_BODY: string = "offcanvas_body";

    /**
     * Internal OffCanvas Title Element name
     * @date 05/12/2022 - 05:10:58
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly OFFCANVAS_TITLE: string = "offcanvas_title";
    //#endregion Public Properties

    //#region Type Aliases

    /**
     * OffCanvas Type Alias
     * @date 05/12/2022 - 05:11:49
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_OffCanvas}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_OffCanvas { return this.$bsc.OffCanvas as typeof Mrbr_UI_Bootstrap_Controls_OffCanvas; }

    /**
     * OffCanvas Positions enum Alias
     * @date 05/12/2022 - 05:12:09
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_OffCanvasPositions}
     */
    public get $ocp(): typeof Mrbr_UI_Bootstrap_Controls_OffCanvasPositions { return this.$bsc.OffCanvasPositions as typeof Mrbr_UI_Bootstrap_Controls_OffCanvasPositions; }

    /**
     * OffCanvas Themes enum Alias
     * @date 05/12/2022 - 05:12:31
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_OffCanvasThemes}
     */
    public get $oct(): typeof Mrbr_UI_Bootstrap_Controls_OffCanvasThemes { return this.$bsc.OffCanvasThemes as typeof Mrbr_UI_Bootstrap_Controls_OffCanvasThemes; }
    //#endregion Public Properties

    //#region Private Property Fields

    /**
     * OffCanvas Body Element field
     * @date 05/12/2022 - 05:12:56
     *
     * @private
     * @type {HTMLDivElement}
     */
    private _bodyElement: HTMLDivElement;

    /**
     * OffCanvas Button Element field
     * @date 05/12/2022 - 05:13:14
     *
     * @private
     * @type {HTMLButtonElement}
     */
    private _buttonElement: HTMLButtonElement;

    /**
     * Disabled state of the OffCanvas field
     * @date 05/12/2022 - 05:13:28
     *
     * @private
     * @type {boolean}
     */
    private _disabled: boolean = false;

    /**
     * OffCanvas Header element field
     * @date 05/12/2022 - 05:13:59
     *
     * @private
     * @type {HTMLDivElement}
     */
    private _headerElement: HTMLDivElement;

    /**
     * OffCanvas Header visble state field
     * @date 05/12/2022 - 05:14:17
     *
     * @private
     * @type {boolean}
     */
    private _headerVisible: boolean = true;

    /**
     * OffCanvas name field
     * @date 05/12/2022 - 05:14:38
     *
     * @private
     * @type {string}
     */
    private _name: string;

    /**
     * OffCanvas Root Element field
     * @date 05/12/2022 - 05:14:50
     *
     * @private
     * @type {HTMLDivElement}
     */
    private _offCanvas: HTMLDivElement;

    /**
     * OffCanvas Start position field
     * @date 05/12/2022 - 05:15:24
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_OffCanvasPositions}
     */
    private _position: Mrbr_UI_Bootstrap_Controls_OffCanvasPositions;

    /**
     * OffCanvas Title element field
     * @date 05/12/2022 - 05:15:37
     *
     * @private
     * @type {HTMLHeadingElement}
     */
    private _titleElement: HTMLHeadingElement;

    /**
     * OffCanvas Title field
     * @date 05/12/2022 - 05:15:45
     *
     * @private
     * @type {string}
     */
    private _title: string = "";

    /**
     * OffCanvas Toggler element field
     * @date 05/12/2022 - 05:15:58
     *
     * @private
     * @type {HTMLElement}
     */
    private _togglerElement: HTMLElement;

    /**
     * OffCanvas Theme field
     * @date 05/12/2022 - 05:16:13
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_OffCanvasThemes}
     */
    private _offCanvasTheme: Mrbr_UI_Bootstrap_Controls_OffCanvasThemes;
    //#endregion Private Property Fields



    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_OffCanvas.
     * @date 05/12/2022 - 05:16:24
     *
     * @constructor
     * @param {string} rootElementName
     */
    constructor(rootElementName: string) {
        super(rootElementName);
    }

    //#region Protected OffCanvas Ids

    /**
     * Gets the OffCanvas toggler name
     * @date 05/12/2022 - 05:16:34
     *
     * @protected
     * @readonly
     * @type {string}
     */
    protected get togglerName(): string { return `${this.name}_toggler`; }

    /**
     * OffCanvas toggler element id
     * @date 05/12/2022 - 05:16:46
     *
     * @protected
     * @type {string}
     */
    protected togglerId: string;

    /**
     * OffCanvas element Id
     * @date 05/12/2022 - 05:16:57
     *
     * @protected
     * @type {string}
     */
    protected offCanvasId: string;
    //#endregion Protected OffCanvas Ids

    //#region Public Properties

    /**
     * OffCanvas Body Element
     * @date 05/12/2022 - 05:19:20
     *
     * @public
     * @type {HTMLDivElement}
     */
    public get bodyElement(): HTMLDivElement { return this._bodyElement; }

    /**
     * OffCanvas Body Element
     */
    public set bodyElement(value: HTMLDivElement) { this._bodyElement = value; }

    /**
     * OffCanvas Close Button Element
     * @date 05/12/2022 - 05:19:35
     *
     * @public
     * @type {HTMLButtonElement}
     */
    public get buttonElement(): HTMLButtonElement { return this._buttonElement; }

    /**
     * OffCanvas Close Button Element
     */
    public set buttonElement(value: HTMLButtonElement) { this._buttonElement = value; }

    /**
     * OffCanvas Disabled state
     * @date 05/12/2022 - 05:19:53
     *
     * @public
     * @type {boolean}
     */
    public get disabled(): boolean { return this._disabled; }

    /**
     * OffCanvas Disabled state
     */
    public set disabled(value: boolean) {
        const noInteraction = Mrbr_UI_Bootstrap_Utilities_Interactions.pointerEventsNone;
        [this.togglerElement, this.offCanvasElement].filter(element => !!element).forEach(element => element.classList.toggle(noInteraction, value))
        this._disabled = value;
    }

    /**
     * OffCanvas Header Element
     * @date 05/12/2022 - 05:20:17
     *
     * @public
     * @type {HTMLDivElement}
     */
    public get headerElement(): HTMLDivElement { return this._headerElement; }

    /**
     * OffCanvas Header Element
     */
    public set headerElement(value: HTMLDivElement) { this._headerElement = value; }

    /**
     * OffCanvas Header Visible state
     * @date 05/12/2022 - 05:20:29
     *
     * @public
     * @type {boolean}
     */
    public get headerVisible(): boolean { return this._headerVisible; }

    /**
     * OffCanvas Header Visible state
     */
    public set headerVisible(value: boolean) {
        this.headerElement?.classList.toggle("visually-hidden", !value);
        this._headerVisible = value;
    }

    /**
     * OffCanvas Name
     * @date 05/12/2022 - 05:20:43
     *
     * @public
     * @type {string}
     */
    public get name(): string { return this._name; }

    /**
     * OffCanvas Name
     */
    public set name(value: string) { this._name = value; }

    /**
     * OffCanvas Root Element
     * @date 05/12/2022 - 05:20:55
     *
     * @public
     * @type {HTMLDivElement}
     */
    public get offCanvasElement(): HTMLDivElement { return this._offCanvas; }

    /**
     * OffCanvas Root Element
     */
    public set offCanvasElement(value: HTMLDivElement) { this._offCanvas = value; }

    /**
     * OffCanvas Theme
     * @date 05/12/2022 - 05:21:09
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_OffCanvasThemes}
     */
    public get offCanvasTheme(): Mrbr_UI_Bootstrap_Controls_OffCanvasThemes { return this._offCanvasTheme ??= this.$oct.light; }

    /**
     * OffCanvas Theme
     */
    public set offCanvasTheme(value: Mrbr_UI_Bootstrap_Controls_OffCanvasThemes) {
        const isDark = value === this.$oct.dark;
        if (this.offCanvasElement) {
            this.offCanvasElement.classList.toggle("text-bg-dark", isDark);
            this.buttonElement.classList.toggle("btn-close-white", isDark);
        }
        this._offCanvasTheme = value;
    }

    /**
     * OffCanvas Start Position
     * @date 05/12/2022 - 05:21:27
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_OffCanvasPositions}
     */
    public get position(): Mrbr_UI_Bootstrap_Controls_OffCanvasPositions { return this._position ??= this.$ocp.end; }

    /**
     * OffCanvas Start Position
     */
    public set position(value: Mrbr_UI_Bootstrap_Controls_OffCanvasPositions) {
        (this.offCanvasElement) && (this.classes(this.offCanvasElement, this.$clsActions.replace, [this.position, value]));
        this._position = value;
    }

    /**
     * OffCanvas Title Text
     * @date 05/12/2022 - 05:21:57
     *
     * @public
     * @type {string}
     */
    public get title(): string { return this._title; }

    /**
     * OffCanvas Title Text
     */
    public set title(value: string) {
        this.titleElement && (this.titleElement.innerText = value)
        this._title = value;
    }

    /**
     * OffCanvas Title Element
     * @date 05/12/2022 - 05:22:29
     *
     * @public
     * @type {HTMLHeadingElement}
     */
    public get titleElement(): HTMLHeadingElement { return this._titleElement; }

    /**
     * OffCanvas Title Element
     */
    public set titleElement(value: HTMLHeadingElement) { this._titleElement = value; }

    /**
     * OffCanvas Toggler Element
     * @date 05/12/2022 - 05:22:40
     *
     * @public
     * @type {HTMLElement}
     */
    public get togglerElement(): HTMLElement { return this._togglerElement; }

    /**
     * OffCanvas Toggler Element
     */
    public set togglerElement(value: HTMLElement) { this._togglerElement = value; }

    active: boolean;
    //#endregion Public Properties





    //#region Public Methods

    /**
     * Initialise OffCanvas control, load manifest and set properties
     * @date 05/12/2022 - 05:17:31
     *
     * @public
     * @template T
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<T>}
     */
    public initialise<T>(...args): Mrbr_System_Promise<T> {
        const self = this,
            cls = this.$cls,
            ctrlCfg = self.$ctrlCfg,
            html = self.$htmlt,
            getConfig = self.elementConfig.getConfig.bind(self.elementConfig),
            createElement = self.createElement.bind(self),
            id = self.togglerElement?.id || self.$cls.createId(self.rootElementName),
            bodyName = `${self.rootElementName}_body`,
            headerName = `${self.rootElementName}_header`,
            titleName = `${self.rootElementName}_title`,
            togglerName = self.togglerName,
            closeButtonName = `${self.rootElementName}_close_button`,
            togglerId = self.togglerId || `${id}_toggler`,
            offCanvasId = self.offCanvasId || `${id}_offcanvas`,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_OffCanvas>(`${controlName}:initialise"`);
        super.initialise(args)
            .then(async manifest => {
                await self.loadManifest(cls);
                await self.setDefaultConfig();
                (self.togglerElement) ?
                    (self.assignElementConfig(self.togglerElement, getConfig(cls.OFFCANVAS_TOGGLER)
                        .Id(togglerId)
                        .Data({ bsTarget: `#${offCanvasId}` })
                        .Aria({ controls: offCanvasId }))) :
                    (self.togglerElement = <HTMLButtonElement>createElement(new ctrlCfg(togglerName, html.button, getConfig(cls.OFFCANVAS_TOGGLER)
                        .Id(togglerId)
                        .Data({ bsTarget: `#${offCanvasId}` })
                        .Aria({ controls: offCanvasId }))));
                self.titleElement = <HTMLHeadingElement>createElement(new ctrlCfg(titleName, html.heading5, getConfig(cls.OFFCANVAS_TITLE)
                    .Id(titleName)));
                self.buttonElement = <HTMLButtonElement>createElement(new ctrlCfg(closeButtonName, html.button, getConfig(cls.OFFCANVAS_CLOSE_BUTTON)));
                self.bodyElement = <HTMLDivElement>createElement(new ctrlCfg(bodyName, html.div, getConfig(cls.OFFCANVAS_BODY)));
                self.headerElement = <HTMLDivElement>createElement(new ctrlCfg(headerName, html.div, getConfig(cls.OFFCANVAS_HEADER)
                    .Children([self.titleElement, self.buttonElement])));
                self.offCanvasElement = <HTMLDivElement>createElement(new ctrlCfg(self.rootElementName, html.div, getConfig(cls.OFFCANVAS)
                    .Id(offCanvasId)
                    .Aria({ labelledBy: togglerId })
                    .Properties({ tabIndex: -1 })
                    .Children([self.headerElement, self.bodyElement])));
                self.disabled = self.disabled;
                self.headerVisible = self.headerVisible;
                self.position = self.position;
                self.title = self.title;
                self.defaultContainerElementName = bodyName;
                initialisePromise.resolve(self);
            })

        return initialisePromise;
    }


    /**
     * Set default configuration
     * @date 05/12/2022 - 05:23:17
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_OffCanvas>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_OffCanvas> {
        const
            self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            cls = self.$cls,
            ctrlPrm = self.$ctrlPrm,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_OffCanvas>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(() => {
                const sine = self.elementConfig.setIfNotExist.bind(self.elementConfig);
                self.elementConfig.controlName(controlName);
                sine(cls.OFFCANVAS, new ctrlPrm()
                    .Classes("offcanvas"));
                sine(cls.OFFCANVAS_TOGGLER, new ctrlPrm()
                    .Classes("navbar-toggler")
                    .Attributes({ "type": "button" })
                    .Properties({ type: "button" })
                    .Data({ bsToggle: "offcanvas" })
                    .Template(`<i class="bi bi-list"></i>`));
                sine(cls.OFFCANVAS_HEADER, new ctrlPrm()
                    .Classes("offcanvas-header"));
                sine(cls.OFFCANVAS_TITLE, new ctrlPrm()
                    .Classes("offcanvas-title"));
                sine(cls.OFFCANVAS_BODY, new ctrlPrm()
                    .Classes("offcanvas-body"));
                sine(cls.OFFCANVAS_CLOSE_BUTTON, new ctrlPrm()
                    .Classes("btn-close")
                    .Attributes({ "type": "button" })
                    .Aria({ label: "Close" })
                    .Data({ bsDismiss: "offcanvas" }));
                setDefaultConfigPromise.resolve(self);
            }
            );
        return setDefaultConfigPromise;
    }
    //#endregion Public Methods
}