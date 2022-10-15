import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Bootstrap_Controls_Dropdown } from "./DropDown";
type buttonColourType = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.buttonColours;
type dropdownButtonSizeType = typeof Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes;
export class Mrbr_UI_Bootstrap_Controls_SplitDropdown extends Mrbr_UI_Bootstrap_Controls_Dropdown {
    public static SPLIT_DROPDOWN_NAME = "Mrbr_UI_Bootstrap_SplitDropdown";
    public static SPLIT_DROPDOWN_CONTAINER_NAME = "Mrbr_UI_Bootstrap_SplitDropdown_container";
    public static SPLIT_DROPDOWN_NON_VISUAL_TEXT_NAME = "Split Dropdown";
    public static SPLIT_MAIN_BUTTON_NAME = "Mrbr_UI_Bootstrap_SplitDropdown_mainButton";
    private _splitHiddenText: string = "Split Dropdown";
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_SplitDropdown { return Mrbr_UI_Bootstrap_Controls_SplitDropdown; }
    public set buttonColour(value: buttonColourType[keyof buttonColourType]) {
        const self = this,
            button = self.elements[self.$cls.SPLIT_DROPDOWN_NAME];
        if (button && self.rootElement) {
            self.classes(button, self.$clsActions.Remove, self.buttonColour);
            self.classes(button, self.$clsActions.Add, value);
        }
        super.buttonColour = value;
    }

    public set buttonSize(value: dropdownButtonSizeType[keyof dropdownButtonSizeType]) {
        const self = this;
        let button = self.elements[self.$cls.SPLIT_DROPDOWN_NAME];
        if (button && self.rootElement) {
            self.classes(button, self.$clsActions.Remove, self.buttonSize);
            self.classes(button, self.$clsActions.Add, value);
        }
        button = self.elements[self.$cls.SPLIT_MAIN_BUTTON_NAME];
        if (button && self.rootElement) {
            self.classes(button, self.$clsActions.Remove, self.buttonSize);
            self.classes(button, self.$clsActions.Add, value);
        }

        super.buttonSize = value;
    }


    public get buttonText(): string { return super.buttonText; }
    public set buttonText(value: string) {
        const self = this,
            button = self.elements[self.$cls.SPLIT_MAIN_BUTTON_NAME];
        (button && value !== button.innerText) && (button.innerText = value);
        super.buttonText = value;
    }
    public get splitHiddenText(): string { return this._splitHiddenText; }
    public set splitHiddenText(value: string) {
        const self = this,
            splitHiddenText = self.elements[self.$cls.SPLIT_DROPDOWN_NON_VISUAL_TEXT_NAME];
        (splitHiddenText && value !== splitHiddenText.innerText) && (splitHiddenText.innerText = value);
        self._splitHiddenText = value;
    }
    public override initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Dropdown> {
        const self = this,
            initalisePromise = self.$promise.create("Mrbr_UI_Bootstrap_SplitDropdown:initialise");
        super.initialise(args).then(async _ => {
            await this.setDefaultConfig();
            let
                nonVisualText = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.SPLIT_DROPDOWN_NON_VISUAL_TEXT_NAME, "span", self.configuration(self.$cls.SPLIT_DROPDOWN_NON_VISUAL_TEXT_NAME))),
                mainButton = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.SPLIT_MAIN_BUTTON_NAME, "button", self.configuration(self.$cls.SPLIT_MAIN_BUTTON_NAME))
                    .Classes(super.buttonColour)),
                splitButton = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.SPLIT_DROPDOWN_NAME, "button", self.configuration(self.$cls.SPLIT_DROPDOWN_NAME))
                    .Children([nonVisualText])
                ),
                menuItemContainer = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME, (self.menuStyle === self.$cls.menuStyles.default ? "ul" : "div"), self.configuration(self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME)));
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.SPLIT_DROPDOWN_CONTAINER_NAME))
                .Children([mainButton, splitButton, menuItemContainer]));
            self.classes(mainButton, self.$clsActions.Remove, "dropdown-toggle")
            self.splitHiddenText = self._splitHiddenText;
            self.defaultContainerElementName = self.$cls.DROPDOWN_MENUITEM_CONTAINER_NAME;
            self.buttonText = super.buttonText;
            self.buttonColour = self.buttonColour;
            self.darkDropdown = self.darkDropdown;
            self.buttonSize = self.buttonSize;
            self.alignment = self.alignment;
            self.dropdownPosition = self.dropdownPosition;
            self.autoClose = self.autoClose;
            initalisePromise.resolve(self);
        })
        return initalisePromise;
    }

    override setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Dropdown> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create("Mrbr_UI_Bootstrap_SplitDropdown:setDefaultConfig");
        super.setDefaultConfig().then(_ => {
            !self.hasConfiguration(self.$cls.SPLIT_DROPDOWN_NAME) && self.defaultConfig.add(self.$cls.SPLIT_DROPDOWN_NAME, new self.$ctrlPrm()
                .Classes("btn dropdown-toggle-split dropdown-toggle")
                .Data({ bsToggle: "dropdown" })
                .Aria({ expanded: "false" })
            );
            !self.hasConfiguration(self.$cls.SPLIT_DROPDOWN_CONTAINER_NAME) && self.defaultConfig.add(self.$cls.SPLIT_DROPDOWN_CONTAINER_NAME, new self.$ctrlPrm()
                .Classes("btn-group")
            );
            !self.hasConfiguration(self.$cls.SPLIT_DROPDOWN_NON_VISUAL_TEXT_NAME) && self.defaultConfig.add(self.$cls.SPLIT_DROPDOWN_NON_VISUAL_TEXT_NAME, new self.$ctrlPrm()
                .Classes("visually-hidden"));
            !self.hasConfiguration(self.$cls.SPLIT_MAIN_BUTTON_NAME) && self.defaultConfig.add(self.$cls.SPLIT_MAIN_BUTTON_NAME, new self.$ctrlPrm()
                .Classes("btn"));
            setDefaultConfigPromise.resolve(self);
        })
        return setDefaultConfigPromise;
    }
}