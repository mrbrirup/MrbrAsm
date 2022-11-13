import { Mrbr_UI_Html_StyleClasses } from "../html/StyleClasses";
import { Mrbr_UI_Controls_ClassActions } from "./classActions";
import { Mrbr_UI_Controls_ControlConfig } from "./ControlConfig";
import { Mrbr_System_Events_EventHandler } from "../../system/events/EventHandler";
import { Mrbr_UI_Controls_Themes } from "./themes";
import { Mrbr_UI_Controls_ThemeChangeEvent } from "./themeChangeEvent";
import { Mrbr_UI_Controls_IControl } from "./IControl";
import { Mrbr_System_Promise } from "../../system/Promise";
import { Mrbr_UI_Controls_ControlDefaultsCollection } from "./ControlDefaultsCollection";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";
import { Mrbr_System_Events_EventsMap } from "../../system/events/EventsMap";
import { Mrbr_UI_Controls_ElementsMap } from "./ElementsMap";
import { Mrbr_UI_Controls_ControlsMap } from "./ControlsMap";
import { Mrbr_UI_DOM_MutationObserver } from "../dom/mutationObserver";
import { Mrbr_System_IComponent } from "../../system/IComponent";
import { Mrbr_IO_ManifestPromise } from "../../io/ManifestPromise";
import { Mrbr_System_Component } from "../../system/Component";
import { Mrbr_UI_Controls_ElementsConfigMap } from "./ElementsConfigMap";
import { Mrbr_System_Events_EventSubscribers } from "../../system/events/EventSubscribers";
import { Mrbr_UI_Controls_MountPosition } from "./MountPosition";
import { Mrbr_System_Events_Event } from "../../system/events/Event";

export class Mrbr_UI_Controls_Control extends Mrbr_System_Component implements Mrbr_UI_Controls_IControl, Mrbr_System_IComponent {
    //#region Public Symbols

    /**
     * Symbol for deleting properties. Unique value cannot be mistaken for a value
     * @date 31/10/2022 - 12:48:08
     *
     * @public
     * @static
     * @type {symbol}
     */
    public static readonly DELETE: symbol = Symbol("delete");

    /**
     * 
     * @date 31/10/2022 - 12:49:21
     * Symbol for deleting entries. Unique value cannot be mistaken for a value
     * @public
     * @static
     * @type {symbol}
     */
    public static readonly DELETE_ENTRY: symbol = Symbol("delete_entry");
    //#endregion Public Symbols
    //#region Public Static Constants

    /**
     * Mounted Event Name
     * @date 13/11/2022 - 12:06:25
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MOUNTED_EVENT_NAME: string = "mounted_event";
    /**
     * Static Mutation Event Name
     * @date 31/10/2022 - 12:49:48
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly MUTATION_EVENT_NAME: string = "mutation_event";

    //#region Private Aliases

    /**
     * Alias for ClassActions enumeration
     * @date 31/10/2022 - 12:51:09
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Controls_ClassActions}
     */
    public get $clsActions(): typeof Mrbr_UI_Controls_ClassActions { return Mrbr_UI_Controls_ClassActions; }

    /**
     * Alias for ThemeChangeEvent
     * @date 31/10/2022 - 12:51:32
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Controls_ThemeChangeEvent}
     */
    public get $themeChange(): typeof Mrbr_UI_Controls_ThemeChangeEvent { return Mrbr_UI_Controls_ThemeChangeEvent; }

    /**
     * Alias for ControlDefaultCollection class type
     * @date 31/10/2022 - 12:52:15
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Controls_ControlDefaultsCollection}
     */
    public get $ctrlCol(): typeof Mrbr_UI_Controls_ControlDefaultsCollection { return Mrbr_UI_Controls_ControlDefaultsCollection; }

    /**
     * Alias for the Theme enumeration
     * @date 31/10/2022 - 12:52:46
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Controls_Themes}
     */
    public get $ctrlTheme(): typeof Mrbr_UI_Controls_Themes { return Mrbr_UI_Controls_Themes; }

    /**
     * Alias for the StyleClasses class type
     * @date 31/10/2022 - 12:53:00
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Html_StyleClasses}
     */
    public get $styleCls(): typeof Mrbr_UI_Html_StyleClasses { return Mrbr_UI_Html_StyleClasses }

    /**
     * Alias for the ControlsConfig class type
     * @date 31/10/2022 - 12:53:12
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Controls_ControlConfig}
     */
    public get $ctrlCfg(): typeof Mrbr_UI_Controls_ControlConfig { return Mrbr_UI_Controls_ControlConfig; }

