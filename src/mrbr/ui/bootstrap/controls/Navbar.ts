import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_Backgrounds } from "../utilities/backgrounds";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";
import { Mrbr_UI_Bootstrap_Controls_NavbarBrand } from "./NavbarBrand";
import { Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas } from "./NavbarOffCanvas";
import { Mrbr_UI_Bootstrap_Controls_NavbarToggler } from "./NavbarToggler";
import { Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants } from "./NavbarBackgroundVariants";
import { Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes } from "./NavBarExpandSizes";
import { Mrbr_UI_Bootstrap_Controls_NavbarPlacements } from "./NavbarPlacements";

export class Mrbr_UI_Bootstrap_Controls_Navbar extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Private Static Fields
    public static readonly NAVBAR_NAME: string = "navbar";
    public static readonly NAVBAR_CONTAINER_NAME: string = "navbar_container";
    public static readonly NAVBAR_TOGGLER_NAME: string = "navbar_toggler";
    public static readonly NAVBAR_BRAND_NAME: string = "navbar_brand";
    //#endregion Private Static Fields

    //#region Private Fields
    private _navbarControls: Map<string, Mrbr_UI_Bootstrap_Controls_INavbarControls>;
    private _expandSize: Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes;
    private _backgroundVariant: Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants;
    private _backgroundColour: Mrbr_UI_Bootstrap_Utilities_Backgrounds;
    private _placement: Mrbr_UI_Bootstrap_Controls_NavbarPlacements;
    //#endregion Private Fields

    //#region Type Aliases
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Navbar { return this.$bsc.Navbar as typeof Mrbr_UI_Bootstrap_Controls_Navbar; }
    public get $nbess(): typeof Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes { return this.$bsc.NavbarExpandSizes as typeof Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes; }
    public get $nbbvs(): typeof Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants { return this.$bsc.NavbarBackgroundVariants as typeof Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants; }
    public get $nbps(): typeof Mrbr_UI_Bootstrap_Controls_NavbarPlacements { return this.$bsc.NavbarPlacements as typeof Mrbr_UI_Bootstrap_Controls_NavbarPlacements; }
    public get $bubs(): typeof Mrbr_UI_Bootstrap_Utilities_Backgrounds { return Mrbr_UI_Bootstrap_Utilities_Backgrounds; }


    //#endregion Type Aliases

    constructor(rootElementName?: string) {
        super(rootElementName);
    }
    //#region Private Methods
    //#endregion Private Methods

    //#region Public Properties
    public get navbarControls(): Map<string, Mrbr_UI_Bootstrap_Controls_INavbarControls> { return this._navbarControls ??= new Map<string, Mrbr_UI_Bootstrap_Controls_INavbarControls>(); }
    public get backgroundColour(): Mrbr_UI_Bootstrap_Utilities_Backgrounds { return this._backgroundColour ??= this.$bubs.primary }
    public set backgroundColour(value: Mrbr_UI_Bootstrap_Utilities_Backgrounds) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this._backgroundColour, value]));
        this._backgroundColour = value;
    }
    public get expandSize(): Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes { return this._expandSize ??= this.$nbess.none; }
    public set expandSize(value: Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this._expandSize, value]));
        this._expandSize = value;
    }
    public get backgroundVariant(): Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants { return this._backgroundVariant ??= this.$nbbvs.light; }
    public set backgroundVariant(value: Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this._backgroundVariant, value]));
        this._backgroundVariant = value;
    }
    public get placement(): Mrbr_UI_Bootstrap_Controls_NavbarPlacements { return this._placement ??= this.$nbps.default; }
    public set placement(value: Mrbr_UI_Bootstrap_Controls_NavbarPlacements) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this._placement, value]));
        this._placement = value;
    }
    //#endregion Public Properties

    //#region Public Methods
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Navbar> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Navbar>(`${controlName}:initialise`),
            cls = self.$cls,
            ctrlCfg = self.$ctrlCfg;
        super.initialise()
            .then(async _ => {
                await self.loadManifest(cls)
                await self.setDefaultConfig();
                self.createElement(new ctrlCfg(self.rootElementName, self.$htmlt.nav, self.elementConfig.getConfig(cls.NAVBAR_NAME)
                    .Children([
                        <HTMLElement>self.createElement(new ctrlCfg(cls.NAVBAR_CONTAINER_NAME, self.$htmlt.div, self.elementConfig.getConfig(cls.NAVBAR_CONTAINER_NAME)))
                    ])));
                self.defaultContainerElementName = cls.NAVBAR_CONTAINER_NAME;
                self.expandSize = self.expandSize;
                self.backgroundColour = self.backgroundColour;
                self.backgroundVariant = self.backgroundVariant;
                self.placement = self.placement;

                initialisePromise.resolve(self);

            })
        return initialisePromise;
    }

    public addBrand(brand: Mrbr_UI_Bootstrap_Controls_NavbarBrand): Mrbr_UI_Bootstrap_Controls_Navbar {
        brand.build(this);
        return this;
    }

    public addToggler(toggler: Mrbr_UI_Bootstrap_Controls_NavbarToggler | Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas): Mrbr_UI_Bootstrap_Controls_Navbar {
        toggler.build(this);
        return this;
    }

    //#endregion Public Methods
    //#region Private Methods
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Navbar> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Navbar>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(_ => {
                const
                    sine = self.elementConfig.setIfNotExist.bind(self.elementConfig),
                    cls = self.$cls,
                    ctrlPrm = self.$ctrlPrm;
                self.elementConfig.controlName(controlName);
                sine(cls.NAVBAR_NAME, new ctrlPrm()
                    .Classes("navbar"))
                sine(cls.NAVBAR_CONTAINER_NAME, new ctrlPrm()
                    .Classes("container-fluid"));
                setDefaultConfigPromise.resolve(self);
            });
        return setDefaultConfigPromise;
    }
    //#endregion Private Methods
}