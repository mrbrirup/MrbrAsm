import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Tel extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {


    /**
     * Internal input type and element name
     * @date 17/01/2023 - 08:35:29
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TEL: string = "tel";

    
    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Tel
     * @date 17/01/2023 - 08:40:09
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Tel}
     */
    public get $bsTel(): typeof Mrbr_UI_Bootstrap_Form_Tel { return this.$nsBsForm.Tel as typeof Mrbr_UI_Bootstrap_Form_Tel; }

    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Tel.
     * @date 17/01/2023 - 08:40:22
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputElementName = this._inputType = this.$bsTel.TEL;
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
            controlName = args?.find((arg: any) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsTel[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsTel);
                await self.setDefaultConfig({ controlName })
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsTel.TEL, self.$htmlt.input, self.elementConfig.getConfig(self.$bsTel.FORMCONTROL)
                            .Properties({ type: self.inputType }))
                        ))));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }    

}