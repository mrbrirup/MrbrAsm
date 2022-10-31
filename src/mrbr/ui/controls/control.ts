import { Mrbr_UI_Html_StyleClasses } from "../html/StyleClasses";
import { Mrbr_UI_Controls_ClassActions } from "./classActions";
import { Mrbr_UI_Controls_ControlConfig } from "./ControlConfig";
import { Mrbr_System_Events_EventHandler } from "../../system/events/EventHandler";
import { Mrbr_UI_Controls_Themes } from "./themes";
import { Mrbr_UI_Controls_ThemeChangeEvent } from "./themeChangeEvent";
import { Mrbr_UI_Controls_IControl } from "./IControl";
import { Mrbr_System_MrbrPromise } from "../../system/MrbrPromise";
import { Mrbr_UI_Controls_ControlDefaultsCollection } from "./ControlDefaultsCollection";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";
import { MrbrBase } from "../../system/MrbrBase";
import { Mrbr_System_Events_EventsMap } from "../../system/events/EventsMap";
import { Mrbr_UI_Controls_ElementsMap } from "./ElementsMap";
import { Mrbr_UI_Controls_ControlsMap } from "./ControlsMap";
import { Mrbr_System_Object } from "../../system/Object";
import { Mrbr_UI_DOM_MutationObserver } from "../dom/mutationObserver";
import { Mrbr_System_IComponent } from "../../system/IComponent";

export class Mrbr_UI_Controls_Control extends Mrbr_System_Object implements Mrbr_UI_Controls_IControl {
    public static CONTROL_KEYS: symbol = Symbol("control_keys");
    public static DELETE: symbol = Symbol("delete");
    public static MUTATION_EVENT_NAME: string = "mutation_event";
    private _rootElementName: string;
    private _defaultContainerElementName: string;
    private _elements: Mrbr_UI_Controls_ElementsMap;
    private _controls: Mrbr_UI_Controls_ControlsMap;
    protected _defaultConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;
    protected _customConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;
    private _events: Mrbr_System_Events_EventsMap;
    private _updateTheme: boolean = false;
    get $cls(): typeof Mrbr_UI_Controls_Control { return Mrbr_UI_Controls_Control; }
    public get $clsActions() { return Mrbr_UI_Controls_ClassActions; }
    public get $themeChange() { return Mrbr_UI_Controls_ThemeChangeEvent; }
    public get $ctrlCol() { return Mrbr_UI_Controls_ControlDefaultsCollection; }
    public get $ctrlTheme() { return Mrbr_UI_Controls_Themes; }
    public get $styleCls() { return Mrbr_UI_Html_StyleClasses }
    public get $ctrlCfg() { return Mrbr_UI_Controls_ControlConfig; }
    public get $ctrlPrm() { return Mrbr_UI_Controls_ControlConfigOptionalParameters; }
    public get $ctrl() { return Mrbr_UI_Controls_Control; }
    private static themeMediaMatch = "(prefers-color-scheme: dark)";
    private static windowThemeChangeEventName: string = "change";
    private static get _theme() { return window.matchMedia(Mrbr_UI_Controls_Control.themeMediaMatch).matches ? Mrbr_UI_Controls_Themes.dark : Mrbr_UI_Controls_Themes.light; }
    private static _controlEvents = new EventTarget();
    private _themedElements: Set<HTMLElement> = new Set<HTMLElement>();
    public static DELETE_ENTRY: symbol = Symbol("delete_entry");
    //private static _mutationObserver: MutationObserver = null;
    private static _mutations: EventTarget = new EventTarget();
    public static get mutations(): EventTarget { return Mrbr_UI_Controls_Control._mutations; }
    public static set mutations(value: EventTarget) { Mrbr_UI_Controls_Control._mutations = value; }
    // public static MutationEvent = class extends CustomEvent<MutationRecord[]> {
    //     constructor(mutationRecords: MutationRecord[]) {
    //         super(Mrbr_UI_Controls_Control.MUTATION_EVENT_NAME, { detail: mutationRecords });
    //     }
    // }
    public addEventListener(...args) {
        throw new Error("Not implemented");
    }
    public removeEventListener(...args) {
        throw new Error("Not implemented");
    }
    public dispatchEvent(...args) {
        throw new Error("Not implemented");
    }