    /**
     * Alias for ControlsConfigOptionalParameters class type
     * @date 31/10/2022 - 12:53:35
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public get $ctrlPrm(): typeof Mrbr_UI_Controls_ControlConfigOptionalParameters { return Mrbr_UI_Controls_ControlConfigOptionalParameters; }

    /**
     * Alias for Control class type
     * @date 31/10/2022 - 12:53:58
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Controls_Control}
     */
    public get $ctrl(): typeof Mrbr_UI_Controls_Control { return Mrbr_UI_Controls_Control; }



    /**
     * Alias for the EventHandler class type
     * @date 10/11/2022 - 15:42:09
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_System_Events_EventHandler}
     */
    public get $evtHandler(): typeof Mrbr_System_Events_EventHandler { return Mrbr_System_Events_EventHandler; }


    public get $event(): typeof Mrbr_System_Events_Event { return Mrbr_System_Events_Event; }


    //#endregion Public Aliases
    //#region Private Static Fields

    /**
     * CSS Media Query to check for dark mode
     * @date 31/10/2022 - 12:56:32
     *
     * @private
     * @static
     * @type {string}
     */
    private static themeMediaMatch = "(prefers-color-scheme: dark)";

    /**
     * Window Event Name for theme change
     * @date 31/10/2022 - 12:56:56
     *
     * @private
     * @static
     * @type {string}
     */
    private static windowThemeChangeEventName: string = "change";


    /**
     * Current Window Theme
     * @date 31/10/2022 - 12:58:19
     *
     * @private
     * @static
     * @readonly
     * @type {Mrbr_UI_Controls_Themes}
     */
    private static get _theme(): Mrbr_UI_Controls_Themes { return window.matchMedia(Mrbr_UI_Controls_Control.themeMediaMatch).matches ? Mrbr_UI_Controls_Themes.dark : Mrbr_UI_Controls_Themes.light; }

    /**
     * Event Listener for theme change
     * @date 31/10/2022 - 12:59:06
     *
     * @private
     * @static
     * @type {EventTarget}
     */
    private static _controlEvents: EventTarget = new EventTarget();
    //#endregion Private Static Fields
    //#region Public Static Methods

    /**
     * Create a new unique ID
     * @date 31/10/2022 - 12:59:47
     *
     * @public
     * @static
     * @param {string} prefix Use to prefix with related value, e.g. HTMLElement.elementName
     * @returns {string}
     */
    public static createId(prefix: string) { return `${prefix}_` + (new Date()).toISOString().replace(/[:z.-]/gmi, "").split("T").map(part => parseInt(part).toString(36)).concat((Math.floor(Math.random() * 10000)).toString(36)).join("_"); }
    //#endregion Static Methods
    //TODO: Remove After refactoring
    protected _defaultConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;
    //TODO: Remove After refactoring
    protected _customConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;

    //#region Private Static Fields

    /**
     * Event Listener for theme change
     * @date 31/10/2022 - 14:00:29
     *
     * @private
     * @static
     * @type {*}
     */
    private static _themeChangeHandle = window.matchMedia(Mrbr_UI_Controls_Control.themeMediaMatch)
        .addEventListener(
            Mrbr_UI_Controls_Control.windowThemeChangeEventName,
            (event) => Mrbr_UI_Controls_Control._controlEvents.dispatchEvent(new Mrbr_UI_Controls_ThemeChangeEvent({ detail: { theme: Mrbr_UI_Controls_Control._theme } }))
        );
    //#endregion Private Static Fields
    //#region Public Static Properties

    /**
     * Mutation Observer for DOM
     * @date 31/10/2022 - 14:01:58
     *
     * @public
     * @static
     * @type {Mrbr_UI_DOM_MutationObserver}
     */
    public static get mutationObserver(): Mrbr_UI_DOM_MutationObserver { return Mrbr_UI_Controls_Control._mutationObserver; }

    /**
     * Mutation Observer for DOM
     */
    public static set mutationObserver(value: Mrbr_UI_DOM_MutationObserver) { Mrbr_UI_Controls_Control._mutationObserver = value; }
    //#region Public Static Properties
    //#region Private Properties Fields



    /**
     * Handle for the Mutation Observer onAddNodes from Mount event;
     * @date 13/11/2022 - 12:10:57
     *
     * @private
     * @type {number}
     */
    private addNodesHandle: number = null;

    /**
     * Root Element Name for the control. Single Element to add to the DOM
     * @date 31/10/2022 - 14:02:22
     *
     * @private
     * @type {string}
     */
    private _rootElementName: string;

    /**
     * Default Container Element Name for the control. Usually the element to add Child Elements to
     * @date 31/10/2022 - 14:03:06
     *
     * @private
     * @type {string}
     */
    private _defaultContainerElementName: string;

