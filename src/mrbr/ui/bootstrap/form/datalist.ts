import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_TextInputEvent } from "./textInputEvent";
import { Mrbr_UI_Bootstrap_Form_TextInputEventData } from "./textInputEventData";

export class Mrbr_UI_Bootstrap_Form_DataList extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {


    /**
     * Internal Datalist element name
     * @date 03/01/2023 - 21:38:13
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DATALIST: string = "datalist";

    /**
     * Internal Option element name
     * @date 03/01/2023 - 21:38:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly OPTION: string = "option";

    /**
     * Internal Datalist Input element name
     * @date 03/01/2023 - 21:38:30
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DATALIST_INPUT: string = "datalist_input";


    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_DataList
     * @date 03/01/2023 - 21:38:40
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_DataList}
     */
    public get $bsDatalist(): typeof Mrbr_UI_Bootstrap_Form_DataList { return Mrbr_UI_Bootstrap_Form_DataList; }


    /**
     * Datalist options
     * @date 03/01/2023 - 21:38:59
     *
     * @private
     * @type {string[]}
     */
    private _options: string[] = [];



    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_DataList.
     * @date 03/01/2023 - 21:39:10
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
        this._inputElementName = this.$bsDatalist.DATALIST_INPUT;
    }

    /**
     * Datalist options
     * @date 03/01/2023 - 21:39:15
     *
     * @public
     * @type {string[]}
     */
    public get options(): string[] { return this._options; }

    /**
     * Datalist options
     */
    public set options(value: string[]) {
        const datalist = <HTMLDataListElement>this.elements.get(this.$bsDatalist.DATALIST);
        datalist && (datalist.innerHTML = value.map(option => `<${this.$bsDatalist.OPTION} value="${option}">`).join(""));
        this._options = value;
    }

    /**
     * Initialise the control, load manifest and set default config
     * @date 03/01/2023 - 21:39:32
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsDatalist = this.$bsDatalist,
            controlName = args?.find(arg => typeof arg === "object" && arg?.hasOwnProperty("controlName"))?.controlName ?? this.$bsDatalist[this.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`)
        super
            .initialise([...args, { controlName }].flat())
            .then(async _ => {
                await self.loadManifest(bsDatalist);
                await self.setDefaultConfig({ controlName });
                const
                    datalist = <HTMLDataListElement>self.createElement(new self.$ctrlCfg(bsDatalist.DATALIST, self.$htmlt.dataList, self.elementConfig.getConfig(bsDatalist.DATALIST))),
                    inputElement = <HTMLInputElement>self.createElement(new self.$ctrlCfg(bsDatalist.DATALIST_INPUT, self.$htmlt.input, self.elementConfig.getConfig(bsDatalist.FORMCONTROL)
                        .Attributes({ list: datalist.id })
                    ));

                self.
                    createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children([inputElement, datalist])));

                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error))

        return initialisePromise;
    }

    /**
     * Set the datalist options, replaces any existing options, use addOption to add a single option, fluent interface
     * @date 03/01/2023 - 21:40:09
     *
     * @public
     * @param {string[]} options
     * @returns {this}
     */
    public Options(options: string[]): this { this.options = options; return this; }
    
    /**
     * Add an option to the datalist, fluent interface
     * @date 03/01/2023 - 21:40:56
     *
     * @public
     * @param {string} option
     * @returns {this}
     */
    public AddOption(option: string): this { this.options = [...this.options, option]; return this; }
    
    /**
     * Remove an option from the datalist, fluent interface
     * @date 03/01/2023 - 21:41:41
     *
     * @public
     * @param {string} option
     * @returns {this}
     */
    public RemoveOption(option: string): this { this.options = this.options.filter(opt => opt !== option); return this; }
    
    /**
     * Clear the datalist options, fluent interface
     * @date 03/01/2023 - 21:41:48
     *
     * @public
     * @returns {this}
     */
    public ClearOptions(): this { this.options = []; return this; }
    /**
     * Handle the input change event, throttle raising the event
     * @date 03/01/2023 - 15:35:44
     *
     * @protected
     * @override
     * @param {Event} event
     */
    protected override formControlInput_handler(event: Event): void {
        const
            eventName = this.$bsFormControl.INPUT_CHANGE_EVENT_NAME,
            throttleTimeMs = 250;
        event.stopPropagation();
        event.preventDefault();
        const
            inputElement = <HTMLInputElement>this.elements.get(this.inputElementName),
            timeoutHandle = Symbol.for("formControlInput_timeout");
        if (this[timeoutHandle]) {
            clearTimeout(this[timeoutHandle]);
            this[timeoutHandle] = null;
        }
        this[timeoutHandle] = setTimeout(() => {
            const
                eventData = new Mrbr_UI_Bootstrap_Form_TextInputEventData(inputElement.value, event),
                inputEvent = new Mrbr_UI_Bootstrap_Form_TextInputEvent(eventName, this, eventData);
            this.eventSubscribers.raiseEvent(inputEvent);
        }, throttleTimeMs);
    }


}