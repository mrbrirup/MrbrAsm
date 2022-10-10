import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";

export class Mrbr_UI_Controls_ControlConfig {
    private _elementName: string;
    private _elementType: string;
    private _optionalParameters: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    public get optionalParameters(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        return this._optionalParameters;
    }
    public set optionalParameters(value: Mrbr_UI_Controls_ControlConfigOptionalParameters) {
        this._optionalParameters = value;
    }
    constructor(elementName: string, elementType: string, optionalParameters?: Mrbr_UI_Controls_ControlConfigOptionalParameters) {
        const self = this;
        self.elementName = elementName;
        self.elementType = elementType;
        self._optionalParameters = optionalParameters;
    }
    public get darkTheme(): Array<string> { return <Array<string>>this.optionalParameters?.darkTheme }
    public set darkTheme(value: Array<string> | string) { let _value = value || ""; this.darkTheme = Array.isArray(_value) ? _value : this.darkTheme = _value.split(" ").map(_val => _val.trim()); }
    public get lightTheme(): Array<string> { return <Array<string>>this.optionalParameters?.lightTheme; }
    public set lightTheme(value: Array<string> | string) { let _value = value || ""; this.lightTheme = Array.isArray(_value) ? _value : this.lightTheme = _value.split(" ").map(_val => _val.trim()); }

    public get aria(): object {
        return this.optionalParameters?.aria;
    }
    public set aria(value: object) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.aria = value;
    }

    public get styles(): object {
        return this.optionalParameters?.styles;
    }
    public set styles(value: object) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.styles = value;
    }
    public get properties(): object {
        return this.optionalParameters?.properties;
    }
    public set properties(value: object) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.properties = value;
    }
    public get elementName(): string {
        return this._elementName;
    }
    public set elementName(value: string) {
        this._elementName = value;
    }
    public get elementType(): string {
        return this._elementType;
    }
    public set elementType(value: string) {
        this._elementType = value;
    }
    public get id(): string {
        return this.optionalParameters?.id;
    }
    public set id(value: string) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.id = value;
    }
    public get classes(): Array<string> | string {
        return this.optionalParameters?.classes;
    }
    public set classes(value: Array<string> | string) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.classes = value;
    }
    public get attributes(): object {
        return this.optionalParameters?.attributes;
    }
    public set attributes(value: object) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.attributes = value;
    }
    public get data(): object {
        return this.optionalParameters?.data;
    }
    public set data(value: object) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.data = value;
    }
    public get children(): (Mrbr_UI_Controls_ControlConfig | HTMLElement)[] {
        return this.optionalParameters?.children;
    }
    public set children(value: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[]) {
        !this.optionalParameters && (this.optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        this.optionalParameters.children = value;
    }
    public DarkTheme(value: Array<string> | string): Mrbr_UI_Controls_ControlConfig {
        let _value = value || "";
        this.darkTheme = Array.isArray(_value) ? _value : this.darkTheme = _value.split(" ").map(_val => _val.trim());
        return this;
    }
    public LightTheme(value: Array<string> | string): Mrbr_UI_Controls_ControlConfig {
        let _value = value || ""; this.lightTheme = Array.isArray(_value) ? _value : this.lightTheme = _value.split(" ").map(_val => _val.trim());
        return this;
    }
    public Aria(value: object): Mrbr_UI_Controls_ControlConfig {
        if (!this.aria) {
            this.aria = {};
        }
        Object.assign(this.aria, value);
        return this;
    }
    public Styles(value: object): Mrbr_UI_Controls_ControlConfig {
        if (!this.styles) {
            this.styles = {};
        }
        Object.assign(this.styles, value);        
        return this;
    }
    public Properties(value: object): Mrbr_UI_Controls_ControlConfig {
        this.properties = value;
        return this;
    }
    public ElementName(value: string): Mrbr_UI_Controls_ControlConfig {
        this._elementName = value;
        return this;
    }
    public ElementType(value: string): Mrbr_UI_Controls_ControlConfig {
        this._elementType = value;
        return this;
    }
    public Id(value: string): Mrbr_UI_Controls_ControlConfig {
        this.id = value;
        return this;
    }
    public Classes(value: Array<string> | string): Mrbr_UI_Controls_ControlConfig {
        value = value || "";
        let _value = Array.isArray(value) ? value : value.split(" ").map(_val => _val.trim());
        let _classes = this.classes || [];
        let currentClasses = Array.isArray(_classes) ? _classes : _classes.split(" ").map(_val => _val.trim());
        this.classes = this.classes ? [...new Set([...currentClasses, ..._value])] : _value;
        return this;
    }
    public Attributes(value: object): Mrbr_UI_Controls_ControlConfig {
        if (!this.attributes) {
            this.attributes = {};
        }
        Object.assign(this.attributes, value);
        this.attributes = value;
        return this;
    }
    public Data(value: object): Mrbr_UI_Controls_ControlConfig {
        if (!this.data) {
            this.data = {};
        }
        Object.assign(this.data, value);
        return this;
    }
    public Children(value: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[]): Mrbr_UI_Controls_ControlConfig {
        this.children = value;
        return this;
    }
}
