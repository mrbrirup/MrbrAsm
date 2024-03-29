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
import { Mrbr_UI_HTML_ElementTags } from "../html/ElementTags";
import { Mrbr_UI_Controls_IRootElement } from "./IRootElement";


/**
 * Base Class for all UI Controls
 * @date 07/01/2023 - 09:21:35
 *
 * @export
 * @class Mrbr_UI_Controls_Control
 * @typedef {Mrbr_UI_Controls_Control}
 * @extends {Mrbr_System_Component}
 * @implements {Mrbr_UI_Controls_IControl}
 * @implements {Mrbr_UI_Controls_IRootElement}
 * @implements {Mrbr_System_IComponent}
 */
export class Mrbr_UI_Controls_Control extends Mrbr_System_Component implements Mrbr_UI_Controls_IControl, Mrbr_UI_Controls_IRootElement, Mrbr_System_IComponent {
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
     * Default Root Element Name. Used when no element name is provided in the constructor
     * @date 02/12/2022 - 00:47:51
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly ROOT_ELEMENT_NAME: string = "root_element";

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


    /**
     * Alias for the Event class type
     * @date 03/12/2022 - 08:39:36
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_System_Events_Event}
     */
    public get $event(): typeof Mrbr_System_Events_Event { return Mrbr_System_Events_Event; }

    /**
     * Html Tag Element Alias
     * @date 02/12/2022 - 01:19:43
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_HTML_ElementTags}
     */
    protected get $htmlt(): typeof Mrbr_UI_HTML_ElementTags { return Mrbr_UI_HTML_ElementTags; }


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
    public static createId(prefix: string) {
        const
            ctrl = Mrbr_UI_Controls_Control,
            datePart = (new Date()).toISOString().replace(/[:z.-]/gmi, ""),
            fnRandom = () => (Math.floor(Math.random() * 10000)).toString(36);
        ctrl._staticIds.forEach((value, key) => { if (key === datePart) { ctrl._staticIds.delete(key); } });
        if (!ctrl._staticIds.has(datePart)) { ctrl._staticIds.set(datePart, new Array<string>()); }
        const ids = ctrl._staticIds.get(datePart);
        let random = fnRandom();
        while (ids.includes(random)) { random = fnRandom(); }
        ids.push(random);
        return `${prefix}_` + datePart.split("T").map(part => parseInt(part).toString(36)).concat(random).join("_");
    }


    private static _staticIds = new Map<string, string[]>();

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
     * Control's name
     * @date 12/01/2023 - 16:30:59
     *
     * @private
     * @type {string}
     */
    private _name: string;

    /**
     * Mutation Observer for DOM
     * @date 31/10/2022 - 14:06:17
     *
     * @private
     * @static
     * @type {Mrbr_UI_DOM_MutationObserver}
     */
    private static _mutationObserver: Mrbr_UI_DOM_MutationObserver;
    //#endregion Private Properties Fields

    /**
     * Overrideable method to set the default configuration for the control
     * @date 29/12/2022 - 15:54:38
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<any>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<any> { return this.$promise.createResolved("Mrbr.UI.Controls.Control:setDefaultConfig()"); }

    /**
     * Creates an instance of Mrbr_UI_Controls_Control.
     * @date 31/10/2022 - 14:06:57
     *
     * @constructor
     */
    constructor() {
        super();
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
    public get elementConfig(): Mrbr_UI_Controls_ElementsConfigMap { return this._elementConfig ??= new Mrbr_UI_Controls_ElementsConfigMap(this.$ctrl[this.$mrbr.COMPONENT_NAME]); }


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
    public get defaultContainerElementName(): string { return this._defaultContainerElementName ?? this.rootElementName; }

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
        return this._elements ??= new Mrbr_UI_Controls_ElementsMap();
        //return this._elements
    }

    /**
     * Control's child controls collection
     * @date 31/10/2022 - 14:13:06
     *
     * @readonly
     * @type {Mrbr_UI_Controls_ControlsMap}
     */
    get controls(): Mrbr_UI_Controls_ControlsMap {
        this._controls ??= new Mrbr_UI_Controls_ControlsMap();
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
        this._events ??= new Mrbr_System_Events_EventsMap();
        return this._events
    }


    /**
     * Control's root element name. Only one root element per control
     * @date 31/10/2022 - 14:14:08
     *
     * @type {string}
     */
    get rootElementName(): string { return this._rootElementName ?? this.$ctrl.ROOT_ELEMENT_NAME; }

