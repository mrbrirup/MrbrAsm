import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";
import { Mrbr_UI_Bootstrap_Controls_Navbar } from "./Navbar";
import { Mrbr_UI_Bootstrap_Controls_OffCanvas } from "./OffCanvas";

/**
 * Create NavBar with OffCanvas Menu
 * @date 05/12/2022 - 04:16:59
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas
 * @typedef {Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas}
 * @extends {Mrbr_UI_Bootstrap_Controls_OffCanvas}
 * @implements {Mrbr_UI_Bootstrap_Controls_INavbarControls}
 */
export class Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas extends Mrbr_UI_Bootstrap_Controls_OffCanvas implements Mrbr_UI_Bootstrap_Controls_INavbarControls {

    /**
     * Internal Navbar OffCanvas Control Toggler Name
     * @date 05/12/2022 - 04:17:30
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly NAVBAR_OFFCANVAS_TOGGLER: string = "navbar_offcanvas_toggler";

    /**
     * NaavbarOffCanvas Type Alias 
     * @date 05/12/2022 - 04:18:04
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas { return this.$bsc.NavbarOffCanvas as typeof Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas; }

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas.
     * @date 05/12/2022 - 04:18:37
     *
     * @constructor
     */
    constructor() {
        super()
    }


    /**
     * Initialise NavBarOffCanvas Control, load Manifest and set properties
     * @date 05/12/2022 - 04:18:46
     *
     * @public
     * @override
     * @template T
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<T>}
     */
    public override initialise<T>(...args): Mrbr_System_Promise<T> {
        const self = this,
            togglerName = self.togglerName,
            id = self.$cls.createId(togglerName),
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas>(`${controlName}:initialise`),
            cls = self.$cls;
        self.togglerId = `${id}_toggler`;
        self.offCanvasId = `${id}_offcanvas`;
        super.initialise()
            .then(async _ => {
                await self.loadManifest(cls);
                await self.setDefaultConfig();
                self.togglerElement = <HTMLButtonElement>self.createElement(new self.$ctrlCfg(togglerName, "button", self.elementConfig.getConfig(cls.NAVBAR_OFFCANVAS_TOGGLER)
                    .Id(self.togglerId)
                    .Data({ bsTarget: `#${self.offCanvasId}` })
                    .Aria({ controls: self.offCanvasId })));
                initialisePromise.resolve(self);
            });
        return initialisePromise;
    }

    /**
     * Build Toggler and OffCanvas
     * @date 05/12/2022 - 04:20:48
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_Navbar} hostNavbar
     * @param {?HTMLElement} [hostElement]
     * @returns {Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas}
     */
    public build(hostNavbar: Mrbr_UI_Bootstrap_Controls_Navbar, hostElement?: HTMLElement): Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas {
        const self = this;

        hostNavbar.defaultContainerElement.appendChild(self.togglerElement);
        hostNavbar.defaultContainerElement.appendChild(self.offCanvasElement);
        hostNavbar.navbarControls.set(self.name, self);
        self.defaultContainerElementName = `${self.rootElementName}_body`
        return this;
    }

    /**
     * Set Default Config
     * @date 05/12/2022 - 04:21:13
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas>}
     */
    public setDefaultConfig<T>(): Mrbr_System_Promise<T> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            defaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(_ => {
                const cls = self.$cls;
                self.elementConfig.controlName(controlName)
                    .setIfNotExist(cls.NAVBAR_OFFCANVAS_TOGGLER, new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                        .Classes("navbar-toggler")
                        .Attributes({ "type": "button" })
                        .Properties({ type: "button" })
                        .Data({ bsToggle: "offcanvas" })
                        .Template(`<span class="navbar-toggler-icon"></span>`));
                defaultConfigPromise.resolve(self);
            });
        return defaultConfigPromise;
    }
}