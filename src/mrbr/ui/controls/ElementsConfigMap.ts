import { Mrbr_System_Collections_Map } from "../../system/collections/Map";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";

/**
 * Elements Config Map. Wraps a Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>.
 * All Config is stored in this Map in static _instance.
 * Config is accessed by ControlName:ElementName.
 * @date 12/12/2022 - 02:29:33
 *
 * @export
 * @class Mrbr_UI_Controls_ElementsConfigMap
 * @typedef {Mrbr_UI_Controls_ElementsConfigMap}
 * @extends {Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>}
 */
export class Mrbr_UI_Controls_ElementsConfigMap extends Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters> {

    /**
     * Instance ControlName used as prefix for all keys field
     * @date 12/12/2022 - 02:30:28
     *
     * @private
     * @type {string}
     */
    private _controlName: string;

    /**
     * Set ControlName used as prefix for all keys field - fluent interface
     * @date 12/12/2022 - 02:32:15
     *
     * @public
     * @param {string} controlName
     * @returns {this}
     */
    public controlName(controlName: string): this { this._controlName = controlName; return this; }

    /**
     * Creates an instance of Mrbr_UI_Controls_ElementsConfigMap.
     * @date 12/12/2022 - 02:32:41
     *
     * @constructor
     * @param {string} controlName
     */
    constructor(controlName: string) {
        super();
        const cls = Mrbr_UI_Controls_ElementsConfigMap;
        this._controlName = controlName;
        cls._staticMap ??= new Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>();
        this._map ??= cls._staticMap;
    }

    /**
     * Get Key for Map with ControlName as prefix
     * @date 12/12/2022 - 02:32:58
     *
     * @private
     * @param {string} key
     * @returns {string}
     */
    private controlNameKey(key: string): string { return `${this._controlName}:${key}`; }

    /**
     * Add Element Config to Map
     * @date 12/12/2022 - 02:33:09
     *
     * @public
     * @param {string} key
     * @param {Mrbr_UI_Controls_ControlConfigOptionalParameters} value
     */
    public add(key: string, value: Mrbr_UI_Controls_ControlConfigOptionalParameters): void { super.add(this.controlNameKey(key), value); }

    /**
     * Remove Element Config from Map
     * @date 12/12/2022 - 02:33:28
     *
     * @public
     * @param {string} key
     */
    public remove(key: string): void { super.remove(this.controlNameKey(key)); }

    /**
     * Get Element Config from Map
     * @date 12/12/2022 - 02:33:34
     *
     * @public
     * @param {string} key
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public get(key: string): Mrbr_UI_Controls_ControlConfigOptionalParameters { return super.get(this.controlNameKey(key)); }

    /**
     * Check if Element Config exists in Map
     * @date 12/12/2022 - 02:33:43
     *
     * @public
     * @param {string} key
     * @returns {boolean}
     */
    public has(key: string): boolean { return super.has(this.controlNameKey(key)); }

    /**
     * Delete Element Config from Map
     * @date 12/12/2022 - 02:33:51
     *
     * @public
     * @param {string} key
     * @returns {boolean}
     */
    public delete(key: string): boolean { return super.delete(this.controlNameKey(key)) }

    /**
     * Set Element Config in Map
     * @date 12/12/2022 - 02:34:01
     *
     * @public
     * @param {string} key
     * @param {Mrbr_UI_Controls_ControlConfigOptionalParameters} value
     * @returns {this}
     */
    public set(key: string, value: Mrbr_UI_Controls_ControlConfigOptionalParameters): this { super.set(this.controlNameKey(key), value); return this; }

    /**
     * Set Element Config in Map if it does not exist
     * @date 12/12/2022 - 02:34:11
     *
     * @public
     * @param {string} key
     * @param {Mrbr_UI_Controls_ControlConfigOptionalParameters} value
     * @returns {this}
     */
    public setIfNotExist(key: string, value: Mrbr_UI_Controls_ControlConfigOptionalParameters): this {
        (!this.has(key)) && (this.set(key, value));
        return this;
    }

    /**
     * Get Element Config by Key. Returns copy of the config.
     * @date 03/12/2022 - 09:06:25
     *
     * @public
     * @param {string} key
     * @returns {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public getConfig(key: string): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), super.get(this.controlNameKey(key)));
    }

    /**
     * Static Map of all Element Configs
     * @date 12/12/2022 - 02:34:19
     *
     * @private
     * @static
     * @type {Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>}
     */
    private static _staticMap: Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>;
}