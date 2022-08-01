import { Mrbr_UI_Html_StyleClasses } from "../../html/StyleClasses";
import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "./classActions";
export class Mrbr_UI_Bootstrap_Controls_Control extends EventTarget {
    _styleClasses = Mrbr_UI_Html_StyleClasses
    _rootElementName: string;
    _elements: Map<string, HTMLElement>
    _controls: Map<string, Mrbr_UI_Bootstrap_Controls_Control>
    constructor(rootElementName: string) {
        super();
        const self = this;
        self.rootElementName = rootElementName;
        self._elements = new Proxy(new Map<string, HTMLElement>(), {
            get(target, name) {
                return (target.has(name as string)) ? target.get(name as string) : undefined;
            },
            set(target, name, value) {
                if (value instanceof HTMLElement) {
                    if (value && !value?.dataset?.id) {
                        value.dataset.id = <string>name;
                    }
                }
                target.set((name as string), value);
                return true;
            }
        })

        this._controls = new Proxy(new Map<string, Mrbr_UI_Bootstrap_Controls_Control>(), {
            get(target: Map<string, Mrbr_UI_Bootstrap_Controls_Control>, name: string) {
                return (target.has(name)) ? (target.get(name)) : undefined;
            }
        })

    }
    createElement(name: string, elementType: string): HTMLElement {
        let _element = document.createElement(elementType);
        this._elements[name] = _element;
        return this._elements[name];
    }
    get elements() { return this._elements }
    get controls() { return this._controls }
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
        Object.keys(attributesSettings).forEach(key => _targetElement.setAttribute(key, attributesSettings[key]))
        return _targetElement
    }

    dataset(targetElement: string | HTMLElement, attributesSettings: object): HTMLElement {
        const self = this;
        let _targetElement: HTMLElement = (typeof targetElement === "string") ? self.elements[targetElement] : targetElement;
        Object.keys(attributesSettings).forEach(key => _targetElement.dataset[key] = attributesSettings[key]);
        return _targetElement
    }
    static createId(prefix: string) { return `${prefix}_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`; }

}

