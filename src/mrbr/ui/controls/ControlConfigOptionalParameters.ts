import { Mrbr_UI_Controls_ControlConfig } from "./ControlConfig";

/**
 * Optional parameters for control configuration.
 * @date 31/10/2022 - 15:16:25
 *
 * @export
 * @class Mrbr_UI_Controls_ControlConfigOptionalParameters
 * @typedef {Mrbr_UI_Controls_ControlConfigOptionalParameters}
 * @extends {EventTarget}
 */
export class Mrbr_UI_Controls_ControlConfigOptionalParameters extends EventTarget {
    //#region Private Property Fields  
    private _id?: string;
    private _classes?: Array<string> | string;
    private _attributes?: object;
    private _data?: object;
    private _properties?: object;
    private _styles?: object;
    private _aria?: object;
    private _children?: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[];
    private _lightTheme?: Array<string> | string;
    private _darkTheme?: Array<string> | string;
    private _template: string;
    //#endregion Private Property Fields
    constructor() { super(); }
    /**
 * Dark Theme Classes for control
 * @date 31/10/2022 - 14:59:58
 *
 * @public
 * @type {Array<string>}
 */
    public get darkTheme(): Array<string> { return <Array<string>>this._darkTheme }

    /**
     * Dark Theme Classes for control
     */
    public set darkTheme(value: Array<string> | string) { let _value = value || ""; this._darkTheme = Array.isArray(_value) ? _value : this._darkTheme = _value.split(" ").map(_val => _val.trim()); }

    /**
     * Light Theme Classes for control
     * @date 31/10/2022 - 15:00:28
     *
     * @public
     * @type {Array<string>}
     */
    public get lightTheme(): Array<string> { return <Array<string>>this._lightTheme; }

    /**
     * Light Theme Classes for control
     */
    public set lightTheme(value: Array<string> | string) { let _value = value || ""; this._lightTheme = Array.isArray(_value) ? _value : this._lightTheme = _value.split(" ").map(_val => _val.trim()); }

    /**
     * Aria Properties for Control
     * @date 31/10/2022 - 15:00:47
     *
     * @public
     * @type {object} Object Properties and values for aria properties
     */
    public get aria(): object { return this._aria; }

    /**
     * Aria Properties for Control
     */
    public set aria(value: object) { this._aria = value; }

    /**
     * Styles for the Control
     * @date 31/10/2022 - 15:01:08
     *
     * @public
     * @type {object}
     */
    public get styles(): object { return this._styles; }

    /**
     * Styles for the Control
     */
    public set styles(value: object) { this._styles = value; }

    /**
     * Properties for the Control
     * @date 31/10/2022 - 15:02:49
     *
     * @public
     * @type {object} Object Properties and values for control
     */
    public get properties(): object { return this._properties; }

    /**
     * Properties for the Control
     */
    public set properties(value: object) { this._properties = value; }

    /**
     * Element Id
     * @date 31/10/2022 - 15:03:55
     *
     * @public
     * @type {string}
     */
    public get id(): string { return this._id; }

    /**
     * Element Id
     */
    public set id(value: string) { this._id = value; }

    /**
     * Classes for the Control
     * @date 31/10/2022 - 15:04:10
     *
     * @public
     * @type {(Array<string> | string)}
     */
    public get classes(): Array<string> | string { return this._classes; }

    /**
     * Classes for the Control
     */
    public set classes(value: Array<string> | string) { this._classes = value; }

    /**
     * Attributes for the Control
     * @date 31/10/2022 - 15:04:26
     *
     * @public
     * @type {object} Object Properties and values for attributes
     */
    public get attributes(): object { return this._attributes; }

    /**
     * Attributes for the Control
     */
    public set attributes(value: object) { this._attributes = value; }

    /**
     * Data Attributes for the Control
     * @date 31/10/2022 - 15:04:53
     *
     * @public
     * @type {object} Object Properties and values for data attributes
     */
    public get data(): object { return this._data; }

    /**
     * Data Attributes for the Control
     */
    public set data(value: object) { this._data = value; }

    /**
     * Child Controls or Elements for the Control
     * @date 31/10/2022 - 15:05:15
     *
     * @public
     * @type {((Mrbr_UI_Controls_ControlConfig | HTMLElement)[])}
     */
    public get children(): (Mrbr_UI_Controls_ControlConfig | HTMLElement)[] { return this._children; }

