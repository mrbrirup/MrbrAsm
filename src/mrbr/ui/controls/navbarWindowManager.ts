import { Mrbr_IO_File } from "../../io/File";
import { Mrbr_IO_FileType } from "../../io/FileType";
import { MrbrBase } from "../../system/MrbrBase";
import { Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu } from "../bootstrap/navigation/menus/MainMenu";// exclude
import { Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar } from "../bootstrap/navigation/navbar/navbar";
import { Mrbr_UI_Controls_NavBar } from "./navbar";

export class Mrbr_UI_Controls_NavbarWindowManager extends Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar {
    menuButton: HTMLElement
    menuImage: HTMLElement;
    constructor() {
        super();


        this.menuImage = document.createElement("img");
        this.menuImage.setAttribute("src", "/htmlTest/images/forms/mainMenu.svg");

        this.menuImage.classList.add("w-100");
        this.menuImage.classList.add("h-100");
        this.menuButton = document.createElement("button");
        //this.style.addClasses(this.menuButton,"navbar-toggler")

        this.style.addClasses(this.menuButton, "btn")
        this.style.addClasses(this.menuButton, "btn-primary")
        this.style.addClasses(this.menuButton, "mx-1")
        //let span = document.createElement("span");
        //this.style.addClasses(span, "navbar-toggler-icon")
        //this.style.addClasses(span, "bg-dark")
        this.menuButton.appendChild(this.menuImage);


        this.navbar.appendChild(this.menuButton);

        this.menuButton.addEventListener("click", () => {
            const _mrbr = MrbrBase.mrbrInstance;
            MrbrBase.mrbrInstance.loadManifest([
                new Mrbr_IO_File(Mrbr_IO_FileType.Component, null, "Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu", "js")
            ])
                .then(result => {
                    var v = new Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu();
                    v.show();
                    setTimeout(() => {
                        v.hide();
                        setTimeout(() => {
                            v.dispose();

                        }, 1000);
                    }, 10000);
                })
        })
    }
}