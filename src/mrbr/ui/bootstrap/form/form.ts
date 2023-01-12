import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Form extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {

    public static readonly FORM: string = "form";

    public get $bsForm(): typeof Mrbr_UI_Bootstrap_Form_Form { return Mrbr_UI_Bootstrap_Form_Form; }

    constructor(rootElementName?: string) {
        super(rootElementName);
    }

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
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName || self.$bsForm[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig({ controlName }, ...args)
            .then(async _ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsForm.FORM, new self.$ctrlPrm());
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error));
        return setDefaultConfigPromise;
    }
}