    /**
     * Control's root element name. Only one root element per control
     */
    set rootElementName(value: string) {
        if (this._rootElementName) { throw new Error("Root element name can only be set once"); }
        this._rootElementName = value;
    }

    /**
     * Control's root element. Only one root element per control
     * @date 31/10/2022 - 14:14:42
     *
     * @type {HTMLElement}
     */
    get rootElement(): HTMLElement { const self = this; return self.elements.get(self.rootElementName); }

    /**
     * Control's root element. Only one root element per control
     */
    set rootElement(value: HTMLElement) { const self = this; self.elements.set(self.rootElementName, value); }





    /**
     * Control's name
     * @date 12/01/2023 - 16:31:07
     *
     * @public
     * @type {string}
     */
    public set name(value: string) { this._name = value; }


    /**
     * Control's name
     */
    public get name(): string { return this._name; }



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
            initialisePromise = this.$promise.create<Mrbr_UI_Controls_Control>(`${self.$ctrl[self.$mrbr.COMPONENT_NAME]}:initialise`);
        try {
            self
                .loadManifest(self.$ctrl)
                .then(async manifest => {
                    self.$ctrl.mutationObserver ??= new Mrbr_UI_DOM_MutationObserver(document.body, { attributes: false, childList: true, subtree: true });
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
        this.classes(element, this.$clsActions.add, config.classes)
        this.attributes(element, config.attributes)
        this.dataset(element, config.data)
        this.properties(element, config.properties)
        this.styles(element, config.styles)
        this.aria(element, config.aria)
        this.template(element, config.template);
        config.lightTheme && this.dataset(element, { lightTheme: config.lightTheme });
        config.darkTheme && this.dataset(element, { darkTheme: config.darkTheme });
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
     * Get Target elemeent from types of input
     * @date 07/01/2023 - 09:11:38
     *
     * @private
     * @param {*} targetElement
     * @returns {HTMLElement}
     */
    private getTargetElement(targetElement: any): HTMLElement {
        switch (true) {
            case (targetElement instanceof HTMLElement): return <HTMLElement>targetElement;
            case (typeof targetElement === "string"): return <HTMLElement>this.elements.get(<string>targetElement);
            case (!!(<Mrbr_UI_Controls_IRootElement>targetElement)?.rootElement): return <HTMLElement>((<Mrbr_UI_Controls_IRootElement>targetElement)?.rootElement);
            default: throw new Error("Invalid target element");
        }
    }


    /**
     * Assigns classes to this control root element, return null if no root element
     * @date 07/01/2023 - 09:09:03
     *
     * @public
     * @param {Mrbr_UI_Controls_ClassActions} action
     * @param {(Array<string> | string)} value
     * @param {?Object} [styleType]
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public rootClasses(action: Mrbr_UI_Controls_ClassActions, value: Array<string> | string, styleType?: Object): HTMLElement | Array<HTMLElement> {
        return (!this.rootElement) ? null : this.classes(this.rootElement, action, value, styleType);
    }

    
    /**
     * Assign Aria Attributes to the root element, return null if no root element
     * @date 15/01/2023 - 11:04:28
     *
     * @public
     * @param {object} ariaSettings
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public rootAria(ariaSettings: object): HTMLElement | Array<HTMLElement> {
        return (!this.rootElement) ? null : this.aria(this.rootElement, ariaSettings);
    }
    
    /**
     * Assign Attributes to the root element, return null if no root element
     * @date 15/01/2023 - 11:04:47
     *
     * @public
     * @param {object} attributes
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public rootAttributes(attributes: object): HTMLElement | Array<HTMLElement> {
        return (!this.rootElement) ? null : this.attributes(this.rootElement, attributes);
    }
    
    /**
     * Assign Data Attributes to the root element, return null if no root element
     * @date 15/01/2023 - 11:04:57
     *
     * @public
     * @param {object} data
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public rootDataset(data: object): HTMLElement | Array<HTMLElement> {
        return (!this.rootElement) ? null : this.dataset(this.rootElement, data);
    }
    
    /**
     * Assign Properties to the root element, return null if no root element
     * @date 15/01/2023 - 11:05:04
     *
     * @public
     * @param {object} properties
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public rootProperties(properties: object): HTMLElement | Array<HTMLElement> {
        return (!this.rootElement) ? null : this.properties(this.rootElement, properties);
    }
    
    /**
     * Assign Styles to the root element, return null if no root element
     * @date 15/01/2023 - 11:05:48
     *
     * @public
     * @param {object} styles
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public rootStyles(styles: object): HTMLElement | Array<HTMLElement> {
        return (!this.rootElement) ? null : this.styles(this.rootElement, styles);
    }
    
    /**
     * Assigns a template to the root element, return null if no root element
     * @date 15/01/2023 - 11:05:56
     *
     * @public
     * @param {string} template
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */
    public rootTemplate(template: string): HTMLElement | Array<HTMLElement> {
        return (!this.rootElement) ? null : this.template(this.rootElement, template);
    }


    /**
     * Assigns classes to a control or control array
     * @date 31/10/2022 - 14:18:41
     *
     * @public
     * @param {(string | HTMLElement | Array<string> | Array<HTMLElement> | Mrbr_UI_Controls_IRootElement)} targetElement
     * @param {Mrbr_UI_Controls_ClassActions} action Add, Remove, Toggle styles
     * @param {(Array<string> | string)} value Class or classes for the action
     * @param {?Object} [styleType] Class names to remove from the element
     * @returns {(HTMLElement | Array<HTMLElement>)}
     */

    public classes(targetElement: string | HTMLElement | Array<string> | Array<HTMLElement> | Mrbr_UI_Controls_IRootElement, action: Mrbr_UI_Controls_ClassActions, value: Array<string> | string | DOMTokenList, styleType?: Object): HTMLElement | Array<HTMLElement> {
        //TODO: Review use of styleType
        const self = this;
        if (Array.isArray(targetElement)) {
            const returnElements = [];
            targetElement.forEach(entry => returnElements.push(self.classes(entry, action, value, styleType)))
            return returnElements;
        }
        if (value instanceof DOMTokenList) { value = [...value]; }
        const valueAsArray = ([value].flat() as Array<string>).filter(entry => entry !== ""),
            styleCls = self.$styleCls,
            removeIndex = 0,
            addIndex = 1,
            act = self.$clsActions;
        let _targetElement: HTMLElement = this.getTargetElement(targetElement);

        switch (action) {
            case act.add:
                valueAsArray.forEach(valueEntry => styleCls.addClasses(_targetElement, valueEntry))
                break;
            case act.clear:
                Object.keys(styleType).forEach(key => styleCls.removeClass(_targetElement, key))
                break;
            case act.remove:
                valueAsArray.forEach(valueEntry => styleCls.removeClass(_targetElement, valueEntry))
                break;
            case act.toggle:
                valueAsArray.forEach(valueEntry => styleCls.toggleClass(_targetElement, valueEntry))
                break;
            case act.swap:
                if (valueAsArray.length !== 2) { throw new Error("Two values must be provided") }
                let addClass, removeClass;
                if (styleCls.hasClass(_targetElement, valueAsArray[0]) === true) {
                    addClass = valueAsArray[1]
                    removeClass = valueAsArray[0];
                }
                else if (styleCls.hasClass(_targetElement, valueAsArray[1])) {
                    addClass = valueAsArray[0];
                    removeClass = valueAsArray[1];
                }
                styleCls.addClasses(_targetElement, addClass)
                styleCls.removeClass(_targetElement, removeClass)
                break;
            case act.replace:
                if (valueAsArray.length !== 2) { throw new Error("Two values must be provided") }
                const
                    classToRemove = valueAsArray[removeIndex],
                    classToAdd = valueAsArray[addIndex];
                styleCls.removeClass(_targetElement, valueAsArray[removeIndex])
                styleCls.addClasses(_targetElement, valueAsArray[addIndex])
                break;
            case act.replaceAllWith:
                Object.keys(styleType).forEach(key => styleCls.removeClass(_targetElement, key))
                valueAsArray.forEach(valueEntry => styleCls.addClasses(_targetElement, valueEntry))
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
    public children(targetElement: string | HTMLElement, value: Array<string> | string | HTMLElement | Array<HTMLElement>): HTMLElement {
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
    public attributes(targetElement: string | HTMLElement, attributesSettings: object): HTMLElement {
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
    public themes(targetElement: string | HTMLElement, lightThemes: Array<string>, darkThemes: Array<string>): HTMLElement {
        const datasetSettings: object = {
            lightTheme: lightThemes.join(" "),
            darkTheme: darkThemes.join(" ")
        }
        let element = this.dataset(targetElement, datasetSettings);
        (this.themedElements.has(element) === false) && (this.themedElements.add(element));
        return element;
    }
    public dataset(targetElement: string | HTMLElement, datasetSettings: object): HTMLElement {
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
    public aria(targetElement: string | HTMLElement | Array<string> | Array<HTMLElement>, ariaSettings: object): HTMLElement | Array<HTMLElement> {
        const self = this;
        if (Array.isArray(targetElement)) {
            const returnElements = [];
            targetElement.forEach(entry => returnElements.push(self.aria(entry, ariaSettings)))
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
    public template(_element: HTMLElement, template: string): HTMLElement {
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
    public properties(targetElement: string | HTMLElement, propertyValues: object): HTMLElement {
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
    public styles(targetElement: string | HTMLElement, styleValues: object): HTMLElement {
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
     * @param {HTMLElement} _hostElement
     * @param {("replace" | "prepend" | "before" | "after" | "append")} [position="append"]
     * @param {...*} args
     * @returns {Mrbr_UI_Controls_IControl}
     */
    public mount(hostElement: HTMLElement | Mrbr_UI_Controls_Control | Mrbr_UI_Controls_IRootElement | string, position: Mrbr_UI_Controls_MountPosition = Mrbr_UI_Controls_MountPosition.append, mountingElement: HTMLElement | Mrbr_UI_Controls_Control = null, ...args: any): Mrbr_UI_Controls_IControl {
        let _hostElement: HTMLElement;
        if (hostElement instanceof HTMLElement) { _hostElement = hostElement; }
        if (typeof hostElement === "string") { _hostElement = document.getElementById(hostElement); }
        else if (hostElement instanceof Mrbr_UI_Controls_Control) { _hostElement = hostElement.defaultContainerElement || hostElement.rootElement; }
        else if ((<Mrbr_UI_Controls_IRootElement>hostElement).rootElement) { _hostElement = (<Mrbr_UI_Controls_IRootElement>hostElement).rootElement; }
        if (!_hostElement) { throw new Error("Element not found"); }
        const id = this.rootElement.id;
        this.addMountHandler(id);
        let _mountingElement: HTMLElement,
            positions = Mrbr_UI_Controls_MountPosition;
        if (mountingElement) { _mountingElement = (mountingElement instanceof Mrbr_UI_Controls_Control) ? mountingElement.rootElement : mountingElement; }
        else { _mountingElement = this.rootElement; }
        switch (position) {
            case positions.append: _hostElement.appendChild(_mountingElement); break;
            case positions.before: _hostElement.before(_mountingElement); break;
            case positions.after: _hostElement.after(_mountingElement); break;
            case positions.prepend: _hostElement.prepend(_mountingElement); break;
            case positions.replace: _hostElement.replaceWith(_mountingElement); break;
        }
        return this;

    }
    /**
     * Wrap an element with another element
     * @date 30/12/2022 - 14:21:22
     *
     * @public
     * @param {(HTMLElement | Mrbr_UI_Controls_Control | string)} elementToWrap
     * @param {(HTMLElement | Mrbr_UI_Controls_Control | string)} wrappingElement
     * @returns {Mrbr_UI_Controls_IControl}
     */
    public wrapElement(elementToWrap: HTMLElement | Mrbr_UI_Controls_Control | string, wrappingElement: HTMLElement | Mrbr_UI_Controls_Control | string): Mrbr_UI_Controls_IControl {
        if (typeof elementToWrap === "string") { elementToWrap = document.getElementById(elementToWrap); }
        else if (elementToWrap instanceof Mrbr_UI_Controls_Control) { elementToWrap = elementToWrap.defaultContainerElement || elementToWrap.rootElement; }
        if (!elementToWrap) { throw new Error("Wrapping Target Element not found"); }

        if (typeof wrappingElement === "string") { wrappingElement = document.getElementById(wrappingElement); }
        else if (wrappingElement instanceof Mrbr_UI_Controls_Control) { wrappingElement = wrappingElement.defaultContainerElement || wrappingElement.rootElement; }
        if (!wrappingElement) { throw new Error("Wrapping Wrapper Element not found"); }

        if (elementToWrap.parentElement === wrappingElement) { return this; } // Already wrapped 
        (elementToWrap.isConnected ? elementToWrap.parentElement.insertBefore(wrappingElement, elementToWrap) : wrappingElement).appendChild(elementToWrap);
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
    public onMounted(callback: number | ((event: Mrbr_System_Events_Event<HTMLElement>) => void)) {
        const eventName = this.$ctrl.MOUNTED_EVENT_NAME;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.eventSubscribers.add(eventName, callback);
    }
    //#endregion Public Methods
    //region Private Methods


    /**
     * Run Deferred Mount Handlers
     * @date 16/11/2022 - 14:11:46
     *
     * @private
     */
    protected runDeferedMountFunctions() {
        const self = this;
        let fn;
        while (!!(fn = self.deferredOnMountFunctions.shift())) { fn(); }
    }

    /**
     * Handle Issues with MutationObserver failing to observe. Runs in parallel for mounting
     * @date 16/11/2022 - 14:12:31
     *
     * @private
     * @param {string} id
     */
    private onMountedShim(id: string) {
        if (this._mounted) {
            this._onMountedShimHandler && cancelAnimationFrame(this._onMountedShimHandler);
            this._onMountedShimHandler = null;
            return;
        }
        if (!(document.getElementById(id)?.isConnected)) {
            this._onMountedShimHandler = requestAnimationFrame(() => this.onMountedShim(id));
            return;
        }
        this._mounted = true;
        this.mounted();
    }

    /**
     * RequestAnimationFrame handle for onMountedShim
     * @date 16/11/2022 - 14:13:23
     *
     * @private
     * @type {number}
     */
    private _onMountedShimHandler: number;

    /**
     * Is Element mounted. Required as MutationObserver and onMountedShim are not always reliable 
     * @date 16/11/2022 - 14:13:49
     *
     * @private
     * @type {boolean}
     */
    private _mounted: boolean = false;

    /**
     * Runs onMounted Functions when element is mounted called from MutationObserver or onMountedShim
     * @date 16/11/2022 - 14:14:22
     *
     * @private
     */
    private mounted() {
        const mountEventName = this.$ctrl.MOUNTED_EVENT_NAME;
        (this.eventSubscribers.raise(mountEventName, new Mrbr_System_Events_Event<HTMLElement>(mountEventName, this, this.rootElement)));
        this.mutationObserver.removeSubscriber(mountEventName, this.addNodesHandle);
        this.addNodesHandle = null;
        this.runDeferedMountFunctions();
    }
    /**
     * Add a mount handler to the control
     * @date 13/11/2022 - 12:19:28
     *
     * @private
     * @param {string} id
     */
    private addMountHandler(id: string) {
        this.onMountedShim(id);
        if (!this.addNodesHandle) {
            const mountEventName = this.$ctrl.MOUNTED_EVENT_NAME
            const self = this;
            this.addNodesHandle = this.mutationObserver.onAddNodes((event: Mrbr_System_Events_Event<NodeList>) => {
                if (self._mounted) { return; }
                let mounted
                for (let nodeCounter = 0; nodeCounter < event.data.length; nodeCounter++) {
                    const node = event.data[nodeCounter];
                    if (!(node instanceof HTMLElement) || node.id !== id) { continue; }
                    mounted = node;
                    break;
                }
                (mounted) && (self.mounted());
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
     * Array of EventHandler functions added before mounting to be called after mounting
     * @date 16/11/2022 - 12:16:02
     *
     * @private
     * @type {{}}
     */
    protected deferredOnMountFunctions = []
    /**
     * Add a deferred function to the deferredOnMountFunctions array. Is called when root element is mounted or immediately if already mounted
     * @date 14/11/2022 - 15:36:45
     *
     * @protected
     * @param {string} targetEventName
     * @param {((event: Mrbr_System_Events_Event<Mrbr_System_Component>) => void | number)} callback
     * @param {Function} fn
     * @returns {number}
     */
    protected addDeferredOnMountFn(
        subscriberEventName: string,
        targetEventName: string,
        targetElements: Array<HTMLElement> | HTMLElement,
        handlerFunction: Function,
        context: unknown,
        callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        const
            self = this,
            deferredFns = self.deferredOnMountFunctions;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(subscriberEventName, callback);
            return null;
        }
        deferredFns.push((() => {
            [targetElements].flat().forEach((targetElement) => {
                self.events.add(subscriberEventName, new self.$evtHandler(
                    targetEventName,
                    targetElement,
                    handlerFunction,
                    context));
                if (callback) { return self.eventSubscribers.add(subscriberEventName, callback); }
                return null;
            });
        }));
        if (self.rootElement?.isConnected) {
            let fn;
            while ((fn = deferredFns.shift()) !== undefined) { fn(); }
        }
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
        (toRemove && toRemove.length > 0) && (this.classes(element, this.$clsActions.remove, toRemove));
        (toAdd && toAdd.length > 0) && (this.classes(element, this.$clsActions.add, toAdd));
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


    public RootElementName(value: string): this {
        this.rootElementName = value;
        return this;
    }


}

