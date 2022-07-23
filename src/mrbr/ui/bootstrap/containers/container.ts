import { Mrbr_UI_Html_StyleClasses } from "../../html/StyleClasses";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Height } from "../utilities/sizing$height";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Width } from "../utilities/sizing$width";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "./container$breakpoints";

export class Mrbr_UI_Bootstrap_Containers_Container {
    _containerType: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.containerFluid;
    _containerElement: HTMLElement;
    _width: Mrbr_UI_Bootstrap_Utilities_Sizing$Width
    _height: Mrbr_UI_Bootstrap_Utilities_Sizing$Height
    style = Mrbr_UI_Html_StyleClasses;
    constructor() {
        const self = this;
        self._containerElement = document.createElement("div");
    }
    get container() { return this._containerElement }
    set container(value) { this._containerElement = value; }
    get containerType(): Mrbr_UI_Bootstrap_Containers_Container$Breakpoints { return this._containerType; }
    set containerType(value: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints) {
        const self = this,
            element = self._containerElement,
            style = self.style,
            breakPoints = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints;
        if (style.hasClass(element, value)) { return };
        Object
            .keys(breakPoints)
            .forEach(key => {
                if (style.hasClass(element, key)) { style.removeClass(element, key) }
            })
        this._containerType = value;
        style.addClasses(element, value)
    }
    get width() { return this._width }
    set width(value) {
        this._width = value;
        const self = this,
            element = self._containerElement,
            style = self.style,
            widths = Mrbr_UI_Bootstrap_Utilities_Sizing$Width;
        if (style.hasClass(element, value)) { return };
        Object
            .keys(widths)
            .forEach(key => {
                if (style.hasClass(element, key)) { style.removeClass(element, key) }
            })
        style.addClasses(element, value)

    }
    get height() { return this._height }
    set height(value) {
        this._height = value;
        const self = this,
            element = self._containerElement,
            style = self.style,
            heights = Mrbr_UI_Bootstrap_Utilities_Sizing$Height;
        if (style.hasClass(element, value)) { return };
        Object
            .keys(heights)
            .forEach(key => {
                if (style.hasClass(element, key)) { style.removeClass(element, key) }
            })
        style.addClasses(element, value)

    }
}