    private static _themeChangeHandle = window.matchMedia(Mrbr_UI_Controls_Control.themeMediaMatch)
        .addEventListener(
            Mrbr_UI_Controls_Control.windowThemeChangeEventName,
            (event) => Mrbr_UI_Controls_Control._controlEvents.dispatchEvent(new Mrbr_UI_Controls_ThemeChangeEvent({ detail: { theme: Mrbr_UI_Controls_Control._theme } }))
        );
    constructor(rootElementName: string) {
        super();
        this.rootElementName = rootElementName;
        // if (this.$cls._mutationObserver === null) {
        //     this.$cls._mutationObserver = new MutationObserver((mutations) => { this.$cls.mutations.dispatchEvent(new this.$cls.MutationEvent(mutations)); });
        //     this.$cls._mutationObserver.observe(document.body, { attributes: false, childList: true });
        // }
    }
    private _id: string;
    public get id(): string { return this._id || this.rootElement?.id || this.rootElement?.dataset?.mrbrId; }
    public set id(value: string) { this._id = value; }
    public Id(value: string): Mrbr_UI_Controls_Control {
        this.id = value; return this;
    }


    private static _mutationObserver: Mrbr_UI_DOM_MutationObserver = null;
    public static get mutationObserver(): Mrbr_UI_DOM_MutationObserver { return Mrbr_UI_Controls_Control._mutationObserver; }
    public static set mutationObserver(value: Mrbr_UI_DOM_MutationObserver) { Mrbr_UI_Controls_Control._mutationObserver = value; }



