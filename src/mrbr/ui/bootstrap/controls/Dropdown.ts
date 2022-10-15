import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";

type buttonColourType = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.buttonColours;

type dropdownAlignmentType = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownAlignments;

type dropdownPostionType = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownPositions;

type dropdownMenuStyle = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.menuStyles;

type dropdownButtonSizeType = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes;

type autoClosingType = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.autoClosing;

export class Mrbr_UI_Bootstrap_Controls_Dropdown extends Mrbr_UI_Controls_Control {
    public static DROPDOWN_NAME = "Mrbr_UI_Bootstrap_Dropdown";
    public static DROPDOWN_BUTTON_NAME = "Mrbr_UI_Bootstrap_Dropdown_button";
    public static DROPDOWN_MENUITEM_CONTAINER_NAME = "Mrbr_UI_Bootstrap_Dropdown_menuItemContainer";
    public static DROPDOWN_MENUITEM_NAME = "Mrbr_UI_Bootstrap_Dropdown_menuItem";
    public static DROPDOWN_DIVIDER_NAME = "Mrbr_UI_Bootstrap_Dropdown_dividerItem";
    public static DROPDOWN_SUBMENU_NAME = "Mrbr_UI_Bootstrap_Dropdown_submenu";
    public static DROPDOWN_SUBMENU_LINK_NAME = "Mrbr_UI_Bootstrap_Dropdown_submenuLink";
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Dropdown { return Mrbr_UI_Bootstrap_Controls_Dropdown; }
    public static buttonColours = {
        primary: "btn-primary",
        secondary: "btn-secondary",
        success: "btn-success",
        danger: "btn-danger",
        warning: "btn-warning",
        info: "btn-info",
        light: "btn-light",
        dark: "btn-dark"
    } as const;
    public static dropdownPositions = {
        centred: "dropdown_center",
        dropUp: "dropup",
        dropUpCentred: "dropup dropup_center",
        dropEnd: "dropend",
        dropStart: "dropstart",
        default: ""
    } as const
    public static dropdownAlignments = {
        end: "dropdown-menu-end",
        start: "dropdown-menu-start",
        smEnd: "dropdown-menu-sm-end",
        mdEnd: "dropdown-menu-md-end",
        lgEnd: "dropdown-menu-lg-end",
        xlEnd: "dropdown-menu-xl-end",
        xxlEnd: "dropdown-menu-xxl-end",
        smStart: "dropdown-menu-sm-start",
        mdStart: "dropdown-menu-md-start",
        lgStart: "dropdown-menu-lg-start",
        xlStart: "dropdown-menu-xl-start",
        xxlStart: "dropdown-menu-xxl-start",
        default: ""
    } as const
    public static menuStyles = {
        default: "",
        form: "form",
        freeText: "free-text",
        subMenu: "sub-menu"
    } as const;
    public static buttonSizes = {
        large: "btn-lg",
        small: "btn-sm",
        default: ""
    } as const;
    public static references = {
        parent: "parent",
        toggle: "toggle",
        default: "default"
    } as const;
    public static autoClosing = {
        true: "true",
        inside: "inside",
        outside: "outside",
        false: "false",
        default: "default"
    } as const;
    private _alignment: dropdownAlignmentType[keyof dropdownAlignmentType] = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownAlignments.default;
    private _buttonColour: buttonColourType[keyof buttonColourType] = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonColours.primary;
    private _buttonText: string = "Dropdown";
    private _darkDropdown: boolean = false;
    private _menuStyle: dropdownMenuStyle[keyof dropdownMenuStyle] = Mrbr_UI_Bootstrap_Controls_Dropdown.menuStyles.default;
    private _buttonSize: dropdownButtonSizeType[keyof dropdownButtonSizeType] = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes.default;
    private _autoClose: autoClosingType[keyof autoClosingType] = Mrbr_UI_Bootstrap_Controls_Dropdown.autoClosing.true;
    private _isSubMenu: boolean = false;
    private _bootstrapDown: any = null;;
    private _dropdownPosition: dropdownPostionType[keyof dropdownPostionType] = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownPositions.default;
    public get isSubMenu(): boolean { return this._isSubMenu; }
    public set isSubMenu(value: boolean) { this._isSubMenu = value; }
    public get autoClose(): autoClosingType[keyof autoClosingType] { return this._autoClose; }
    public set autoClose(value: autoClosingType[keyof autoClosingType]) {
        const self = this,
            button = self.elements[self.$cls.DROPDOWN_BUTTON_NAME];
        if (button && self.rootElement) {
            self.dataset(button, { bsAutoClose: value === self.$cls.autoClosing.default ? self.$cls.DELETE : value });
        }
        this._autoClose = value;
    }
    public get buttonSize(): dropdownButtonSizeType[keyof dropdownButtonSizeType] { return this._buttonSize; }
    public set buttonSize(value: dropdownButtonSizeType[keyof dropdownButtonSizeType]) {
        const self = this,
            button = self.elements[self.$cls.DROPDOWN_BUTTON_NAME];
        if (button && self.rootElement) {
            self.classes(button, self.$clsActions.Remove, self._buttonSize);
            self.classes(button, self.$clsActions.Add, value);
        }
        this._buttonSize = value;
    }
    public get menuStyle(): dropdownMenuStyle[keyof dropdownMenuStyle] { return this._menuStyle; }
    public get alignment(): dropdownAlignmentType[keyof dropdownAlignmentType] { return this._alignment; }
    public set alignment(value: dropdownAlignmentType[keyof dropdownAlignmentType]) {
        const self = this,
            menuItemContainer = self.defaultContainerElement;
        if (menuItemContainer) {
            if (self.alignment === self.$cls.dropdownAlignments.default) { (self.classes(menuItemContainer, self.$clsActions.Add, value)) }
            else { self.classes(menuItemContainer, self.$clsActions.Remove, self._alignment); }
        }
        const button = self.elements[self.$cls.DROPDOWN_BUTTON_NAME];
        if (button) {
            if (self.alignment !== self.$cls.dropdownAlignments[self.$cls.dropdownAlignments.default]) { self.dataset(button, { bsDisplay: "static" }); }
            else { self.dataset(button, { bsDisplay: self.$cls.DELETE }); }
        }
        self._alignment = value;
    }
    public get dropdownPosition(): dropdownPostionType[keyof dropdownPostionType] { return this._dropdownPosition; }
    public set dropdownPosition(value: dropdownPostionType[keyof dropdownPostionType]) {
        const self = this,
            menuItemContainer = self.rootElement;
        if (menuItemContainer && self.rootElement) {
            if (self.dropdownPosition !== self.$cls.dropdownPositions[self.$cls.dropdownPositions.default]) { self.classes(menuItemContainer, self.$clsActions.Remove, self._dropdownPosition); }
            else { self.classes(menuItemContainer, self.$clsActions.Add, value); }
        }
        self._dropdownPosition = value;
    }
    public get darkDropdown(): boolean { return this._darkDropdown; }
    public set darkDropdown(value: boolean) {
        const self = this,
            menuItemContainer = self.elements[self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME];
        menuItemContainer && self.classes(menuItemContainer, value ? self.$clsActions.Add : self.$clsActions.Remove, "dropdown-menu-dark");
        self._darkDropdown = value;
    }
    public get buttonText(): string { return this._buttonText; }
    public set buttonText(value: string) {
        const self = this,
            button = self.isSubMenu ? self.elements[self.$cls.DROPDOWN_SUBMENU_LINK_NAME] : self.elements[self.$cls.DROPDOWN_BUTTON_NAME];
        if (self.isSubMenu) {
            let textElement = document.querySelector(`${self.$cls.DROPDOWN_SUBMENU_LINK_NAME} > div.mrbr-info-text`)
            textElement && (textElement.textContent = value);
        }
        else {
            (button && value !== button.innerText) && (button.innerText = value);
        }
        self._buttonText = value;
    }
    public get buttonColour(): buttonColourType[keyof buttonColourType] { return this._buttonColour; }
    public set buttonColour(value: buttonColourType[keyof buttonColourType]) {
        const self = this,
            button = self.elements[self.$cls.DROPDOWN_BUTTON_NAME];
        if (button && self.rootElement) {
            self.classes(button, self.$clsActions.Remove, self._buttonColour);
            self.classes(button, self.$clsActions.Add, value);
        }
        self._buttonColour = value;
    }

