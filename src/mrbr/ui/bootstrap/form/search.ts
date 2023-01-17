import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";

export class Mrbr_UI_Bootstrap_Form_Search extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {

    /**
     * Internal Search element name
     * @date 02/01/2023 - 00:13:04
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SEARCH: string = "search";


    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_Search
     * @date 17/01/2023 - 08:31:57
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Search}
     */
    public get $bsSearch(): typeof Mrbr_UI_Bootstrap_Form_Search { return this.$nsBsForm.Search as typeof Mrbr_UI_Bootstrap_Form_Search; }


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Search.
     * @date 17/01/2023 - 08:30:45
     *
     * @constructor
     */
    constructor() {
        super();
        this._inputElementName = this._inputType = Mrbr_UI_Bootstrap_Form_Search.SEARCH;
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
            controlName = args?.find((arg: any) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsSearch[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(this.$bsSearch);
                await self.setDefaultConfig({ controlName })
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                    .Children(
                        <HTMLInputElement>self.createElement(new self.$ctrlCfg(self.$bsSearch.SEARCH, self.$htmlt.input, self.elementConfig.getConfig(self.$bsSearch.FORMCONTROL)
                            .Properties({ type: self.inputType }))
                        ))));
                self.setProperties();
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }

}