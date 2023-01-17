import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./bootstrapFormControl";
export class Mrbr_UI_Bootstrap_Form_DateTimeLocal extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {
    /**
     * Internal Date element name
     * @date 03/01/2023 - 17:08:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DATE_TIME_LOCAL: string = "datetime-local";
    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_DateTimeLocal
     * @date 03/01/2023 - 17:08:36
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_DateTimeLocal}
     * @memberof Mrbr_UI_Bootstrap_Form_DateTimeLocal
     */
    public get $bsDateTimeLocal(): typeof Mrbr_UI_Bootstrap_Form_DateTimeLocal { return this.$nsBsForm.DateTimeLocal as typeof Mrbr_UI_Bootstrap_Form_DateTimeLocal; }

    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_DateTimeLocal.
     * @date 17/01/2023 - 07:50:02
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputType = this.$bsDateTimeLocal.DATE_TIME_LOCAL;
        this._inputElementName = this.$bsDateTimeLocal.DATE_TIME_LOCAL;
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
            controlName = args?.find((arg: any) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsDateTimeLocal[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsDateTimeLocal);
                await self.setDefaultConfig({ controlName })
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsDateTimeLocal.DATE_TIME_LOCAL, self.$htmlt.input, self.elementConfig.getConfig(self.$bsDateTimeLocal.FORMCONTROL)
                            .Properties({ type: self.inputType }))
                        ))));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }

}

