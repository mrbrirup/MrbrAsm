import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Email extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_Email> {


    /**
     * Interal name of the control
     * @date 03/01/2023 - 03:47:02
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly EMAIL: string = "email";


    /**
     * Email Type Alias
     * @date 03/01/2023 - 03:47:18
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Email}
     */
    public get $bsEmail(): typeof Mrbr_UI_Bootstrap_Form_Email { return this.$bsForm.Email as typeof Mrbr_UI_Bootstrap_Form_Email; }




    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Email.
     * @date 03/01/2023 - 03:47:35
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
        this._inputType = this.$bsEmail.EMAIL;
        this._inputElementName = this.$bsEmail.EMAIL;
    }

    
    /**
     * Initialise the control, load the manifest and set the default config
     * @date 03/01/2023 - 04:53:37
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_Email>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_Email> {
        const
            self = this,
            controlName = args?.find(args => typeof args === "object" && args.hasOwnProperty("controlName"))?.controlName ?? this.$bsEmail[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super.initialise([...args, { controlName }].flat())
            .then(async _ => {
                await self.loadManifest(self.$bsEmail);
                await self.setDefaultConfig({ controlName });
                self.
                    createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children(
                            self.createElement(new self.$ctrlCfg(self.$bsEmail.EMAIL, self.$htmlt.input, self.elementConfig.getConfig(self.$bsEmail.FORMCONTROL)
                                .Attributes({ type: self.inputType })
                            ))
                        )));
                self.setProperties();
                initialisePromise.resolve(self)
            })
            .catch(error => initialisePromise.reject(error))
        return initialisePromise;
    }
}