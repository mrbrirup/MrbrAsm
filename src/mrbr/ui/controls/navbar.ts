import { Mrbr_UI_Html_StyleClasses } from "../html/StyleClasses";// exclude

export class Mrbr_UI_Controls_NavBar extends EventTarget {
    navbar: HTMLElement
    style: typeof Mrbr_UI_Html_StyleClasses
    constructor() {
        super();
        this.style = Mrbr_UI_Html_StyleClasses
        this.navbar = document.createElement("nav");
        this.style.addClasses(this.navbar, ["navbar", "navbar-expand-lg", "navbar-light", "bg-dark", "fixed-bottom"]);
    }
}