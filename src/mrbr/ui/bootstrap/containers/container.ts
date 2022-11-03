import { Mrbr_UI_Html_StyleClasses } from "../../html/StyleClasses";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Height } from "../utilities/sizing$height";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Width } from "../utilities/sizing$width";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "./container$breakpoints";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { MrbrBase } from "../../../system/MrbrBase";

export class Mrbr_UI_Bootstrap_Containers_Container extends Mrbr_UI_Controls_Control {
    _containerType: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.containerFluid;
    _width: Mrbr_UI_Bootstrap_Utilities_Sizing$Width
    _height: Mrbr_UI_Bootstrap_Utilities_Sizing$Height
    style = Mrbr_UI_Html_StyleClasses;
    constructor(rootElementName: string) {
        super(rootElementName);
        const self = this;
        self.createElement(new Mrbr_UI_Controls_ControlConfig(self.rootElementName, "div"))
    }
    get containerType(): Mrbr_UI_Bootstrap_Containers_Container$Breakpoints { return this._containerType; }
    set containerType(value: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints) {
        const self = this,
            element = self.rootElement,
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
            element = self.rootElement,
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
            element = self.rootElement,
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
    initialise(...args: any[]): Mrbr_System_Promise<any> {
        const self = this,
            initialisePromise = Mrbr_System_Promise.create<Mrbr_UI_Controls_Control>("Mrbr_UI_Controls_Control:initialise");
        super.initialise(args)
            .then(result => {
                const manifestPromise = MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST]);
                manifestPromise
                    .then(manifest => {
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }
}