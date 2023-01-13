import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "../controls/BootstrapControl";

export class Mrbr_UI_Bootstrap_Form_BootstrapFormControl extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {



    /**
     * Internal name for FormControl Valid Message
     * @date 12/01/2023 - 09:47:35
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCONTROL_VALID_MESSAGE: string = "form-control-valid-message";


    /**
     * Internal name for FormControl Invalid Message
     * @date 12/01/2023 - 09:47:55
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCONTROL_INVALID_MESSAGE: string = "form-control-invalid-message";



    /**
     * Internal name for InputGroup Wrapper
     * @date 04/01/2023 - 21:32:27
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCONTROL_INPUT_GROUP: string = "form-control-input-group";

    /**
     * Internal name for InputGroup Text element
     * @date 04/01/2023 - 21:32:55
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCONTROL_INPUT_GROUP_TEXT: string = "form-control-input-group-text";

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
     * Class for Visually Hidden Label
     * @date 10/01/2023 - 22:44:38
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FORMCONTROL_VISUALLY_HIDDEN: string = "visually-hidden";

    /**
     * Namespace Alias for Mrbr.UI.Bootstrap.Form
     * @date 02/01/2023 - 00:13:36
     *
     * @public
     * @readonly
     * @type {*}
     */
    public get $nsBsForm(): any { return this[Symbol.for("Mrbr.UI.Bootstrap.Form")] ??= this.$mrbrInstance.host["Mrbr"].UI.Bootstrap.Form; }

    /**
     * Type Alias for Mrbr.UI.Bootstrap.Form.FormCheck class
     * @date 02/01/2023 - 00:14:49
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FormCheck}
     */
    public get $bsFormControl(): typeof Mrbr_UI_Bootstrap_Form_BootstrapFormControl { return this.$nsBsForm.BootstrapFormControl as typeof Mrbr_UI_Bootstrap_Form_BootstrapFormControl; }

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


    /**
     * Internal name for Form Control Input Element
     * @date 04/01/2023 - 21:34:13
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
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


    /**
     * Use InputGroup Layout
     * @date 04/01/2023 - 22:05:11
     *
     * @private
     * @type {boolean}
     */
    private _inputGroup: boolean = false;


    /**
     * Use Floating Label
     * @date 04/01/2023 - 22:59:34
     *
     * @private
     * @type {boolean}
     */
    private _floatingLabel: boolean = false;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_BootstrapFormControl.
     * @date 13/01/2023 - 06:50:00
     *
     * @constructor
     */
    constructor() { super(); }

    /**
     * Use floating label
     * @date 04/01/2023 - 23:02:22
     *
     * @public
     * @type {boolean}
     */
    public get floatingLabel(): boolean { return this._floatingLabel; }

