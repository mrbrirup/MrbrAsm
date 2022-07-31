import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Bootstrap_Controls_Control } from "../../controls/control";

export class Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu extends Mrbr_UI_Bootstrap_Controls_Control {
    _backdrop: HTMLElement;
    constructor() {
        super();

    }
    show() {
        this._backdrop = document.createElement("div");
        this.classes(this._backdrop, Mrbr_UI_Bootstrap_Controls_ClassActions.Add, "modal-backdrop fade show");        
        document.body.appendChild(this._backdrop);
    }
    hide() {
        this.classes(this._backdrop, Mrbr_UI_Bootstrap_Controls_ClassActions.Swap, ["show", "hide"]);
    }
    dispose(){
        document.body.removeChild(this._backdrop);
        this._backdrop = null;
    }
}