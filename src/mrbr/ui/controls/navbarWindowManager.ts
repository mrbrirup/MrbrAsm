import { Mrbr_IO_File } from "../../io/File";
import { MrbrBase } from "../../system/MrbrBase";
import { Mrbr_UI_Controls_ClassActions } from "./classActions";
import { Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu } from "../bootstrap/navigation/menus/MainMenu";//optional
import { Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar } from "../bootstrap/navigation/navbar/navbar";

export class Mrbr_UI_Controls_NavbarWindowManager extends Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar {
    menuButton: HTMLElement
    menuImage: HTMLElement;
    mainMenu: Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu;
    constructor(rootElementName: string) {
        super(rootElementName);


        this.menuImage = document.createElement("img");
        this.menuImage.setAttribute("src", "/htmlTest/images/forms/mainMenu.svg");

        this.menuImage.classList.add("w-100");
        this.menuImage.classList.add("h-100");
        this.menuButton = document.createElement("button");
        //this.style.addClasses(this.menuButton,"navbar-toggler")

        this.classes(this.menuButton, Mrbr_UI_Controls_ClassActions.Add, ["btn",
            "btn-primary",
            "mx-1"]);
        this.menuButton.appendChild(this.menuImage);

        const
            _mrbr = MrbrBase.mrbrInstance,
            self = this;
        MrbrBase.mrbrInstance.loadManifest([
            Mrbr_IO_File.component(Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu)
        ])
            .promise
            .then(_ => {
                //var mrbr = _mrbr;
                let id = Mrbr_UI_Controls_NavbarWindowManager.createId("mainMenu");
                self.mainMenu = new Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu("mainMenu");
                self.dataset(self.menuButton, {
                    bsToggle: "offcanvas",
                    bsTarget: `#${self.mainMenu.menuId}`
                })
                self.menuButton.setAttribute("aria-controls", "offcanvas")
                self.rootElement.appendChild(this.menuButton);
            })
    }
}