    /**
     * Map of Element created by the control
     * @date 31/10/2022 - 14:03:57
     *
     * @private
     * @type {Mrbr_UI_Controls_ElementsMap}
     */
    private _elements: Mrbr_UI_Controls_ElementsMap;

    /**
     * Map of Controls added to the Control
     * @date 31/10/2022 - 14:04:20
     *
     * @private
     * @type {Mrbr_UI_Controls_ControlsMap}
     */
    private _controls: Mrbr_UI_Controls_ControlsMap;

    /**
     * Map of Event Listeners added to the Control
     * @date 31/10/2022 - 14:04:39
     *
     * @private
     * @type {Mrbr_System_Events_EventsMap}
     */
    private _events: Mrbr_System_Events_EventsMap;

    /**
     * Flag to indicate if the control's theme is being updated. Debouncer avoids multiple calls
     * @date 31/10/2022 - 14:04:49
     *
     * @private
     * @type {boolean}
     */
    private _updateTheme: boolean = false;

    /**
     * Set of themed elements
     * @date 31/10/2022 - 14:05:42
     *
     * @private
     * @type {Set<HTMLElement>}
     */
    private _themedElements: Set<HTMLElement> = new Set<HTMLElement>();

    /**
     * Cotrol's Id property field
     * @date 31/10/2022 - 14:06:01
     *
     * @private
     * @type {string}
     */
    private _id: string;

    /**
     * Control's Element Configurations Field
     * @date 09/11/2022 - 10:42:31
     *
     * @private
     * @type {Mrbr_UI_Controls_ElementsConfigMap}
     */
    private _elementConfig: Mrbr_UI_Controls_ElementsConfigMap;

    /**
     * EventSubscribers Field
     * @date 10/11/2022 - 14:37:49
     *
     * @private
     * @type {Mrbr_System_Events_EventSubscribers}
     */
    private _eventSubscribers: Mrbr_System_Events_EventSubscribers;

    /**
     * Mutation Observer for DOM
     * @date 31/10/2022 - 14:06:17
     *
     * @private
     * @static
     * @type {Mrbr_UI_DOM_MutationObserver}
     */
    private static _mutationObserver: Mrbr_UI_DOM_MutationObserver = null;
    //#endregion Private Properties Fields

    //TODO: Remove After Carousel is refactored to use new MutationObserver events 
    private static _mutations: EventTarget = new EventTarget();
    public static get mutations(): EventTarget { return Mrbr_UI_Controls_Control._mutations; }
    public static set mutations(value: EventTarget) { Mrbr_UI_Controls_Control._mutations = value; }

    //#region Dummy Methods to be removed after refactor
    //Events changed from EventTarget to onXXXX methods
    public addEventListener(...args) { throw new Error("Not implemented"); }
    public removeEventListener(...args) { throw new Error("Not implemented"); }
    public dispatchEvent(...args) { throw new Error("Not implemented"); }
    setDefaultConfig(...args: any[]): Mrbr_System_Promise<any> {
        this.elementConfig = new Mrbr_UI_Controls_ElementsConfigMap(this.$ctrl[this.$mrbrBase.MRBR_COMPONENT_NAME]);
        return this.$promise.createResolved("");
    }
    //#endregion Dummy Methods to be removed after refactor


    /**
     * Creates an instance of Mrbr_UI_Controls_Control.
     * @date 31/10/2022 - 14:06:57
     *
     * @constructor
     * @param {string} rootElementName Name of root element for control. Each control should have a single root element
     */
    constructor(rootElementName: string) {
        super();
        this.rootElementName = rootElementName;
    }

    //#region Public Properties


    /**
     * Mutation Observer for DOM
     */
    public get mutationObserver(): Mrbr_UI_DOM_MutationObserver { return Mrbr_UI_Controls_Control._mutationObserver; }


    /**
     * Controls Elements Configuration Property
     * @date 09/11/2022 - 10:43:07
     *
     * @public
     * @type {Mrbr_UI_Controls_ElementsConfigMap}
     */
    public get elementConfig(): Mrbr_UI_Controls_ElementsConfigMap { return this._elementConfig; }

    /**
     * Controls Elements Configuration Property
     */
    public set elementConfig(value: Mrbr_UI_Controls_ElementsConfigMap) { this._elementConfig = value; }


    /**
     * Control's Id Property
     * @date 31/10/2022 - 14:07:23
     *
     * @public
     * @type {string}
     */
    public get id(): string { return this._id || this.rootElement?.id || this.rootElement?.dataset?.mrbrId; }

