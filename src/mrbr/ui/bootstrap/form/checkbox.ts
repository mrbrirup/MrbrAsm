import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapFormControl } from "../controls/BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../utilities/buttonColours";
import { Mrbr_UI_Bootstrap_Form_CheckBoxEvent } from "./checkboxEvent";
import { Mrbr_UI_Bootstrap_Form_CheckBoxEventData } from "./checkboxEventData";
import { Mrbr_UI_Bootstrap_Form_CheckBoxStates } from "./checkboxStates";

/**
 * Create a bootstrap checkbox or toggle control
 * @date 02/01/2023 - 00:05:46
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_CheckBox
 * @typedef {Mrbr_UI_Bootstrap_Form_CheckBox}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapFormControl}
 */
export class Mrbr_UI_Bootstrap_Form_CheckBox extends Mrbr_UI_Bootstrap_Controls_BootstrapFormControl {


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
     * Internal checkbox label name
     * @date 02/01/2023 - 00:06:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_LABEL: string = "checkbox_label";

    /**
     * Internal checkbox wrapper name
     * @date 02/01/2023 - 00:06:31
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_LABEL_WRAPPER: string = "checkbox_Label_Wrapper";

    /**
     * Checkbox wrapper class when a label is present
     * @date 02/01/2023 - 00:06:49
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_WRAPPER_HAS_LABEL: string = "form-check";

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
     * Checkbox wrapper class for inline style checkbox
     * @date 02/01/2023 - 00:12:02
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_WRAPPER_INLINE: string = "form-check-inline";

    /**
     * Checkbox label class
     * @date 02/01/2023 - 00:12:12
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_CHECK_LABEL: string = "form-check-label";

    /**
     * Checkbox input class
     * @date 02/01/2023 - 00:12:32
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_CHECK_INPUT: string = "form-check-input";

    /**
     * Checkbox wrapper class for reverse style checkbox
     * @date 02/01/2023 - 00:12:40
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CHECKBOX_CLASS_WRAPPER_REVERSE: string = "form-check-reverse";

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
     * Event name for changes to the checkbox
     * @date 02/01/2023 - 00:13:08
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly INPUT_CHANGE_EVENT_NAME: string = "input";


    /**
     * Namespace Alias for Mrbr.UI.Bootstrap.Form
     * @date 02/01/2023 - 00:13:36
     *
     * @public
     * @readonly
     * @type {*}
     */
    public get $bsForm(): any { return this[Symbol.for("Mrbr.UI.Bootstrap.Form")] ??= this.$mrbrInstance.host["Mrbr"].UI.Bootstrap.Form; }

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
     * Label text for the checkbox, field
     * @date 02/01/2023 - 00:15:38
     *
     * @private
     * @type {string}
     */
    private _label: string;

    /**
     * Disabled state of the checkbox, field
     * @date 02/01/2023 - 00:15:44
     *
     * @private
     * @type {boolean}
     */
    private _disabled: boolean = false;

    /**
     * Switch style checkbox, field
     * @date 02/01/2023 - 00:15:51
     *
     * @private
     * @type {boolean}
     */
    private _switch: boolean = false;

    /**
     * Inline style checkbox, field
     * @date 02/01/2023 - 00:16:02
     *
     * @private
     * @type {boolean}
     */
    private _inline: boolean = false;

    /**
     * Reverse style checkbox, field
     * @date 02/01/2023 - 00:16:10
     *
     * @private
     * @type {boolean}
     */
    private _reverse: boolean = false;

    /**
     * Aria label for the checkbox, field
     * @date 02/01/2023 - 00:16:16
     *
     * @private
     * @type {string}
     */
    private _ariaLabel: string;

    /**
     * Toggle style checkbox, field
     * @date 02/01/2023 - 00:16:22
     *
     * @private
     * @type {boolean}
     */
    private _toggleStyle: boolean = false;

