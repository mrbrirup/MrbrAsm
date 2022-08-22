/*
The MIT License (MIT)
Copyright © 2022 mrbrirup
https://github.com/mrbrirup/MrbrAsm/blob/main/LICENSE
*/
/**
 * Configuration file for MrbrBase
 * @date 22/08/2022 - 22:07:42
 *
 * @export
 * @class Mrbr_Assembly_MrbrConfig
 * @typedef {Mrbr_Assembly_MrbrConfig}
 */
export class Mrbr_Assembly_MrbrConfig {
    private _host: object;
    private _paths: Map<string, string> = new Map<string, string>();
    
    /**
     * Creates an instance of Mrbr_Assembly_MrbrConfig.
     * @date 22/08/2022 - 22:16:17
     *
     * @constructor
     * @param {object} host host object. Usually global object of the environment, global or window
     * @param {object} paths Url Paths to Mrbr Assembly compliant Components
     */
    constructor(host: object, paths: object) {
        this._host = host;
        this.paths = paths
    }
    
    /**
     * host object. Usually global object of the environment, global or window
     * @date 22/08/2022 - 22:17:25
     *
     * @public
     * @type {object}
     */
    public get host(): object {
        return this._host;
    }
    
    /**
     * host object. Usually global object of the environment, global or window
     */
    public set host(value: object) {
        this._host = value;
    }
    
    /**
     * Url Paths to Mrbr Assembly compliant Components
     * @date 22/08/2022 - 22:17:46
     *
     * @type {object}
     */
    get paths(): object { return this._paths }
    
    /**
     * Url Paths to Mrbr Assembly compliant Components
     */
    set paths(value: object) { for (let property in value) { this._paths.set(property, value[property]); } }
}