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

export class Mrbr_UI_Controls_Control extends EventTarget implements Mrbr_UI_Controls_IControl {
    public static CONTROL_KEYS: symbol = Symbol("control_keys");
    public static DELETE: symbol = Symbol("delete");
    public static MUTATION_EVENT_NAME: string = "mutation_event";
    private _rootElementName: string;
    private _defaultContainerElementName: string;
    private _elements: Map<string, HTMLElement>
    private _controls: Map<string | symbol, Mrbr_UI_Controls_Control>
    protected _defaultConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;
    protected _customConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;
    private _events: Map<string, Mrbr_System_Events_EventHandler>;
    private _updateTheme: boolean = false;
    get $cls(): typeof Mrbr_UI_Controls_Control { return Mrbr_UI_Controls_Control; }
    public get $clsActions() { return Mrbr_UI_Controls_ClassActions; }
    public get $promise() { return Mrbr_System_MrbrPromise; }
    public get $mrbr() { return MrbrBase.mrbrInstance; }
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
    private static _mutationObserver: MutationObserver = null;
    private static _mutations: EventTarget = new EventTarget();
    public static get mutations(): EventTarget { return Mrbr_UI_Controls_Control._mutations; }
    public static set mutations(value: EventTarget) { Mrbr_UI_Controls_Control._mutations = value; }
    public static MutationEvent = class extends CustomEvent<MutationRecord[]> {
        constructor(mutationRecords: MutationRecord[]) {
            super(Mrbr_UI_Controls_Control.MUTATION_EVENT_NAME, { detail: mutationRecords });
        }
    }



