import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Number extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {

    
    /**
     * Internal Number element name
     * @date 17/01/2023 - 08:17:56
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly NUMBER: string = "number";

    
    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Number
     * @date 17/01/2023 - 08:18:02
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Number}
     */
    public get $bsNumber(): typeof Mrbr_UI_Bootstrap_Form_Number { return this.$nsBsForm.Number as typeof Mrbr_UI_Bootstrap_Form_Number; }

    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Number.
     * @date 17/01/2023 - 08:18:09
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputElementName = this._inputType = this.$bsNumber.NUMBER;
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
            controlName = args?.find((arg: any) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsNumber[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsNumber);
                await self.setDefaultConfig({ controlName })
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsNumber.NUMBER, self.$htmlt.input, self.elementConfig.getConfig(self.$bsNumber.FORMCONTROL)
                            .Properties({ type: self.inputType }))
                        ))));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }

} 