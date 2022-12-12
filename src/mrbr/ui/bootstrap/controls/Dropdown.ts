import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../utilities/buttonColours";
import { Mrbr_UI_Bootstrap_Utilities_Interactions } from "../utilities/interactions";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing } from "./Dropdown$AutoClosing";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes } from "./Dropdown$ButtonSizes";
import { Mrbr_UI_Bootstrap_Controls_DropdownItemEvents } from "./DropdownItemEvents";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments } from "./Dropdown$MenuAlignments";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles } from "./Dropdown$MenuStyles";
import { Mrbr_UI_Bootstrap_Controls_DropdownMenuTypes } from "./DropdownMenuTypes";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$Positions } from "./Dropdown$Positions";
import { Mrbr_UI_Bootstrap_Controls_DropdownEvent } from "./DropdownEvent";
import { Mrbr_UI_Bootstrap_Controls_DropdownEventData } from "./DropdownEventData";


/**
 * Internal Type for Getting MenuType from Dropdown$MenuTypes and Target from HTMLElement Event
 * @date 02/12/2022 - 02:04:41
 *
 * @typedef {menuTargetType}
 */
type menuTargetType = {
    element: HTMLElement;
    targetType: Mrbr_UI_Bootstrap_Controls_DropdownMenuTypes;
}

