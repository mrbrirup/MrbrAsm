import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_FileInputEvent } from "./fileInputEvent";
import { Mrbr_UI_Bootstrap_Form_FileInputEventData } from "./fileInputEventData";

/**
 * File Input Control
 * @date 03/01/2023 - 15:32:44
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_FileInput
 * @typedef {Mrbr_UI_Bootstrap_Form_FileInput}
 * @extends {Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_FileInput>}
 */
export class Mrbr_UI_Bootstrap_Form_FileInput extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_FileInput> {


    /**
     * Internal File Input element name
     * @date 03/01/2023 - 15:32:58
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FILE: string = "file";


    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_FileInput
     * @date 03/01/2023 - 15:33:06
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FileInput}
     */
    public get $bsFileInput(): typeof Mrbr_UI_Bootstrap_Form_FileInput { return Mrbr_UI_Bootstrap_Form_FileInput; }

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_FileInputEvent
     * @date 03/01/2023 - 15:33:13
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FileInputEvent}
     */
    public get $bsFileInputEvent(): typeof Mrbr_UI_Bootstrap_Form_FileInputEvent { return this.$bsForm.FileInputEvent as typeof Mrbr_UI_Bootstrap_Form_FileInputEvent; }

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_FileInputEventData
     * @date 03/01/2023 - 15:33:22
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_FileInputEventData}
     */
    public get $bsFileInputEventData(): typeof Mrbr_UI_Bootstrap_Form_FileInputEventData { return this.$bsForm.FileInputEventData as typeof Mrbr_UI_Bootstrap_Form_FileInputEventData; }


    /**
     * Allow multiple files to be selected
     * @date 03/01/2023 - 15:33:31
     *
     * @private
     * @type {boolean}
     */
    private _multiple: boolean = false;



    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_FileInput.
     * @date 03/01/2023 - 15:34:09
     *
     * @constructor
     * @param {string} rootElementName
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
        this._inputType = this.$bsFileInput.FILE;
        this._inputElementName = this.$bsFileInput.FILE;
    }

    /**
     * Allow multiple files to be selected
     * @date 03/01/2023 - 15:34:17
     *
     * @public
     * @type {boolean}
     */
    public get multiple(): boolean { return this._multiple; }

    /**
     * Allow multiple files to be selected
     */
    public set multiple(value: boolean) {
        const inputElement = this.elements.get(this.$bsFileInput.FILE);
        if (inputElement) {
            value && inputElement.setAttribute("multiple", "");
            !value && inputElement.removeAttribute("multiple");
        }
        this._multiple = value;
    }


    /**
     * Initialise the control, load the manifest and set the default config
     * @date 03/01/2023 - 15:34:30
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsFileInput = self.$bsFileInput,
            controlName = args?.find(arg => typeof arg === "object" && arg?.hasOwnProperty("controlName"))?.controlName ?? self.$bsFileInput[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([...args, { controlName }].flat())
            .then(async _ => {
                await self.loadManifest(bsFileInput);
                await self.setDefaultConfig({ controlName });
                self.
                    createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children(
                            self.createElement(new self.$ctrlCfg(bsFileInput.FILE, self.$htmlt.input, self.elementConfig.getConfig(bsFileInput.FORMCONTROL)
                                .Properties({ type: self.inputType })
                            )))
                    ))
                self.setProperties();

                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error));
        return initialisePromise;
    }

    /**
     * Set the properties of the control
     * @date 03/01/2023 - 15:35:19
     *
     * @public
     */
    public setProperties(): void {
        super.setProperties();
        this.Multiple(this.multiple);
    }

    /**
     * Allow multiple files to be selected, fluent interface
     * @date 03/01/2023 - 15:35:29
     *
     * @public
     * @param {boolean} multiple
     * @returns {this}
     */
    public Multiple(multiple: boolean): this {
        this.multiple = multiple;
        return this;
    }

    /**
     * Handle the input change event
     * @date 03/01/2023 - 15:35:44
     *
     * @protected
     * @override
     * @param {Event} event
     */
    protected override formControlInput_handler(event: Event): void {
        const eventName = this.$bsFormControl.INPUT_CHANGE_EVENT_NAME;
        event.stopPropagation();
        event.preventDefault();
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName)
        this.eventSubscribers.raiseEvent(new this.$bsFileInputEvent(eventName, this, new this.$bsForm.FileInputEventData(inputElement.files, event)));
    }
}