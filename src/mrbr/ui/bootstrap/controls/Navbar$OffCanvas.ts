import { Mrbr_IO_ManifestPromise } from "../../../io/ManifestPromise";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
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
    constructor(rootElementName: string) {
        super(rootElementName)
        this.name = rootElementName;
    }


    public override initialise<T>(...args): Mrbr_System_MrbrPromise<T> {
        const self = this,
            togglerName = self.togglerName,
            id = self.$cls.createId(togglerName),
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas>("Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas:initialise");
        super.togglerId = `${id}_toggler`;
        super.offCanvasId = `${id}_offcanvas`;
        super.initialise()
            .then(manifest => {
                self.mrbrInstance.loadManifest(Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(_ => {

                        super.setDefaultConfig()
                            .then(_ => {
                                self.togglerElement = <HTMLButtonElement>self.createElement(new self.$ctrlCfg(togglerName, "button", self.NAVBAR_OFFCANVAS_TOGGLER_CONFIG
                                    .Id(self.togglerId)
                                    .Data({ bsTarget: `#${super.offCanvasId}` })
                                    .Aria({ controls: super.offCanvasId })));
                                super.initialise(args)
                                    .then(_ => {
                                        initialisePromise.resolve(self);
                                    })
                            });
                    })
            });
        return initialisePromise;
    }

    active: boolean;
    build(hostNavbar: Mrbr_UI_Bootstrap_Controls_Navbar, hostElement?: HTMLElement): Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas {
        const self = this;

        hostNavbar.defaultContainerElement.appendChild(self.togglerElement);
        hostNavbar.defaultContainerElement.appendChild(self.offCanvasElement);
        hostNavbar.navbarControls.set(self.name, self);
        self.defaultContainerElementName = `${self.rootElementName}_body`
        return this;
    }

}