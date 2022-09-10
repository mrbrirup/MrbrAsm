import { Mrbr_UI_Controls_ControlConfig } from "./ControlConfig";

export class Mrbr_UI_Controls_ControlConfigOptionalParameters extends EventTarget {
    private _id?: string;
    private _classes?: Array<string> | string;
    private _attributes?: object;
    private _data?: object;
    private _properties?: object;
    private _styles?: object;
    private _children?: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[];
    private _lightTheme?: Array<string> | string;
    private _darkTheme?: Array<string> | string;
    constructor() {
        super();
        console.log("Mrbr_UI_Controls_ControlConfig$OptionalParameters")
    }
    public ID(id: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.id = id;
        return this;
    }
    public Classes(value: Array<string> | string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.classes = value;
        return this;
    }
    public Attributes(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.attributes = value;
        return this;
    }
    public Data(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.data = value;
        return this;
    }
    public Properties(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.properties = value;
        return this;
    }
    public Styles(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.styles = value;
        return this;
    }
    public Children(value: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[]): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.children = value;
        return this;
    }
    public LightTheme(value: Array<string> | string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.lightTheme = value;
        return this;
    }
    public DarkTheme(value: Array<string> | string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.darkTheme = value;
        return this;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get classes(): Array<string> | string {
        return this._classes;
    }
    public set classes(value: Array<string> | string) {
        this._classes = value;
    }
    public get attributes(): object {
        return this._attributes;
    }
    public set attributes(value: object) {
        this._attributes = value;
    }
    public get data(): object {
        return this._data;
    }
    public set data(value: object) {
        this._data = value;
    }
    public get properties(): object {
        return this._properties;
    }
    public set properties(value: object) {
        this._properties = value;
    }
    public get styles(): object {
        return this._styles;
    }
    public set styles(value: object) {
        this._styles = value;
    }
    public get children(): (Mrbr_UI_Controls_ControlConfig | HTMLElement)[] {
        return this._children;
    }
    public set children(value: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[]) {
        this._children = value;
    }
    public get lightTheme(): Array<string> | string {
        return this._lightTheme;
    }
    public set lightTheme(value: Array<string> | string) {
        this._lightTheme = value;
    }
    public get darkTheme(): Array<string> | string {
        return this._darkTheme;
    }
    public set darkTheme(value: Array<string> | string) {
        this._darkTheme = value;
    }
}