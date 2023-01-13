import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_SelectInputEvent } from "./selectInputEvent";
import { Mrbr_UI_Bootstrap_Form_SelectInputEventData } from "./selectInputEventData";

export class Mrbr_UI_Bootstrap_Form_Select extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {

    public static readonly SELECT: string = "select";

    public get $bsSelect(): typeof Mrbr_UI_Bootstrap_Form_Select { return Mrbr_UI_Bootstrap_Form_Select; }


    private _selectSize: "small" | "large" | "default" = "default";

    private _multiple: boolean = false;

    public static Option = class {
        value: string;
        text: string;
        selected: boolean = false;
        constructor(value: string, text: string, selected: boolean = false) {
            this.value = value;
            this.text = text;
            this.selected = selected;
        }
        createOptionElement(): HTMLOptionElement {
            const optionElement = document.createElement("option");
            optionElement.value = this.value;
            optionElement.text = this.text;
            optionElement.selected = this.selected;
            return optionElement;
        }
    }

    private _options: InstanceType<typeof Mrbr_UI_Bootstrap_Form_Select.Option>[] = [];
    public get options(): InstanceType<typeof Mrbr_UI_Bootstrap_Form_Select.Option>[] { return this._options; }
    public set options(value: InstanceType<typeof Mrbr_UI_Bootstrap_Form_Select.Option>[]) {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (inputElement) {
            const
                optionElements = value?.map(option => option.createOptionElement()) ?? [],
                selectedOption = optionElements.find(option => option.selected);
            if (selectedOption) { inputElement.value = selectedOption.value; }
            inputElement.innerHTML = "";

            inputElement.append(...optionElements);
        }
        this._options = value;
    }

    constructor() {
        super();
        this._inputElementName = this.$bsSelect.SELECT;
    }
    /**
     * Size of Form Control
     * @date 03/01/2023 - 02:35:34
     *
     * @public
     * @type {("small" | "large" | undefined)}
     */
    public get size(): "small" | "large" | "default" { return this._selectSize; }

    /**
     * Size of Form Control
     */
    public set size(value: "small" | "large" | "default") {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        if (inputElement) {
            if (value === "default") { inputElement.classList.remove("form-select-sm", "form-select-lg"); }
            else if (value) {
                inputElement.classList.remove(`form-select-${value !== "large" ? 'lg' : 'sm'}`);
                inputElement.classList.add(`form-select-${value === "large" ? 'lg' : 'sm'}`);
            }
        }
        this._selectSize = value;
    }


    public get multiple(): boolean { return this._multiple; }
    public set multiple(value: boolean) {
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        inputElement && (inputElement.multiple = value);
        this._multiple = value;
    }


    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Form_Select> {
        const
            self = this,
            bsSelect = self.$bsSelect,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName ?? bsSelect[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise([...args, { controlName }].flat())
            .then(async _ => {
                await self.loadManifest(bsSelect);
                await self.setDefaultConfig({ controlName });
                self.
                    createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                        .Children(
                            self.createElement(new self.$ctrlCfg(bsSelect.SELECT, self.$htmlt.select, self.elementConfig.getConfig(bsSelect.SELECT)
                            )))
                    ));
                self.setProperties();
                initialisePromise.resolve(self);
            })


        return initialisePromise;
    }

    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            bsSelect = self.$bsSelect,
            controlName = args?.find(arg => typeof arg === "object" && arg.hasOwnProperty("controlName"))?.controlName ?? bsSelect[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig({ controlName })
            .then(_ => {
                self
                    .elementConfig
                    .controlName(controlName)
                    .setIfNotExist(bsSelect.SELECT, new self.$ctrlPrm()
                        .Classes("form-select"));

                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;
    }

    public setProperties(): void {
        super.setProperties();
        this.Options(this.options)
            .Multiple(this.multiple)
    }


    public Options(options: InstanceType<typeof Mrbr_UI_Bootstrap_Form_Select.Option>[]): this {
        this.options = options;
        return this;
    }
    public AddOption(option: InstanceType<typeof Mrbr_UI_Bootstrap_Form_Select.Option>): this {
        this.options.push(option);
        const inputElement = <HTMLInputElement>this.elements.get(this.inputElementName);
        inputElement && (inputElement.append(option.createOptionElement()));
        return this;
    }
    public RemoveOption(option: InstanceType<typeof Mrbr_UI_Bootstrap_Form_Select.Option>): this {
        this.options = this.options.filter(opt => opt !== option);
        return this;
    }
    public ClearOptions(): this {
        this.options = [];
        return this;
    }
    public Multiple(value: boolean): this {
        this.multiple = value;
        return this;
    }
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
            inputElement = <HTMLSelectElement>this.elements.get(this.inputElementName),
            timeoutHandle = Symbol.for("formControlInput_timeout");
        if (this[timeoutHandle]) {
            clearTimeout(this[timeoutHandle]);
            this[timeoutHandle] = null;
        }
        this[timeoutHandle] = setTimeout(() => {
            const
                eventData = new Mrbr_UI_Bootstrap_Form_SelectInputEventData(Array.from(inputElement.selectedOptions).map(option => option.value), event),
                inputEvent = new Mrbr_UI_Bootstrap_Form_SelectInputEvent(eventName, this, eventData);
            this.eventSubscribers.raiseEvent(inputEvent);
        }, throttleTimeMs);
    }
}