import { Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar } from "../bootstrap/navigation/navbar/navbar";
import { Mrbr_UI_Controls_NavBar } from "./navbar";

export class Mrbr_UI_Controls_NavbarWindowManager extends Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar {
    menuButton: HTMLElement
    constructor(){
        super();


        this.menuButton = document.createElement("button");
        this.style.addClasses(this.menuButton,"navbar-toggler")
        this.style.addClasses(this.menuButton,"mx-1")
        let span = document.createElement("span");
        this.style.addClasses(span, "navbar-toggler-icon")
        this.style.addClasses(span, "bg-dark")
        this.menuButton.appendChild(span);


        this.navbar.appendChild(this.menuButton);

    }
}