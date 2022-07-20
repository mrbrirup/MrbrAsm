import { Mrbr_UI_Bootstrap_Containers_Container } from "../ui/bootstrap/containers/container";

export class Mrbr_Tests_Application {
    container = null
    constructor() {        
        this.container = new Mrbr_UI_Bootstrap_Containers_Container(document.body);
    }
}