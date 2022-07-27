import { Mrbr_UI_Bootstrap_Forms_Dialog } from "../ui/bootstrap/Forms/Dialog";
import { Mrbr_UI_Controls_Desktop } from "../ui/controls/desktop"


export class Mrbr_Tests_Application {
    container = null
    desktop: Mrbr_UI_Controls_Desktop
    constructor() {
        //this.container = new Mrbr_UI_Bootstrap_Containers_Container(document.body);
        this.desktop = new Mrbr_UI_Controls_Desktop();
        let form = new Mrbr_UI_Bootstrap_Forms_Dialog({
            host: this.desktop.windowContainer
        });
        
    }
}