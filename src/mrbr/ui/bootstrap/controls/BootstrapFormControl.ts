import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";

export class Mrbr_UI_Bootstrap_Controls_BootstrapFormControl extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    public static readonly FORM_ELEMENT_NAME: string = "form_element";
    private _formElement: HTMLElement
    constructor(rootElementName?: string) {
        super(rootElementName);
    }
    get formElement(): HTMLElement {
        return this._formElement;
    }
}