import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../utilities/buttonColours";
import { Mrbr_UI_Bootstrap_Controls_Dropdown } from "./DropDown";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles } from "./Dropdown$MenuStyles";
import { Mrbr_UI_Bootstrap_Controls_DropdownMenuTypes } from "./DropdownMenuTypes";
import { Mrbr_UI_Bootstrap_Controls_DropdownEvent } from "./DropdownEvent";

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
export class Mrbr_UI_Bootstrap_Controls_SplitDropdown extends Mrbr_UI_Bootstrap_Controls_Dropdown {


    /**
     * Internal Split Dropdown Main Button Name
     * @date 12/12/2022 - 02:25:52
     *
     * @public
     * @static
     * @readonly
     * @type {"splitDropdown_mainButton"}
     */
    public static readonly SPLIT_MAIN_BUTTON_NAME = "splitDropdown_mainButton";


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_SplitDropdown.
     * @date 12/12/2022 - 02:26:07
     *
     * @constructor
     */
    constructor() {
        super(Mrbr_UI_Bootstrap_Controls_Dropdown$MenuStyles.default);
    }

    /**
     * SplitDropDown Type Alias
     * @date 12/12/2022 - 02:26:14
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_SplitDropdown}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_SplitDropdown { return Mrbr_UI_Bootstrap_Controls_SplitDropdown; }

    /**
     * Initialise SplitDropDown, load manifest, set default config and create elements
     * @date 12/12/2022 - 02:26:33
     *
     * @public
     * @template T
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<T>}
     */
    public initialise<T>(...args): Mrbr_System_Promise<T> {
        const self = this,
            cls = self.$cls,
            ctrlCfg = self.$ctrlCfg,
            htmlt = self.$htmlt,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super.initialise()
            .then(async _ => {
                await self.loadManifest(cls);
                await self.setDefaultConfig();
                const
                    splitMainButton = <HTMLElement>self.createElement(new ctrlCfg(cls.SPLIT_MAIN_BUTTON_NAME, htmlt.button, self.elementConfig.getConfig(cls.SPLIT_MAIN_BUTTON_NAME))),
                    dropdownButton = self.elements.get(cls.DROPDOWN_BUTTON_NAME);
                this.classes(dropdownButton, this.$clsActions.add, "dropdown-toggle-split")
                self.elements.get(self.rootElementName).prepend(splitMainButton);
                initalisePromise.resolve(self);
            })
        return initalisePromise;
    }
    
    /**
     * Set Default Config for SplitDropDown
     * @date 12/12/2022 - 02:27:32
     *
     * @public
     * @template T
     * @returns {Mrbr_System_Promise<T>}
     */
    public setDefaultConfig<T>(): Mrbr_System_Promise<T> {
        const self = this,
            cls = self.$cls,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`),
            ctrlPrm = self.$ctrlPrm;
        super.setDefaultConfig()
            .then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(cls.SPLIT_MAIN_BUTTON_NAME, new ctrlPrm()
                        .Classes("btn")
                        .Properties({ type: "button" })
                        .Data({ mrbrDropdownType: self.$ddmt.mainButton }));
                setDefaultConfigPromise.resolve(self);
            })
        return setDefaultConfigPromise;
    }
    /**
    * Button Text. Override to set button text as text is set on Main button element for SplitDropDown
    * @date 02/12/2022 - 01:29:17
    *
    * @public
    * @type {string}
    */
    public override get buttonText(): string { return this.__buttonText; }

    /**
     * Button Text. Override to set button text as text is set on Main button element for SplitDropDown
     */
    public override set buttonText(value: string) {
        const button = this.elements.get(this.$cls.SPLIT_MAIN_BUTTON_NAME);
        (button && value !== button.innerText) && (button.innerText = value);
        this.__buttonText = value;
    }
    private __buttonText: string = "";

    /**
    * Dropdown Button Colour override to set colour on Main button element and dropdown button for SplitDropDown
    * @date 02/12/2022 - 01:28:46
    *
    * @public
    * @type {Mrbr_UI_Bootstrap_Utilities_ButtonColours}
    */

    /**
     * Dropdown Button Colour override to set colour on Main button element and dropdown button for SplitDropDown
     */
    public set buttonColour(value: Mrbr_UI_Bootstrap_Utilities_ButtonColours) {
        const colour = super.buttonColour;
        super.buttonColour = value;
        const button = this.elements.get(this.$cls.SPLIT_MAIN_BUTTON_NAME);
        (button && this.rootElement) && (this.classes(button, this.$clsActions.replace, [colour, value]));
    }

    /**
     * NOP - SplitDropdowns cannot be submenus
     * @date 12/12/2022 - 01:46:58
     *
     * @public
     * @type {boolean}
     */
    public set isSubMenu(value: boolean) { }


    /**
     * Add OnClick Event Subscriber for DropDown MainMenu Item
     * @date 02/12/2022 - 01:44:14
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number)} callback
     * @returns {number}
     */
    public onMainButtonClick(callback: (event: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => void | number): number {
        const
            self = this,
            eventName = self.$ddie.mainButtonClick;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return self.addDeferredOnMountFn(
            eventName,
            "click",
            self.elements.get(self.$cls.SPLIT_MAIN_BUTTON_NAME),
            self.mainButtonClick_handler,
            self,
            callback
        );
    }
    /**
     * Internal OnClick Event Handler for MainMenu Button
     * @date 02/12/2022 - 01:47:31
     *
     * @private
     * @param {Event} event
     */
    private mainButtonClick_handler(event: Event): void {
        const self = this,
            target: menuTargetType = this.getMenuTarget(event);
        if (!target) { return; }
        const eventData = new self.$dded(target.element.dataset.mrbrId, event, self.$ddie.mainButtonClick, target.element);
        this.eventSubscribers.raiseEvent(new self.$dde(self.$ddie.mainButtonClick, self, eventData));
    }
}