    /**
     * Control's Id Property
     */
    public set id(value: string) { this._id = value; }

    //#endregion Public Properties

    //#region Public Properties


    /**
     * Event Subscribers Property
     * @date 10/11/2022 - 14:37:24
     *
     * @public
     * @type {Mrbr_System_Events_EventSubscribers}
     */
    public get eventSubscribers(): Mrbr_System_Events_EventSubscribers { return this._eventSubscribers; }

    /**
     * Event Subscribers Property
     */
    public set eventSubscribers(value: Mrbr_System_Events_EventSubscribers) { this._eventSubscribers = value; }



    /**
     * Themed Elements Collection. Used to swap between light and dark themes
     * @date 31/10/2022 - 14:08:39
     *
     * @public
     * @type {Set<HTMLElement>}
     */
    public get themedElements(): Set<HTMLElement> { return this._themedElements; }

    /**
     * Themed Elements Collection. Used to swap between light and dark themes
     */
    public set themedElements(value: Set<HTMLElement>) { this._themedElements = value; }

    /**
     * Event Listener for Control's Events
     * @date 31/10/2022 - 14:10:17
     *
     * @public
     * @type {EventTarget}
     */
    public get controlEvents(): EventTarget { return Mrbr_UI_Controls_Control._controlEvents; }

    /**
     * Event Listener for Control's Events
     */
    public set controlEvents(value: EventTarget) { Mrbr_UI_Controls_Control._controlEvents = value; }

    /**
     * Default container for adding child elements
     * @date 31/10/2022 - 14:10:48
     *
     * @public
     * @type {HTMLElement}
     */
    public get defaultContainerElement(): HTMLElement { return this.elements.get(this._defaultContainerElementName) }

    /**
     * Default container for adding child elements
     */
    public set defaultContainerElement(value: HTMLElement) { this.elements.set(this._defaultContainerElementName, value); }

    /**
     * Default container element name for adding child controls
     * @date 31/10/2022 - 14:11:19
     *
     * @public
     * @type {string}
     */
    public get defaultContainerElementName(): string { return this._defaultContainerElementName; }

    /**
     * Default container element name for adding child controls
     */
    public set defaultContainerElementName(value: string) { this._defaultContainerElementName = value; }

    /**
     * Default configuration for the control's element
     * @date 31/10/2022 - 14:11:42
     *
     * @public
     * @type {Mrbr_UI_Controls_ControlDefaultsCollection}
     */
    public get defaultConfig(): Mrbr_UI_Controls_ControlDefaultsCollection { return this._defaultConfiguration; }

    /**
     * Default configuration for the control's element
     */
    public set defaultConfig(value: Mrbr_UI_Controls_ControlDefaultsCollection) { this._defaultConfiguration = value; }

    /**
     * Custom configuration for control's elements for this instance
     * @date 31/10/2022 - 14:12:09
     *
     * @public
     * @type {Mrbr_UI_Controls_ControlDefaultsCollection}
     */
    public get customConfiguration(): Mrbr_UI_Controls_ControlDefaultsCollection { return this._customConfiguration; }

    /**
     * Custom configuration for control's elements for this instance
     */
    public set customConfiguration(value: Mrbr_UI_Controls_ControlDefaultsCollection) { this._customConfiguration = value; }

    /**
     * Control's child elements collection
     * @date 31/10/2022 - 14:12:57
     *
     * @readonly
     * @type {Mrbr_UI_Controls_ElementsMap}
     */
    get elements(): Mrbr_UI_Controls_ElementsMap {
        (!this._elements) && (this._elements = new Mrbr_UI_Controls_ElementsMap());
        return this._elements
    }

    /**
     * Control's child controls collection
     * @date 31/10/2022 - 14:13:06
     *
     * @readonly
     * @type {Mrbr_UI_Controls_ControlsMap}
     */
    get controls(): Mrbr_UI_Controls_ControlsMap {
        (!this._controls) && (this._controls = new Mrbr_UI_Controls_ControlsMap());
        return this._controls
    }

    /**
     * Controls event handler collection
     * @date 31/10/2022 - 14:13:28
     *
     * @readonly
     * @type {Mrbr_System_Events_EventsMap}
     */
    get events(): Mrbr_System_Events_EventsMap {
        (!this._events) && (this._events = new Mrbr_System_Events_EventsMap())
        return this._events
    }


    /**
     * Control's root element name. Only one root element per control
     * @date 31/10/2022 - 14:14:08
     *
     * @type {string}
     */
    get rootElementName(): string { return this._rootElementName; }

    /**
     * Control's root element name. Only one root element per control
     */
    set rootElementName(value: string) { this._rootElementName = value; }

