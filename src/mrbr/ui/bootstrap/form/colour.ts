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
    public get $bsColour(): typeof Mrbr_UI_Bootstrap_Form_Colour { return this.$nsBsForm.Colour as typeof Mrbr_UI_Bootstrap_Form_Colour; }


    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_TextInputEvent
     * @date 16/01/2023 - 13:31:28
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_TextInputEvent}
     */
    public get $bsTextInputEvent(): typeof Mrbr_UI_Bootstrap_Form_TextInputEvent { return this.$nsBsForm.TextInputEvent as typeof Mrbr_UI_Bootstrap_Form_TextInputEvent; }


    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_TextInputEventData
     * @date 16/01/2023 - 13:31:37
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_TextInputEventData}
     */
    public get $bsTextInputEventData(): typeof Mrbr_UI_Bootstrap_Form_TextInputEventData { return this.$nsBsForm.TextInputEventData as typeof Mrbr_UI_Bootstrap_Form_TextInputEventData; }



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
     */
    public constructor() {
        super();
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
            controlName = args?.find(arg => typeof arg === "object" && arg?.controlName)?.controlName ?? bsColour[self.$mrbr.COMPONENT_NAME],
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
            controlName = args?.find(arg => typeof arg === "object" && arg?.controlName)?.controlName ?? bsColour[self.$mrbr.COMPONENT_NAME],
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
}