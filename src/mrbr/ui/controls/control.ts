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
export class Mrbr_UI_Controls_Control extends EventTarget implements Mrbr_UI_Controls_IControl {
    public static CONTROL_KEYS: symbol = Symbol("control_keys");
    public static DELETE: symbol = Symbol("delete");
    private _styleClasses = Mrbr_UI_Html_StyleClasses
    private _rootElementName: string;
    private _defaultContainerElementName: string;
    private _elements: Map<string, HTMLElement>
    private _controls: Map<string | symbol, Mrbr_UI_Controls_Control>
    protected _defaultConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;
    protected _customConfiguration: Mrbr_UI_Controls_ControlDefaultsCollection;
    private _events: Map<string, Mrbr_System_Events_EventHandler>;
    private _updateTheme: boolean = false;
    private static themeMediaMatch = "(prefers-color-scheme: dark)";
    private static windowThemeChangeEventName: string = "change";
    private static get _theme() { return window.matchMedia(Mrbr_UI_Controls_Control.themeMediaMatch).matches ? Mrbr_UI_Controls_Themes.dark : Mrbr_UI_Controls_Themes.light; }
    private static _controlEvents = new EventTarget();
    private _themedElements: Set<HTMLElement> = new Set<HTMLElement>();
    public static DELETE_ENTRY: symbol = Symbol("delete_entry");
    private static _themeChangeHandle = window.matchMedia(Mrbr_UI_Controls_Control.themeMediaMatch)
        .addEventListener(
            Mrbr_UI_Controls_Control.windowThemeChangeEventName,
            (event) => Mrbr_UI_Controls_Control._controlEvents.dispatchEvent(new Mrbr_UI_Controls_ThemeChangeEvent({ detail: { theme: Mrbr_UI_Controls_Control._theme } }))
        );
    constructor(rootElementName: string) {
        super();
        const self = this;
        self.rootElementName = rootElementName;
        this._defaultConfiguration = new Mrbr_UI_Controls_ControlDefaultsCollection();
        this._customConfiguration = new Mrbr_UI_Controls_ControlDefaultsCollection();
        self._elements = new Proxy(new Map<string, HTMLElement>(), {
            get(target, name) {
                return (target.has(name as string)) ? target.get(name as string) : null;
            },
            set(target, name: string, value) {
                if (value instanceof HTMLElement) {
                    if (value && !value?.dataset?.id) {
                        value.dataset.id = <string>name;
                    }
                }
                target.set((name as string), value);
                if (value === Mrbr_UI_Controls_Control.DELETE_ENTRY) { target.delete(name); }
                return true;
            },
            ownKeys(target) {
                return Array.from(target.keys());
            }
        })

        self._controls = new Proxy(new Map<string | symbol, Mrbr_UI_Controls_Control>(), {
            get(target: Map<string | symbol, Mrbr_UI_Controls_Control>, name: string | symbol) {
                if ((name as symbol) === Mrbr_UI_Controls_Control.CONTROL_KEYS) {
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
                    value.handler = value.event.bind((value.context || value.eventTarget));
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
                            (value.options !== undefined) ?
                                value.eventTarget.removeEventListener(value.eventName, value.handler, value.options) :
                                value.eventTarget.removeEventListener(value.eventName, value.handler);
                            target.delete(name);
                        }
                    }
                }
                target.set(name, value);
                return true;
            }
            , ownKeys(target) {
                return Array.from(target.keys());
            }
        });
        self.events[Mrbr_UI_Controls_ThemeChangeEvent.themeChangeEvent] = <Mrbr_System_Events_EventHandler>{
            context: self,
            eventName: Mrbr_UI_Controls_ThemeChangeEvent.themeChangeEvent,
            eventTarget: self.controlEvents,
            event: self.themeChanged
        }
    }
    private _id: string;
    public get id(): string {
        return this._id || this.rootElement?.id || this.rootElement?.dataset?.id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public Id(value: string): Mrbr_UI_Controls_Control {
        this.id = value;
        return this;
    }
    setDefaultConfiguration(...args: any[]): Mrbr_System_MrbrPromise<any> {
        return Mrbr_System_MrbrPromise.createResolved(null);
    }
    initialise(...args: any[]): Mrbr_System_MrbrPromise<any> {
        let retval = Mrbr_System_MrbrPromise.createResolved("Mrbr_UI_Controls_Control:initialise", this);
        return retval;
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
        const self = this;
        const currentTheme = theme;// Mrbr_UI_Controls_Control._theme;
        try {
            let toRemove = currentTheme === Mrbr_UI_Controls_Themes.dark ? element.dataset["lightTheme"] : element.dataset["darkTheme"],
                toAdd = currentTheme === Mrbr_UI_Controls_Themes.dark ? element.dataset["darkTheme"] : element.dataset["lightTheme"];
            if (toRemove && toRemove.length > 0) {
                self.classes(element, Mrbr_UI_Controls_ClassActions.Remove, toRemove);
            }
            if (toAdd && toAdd.length > 0) {
                self.classes(element, Mrbr_UI_Controls_ClassActions.Add, toAdd);
            }
        } catch (error) {
            console.log("error: ", error)
        }
        //console.log("currentTheme: end: ", theme, element)
    }
    changeTheme(theme: Mrbr_UI_Controls_Themes) {
        const self = this;
        const currentTheme = theme;// Mrbr_UI_Controls_Control._theme;
        //console.log("currentTheme: ", theme, self.themedElements)

        //self.themedElements.forEach((themedElement: HTMLElement) => HTMLElement = function (themedElement: HTMLElement) {
        self.themedElements.forEach(themedElement => {
            //if (themedElement) {
            try {
                let toRemove = currentTheme === Mrbr_UI_Controls_Themes.dark ? themedElement.dataset["lightTheme"] : themedElement.dataset["darkTheme"],
                    toAdd = currentTheme === Mrbr_UI_Controls_Themes.dark ? themedElement.dataset["darkTheme"] : themedElement.dataset["lightTheme"];
                if (toRemove && toRemove.length > 0) {
                    self.classes(themedElement, Mrbr_UI_Controls_ClassActions.Remove, toRemove);
                }
                if (toAdd && toAdd.length > 0) {
                    self.classes(themedElement, Mrbr_UI_Controls_ClassActions.Add, toAdd);
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

        if (controlConfig instanceof HTMLElement) {
            return controlConfig;
        }

        let _element = document.createElement(_config.elementType);
        _element.id = self.id || _config.id || Mrbr_UI_Controls_Control.createId(_config.elementType)
        self.classes(_element, Mrbr_UI_Controls_ClassActions.Add, _config.classes)
        self.attributes(_element, _config.attributes)
        self.dataset(_element, _config.data)
        self.properties(_element, _config.properties)
        self.styles(_element, _config.styles)
        self.elements[_config.elementName] = _element;
        _config.lightTheme && self.dataset(_element, { lightTheme: _config.lightTheme });
        _config.darkTheme && self.dataset(_element, { darkTheme: _config.darkTheme });
        (_config.lightTheme || _config.darkTheme) && self.themedElements.add(_element)
        self.changeElementTheme(_element, Mrbr_UI_Controls_Control._theme);
        //}
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
    public get defaultConfiguration(): Mrbr_UI_Controls_ControlDefaultsCollection {
        return this._defaultConfiguration;
    }
    public set defaultConfiguration(value: Mrbr_UI_Controls_ControlDefaultsCollection) {
        this._defaultConfiguration = value;
    }
    public get customConfiguration(): Mrbr_UI_Controls_ControlDefaultsCollection {
        return this._customConfiguration;
    }
    public set customConfiguration(value: Mrbr_UI_Controls_ControlDefaultsCollection) {
        this._customConfiguration = value;
    }
    protected configuration(key: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        let retVal = this.customConfiguration.index[key] || this.defaultConfiguration.index[key];
        if (retVal) { return retVal; }
        throw new Error(`Configuration ${key} not found`)
    }
    get elements() { return this._elements }
    get controls() { return this._controls }
    get events(): Map<string, Mrbr_System_Events_EventHandler> { return this._events }
    get rootElementName(): string { return this._rootElementName; }
    set rootElementName(value: string) { this._rootElementName = value; }
    get rootElement(): HTMLElement { const self = this; return self.elements[self._rootElementName]; }
    set rootElement(value: HTMLElement) { const self = this; self.elements[self._rootElementName] = value; }
    classes(targetElement: string | HTMLElement, action: Mrbr_UI_Controls_ClassActions, value: Array<string> | string, styleType?: Object): HTMLElement {
        const self = this,
            styleClasses = self._styleClasses,
            classActions = Mrbr_UI_Controls_ClassActions,
            valueAsArray = (Array.isArray(value) ? value : [value]);
        let _targetElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;

        switch (action) {
            case classActions.Add:
                valueAsArray.forEach(valueEntry => styleClasses.addClasses(_targetElement, valueEntry))
                break;
            case classActions.Clear:
                Object.keys(styleType).forEach(key => styleClasses.removeClass(_targetElement, key))
                break;
            case classActions.Remove:
                valueAsArray.forEach(valueEntry => styleClasses.removeClass(_targetElement, valueEntry))
                break;
            case classActions.Toggle:
                valueAsArray.forEach(valueEntry => styleClasses.toggleClass(_targetElement, valueEntry))
                break;
            case classActions.Swap:
                if (valueAsArray.length !== 2) { throw new Error("Two values must be provided") }
                let addClass, removeClass;
                if (styleClasses.hasClass(_targetElement, valueAsArray[0]) === true) {
                    addClass = valueAsArray[1]
                    removeClass = valueAsArray[0];
                }
                else if (styleClasses.hasClass(_targetElement, valueAsArray[1])) {
                    addClass = valueAsArray[0];
                    removeClass = valueAsArray[1];
                }
                styleClasses.addClasses(_targetElement, addClass)
                styleClasses.removeClass(_targetElement, removeClass)
                break;
            case classActions.ReplaceAllWith:
                Object.keys(styleType).forEach(key => styleClasses.removeClass(_targetElement, key))
                valueAsArray.forEach(valueEntry => styleClasses.addClasses(_targetElement, valueEntry))
            default:
                break;

        }
        return _targetElement;
    }
    attributes(targetElement: string | HTMLElement, attributesSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (attributesSettings) {
            Object.keys(attributesSettings).forEach(key => {
                if (attributesSettings[key] === Mrbr_UI_Controls_Control.DELETE) { if (_targetElement.hasAttribute(key)) { _targetElement.removeAttribute(key) } }
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
                if (datasetSettings[key] === Mrbr_UI_Controls_Control.DELETE) { delete _targetElement.dataset[key] }
                else { _targetElement.dataset[key] = datasetSettings[key]; }
            });
        }
        return _targetElement
    }

    aria(targetElement: string | HTMLElement, datasetSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (datasetSettings) {
            Object.keys(datasetSettings).forEach(key => {
                if (key) {
                    let _key = key.split("-");
                    const ariaKey = `aria-${_key[_key.length - 1]}`;
                    if (datasetSettings[key] === Mrbr_UI_Controls_Control.DELETE) { if (_targetElement.hasAttribute(ariaKey)) { _targetElement.removeAttribute(ariaKey) } }
                    else { _targetElement.setAttribute(ariaKey, datasetSettings[key]); }
                }
            });
        }
        return _targetElement
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
                self.events[eventName].remove();
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
    static createId(prefix: string) { return `${prefix}_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`; }

}

