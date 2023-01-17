import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Date extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {

    /**
    * Internal Date element name
    * @date 03/01/2023 - 17:08:28
    *
    * @public
    * @static
    * @readonly
    * @type {string}
    */
    public static readonly DATE: string = "date";

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Date
     * @date 03/01/2023 - 17:08:36
     * 
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Date}
     * @memberof Mrbr_UI_Bootstrap_Form_Date
        */
    public get $bsDate(): typeof Mrbr_UI_Bootstrap_Form_Date { return this.$nsBsForm.Date as typeof Mrbr_UI_Bootstrap_Form_Date; }

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Date.
     * @date 16/01/2023 - 13:37:40
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputType = Mrbr_UI_Bootstrap_Form_Date.DATE;
        this._inputElementName = Mrbr_UI_Bootstrap_Form_Date.DATE;
    }

    public initialise(...args: any[]): Mrbr_System_Promise<any> {

        const
            self = this,
            controlName = args?.find((arg) => typeof arg === "object" && arg.controlName)?.controlName ?? this.$bsDate[self.$mrbr.COMPONENT_NAME],
            initalisePromise = this.$promise.create(`${controlName}:initialise`);
        super.initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsDate);
                await self.setDefaultConfig({ controlName });
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsDate.DATE, self.$htmlt.input, self.elementConfig.getConfig(self.$bsDate.FORMCONTROL)
                            .Properties({ type: self.inputType })))
                    )));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => {
                initalisePromise.reject(error);
            })
        return initalisePromise;

    }

}