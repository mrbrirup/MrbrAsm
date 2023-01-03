import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "../controls/BootstrapControl";

export class Mrbr_UI_Bootstrap_Form_BootstrapFormControl<TFormControl> extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Event name for changes to the input element
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
     * Type Alias for Mrbr.UI.Bootstrap.Form.FormCheck class
     * @date 02/01/2023 - 00:14:49
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FormCheck}
     */
    public get $bsFormControl(): typeof Mrbr_UI_Bootstrap_Form_BootstrapFormControl { return this.$bsForm.BootstrapFormControl as typeof Mrbr_UI_Bootstrap_Form_BootstrapFormControl; }

    /**
     * Internal FormCheck wrapper name
     * @date 02/01/2023 - 00:06:31
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCONTROL_LABEL_WRAPPER: string = "formcontrol_label_wrapper";

    /**
     * Internal FormCheck label name
     * @date 02/01/2023 - 00:06:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCONTROL_LABEL: string = "formcontrol_label";


    public static readonly FORMCONTROL: string = "formcontrol";

    /**
     * Value of the FormCheck not the check state, use checked property for checked state, field
     * @date 02/01/2023 - 00:16:30
     *
     * @private
     * @type {string}
     */
    private _value: string;


    /**
     * Disabled state of the FormCheck, field
     * @date 02/01/2023 - 00:15:44
     *
     * @private
     * @type {boolean}
     */
    private _disabled: boolean = false;
    /**
     * Label text for the FormCheck, field
     * @date 02/01/2023 - 00:15:38
     *
     * @private
     * @type {string}
     */
    private _label: string;

    /**
     * Name of the input element
     * @date 02/01/2023 - 22:35:04
     *
     * @protected
     * @type {string}
     */
    protected _inputElementName: string;

    /**
     * Aria label for the FormCheck, field
     * @date 02/01/2023 - 00:16:16
     *
     * @private
     * @type {string}
     */
    private _ariaLabel: string;


    /**
     * Type of the input element Input[type="..."]
     * @date 03/01/2023 - 02:12:44
     *
     * @protected
     * @type {string}
     */
    protected _inputType: string;


    /**
     * Placeholder text for the input element
     * @date 03/01/2023 - 02:13:05
     *
     * @private
     * @type {string}
     */
    private _placeholder: string;


    /**
     * Size of Form Control
     * @date 03/01/2023 - 02:35:17
     *
     * @private
     * @type {("small" | "large" | undefined)}
     */
    private _size: "small" | "large" | "default";


    /**
     * Readonly state of the input element
     * @date 03/01/2023 - 02:50:50
     *
     * @private
     * @type {boolean}
     */
    private _readonly: "plaintext" | boolean = false;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_BootstrapFormControl.
     * @date 03/01/2023 - 01:08:56
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
    }


    /**
     * Readonly state of the input element
     * @date 03/01/2023 - 02:50:57
     *
     * @public
     * @type {boolean}
     */
    public get readonly(): "plaintext" | boolean { return this._readonly; }

    /**
     * Readonly state of the input element
     */
    public set readonly(value: "plaintext" | boolean) {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (inputElement) {
            if (value === "plaintext") { inputElement.classList.add("form-control-plaintext"); }
            if (value === "plaintext" || value === true) { inputElement.setAttribute("readonly", ""); }
            else {
                inputElement.classList.remove("form-control-plaintext");
                inputElement.removeAttribute("readonly");
            }
        }
        this._readonly = value;
    }

    /**
     * Size of Form Control
     * @date 03/01/2023 - 02:35:34
     *
     * @public
     * @type {("small" | "large" | undefined)}
     */
    public get size(): "small" | "large" | "default" { return this._size; }

    /**
     * Size of Form Control
     */
    public set size(value: "small" | "large" | "default") {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (inputElement) {
            if (value === "default") { inputElement.classList.remove("form-control-sm", "form-control-lg"); }
            else if (value) {
                inputElement.classList.remove(`form-control-${value !== "large" ? 'lg' : 'sm'}`);
                inputElement.classList.add(`form-control-${value === "large" ? 'lg' : 'sm'}`);
            }
        }
        this._size = value;
    }



    /**
     * Input element type Input[type="..."]
     * @date 03/01/2023 - 02:13:22
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get inputType(): string { return this._inputType; }


    /**
     * Placeholder text for the input element
     * @date 03/01/2023 - 02:14:19
     *
     * @public
     * @type {string}
     */
    public get placeholder(): string { return this._placeholder; }

    /**
     * Placeholder text for the input element
     */
    public set placeholder(value: string) {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        inputElement && value && (inputElement.placeholder = value);
        this._placeholder = value;
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


    public get inputElement(): HTMLInputElement { return <HTMLInputElement>this.elements.get(this.inputElementName); }


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
                bsfc = this.$bsFormControl,
                inputElement = <HTMLInputElement>this.elements.get(this.inputElementName),
                labelElement = this.elements.get(bsfc.FORMCONTROL_LABEL) ?? <HTMLLabelElement>this.createElement(new this.$ctrlCfg(bsfc.FORMCONTROL_LABEL, this.$htmlt.label, this.elementConfig.getConfig(bsfc.FORMCONTROL_LABEL)
                    .Properties({ htmlFor: inputElement.id })
                ));
            root && labelElement.parentElement !== root && root.prepend(labelElement);
            labelElement.innerText = value;
        }
        !this.ariaLabel && (this.ariaLabel = value);
        this._label = value;
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
        element && value && (element.value = value);
        this._value = value;
    }




    /**
     * Set the default configuration for the component
     * @date 03/01/2023 - 03:46:40
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === 'object' && arg.hasOwnProperty('controlName'))?.controlName ?? this.$bsFormControl[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = this.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig([...args, { controlName }].flat())
            .then(_ => {
                self
                    .elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsFormControl.FORMCONTROL, new self.$ctrlPrm()
                        .Classes("form-control"))
                    .setIfNotExist(self.$bsFormControl.FORMCONTROL_LABEL, new self.$ctrlPrm()
                        .Classes("form-label"));

                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;
    }






    /**
     * Sets the aria label for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:30:01
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public AriaLabel(value: string): TFormControl { this.ariaLabel = value; return <TFormControl>(this as unknown); }

    /**
     * Sets the label for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:29:09
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public Label(value: string): TFormControl { this.label = value; return <TFormControl>(this as unknown); }



    /**
     * Sets the value for the FormCheck, fluent interface
     * @date 03/01/2023 - 00:53:28
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public Value(value: string): TFormControl { this.value = value; return <TFormControl>(this as unknown); }


    /**
     * Sets the placeholder text for the input element, fluent interface
     * @date 03/01/2023 - 02:14:54
     *
     * @public
     * @param {string} value
     * @returns {TFormControl}
     */
    public Placeholder(value: string): TFormControl { this.placeholder = value; return <TFormControl>(this as unknown); }

    /**
     * Sets the disabled state for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:29:32
     *
     * @public
     * @param {boolean} value
     * @returns {TFormCheck}
     */
    public Disabled(value: boolean): TFormControl { this.disabled = value; return <TFormControl>(this as unknown); }


    /**
     * Sets the size of the FormControl, fluent interface
     * @date 03/01/2023 - 02:55:38
     *
     * @public
     * @param {("small" | "large" | "default")} value
     * @returns {TFormControl}
     */
    public Size(value: "small" | "large" | "default"): TFormControl { this.size = value; return <TFormControl>(this as unknown); }


    /**
     * Sets the readonly state of the FormControl, fluent interface
     * @date 03/01/2023 - 02:59:34
     *
     * @public
     * @param {("plaintext" | boolean)} value
     * @returns {TFormControl}
     */
    public ReadOnly(value: "plaintext" | boolean): TFormControl { this.readonly = value; return <TFormControl>(this as unknown); }


    /**
     * Sets the properties of the FormControl
     * @date 03/01/2023 - 03:34:00
     *
     * @public
     * @returns {TFormControl}
     */
    public setProperties(): void {
        const self = this;
        self.Label(self.label)
        self.Disabled(self.disabled)
        self.AriaLabel(self.ariaLabel)
        self.Value(self.value)
        self.Placeholder(self.placeholder)
        self.Size(self.size)
        self.ReadOnly(self.readonly)
    }


    /**
     * Add/Remove Radio input change event subscriber
     * @date 02/01/2023 - 00:30:22
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => number} callback
     * @returns {number}
     */
    public onInputChanged(callback: (event: Mrbr_System_Events_Event<any>) => number): number {
        const eventName = this.$bsFormControl.INPUT_CHANGE_EVENT_NAME;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.elements.get(this.inputElementName),
            this.formControlInput_handler,
            this,
            callback
        );
    }

    /**
     * Default Input change event handler
     * @date 02/01/2023 - 00:30:34
     *
     * @private
     * @param {Event} event
     */
    protected formControlInput_handler(event: Event): void {
        const eventName = this.$bsFormControl.INPUT_CHANGE_EVENT_NAME;
        event.stopPropagation();
        event.preventDefault();
        this.eventSubscribers.raiseEvent(new this.$event(eventName, this, { event: event }))
    }

}