import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_TextInputEvent } from "./textInputEvent";
import { Mrbr_UI_Bootstrap_Form_TextInputEventData } from "./textInputEventData";

export class Mrbr_UI_Bootstrap_Form_Range extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {

    /**
     * Internal Range element name
     * @date 04/01/2023 - 19:41:01
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly RANGE: string = "range";

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Range
     * @date 04/01/2023 - 19:41:09
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Range}
     */
    public get $bsRange(): typeof Mrbr_UI_Bootstrap_Form_Range { return Mrbr_UI_Bootstrap_Form_Range; }


    /**
     * Range min
     * @date 04/01/2023 - 19:41:25
     *
     * @private
     * @type {number}
     */
    private _min: number = 0;

    /**
     * Range max
     * @date 04/01/2023 - 19:41:31
     *
     * @private
     * @type {number}
     */
    private _max: number = 100;

    /**
     * Range step
     * @date 04/01/2023 - 19:41:37
     *
     * @private
     * @type {number}
     */
    private _step: number;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Range.
     * @date 04/01/2023 - 19:41:46
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
        this._inputElementName = this.$bsRange.RANGE;
    }

    /**
     * Range min
     * @date 04/01/2023 - 19:41:52
     *
     * @public
     * @type {number}
     */
    public get min(): number { return this._min; }

    /**
     * Range min
     */
    public set min(value: number) {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (inputElement && this.min) { inputElement.min = value.toString(); }
        this._min = value;
    }

    /**
     * Range max
     * @date 04/01/2023 - 19:42:07
     *
     * @public
     * @type {number}
     */
    public get max(): number { return this._max; }

    /**
     * Range max
     */
    public set max(value: number) {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (inputElement && this.max) { inputElement.max = value.toString(); }
        this._max = value;
    }

    /**
     * Range step
     * @date 04/01/2023 - 19:42:19
     *
     * @public
     * @type {number}
     */
    public get step(): number { return this._step; }

    /**
     * Range step
     */
    public set step(value: number) {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (inputElement)
            if (value) { inputElement.setAttribute("step", value.toString()) }
            else { inputElement.removeAttribute("step"); }
        this._step = value;
    }

    /**
     * Initialise the control, load manifest and set default config
     * @date 04/01/2023 - 19:42:32
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsRange = this.$bsRange,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName ?? bsRange[this.$mrbr.COMPONENT_NAME],
            initialisePromise = this.$promise.create(`${controlName}:initialise`);
        super.initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(bsRange);
                await self.setDefaultConfig();
                self
                    .createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children(
                            self.createElement(new self.$ctrlCfg(bsRange.RANGE, self.$htmlt.input, self.elementConfig.getConfig(bsRange.RANGE)))
                        )));
                self.setProperties();
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error))
        return initialisePromise;
    }

    /**
     * Set default config
     * @date 04/01/2023 - 19:42:56
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsRange = this.$bsRange,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName ?? bsRange[this.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = this.$promise.create(`${bsRange[this.$mrbr.COMPONENT_NAME]}:setDefaultConfig`);
        super.setDefaultConfig(...args)
            .then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(bsRange.RANGE, new self.$ctrlPrm()
                        .Classes("form-range")
                        .Attributes({ type: self.$bsRange.RANGE }))
                setDefaultConfigPromise.resolve(self);
            })
        return setDefaultConfigPromise;
    }

    /**
     * Set the range min, fluent interface
     * @date 04/01/2023 - 19:43:04
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public Min(value: number): this { this.min = value; return this; }

    /**
     * Set the range max, fluent interface
     * @date 04/01/2023 - 19:43:28
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public Max(value: number): this { this.max = value; return this; }

    /**
     * Set the range step, fluent interface
     * @date 04/01/2023 - 19:43:35
     *
     * @public
     * @param {number} value
     * @returns {this}
     */
    public Step(value: number): this { this.step = value; return this; }

    /**
     * Set the range properties
     * @date 04/01/2023 - 19:43:42
     *
     * @public
     */
    public setProperties(): void {
        super.setProperties();
        this.Min(this.min)
            .Max(this.max)
            .Step(this.step);
    }

    /**
     * Handle the input change event, throttle raising the event
     * @date 03/01/2023 - 15:35:44
     *
     * @protected
     * @override
     * @param {Event} event
     */
    protected override formControlInput_handler(event: Event): void {
        const
            eventName = this.$bsFormControl.INPUT_CHANGE_EVENT_NAME,
            throttleTimeMs = 250;
        event.stopPropagation();
        event.preventDefault();
        const
            inputElement = <HTMLInputElement>this.elements.get(this.inputElementName),
            timeoutHandle = Symbol.for("formControlInput_timeout");
        if (this[timeoutHandle]) {
            clearTimeout(this[timeoutHandle]);
            this[timeoutHandle] = null;
        }
        this[timeoutHandle] = setTimeout(() => {
            const
                eventData = new Mrbr_UI_Bootstrap_Form_TextInputEventData(inputElement.value, event),
                inputEvent = new Mrbr_UI_Bootstrap_Form_TextInputEvent(eventName, this, eventData);
            this.eventSubscribers.raiseEvent(inputEvent);
        }, throttleTimeMs);
    }

}