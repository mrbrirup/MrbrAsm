import { Mrbr_UI_HTML_ElementTags } from "./ElementTags";

export class Mrbr_UI_HTML_Element {
    public get $htmlTags(): typeof Mrbr_UI_HTML_ElementTags { return Mrbr_UI_HTML_ElementTags; }
    _element: HTMLElement;
    constructor() {
    }
    get element(): HTMLElement {
        return this._element;
    }
    set element(value: HTMLElement) {
        this._element = value;
    }
}