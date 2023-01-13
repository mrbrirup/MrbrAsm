import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_TextInputEvent } from "./textInputEvent";
import { Mrbr_UI_Bootstrap_Form_TextInputEventData } from "./textInputEventData";

export class Mrbr_UI_Bootstrap_Form_Email extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {


    /**
     * Interal name of the control
     * @date 03/01/2023 - 03:47:02
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly EMAIL: string = "email";


    /**
     * Email Type Alias
     * @date 03/01/2023 - 03:47:18
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Email}
     */
    public get $bsEmail(): typeof Mrbr_UI_Bootstrap_Form_Email { return this.$nsBsForm.Email as typeof Mrbr_UI_Bootstrap_Form_Email; }




    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Email.
     * @date 03/01/2023 - 03:47:35
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputType = this.$bsEmail.EMAIL;
        this._inputElementName = this.$bsEmail.EMAIL;
    }


    /**
     * Initialise the control, load the manifest and set the default config
     * @date 03/01/2023 - 04:53:37
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_Email>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_Email> {
        const
            self = this,
            controlName = args?.find(args => typeof args === "object" && args.hasOwnProperty("controlName"))?.controlName ?? this.$bsEmail[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super.initialise([...args, { controlName }].flat())
            .then(async _ => {
                await self.loadManifest(self.$bsEmail);
                await self.setDefaultConfig({ controlName });
                self.
                    createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children(
                            self.createElement(new self.$ctrlCfg(self.$bsEmail.EMAIL, self.$htmlt.input, self.elementConfig.getConfig(self.$bsEmail.FORMCONTROL)
                                .Attributes({ type: self.inputType })
                            ))
                        )));
                self.setProperties();
                initialisePromise.resolve(self)
            })
            .catch(error => initialisePromise.reject(error))
        return initialisePromise;
    }
    /**
     * Handle the input change event, throttle the event to prevent multiple events being fired
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