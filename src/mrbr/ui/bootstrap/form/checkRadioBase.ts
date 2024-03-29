import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

/**
 * FormCheck class, base class for checkbox and radio
 * @date 02/01/2023 - 19:40:46
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_FormCheck
 * @typedef {Mrbr_UI_Bootstrap_Form_CheckRadioBase}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapFormControl}
 */
export class Mrbr_UI_Bootstrap_Form_CheckRadioBase extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {


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
     * FormCheck wrapper class for reverse style FormCheck
     * @date 03/01/2023 - 01:13:05
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_LABEL_WRAPPER: string = "form-check";

    /**
     * FormCheck label class
     * @date 03/01/2023 - 01:13:13
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCHECK_LABEL: string = "form-check-label";

    /**
     * Type Alias for Mrbr.UI.Bootstrap.Form.FormCheck class
     * @date 02/01/2023 - 00:14:49
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_CheckRadioBase}
     */
    public get $bsCheckRadioBase(): typeof Mrbr_UI_Bootstrap_Form_CheckRadioBase { return this.$nsBsForm.CheckRadioBase as typeof Mrbr_UI_Bootstrap_Form_CheckRadioBase; }



    /**
     * Inline style FormCheck, field
     * @date 02/01/2023 - 00:16:02
     *
     * @private
     * @type {boolean}
    */
    private _inline: boolean = false;



    /**
     * Reverse style FormCheck, field
     * @date 02/01/2023 - 00:16:10
     *
     * @private
     * @type {boolean}
     */
    private _reverse: boolean = false;




    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_FormCheck. 
     * @date 02/01/2023 - 22:35:12
     *
     * @constructor
    */
    constructor() {
        super();
    }




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
        this.rootElement?.classList.toggle(this.$bsCheckRadioBase.FORMCHECK_CLASS_WRAPPER_INLINE, value);
        this._inline = value;
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
        this.rootElement?.classList.toggle(this.$bsCheckRadioBase.FORMCHECK_CLASS_WRAPPER_REVERSE, value);
        this._reverse = value;
    }

    /**
     * Sets the reverse state for the FormCheck, fluent interface
     * @date 02/01/2023 - 19:42:12
     *
     * @public
     * @param {boolean} value
     * @returns {TFormCheck}
     */
    public Inline(value: boolean): this { this.inline = value; return this; }

    /**
     * Sets the reverse state for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:29:54
     *
     * @public
     * @param {boolean} value
     * @returns {TFormCheck}
     */
    public Reverse(value: boolean): this { this.reverse = value; return this; }



    /**
     * Set default config for the FormCheck
     * @date 02/01/2023 - 22:51:12
     *
     * @public
     * @param {...(any[] | null)} args
     * @returns {Mrbr_System_Promise<TFormCheck>}
     */
    public setDefaultConfig(...args: any[] | null): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === 'object' && arg.controlName)?.controlName ?? self.$bsCheckRadioBase[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig({ controlName })
            .then(() => {
                self
                    .elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsCheckRadioBase.FORMCHECK_LABEL, new self.$ctrlPrm()
                        .Classes("form-check-label"))
                    .setIfNotExist(self.$bsCheckRadioBase.FORMCHECK_LABEL_WRAPPER, new self.$ctrlPrm()
                        .Classes("form-check"));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;
    }

    /**
     * Label text for the FormControl
     */
    public set label(value: string) {
        super.label = value;
        const label = this.labelElement;
        if (label) {
            this.classes(label, this.$clsActions.replace, [this.$bsCheckRadioBase.FORMCONTROL_FORM_LABEL_CLASS, this.$bsCheckRadioBase.FORMCHECK_LABEL]);
        }
    }

}