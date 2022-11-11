import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "../bootstrap/containers/container$breakpoints";
import { Mrbr_UI_Controls_ClassActions } from "./classActions";
import { Mrbr_UI_Controls_Control } from "./Control";
import { Mrbr_UI_Controls_ControlConfig } from "./ControlConfig";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Height } from "../bootstrap/utilities/sizing$height";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Width } from "../bootstrap/utilities/sizing$width";
import { Mrbr_UI_Controls_NavbarWindowManager } from "./navbarWindowManager";
import { Mrbr_UI_Bootstrap_Containers_Container } from "../bootstrap/containers/Container";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";

export class Mrbr_UI_Controls_Desktop extends Mrbr_UI_Bootstrap_Containers_Container {
    navbar: Mrbr_UI_Controls_NavbarWindowManager;
    constructor(rootElementName: string) {
        super(rootElementName);
        let self = this,
            classActions = Mrbr_UI_Controls_ClassActions;
        self.sizing = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.fluid;
        //self.height = Mrbr_UI_Bootstrap_Utilities_Sizing$Height.viewHeight100;
        //self.width = Mrbr_UI_Bootstrap_Utilities_Sizing$Width.viewWidth100;
        self.classes(self.rootElement, classActions.Add, ["container-fluid", "px-0", "d-flex", "flex-column"]);
        self.createElement(new Mrbr_UI_Controls_ControlConfig("windowContainer", "div",
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes(["h-100", "w-100", "overflow-hidden"])
                .Styles({ position: "relative" })
                .Attributes({ id: Mrbr_UI_Controls_Control.createId("windowContainer") })
        ))
        let windowContainer = self.windowContainer;
        self.navbar = new Mrbr_UI_Controls_NavbarWindowManager(Mrbr_UI_Controls_Control.createId("navbar"))
        self.rootElement.appendChild(windowContainer)
        self.rootElement.appendChild(self.navbar.rootElement)
        self.rootElement.classList.add("mrbr_fadeIn");
        document.body.appendChild(self.rootElement);
    }
    public get windowContainer(): HTMLElement {
        return this.elements["windowContainer"];;
    }
    public set windowContainer(value: HTMLElement) {
        this.elements["windowContainer"] = value;
    }
}