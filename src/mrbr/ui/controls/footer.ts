import { Mrbr_UI_Html_StyleClasses } from "../html/StyleClasses";

export class Mrbr_UI_Controls_Footer extends EventTarget {
    footer: HTMLElement;
    style = Mrbr_UI_Html_StyleClasses;
    constructor() {
        super();
        const self = this,
            selfStyle = self.style;
        self.footer = document.createElement("footer");
        selfStyle.addClasses(self.footer, ["footer", "vw-100", "mt-auto", "py-3", "bg-dark", "fixed-bottom"])
    }
}