    /**
     * Child Controls or Elements for the Control
     */
    public set children(value: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[]) { this._children = value; }

    /**
     * HTML Template for the Control
     * @date 31/10/2022 - 15:05:44
     *
     * @public
     * @type {string}
     */
    public get template(): string { return this._template; }

    /**
     * HTML Template for the Control
     */
    public set template(value: string) { this._template = value; }
    //#endregion Public Properties

    //#region Public Property Chaining Methods
    /**
     * Set Dark Theme Settings and returns this for chaining
     * @date 31/10/2022 - 15:06:12
     *
     * @public
     * @param {(Array<string> | string)} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public DarkTheme(value: Array<string> | string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        let _value = value || "";
        this.darkTheme = Array.isArray(_value) ? _value : this.darkTheme = _value.split(" ").map(_val => _val.trim());
        return this;
    }

    /**
     * Set Light Theme Settings and returns this for chaining
     * @date 31/10/2022 - 15:06:45
     *
     * @public
     * @param {(Array<string> | string)} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public LightTheme(value: Array<string> | string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        let _value = value || ""; this.lightTheme = Array.isArray(_value) ? _value : this.lightTheme = _value.split(" ").map(_val => _val.trim());
        return this;
    }

    /**
     * Set Theme Settings and returns this for chaining
     * @date 31/10/2022 - 15:06:54
     *
     * @public
     * @param {object} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Aria(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        if (!this.aria) {
            this.aria = {};
        }
        Object.assign(this.aria, value);
        return this;
    }

    /**
     * Set Style Settings and returns this for chaining
     * @date 31/10/2022 - 15:07:05
     *
     * @public
     * @param {object} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Styles(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        if (!this.styles) {
            this.styles = {};
        }
        Object.assign(this.styles, value);
        return this;
    }

    /**
     * Set Properties and returns this for chaining
     * @date 31/10/2022 - 15:07:22
     *
     * @public
     * @param {object} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Properties(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.properties = value;
        return this;
    }

    /**
     * Sets Id and returns this for chaining
     * @date 31/10/2022 - 15:08:18
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Id(value: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.id = value;
        return this;
    }

    /**
     * Sets Classes and returns this for chaining
     * @date 31/10/2022 - 15:08:34
     *
     * @public
     * @param {(Array<string> | string)} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Classes(value: Array<string> | string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        if (!value) { return; }
        (!Array.isArray(value)) && (value = value.split(" ").map(_val => _val.trim()));
        let currentClasses = [];
        (this.classes) && (currentClasses = (!Array.isArray(this.classes)) ? this.classes.split(" ").map(_val => _val.trim()) : this.classes);
        this.classes = currentClasses.concat(value);
        return this;
    }

    /**
     * Sets Attributes and returns this for chaining
     * @date 31/10/2022 - 15:10:38
     *
     * @public
     * @param {object} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Attributes(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        if (!this.attributes) {
            this.attributes = {};
        }
        Object.assign(this.attributes, value);
        this.attributes = value;
        return this;
    }

    /**
     * Sets Data Attributes and returns this for chaining
     * @date 31/10/2022 - 15:10:52
     *
     * @public
     * @param {object} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Data(value: object): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.data) && (this.data = {});
        Object.assign(this.data, value);
        return this;
    }

    /**
     * Sets Child Elements and returns this for chaining
     * @date 31/10/2022 - 15:11:39
     *
     * @public
     * @param {((Mrbr_UI_Controls_ControlConfig | HTMLElement)[] | Mrbr_UI_Controls_ControlConfig | HTMLElement)} value
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public Children(value: (Mrbr_UI_Controls_ControlConfig | HTMLElement)[] | Mrbr_UI_Controls_ControlConfig | HTMLElement): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!Array.isArray(value)) && (value = [value]);
        this.children = (!this.children) ? value : [...this.children, ...value];
        return this;
    }

    /**
     * Sets Template and returns this for chaining
     * @date 31/10/2022 - 15:12:42
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Controls_ControlConfig}
     */
    public Template(value: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        this.template = value;
        return this;
    }
    //#endregion Public Property Chaining Methods   }
}