    constructor(rootElementName: string, dropdownMenuStyle: dropdownMenuStyle[keyof dropdownMenuStyle] = Mrbr_UI_Bootstrap_Controls_Dropdown.menuStyles.default) {
        super(rootElementName);
        const self = this;
        self._menuStyle = dropdownMenuStyle;
    }
    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Dropdown> {
        const self = this,
            initalisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Dropdown:initialise");
        super.initialise(args).then(async _ => {
            await this.setDefaultConfig();


            if (self.isSubMenu === true) {
                //.Classes(self._buttonColour));

                let buttonLink = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.DROPDOWN_SUBMENU_LINK_NAME, "a", self.configuration(self.$cls.DROPDOWN_SUBMENU_LINK_NAME)
                    .Template(`<div class="d-flex" >` +
                        `<div class="mrbr-info-text flex-grow-1">Dropdown</div>` +
                        `<div class="flex-shrink-0" >` +
                        `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox = "0 0 16 16" >` +
                        `<path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" > </path>` +
                        `</svg>` +
                        `</div>` +
                        `</div>`)
                    .Data({ mrbrDropdownType: "dropdown_button" })
                )),
                    menuItemContainer = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME, (self.menuStyle === self.$cls.menuStyles.default ? "ul" : "div"), self.configuration(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME)
                    ));
                self.createElement(new self.$ctrlCfg(self.rootElementName, "li", self.configuration(self.$cls.DROPDOWN_SUBMENU_NAME)
                    .Children([buttonLink, menuItemContainer])
                    .Data({ mrbrDropdownType: "dropdown_submenu" })
                ))
                self.events[`${self.rootElementName}_show.bs.dropdown`] = new Mrbr_System_Events_EventHandler("show.bs.dropdown", self.elements[self.rootElementName], self.setSubMenuPosition, self);
                self.events[`${self.rootElementName}_hidden.bs.dropdown`] = new Mrbr_System_Events_EventHandler("hidden.bs.dropdown", self.elements[self.rootElementName], self.resetSubMenuPosition, self);
            }
            else {
                let button = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.DROPDOWN_BUTTON_NAME, "button", self.configuration(self.$cls.DROPDOWN_BUTTON_NAME)
                    .Data({ mrbrDropdownType: "dropdown_button" })
                    .Classes(self._buttonColour))),
                    menuItemContainer = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME, (self.menuStyle === self.$cls.menuStyles.default ? "ul" : "div"), self.configuration(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME)));
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.DROPDOWN_NAME)
                    .Children([button, menuItemContainer])
                    .Data({ mrbrDropdownType: "dropdown_container" })
                ));
            }
            self.defaultContainerElementName = self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME;
            self.buttonText = self._buttonText;
            self.buttonColour = self._buttonColour;
            self.darkDropdown = self._darkDropdown;
            self.buttonSize = self._buttonSize;
            self.alignment = self._alignment;
            self.dropdownPosition = self._dropdownPosition;
            self.autoClose = self._autoClose;

            initalisePromise.resolve(self);
        })
        return initalisePromise;
    }
    resetSubMenuPosition(event: any) {
        const self = this;
        self._bootstrapDown && self.$mrbr.host.bootstrap.Dropdown.getOrCreateInstance(event.relatedTarget).dispose();
        self._bootstrapDown = null;
    }
    setSubMenuPosition(event: any) {
        const self = this;
        if (self._paddingTop === null) {
            let top = parseInt(getComputedStyle(self.defaultContainerElement).paddingTop);
            self._paddingTop = isNaN(top) ? 0 : top;
        }
        let link = self.elements[self.$cls.DROPDOWN_SUBMENU_LINK_NAME],
            offset = [self.rootElement.offsetWidth, -link.offsetHeight - self._paddingTop],
            counter = 0,
            setOptions = () => {
                !self._bootstrapDown && (self._bootstrapDown = self.$mrbr.host.bootstrap.Dropdown.getOrCreateInstance(event.relatedTarget));
                let fnOptions = self._bootstrapDown?._popper?.setOptions;
                if (typeof fnOptions === "function") {
                    fnOptions({ modifiers: [{ name: "offset", options: { offset: offset } }] })
                    requestAnimationFrame(() => { self.defaultContainerElement.style.inset = "0px 0px auto 0px"; })
                    return;
                }
                (counter++ < 60) && requestAnimationFrame(() => setOptions());
            }
        setOptions();
    }
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Dropdown> {
        const self = this;
        super.setDefaultConfig();
        !self.hasConfiguration(self.$cls.DROPDOWN_NAME) && self.defaultConfig.add(self.$cls.DROPDOWN_NAME, new self.$ctrlPrm()
            .Classes("btn-group")
        );
        !self.hasConfiguration(self.$cls.DROPDOWN_BUTTON_NAME) && self.defaultConfig.add(self.$cls.DROPDOWN_BUTTON_NAME, new self.$ctrlPrm()
            .Classes("btn dropdown-toggle")
            .Attributes({ "type": "button" })
            .Data({ bsToggle: "dropdown" })
            .Aria({ expanded: false })
        );
        !self.hasConfiguration(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME) && self.defaultConfig.add(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME, new self.$ctrlPrm()
            .Classes("dropdown-menu")
        );
        !self.hasConfiguration(self.$cls.DROPDOWN_MENUITEM_NAME) && self.defaultConfig.add(self.$cls.DROPDOWN_MENUITEM_NAME, new self.$ctrlPrm()
            .Classes("dropdown-item")
        )
        !self.hasConfiguration(self.$cls.DROPDOWN_DIVIDER_NAME) && self.defaultConfig.add(self.$cls.DROPDOWN_DIVIDER_NAME, new self.$ctrlPrm()
            .Classes("dropdown-divider")
        )
        !self.hasConfiguration(self.$cls.DROPDOWN_SUBMENU_NAME) && self.defaultConfig.add(self.$cls.DROPDOWN_SUBMENU_NAME, new self.$ctrlPrm());
        !this.hasConfiguration(self.$cls.DROPDOWN_SUBMENU_LINK_NAME) && self.defaultConfig.add(self.$cls.DROPDOWN_SUBMENU_LINK_NAME, new self.$ctrlPrm()
            .Classes("dropdown-item")
            .Data({ bsToggle: "dropdown" })
            .Aria({ expanded: false })
        );


        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Dropdown:setDefaultConfig", self);
    }


    private stopPropagation(event: Event) {
        event.stopPropagation();
        console.log(event);
    }


    public addSubMenuItem(subMenu: Mrbr_UI_Bootstrap_Controls_Dropdown): Mrbr_UI_Bootstrap_Controls_Dropdown {
        const self = this
        subMenu.isSubMenu = true;
        self.defaultContainerElement.appendChild(subMenu.rootElement);
        self.events[`${self.rootElementName}_click`] = new Mrbr_System_Events_EventHandler("hide.bs.dropdown", self.elements[self.rootElementName], self.stopPropagation, self);
        // subMenu.rootElement.addEventListener("click", function(event) {
        //     event.stopPropagation();
        // });
        return subMenu;
    }


    public addMenuItem(id: string, text: string): HTMLElement {
        const self = this;
        let link = <HTMLAnchorElement>self.createElement(new self.$ctrlCfg(`${id}_anchor`, "a", self.configuration(self.$cls.DROPDOWN_MENUITEM_NAME))
            .Properties({
                href: "#",
                innerText: text
            })),
            item = <HTMLElement>self.createElement(new self.$ctrlCfg(id, "li")
                .Children([link])
                .Data({ mrbrDropdownType: "dropdown_menuitem" })
            )

        self.defaultContainerElement.appendChild(item);
        return item;
    }
    public addHeaderMenuItem(id: string, text: string): HTMLElement {
        const self = this;
        let textElement = <HTMLElement>self.createElement(new self.$ctrlCfg(`${id}_text`, "h6")
            .Properties({ innerText: text })
        ),
            item = <HTMLElement>self.createElement(new self.$ctrlCfg(id, "li")
                .Classes("dropdown-header user-select-none pointer-events-none")
                .Children([textElement])
                .Data({ mrbrDropdownType: "dropdown_header" })
            )
        self.defaultContainerElement.prepend(item);
        return item;
    }

    public addDividerMenuItem(id: string): HTMLElement {
        const self = this;
        let divider = <HTMLElement>self.createElement(new self.$ctrlCfg(`${id}_hr`, "hr", self.configuration(self.$cls.DROPDOWN_DIVIDER_NAME))),
            item = <HTMLElement>self.createElement(new self.$ctrlCfg(id, "li")
                .Children([divider])
                .Data({ mrbrDropdownType: "dropdown_divider" }))
        self.defaultContainerElement.appendChild(item);
        return item;
    }
    public itemActiveState(id: string, active: boolean = true): void {
        const self = this,
            item = self.elements[`${id}_anchor`];
        (item) && (self.classes(id, active ? self.$clsActions.Add : self.$clsActions.Remove, "active"))
    }
    public itemDisabledState(id: string, disabled: boolean = true): void {
        const self = this,
            item = self.elements[`${id}_anchor`];
        (item) && (self.classes(id, disabled ? self.$clsActions.Add : self.$clsActions.Remove, "disabled"))
    }
    private _paddingTop: number = null;
}