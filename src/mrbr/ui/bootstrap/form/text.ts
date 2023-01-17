import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Text extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {


    /**
     * Internal input type and element name
     * @date 17/01/2023 - 08:35:29
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TEXT: string = "text";

    
    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Text
     * @date 17/01/2023 - 08:40:32
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Text}
     */
    public get $bsText(): typeof Mrbr_UI_Bootstrap_Form_Text { return this.$nsBsForm.Text as typeof Mrbr_UI_Bootstrap_Form_Text; }

    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Text.
     * @date 17/01/2023 - 08:40:39
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputElementName = this._inputType = this.$bsText.TEXT;
    }

    /**
     * Initialise the control, load the manifest and set the default config
     * @date 17/01/2023 - 07:50:08
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find((arg: any) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsText[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsText);
                await self.setDefaultConfig({ controlName })
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsText.TEXT, self.$htmlt.input, self.elementConfig.getConfig(self.$bsText.FORMCONTROL)
                            .Properties({ type: self.inputType }))
                        ))));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }    

}