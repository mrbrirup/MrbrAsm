import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../utilities/buttonColours";
import { Mrbr_UI_Bootstrap_Form_CheckBoxEvent } from "./checkboxEvent";
import { Mrbr_UI_Bootstrap_Form_CheckBoxEventData } from "./checkboxEventData";
import { Mrbr_UI_Bootstrap_Form_CheckBoxStates } from "./checkboxStates";
import { Mrbr_UI_Bootstrap_Form_FormCheck } from "./formCheck";

/**
 * Create a bootstrap checkbox or toggle control
 * @date 02/01/2023 - 22:34:04
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_CheckBox
 * @typedef {Mrbr_UI_Bootstrap_Form_CheckBox}
 * @extends {Mrbr_UI_Bootstrap_Form_FormCheck<Mrbr_UI_Bootstrap_Form_CheckBox>}
 */
export class Mrbr_UI_Bootstrap_Form_CheckBox extends Mrbr_UI_Bootstrap_Form_FormCheck<Mrbr_UI_Bootstrap_Form_CheckBox> {


    /**
     * Internal checkbox name
     * @date 02/01/2023 - 00:06:08
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX: string = "checkbox";

    /**
     * Checkbox wrapper class for switch style checkbox
     * @date 02/01/2023 - 00:07:08
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_WRAPPER_SWITCH: string = "form-switch";

    /**
     * Checkbox class for button style checkbox
     * @date 02/01/2023 - 00:12:48
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_BUTTON_CHECK: string = "btn-check";

    /**
     * Base button class for button style Checkbox
     * @date 02/01/2023 - 00:27:25
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_BUTTON: string = "btn";

    /**
     * Type Alias for Mrbr.UI.Bootstrap.Form.CheckBox
     * @date 02/01/2023 - 00:14:49
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public get $bsCheckBox(): typeof Mrbr_UI_Bootstrap_Form_CheckBox { return this.$bsForm.CheckBox as typeof Mrbr_UI_Bootstrap_Form_CheckBox; }

    /**
     * Type Alias for Mrbr.UI.Bootstrap.Form.CheckBoxStates
     * @date 02/01/2023 - 00:15:08
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_CheckBoxStates}
     */
    public get $bsCheckBoxStates(): typeof Mrbr_UI_Bootstrap_Form_CheckBoxStates { return this.$bsForm.CheckBoxStates as typeof Mrbr_UI_Bootstrap_Form_CheckBoxStates; }



    /**
     * Placeholder text for the checkbox, field
     * @date 02/01/2023 - 00:15:17
     *
     * @private
     * @type {string}
     */
    private _placeholder: string;



    /**
     * Switch style checkbox, field
     * @date 02/01/2023 - 00:15:51
     *
     * @private
     * @type {boolean}
     */
    private _switch: boolean = false;




    /**
     * Toggle style checkbox, field
     * @date 02/01/2023 - 00:16:22
     *
     * @private
     * @type {boolean}
     */
    private _toggleStyle: boolean = false;



    /**
     * Checked state of the checkbox, field
     * @date 02/01/2023 - 00:16:37
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Form_CheckBoxStates}
     */
    private _checked: Mrbr_UI_Bootstrap_Form_CheckBoxStates;

