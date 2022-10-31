import { Mrbr_UI_Controls_Control } from "../../controls/Control";

export class Mrbr_UI_Bootstrap_Controls_DropdownItem extends Mrbr_UI_Controls_Control {
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    private _textOnly: boolean = false;
    private _menuItem: boolean = false;
    private _active: boolean = false;
    private _disabled: boolean = false;
    private _header: boolean = false;
    private _divider: boolean = false;
    private _form: boolean = false;
}