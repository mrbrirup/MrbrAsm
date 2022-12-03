import { Mrbr_System_Collections_Map } from "../../system/collections/Map";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";

export class Mrbr_UI_Controls_ElementsConfigMap extends Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters> {
    private _controlName: string;
    public controlName(controlName: string): this { this._controlName = controlName; return this; }
    constructor(controlName: string) {
        super();
        const cls = Mrbr_UI_Controls_ElementsConfigMap;
        this._controlName = controlName;
        cls._instance ??= new Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>();
        this._map = cls._instance;
    }
    private controlNameKey(key: string): string { return `${this._controlName}:${key}`; }
    public override add(key: string, value: Mrbr_UI_Controls_ControlConfigOptionalParameters): void { super.add(this.controlNameKey(key), value); }
    public override remove(key: string): void { super.remove(this.controlNameKey(key)); }
    public override get(key: string): Mrbr_UI_Controls_ControlConfigOptionalParameters { return super.get(this.controlNameKey(key)); }
    public override has(key: string): boolean { return super.has(this.controlNameKey(key)); }
    public override delete(key: string): boolean { return super.delete(this.controlNameKey(key)) }
    public override set(key: string, value: Mrbr_UI_Controls_ControlConfigOptionalParameters): this { super.set(this.controlNameKey(key), value); return this; }
    public override setIfNotExist(key: string, value: Mrbr_UI_Controls_ControlConfigOptionalParameters): this {
        (!this.has(key)) && (super.set(this.controlNameKey(key), value));
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
    private static _instance: Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>;
}