    /**
     * Control's root element. Only one root element per control
     * @date 31/10/2022 - 14:14:42
     *
     * @type {HTMLElement}
     */
    get rootElement(): HTMLElement { const self = this; return self.elements.get(self._rootElementName); }

    /**
     * Control's root element. Only one root element per control
     */
    set rootElement(value: HTMLElement) { const self = this; self.elements.set(self._rootElementName, value); }
    //#endregion Public Properties

    //#region Public Methods

    /**
     * Initialise the control, loads manifest, creates elements and sets properties
     * @date 31/10/2022 - 14:15:17
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<any>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<any> {
        const
            self = this,
            initialisePromise = this.$promise.create<Mrbr_UI_Controls_Control>(`${self.$ctrl[self.$mrbrBase.MRBR_COMPONENT_NAME]}:initialise`);
        try {
            self.loadManifest(self.$ctrl).then(async manifest => {
                if (!self.$ctrl.mutationObserver) {
                    self.$ctrl.mutationObserver = new Mrbr_UI_DOM_MutationObserver(document.body, { attributes: false, childList: true, subtree: true });
                };
                this._eventSubscribers = new Mrbr_System_Events_EventSubscribers();
                this._events = new Mrbr_System_Events_EventsMap();
                await Promise.all([
                    self.$ctrl.mutationObserver.initialise(),
                    self._eventSubscribers.initialise(),
                    self._events.initialise()
                ]);
                this._defaultConfiguration = new this.$ctrlCol();
                this._customConfiguration = new this.$ctrlCol();
                this.events.add(this.$themeChange.themeChangeEvent, new self.$evtHandler(
                    this.$themeChange.themeChangeEvent,
                    this.controlEvents,
                    this.themeChanged,
                    this
                ));
                initialisePromise.resolve(this);
            })
        } catch (error) {
            initialisePromise.reject(error);
        }
        return initialisePromise;
    }
    /**
     * Cached Component Manifest
     * @date 02/11/2022 - 05:52:28
     *
     * @private
     * @static
     * @type {Mrbr_IO_ManifestPromise}
     */
    private static componentManifest: Mrbr_IO_ManifestPromise = null;



    /**
     * Create an Element for the control, assign properties and attributes
     * @date 31/10/2022 - 14:15:52
     *
     * @public
     * @param {(Mrbr_UI_Controls_ControlConfig | HTMLElement | Array<Mrbr_UI_Controls_ControlConfig | Mrbr_UI_Controls_ControlConfig>)} controlConfig
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public createElement(controlConfig: Mrbr_UI_Controls_ControlConfig | HTMLElement | Array<Mrbr_UI_Controls_ControlConfig | Mrbr_UI_Controls_ControlConfig>): HTMLElement | Array<HTMLElement> {
        if (Array.isArray(controlConfig) === true) {
            return (<Array<Mrbr_UI_Controls_ControlConfig>>controlConfig).map(entry => <HTMLElement>this.createElement(entry));
        }
        if (controlConfig instanceof HTMLElement) { return controlConfig; }
        let _config: Mrbr_UI_Controls_ControlConfig = <Mrbr_UI_Controls_ControlConfig>controlConfig,
            _element: HTMLElement = <HTMLElement>document.createElement(_config.elementType);
        _config?.optionalParameters && this.assignElementConfig(_element, _config.optionalParameters);
        this.elements.add(_config.elementName, _element);
        if (!_config.optionalParameters.children) { return _element; }
        _config.optionalParameters.children
            .map(entry => <HTMLElement>this.createElement(entry))
            .forEach(child => _element.appendChild(child));
        return _element;
    }


    /**
     * Assign properties and attributes top an element
     * @date 31/10/2022 - 14:16:48
     *
     * @public
     * @param {HTMLElement} element
     * @param {Mrbr_UI_Controls_ControlConfigOptionalParameters} config
     */
    public assignElementConfig(element: HTMLElement, config: Mrbr_UI_Controls_ControlConfigOptionalParameters): void {
        element.id = config.id || this.$ctrl.createId(element.nodeName?.toLocaleLowerCase() || "element");
        this.classes(element, this.$clsActions.Add, config.classes)
        this.elementAttributes(element, config.attributes)
        this.elementDataset(element, config.data)
        this.elementProperties(element, config.properties)
        this.elementStyles(element, config.styles)
        this.elementAria(element, config.aria)
        this.elementTemplate(element, config.template);
        config.lightTheme && this.elementDataset(element, { lightTheme: config.lightTheme });
        config.darkTheme && this.elementDataset(element, { darkTheme: config.darkTheme });
        (config.lightTheme || config.darkTheme) && this.themedElements.add(element)
        this.changeElementTheme(element, this.$ctrl._theme);
    }

