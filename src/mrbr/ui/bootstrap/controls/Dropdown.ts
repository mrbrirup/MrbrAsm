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
        freeText: "free-text"
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
    private _buttonColour: buttonColourType[keyof buttonColourType] = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonColours.primary;
    private _buttonText: string = "Dropdown";
    private _darkDropdown: boolean = false;
    private _menuStyle: dropdownMenuStyle[keyof dropdownMenuStyle] = Mrbr_UI_Bootstrap_Controls_Dropdown.menuStyles.default;
    private _buttonSize: dropdownButtonSizeType[keyof dropdownButtonSizeType] = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes.default;
    private _autoClose: autoClosingType[keyof autoClosingType] = Mrbr_UI_Bootstrap_Controls_Dropdown.autoClosing.true;
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

    private _alignment: dropdownAlignmentType[keyof dropdownAlignmentType] = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownAlignments.default;
    public get alignment(): dropdownAlignmentType[keyof dropdownAlignmentType] { return this._alignment; }
    public set alignment(value: dropdownAlignmentType[keyof dropdownAlignmentType]) {
        const self = this,
            menuItemContainer = self.defaultContainerElement;
        if (menuItemContainer) {
            (self.rootElement && self.alignment !== self.$cls.dropdownAlignments[self.$cls.dropdownAlignments.default]) && (self.classes(menuItemContainer, self.$clsActions.Remove, self._alignment));
            self.rootElement && (self.classes(menuItemContainer, self.$clsActions.Add, value));
        }
        const button = self.elements[self.$cls.DROPDOWN_BUTTON_NAME];
        if (button) {
            if (self.rootElement && self.alignment !== self.$cls.dropdownAlignments[self.$cls.dropdownAlignments.default]) { (self.dataset(button, { bsDisplay: "static" })); }
            else { self.dataset(button, { bsDisplay: self.$cls.DELETE }); }
        }
        self._alignment = value;
    }

    private _dropdownPosition: dropdownPostionType[keyof dropdownPostionType] = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownPositions.default;
    public get dropdownPosition(): dropdownPostionType[keyof dropdownPostionType] { return this._dropdownPosition; }
    public set dropdownPosition(value: dropdownPostionType[keyof dropdownPostionType]) {
        const self = this,
            menuItemContainer = self.rootElement;
        if (menuItemContainer) {
            (self.rootElement && self.dropdownPosition !== self.$cls.dropdownPositions[self.$cls.dropdownPositions.default]) && (self.classes(menuItemContainer, self.$clsActions.Remove, self._dropdownPosition));
            self.rootElement && (self.classes(menuItemContainer, self.$clsActions.Add, value));
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
            button = self.elements[self.$cls.DROPDOWN_BUTTON_NAME];
        (button && value !== button.innerText) && (button.innerText = value);
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

            let button = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.DROPDOWN_BUTTON_NAME, "button", self.configuration(self.$cls.DROPDOWN_BUTTON_NAME))
                .Classes(self._buttonColour)),
                menuItemContainer = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME, (self.menuStyle === self.$cls.menuStyles.default ? "ul" : "div"), self.configuration(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME)));
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.DROPDOWN_NAME))
                .Children([button, menuItemContainer])
            );
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

        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Dropdown:setDefaultConfig", self);
    }


    public addMenuItem(id: string, text: string): HTMLElement {
        const self = this;
        let link = <HTMLAnchorElement>self.createElement(new self.$ctrlCfg(`${id}_anchor`, "a", self.configuration(self.$cls.DROPDOWN_MENUITEM_NAME))),
            item = <HTMLElement>self.createElement(new self.$ctrlCfg(id, "li")
                .Children([link])
                .Properties({
                    href: "#",
                    innerText: text
                })
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
                .Children([textElement]))
        self.defaultContainerElement.prepend(item);
        return item;
    }

    public addDividerMenuItem(id: string): HTMLElement {
        const self = this;
        let divider = <HTMLElement>self.createElement(new self.$ctrlCfg(`${id}_hr`, "hr", self.configuration(self.$cls.DROPDOWN_DIVIDER_NAME))),
            item = <HTMLElement>self.createElement(new self.$ctrlCfg(id, "li")
                .Children([divider])
            )
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
    public offset(x?: number, y?: number) {
        const self = this;
        let _x = x | 0,
            _y = y | 0;
        if (x === 0 && y === 0) {
            self.dataset(self.rootElement, { "offset": self.$cls.DELETE });
        } else {
            self.dataset(self.rootElement, { "offset": `${_x},${_y}` });
        }
    }

}