/**
 * Dropdown Menu Control
 * @date 02/12/2022 - 02:05:16
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_Dropdown
 * @typedef {Mrbr_UI_Bootstrap_Controls_Dropdown}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Controls_Dropdown extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Fields

    /**
     * HTMLElement Data Attribute for Dropdown Type 
     * @date 02/12/2022 - 01:07:39
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_DATA_TYPE: string = "data-mrbr-dropdown-type";

    /**
     * Interbal Dropdown Element Name
     * @date 02/12/2022 - 01:08:22
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_NAME: string = "dropdown";

    /**
     * Internal Dropdown Button Element Name
     * @date 02/12/2022 - 01:08:40
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_BUTTON_NAME: string = "dropdown_button";

    /**
     * Internal Dropdown MenuItem Container Element Name
     * @date 02/12/2022 - 01:08:51
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_MENUITEM_CONTAINER_NAME: string = "menuItemContainer";

    /**
     * Internal Dropdown MenuItem Element Name
     * @date 02/12/2022 - 01:09:23
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_MENUITEM_NAME: string = "menuItem";

    /**
     * Internal Dropdown Divider Element Name
     * @date 02/12/2022 - 01:09:43
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_DIVIDER_NAME: string = "dividerItem";

    /**
     * Internal Dropdown Submenu Element Name
     * @date 02/12/2022 - 01:10:05
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_SUBMENU_NAME: string = "submenu";

    /**
     * Internal Dropdown Submenu Link Element Name
     * @date 02/12/2022 - 01:10:29
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_SUBMENU_LINK_NAME: string = "submenuLink";

    /**
     * Dropdown Class for Information Text Element
     * @date 02/12/2022 - 01:10:49
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_INFO_TEXT: string = "mrbr-info-text";

    /**
     * Bootstrap Class for Dark Menu
     * @date 02/12/2022 - 01:11:19
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DROPDOWN_DARK_MENU: string = "dropdown-menu-dark";
    //#endregion Public Static Fields
    //#region Private Static Properties
    private static readonly OUTSIDE_DROPDOWN_CLICK_EVENT_NAME = "document_body_outside_menu_click";
    //#endregion Private Static Fields
    //#region Public Static Enums
    //#endregion Public Static Enums
    //#region Protected Aliases

    /**
     * Dropdown Menu Types Enum Alias
     * @date 02/12/2022 - 01:13:23
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_DropdownMenuTypes}
     */
    protected get $ddmt(): typeof Mrbr_UI_Bootstrap_Controls_DropdownMenuTypes { return Mrbr_UI_Bootstrap_Controls_DropdownMenuTypes; }

    /**
     * Dropdown Menu Styles Enum Alias
     * @date 02/12/2022 - 01:13:34
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles}
     */
    protected get $ddms(): typeof Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles { return Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles; }

    /**
     * Dropdown Menu ItemEvents Enum Alias
     * Bootstrap Dropdown Events or Click Events for different Menu Items Types
     * @date 02/12/2022 - 01:13:52
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_DropdownItemEvents}
     */
    protected get $ddie(): typeof Mrbr_UI_Bootstrap_Controls_DropdownItemEvents { return Mrbr_UI_Bootstrap_Controls_DropdownItemEvents; }

    /**
     * Dropdown Menu Alignment Enum Alias for Rectivale layouts
     * @date 02/12/2022 - 01:14:55
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments}
     */
    protected get $ddma(): typeof Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments { return Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments; }

    /**
     * Dropdown Autoclosing Enum Alias
     * @date 02/12/2022 - 01:16:24
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing}
     */
    protected get $ddac(): typeof Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing { return Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing; }

    /**
     * Dropdown Menu Item Positions Enum Alias
     * DropEnd, dropStart, dropUp, dropDown
     * @date 02/12/2022 - 01:16:44
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Dropdown$Positions}
     */
    protected get $ddp(): typeof Mrbr_UI_Bootstrap_Controls_Dropdown$Positions { return Mrbr_UI_Bootstrap_Controls_Dropdown$Positions; }

    /**
     * Dropdown ButtonSize Enum Alias
     * @date 02/12/2022 - 01:17:54
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Dropdown}
     */
    protected get $ddbs(): typeof Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes { return Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes; }

    /**
     * Dropdown ButtonColours Enum Alias
     * @date 02/12/2022 - 01:18:13
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Utilities_ButtonColours}
     */
    protected get $bubc(): typeof Mrbr_UI_Bootstrap_Utilities_ButtonColours { return Mrbr_UI_Bootstrap_Utilities_ButtonColours; }

    /**
     * Dropdown Event EventData Type Alias
     * @date 02/12/2022 - 01:18:27
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_DropdownEventData}
     */
    protected get $dded(): typeof Mrbr_UI_Bootstrap_Controls_DropdownEventData { return Mrbr_UI_Bootstrap_Controls_DropdownEventData; }

    /**
     * Dropdown Event Type Alias
     * @date 02/12/2022 - 01:18:53
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_DropdownEvent}
     */
    protected get $dde(): typeof Mrbr_UI_Bootstrap_Controls_DropdownEvent { return Mrbr_UI_Bootstrap_Controls_DropdownEvent; }

    /**
     * Bootstrap Html Utilities Interactions Class Alias
     * @date 02/12/2022 - 01:19:21
     *
     * @protected
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Utilities_Interactions}
     */
    protected get $bui(): typeof Mrbr_UI_Bootstrap_Utilities_Interactions { return Mrbr_UI_Bootstrap_Utilities_Interactions; }

    //#endregion Protected Aliases
    //#region Private Fields


    /**
     * Dropdown Class Type Alias
     * @date 02/12/2022 - 01:21:00
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Dropdown}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Dropdown { return Mrbr_UI_Bootstrap_Controls_Dropdown; }


    /**
     * Dropdown Menu Alignment
     * @date 02/12/2022 - 01:21:25
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments}
     */
    private _alignment: Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments;

    /**
     * DropDown AutoClose behaviour
     * @date 02/12/2022 - 01:21:44
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing}
     */
    private _autoClose: Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing;

    /**
     * Dropdown Button Colour
     * @date 02/12/2022 - 01:22:04
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Utilities_ButtonColours}
     */
    private _buttonColour: Mrbr_UI_Bootstrap_Utilities_ButtonColours;

    /**
     * Dropdown Button Size
     * @date 02/12/2022 - 01:22:16
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes}
     */
    private _buttonSize: Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes;

    /**
     * Button Text
     * @date 02/12/2022 - 01:22:25
     *
     * @private
     * @type {string}
     */
    private _buttonText: string = " ";

    /**
     * Is Dropdown Using Dark Style
     * @date 02/12/2022 - 01:25:09
     *
     * @private
     * @type {boolean}
     */
    private _darkDropdown: boolean = false;

    /**
     * Dropdown Position
     * @date 02/12/2022 - 01:25:34
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$Positions}
     */
    private _dropdownPosition: Mrbr_UI_Bootstrap_Controls_Dropdown$Positions;

    /**
     * Is Dropdown a Sub Menu
     * @date 02/12/2022 - 01:25:45
     *
     * @private
     * @type {boolean}
     */
    private _isSubMenu: boolean = false;

    /**
     * Dropdown MenuStyle
     * @date 02/12/2022 - 01:26:02
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles}
     */
    private _menuStyle: Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles;
    private _rootMenu: Mrbr_UI_Bootstrap_Controls_Dropdown = null;
    //#endregion Private Fields
    //#region Public Properties

    /**
     * Dropdown Menu Alignment
     * @date 02/12/2022 - 01:27:18
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments}
     */
    public get alignment(): Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments { return this._alignment ??= this.$ddma.default; }

    /**
     * Dropdown Menu Alignment
     */
    public set alignment(value: Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments) {
        const
            root = this.rootElement,
            button = this.elements.get(this.$cls.DROPDOWN_BUTTON_NAME);
        if (root) {
            if (value !== this.$ddma.default) { (this.classes(root, this.$clsActions.add, value)) }
            else { this.classes(root, this.$clsActions.remove, this._alignment); }
        }
        if (button) {
            if (this.alignment !== this.$ddma.default) { this.dataset(button, { bsDisplay: "static" }); }
            else { this.dataset(button, { bsDisplay: this.$cls.DELETE }); }
        }
        this._alignment = value;
    }

    /**
     * DropDown AutoClose behaviour
     * @date 02/12/2022 - 01:28:30
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing}
     */
    public get autoClose(): Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing { return this._autoClose ??= this.$ddac.false; }

    /**
     * DropDown AutoClose behaviour
     */
    public set autoClose(value: Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing) {
        const button = this.elements.get(this.isSubMenu ? this.$cls.DROPDOWN_SUBMENU_LINK_NAME : this.$cls.DROPDOWN_BUTTON_NAME);
        (button) && (this.dataset(button, { bsAutoClose: value === this.$ddac.default ? this.$cls.DELETE : value }))
        this._autoClose = value;
    }

    /**
     * Dropdown Button Colour
     * @date 02/12/2022 - 01:28:46
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Utilities_ButtonColours}
     */
    public get buttonColour(): Mrbr_UI_Bootstrap_Utilities_ButtonColours { return this._buttonColour ??= this.$bubc.primary }

    /**
     * Dropdown Button Colour
     */
    public set buttonColour(value: Mrbr_UI_Bootstrap_Utilities_ButtonColours) {
        const button = this.elements.get(this.$cls.DROPDOWN_BUTTON_NAME);
        (button && this.rootElement) && (this.classes(button, this.$clsActions.replace, [this._buttonColour, value]));
        this._buttonColour = value;
    }

    /**
     * Dropdown Button Size
     * @date 02/12/2022 - 01:29:02
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes}
     */
    public get buttonSize(): Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes { return this._buttonSize ??= this.$ddbs.default; }

    /**
     * Dropdown Button Size
     */
    public set buttonSize(value: Mrbr_UI_Bootstrap_Controls_Dropdown$ButtonSizes) {
        const button = this.elements.get(this.$cls.DROPDOWN_BUTTON_NAME);
        (button) && (this.classes(button, this.$clsActions.replace, [this._buttonSize, value]));
        this._buttonSize = value;
    }

    /**
     * Button Text
     * @date 02/12/2022 - 01:29:17
     *
     * @public
     * @type {string}
     */
    public get buttonText(): string { return this._buttonText; }

    /**
     * Button Text
     */
    public set buttonText(value: string) {
        const button = this.isSubMenu ? this.elements.get(this.$cls.DROPDOWN_SUBMENU_LINK_NAME) : this.elements.get(this.$cls.DROPDOWN_BUTTON_NAME);
        if (this.isSubMenu) {
            const textElement = document.querySelector(`${this.$cls.DROPDOWN_SUBMENU_LINK_NAME} > ${this.$htmlt.div}.${this.$cls.DROPDOWN_INFO_TEXT}`)
            textElement && (textElement.textContent = value);
        }
        else {
            (button && value !== button.innerText) && (button.innerText = value);
        }
        this._buttonText = value;
    }

    /**
     * Dropdown Using Dark Style Option
     * @date 02/12/2022 - 01:29:39
     *
     * @public
     * @type {boolean}
     */
    public get darkDropdown(): boolean { return this._darkDropdown; }

    /**
     * Dropdown Using Dark Style Option
     */
    public set darkDropdown(value: boolean) {
        const menuItemContainer = this.elements.get(this.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME);
        menuItemContainer && this.classes(menuItemContainer, value ? this.$clsActions.add : this.$clsActions.remove, this.$cls.DROPDOWN_DARK_MENU);
        this._darkDropdown = value;
    }

    /**
     * Dropdown Menu Position
     * @date 02/12/2022 - 01:30:15
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$Positions}
     */
    public get dropdownPosition(): Mrbr_UI_Bootstrap_Controls_Dropdown$Positions { return this._dropdownPosition ??= this.$ddp.default; }

    /**
     * Dropdown Menu Position
     */
    public set dropdownPosition(value: Mrbr_UI_Bootstrap_Controls_Dropdown$Positions) {
        const menuItemContainer = this.rootElement;
        if (menuItemContainer) {
            if (this.dropdownPosition !== this.$ddp.default) { this.classes(menuItemContainer, this.$clsActions.remove, this._dropdownPosition); }
            else { this.classes(menuItemContainer, this.$clsActions.add, value); }
        }
        this._dropdownPosition = value;
    }

    /**
     * Is Dropdown SubMenu
     * @date 02/12/2022 - 01:30:58
     *
     * @public
     * @type {boolean}
     */
    public get isSubMenu(): boolean { return this._isSubMenu; }

    /**
     * Is Dropdown SubMenu
     */
    public set isSubMenu(value: boolean) { this._isSubMenu = value; }

    /**
     * Dropdown Menu Style
     * @date 02/12/2022 - 01:31:15
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles}
     */
    public get menuStyle(): Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles { return this._menuStyle ??= this.$ddms.default; }

    /**
     * RootMenu for SubMenu Dropdowns
     * @date 02/12/2022 - 01:31:31
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown}
     */
    public get rootMenu(): Mrbr_UI_Bootstrap_Controls_Dropdown { return this._rootMenu; }

    /**
     * RootMenu for SubMenu Dropdowns
     */
    public set rootMenu(value: Mrbr_UI_Bootstrap_Controls_Dropdown) { this._rootMenu = value; }

    //#endregion Public Properties

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Dropdown.
     * @date 02/12/2022 - 01:32:30
     *
     * @constructor
     * @param {string} rootElementName
     * @param {?Mrbr_UI_Bootstrap_Controls_Dropdown} [dropdownMenuStyle]
     */
    constructor(rootElementName: string, dropdownMenuStyle?: Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles) {
        super(rootElementName);
        this._menuStyle = dropdownMenuStyle
    }
    //#region Public Methods

    /**
     * Initialise Dropdown, load Manifest and set properties
     * @date 02/12/2022 - 01:33:41
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Dropdown>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Dropdown> {

        const
            self = this,
            cls = self.$cls,
            initalisePromise = self.$promise.create(`${cls[self.$mrbr.COMPONENT_NAME]}:initialise`),
            ctrlCfg = self.$ctrlCfg;
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(cls);
                await self.setDefaultConfig();
                if (self.isSubMenu === true) {
                    const
                        buttonLink = <HTMLElement>self.createElement(new ctrlCfg(cls.DROPDOWN_SUBMENU_LINK_NAME, self.$htmlt.anchor,
                            self.elementConfig
                                .getConfig(cls.DROPDOWN_SUBMENU_LINK_NAME)
                                .Data({ mrbrDropdownType: self.$ddmt.submenuButton })
                        )),
                        menuItemContainer = <HTMLElement>self.createElement(new ctrlCfg(cls.DROPDOWN_MENUITEM_CONTAINER_NAME,
                            (self.menuStyle === self.$ddms.default ? self.$htmlt.ulist : self.$htmlt.div), this.elementConfig.getConfig(cls.DROPDOWN_MENUITEM_CONTAINER_NAME)
                        ));
                    self.createElement(new ctrlCfg(self.rootElementName, self.$htmlt.li,
                        self.elementConfig
                            .getConfig(cls.DROPDOWN_SUBMENU_NAME)
                            .Children([buttonLink, menuItemContainer])
                            .Data({ mrbrDropdownType: self.$ddmt.submenu })
                    ));
                }
                else {
                    let button = <HTMLElement>self.createElement(new ctrlCfg(cls.DROPDOWN_BUTTON_NAME, self.$htmlt.button, this.elementConfig.getConfig(cls.DROPDOWN_BUTTON_NAME)
                        .Data({ mrbrDropdownType: self.$ddmt.button })
                        .Classes(self.buttonColour)
                    )),
                        menuItemContainer = <HTMLElement>self.createElement(new ctrlCfg(cls.DROPDOWN_MENUITEM_CONTAINER_NAME, (self.menuStyle === self.$ddms.default ? self.$htmlt.ulist : self.$htmlt.div), self.elementConfig.getConfig(cls.DROPDOWN_MENUITEM_CONTAINER_NAME)));
                    self.createElement(new ctrlCfg(self.rootElementName, self.$htmlt.div, this.elementConfig.getConfig(cls.DROPDOWN_NAME)
                        .Children([button, menuItemContainer])
                        .Data({ mrbrDropdownType: self.$ddmt.container })
                    ));
                    let mountId: number = self.onMounted((evt) => {
                        let eventName = self.$ddie.hidden;
                        self.events.add("closeDropdown:" + eventName, new self.$evtHandler(
                            eventName,
                            self.rootElement,
                            self.closeDropdown,
                            self
                        ));
                    });
                }
                self.defaultContainerElementName = self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME;
                self.alignment = self.alignment;
                self.autoClose = self.autoClose;
                self.buttonColour = self.buttonColour;
                self.buttonSize = self.buttonSize;
                self.dropdownPosition = self.dropdownPosition;
                self.buttonText = self._buttonText;
                self.darkDropdown = self._darkDropdown;
                initalisePromise.resolve(self);
            })
        return initalisePromise;
    }
    /**
    * Set Default config for Dropdown Elements
    * @date 02/12/2022 - 01:52:18
    *
    * @public
    * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Dropdown>}
    */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Dropdown> {
        const
            self = this,
            selfCls = self.$cls,
            componentName = selfCls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Dropdown>(componentName + ":setDefaultConfig"),
            clsUserSelectNone = self.$bui.userSelectNone,
            dropdown = "dropdown",
            clsDropDownItem = `${dropdown}-item`,
            ctrlPrm = self.$ctrlPrm;
        super.setDefaultConfig()
            .then(async _ => {
                self.elementConfig
                    .controlName(componentName)
                    .setIfNotExist(selfCls.DROPDOWN_NAME, new ctrlPrm()
                        .Classes(`btn-group ${clsUserSelectNone}`))
                    .setIfNotExist(selfCls.DROPDOWN_BUTTON_NAME, new ctrlPrm()
                        .Classes(`btn ${dropdown}-toggle ${clsUserSelectNone}`)
                        .Attributes({ "type": "button" })
                        .Data({ bsToggle: dropdown })
                        .Aria({ expanded: false }))
                    .setIfNotExist(selfCls.DROPDOWN_MENUITEM_CONTAINER_NAME, new ctrlPrm()
                        .Classes(`${dropdown}-menu ${clsUserSelectNone}`))
                    .setIfNotExist(selfCls.DROPDOWN_MENUITEM_NAME, new ctrlPrm()
                        .Classes(`${clsDropDownItem} ${clsUserSelectNone}`))
                    .setIfNotExist(selfCls.DROPDOWN_DIVIDER_NAME, new ctrlPrm()
                        .Classes(`${dropdown}-divider`))
                    .setIfNotExist(selfCls.DROPDOWN_SUBMENU_NAME, new ctrlPrm())
                    .setIfNotExist(selfCls.DROPDOWN_SUBMENU_LINK_NAME, new ctrlPrm()
                        .Classes(`${clsDropDownItem} ${clsUserSelectNone}`)
                        .Data({ bsToggle: dropdown })
                        .Aria({ expanded: false })
                        .Template(`<div class="d-flex" >` +
                            `<div class="mrbr-info-text flex-grow-1">Dropdown</div>` +
                            `<div class="flex-shrink-0" >` +
                            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox = "0 0 16 16" >` +
                            `<path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" > </path>` +
                            `</svg>` +
                            `</div>` +
                            `</div>`)

                    );
                setDefaultConfigPromise.resolve(self);
            })
        return setDefaultConfigPromise;
    }
    /**
     * Add SubMenu Dropdown
     * @date 02/12/2022 - 01:38:20
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_Dropdown} subMenu
     * @returns {Mrbr_UI_Bootstrap_Controls_Dropdown}
     */
    public addSubMenuItem(subMenu: Mrbr_UI_Bootstrap_Controls_Dropdown): Mrbr_UI_Bootstrap_Controls_Dropdown {
        const self = this
        subMenu.isSubMenu = true;
        subMenu.mount(self)
        subMenu.rootMenu = self.rootMenu || self;
        return subMenu;
    }

    /**
     * Add Dropdown Item
     * @date 02/12/2022 - 01:38:56
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @returns {HTMLElement}
     */
    public addMenuItem(id: string, text: string): HTMLElement {
        const
            self = this,
            anchorElementId: string = `${id}_anchor`,
            link = <HTMLAnchorElement>self.createElement(new self.$ctrlCfg(anchorElementId, self.$htmlt.anchor, this.elementConfig.getConfig(self.$cls.DROPDOWN_MENUITEM_NAME)
                .Properties({
                    href: "#",
                    innerText: text
                }))),
            item = <HTMLElement>self.createElement(new self.$ctrlCfg(id, this.$htmlt.li, new self.$ctrlPrm()
                .Classes(self.$bui.userSelectNone)
                .Children([link])
                .Data({ mrbrDropdownType: self.$ddmt.menuitem }))
            )

        self.defaultContainerElement.appendChild(item);
        return item;
    }

    /**
     * Add Header MenuItem
     * @date 02/12/2022 - 01:39:26
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @returns {HTMLElement}
     */
    public addHeaderMenuItem(id: string, text: string): HTMLElement {
        const
            self = this,
            textElementId = `${id}_text`,
            textElement = <HTMLElement>self.createElement(new self.$ctrlCfg(textElementId, self.$htmlt.heading6, new self.$ctrlPrm()
                .Properties({ innerText: text }))
            ),
            item = <HTMLElement>self.createElement(new self.$ctrlCfg(id, self.$htmlt.li, new self.$ctrlPrm()
                .Classes(["dropdown-header", self.$bui.userSelectNone, self.$bui.pointerEventsNone])
                .Children([textElement])
                .Data({ mrbrDropdownType: self.$ddmt.header }))
            )
        self.defaultContainerElement.prepend(item);
        return item;
    }

    /**
     * Add Divider MenuItem
     * @date 02/12/2022 - 01:39:49
     *
     * @public
     * @param {string} id
     * @returns {HTMLElement}
     */
    public addDividerMenuItem(id: string): HTMLElement {
        const
            hrElementId: string = `${id}_hr`,
            divider = <HTMLElement>this.createElement(new this.$ctrlCfg(hrElementId, this.$htmlt.hr, this.elementConfig.getConfig(this.$cls.DROPDOWN_DIVIDER_NAME))),
            item = <HTMLElement>this.createElement(new this.$ctrlCfg(id, this.$htmlt.li, new this.$ctrlPrm()
                .Children([divider])
                .Data({ mrbrDropdownType: this.$ddmt.header })));
        this.defaultContainerElement.appendChild(item);
        return item;
    }

    /**
     * Set MenuItem Active State
     * @date 02/12/2022 - 01:40:05
     *
     * @public
     * @param {string} id
     * @param {boolean} [active=true]
     */
    public itemActiveState(id: string, active: boolean = true): void {
        const
            anchorElementId: string = `${id}_anchor`,
            item = this.elements.get(anchorElementId);
        (item) && (this.classes(id, active ? this.$clsActions.add : this.$clsActions.remove, "active"))
    }

    /**
     * Set MenuItem Disabled State
     * @date 02/12/2022 - 01:40:39
     *
     * @public
     * @param {string} id
     * @param {boolean} [disabled=true]
     */
    public itemDisabledState(id: string, disabled: boolean = true): void {
        const
            anchorElementId: string = `${id}_anchor`,
            item = this.elements.get(anchorElementId);
        (item) && (this.classes(id, disabled ? this.$clsActions.add : this.$clsActions.remove, "disabled"))
    }
    //#endregion Public Methods
    //#region Private EventHandlers


    /**
     * Add OnShow Event Subscriber
     * @date 02/12/2022 - 01:40:55
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onShow(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.show;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.rootElement,
            self.menuShow_handler,
            self,
            callback
        );
    }


    /**
     * Add OnHidden Event Subscriber
     * @date 02/12/2022 - 01:41:20
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onHidden(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.hidden;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.rootElement,
            self.menuHidden_handler,
            self,
            callback
        );
    }

    /**
     * Add OnShown Event Subscriber
     * @date 02/12/2022 - 01:41:39
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onShown(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.shown;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.rootElement,
            self.menuShown_handler,
            self,
            callback
        );
    }


    /**
     * Add OnHide Event Subscriber
     * @date 02/12/2022 - 01:41:55
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onHide(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.hide;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.rootElement,
            self.menuHide_handler,
            self,
            callback
        );
    }


    /**
     * Internal OnShow Event Handler
     * @date 02/12/2022 - 01:42:38
     *
     * @private
     * @param {Event} event
     */
    private menuShow_handler(event: Event): void {
        const self = this,
            eventName = self.$ddie.show,
            target: menuTargetType = this.getMenuTarget(event);
        if (!target) return;
        const eventData = new self.$dded(target.element.dataset.mrbrId, event, eventName, target.element);
        this.eventSubscribers.raiseEvent(new self.$dde(eventName, self, eventData));

    }

    /**
     * Internal OnHidden Event Handler
     * @date 02/12/2022 - 01:42:55
     *
     * @private
     * @param {Event} event
     */
    private menuHidden_handler(event: Event): void {
        const self = this,
            eventName = self.$ddie.hidden,
            target: menuTargetType = this.getMenuTarget(event);
        if (!target) return;
        const eventData = new this.$dded(target.element.dataset.mrbrId, event, eventName, target.element);
        this.eventSubscribers.raiseEvent(new self.$dde(eventName, self, eventData));
    }

    /**
     * Internal OnShown Event Handler
     * @date 02/12/2022 - 01:43:14
     *
     * @private
     * @param {Event} event
     */
    private menuShown_handler(event: Event): void {
        const self = this,
            eventName = self.$ddie.shown,
            target: menuTargetType = this.getMenuTarget(event);
        if (!target) return;
        const eventData = new this.$dded(target.element.dataset.mrbrId, event, eventName, target.element);
        this.eventSubscribers.raiseEvent(new this.$dde(eventName, self, eventData));
    }

    /**
     * Internal OnHide Event Handler
     * @date 02/12/2022 - 01:43:28
     *
     * @private
     * @param {Event} event
     */
    private menuHide_handler(event: Event): void {
        const self = this,
            eventName = self.$ddie.hide,
            target: menuTargetType = ((event as any).clickEvent) ? this.getMenuTarget(((event as any).clickEvent)) : this.getMenuTarget(event);
        if (!target) return;
        if ((event as any).clickEvent && target.targetType === self.$ddmt.submenuButton) {
            let ele = self.elements.get(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME);
            event.preventDefault();
            return;
        }
        const eventData = new self.$dded(target.element.dataset.mrbrId, event, eventName, target.element);
        this.eventSubscribers.raiseEvent(new self.$dde(eventName, self, eventData));
    }

    /**
     * Add OnClick Event Subscriber for DropDown RootMenu Item
     * @date 02/12/2022 - 01:44:14
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onButtonClick(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.buttonClick;
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return null;
        }
        if (self.isSubMenu === false) {
            return self.addDeferredOnMountFn(
                eventName,
                "click",
                self.rootElement,
                self.menuClick_handler,
                self,
                callback
            );
        }
        return null;
    }

    /**
     * Add OnClick Event Subscriber for SubMenu Buttons
     * @date 02/12/2022 - 01:46:06
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onSubMenuClick(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.subMenuClick;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        if (self.isSubMenu === true) {
            return self.addDeferredOnMountFn(
                eventName,
                "click",
                self.rootElement,
                self.subMenuClick_handler,
                self,
                callback
            );
        }
        return null;
    }

    /**
     * Add OnClick Event Subscriber for MenuItem 
     * @date 02/12/2022 - 01:46:44
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onMenuItemClick(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.menuItemClick;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return self.addDeferredOnMountFn(
            eventName,
            "click",
            self.rootElement,
            self.menuItemClick_handler,
            self,
            callback
        );
    }

    /**
     * Internal OnClick Event Handler for MenuItem
     * @date 02/12/2022 - 01:47:11
     *
     * @private
     * @param {Event} event
     */
    private menuItemClick_handler(event: Event): void {
        const self = this,
            target: menuTargetType = this.getMenuTarget(event);
        if (!target) { return; }
        if (target.targetType !== self.$ddmt.menuitem) { return; }
        const eventData = new self.$dded(target.element.dataset.mrbrId, event, self.$ddie.menuItemClick, target.element);
        this.eventSubscribers.raiseEvent(new self.$dde(self.$ddie.menuItemClick, self, eventData));
    }

    /**
     * Internal OnClick Event Handler for RootMenu Buttons
     * @date 02/12/2022 - 01:47:31
     *
     * @private
     * @param {Event} event
     */
    private menuClick_handler(event: Event): void {
        const self = this,
            target: menuTargetType = this.getMenuTarget(event);
        if (!target) { return; }
        const eventData = new self.$dded(target.element.dataset.mrbrId, event, self.$ddie.buttonClick, target.element);
        this.eventSubscribers.raiseEvent(new self.$dde(self.$ddie.buttonClick, self, eventData));
    }

    /**
     * Internal OnClick Event Handler for SubMenu Buttons
     * @date 02/12/2022 - 01:48:59
     *
     * @private
     * @param {Event} event
     */
    private subMenuClick_handler(event: Event) {
        const self = this,
            target: menuTargetType = this.getMenuTarget(event);
        if (!target) { return; }
        const eventData = new self.$dded(target.element.dataset.mrbrId, event, self.$ddie.subMenuClick, target.element);
        this.eventSubscribers.raiseEvent(new self.$dde(self.$ddie.subMenuClick, self, eventData));
    }

    /**
     * Get the target Element for the Event from the EventTarget or closest element with a DropDownDataType data attribute or null if not found
     * @date 02/12/2022 - 01:49:27
     *
     * @private
     * @param {Event} event
     * @returns {menuTargetType}
     */
    protected getMenuTarget(event: Event): menuTargetType {
        const eventTarget = <HTMLElement>event.target;
        const result: menuTargetType = {
            targetType: null,
            element: null
        }
        result.element = (eventTarget.dataset?.mrbrDropdownType) ? eventTarget : <HTMLElement>eventTarget.closest(`[${this.$cls.DROPDOWN_DATA_TYPE}]`);
        const dropdownType = Object.entries(this.$ddmt).find(([key, value]) => value === result.element?.dataset?.mrbrDropdownType);
        result.targetType = dropdownType ? this.$ddmt[dropdownType[0]] : null;
        return result.targetType ? result : null;
    }

    /**
     * Close Menu dropdown behaviour depending on item type is a SubMenu, MenuItem or RootMenu Button
     * @date 02/12/2022 - 01:50:52
     *
     * @private
     * @param {Event} event
     */
    private closeDropdown(event: Event): void {
        const self = this,
            eventTarget = <HTMLElement>event.target;
        let targetDropdownType,
            target;
        if (eventTarget.dataset?.mrbrDropdownType) {
            target = eventTarget;
            targetDropdownType = eventTarget.dataset.mrbrDropdownType;
        }
        else if (<HTMLElement>eventTarget.closest(`[${self.$cls.DROPDOWN_DATA_TYPE}]`)) {
            target = (<HTMLElement>eventTarget.closest(`[${self.$cls.DROPDOWN_DATA_TYPE}]`));
            targetDropdownType = target.dataset?.mrbrDropdownType;
        }
        if (targetDropdownType === self.$ddmt.submenu || targetDropdownType === self.$ddmt.submenuButton) { return; }
        (<HTMLElement[]>Array.from((self.rootElement.querySelectorAll(".dropdown-item.show"))))
            .concat(self.elements.get(self.$cls.DROPDOWN_BUTTON_NAME))
            .forEach((element: HTMLElement) => {
                self.bootstrap.Dropdown.getOrCreateInstance(element)?.hide()
            });
        self.events.get(self.$cls.OUTSIDE_DROPDOWN_CLICK_EVENT_NAME)?.remove();
    }

    //#endregion Private EventHandlers
}
