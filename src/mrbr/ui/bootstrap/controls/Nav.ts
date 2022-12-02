import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Nav extends Mrbr_UI_Controls_Control {

    public static readonly NAV_NAME: string = "nav";
    public static readonly NAV_LINK_NAME: string = "nav_link";

    private static _nav_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _nav_link_listitem_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _nav_link_nav_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;

    public static justifyPositions = {
        start: "justify-content-start",
        end: "justify-content-end",
        center: "justify-content-center",
        vertical: "flex-column"
    } as const;

    public static navContainerTypes = {
        ul: "ul",
        ol: "ol",
        nav: "nav"
    } as const;

    public static navStyles = {
        tabs: "nav-tabs",
        pills: "nav-pills",
        links: ""
    } as const;

    public static fillStyles = {
        fill: "nav-fill",
        justified: "nav-justified",
        default: ""
    } as const;

    public static responseSizes = {
        sm: "flex-sm-row",
        md: "flex-md-row",
        lg: "flex-lg-row",
        xl: "flex-xl-row",
        xxl: "flex-xxl-row",
        default: ""
    } as const;


    private _fillStyle: typeof Mrbr_UI_Bootstrap_Controls_Nav.fillStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.fillStyles] = Mrbr_UI_Bootstrap_Controls_Nav.fillStyles.default;

    private _responseSize: typeof Mrbr_UI_Bootstrap_Controls_Nav.responseSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.responseSizes] = Mrbr_UI_Bootstrap_Controls_Nav.responseSizes.default;


    private _justifyPosition: typeof Mrbr_UI_Bootstrap_Controls_Nav.justifyPositions[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.justifyPositions] = Mrbr_UI_Bootstrap_Controls_Nav.justifyPositions.start;
    private _navContainerType: typeof Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes] = Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes.ul;

    private _navStyle: typeof Mrbr_UI_Bootstrap_Controls_Nav.navStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.navStyles] = Mrbr_UI_Bootstrap_Controls_Nav.navStyles.links;

    public get navContainerType(): typeof Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes] { return this._navContainerType; }

    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Nav { return Mrbr_UI_Bootstrap_Controls_Nav; }

    public get navConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Nav;
        (!cls._nav_config) && (cls._nav_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("nav"));
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._nav_config);
    }

    public get navLinkListItemConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Nav;
        (!cls._nav_link_listitem_config) && (cls._nav_link_listitem_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("nav-item")
            .Template(`<a class="nav-link" href="#"></a>`));
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._nav_link_listitem_config);
    }

    public get navLinkNavConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_Nav;
        (!cls._nav_link_nav_config) && (cls._nav_link_nav_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("nav-link"));
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._nav_link_nav_config);
    }

    public get navStyle(): typeof Mrbr_UI_Bootstrap_Controls_Nav.navStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.navStyles] { return this._navStyle; }
    public set navStyle(value: typeof Mrbr_UI_Bootstrap_Controls_Nav.navStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.navStyles]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._navStyle) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self._navStyle = value;
    }


    constructor(rootElementName: string, navContainerType: typeof Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes] = Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes.ul) {
        super(rootElementName);
        const self = this;
        self._navContainerType = navContainerType;
    }

    public get fillStyle(): typeof Mrbr_UI_Bootstrap_Controls_Nav.fillStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.fillStyles] { return this._fillStyle; }
    public set fillStyle(value: typeof Mrbr_UI_Bootstrap_Controls_Nav.fillStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.fillStyles]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._fillStyle) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self._fillStyle = value;
    }

    public get justifyPosition(): typeof Mrbr_UI_Bootstrap_Controls_Nav.justifyPositions[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.justifyPositions] { return this._justifyPosition; }
    public set justifyPosition(value: typeof Mrbr_UI_Bootstrap_Controls_Nav.justifyPositions[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.justifyPositions]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._justifyPosition) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self._justifyPosition = value;
    }
    public get responseSize(): typeof Mrbr_UI_Bootstrap_Controls_Nav.responseSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.responseSizes] { return this._responseSize; }
    public set responseSize(value: typeof Mrbr_UI_Bootstrap_Controls_Nav.responseSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Nav.responseSizes]) {
        const self = this;
        self.rootElement &&
            self.classes(self.rootElement, self.$clsActions.Remove, self._responseSize) &&
            self.classes(self.rootElement, self.$clsActions.Add, value);
        self.rootElement && self.rootElement.classList.toggle("flex-column", value !== Mrbr_UI_Bootstrap_Controls_Nav.responseSizes.default);
        self._responseSize = value;
    }


    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Nav> {
        const self = this,
            initalisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Nav:initialise");
        super.initialise(...args)
            .then(async _ => {
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.navContainerType, self.navConfig));
                self.navStyle = self._navStyle;
                self.fillStyle = self._fillStyle;
                self.justifyPosition = self._justifyPosition;
                self.responseSize = self._responseSize;

                initalisePromise.resolve(self);

            });
        return initalisePromise;
    }

    setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Nav> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Nav:setDefaultConfig");
        super.setDefaultConfig()
            .then(() => {
                self.navConfig && self.navLinkListItemConfig && self.navLinkNavConfig;
                setDefaultConfigPromise.resolve(self);
            });
        return setDefaultConfigPromise;
    }
    public addLink(name: string, text: string, href: string = "#"): HTMLElement {
        const self = this;
        let link: HTMLElement;
        switch (self.navContainerType) {
            case Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes.ul:
            case Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes.ol:
                link = <HTMLElement>self.createElement(new self.$ctrlCfg(name, "li", self.navLinkListItemConfig));
                self.properties(link.querySelector("a"), { innerHTML: text, href: href });
                break;
            case Mrbr_UI_Bootstrap_Controls_Nav.navContainerTypes.nav:
                link = <HTMLElement>self.createElement(new self.$ctrlCfg(name, "a", self.navLinkNavConfig));
                self.properties(link, { innerHTML: text, href: href });
                break;
            default:
                throw new Error("Invalid nav container type");
        }
        self.rootElement.appendChild(link);
        return link;
    }

}