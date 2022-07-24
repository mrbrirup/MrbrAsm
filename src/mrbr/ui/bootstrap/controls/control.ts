import { Mrbr_UI_Html_StyleClasses } from "../../html/StyleClasses";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Height } from "../utilities/sizing$height";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Width } from "../utilities/sizing$width";
import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "./classActions";

export class Mrbr_UI_Bootstrap_Controls_Control extends EventTarget {
    _styleClasses = Mrbr_UI_Html_StyleClasses
    _defaultElement: HTMLElement
    constructor() {
        super();
    }
    target(targetElement: HTMLElement): Mrbr_UI_Bootstrap_Controls_Control {
        return new Proxy(this, {
            get(target, propertyName) {
                return (propertyName === "_defaultElement") ? targetElement : target[propertyName];
            }
        })
    }

    _setStyles(targetElement: HTMLElement, action: Mrbr_UI_Bootstrap_Controls_ClassActions, value: Array<string> | string, styleType: Object) {
        const self = this,
            styleClasses = self._styleClasses,
            classActions = Mrbr_UI_Bootstrap_Controls_ClassActions,
            valueAsArray = (Array.isArray(value) ? value : [value]);
        switch (action) {
            case classActions.Add:
                valueAsArray.forEach(valueEntry => styleClasses.addClasses(targetElement, valueEntry))
                break;
            case classActions.Clear:
                Object.keys(styleType).forEach(sizingWidth => styleClasses.removeClass(targetElement, sizingWidth))
                break;
            case classActions.Remove:
                valueAsArray.forEach(valueEntry => styleClasses.removeClass(targetElement, valueEntry))
                break;
            case classActions.Toggle:
                valueAsArray.forEach(valueEntry => styleClasses.toggleClass(targetElement, valueEntry))
                break;
            case classActions.Swap:
                if (valueAsArray.length !== 2) { throw new Error("Two values must be provided") }
                let addClass, removeClass;
                if (styleClasses.hasClass(targetElement, valueAsArray[0]) === true) {
                    addClass = valueAsArray[1]
                    removeClass = valueAsArray[0];
                }
                else if (styleClasses.hasClass(targetElement, valueAsArray[1])) {
                    addClass = valueAsArray[0];
                    removeClass = valueAsArray[1];
                }
                styleClasses.addClasses(targetElement, addClass)
                styleClasses.removeClass(targetElement, removeClass)
                break;
            case classActions.ReplaceAllWith:
                Object.keys(styleType).forEach(sizingWidth => styleClasses.removeClass(targetElement, sizingWidth))
                valueAsArray.forEach(valueEntry => styleClasses.addClasses(targetElement, valueEntry))
            default:
                break;

        }
    }

    width(action: Mrbr_UI_Bootstrap_Controls_ClassActions, value: Mrbr_UI_Bootstrap_Utilities_Sizing$Width | Array<Mrbr_UI_Bootstrap_Utilities_Sizing$Width>): Mrbr_UI_Bootstrap_Controls_Control {
        let self = this
        self._setStyles(self._defaultElement, action, value, Mrbr_UI_Bootstrap_Utilities_Sizing$Width);
        return this;
    }
    height(action: Mrbr_UI_Bootstrap_Controls_ClassActions, value: Mrbr_UI_Bootstrap_Utilities_Sizing$Height | Array<Mrbr_UI_Bootstrap_Utilities_Sizing$Height> ): Mrbr_UI_Bootstrap_Controls_Control {
        let self = this
        self._setStyles(self._defaultElement, action, value, Mrbr_UI_Bootstrap_Utilities_Sizing$Height);
        return this;
    }
}