    /**
     * Get configuration for an element custom or default fall back configuration
     * @date 31/10/2022 - 14:17:18
     *
     * @public
     * @param {string} key
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public configuration(key: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        let configEntry = this.customConfiguration.index[key] || this.defaultConfig.index[key];
        if (!configEntry) { throw new Error(`Configuration ${key} not found`); }
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), configEntry);
    }

    /**
     * Does a configuration setting exist for the element
     * @date 31/10/2022 - 14:17:49
     *
     * @public
     * @param {string} key
     * @returns {boolean}
     */
    public hasConfiguration(key: string): boolean { return this.customConfiguration.index[key] || this.defaultConfig.index[key] ? true : false; }

    /**
     * Sets controls Id and returns control for chaining
     * @date 31/10/2022 - 14:18:12
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Controls_Control}
     */
    public Id(value: string): Mrbr_UI_Controls_Control { this.id = value; return this; }
    /**
     * Assigns classes to a control or control array
     * @date 31/10/2022 - 14:18:41
     *
     * @public
     * @param {(string | HTMLElement | Array<string> | Array<HTMLElement>)} targetElement
     * @param {Mrbr_UI_Controls_ClassActions} action Add, Remove, Toggle styles
     * @param {(Array<string> | string)} value Class or classes for the action
     * @param {?Object} [styleType] Class names to remove from the element
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public classes(targetElement: string | HTMLElement | Array<string> | Array<HTMLElement>, action: Mrbr_UI_Controls_ClassActions, value: Array<string> | string, styleType?: Object): HTMLElement | Array<HTMLElement> {
        //TODO: Review use of styleType
        const self = this;
        if (Array.isArray(targetElement)) {
            const returnElements = [];
            targetElement.forEach(entry => returnElements.push(self.classes(entry, action, value, styleType)))
            return returnElements;
        }
        const valueAsArray = (Array.isArray(value) ? value : [value]);
        let _targetElement = (typeof targetElement === "string") ? self.elements.get(targetElement) : targetElement;

        switch (action) {
            case self.$clsActions.Add:
                valueAsArray.forEach(valueEntry => self.$styleCls.addClasses(_targetElement, valueEntry))
                break;
            case self.$clsActions.Clear:
                Object.keys(styleType).forEach(key => self.$styleCls.removeClass(_targetElement, key))
                break;
            case self.$clsActions.Remove:
                valueAsArray.forEach(valueEntry => self.$styleCls.removeClass(_targetElement, valueEntry))
                break;
            case self.$clsActions.Toggle:
                valueAsArray.forEach(valueEntry => self.$styleCls.toggleClass(_targetElement, valueEntry))
                break;
            case self.$clsActions.Swap:
                if (valueAsArray.length !== 2) { throw new Error("Two values must be provided") }
                let addClass, removeClass;
                if (self.$styleCls.hasClass(_targetElement, valueAsArray[0]) === true) {
                    addClass = valueAsArray[1]
                    removeClass = valueAsArray[0];
                }
                else if (self.$styleCls.hasClass(_targetElement, valueAsArray[1])) {
                    addClass = valueAsArray[0];
                    removeClass = valueAsArray[1];
                }
                self.$styleCls.addClasses(_targetElement, addClass)
                self.$styleCls.removeClass(_targetElement, removeClass)
                break;
            case self.$clsActions.ReplaceAllWith:
                Object.keys(styleType).forEach(key => self.$styleCls.removeClass(_targetElement, key))
                valueAsArray.forEach(valueEntry => self.$styleCls.addClasses(_targetElement, valueEntry))
            default:
                break;
        }
        return _targetElement;
    }

    /**
     * Append children to element
     * @date 31/10/2022 - 14:24:34
     *
     * @public
     * @param {(string | HTMLElement)} targetElement
     * @param {(Array<string> | string | HTMLElement | Array<HTMLElement>)} value
     * @returns {HTMLElement}
     */
    public elementChildren(targetElement: string | HTMLElement, value: Array<string> | string | HTMLElement | Array<HTMLElement>): HTMLElement {
        let _targetElement = (typeof targetElement === "string") ? this.elements.get(targetElement) : targetElement;
        (Array.isArray(value) ? value : [value]).forEach(entry => {
            _targetElement.appendChild((typeof entry === "string") ?
                _targetElement.appendChild(this.elements.get(entry)) :
                _targetElement.appendChild(entry))
        });
        return _targetElement;
    }

