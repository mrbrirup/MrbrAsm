import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";
import { Mrbr_UI_Bootstrap_Controls_Navbar } from "./Navbar";
import { Mrbr_UI_Bootstrap_Controls_OffCanvas } from "./OffCanvas";

export class Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas extends Mrbr_UI_Bootstrap_Controls_OffCanvas implements Mrbr_UI_Bootstrap_Controls_INavbarControls {
    private static _navbar_offcanvas_toggler_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;

    public get NAVBAR_OFFCANVAS_TOGGLER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas;
        (!cls._navbar_offcanvas_toggler_config) && (cls._navbar_offcanvas_toggler_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("navbar-toggler")
            .Attributes({ "type": "button" })
            .Properties({ type: "button" })
            .Data({ bsToggle: "offcanvas" })
            .Template(`<span class="navbar-toggler-icon"></span>`))

        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_offcanvas_toggler_config);
    }
    constructor(name: string) {
        super(name)
        this.name = name;
    }
    active: boolean;
    build(hostNavbar: Mrbr_UI_Bootstrap_Controls_Navbar, hostElement?: HTMLElement): Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas {
        const self = this;

        hostNavbar.defaultContainerElement.appendChild(self.togglerElement);
        hostNavbar.defaultContainerElement.appendChild(self.offCanvasElement);
        hostNavbar.navbarControls.set(self.name, self);

        return this;
    }

}