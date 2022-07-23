import { Mrbr_UI_Bootstrap_Containers_Container } from "../bootstrap/containers/container";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "../bootstrap/containers/container$breakpoints";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Height } from "../bootstrap/utilities/sizing$height";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Width } from "../bootstrap/utilities/sizing$width";
import { Mrbr_UI_Controls_Footer } from "./footer";
import { Mrbr_UI_Controls_NavbarWindowManager } from "./navbarWindowManager";

export class Mrbr_UI_Controls_Desktop extends EventTarget {
    desktopContainer: Mrbr_UI_Bootstrap_Containers_Container
    navbar: Mrbr_UI_Controls_NavbarWindowManager;
    constructor() {
        super();
        let self = this;
        self.desktopContainer = new Mrbr_UI_Bootstrap_Containers_Container();
        let desktopContainer = self.desktopContainer;
        desktopContainer.containerType = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.containerFluid;
        desktopContainer.height = Mrbr_UI_Bootstrap_Utilities_Sizing$Height.viewHeight100;
        desktopContainer.width = Mrbr_UI_Bootstrap_Utilities_Sizing$Width.viewWidth100;
        desktopContainer.style.addClasses(desktopContainer.container, "px-0");

        self.navbar = new Mrbr_UI_Controls_NavbarWindowManager()
        //self.footer = new Mrbr_UI_Controls_Footer();
        desktopContainer.container.appendChild(self.navbar.navbar)

        document.body.appendChild(desktopContainer.container);
    }
}