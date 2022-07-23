import { Mrbr_UI_Controls_NavBar } from "./navbar";

export class Mrbr_UI_Controls_NavbarWindowManager extends Mrbr_UI_Controls_NavBar {
    menuButton: HTMLElement
    constructor(){
        super();


        this.menuButton = document.createElement("button");
        
        let span = document.createElement("span");
        this.style.addClasses(span, "navbar-toggler-icon")
        this.menuButton.appendChild(span);


        this.navbar.appendChild(this.menuButton);

    }
}