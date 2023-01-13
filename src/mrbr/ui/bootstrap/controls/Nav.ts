import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_NavContainerTypes } from "./NavContainerTypes";
import { Mrbr_UI_Bootstrap_Controls_NavFillStyles } from "./NavFillStyles";
import { Mrbr_UI_Bootstrap_Controls_NavJustifyPositions } from "./NavJustifyPositions";
import { Mrbr_UI_Bootstrap_Controls_NavResponseSizes } from "./NavResponseSizes";
import { Mrbr_UI_Bootstrap_Controls_NavStyles } from "./NavStyles";

export class Mrbr_UI_Bootstrap_Controls_Nav extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    //#region Public constants
    /**
     * Internal Nav Name
     * @date 04/12/2022 - 22:35:44
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly NAV_NAME: string = "nav";

    /**
     * Internal NavLink name
     * @date 04/12/2022 - 23:10:00
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly NAV_LINK_NAME: string = "nav_link";

    /**
     * Internal ListItem name
     * @date 04/12/2022 - 23:10:14
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LIST_ITEM_NAME: string = "list_item";
    //#endregion Public constants

    //#region Private Fields

    /**
     * FillStyle field.
     * Fill, Justified.
     * @date 04/12/2022 - 23:10:26
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_NavFillStyles}
     */
    private _fillStyle: Mrbr_UI_Bootstrap_Controls_NavFillStyles;

    /**
     * Nav Responsive Size field
     * @date 04/12/2022 - 23:11:13
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_NavResponseSizes}
     */
    private _responseSize: Mrbr_UI_Bootstrap_Controls_NavResponseSizes;

    /**
     * Nav Justify Position field.
     * Start, end, centre.
     * @date 04/12/2022 - 23:11:42
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_NavJustifyPositions}
     */
    private _justifyPosition: Mrbr_UI_Bootstrap_Controls_NavJustifyPositions;

    /**
     * Nav Container Element Type field.
     * ul, ol, nav.
     * @date 04/12/2022 - 23:12:28
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_NavContainerTypes}
     */
    private _containerType: Mrbr_UI_Bootstrap_Controls_NavContainerTypes;

    /**
     * Nav Style field.
     * Tabs, Pills, Links.
     * @date 04/12/2022 - 23:13:13
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_NavStyles}
     */
    private _navStyle: Mrbr_UI_Bootstrap_Controls_NavStyles;
    //#endregion Private Fields

    //#region Type Aliases

    /**
     * Nav Type Alias
     * @date 04/12/2022 - 23:14:01
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Nav}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Nav { return Mrbr_UI_Bootstrap_Controls_Nav; }

    /**
     * NavStyle enum alias
     * @date 04/12/2022 - 23:14:15
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_NavStyles}
     */
    public get $navS(): typeof Mrbr_UI_Bootstrap_Controls_NavStyles { return this.$bsc.NavStyles as typeof Mrbr_UI_Bootstrap_Controls_NavStyles; }

    /**
     * FillStyle enum alias 
     * @date 04/12/2022 - 23:14:30
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_NavFillStyles}
     */
    public get $navFS(): typeof Mrbr_UI_Bootstrap_Controls_NavFillStyles { return this.$bsc.NavFillStyles as typeof Mrbr_UI_Bootstrap_Controls_NavFillStyles; }

    /**
     * Nav Justify Position enum alias
     * @date 04/12/2022 - 23:14:55
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_NavJustifyPositions}
     */
    public get $navJP(): typeof Mrbr_UI_Bootstrap_Controls_NavJustifyPositions { return this.$bsc.NavJustifyPositions as typeof Mrbr_UI_Bootstrap_Controls_NavJustifyPositions; }

    /**
     * Nav Response Size enum alias
     * @date 04/12/2022 - 23:15:10
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_NavResponseSizes}
     */
    public get $navRS(): typeof Mrbr_UI_Bootstrap_Controls_NavResponseSizes { return this.$bsc.NavResponseSizes as typeof Mrbr_UI_Bootstrap_Controls_NavResponseSizes; }


    /**
     * Nav Container Type enum alias
     * @date 04/12/2022 - 23:28:36
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_NavContainerTypes}
     */
    public get $navCT(): typeof Mrbr_UI_Bootstrap_Controls_NavContainerTypes { return this.$bsc.NavContainerTypes as typeof Mrbr_UI_Bootstrap_Controls_NavContainerTypes; }



    //#endregion Type Aliases


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Nav.
     * @date 04/12/2022 - 23:15:27
     *
     * @constructor
     * @param {?Mrbr_UI_Bootstrap_Controls_NavContainerTypes} [navContainerType]
     */
    constructor(navContainerType?: Mrbr_UI_Bootstrap_Controls_NavContainerTypes) {
        super();
        this._containerType = navContainerType;
    }

    //#region Public Properties

    /**
     * Nav Container Element Type property.
     * @date 04/12/2022 - 23:16:29
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_NavContainerTypes}
     */
    public get containerType(): Mrbr_UI_Bootstrap_Controls_NavContainerTypes { return this._containerType ??= this.$navCT.nav; }

    /**
     * Nav Style property.
     * Tabs, Pills, Links.
     * @date 04/12/2022 - 23:16:40
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_NavStyles}
     */
    public get style(): Mrbr_UI_Bootstrap_Controls_NavStyles { return this._navStyle ??= this.$navS.links; }

    /**
     * Nav Style property.
     * Tabs, Pills, Links.
     */
    public set style(value: Mrbr_UI_Bootstrap_Controls_NavStyles) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this._navStyle, value]));
        this._navStyle = value;
    }


    /**
     * Nav Fill Style property.
     * Fill, Justified.
     * @date 04/12/2022 - 23:17:27
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_NavFillStyles}
     */
    public get fillStyle(): Mrbr_UI_Bootstrap_Controls_NavFillStyles { return this._fillStyle ??= this.$navFS.default; }

    /**
     * Nav Fill Style property.
     * Fill, Justified.
     */
    public set fillStyle(value: Mrbr_UI_Bootstrap_Controls_NavFillStyles) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this._fillStyle, value]));
        this._fillStyle = value;
    }

    /**
     * Nav Justify Position property.
     * Start, end, centre.
     * @date 04/12/2022 - 23:18:08
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_NavJustifyPositions}
     */
    public get justifyPosition(): Mrbr_UI_Bootstrap_Controls_NavJustifyPositions { return this._justifyPosition ??= this.$navJP.start; }

    /**
     * Nav Justify Position property.
     * Start, end, centre.
     */
    public set justifyPosition(value: Mrbr_UI_Bootstrap_Controls_NavJustifyPositions) {
        const root = this.rootElement;
        root && this.classes(root, this.$clsActions.replace, [this._justifyPosition, value]);
        this._justifyPosition = value;
    }

    /**
     * Nav Response Size property.
     * @date 04/12/2022 - 23:18:46
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_NavResponseSizes}
     */
    public get responseSize(): Mrbr_UI_Bootstrap_Controls_NavResponseSizes { return this._responseSize ??= this.$navRS.default; }

    /**
     * Nav Response Size property.
     */
    public set responseSize(value: Mrbr_UI_Bootstrap_Controls_NavResponseSizes) {
        const root = this.rootElement;
        if (root) {
            this.classes(root, this.$clsActions.replace, [this._responseSize, value]);
            root.classList.toggle("flex-column", value !== this.$navRS.default);
        }
        this._responseSize = value;
    }
    //#endregion Public Properties

    //#region Public Methods

    /**
     * Initialise the control, load manifest and set properties.
     * @example 
     * // Set ContainerType during initialisation instead of constructor.
     * const  nav          = new Mrbr_UI_Bootstrap_Controls_Nav("navbar")
     *        name         = Mrbr_UI_Bootstrap_Controls_NavContainerTypes[MrbrBase.COMPONENT_NAME],
     *        config       = {};
    *         config[name] = ct.nav;
     * nav.initialise(config);
     * @date 04/12/2022 - 23:19:11
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Nav>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Nav> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`),
            cls = self.$cls;
        super.initialise(...args)
            .then(async _ => {
                await self.loadManifest(cls);
                await self.setDefaultConfig();
                const containerTypeName = self.$navCT[self.$mrbr.COMPONENT_NAME]
                args?.forEach((arg) => (typeof arg === "object") && (arg.hasOwnProperty(containerTypeName)) && (self._containerType = arg[containerTypeName]));
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.containerType, self.elementConfig.get(cls.NAV_NAME)));
                self.style = self.style;
                self.fillStyle = self.fillStyle;
                self.justifyPosition = self.justifyPosition;
                self.responseSize = self.responseSize;

                initalisePromise.resolve(self);

            });
        return initalisePromise;
    }

    /**
     * Set default configuration for the control.
     * @date 04/12/2022 - 23:47:13
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Nav>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Nav> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            cls = self.$cls,
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(() => {
                const sine = self.elementConfig.setIfNotExist.bind(self.elementConfig),
                    ctrlPrm = self.$ctrlPrm;
                self.elementConfig.controlName(controlName);
                sine(cls.NAV_NAME, new ctrlPrm()
                    .Classes("nav"));
                sine(cls.NAV_LINK_NAME, new ctrlPrm()
                    .Classes("nav-link"));
                sine(cls.LIST_ITEM_NAME, new ctrlPrm()
                    .Classes("nav-item")
                    .Template(`<a class="nav-link" href="#"></a>`));
                setDefaultConfigPromise.resolve(self);
            });
        return setDefaultConfigPromise;
    }


    /**
     * Create a new Nav Item.
     * @date 04/12/2022 - 23:57:12
     *
     * @public
     * @param {string} name
     * @param {string} text
     * @param {string} [href="#"]
     * @returns {HTMLElement}
     */
    public addLink(name: string, text: string, href: string = "#"): HTMLElement {
        const
            nct = this.$navCT,
            cls = this.$cls,
            ctrlCfg = this.$ctrlCfg,
            createElement = this.createElement.bind(this),
            properties = this.properties.bind(this),
            getConfig = this.elementConfig.getConfig.bind(this.elementConfig),
            htmlTags = this.$htmlt;
        let link: HTMLElement;
        switch (this.containerType) {
            case nct.ul:
            case nct.ol:
                link = <HTMLElement>createElement(new ctrlCfg(name, htmlTags.li, getConfig(cls.LIST_ITEM_NAME)));
                properties(link.querySelector(htmlTags.anchor), { innerHTML: text, href: href });
                break;
            case nct.nav:
                link = <HTMLElement>createElement(new ctrlCfg(name, htmlTags.anchor, getConfig(cls.NAV_LINK_NAME)));
                properties(link, { innerHTML: text, href: href });
                break;
            default:
                throw new Error("Invalid nav container type");
        }
        this.rootElement.appendChild(link);
        return link;
    }
    //#endregion Public Methods
}