    private static _themeChangeHandle = window.matchMedia(Mrbr_UI_Controls_Control.themeMediaMatch)
        .addEventListener(
            Mrbr_UI_Controls_Control.windowThemeChangeEventName,
            (event) => Mrbr_UI_Controls_Control._controlEvents.dispatchEvent(new Mrbr_UI_Controls_ThemeChangeEvent({ detail: { theme: Mrbr_UI_Controls_Control._theme } }))
        );
    constructor(rootElementName: string) {
        super();
        const self = this;
        self.rootElementName = rootElementName;
        self._elements = new Proxy(new Map<string, HTMLElement>(), {
            get(target, name) {
                return (target.has(name as string)) ? target.get(name as string) : null;
            },
            set(target, name: string, value) {
                if (value instanceof HTMLElement) {
                    if (value && !value?.dataset?.mrbrId) {
                        value.dataset.mrbrId = <string>name;
                    }
                }
                target.set((name as string), value);
                if (value === self.$cls.DELETE_ENTRY) { target.delete(name); }
                return true;
            },
            ownKeys(target) {
                return Array.from(target.keys());
            }
        })

        self._controls = new Proxy(new Map<string | symbol, Mrbr_UI_Controls_Control>(), {
            get(target: Map<string | symbol, Mrbr_UI_Controls_Control>, name: string | symbol) {
                if ((name as symbol) === self.$cls.CONTROL_KEYS) {
                    return Array.from(target.keys());
                }
                return (target.has(name)) ? (target.get(name)) : null;
            },
            set(target, name: string, value) {
                target.set((name as string), value);
                if (!value) {
                    target.delete(name)
                }
                return true;
            },
            ownKeys(target) {
                return Array.from(target.keys());
            }
        })
        self._events = new Proxy(new Map<string, Mrbr_System_Events_EventHandler>(), {
            get(target, name: string) {
                return (target.has(name as string)) ? target.get(name as string) : null;
            },
            set(target, name: string, value: Mrbr_System_Events_EventHandler) {
                if (target.has(name) && (value === undefined || value === null) === false) {
                    let _value = target.get(name as string);
                    _value.count++;
                    target.set(name, value);
                    return true;
                }
                if (!value) { return target.delete(name); }
                if (!value.handler) {
                    value.handler = value.eventHandler.bind((value.context || value.eventTarget));
                    (value.options !== undefined) ?
                        value.eventTarget.addEventListener(value.eventName, value.handler, value.options) :
                        value.eventTarget.addEventListener(value.eventName, value.handler);
                }
                value.remove = () => {
                    if (target.has(name)) {
                        if (value.count > 1) {
                            target.get(name as string).count--;
                        }
                        else {
                            (value.options) ?
                                value.eventTarget.removeEventListener(value.eventName, value.handler, value.options) :
                                value.eventTarget.removeEventListener(value.eventName, value.handler);
                            setTimeout(() => {
                                target.delete(name);
                            }, 0);
                        }
                    }
                    else {
                        throw new Error("Event not found");
                    }
                }
                target.set(name, value);
                return true;
            }
            , ownKeys(target) {
                return Array.from(target.keys());
            }
        });
        if (self.$cls._mutationObserver === null) {
            self.$cls._mutationObserver = new MutationObserver((mutations) => { self.$cls.mutations.dispatchEvent(new self.$cls.MutationEvent(mutations)); });
            self.$cls._mutationObserver.observe(document.body, { attributes: false, childList: true });
        }
    }
    private _id: string;
    public get id(): string {
        return this._id || this.rootElement?.id || this.rootElement?.dataset?.mrbrId;
    }
    public set id(value: string) {
        this._id = value;
    }
    public Id(value: string): Mrbr_UI_Controls_Control {
        this.id = value;
        return this;
    }
    setDefaultConfig(...args: any[]): Mrbr_System_MrbrPromise<any> {
        return this.$promise.createResolved(null);
    }
    initialise(...args: any[]): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Controls_Control>("Mrbr_UI_Controls_Control:initialise");
        self.$mrbr.loadManifest(Mrbr_UI_Controls_Control[MrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(manifest => {
                self._defaultConfiguration = new self.$ctrlCol();
                self._customConfiguration = new self.$ctrlCol();
                self.events[self.$themeChange.themeChangeEvent] = new Mrbr_System_Events_EventHandler(
                    self.$themeChange.themeChangeEvent,
                    self.controlEvents,
                    self.themeChanged,
                    self
                )
                initialisePromise.resolve(self);
            })
            .catch(error => {
                initialisePromise.reject(error);
            })
        return initialisePromise;
    }
    public get themedElements() {
        return this._themedElements;
    }
    public set themedElements(value) {
        this._themedElements = value;
    }
    public get controlEvents() {
        return Mrbr_UI_Controls_Control._controlEvents;
    }
    public set controlEvents(value) {
        Mrbr_UI_Controls_Control._controlEvents = value;
    }
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
        const self = this,
            currentTheme = theme;
        try {
            let toRemove = currentTheme === self.$ctrlTheme.dark ? element.dataset["lightTheme"] : element.dataset["darkTheme"],
                toAdd = currentTheme === self.$ctrlTheme.dark ? element.dataset["darkTheme"] : element.dataset["lightTheme"];
            if (toRemove && toRemove.length > 0) {
                self.classes(element, self.$clsActions.Remove, toRemove);
            }
            if (toAdd && toAdd.length > 0) {
                self.classes(element, self.$clsActions.Add, toAdd);
            }
        } catch (error) {
            console.log("error: ", error)
        }
    }
    changeTheme(theme: Mrbr_UI_Controls_Themes) {
        const self = this,
            currentTheme = theme;
        self.themedElements.forEach(themedElement => {
            try {
                let toRemove = currentTheme === self.$ctrlTheme.dark ? themedElement.dataset["lightTheme"] : themedElement.dataset["darkTheme"],
                    toAdd = currentTheme === self.$ctrlTheme.dark ? themedElement.dataset["darkTheme"] : themedElement.dataset["lightTheme"];
                if (toRemove && toRemove.length > 0) {
                    self.classes(themedElement, self.$clsActions.Remove, toRemove);
                }
                if (toAdd && toAdd.length > 0) {
                    self.classes(themedElement, self.$clsActions.Add, toAdd);
                }
            } catch (error) {
                console.log("error: ", error)
            }
            //}
        });
    }


