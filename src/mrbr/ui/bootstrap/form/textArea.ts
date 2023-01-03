import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_TextInputEvent } from "./textInputEvent";
import { Mrbr_UI_Bootstrap_Form_TextInputEventData } from "./textInputEventData";

export class Mrbr_UI_Bootstrap_Form_TextArea extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_TextArea> {

    /**
     * Internal TextArea element name
     * @date 03/01/2023 - 04:41:48
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TEXTAREA: string = "textarea";


    /**
     * TextArea rows
     * @date 03/01/2023 - 04:42:10
     *
     * @private
     * @type {number}
     */
    private _rows: number = 3;

    /**
     * TextArea cols
     * @date 03/01/2023 - 04:42:20
     *
     * @private
     * @type {number}
     */
    private _cols: number = 50;

    /**
     * Old width prior to col change revert to this value when cols are cleared
     * @date 03/01/2023 - 04:43:54
     *
     * @private
     * @type {string}
     */
    private _oldWidth: string = "";

    /**
     * Old height prior to row change, revert to this value when rows are cleared
     * @date 03/01/2023 - 04:44:17
     *
     * @private
     * @type {string}
     */
    private _oldHeight: string = "";

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Form_TextArea
     * @date 03/01/2023 - 04:44:40
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_TextArea}
     */
    public get $bsTextArea(): typeof Mrbr_UI_Bootstrap_Form_TextArea { return this.$bsForm.TextArea as typeof Mrbr_UI_Bootstrap_Form_TextArea; }


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_TextArea.
     * @date 03/01/2023 - 04:44:49
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
        this._inputElementName = "textarea";
    }


    /**
     * TextArea rows, set to "clear" to clear rows
     * @date 03/01/2023 - 04:44:56
     *
     * @public
     * @type {number}
     */
    public get rows(): number { return this._rows; }

    /**
     * TextArea rows, set to "clear" to clear rows
     */
    public set rows(value: number | "clear") {
        const element = this.elements.get(this.$bsTextArea.TEXTAREA);
        let rows: number = value === "clear" ? 3 : value;
        if (rows < 1) { rows = 1; }
        if (element) {
            if (value === "clear") {
                this.elements.get(this.$bsTextArea.TEXTAREA)?.removeAttribute("rows");
                element.style.height = this._oldHeight ?? "";
            }
            else {
                this._oldHeight = element.style.height;
                element.style.height = "auto";
                this.elements.get(this.$bsTextArea.TEXTAREA)?.setAttribute("rows", rows.toString());
            }
        }
        this._rows = rows;
    }

    /**
     * TextArea cols, set to "clear" to clear cols
     * @date 03/01/2023 - 04:45:48
     *
     * @public
     * @type {number}
     */
    public get cols(): number { return this._cols; }

    /**
     * TextArea cols, set to "clear" to clear cols
     */
    public set cols(value: number | "clear") {
        const element = this.elements.get(this.$bsTextArea.TEXTAREA);
        let cols: number = value === "clear" ? 50 : value;
        if (cols < 1) { cols = 1; }
        if (element) {
            if (value === "clear") {
                this.elements.get(this.$bsTextArea.TEXTAREA)?.removeAttribute("cols");
                element.style.width = this._oldWidth ?? "";
            }
            else {
                this._oldWidth = element.style.width;
                element.style.width = "auto";
                this.elements.get(this.$bsTextArea.TEXTAREA)?.setAttribute("cols", cols.toString());
            }
        }
        this._cols = cols;
    }

    /**
     * Initialise the control, load the manifest and set the default config
     * @date 03/01/2023 - 04:46:03
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsTextArea = self.$bsTextArea,
            controlName = args?.find(args => typeof args === "object" && args.hasOwnProperty("controlName"))?.controlName ?? bsTextArea[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super.initialise([...args, { controlName }].flat())
            .then(async _ => {
                await self.loadManifest(bsTextArea);
                await self.setDefaultConfig({ controlName });
                self.
                    createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children(
                            self.createElement(new self.$ctrlCfg(bsTextArea.TEXTAREA, self.$htmlt.textArea, self.elementConfig.getConfig(bsTextArea.FORMCONTROL)
                            )))
                    ))
                self.setProperties();
                self.Cols(self.cols);
                self.Rows(self.rows);
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error))
        return initialisePromise;
    }

    /**
     * Set Cols and return this, set to "clear" to clear cols, fluent interface
     * @date 03/01/2023 - 04:46:27
     *
     * @public
     * @param {(number | "clear")} value
     * @returns {this}
     */
    public Cols(value: number | "clear"): this { this.cols = value; return this; }

    /**
     * Set Rows and return this, set to "clear" to clear rows, fluent interface
     * @date 03/01/2023 - 04:46:58
     *
     * @public
     * @param {(number | "clear")} value
     * @returns {this}
     */
    public Rows(value: number | "clear"): this { this.rows = value; return this; }


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