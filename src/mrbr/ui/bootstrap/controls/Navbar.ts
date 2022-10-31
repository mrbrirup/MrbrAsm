import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";
import { Mrbr_UI_Bootstrap_Controls_Navbar$Brand } from "./Navbar$Brand";
import { Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas } from "./Navbar$OffCanvas";
import { Mrbr_UI_Bootstrap_Controls_Navbar$Toggler } from "./Navbar$Toggler";

export class Mrbr_UI_Bootstrap_Controls_Navbar extends Mrbr_UI_Controls_Control {
    //#region Private Static Fields
    public static readonly NAVBAR_NAME: string = "navbar";
    public static readonly NAVBAR_CONTAINER_NAME: string = "navbar_container";
    public static readonly NAVBAR_TOGGLER_NAME: string = "navbar_toggler";
    public static readonly NAVBAR_BRAND_NAME: string = "navbar_brand";
    //#endregion Private Static Fields

    //#region Public Enums
    public static readonly expandSizes = {
        sm: "navbar-expand-sm",
        md: "navbar-expand-md",
        lg: "navbar-expand-lg",
        xl: "navbar-expand-xl",
        xxl: "navbar-expand-xxl",
        none: ""
    } as const;

    public static readonly backgroundVariants = {
        light: "",
        dark: "navbar-dark"
    } as const;

    public static readonly backgroundColours = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        success: "bg-success",
        danger: "bg-danger",
        warning: "bg-warning",
        info: "bg-info",
        light: "bg-light",
        dark: "bg-dark",
        white: "bg-white",
        transparent: "bg-transparent"
    } as const;

    public static readonly placements = {
        default: "",
        fixedTop: "fixed-top",
        fixedBottom: "fixed-bottom",
        stickyTop: "sticky-top",
        stickyBottom: "sticky-bottom"
    } as const;


    //#endregion Public Enums

    //#region Private Fields
    _navbarControls: Map<string, Mrbr_UI_Bootstrap_Controls_INavbarControls> = new Map<string, Mrbr_UI_Bootstrap_Controls_INavbarControls>();
    private _expandSize: typeof Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes] = Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes.none;
    private _backgroundVariant: typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants] = Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants.light;
    private _backgroundColour: typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours] = Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours.primary;
    private _placement: typeof Mrbr_UI_Bootstrap_Controls_Navbar.placements[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.placements] = Mrbr_UI_Bootstrap_Controls_Navbar.placements.default;
    //#endregion Private Fields
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    //#region Private Methods
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Navbar { return Mrbr_UI_Bootstrap_Controls_Navbar; }
    //#endregion Private Methods

    //#region Public Properties
    public get navbarControls(): Map<string, Mrbr_UI_Bootstrap_Controls_INavbarControls> { return this._navbarControls; }
    public get backgroundColour(): typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours] {
        return this._backgroundColour;
    }
    public set backgroundColour(value: typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._backgroundColour) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self._backgroundColour = value;
    }
    public get expandSize(): typeof Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes] { return this._expandSize; }
    public set expandSize(value: typeof Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._expandSize) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self._expandSize = value;
    }
    public get backgroundVariant(): typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants] {
        return this._backgroundVariant;
    }
    public set backgroundVariant(value: typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._backgroundVariant) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self._backgroundVariant = value;
    }
    public get placement(): typeof Mrbr_UI_Bootstrap_Controls_Navbar.placements[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.placements] {
        return this._placement;
    }
    public set placement(value: typeof Mrbr_UI_Bootstrap_Controls_Navbar.placements[keyof typeof Mrbr_UI_Bootstrap_Controls_Navbar.placements]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._placement) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self._placement = value;
    }
    //#endregion Public Properties

    //#region Public Methods
    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Navbar> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Navbar>("Mrbr_UI_Bootstrap_Controls_Navbar:initialise");
        super.initialise()
            .then(superInitialised => {
                self.mrbrInstance.loadManifest(Mrbr_UI_Bootstrap_Controls_Navbar[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(async manifest => {
                        await self.setDefaultConfig();
                        self.rootElement = <HTMLElement>self.createElement(new self.$ctrlCfg(self.rootElementName, "nav", self.configuration(self.$cls.NAVBAR_NAME)
                            .Children([
                                <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.NAVBAR_CONTAINER_NAME, "div", self.configuration(self.$cls.NAVBAR_CONTAINER_NAME)))
                            ])));
                        self.defaultContainerElementName = self.$cls.NAVBAR_CONTAINER_NAME;
                        self.expandSize = self._expandSize;
                        self.backgroundColour = self._backgroundColour;
                        self.backgroundVariant = self._backgroundVariant;
                        self.placement = self._placement;

                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }

    public addBrand(brand: Mrbr_UI_Bootstrap_Controls_Navbar$Brand): Mrbr_UI_Bootstrap_Controls_Navbar {
        const
            self = this;
        brand.build(self);
        return self;
    }

    public addToggler(toggler: Mrbr_UI_Bootstrap_Controls_Navbar$Toggler | Mrbr_UI_Bootstrap_Controls_Navbar$OffCanvas): Mrbr_UI_Bootstrap_Controls_Navbar {
        const self = this;
        toggler.build(self);
        return self;
    }

    //#endregion Public Methods
    //#region Private Methods
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Navbar> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Navbar>("Mrbr_UI_Bootstrap_Controls_Navbar:setDefaultConfig");
        !self.hasConfiguration(self.$cls.NAVBAR_NAME) && self.defaultConfig.add(self.$cls.NAVBAR_NAME, new self.$ctrlPrm()
            .Classes("navbar"));
        !self.hasConfiguration(self.$cls.NAVBAR_CONTAINER_NAME) && self.defaultConfig.add(self.$cls.NAVBAR_CONTAINER_NAME, new self.$ctrlPrm()
            .Classes("container-fluid"));
        setDefaultConfigPromise.resolve(self);
        return setDefaultConfigPromise;
    }
    //#endregion Private Methods

}