    createElement(controlConfig: Mrbr_UI_Controls_ControlConfig | HTMLElement | Array<Mrbr_UI_Controls_ControlConfig | Mrbr_UI_Controls_ControlConfig>): HTMLElement | Array<HTMLElement> {
        const self = this;
        if (Array.isArray(controlConfig) === true) {
            return (<Array<Mrbr_UI_Controls_ControlConfig>>controlConfig).map(entry => <HTMLElement>self.createElement(entry));
        }
        let _config: Mrbr_UI_Controls_ControlConfig = <Mrbr_UI_Controls_ControlConfig>controlConfig;
        let _element: HTMLElement;
        if (controlConfig instanceof HTMLElement) { return controlConfig; }
        _element = <HTMLElement>document.createElement(_config.elementType);
        _config?.optionalParameters && self.assignElementConfig(_element, _config.optionalParameters);
        self.elements[_config.elementName] = _element;
        if (_config.children) {
            let children = _config.children.map(entry => self.createElement(entry));
            if (Array.isArray(children)) {
                (<Array<HTMLElement>>children).forEach(entry => { _element.appendChild(entry) })
            }
            else {
                _element.appendChild(<HTMLElement>children)
            }
        }
        return _element;
    }


    public assignElementConfig(element: HTMLElement, config: Mrbr_UI_Controls_ControlConfigOptionalParameters): void {
        const self = this;
        element.id = config.id || self.$cls.createId(element.nodeName?.toLocaleLowerCase() || "element");
        self.classes(element, self.$clsActions.Add, config.classes)
        self.attributes(element, config.attributes)
        self.dataset(element, config.data)
        self.properties(element, config.properties)
        self.styles(element, config.styles)
        self.aria(element, config.aria)
        self.template(element, config.template);
        config.lightTheme && self.dataset(element, { lightTheme: config.lightTheme });
        config.darkTheme && self.dataset(element, { darkTheme: config.darkTheme });
        (config.lightTheme || config.darkTheme) && self.themedElements.add(element)
        self.changeElementTheme(element, self.$cls._theme);
    }



