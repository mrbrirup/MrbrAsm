import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Month extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {
    /**
     * Internal Month element name
     * @date 03/01/2023 - 17:08:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MONTH: string = "month";
    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Month
     * @date 03/01/2023 - 17:08:36
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Month}
     * @memberof Mrbr_UI_Bootstrap_Form_Month
    */
    public get $bsMonth(): typeof Mrbr_UI_Bootstrap_Form_Month { return this.$nsBsForm.Month as typeof Mrbr_UI_Bootstrap_Form_Month; }

    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Month.
     * @date 17/01/2023 - 08:09:06
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputElementName = this._inputType = Mrbr_UI_Bootstrap_Form_Month.MONTH;
    }
    
    /**
     * Initialise the control, loading the manifest and setting the default config
     * @date 17/01/2023 - 08:09:11
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<any>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<any> {
        const
            self = this,
            controlName = args?.find((arg: any) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsMonth[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsMonth);
                await self.setDefaultConfig({ controlName })
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsMonth.MONTH, self.$htmlt.input, self.elementConfig.getConfig(self.$bsMonth.FORMCONTROL)
                            .Properties({ type: self.inputType }))
                        ))));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }
}