    /**
     * Assign Attributes to an element
     * @date 31/10/2022 - 14:25:05
     *
     * @public
     * @param {(string | HTMLElement)} targetElement
     * @param {object} attributesSettings
     * @returns {HTMLElement}
     */
    public elementAttributes(targetElement: string | HTMLElement, attributesSettings: object): HTMLElement {
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? this.elements.get(targetElement) : targetElement;
        if (!attributesSettings) { return _targetElement; }
        Object.keys(attributesSettings).forEach(key => {
            if (attributesSettings[key] === this.$ctrl.DELETE) { if (_targetElement.hasAttribute(key)) { _targetElement.removeAttribute(key) } }
            else { _targetElement.setAttribute(key, attributesSettings[key]); }
        })
        return _targetElement
    }

    /**
     * Assign Theme to an element
     * @date 31/10/2022 - 14:25:23
     *
     * @public
     * @param {(string | HTMLElement)} targetElement
     * @param {Array<string>} lightThemes
     * @param {Array<string>} darkThemes
     * @returns {HTMLElement}
     */
    public elementThemes(targetElement: string | HTMLElement, lightThemes: Array<string>, darkThemes: Array<string>): HTMLElement {
        const datasetSettings: object = {
            lightTheme: lightThemes.join(" "),
            darkTheme: darkThemes.join(" ")
        }
        let element = this.elementDataset(targetElement, datasetSettings);
        (this.themedElements.has(element) === false) && (this.themedElements.add(element));
        return element;
    }
    public elementDataset(targetElement: string | HTMLElement, datasetSettings: object): HTMLElement {
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? this.elements.get(targetElement) : targetElement;
        if (!datasetSettings) { return _targetElement; }
        Object.keys(datasetSettings).forEach(key => {
            if (datasetSettings[key] === this.$ctrl.DELETE) { delete _targetElement.dataset[key] }
            else { _targetElement.dataset[key] = datasetSettings[key]; }
        });
        return _targetElement
    }

    /**
     * Assign Aria values to an element
     * @date 31/10/2022 - 14:25:42
     *
     * @public
     * @param {(string | HTMLElement | Array<string> | Array<HTMLElement>)} targetElement
     * @param {object} ariaSettings
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public elementAria(targetElement: string | HTMLElement | Array<string> | Array<HTMLElement>, ariaSettings: object): HTMLElement | Array<HTMLElement> {
        const self = this;
        if (Array.isArray(targetElement)) {
            const returnElements = [];
            targetElement.forEach(entry => returnElements.push(self.elementAria(entry, ariaSettings)))
            return returnElements;
        }
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements.get(targetElement) : targetElement;
        if (!ariaSettings) { return _targetElement; }
        Object.keys(ariaSettings)
            .forEach(key => {
                let _key = key.split("-");
                const ariaKey = `aria-${_key[_key.length - 1]}`;
                if (ariaSettings[key] === self.$ctrl.DELETE) { if (_targetElement.hasAttribute(ariaKey)) { _targetElement.removeAttribute(ariaKey) } }
                else { _targetElement.setAttribute(ariaKey, ariaSettings[key]); }
            });

        return _targetElement
    }

    /**
     * Set Element innerHTML to template
     * @date 31/10/2022 - 14:25:59
     *
     * @public
     * @param {HTMLElement} _element
     * @param {string} template
     * @returns {HTMLElement}
     */
    public elementTemplate(_element: HTMLElement, template: string): HTMLElement {
        (template) && (_element.innerHTML = template)
        return _element;
    }

    /**
     * Set Properties on an element
     * @date 31/10/2022 - 14:26:26
     *
     * @public
     * @param {(string | HTMLElement)} targetElement
     * @param {object} propertyValues
     * @returns {HTMLElement}
     */
    public elementProperties(targetElement: string | HTMLElement, propertyValues: object): HTMLElement {
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? this.elements.get(targetElement) : targetElement;
        (propertyValues) && (Object.keys(propertyValues).forEach(key => _targetElement[key] = propertyValues[key]))
        return _targetElement
    }

    /**
     * Set Styles on an element
     * @date 31/10/2022 - 14:26:49
     *
     * @public
     * @param {(string | HTMLElement)} targetElement
     * @param {object} styleValues
     * @returns {HTMLElement}
     */
    public elementStyles(targetElement: string | HTMLElement, styleValues: object): HTMLElement {
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? this.elements.get(targetElement) : targetElement;
        (styleValues) && (Object.keys(styleValues).forEach(key => _targetElement.style[key] = styleValues[key]))
        return _targetElement
    }

    /**
     * Dispose of a control, its elements, events, controls
     * @date 31/10/2022 - 14:27:04
     *
     * @public
     */
    public dispose() {
        this.events.forEach((event, key) => event?.remove())
        this.events.clear();
        this.elements.forEach((element, key) => element.remove());
        this.elements.clear();
        this.controls.forEach(control => control.dispose());
        this.controls.clear();
    }

