import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "../controls/BootstrapControl";
import { Mrbr_UI_Bootstrap_Form_FormSubmitEvent } from "./formSubmitEvent";
import { Mrbr_UI_Bootstrap_Form_FormSubmitEventData } from "./formSubmitEventData";

export class Mrbr_UI_Bootstrap_Form_Form extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    public static readonly FORM: string = "form";
    public static readonly FORM_SUBMIT_EVENT_NAME: string = "submit";

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
     * Alias Mrbr.UI.Bootstrap.Form.Form Class
     * @date 13/01/2023 - 07:56:36
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Form}
     */
    public get $bsForm(): typeof Mrbr_UI_Bootstrap_Form_Form { return this.$nsBsForm.Form as typeof Mrbr_UI_Bootstrap_Form_Form; }

    /**
     * Alias Mrbr.UI.Bootstrap.Form.FormSubmitEventData Class
     * @date 13/01/2023 - 07:56:43
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FormSubmitEventData}
     */
    public get $bsFormSubmitEventData(): typeof Mrbr_UI_Bootstrap_Form_FormSubmitEventData { return this.$nsBsForm.FormSubmitEventData as typeof Mrbr_UI_Bootstrap_Form_FormSubmitEventData; }

    /**
     * Alias Mrbr.UI.Bootstrap.Form.FormSubmitEvent Class
     * @date 13/01/2023 - 07:56:50
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FormSubmitEvent}
     */
    public get $bsFormSubmitEvent(): typeof Mrbr_UI_Bootstrap_Form_FormSubmitEvent { return this.$nsBsForm.FormSubmitEvent as typeof Mrbr_UI_Bootstrap_Form_FormSubmitEvent; }

    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Form.
     * @date 13/01/2023 - 08:18:19
     *
     * @constructor
     */
    constructor() { super(); }


    /**
     * Initialise the Form, load manifest and set default config
     * @date 13/01/2023 - 07:57:00
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName || self.$bsForm[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super.initialise({ controlName }, ...args)
            .then(async _ => {
                await self.loadManifest(self.$bsForm);
                await self.setDefaultConfig({ controlName });
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.form, self.elementConfig.getConfig(self.$bsForm.FORM)));
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error));
        return initialisePromise;
    }

    /**
     * Set default config for the Form
     * @date 13/01/2023 - 07:57:18
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName || self.$bsForm[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig({ controlName }, ...args)
            .then(async _ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsForm.FORM, new self.$ctrlPrm()
                        .Attributes({ novalidate: true })
                    );
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error));
        return setDefaultConfigPromise;
    }

    /**
     * Add an event subscriber to the Form Submit Event or pass the eventSubscriber id to remove the subscriber
     * @date 13/01/2023 - 07:57:27
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void | number} callback
     * @returns {number}
     */
    public onSubmit(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        const eventName = this.$bsForm.FORM_SUBMIT_EVENT_NAME;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.formSubmit_handler,
            this,
            callback
        );
    }

    /**
     * Form Submit Event Handler
     * @date 13/01/2023 - 07:59:40
     *
     * @public
     * @param {Event} event
     */
    public formSubmit_handler(event: Event): void {
        this.eventSubscribers.raiseEvent(new this.$bsFormSubmitEvent(this.$bsForm.FORM_SUBMIT_EVENT_NAME, this, new this.$bsFormSubmitEventData(event, this)));
    }

    /**
     * Check if the Form has been validated
     * @date 13/01/2023 - 08:02:11
     *
     * @public
     * @returns {boolean}
     */
    public formWasValidated(): boolean {
        return this.rootElement?.classList.contains("was-validated");
    }

    /**
     * Set the Form as validated
     * @date 13/01/2023 - 08:02:19
     *
     * @public
     * @param {boolean} value
     */
    public formValidated(value: boolean) {
        this.rootElement?.classList.toggle("was-validated", value);
    }

}