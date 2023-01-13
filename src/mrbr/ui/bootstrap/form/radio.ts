import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_FormCheck } from "./formCheck";
import { Mrbr_UI_Bootstrap_Form_RadioEvent } from "./radioEvent";
import { Mrbr_UI_Bootstrap_Form_RadioEventData } from "./radioEventData";

export class Mrbr_UI_Bootstrap_Form_Radio extends Mrbr_UI_Bootstrap_Form_FormCheck {


    /**
     * Internal Radio name
     * @date 02/01/2023 - 22:52:25
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly RADIO: string = "radio";



    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Radio
     * @date 02/01/2023 - 22:52:39
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Radio}
     */
    public get $bsRadio(): typeof Mrbr_UI_Bootstrap_Form_Radio { return this.$nsBsForm.Radio as typeof Mrbr_UI_Bootstrap_Form_Radio; }


    /**
     * Checked value for the radio, field
     * @date 02/01/2023 - 22:52:58
     *
     * @private
     * @type {boolean}
     */
    private _checked: boolean = false;

    /**
     * Group name for the radio, field
     * @date 02/01/2023 - 22:53:13
     *
     * @private
     * @type {string}
     */
    private _groupName: string;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Radio.
     * @date 02/01/2023 - 22:53:21
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputElementName = this.$bsRadio.RADIO;
    }

    /**
     * Checked value for the radio, Property
     * @date 02/01/2023 - 22:53:31
     *
     * @public
     * @type {boolean}
     */
    public get checked(): boolean { return this._checked; }

    /**
     * Checked value for the radio, Property
     */
    public set checked(value: boolean) {
        const input = <HTMLInputElement>this.elements.get(this.$bsRadio.RADIO);
        input && (input.checked = value);
        this._checked = value;
    }

    /**
     * Group name for the radio, Property. Groups by name and only allows one to be selected at a time
     * @date 02/01/2023 - 22:57:23
     *
     * @public
     * @type {string}
     */
    public get groupName(): string { return this._groupName; }

    /**
     * Group name for the radio, Property. Groups by name and only allows one to be selected at a time
     */
    public set groupName(value: string) {
        const input = <HTMLInputElement>this.elements.get(this.$bsRadio.RADIO);
        input && (input.name = value);
        this._groupName = value;
    }

    /**
     * Initialises the control, load the manifest and set the default config
     * @date 02/01/2023 - 22:58:02
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find(args => typeof args === "object" && args.hasOwnProperty("controlName"))?.controlName ?? this.$bsRadio[self.$mrbr.COMPONENT_NAME],
            initalisePromise = this.$promise.create(`${controlName}:initialise`);
        super
            .initialise(...args)
            .then(async _ => {
                await self.loadManifest(self.$bsRadio);
                await self.setDefaultConfig({ controlName });
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        self.createElement(new self.$ctrlCfg(self.$bsRadio.RADIO, self.$htmlt.input, self.elementConfig.getConfig(self.$bsRadio.RADIO)))
                    )));
                self.Label(self.label)
                    .Disabled(self.disabled)
                    .Checked(self.checked)
                    .Value(self.value)
                    .Inline(self.inline)
                    .Reverse(self.reverse)
                    .AriaLabel(self.ariaLabel)
                    .GroupName(self.groupName);
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error))
        return initalisePromise;
    }

    /**
     * Sets the default config for the control
     * @date 02/01/2023 - 22:58:31
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_Radio>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === 'object' && arg.hasOwnProperty('controlName'))?.controlName ?? this.$bsRadio[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = this.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig([...args, { controlName }].flat())
            .then(_ => {
                self.
                    elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsRadio.RADIO, new self.$ctrlPrm()
                        .Properties({ type: "radio" })
                        .Classes("form-check-input"));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;
    }

    /**
     * Set the Checked value for the radio, fluent interface
     * @date 02/01/2023 - 22:56:43
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Form_Radio}
     */
    public Checked(value: boolean): Mrbr_UI_Bootstrap_Form_Radio { this.checked = value; return this; }

    /**
     * Set the Group name for the radio, fluent interface
     * @date 02/01/2023 - 22:57:07
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Form_Radio}
     */
    public GroupName(value: string): Mrbr_UI_Bootstrap_Form_Radio { this.groupName = value; return this; }

    /**
     * Input change event handler
     * @date 02/01/2023 - 00:30:34
     *
     * @private
     * @param {Event} event
     */
    protected override formControlInput_handler(event: Event): void {
        const eventName = this.$bsFormCheck.INPUT_CHANGE_EVENT_NAME;
        event.stopPropagation();
        event.preventDefault();
        const radio = <HTMLInputElement>this.elements.get(this.$bsRadio.RADIO)
        this.eventSubscribers.raiseEvent(new Mrbr_UI_Bootstrap_Form_RadioEvent(eventName, this, new Mrbr_UI_Bootstrap_Form_RadioEventData(event, radio.checked ?? false, radio, this.groupName, this.value)))
    }
}