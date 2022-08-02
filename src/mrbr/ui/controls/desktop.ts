import { Mrbr_UI_Bootstrap_Containers_Container } from "../bootstrap/containers/container";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "../bootstrap/containers/container$breakpoints";
import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../bootstrap/controls/classActions";
import { Mrbr_UI_Bootstrap_Controls_Control } from "../bootstrap/controls/control";
import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "../bootstrap/controls/ControlConfig";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Height } from "../bootstrap/utilities/sizing$height";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Width } from "../bootstrap/utilities/sizing$width";
import { Mrbr_UI_Controls_NavbarWindowManager } from "./navbarWindowManager";

export class Mrbr_UI_Controls_Desktop extends Mrbr_UI_Bootstrap_Containers_Container {
    navbar: Mrbr_UI_Controls_NavbarWindowManager;
    constructor(rootElementName: string) {
        super(rootElementName);
        let self = this,
            classActions = Mrbr_UI_Bootstrap_Controls_ClassActions;
        self.containerType = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.containerFluid;
        self.height = Mrbr_UI_Bootstrap_Utilities_Sizing$Height.viewHeight100;
        self.width = Mrbr_UI_Bootstrap_Utilities_Sizing$Width.viewWidth100;
        self.classes(self.rootElement, classActions.Add, ["container-fluid", "px-0", "d-flex", "flex-column"]);
        self.createElement( new Mrbr_UI_Bootstrap_Controls_ControlConfig("windowContainer", "div"))
        let windowContainer = self.elements["windowContainer"];
        self.navbar = new Mrbr_UI_Controls_NavbarWindowManager(Mrbr_UI_Bootstrap_Controls_Control.createId("navbar"))
        windowContainer.id = Mrbr_UI_Bootstrap_Controls_Control.createId("windowContainer");
        self.classes(windowContainer, classActions.Add, [
            "h-100",
            "w-100",
            "overflow-hidden"
        ])
        self.rootElement.appendChild(windowContainer)
        self.rootElement.appendChild(self.navbar.rootElement)

        windowContainer.style.position = "relative";
        self.rootElement.classList.add("mrbr_fadeIn");
        document.body.appendChild(self.rootElement);
    }
}