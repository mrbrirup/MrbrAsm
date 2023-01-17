import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Password extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {


    /**
     * Internal Password element name
     * @date 17/01/2023 - 08:18:41
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PASSWORD: string = "password";

    
    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Password
     * @date 17/01/2023 - 08:25:05
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Password}
     */
    public get $bsPassword(): typeof Mrbr_UI_Bootstrap_Form_Password { return this.$nsBsForm.Password as typeof Mrbr_UI_Bootstrap_Form_Password; }
    
    
    /**
     * AutoComplete for Input Element
     * @date 17/01/2023 - 08:25:13
     *
     * @private
     * @type {("on" | "off" | "current-password" | "new-password")}
     */
    private _autoComplete: "on" | "off" | "current-password" | "new-password" = "off";

    constructor() {
        super();
        this._inputElementName = this._inputType = this.$bsPassword.PASSWORD;
    }

    public initialise(...args: any[]): Mrbr_System_Promise<any> {
        const
            self = this,
            controlName = args?.find((arg: any) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsPassword[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsPassword);
                await self.setDefaultConfig({ controlName })
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsPassword.PASSWORD, self.$htmlt.input, self.elementConfig.getConfig(self.$bsPassword.FORMCONTROL)
                            .Properties({ type: self.inputType }))
                        ))));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }

    
    /**
     * AutoComplete for Input Element
     * @date 17/01/2023 - 08:25:34
     *
     * @public
     * @type {("on" | "off" | "current-password" | "new-password")}
     */
    public get autoComplete(): "on" | "off" | "current-password" | "new-password" {        return this._autoComplete;    }
    
    /**
     * AutoComplete for Input Element
     */
    public set autoComplete(value: "on" | "off" | "current-password" | "new-password") {
        const inputElement = this.inputElement;
        inputElement && ((inputElement as HTMLInputElement).autocomplete = value);
        this._autoComplete = value;
    }
    
    /**
     * AutoComplete for Input Element
     * @date 17/01/2023 - 08:25:49
     *
     * @public
     * @param {("on" | "off" | "current-password" | "new-password")} value
     * @returns {Mrbr_UI_Bootstrap_Form_Password}
     */
    public AutoComplete(value: "on" | "off" | "current-password" | "new-password"): Mrbr_UI_Bootstrap_Form_Password {
        this.autoComplete = value;
        return this;
    }
    
    /**
     * Set Properties
     * @date 17/01/2023 - 08:25:56
     *
     * @public
     */
    public setProperties(): void {
        super.setProperties();
        this.autoComplete = this._autoComplete;
    }

}