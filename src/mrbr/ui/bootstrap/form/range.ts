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
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Range.
     * @date 04/01/2023 - 19:41:46
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputElementName = this.$bsRange.RANGE;
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