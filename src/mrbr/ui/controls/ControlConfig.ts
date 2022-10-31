import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";

/**
 * @fileoverview Control Configuration.
 * @date 31/10/2022 - 14:51:41
 *
 * @export
 * @class Mrbr_UI_Controls_ControlConfig
 * @typedef {Mrbr_UI_Controls_ControlConfig}
 */
export class Mrbr_UI_Controls_ControlConfig {
    //#region Properties' Private Fields
    private _elementName: string;
    private _elementType: string;
    private _optionalParameters: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    //#endregion Properties' Private Fields

    /**
     * Creates an instance of Mrbr_UI_Controls_ControlConfig.
     * @date 31/10/2022 - 14:56:11
     *
     * @constructor
     * @param {string} elementName
     * @param {string} elementType
     * @param {?Mrbr_UI_Controls_ControlConfigOptionalParameters} [optionalParameters]
     */
    constructor(elementName: string, elementType: string, optionalParameters?: Mrbr_UI_Controls_ControlConfigOptionalParameters) {
        this.elementName = elementName;
        this.elementType = elementType;
        this._optionalParameters = optionalParameters;
    }
    //#region Public Properties
    /**
     * Optional Parameters for the Control.
     * @date 31/10/2022 - 14:59:23
     *
     * @public
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    public get optionalParameters(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        !this._optionalParameters && (this._optionalParameters = new Mrbr_UI_Controls_ControlConfigOptionalParameters());
        return this._optionalParameters;
    }
    /**
     * Optional Parameters for the Control.
     */
    public set optionalParameters(value: Mrbr_UI_Controls_ControlConfigOptionalParameters) { this._optionalParameters = value; }

    /**
     * Element Name
     * @date 31/10/2022 - 15:03:10
     *
     * @public
     * @type {string}
     */
     public get elementName(): string { return this._elementName; }

     /**
      * Element Name
      */
     public set elementName(value: string) { this._elementName = value; }
 
     /**
      * Element Tag Name
      * @date 31/10/2022 - 15:03:32
      *
      * @public
      * @type {string}
      */
     public get elementType(): string { return this._elementType; }
 
     /**
      * Element Tag Name
      */
     public set elementType(value: string) { this._elementType = value; }

}