    setDefaultConfig(...args: any[]): Mrbr_System_MrbrPromise<any> {
        return this.$promise.createResolved(null);
    }
    initialise(...args: any[]): Mrbr_System_MrbrPromise<any> {
        const
            self = this,
            initialisePromise = this.$promise.create<Mrbr_UI_Controls_Control>("Mrbr_UI_Controls_Control:initialise");
        this.mrbrInstance.loadManifest(Mrbr_UI_Controls_Control[MrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(manifest => {
                (!self.$cls.mutationObserver) && (self.$cls.mutationObserver = new Mrbr_UI_DOM_MutationObserver(document.body, { attributes: false, childList: true }));
                this._defaultConfiguration = new this.$ctrlCol();
                this._customConfiguration = new this.$ctrlCol();

                this.events[this.$themeChange.themeChangeEvent] = new Mrbr_System_Events_EventHandler(
                    this.$themeChange.themeChangeEvent,
                    this.controlEvents,
                    this.themeChanged,
                    this
                )
                initialisePromise.resolve(this);
            })
            .catch(error => {
                initialisePromise.reject({ location: "Mrbr_UI_Controls_Control.Initialise.loadManifest", error: error });
            })
        return initialisePromise;
    }
    public get themedElements() { return this._themedElements; }
    public set themedElements(value) { this._themedElements = value; }
    public get controlEvents() { return Mrbr_UI_Controls_Control._controlEvents; }
    public set controlEvents(value) { Mrbr_UI_Controls_Control._controlEvents = value; }
    private themeChanged(event: Mrbr_UI_Controls_ThemeChangeEvent): void {
        const self = this;
        if (self._updateTheme === false) {
            self._updateTheme = true;
            window.requestAnimationFrame(() => {
                self.changeTheme(event.detail.theme);
                self._updateTheme = false;
            })
        }
    }
    changeElementTheme(element: HTMLElement, theme: Mrbr_UI_Controls_Themes) {
        const currentTheme = theme;
        try {
            let toRemove = currentTheme === this.$ctrlTheme.dark ? element.dataset["lightTheme"] : element.dataset["darkTheme"],
                toAdd = currentTheme === this.$ctrlTheme.dark ? element.dataset["darkTheme"] : element.dataset["lightTheme"];
            if (toRemove && toRemove.length > 0) {
                this.classes(element, this.$clsActions.Remove, toRemove);
            }
            if (toAdd && toAdd.length > 0) {
                this.classes(element, this.$clsActions.Add, toAdd);
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }
    changeTheme(theme: Mrbr_UI_Controls_Themes) {
        const currentTheme = theme;
        this.themedElements.forEach(themedElement => {
            try {
                let toRemove = currentTheme === this.$ctrlTheme.dark ? themedElement.dataset["lightTheme"] : themedElement.dataset["darkTheme"],
                    toAdd = currentTheme === this.$ctrlTheme.dark ? themedElement.dataset["darkTheme"] : themedElement.dataset["lightTheme"];
                if (toRemove && toRemove.length > 0) {
                    this.classes(themedElement, this.$clsActions.Remove, toRemove);
                }
                if (toAdd && toAdd.length > 0) {
                    this.classes(themedElement, this.$clsActions.Add, toAdd);
                }
            } catch (error) {
                console.log("error: ", error)
            }
        });
    }


    createElement(controlConfig: Mrbr_UI_Controls_ControlConfig | HTMLElement | Array<Mrbr_UI_Controls_ControlConfig | Mrbr_UI_Controls_ControlConfig>): HTMLElement | Array<HTMLElement> {
        if (Array.isArray(controlConfig) === true) {
            return (<Array<Mrbr_UI_Controls_ControlConfig>>controlConfig).map(entry => <HTMLElement>this.createElement(entry));
        }
        if (controlConfig instanceof HTMLElement) { return controlConfig; }
        let _config: Mrbr_UI_Controls_ControlConfig = <Mrbr_UI_Controls_ControlConfig>controlConfig,
            _element: HTMLElement = <HTMLElement>document.createElement(_config.elementType);
        _config?.optionalParameters && this.assignElementConfig(_element, _config.optionalParameters);
        debugger
        this.elements.add(_config.elementName, _element);
        if (!_config.children) { return _element; }
        _config.children
            .map(entry => <HTMLElement>this.createElement(entry))
            .forEach(child => _element.appendChild(child));
        return _element;
    }


    public assignElementConfig(element: HTMLElement, config: Mrbr_UI_Controls_ControlConfigOptionalParameters): void {
        element.id = config.id || this.$cls.createId(element.nodeName?.toLocaleLowerCase() || "element");
        this.classes(element, this.$clsActions.Add, config.classes)
        this.attributes(element, config.attributes)
        this.dataset(element, config.data)
        this.properties(element, config.properties)
        this.styles(element, config.styles)
        this.aria(element, config.aria)
        this.template(element, config.template);
        config.lightTheme && this.dataset(element, { lightTheme: config.lightTheme });
        config.darkTheme && this.dataset(element, { darkTheme: config.darkTheme });
        (config.lightTheme || config.darkTheme) && this.themedElements.add(element)
        this.changeElementTheme(element, this.$cls._theme);
    }



    public get defaultContainerElement(): HTMLElement { return this.elements.get(this._defaultContainerElementName) }
    public set defaultContainerElement(value: HTMLElement) { this.elements.set(this._defaultContainerElementName, value); }
    public get defaultContainerElementName(): string { return this._defaultContainerElementName; }
    public set defaultContainerElementName(value: string) { this._defaultContainerElementName = value; }
    public get defaultConfig(): Mrbr_UI_Controls_ControlDefaultsCollection { return this._defaultConfiguration; }
    public set defaultConfig(value: Mrbr_UI_Controls_ControlDefaultsCollection) { this._defaultConfiguration = value; }
    public get customConfiguration(): Mrbr_UI_Controls_ControlDefaultsCollection { return this._customConfiguration; }
    public set customConfiguration(value: Mrbr_UI_Controls_ControlDefaultsCollection) { this._customConfiguration = value; }
    protected configuration(key: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        let configEntry = this.customConfiguration.index[key] || this.defaultConfig.index[key];
        if (configEntry) {
            return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), configEntry);
        }
        throw new Error(`Configuration ${key} not found`)
    }
    protected hasConfiguration(key: string): boolean { return this.customConfiguration.index[key] || this.defaultConfig.index[key] ? true : false; }
    get elements(): Mrbr_UI_Controls_ElementsMap {
        (!this._elements) && (this._elements = new Mrbr_UI_Controls_ElementsMap());
        return this._elements
    }
    get controls(): Mrbr_UI_Controls_ControlsMap {
        (!this._controls) && (this._controls = new Mrbr_UI_Controls_ControlsMap());
        return this._controls
    }
    get events(): Mrbr_System_Events_EventsMap {
        (!this._events) && (this._events = new Mrbr_System_Events_EventsMap())
        return this._events
    }
    get rootElementName(): string { return this._rootElementName; }
    set rootElementName(value: string) { this._rootElementName = value; }
    get rootElement(): HTMLElement { const self = this; return self.elements.get(self._rootElementName); }
    set rootElement(value: HTMLElement) { const self = this; self.elements.set(self._rootElementName, value); }
    classes(targetElement: string | HTMLElement | Array<string> | Array<HTMLElement>, action: Mrbr_UI_Controls_ClassActions, value: Array<string> | string, styleType?: Object): HTMLElement | Array<HTMLElement> {
        const self = this;
        if (Array.isArray(targetElement)) {
            const returnElements = [];
            targetElement.forEach(entry => returnElements.push(self.classes(entry, action, value, styleType)))
            return returnElements;
        }
        const valueAsArray = (Array.isArray(value) ? value : [value]);
        let _targetElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;

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
    children(targetElement: string | HTMLElement, value: Array<string> | string | HTMLElement | Array<HTMLElement>): HTMLElement {
        const self = this;
        let _targetElement = (typeof targetElement === "string") ? self.elements.get(targetElement) : targetElement;
        (Array.isArray(value) ? value : [value]).forEach(entry => {
            _targetElement.appendChild((typeof entry === "string") ?
                _targetElement.appendChild(self.elements.get(entry)) :
                _targetElement.appendChild(entry))
        });
        return _targetElement;
    }
    attributes(targetElement: string | HTMLElement, attributesSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (!attributesSettings) { return _targetElement; }
        Object.keys(attributesSettings).forEach(key => {
            if (attributesSettings[key] === self.$cls.DELETE) { if (_targetElement.hasAttribute(key)) { _targetElement.removeAttribute(key) } }
            else { _targetElement.setAttribute(key, attributesSettings[key]); }
        })
        return _targetElement
    }
    themes(targetElement: string | HTMLElement, lightThemes: Array<string>, darkThemes: Array<string>): HTMLElement {
        const datasetSettings: object = {
            lightTheme: lightThemes.join(" "),
            darkTheme: darkThemes.join(" ")
        }
        let element = this.dataset(targetElement, datasetSettings);
        if (this.themedElements.has(element) === false) {
            this.themedElements.add(element);
        }
        return
    }
    dataset(targetElement: string | HTMLElement, datasetSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (!datasetSettings) { return _targetElement; }
        Object.keys(datasetSettings).forEach(key => {
            if (datasetSettings[key] === self.$cls.DELETE) { delete _targetElement.dataset[key] }
            else { _targetElement.dataset[key] = datasetSettings[key]; }
        });
        return _targetElement
    }

    aria(targetElement: string | HTMLElement | Array<string> | Array<HTMLElement>, datasetSettings: object): HTMLElement | Array<HTMLElement> {
        const self = this;
        if (Array.isArray(targetElement)) {
            const returnElements = [];
            targetElement.forEach(entry => returnElements.push(self.aria(entry, datasetSettings)))
            return returnElements;
        }
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (!datasetSettings) { return _targetElement; }

        Object.keys(datasetSettings)
            .forEach(key => {
                let _key = key.split("-");
                const ariaKey = `aria-${_key[_key.length - 1]}`;
                if (datasetSettings[key] === self.$cls.DELETE) { if (_targetElement.hasAttribute(ariaKey)) { _targetElement.removeAttribute(ariaKey) } }
                else { _targetElement.setAttribute(ariaKey, datasetSettings[key]); }
            });

        return _targetElement
    }
    template(_element: HTMLElement, template: string): HTMLElement {
        (template) && (_element.innerHTML = template)
        return _element;
    }



    properties(targetElement: string | HTMLElement, propertyValues: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        (propertyValues) && (Object.keys(propertyValues).forEach(key => _targetElement[key] = propertyValues[key]))
        return _targetElement
    }
    styles(targetElement: string | HTMLElement, styleValues: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        (styleValues) && (Object.keys(styleValues).forEach(key => _targetElement.style[key] = styleValues[key]))
        return _targetElement
    }
    dispose() {
        const self = this;
        self.events.forEach((event, key) => event?.remove())
        self.events.clear();
        self.elements.forEach((element, key) => element.remove());
        self.elements.clear();
        self.controls.forEach(control => control.dispose());
        self.controls.clear();
    }
    static createId(prefix: string) {
        return `${prefix}_` + (new Date()).toISOString().replace(/[:z.-]/gmi, "").split("T").map(part => parseInt(part).toString(36)).concat((Math.floor(Math.random() * 10000)).toString(36)).join("_");
    }

    public mount(element: HTMLElement, position: "replace" | "prepend" | "before" | "after" | "append" = "append", ...args: any): Mrbr_UI_Controls_IControl {
        const self = this;
        switch (position) {
            case "append": element.appendChild(self.rootElement); break;
            case "before": element.before(self.rootElement); break;
            case "after": element.after(self.rootElement); break;
            case "prepend": element.prepend(self.rootElement); break;
            case "replace": element.replaceWith(self.rootElement); break;
        }
        return self;// as any as Mrbr_UI_Controls_IControl;
    }



}