    /**
     * Button context style for toggle checkbox, field
     * @date 02/01/2023 - 00:17:25
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Utilities_ButtonColours}
     */
    private _buttonContextStyle: Mrbr_UI_Bootstrap_Utilities_ButtonColours;


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_CheckBox.
     * @date 02/01/2023 - 00:18:12
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
        this._inputElementName = this.$bsCheckBox.CHECKBOX;
    }



    /**
     * Button Context Style for toggle checkbox
     * @date 02/01/2023 - 00:18:22
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Utilities_ButtonColours}
     */
    public get buttonContextStyle(): Mrbr_UI_Bootstrap_Utilities_ButtonColours { return this._buttonContextStyle; }

    /**
     * Button Context Style for toggle checkbox
     */
    public set buttonContextStyle(value: Mrbr_UI_Bootstrap_Utilities_ButtonColours) {
        const element = <HTMLInputElement>this.elements.get(this.$bsCheckBox.FORMCHECK_LABEL);
        element && this.classes(element, this.$clsActions.toggle, [this.buttonContextStyle, value])
        this._buttonContextStyle = value;
    }



    /**
     * Placeholder text
     * @date 02/01/2023 - 00:19:10
     *
     * @public
     * @type {string}
     */
    public get placeholder(): string { return this._placeholder; }
    public set placeholder(value: string) {
        const element = <HTMLInputElement>this.elements.get(this.$bsCheckBox.FORMCHECK_LABEL);
        element && (element.placeholder = value);
        this._placeholder = value;
    }



    /**
     * Checked State of the checkbox
     * @date 02/01/2023 - 00:20:40
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Form_CheckBoxStates}
     */
    public get checked(): Mrbr_UI_Bootstrap_Form_CheckBoxStates {
        const
            bscb = this.$bsCheckBox,
            states = this.$bsCheckBoxStates,
            checkbox = <HTMLInputElement>this.elements.get(bscb.CHECKBOX);
        let checkState: Mrbr_UI_Bootstrap_Form_CheckBoxStates;
        if (!checkbox) { return this._checked ??= states.unchecked; }
        checkState = (checkbox.indeterminate === true) ? states.indeterminate : (checkbox.checked ? states.checked : states.unchecked);
        return this._checked ??= checkState;
    }

    /**
     * Checked State of the checkbox
     */
    public set checked(value: Mrbr_UI_Bootstrap_Form_CheckBoxStates | boolean) {
        const
            checkbox = <HTMLInputElement>this.elements.get(this.$bsCheckBox.CHECKBOX),
            states = this.$bsCheckBoxStates,
            _value = (typeof value === "boolean") ? (value ? states.checked : states.checked) : value;
        if (checkbox) {
            (value === states.indeterminate) && (checkbox.indeterminate = true) || checkbox.removeAttribute("indeterminate");
            checkbox.checked = value === states.checked;
        }
        this._checked = _value;
    }

    /**
     * Checkbox to Switch style
     * @date 02/01/2023 - 00:24:06
     *
     * @public
     * @type {boolean}
     */
    public get switch(): boolean { return this._switch; }

    /**
     * Checkbox Switch style
     */
    public set switch(value: boolean) {
        this.rootElement?.classList.toggle(this.$bsCheckBox.CHECKBOX_CLASS_WRAPPER_SWITCH, value);
        this._switch = value;
    }

    /**
     * Checkbox toggle style
     * @date 02/01/2023 - 00:25:36
     *
     * @public
     * @type {boolean}
     */
    public get toggleStyle(): boolean { return this._toggleStyle; }

    /**
     * Checkbox toggle style
     */
    public set toggleStyle(value: boolean) {
        const
            $bsCheckBox = this.$bsCheckBox,
            label = this.elements.get($bsCheckBox.FORMCHECK_LABEL),
            checkbox = this.elements.get($bsCheckBox.CHECKBOX),
            checkboxClassList = checkbox?.classList,
            labelClassList = label?.classList,
            root = this.rootElement;

        checkboxClassList?.toggle($bsCheckBox.CHECKBOX_CLASS_BUTTON_CHECK, value);
        checkboxClassList?.toggle($bsCheckBox.FORMCHECK_CLASS_CHECK_INPUT, !value);
        labelClassList?.toggle($bsCheckBox.FORMCHECK_CLASS_CHECK_LABEL, !value);
        labelClassList?.toggle($bsCheckBox.CHECKBOX_CLASS_BUTTON, value);
        root?.classList?.toggle($bsCheckBox.FORMCHECK_CLASS_WRAPPER_HAS_LABEL, !value);
        if (value) { root?.prepend(checkbox) }
        else { root?.append(checkbox); }
        checkbox?.setAttribute("autocomplete", "off");
        if (label) {
            if (!value && this.buttonContextStyle) { label.classList.remove(this.buttonContextStyle); }
            else { this.buttonContextStyle && (this.buttonContextStyle = this.buttonContextStyle); }
        }
        this._toggleStyle = value;
    }

    /**
     * Initialises the control, loads the manifest and sets the default config
     * @date 02/01/2023 - 00:28:39
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_CheckBox>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_CheckBox> {
        const
            self = this,
            bsCheckBox = self.$bsCheckBox,
            controlName = bsCheckBox[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Form_CheckBox>(`${controlName}:initialise`);
        super
            .initialise(...args)
            .then(async _ => {
                await self.loadManifest(bsCheckBox);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        self.createElement(new self.$ctrlCfg(bsCheckBox.CHECKBOX, self.$htmlt.input, self.elementConfig.getConfig(bsCheckBox.CHECKBOX)))
                    )));
                self.Label(self.label)
                    .Disabled(self.disabled)
                    .Inline(self.inline)
                    .Reverse(self.reverse)
                    .AriaLabel(self.ariaLabel)
                    .Checked(self.checked)
                    .Switch(self.switch)
                    .ToggleStyle(self.toggleStyle)
                    .ButtonContextStyle(self.buttonContextStyle)
                    .Value(self.value);

                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }

    /**
     * Sets the default config for the control
     * @date 02/01/2023 - 00:28:59
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_CheckBox>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_CheckBox> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName ?? self.$bsCheckBox[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Form_CheckBox>(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig({ controlName })
            .then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsCheckBox.CHECKBOX, new self.$ctrlPrm()
                        .Properties({ type: "checkbox" })
                        .Classes("form-check-input"));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error));
        return setDefaultConfigPromise;
    }

    /**
     * Sets the switch state for the checkbox, fluent interface
     * @date 02/01/2023 - 00:29:38
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public Switch(value: boolean): Mrbr_UI_Bootstrap_Form_CheckBox { this.switch = value; return this; }
    /**
     * Sets the checked state for the checkbox, fluent interface
     * @date 02/01/2023 - 00:29:23
     *
     * @public
     * @param {(Mrbr_UI_Bootstrap_Form_CheckBoxStates | boolean)} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public Checked(value: Mrbr_UI_Bootstrap_Form_CheckBoxStates | boolean): Mrbr_UI_Bootstrap_Form_CheckBox { this.checked = value; return this; }

    /**
     * Sets the toggle style for the checkbox, fluent interface
     * @date 02/01/2023 - 00:30:07
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public ToggleStyle(value: boolean): Mrbr_UI_Bootstrap_Form_CheckBox { this.toggleStyle = value; return this; }

    /**
     * Sets the button context style for the checkbox, fluent interface
     * @date 02/01/2023 - 00:30:15
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Utilities_ButtonColours} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public ButtonContextStyle(value: Mrbr_UI_Bootstrap_Utilities_ButtonColours): Mrbr_UI_Bootstrap_Form_CheckBox { this.buttonContextStyle = value; return this; }

    /**
     * Add/Remove InputChanged event subscriber
     * @date 02/01/2023 - 00:30:22
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => number} callback
     * @returns {number}
     */
    public onInputChanged(callback: (event: Mrbr_System_Events_Event<any>) => number): number {
        const eventName = this.$bsCheckBox.INPUT_CHANGE_EVENT_NAME;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.elements.get(this.$bsCheckBox.CHECKBOX),
            this.checkboxInput_handler,
            this,
            callback
        );
    }

    /**
     * InputChanged event handler
     * @date 02/01/2023 - 00:30:34
     *
     * @private
     * @param {Event} event
     */
    private checkboxInput_handler(event: Event): void {
        const eventName = this.$bsCheckBox.INPUT_CHANGE_EVENT_NAME;
        event.stopPropagation();
        event.preventDefault();
        const
            bscb = this.$bsCheckBox,
            states = this.$bsCheckBoxStates,
            checkbox = <HTMLInputElement>this.elements.get(bscb.CHECKBOX);
        let checkState: Mrbr_UI_Bootstrap_Form_CheckBoxStates = (checkbox.indeterminate === true) ? states.indeterminate : (checkbox.checked ? states.checked : states.unchecked);
        this.eventSubscribers.raiseEvent(new Mrbr_UI_Bootstrap_Form_CheckBoxEvent(eventName, this, new Mrbr_UI_Bootstrap_Form_CheckBoxEventData(event, checkState)));
    }
}