    public get defaultContainerElement(): HTMLElement {
        const self = this;
        return self.elements[self._defaultContainerElementName]
    }
    public set defaultContainerElement(value: HTMLElement) {
        const self = this;
        self.elements[self._defaultContainerElementName] = value;
    }
    public get defaultContainerElementName(): string {
        return this._defaultContainerElementName;
    }
    public set defaultContainerElementName(value: string) {
        this._defaultContainerElementName = value;
    }
    public get defaultConfig(): Mrbr_UI_Controls_ControlDefaultsCollection {
        return this._defaultConfiguration;
    }
    public set defaultConfig(value: Mrbr_UI_Controls_ControlDefaultsCollection) {
        this._defaultConfiguration = value;
    }
    public get customConfiguration(): Mrbr_UI_Controls_ControlDefaultsCollection {
        return this._customConfiguration;
    }
    public set customConfiguration(value: Mrbr_UI_Controls_ControlDefaultsCollection) {
        this._customConfiguration = value;
    }
    protected configuration(key: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        let configEntry = this.customConfiguration.index[key] || this.defaultConfig.index[key];
        if (configEntry) {
            return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), configEntry);
        }
        throw new Error(`Configuration ${key} not found`)
    }
    protected hasConfiguration(key: string): boolean {
        return this.customConfiguration.index[key] || this.defaultConfig.index[key] ? true : false;
    }
    get elements() { return this._elements }
    get controls() { return this._controls }
    get events(): Map<string, Mrbr_System_Events_EventHandler> { return this._events }
    get rootElementName(): string { return this._rootElementName; }
    set rootElementName(value: string) { this._rootElementName = value; }
    get rootElement(): HTMLElement { const self = this; return self.elements[self._rootElementName]; }
    set rootElement(value: HTMLElement) { const self = this; self.elements[self._rootElementName] = value; }
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

        let _targetElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        let _value = (Array.isArray(value) ? value : [value]);

        _value.forEach(entry => {
            if (typeof value === "string") { _targetElement.appendChild(self.elements[value]) }
            else { _targetElement.appendChild(entry) }
        })
        return _targetElement;
    }
    attributes(targetElement: string | HTMLElement, attributesSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (attributesSettings) {
            Object.keys(attributesSettings).forEach(key => {
                if (attributesSettings[key] === self.$cls.DELETE) { if (_targetElement.hasAttribute(key)) { _targetElement.removeAttribute(key) } }
                else { _targetElement.setAttribute(key, attributesSettings[key]); }
            })
        }
        return _targetElement
    }
    themes(targetElement: string | HTMLElement, lightThemes: Array<string>, darkThemes: Array<string>): HTMLElement {
        const self = this,
            datasetSettings: object = {
                lightTheme: lightThemes.join(" "),
                darkTheme: darkThemes.join(" ")
            }
        let element = this.dataset(targetElement, datasetSettings);
        if (self.themedElements.has(element) === false) {
            self.themedElements.add(element);
        }
        return
    }
    dataset(targetElement: string | HTMLElement, datasetSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (datasetSettings) {
            Object.keys(datasetSettings).forEach(key => {
                if (datasetSettings[key] === self.$cls.DELETE) { delete _targetElement.dataset[key] }
                else { _targetElement.dataset[key] = datasetSettings[key]; }
            });
        }
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
        if (datasetSettings) {
            Object.keys(datasetSettings).forEach(key => {
                if (key) {
                    let _key = key.split("-");
                    const ariaKey = `aria-${_key[_key.length - 1]}`;
                    if (datasetSettings[key] === self.$cls.DELETE) { if (_targetElement.hasAttribute(ariaKey)) { _targetElement.removeAttribute(ariaKey) } }
                    else { _targetElement.setAttribute(ariaKey, datasetSettings[key]); }
                }
            });
        }
        return _targetElement
    }
    template(_element: HTMLElement, template: string): HTMLElement {
        const self = this;
        if (template) {
            _element.innerHTML = template;
        }
        return _element;
    }



    properties(targetElement: string | HTMLElement, propertyValues: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (propertyValues) {
            Object.keys(propertyValues).forEach(key => _targetElement[key] = propertyValues[key]);
        }
        return _targetElement
    }
    styles(targetElement: string | HTMLElement, styleValues: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (styleValues) {
            Object.keys(styleValues).forEach(key => _targetElement.style[key] = styleValues[key]);
        }
        return _targetElement
    }
    dispose() {
        const self = this;
        Array.from(Reflect.ownKeys(self._events))?.forEach(eventName => {
            try {
                self.events[eventName]?.remove && self.events[eventName]?.remove();
            } catch (error) {
                console.log(error)
            }
        })
        Array.from(Reflect.ownKeys(self._elements))?.forEach(element => {
            try {
                self.elements[element].remove();
                self.elements[element] = null;
            } catch (error) {
                console.log(error)
            }
        });
        Array.from(Reflect.ownKeys(self._controls))?.forEach(control => {
            try {
                self.controls[control].dispose();
                self.controls[control] = null;
            } catch (error) {

                console.log(error)
            }
        });
    }
    static createId(prefix: string) {
        return `${prefix}_` + (new Date()).toISOString().replace(/[:z.-]/gmi, "").split("T").map(part => parseInt(part).toString(36)).concat((Math.floor(Math.random() * 10000)).toString(36)).join("_");
    }

}

