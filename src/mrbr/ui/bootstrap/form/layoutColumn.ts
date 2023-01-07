import { Mrbr_UI_Controls_IRootElement } from "../../controls/IRootElement";
import { Mrbr_UI_HTML_ElementTags } from "../../html/ElementTags";

/**
 * Bootstrap Form Layout Column
 * @date 07/01/2023 - 08:30:03
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_LayoutColumn
 * @typedef {Mrbr_UI_Bootstrap_Form_LayoutColumn}
 * @implements {Mrbr_UI_Controls_IRootElement}
 */
export class Mrbr_UI_Bootstrap_Form_LayoutColumn implements Mrbr_UI_Controls_IRootElement {
    private _id: string | number;
    private _rootElement: HTMLElement;
    constructor(id: string | number) {
        this._id = id;
        this._rootElement = document.createElement(Mrbr_UI_HTML_ElementTags.div);
    }
    public get id(): string | number { return this._id; }
    public set id(value: string | number) { this._id = value; }
    public get rootElement(): HTMLElement { return this._rootElement; }
    public set rootElement(value: HTMLElement) { this._rootElement = value; }
}