    /**
     * Value of the checkbox not the check state, use checked property for checked state, field
     * @date 02/01/2023 - 00:16:30
     *
     * @private
     * @type {string}
     */
    private _value: string;

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
        const element = <HTMLInputElement>this.elements.get(this.$bsCheckBox.CHECKBOX_LABEL);
        element && this.classes(element, this.$clsActions.toggle, [this.buttonContextStyle, value])
        this._buttonContextStyle = value;
    }

    /**
     * The value fo the checkbox, not the checked state
     * @date 02/01/2023 - 00:18:50
     *
     * @public
     * @type {string}
     */
    public get value(): string { return this._value; }

    /**
     * The value fo the checkbox, not the checked state
     */
    public set value(value: string) {
        const element = <HTMLInputElement>this.elements.get(this.$bsCheckBox.CHECKBOX_LABEL);
        element && (element.value = value);
        this._value = value;
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
        const element = <HTMLInputElement>this.elements.get(this.$bsCheckBox.CHECKBOX_LABEL);
        element && (element.placeholder = value);
        this._placeholder = value;
    }

    /**
     * Label text for the checkbox
     * @date 02/01/2023 - 00:19:25
     *
     * @public
     * @type {string}
     */
    public get label(): string { return this._label; }
    /**
     * Label text for the checkbox
     */
    public set label(value: string) {
        let labelElement = this.elements.get(this.$bsCheckBox.CHECKBOX_LABEL);
        const
            root = this.rootElement,
            bscb = this.$bsCheckBox,
            checkbox = <HTMLInputElement>this.elements.get(bscb.CHECKBOX);
        if (root) {
            if (!labelElement) {
                labelElement = <HTMLLabelElement>this.createElement(new this.$ctrlCfg(bscb.CHECKBOX_LABEL, this.$htmlt.label, this.elementConfig.get(bscb.CHECKBOX_LABEL)));
                (labelElement as HTMLLabelElement).htmlFor = checkbox.id;
            }
            root && labelElement.parentElement !== root && root.prepend(labelElement);
            root?.classList.toggle(bscb.CHECKBOX_CLASS_WRAPPER_HAS_LABEL, !!value);
            labelElement.innerText = value;
        }
        if (!this.ariaLabel) { this.ariaLabel = value; }
        this._label = value;
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
     * Disabled State of the checkbox
     * @date 02/01/2023 - 00:23:47
     *
     * @public
     * @type {boolean}
     */
    public get disabled(): boolean { return this._disabled; }

    /**
     * Disabled State of the checkbox
     */
    public set disabled(value: boolean) {
        const element = <HTMLInputElement>this.elements.get(this.$bsCheckBox.CHECKBOX);
        if (element) {
            if (value) { element.disabled = true; }
            else { element.removeAttribute("disabled"); }
        }
        this._disabled = value;
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
     * Checkbox inline style
     * @date 02/01/2023 - 00:24:40
     *
     * @public
     * @type {boolean}
     */
    public get inline(): boolean { return this._inline; }

    /**
     * Checkbox inline style
     */
    public set inline(value: boolean) {
        this.rootElement?.classList.toggle(this.$bsCheckBox.CHECKBOX_CLASS_WRAPPER_INLINE, value);
        this._inline = value;
    }

    /**
     * Checkbox reverse style
     * @date 02/01/2023 - 00:25:11
     *
     * @public
     * @type {boolean}
     */
    public get reverse(): boolean { return this._reverse; }

    /**
     * Checkbox reverse style
     */
    public set reverse(value: boolean) {
        this.rootElement?.classList.toggle(this.$bsCheckBox.CHECKBOX_CLASS_WRAPPER_REVERSE, value);
        this._reverse = value;
    }

    /**
     * Checkbox aria label
     * @date 02/01/2023 - 00:25:24
     *
     * @public
     * @type {string}
     */
    public get ariaLabel(): string { return this._ariaLabel; }

    /**
     * Checkbox aria label
     */
    public set ariaLabel(value: string) {
        const element = <HTMLInputElement>this.elements.get(this.$bsCheckBox.CHECKBOX);
        element && (element.ariaLabel = value);
        this._ariaLabel = value;
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
            label = this.elements.get($bsCheckBox.CHECKBOX_LABEL),
            checkbox = this.elements.get($bsCheckBox.CHECKBOX),
            root = this.rootElement;

        checkbox?.classList.toggle($bsCheckBox.CHECKBOX_CLASS_BUTTON_CHECK, value);
        checkbox?.classList.toggle($bsCheckBox.CHECKBOX_CLASS_CHECK_INPUT, !value);
        label?.classList.toggle($bsCheckBox.CHECKBOX_CLASS_CHECK_LABEL, !value);
        label?.classList.toggle($bsCheckBox.CHECKBOX_CLASS_BUTTON, value);
        root?.classList.toggle($bsCheckBox.CHECKBOX_CLASS_WRAPPER_HAS_LABEL, !value);
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
            controlName = self.$bsCheckBox[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Form_CheckBox>(`${controlName}:initialise`);
        super
            .initialise(...args)
            .then(async _ => {
                await self.loadManifest(self.$bsCheckBox);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        self.createElement(new self.$ctrlCfg(self.$bsCheckBox.CHECKBOX, self.$htmlt.input, self.elementConfig.get(self.$bsCheckBox.CHECKBOX)))
                    )));
                self.Label(self.label)
                    .Checked(self.checked)
                    .Disabled(self.disabled)
                    .Switch(self.switch)
                    .Inline(self.inline)
                    .Reverse(self.reverse)
                    .AriaLabel(self.ariaLabel)
                    .ToggleStyle(self.toggleStyle)
                    .ButtonContextStyle(self.buttonContextStyle);

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
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_CheckBox> {
        const
            self = this,
            controlName = self.$bsCheckBox[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Form_CheckBox>(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig()
            .then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsCheckBox.CHECKBOX, new self.$ctrlPrm()
                        .Properties({ type: "checkbox" })
                        .Classes("form-check-input"))
                    .setIfNotExist(self.$bsCheckBox.CHECKBOX_LABEL, new self.$ctrlPrm()
                        .Classes("form-check-label"))
                    .setIfNotExist(self.$bsCheckBox.CHECKBOX_LABEL_WRAPPER, new self.$ctrlPrm()
                        .Classes("form-check"));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error));
        return setDefaultConfigPromise;
    }
    
    /**
     * Sets the label for the checkbox, fluent interface
     * @date 02/01/2023 - 00:29:09
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public Label(value: string): Mrbr_UI_Bootstrap_Form_CheckBox { this.label = value; return this; }
    
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
     * Sets the disabled state for the checkbox, fluent interface
     * @date 02/01/2023 - 00:29:32
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public Disabled(value: boolean): Mrbr_UI_Bootstrap_Form_CheckBox { this.disabled = value; return this; }
    
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
     * Sets the inline state for the checkbox, fluent interface
     * @date 02/01/2023 - 00:29:45
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public Inline(value: boolean): Mrbr_UI_Bootstrap_Form_CheckBox { this.inline = value; return this; }
    
    /**
     * Sets the reverse state for the checkbox, fluent interface
     * @date 02/01/2023 - 00:29:54
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public Reverse(value: boolean): Mrbr_UI_Bootstrap_Form_CheckBox { this.reverse = value; return this; }
    
    /**
     * Sets the aria label for the checkbox, fluent interface
     * @date 02/01/2023 - 00:30:01
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Form_CheckBox}
     */
    public AriaLabel(value: string): Mrbr_UI_Bootstrap_Form_CheckBox { this.ariaLabel = value; return this; }
    
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
     * Sets the button size for the checkbox, fluent interface
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
     * Sets the button size for the checkbox, fluent interface
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