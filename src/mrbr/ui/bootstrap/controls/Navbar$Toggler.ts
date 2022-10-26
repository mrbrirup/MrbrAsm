import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";
import { Mrbr_UI_Bootstrap_Controls_Navbar } from "./Navbar";


export class Mrbr_UI_Bootstrap_Controls_Navbar$Toggler extends Mrbr_UI_Controls_Control implements Mrbr_UI_Bootstrap_Controls_INavbarControls {
    private static _navbar_toggler_config: Mrbr_UI_Controls_ControlConfigOptionalParameters
    private static _navbar_toggler_collapse_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    public static get NAVBAR_TOGGLER_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$Toggler;
        (!cls._navbar_toggler_config) && (cls._navbar_toggler_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("navbar-toggler")
            .Properties({ type: "button" })
            .Data({ bsToggle: "collapse" })
            .Template(`<span class="navbar-toggler-icon"></span>`)
            .Aria({ label: "Toggle navigation" })
        );
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_toggler_config);
    }

    public static get NAVBAR_TOGGLER_COLLAPSE_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$Toggler;
        (!cls._navbar_toggler_collapse_config) && (cls._navbar_toggler_collapse_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("collapse navbar-collapse"));
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_toggler_collapse_config);
    }
    private _active: boolean = false;
    private _disabled: boolean = false;
    private _name: string;
    private _navCollapseElement: HTMLDivElement;
    private _togglerElement: HTMLButtonElement;

    constructor(name: string) {
        super(name);
        this.name = name;
    }

    public get active(): boolean { return this._active; }
    public set active(value: boolean) { this._active = value; }
    public get defaultContainer(): HTMLDivElement { return this.navCollapseElement; }
    public get disabled(): boolean { return this._disabled; }
    public set disabled(value: boolean) {
        const self = this;
        [self.togglerElement, self.navCollapseElement].filter(element => !!element).forEach(element => element.classList.toggle("pe-none", value))
        self._disabled = value;
    }
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    public get navCollapseElement(): HTMLDivElement { return this._navCollapseElement; }
    public set navCollapseElement(value: HTMLDivElement) { this._navCollapseElement = value; }
    public get togglerElement(): HTMLButtonElement { return this._togglerElement; }
    public set togglerElement(value: HTMLButtonElement) { this._togglerElement = value; }


    public initialise<T>(...args): Mrbr_System_MrbrPromise<T> {
        const self = this,
            initialisePromise = self.$promise.create("initialise");
        super.initialise(args)
            .then(() => {
                self.$mrbr.loadManifest(Mrbr_UI_Bootstrap_Controls_Navbar$Toggler[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(() => {
                        initialisePromise.resolve(self);
                    })
            })
            .catch((error) => {
                initialisePromise.reject(error);
            });
        return initialisePromise;
    }



    public build(hostNavbar: Mrbr_UI_Bootstrap_Controls_Navbar, hostElement: HTMLElement = hostNavbar.defaultContainerElement): Mrbr_UI_Bootstrap_Controls_Navbar$Toggler {

        const cls = Mrbr_UI_Bootstrap_Controls_Navbar$Toggler,
            self = this,
            id = hostNavbar.$cls.createId(self.name),
            togglerId = `${id}_toggler`,
            collapseId = `${id}_collapse`,
            togglerName = `${self.name}_toggler`,
            collapseName = `${self.name}_collapse`;
        self.togglerElement = <HTMLButtonElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(togglerName, "button",
            cls.NAVBAR_TOGGLER_CONFIG
                .Id(togglerId)
                .Data({ bsTarget: `#${collapseId}` })
                .Aria({ controls: collapseId, expanded: "false" })
        ))
        self.navCollapseElement = <HTMLDivElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(collapseName, "div", cls.NAVBAR_TOGGLER_COLLAPSE_CONFIG
            .Id(collapseId)
        ));
        hostElement.appendChild(self.togglerElement);
        hostElement.appendChild(self.navCollapseElement);
        hostNavbar.navbarControls.set(self.name, self);
        hostNavbar.defaultContainerElementName = collapseName;
        self.disabled = self._disabled;
        return this;
    }
}