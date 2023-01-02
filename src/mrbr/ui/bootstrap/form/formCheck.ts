import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapFormControl } from "../controls/BootstrapFormControl";

/**
 * FormCheck class, base class for checkbox and radio
 * @date 02/01/2023 - 19:40:46
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_FormCheck
 * @typedef {Mrbr_UI_Bootstrap_Form_FormCheck}
 * @template TFormCheck - Type of the FormCheck class used for fluent interface
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapFormControl}
 */
export class Mrbr_UI_Bootstrap_Form_FormCheck<TFormCheck> extends Mrbr_UI_Bootstrap_Controls_BootstrapFormControl {

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
     * Type Alias for Mrbr.UI.Bootstrap.Form.FormCheck class
     * @date 02/01/2023 - 00:14:49
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FormCheck}
     */
    public get $bsFormCheck(): typeof Mrbr_UI_Bootstrap_Form_FormCheck { return this.$bsForm.FormCheck as typeof Mrbr_UI_Bootstrap_Form_FormCheck; }

    /**
     * FormCheck wrapper class when a label is present
     * @date 02/01/2023 - 00:06:49
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_CLASS_WRAPPER_HAS_LABEL: string = "form-check";

    /**
     * Internal FormCheck wrapper name
     * @date 02/01/2023 - 00:06:31
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_LABEL_WRAPPER: string = "formcheck_label_wrapper";

    /**
     * FormCheck wrapper class for inline style FormCheck control
     * @date 02/01/2023 - 00:12:02
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_CLASS_WRAPPER_INLINE: string = "form-check-inline";

    /**
     * FormCheck label class
     * @date 02/01/2023 - 00:12:12
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_CLASS_CHECK_LABEL: string = "form-check-label";

    /**
     * FormCheck input class
     * @date 02/01/2023 - 00:12:32
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_CLASS_CHECK_INPUT: string = "form-check-input";

    /**
     * FormCheck wrapper class for reverse style FormCheck
     * @date 02/01/2023 - 00:12:40
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_CLASS_WRAPPER_REVERSE: string = "form-check-reverse";

    /**
     * Internal FormCheck label name
     * @date 02/01/2023 - 00:06:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_LABEL: string = "formcheck_label";

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
     * Aria label for the FormCheck, field
     * @date 02/01/2023 - 00:16:16
     *
     * @private
     * @type {string}
     */
    private _ariaLabel: string;

    /**
     * Disabled state of the FormCheck, field
     * @date 02/01/2023 - 00:15:44
     *
     * @private
     * @type {boolean}
     */
    private _disabled: boolean = false;
    /**
     * Inline style FormCheck, field
     * @date 02/01/2023 - 00:16:02
     *
     * @private
     * @type {boolean}
     */
    private _inline: boolean = false;

    /**
     * Label text for the FormCheck, field
     * @date 02/01/2023 - 00:15:38
     *
     * @private
     * @type {string}
     */
    private _label: string;

    /**
     * Reverse style FormCheck, field
     * @date 02/01/2023 - 00:16:10
     *
     * @private
     * @type {boolean}
     */
    private _reverse: boolean = false;

    /**
     * Value of the FormCheck not the check state, use checked property for checked state, field
     * @date 02/01/2023 - 00:16:30
     *
     * @private
     * @type {string}
     */
    private _value: string;

    /**
     * Name of the input element
     * @date 02/01/2023 - 22:35:04
     *
     * @protected
     * @type {string}
     */
    protected _inputElementName: string;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_FormCheck. 
     * @date 02/01/2023 - 22:35:12
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
    }

    /**
     * Disabled State of the FormCheck
     * @date 02/01/2023 - 00:23:47
    *
    * @public
     * @type {boolean}
     */
    public get disabled(): boolean { return this._disabled; }

    /**
     * Disabled State of the FormCheck
     */
    public set disabled(value: boolean) {
        const element = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (element) { (value) ? element.disabled = true : element.removeAttribute("disabled"); }
        this._disabled = value;
    }

    /**
     * Name of the input element
     * @date 02/01/2023 - 22:37:17
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get inputElementName(): string { return this._inputElementName; }

    /**
     * FormCheck inline style
     * @date 02/01/2023 - 00:24:40
     *
     * @public
     * @type {boolean}
     */
    public get inline(): boolean { return this._inline; }

    /**
     * FormCheck inline style
     */
    public set inline(value: boolean) {
        this.rootElement?.classList.toggle(this.$bsFormCheck.FORMCHECK_CLASS_WRAPPER_INLINE, value);
        this._inline = value;
    }
    /**
     * Label text for the FormCheck
     * @date 02/01/2023 - 00:19:25
     *
     * @public
     * @type {string}
     */
    public get label(): string { return this._label; }
    /**
     * Label text for the FormCheck
     */
    public set label(value: string) {
        const root = this.rootElement;
        if (root) {
            const
                bsfc = this.$bsFormCheck,
                inputElement = <HTMLInputElement>this.elements.get(this.inputElementName),
                labelElement = this.elements.get(bsfc.FORMCHECK_LABEL) ?? <HTMLLabelElement>this.createElement(new this.$ctrlCfg(bsfc.FORMCHECK_LABEL, this.$htmlt.label, this.elementConfig.getConfig(bsfc.FORMCHECK_LABEL)
                    .Properties({ htmlFor: inputElement.id })
                ));
            root && labelElement.parentElement !== root && root.prepend(labelElement);
            root?.classList.toggle(bsfc.FORMCHECK_CLASS_WRAPPER_HAS_LABEL, !!value);
            labelElement.innerText = value;
        }
        !this.ariaLabel && (this.ariaLabel = value);
        this._label = value;
    }

    /**
     * FormCheck reverse style
     * @date 02/01/2023 - 00:25:11
     *
     * @public
     * @type {boolean}
     */
    public get reverse(): boolean { return this._reverse; }

    /**
     * FormCheck reverse style
     */
    public set reverse(value: boolean) {
        this.rootElement?.classList.toggle(this.$bsFormCheck.FORMCHECK_CLASS_WRAPPER_REVERSE, value);
        this._reverse = value;
    }
    /**
     * FormCheck aria label
     * @date 02/01/2023 - 00:25:24
     *
     * @public
     * @type {string}
     */
    public get ariaLabel(): string { return this._ariaLabel; }

    /**
     * FormCheck aria label
     */
    public set ariaLabel(value: string) {
        const element = <HTMLInputElement>this.elements.get(this.inputElementName);
        element && (element.ariaLabel = value);
        this._ariaLabel = value;
    }
    /**
     * The value of the FormCheck, not the checked state
     * @date 02/01/2023 - 00:18:50
     *
     * @public
     * @type {string}
     */
    public get value(): string { return this._value; }

    /**
     * The value for the FormCheck, not the checked state
     */
    public set value(value: string) {
        const element = <HTMLInputElement>this.elements.get(this.inputElementName);
        element && (element.value = value);
        this._value = value;
    }
    /**
     * Sets the reverse state for the FormCheck, fluent interface
     * @date 02/01/2023 - 19:42:12
     *
     * @public
     * @param {boolean} value
     * @returns {TFormCheck}
     */
    public Inline(value: boolean): TFormCheck { this.inline = value; return <TFormCheck>(this as unknown); }

    /**
     * Sets the reverse state for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:29:54
     *
     * @public
     * @param {boolean} value
     * @returns {TFormCheck}
     */
    public Reverse(value: boolean): TFormCheck { this.reverse = value; return <TFormCheck>(this as unknown); }

    /**
     * Sets the aria label for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:30:01
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public AriaLabel(value: string): TFormCheck { this.ariaLabel = value; return <TFormCheck>(this as unknown); }
    /**
     * Sets the label for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:29:09
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public Label(value: string): TFormCheck { this.label = value; return <TFormCheck>(this as unknown); }

    public Value(value: string): TFormCheck { this.value = value; return <TFormCheck>(this as unknown); }

    /**
     * Sets the disabled state for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:29:32
     *
     * @public
     * @param {boolean} value
     * @returns {TFormCheck}
     */
    public Disabled(value: boolean): TFormCheck { this.disabled = value; return <TFormCheck>(this as unknown); }

    
    /**
     * Set default config for the FormCheck
     * @date 02/01/2023 - 22:51:12
     *
     * @public
     * @param {...(any[] | null)} args
     * @returns {Mrbr_System_Promise<TFormCheck>}
     */
    public setDefaultConfig(...args: any[] | null): Mrbr_System_Promise<TFormCheck> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === 'object' && arg.hasOwnProperty('controlName'))?.controlName ?? self.$bsFormCheck[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig(...args)
            .then(() => {
                self
                    .elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsFormCheck.FORMCHECK_LABEL, new self.$ctrlPrm()
                        .Classes("form-check-label"))
                    .setIfNotExist(self.$bsFormCheck.FORMCHECK_LABEL_WRAPPER, new self.$ctrlPrm()
                        .Classes("form-check"));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;
    }
}