    /**
     * Use floating label
     */
    public set floatingLabel(value: boolean) {
        this.Label(this.label);
        const
            label = <HTMLLabelElement>this.elements.get(this.$bsFormControl.FORMCONTROL_LABEL),
            input = <HTMLInputElement>this.elements.get(this.inputElementName),
            parent = label?.parentElement;
        if (parent && this.inputGroup === false && value !== undefined && value !== null) {
            (label && input && (value ? label.before(input) : input.before(label)));
            (parent.classList.toggle("form-floating", value));
        }
        this._floatingLabel = value;
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


    /**
     * Input Element
     * @date 04/01/2023 - 22:01:02
     *
     * @public
     * @readonly
     * @type {HTMLInputElement}
     */
    public get inputElement(): HTMLInputElement { return <HTMLInputElement>this.elements.get(this.inputElementName); }


    /**
     * Hidden Label, used for Inline Form
     * @date 13/01/2023 - 06:51:23
     *
     * @private
     * @type {boolean}
     */
    private _hiddenLabel: boolean = false;

    /**
     * Existing Hidden Label Classes, cached for later use if Inline form layout is removed
     * @date 13/01/2023 - 06:51:53
     *
     * @private
     * @type {string}
     */
    private _hiddenLabelClass: string;

    /**
     * Is the Label Hidden, text is still present for accessibility
     * @date 13/01/2023 - 06:52:51
     *
     * @public
     * @type {boolean}
     */
    public get hiddenLabel(): boolean { return this._hiddenLabel; }

    /**
     * Is the Label Hidden, text is still present for accessibility
     */
    public set hiddenLabel(value: boolean) {
        this._hiddenLabel = value;
        this.Label(this.label);
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
        const
            root = this.rootElement,
            inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        let labelElement;
        if (value && inputElement) {
            const
                bsfc = this.$bsFormControl;
            labelElement = this.elements.get(bsfc.FORMCONTROL_LABEL) ?? <HTMLLabelElement>this.createElement(new this.$ctrlCfg(bsfc.FORMCONTROL_LABEL, this.$htmlt.label, this.elementConfig.getConfig(bsfc.FORMCONTROL_LABEL)
                .Properties({ htmlFor: inputElement?.id })));
            labelElement.innerText = value;
            root && labelElement.parentElement !== root && root.prepend(labelElement);
        }
        const
            isHidden = this.hiddenLabel,
            visuallyHidden = this.$bsFormControl.FORMCONTROL_VISUALLY_HIDDEN;
        if (labelElement) {
            if (isHidden === true && !labelElement.classList.contains(visuallyHidden)) {
                const classes = [...labelElement.classList].map(c => c.trim()).join(" ");
                this.classes(labelElement, this.$clsActions.remove, classes)
                this._hiddenLabelClass = classes;
                labelElement.classList.add(this.$bsFormControl.FORMCONTROL_VISUALLY_HIDDEN);
            }
            else if (isHidden === false && labelElement.classList.contains(visuallyHidden)) {
                this.classes(labelElement, this.$clsActions.remove, this.$bsFormControl.FORMCONTROL_VISUALLY_HIDDEN);
                this.classes(labelElement, this.$clsActions.add, this._hiddenLabelClass);
            }
        }

        value && !this.ariaLabel && (this.ariaLabel = value);
        this._label = value;
    }
    /**
     * Disabled State of the Form Control
     * @date 02/01/2023 - 00:23:47
     *
     * @public
     * @type {boolean}
     */
    public get disabled(): boolean { return this._disabled; }

    /**
     * Disabled State of the Form Control
     */
    public set disabled(value: boolean) {
        const element = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (element) { (value) ? element.disabled = true : element.removeAttribute("disabled"); }
        this._disabled = value;
    }
    /**
     * Form Control aria label
     * @date 02/01/2023 - 00:25:24
     *
     * @public
     * @type {string}
     */
    public get ariaLabel(): string { return this._ariaLabel; }

    /**
     * Form Control aria label
     */
    public set ariaLabel(value: string) {
        const element = <HTMLInputElement>this.elements.get(this.inputElementName);
        element && (element.ariaLabel = value);
        this._ariaLabel = value;
    }


    /**
     * The value of the Form Control, depends on the type of control
     * @date 02/01/2023 - 00:18:50
     *
     * @public
     * @type {string}
     */
    public get value(): string {
        const element = <HTMLInputElement>this.elements.get(this.inputElementName);
        element && (this._value = element.value);
        return this._value;
    }


    /**
     * The value of the Form Control, depends on the type of control
     * @date 02/01/2023 - 00:18:50
     * @param {string} value
     * @returns {void}
    */
    public set value(value: string) {
        const element = <HTMLInputElement>this.elements.get(this.inputElementName);
        element && value && (element.value = value);
        this._value = value;
    }


    /**
     * InputGroup layout for input element
     * @date 04/01/2023 - 21:52:50
     *
     * @public
     * @type {boolean}
     */
    public get inputGroup(): boolean { return this._inputGroup; }

    /**
     * InputGroup layout for input element
     */
    public set inputGroup(value: boolean) {
        let
            root = this.rootElement,
            bsfc = this.$bsFormControl;
        this.defaultContainerElementName = value ? bsfc.FORMCONTROL_INPUT_GROUP : this.rootElementName;
        if (root) {
            const
                inputGroup = this.elements.get(bsfc.FORMCONTROL_INPUT_GROUP) ?? <HTMLDivElement>this.createElement(new this.$ctrlCfg(bsfc.FORMCONTROL_INPUT_GROUP, this.$htmlt.div, this.elementConfig.getConfig(bsfc.FORMCONTROL_INPUT_GROUP))),
                label = this.elements.get(bsfc.FORMCONTROL_LABEL);
            if (value) {
                (inputGroup.parentElement !== root) && (root.append(inputGroup));
                root.childNodes.forEach(node => (node !== inputGroup && node !== label) && (inputGroup.append(node)));
                label && root.prepend(label);
            }
            else {
                if (inputGroup.parentElement === root) { inputGroup.childNodes.forEach(node => { root.insertBefore(node, inputGroup); }); }
                else { inputGroup.childNodes.forEach(node => { root.append(node); }); }
            }
        }
        this._inputGroup = value;
    }


    /**
     * Label Element
     * @date 10/01/2023 - 06:19:17
     *
     * @public
     * @readonly
     * @type {HTMLLabelElement}
     */
    public get labelElement(): HTMLLabelElement { return <HTMLLabelElement>this.elements.get(this.$bsFormControl.FORMCONTROL_LABEL); }


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
            bsFormControl = this.$bsFormControl,
            ctrlPrm = this.$ctrlPrm,
            controlName = args?.find(arg => typeof arg === 'object' && arg.hasOwnProperty('controlName'))?.controlName ?? bsFormControl[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = this.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig({ controlName })
            .then(_ => {
                self
                    .elementConfig
                    .controlName(controlName);
                const sine = self.elementConfig.setIfNotExist.bind(self.elementConfig);
                sine(bsFormControl.FORMCONTROL, new ctrlPrm()
                    .Classes("form-control"));
                sine(bsFormControl.FORMCONTROL_LABEL, new ctrlPrm()
                    .Classes("form-label"));
                sine(bsFormControl.FORMCONTROL_INPUT_GROUP, new ctrlPrm()
                    .Classes("input-group"));
                sine(bsFormControl.FORMCONTROL_INPUT_GROUP_TEXT, new ctrlPrm()
                    .Classes("input-group-text"));
                sine(bsFormControl.FORMCONTROL_VALID_MESSAGE, new ctrlPrm()
                    .Classes("valid-feedback"));
                sine(bsFormControl.FORMCONTROL_INVALID_MESSAGE, new ctrlPrm()
                    .Classes("invalid-feedback"));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;
    }

    /**
     * Set InputGroup layout for input element, default is false, fluent layout.
     * @date 04/01/2023 - 21:53:48
     *
     * @public
     * @param {boolean} value
     * @returns {this}
     */
    public InputGroup(value: boolean): this { this.inputGroup = value; return this; }

    /**
     * Create InputGroupText element. Control must be initialised to be able to add TextElements to the control.
     * @date 04/01/2023 - 21:54:36
     *
     * @public
     * @param {string} name
     * @param {string} text
     * @param {("append" | "prepend" | "none")} position
     * @returns {HTMLSpanElement}
     */
    public createInputGroupText(name: string, text: string, position: "append" | "prepend" | "none"): HTMLSpanElement {
        const
            bsfc = this.$bsFormControl,
            inputGroup = this.elements.get(bsfc.FORMCONTROL_INPUT_GROUP),
            inputGroupText = this.elements.get(name) ?? <HTMLSpanElement>this.createElement(new this.$ctrlCfg(name, this.$htmlt.span, this.elementConfig.getConfig(bsfc.FORMCONTROL_INPUT_GROUP_TEXT)));
        text && (inputGroupText.innerText = text);
        if (inputGroup && position !== "none") {
            (position === "append") ? inputGroup.append(inputGroupText) : inputGroup.prepend(inputGroupText);
        }
        return inputGroupText;
    }


    /**
     * Sets the aria label for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:30:01
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public AriaLabel(value: string): this { this.ariaLabel = value; return this; }

    /**
     * Sets the label for the FormCheck, fluent interface
     * @date 02/01/2023 - 00:29:09
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public Label(value: string): this { this.label = value; return this; }



    /**
     * Sets the value for the FormCheck, fluent interface
     * @date 03/01/2023 - 00:53:28
     *
     * @public
     * @param {string} value
     * @returns {TFormCheck}
     */
    public Value(value: string | any): this {
        (value !== undefined && value !== null && typeof value !== "string") && (value = value.toString());
        this.value = value;
        return this;
    }


    /**
     * Sets the placeholder text for the input element, fluent interface
     * @date 03/01/2023 - 02:14:54
     *
     * @public
     * @param {string} value
     * @returns {this}
     */
    public Placeholder(value: string): this { this.placeholder = value; return this; }

    /**
     * Sets the disabled state for the Form Control, fluent interface
     * @date 02/01/2023 - 00:29:32
     *
     * @public
     * @param {boolean} value
     * @returns {TFormCheck}
     */
    public Disabled(value: boolean): this { this.disabled = value; return this; }


    /**
     * Sets the size of the FormControl, fluent interface
     * @date 03/01/2023 - 02:55:38
     *
     * @public
     * @param {("small" | "large" | "default")} value
     * @returns {this}
     */
    public Size(value: "small" | "large" | "default"): this { this.size = value; return this; }


    /**
     * Sets the readonly state of the FormControl, fluent interface
     * @date 03/01/2023 - 02:59:34
     *
     * @public
     * @param {("plaintext" | boolean)} value
     * @returns {this}
     */
    public ReadOnly(value: "plaintext" | boolean): this { this.readonly = value; return this; }


    /**
     * Sets the floating label state of the FormControl, fluent interface
     * @date 04/01/2023 - 23:03:34
     *
     * @public
     * @param {boolean} value
     * @returns {this}
     */
    public FloatingLabel(value: boolean): this { this.floatingLabel = value; return this; }

    /**
     * Sets the properties of the FormControl
     * @date 03/01/2023 - 03:34:00
     *
     * @public
     * @returns {this}
     */
    public setProperties(): void {
        const self = this;
        self.Label(self.label)
            .Disabled(self.disabled)
            .AriaLabel(self.ariaLabel)
            .Value(self.value)
            .Placeholder(self.placeholder)
            .Size(self.size)
            .ReadOnly(self.readonly)
            .InputGroup(self.inputGroup)
            .FloatingLabel(self.floatingLabel)
            .Min(self.min)
            .Max(self.max)
            .Step(self.step)
            .Required(self.required)
            .MinLength(self.minLength)
            .MaxLength(self.maxLength)
            .Pattern(self.pattern)
            .ValidMessage(self.isValidMessage)
            .InvalidMessage(self.isInvalidMessage)
            .FieldName(self.fieldName);
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


    //#region Validation
    /**
     * Input Element Step value
     * @date 04/01/2023 - 19:41:37
     *
     * @private
     * @type { string | number}
     */
    private _step: string | number;

    /**
     * Input Element Required
     * @date 13/01/2023 - 06:57:33
     *
     * @private
     * @type {boolean}
     */
    private _required: boolean;

    /**
     * Input Element Min Length
     * @date 13/01/2023 - 06:57:40
     *
     * @private
     * @type {number}
     */
    private _minLength: number;

    /**
     * Input Element Max Length
     * @date 13/01/2023 - 06:57:46
     *
     * @private
     * @type {number}
     */
    private _maxLength: number;

    /**
     * Input Element Pattern
     * @date 13/01/2023 - 06:57:53
     *
     * @private
     * @type {string}
     */
    private _pattern: string;

    /**
     * Input Element Min
     * @date 13/01/2023 - 06:58:03
     *
     * @private
     * @type {(string | number)}
     */
    private _min: string | number;

    /**
     * Input Element Field Name, used as the NAME attribute
     * @date 13/01/2023 - 06:58:15
     *
     * @private
     * @type {string}
     */
    private _fieldName: string;
    /**
     * Input Element Max
     * @date 04/01/2023 - 19:41:31
     *
     * @private
     * @type {string | number}
     */
    private _max: string | number;

    /**
     * Input Element Valid Message
     * @date 13/01/2023 - 06:59:08
     *
     * @private
     * @type {string}
     */
    private _isValidMessage: string;

    /**
     * Input Element Invalid Message
     * @date 13/01/2023 - 06:59:18
     *
     * @private
     * @type {string}
     */
    private _isInvalidMessage: string;

    /**
     * Input Element NAME attribute
     * @date 13/01/2023 - 06:59:28
     *
     * @public
     * @type {string}
     */
    public get fieldName(): string { return this._fieldName; }

    /**
     * Input Element NAME attribute
     */
    public set fieldName(value: string) {
        const inputElement = this.inputElement;
        (inputElement) && (inputElement.name = value);
        this._fieldName = value;
    }


    /**
     * Input Element Required
     * @date 13/01/2023 - 06:59:59
     *
     * @public
     * @type {boolean}
     */
    public get required(): boolean { return this._required; }

    /**
     * Input Element Required
     */
    public set required(value: boolean) {
        const inputElement = this.inputElement;
        (inputElement) && (inputElement.required = !!value);
        this._required = !!value;
    }

    /**
     * Input Element Min Length
     * @date 13/01/2023 - 07:00:25
     *
     * @public
     * @type {number}
     */
    public get minLength(): number { return this._minLength; }

    /**
     * Input Element Min Length
     */
    public set minLength(value: number) {
        const inputElement = this.inputElement;
        if (inputElement && !isNaN(value) && value >= 0) { (inputElement.minLength = value); }
        else { inputElement?.removeAttribute("minLength"); }
        this._minLength = value;
    }

    /**
     * Input Element Max Length
     * @date 13/01/2023 - 07:00:47
     *
     * @public
     * @type {number}
     */
    public get maxLength(): number { return this._maxLength; }

    /**
     * Input Element Max Length
     */
    public set maxLength(value: number) {
        const inputElement = this.inputElement;
        if (inputElement && !isNaN(value) && value >= 0) {
            try { inputElement.maxLength = value; }
            catch (e) {
                console.error(`Error setting maxLength property on input element: ${e}`);
                inputElement.removeAttribute("maxLength");
            }
        }
        else { inputElement?.removeAttribute("maxLength"); }



        this._maxLength = value;
    }

    /**
     * Input Element Pattern (Regex) to validate against
     * @date 13/01/2023 - 07:01:07
     *
     * @public
     * @type {string}
     */
    public get pattern(): string { return this._pattern; }

    /**
     * Input Element Pattern (Regex) to validate against
     */
    public set pattern(value: string) {
        const inputElement = this.inputElement;
        if (inputElement) {
            if (value) { inputElement.pattern = value }
            else { inputElement.removeAttribute("pattern"); }
        }
        this._pattern = value;
    }

    /**
     * Input Element Min
     * @date 13/01/2023 - 07:01:27
     *
     * @public
     * @type {(string | number)}
     */
    public get min(): string | number { return this._min; }

    /**
     * Input Element Min
     */
    public set min(value: string | number) {
        const inputElement = this.inputElement;
        if (inputElement) {
            if (value) { inputElement.min = value.toString(); }
            else { inputElement.removeAttribute("min"); }
        }
        this._min = value;
    }

    /**
     * Input Element Max
     * @date 13/01/2023 - 07:01:40
     *
     * @public
     * @type {(string | number)}
     */
    public get max(): string | number { return this._max; }

    /**
     * Input Element Max
     */
    public set max(value: string | number) {
        const inputElement = this.inputElement;
        if (inputElement) {
            if (value !== undefined && value !== null && value !== "") { inputElement.max = value.toString(); }
            else { inputElement.removeAttribute("max"); }
        }
        this._max = value;
    }

    /**
     * Input Element Step
     * @date 04/01/2023 - 19:42:19
     *
     * @public
     * @type { string | number}
     */
    public get step(): string | number { return this._step; }

    /**
     * Input Element Step
     */
    public set step(value: string | number) {
        const inputElement = this.inputElement;
        if (inputElement) {
            if (value) { inputElement.step = value.toString(); }
            else { inputElement.removeAttribute("step"); }
        }
        this._step = value;
    }


    /**
     * Input Element value is Valid Message
     * @date 13/01/2023 - 07:02:11
     *
     * @public
     * @type {string}
     */
    public get isValidMessage(): string { return this._isValidMessage; }

    /**
     * Input Element value is Valid Message
     */
    public set isValidMessage(value: string) {
        const
            inputElement = this.inputElement,
            parent = this.inputElement?.parentElement;
        if (parent) {
            let validMessageElement = this.elements.get(this.$bsFormControl.FORMCONTROL_VALID_MESSAGE);
            if (!value) {
                (validMessageElement?.parentElement) && (validMessageElement?.remove());
            }
            else {
                (!validMessageElement) && (validMessageElement = <HTMLDivElement>this.createElement(new this.$ctrlCfg(this.$bsFormControl.FORMCONTROL_VALID_MESSAGE, this.$htmlt.div, this.elementConfig.getConfig(this.$bsFormControl.FORMCONTROL_VALID_MESSAGE))));
                validMessageElement.textContent = value;
                inputElement.after(validMessageElement);
            }
        }
        this._isValidMessage = value;
    }

    /**
     * Input Element value is Invalid Message
     * @date 13/01/2023 - 07:03:02
     *
     * @public
     * @type {string}
     */
    public get isInvalidMessage(): string { return this._isInvalidMessage; }

    /**
     * Input Element value is Invalid Message
     */
    public set isInvalidMessage(value: string) {
        const
            inputElement = this.inputElement,
            parent = this.inputElement?.parentElement;
        if (parent) {
            let invalidMessageElement = this.elements.get(this.$bsFormControl.FORMCONTROL_INVALID_MESSAGE);
            if (!value) {
                (invalidMessageElement?.parentElement) && (invalidMessageElement?.remove());
            }
            else {
                (!invalidMessageElement) && (invalidMessageElement = <HTMLDivElement>this.createElement(new this.$ctrlCfg(this.$bsFormControl.FORMCONTROL_INVALID_MESSAGE, this.$htmlt.div, this.elementConfig.getConfig(this.$bsFormControl.FORMCONTROL_INVALID_MESSAGE))));
                invalidMessageElement.textContent = value;
                inputElement.after(invalidMessageElement);
            }
        }
        this._isInvalidMessage = value;
    }

    /**
     * Set the Input Element min, fluent interface
     * @date 04/01/2023 - 19:43:04
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public Min(value: number | string): this { this.min = value; return this; }

    /**
     * Set the Input Element max, fluent interface
     * @date 04/01/2023 - 19:43:28
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public Max(value: number | string): this { this.max = value; return this; }

    /**
     * Set the Input Element Step, fluent interface
     * @date 04/01/2023 - 19:43:35
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public Step(value: number | string): this { this.step = value; return this; }


    /**
     * Set the Input Element Required, fluent interface
     * @date 13/01/2023 - 07:04:03
     *
     * @public
     * @param {boolean} value
     * @returns {this}
     */
    public Required(value: boolean): this { this.required = value; return this; }

    /**
     * Set the Input Element Min Length, fluent interface
     * @date 13/01/2023 - 07:04:32
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public MinLength(value: number): this { this.minLength = value; return this; }

    /**
     * Set the Input Element Max Length, fluent interface
     * @date 13/01/2023 - 07:04:47
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public MaxLength(value: number): this { this.maxLength = value; return this; }

    /**
     * Set the Input Element Pattern, fluent interface
     * @date 13/01/2023 - 07:04:55
     *
     * @public
     * @param {string} value
     * @returns {this}
     */
    public Pattern(value: string): this { this.pattern = value; return this; }

    /**
     * Set the Input Element Valid Message, fluent interface
     * @date 13/01/2023 - 07:05:04
     *
     * @public
     * @param {string} value
     * @returns {this}
     */
    public ValidMessage(value: string): this { this.isValidMessage = value; return this; }

    /**
     * Set the Input Element Invalid Message, fluent interface
     * @date 13/01/2023 - 07:05:11
     *
     * @public
     * @param {string} value
     * @returns {this}
     */
    public InvalidMessage(value: string): this { this.isInvalidMessage = value; return this; }

    /**
     * Set the Input Element Field Name, fluent interface
     * @date 13/01/2023 - 07:05:20
     *
     * @public
     * @param {string} value
     * @returns {this}
     */
    public FieldName(value: string): this { this.fieldName = value; return this; }





    //#endregion


}