    /**
     * Mount rootElement to DOM Element
     * @date 31/10/2022 - 14:27:34
     *
     * @public
     * @param {HTMLElement} element
     * @param {("replace" | "prepend" | "before" | "after" | "append")} [position="append"]
     * @param {...*} args
     * @returns {Mrbr_UI_Controls_IControl}
     */
    public mount(element: HTMLElement | Mrbr_UI_Controls_Control, position: Mrbr_UI_Controls_MountPosition = Mrbr_UI_Controls_MountPosition.append, ...args: any): Mrbr_UI_Controls_IControl {
        (element instanceof Mrbr_UI_Controls_Control) && (element = element.defaultContainerElement || element.rootElement);
        const id = this.id;
        this.addMountHandler(id);
        switch (position) {
            case "append": element.appendChild(this.rootElement); break;
            case "before": element.before(this.rootElement); break;
            case "after": element.after(this.rootElement); break;
            case "prepend": element.prepend(this.rootElement); break;
            case "replace": element.replaceWith(this.rootElement); break;
        }
        return this;

    }



    /**
     * Add a subscriber to the Mount Event
     * @date 13/11/2022 - 12:19:42
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<HTMLElement>) => void} callback
     * @returns {void) => any}
     */
    public onMounted(callback: (event: Mrbr_System_Events_Event<HTMLElement>) => void) {
        return this.eventSubscribers.add(this.$ctrl.MOUNTED_EVENT_NAME, callback);
    }
    //#endregion Public Methods
    //region Private Methods


    /**
     * Add a mount handler to the control
     * @date 13/11/2022 - 12:19:28
     *
     * @private
     * @param {string} id
     */
    private addMountHandler(id: string) {
        if (!this.addNodesHandle) {
            const mountEventName = this.$ctrl.MOUNTED_EVENT_NAME
            this.addNodesHandle = this.mutationObserver.onAddNodes((event: Mrbr_System_Events_Event<NodeList>) => {

                let mounted;
                for (let nodeCounter = 0; nodeCounter < event.data.length; nodeCounter++) {
                    console.log("Mounted");
                    const node = event.data[nodeCounter];
                    if (node instanceof HTMLElement) {
                        if (node.id === id) {
                            mounted = node;
                            break;
                        }
                    }
                }
                //= event.data.find((node: Node) => { return node instanceof HTMLElement && node.id === id; });
                (mounted) && (this.eventSubscribers.raise(mountEventName, new Mrbr_System_Events_Event<HTMLElement>(mountEventName, this, this.rootElement)));
                this.mutationObserver.removeSubscriber(mountEventName, this.addNodesHandle);
                this.addNodesHandle = null;
            });
        };
    }
    /**
     * Change theme on ThemedElements from window themeChange event
     * @date 31/10/2022 - 14:28:18
     *
     * @private
     * @param {Mrbr_UI_Controls_ThemeChangeEvent} event
     */
    private themeChanged(event: Mrbr_UI_Controls_ThemeChangeEvent): void {
        const self = this;
        if (self._updateTheme) { return }
        self._updateTheme = true;
        requestAnimationFrame(() => {
            self.changeTheme(event.detail.theme);
            self._updateTheme = false;
        });
    }

    /**
     * Change theme on ThemedElement
     * @date 31/10/2022 - 14:29:08
     *
     * @private
     * @param {HTMLElement} element
     * @param {Mrbr_UI_Controls_Themes} theme
     */
    private changeElementTheme(element: HTMLElement, theme: Mrbr_UI_Controls_Themes) {
        const currentTheme = theme;
        let toRemove = currentTheme === this.$ctrlTheme.dark ? element.dataset["lightTheme"] : element.dataset["darkTheme"],
            toAdd = currentTheme === this.$ctrlTheme.dark ? element.dataset["darkTheme"] : element.dataset["lightTheme"];
        (toRemove && toRemove.length > 0) && (this.classes(element, this.$clsActions.Remove, toRemove));
        (toAdd && toAdd.length > 0) && (this.classes(element, this.$clsActions.Add, toAdd));
    }

    /**
     * Change theme on ThemedElements
     * @date 31/10/2022 - 14:29:24
     *
     * @private
     * @param {Mrbr_UI_Controls_Themes} theme
     */
    private changeTheme(theme: Mrbr_UI_Controls_Themes) {
        const self = this;
        self.themedElements.forEach(themedElement => self.changeElementTheme(themedElement, theme));
    }
    //#region Private Methods
}

