import { Mrbr_UI_Html_StyleClasses } from "../../html/StyleClasses";
import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "./classActions";
import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "./ControlConfig";
import { MrbrEventHandler } from "./MrbrEventHandler";
export class Mrbr_UI_Bootstrap_Controls_Control extends EventTarget {
    _styleClasses = Mrbr_UI_Html_StyleClasses
    _rootElementName: string;
    _elements: Map<string, HTMLElement>
    _controls: Map<string, Mrbr_UI_Bootstrap_Controls_Control>
    _events: Map<string, MrbrEventHandler>;
    constructor(rootElementName: string) {
        super();
        const self = this;
        self.rootElementName = rootElementName;
        self._elements = new Proxy(new Map<string, HTMLElement>(), {
            get(target, name) {
                return (target.has(name as string)) ? target.get(name as string) : undefined;
            },
            set(target, name: string, value) {
                if (name === "delete") {
                    throw new Error("Delete is a function and cannot be used as a key")

                }
                if (value instanceof HTMLElement) {
                    if (value && !value?.dataset?.id) {
                        value.dataset.id = <string>name;
                    }
                }
                target.set((name as string), value);
                if(!value){
                    target.delete(name)
                }
                return true;
            }
        })

        this._controls = new Proxy(new Map<string, Mrbr_UI_Bootstrap_Controls_Control>(), {
            get(target: Map<string, Mrbr_UI_Bootstrap_Controls_Control>, name: string) {
                return (target.has(name)) ? (target.get(name)) : undefined;
            }
        })

        self._events = new Proxy(new Map<string, MrbrEventHandler>(), {
            get(target, name: string) {
                return (target.has(name as string)) ? target.get(name as string) : undefined;
            },
            set(target, name: string, value: MrbrEventHandler) {
                if (target.has(name)) {
                    console.warn(`Duplicate event name: ${name}`)
                    return true;
                }
                if (!value.handler) {
                    value.handler = value.event.bind((value.context || value.eventTarget));
                    if (value.options) {
                        value.eventTarget.addEventListener(value.eventName, value.handler, value.options)
                    }
                    else {
                        value.eventTarget.addEventListener(value.eventName, value.handler)
                    }
                }

                value.remove = () => {
                    if (target.has(name)) {
                        if (value.options) {
                            value.eventTarget.removeEventListener(value.eventName, value.handler, value.options)
                        }
                        else {
                            value.eventTarget.removeEventListener(value.eventName, value.handler)
                        }
                        target.delete(name);
                    }
                }
                target.set(name, value);
                return true;
            }
        });
    }
    createElement(config: Mrbr_UI_Bootstrap_Controls_ControlConfig | HTMLElement | Array<Mrbr_UI_Bootstrap_Controls_ControlConfig | Mrbr_UI_Bootstrap_Controls_ControlConfig>): HTMLElement | Array<HTMLElement> {
        const self = this;
        if (Array.isArray(config) === true) {
            return (<Array<Mrbr_UI_Bootstrap_Controls_ControlConfig>>config).map(entry => <HTMLElement>self.createElement(entry));
        }
        let _config: Mrbr_UI_Bootstrap_Controls_ControlConfig = <Mrbr_UI_Bootstrap_Controls_ControlConfig>config;

        if (config instanceof HTMLElement) {
            return config;
        }

        let _element = document.createElement(_config.elementType);
        _element.id = _config.id || Mrbr_UI_Bootstrap_Controls_Control.createId(_config.elementType)
        self.classes(_element, Mrbr_UI_Bootstrap_Controls_ClassActions.Add, _config.classes)
        self.attributes(_element, _config.attributes)
        self.dataset(_element, _config.data)
        self.properties(_element, _config.properties)
        self.styles(_element, _config.styles)

        self._elements[_config.elementName] = _element;
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
    get elements() { return this._elements }
    get controls() { return this._controls }
    get events(): Map<string, MrbrEventHandler> { return this._events }
    get rootElementName(): string { return this._rootElementName; }
    set rootElementName(value: string) { this._rootElementName = value; }
    get rootElement(): HTMLElement { const self = this; return self.elements[self._rootElementName]; }
    classes(targetElement: string | HTMLElement, action: Mrbr_UI_Bootstrap_Controls_ClassActions, value: Array<string> | string, styleType?: Object): HTMLElement {
        const self = this,
            styleClasses = self._styleClasses,
            classActions = Mrbr_UI_Bootstrap_Controls_ClassActions,
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
            Object.keys(attributesSettings).forEach(key => _targetElement.setAttribute(key, attributesSettings[key]))
        }
        return _targetElement
    }

    dataset(targetElement: string | HTMLElement, datasetSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        if (datasetSettings) {
            Object.keys(datasetSettings).forEach(key => _targetElement.dataset[key] = datasetSettings[key]);
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
        console.log("Mrbr_UI_Bootstrap_Controls_Control")
        const self = this;
        let remainingEvents = Array.from(Object.keys(self._events));
        remainingEvents.forEach(eventName => {
            try {
                self.events[eventName].remove();
                self.events.delete(eventName);
            } catch (error) {

            }
        })
    }
    static createId(prefix: string) { return `${prefix}_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`; }

}

