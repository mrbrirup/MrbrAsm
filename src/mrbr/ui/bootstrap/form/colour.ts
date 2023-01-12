import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_TextInputEvent } from "./textInputEvent";
import { Mrbr_UI_Bootstrap_Form_TextInputEventData } from "./textInputEventData";

/**
 * Colour Picker Control
 * @date 03/01/2023 - 17:08:14
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_Colour
 * @typedef {Mrbr_UI_Bootstrap_Form_Colour}
 * @extends {Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_Colour>}
 */
export class Mrbr_UI_Bootstrap_Form_Colour extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {

    
    /**
     * Internal Colour element name
     * @date 03/01/2023 - 17:08:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly COLOUR: string = "color";

    
    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Colour
     * @date 03/01/2023 - 17:08:36
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Colour}
     */
    public get $bsColour(): typeof Mrbr_UI_Bootstrap_Form_Colour { return Mrbr_UI_Bootstrap_Form_Colour; }

    
    /**
     * Colour Picker Title
     * @date 03/01/2023 - 17:08:52
     *
     * @private
     * @type {string}
     */
    private _title: string;
    
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Colour.
     * @date 03/01/2023 - 17:08:59
     *
     * @constructor
     * @public
     * @param {?string} [rootElementName]
     */
    public constructor(rootElementName?: string) {
        super(rootElementName);
        this._inputType = this.$bsColour.COLOUR;
        this._inputElementName = this.$bsColour.COLOUR;
    }
    
    /**
     * Colour Picker Title
     * @date 03/01/2023 - 17:11:09
     *
     * @public
     * @type {string}
     */
    public get title(): string { return this._title; }
    
    /**
     * Colour Picker Title
     */
    public set title(value: string) {
        const inputElement = <HTMLInputElement>this.elements.get(this.$bsColour.COLOUR);
        (inputElement) && (inputElement.title = value);
        this._title = value;
    }

    
    /**
     * Initialise the control, load the manifest and set the default config
     * @date 03/01/2023 - 17:11:22
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsColour = self.$bsColour,
            controlName = args?.find(arg => typeof arg === "object" && arg?.hasOwnProperty("controlName"))?.controlName ?? bsColour[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat()).then(async _ => {
                await self.loadManifest(self.$bsColour)
                await self.setDefaultConfig({ controlName });
                const inputElement = <HTMLInputElement>self.createElement(new self.$ctrlCfg(bsColour.COLOUR, self.$htmlt.input, self.elementConfig.getConfig(bsColour.FORMCONTROL)
                    .Properties({ type: self.inputType })
                ));
                self.assignElementConfig(inputElement, self.elementConfig.getConfig(bsColour.COLOUR));
                self.
                    createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children(inputElement)
                    ))
                self.setProperties();

                initialisePromise.resolve(self);
            })
            .catch((error) => { initialisePromise.reject(error); })
        return initialisePromise;


    }
    
    /**
     * Set the default config for the control
     * @date 03/01/2023 - 17:11:42
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsColour = self.$bsColour,
            controlName = args?.find(arg => typeof arg === "object" && arg?.hasOwnProperty("controlName"))?.controlName ?? bsColour[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig({ controlName }).then(_ => {
                self
                    .elementConfig
                    .controlName(controlName)
                    .setIfNotExist(bsColour.COLOUR, new self.$ctrlPrm()
                        .Classes("form-control-color")
                        .Properties({ type: self.inputType }));
                setDefaultConfigPromise.resolve(self);
            })
            .catch((error) => { setDefaultConfigPromise.reject(error); })
        return setDefaultConfigPromise;
    }
    
    /**
     * Set the control properties
     * @date 03/01/2023 - 17:11:54
     *
     * @public
     */
    public setProperties(): void {
        super.setProperties();
        this.Title(this.title);
    }
    
    /**
     * Set Colour Picker Title, fluent interface
     * @date 03/01/2023 - 17:12:01
     *
     * @public
     * @param {string} title
     * @returns {this}
     */
    public Title(title: string): this {
        this.title = title;
        return this;
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