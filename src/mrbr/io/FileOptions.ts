
/**
 * FileOptions to apply to a file request
 * @date 03/11/2022 - 05:46:43
 *
 * @export
 * @class Mrbr_IO_FileOptions
 * @typedef {Mrbr_IO_FileOptions}
 */
export class Mrbr_IO_FileOptions {
    
    /**
     * Attribute field to apply to the file load
     * @date 03/11/2022 - 05:46:59
     *
     * @type {object}
     */
    _attributes: object;
    
    /**
     * Addition data to apply to file load request
     * @date 03/11/2022 - 05:47:16
     *
     * @type {object}
     */
    _data: object;
    constructor(attributes?: object, data?: object) {
        const self = this;
        self.data = data;
        self.attributes = attributes;
    }
    
    /**
     * Attribute property to apply to the file load
     * @date 03/11/2022 - 05:47:25
     *
     * @type {object}
     */
    get attributes(): object { return this._attributes; }
    
    /**
     * Attribute property to apply to the file load
     */
    set attributes(value: object) { this._attributes = value; }
    
    /**
     * Addition data to apply to file load request
     * @date 03/11/2022 - 05:47:41
     *
     * @type {object}
     */
    get data(): object { return this._data; }
    
    /**
     * Addition data to apply to file load request
     */
    set data(value: object) { this._data = value; }
    
    /**
     * Addition data to apply to file load request
     * @date 03/11/2022 - 05:47:54
     *
     * @param {object} value
     * @returns {Mrbr_IO_FileOptions}
     */
    setData(value: object): Mrbr_IO_FileOptions { this.data = value; return this; }
    
    /**
     * Attribute property to apply to the file load
     * @date 03/11/2022 - 05:48:04
     *
     * @param {object} value
     * @returns {Mrbr_IO_FileOptions}
     */
    setAttributes(value: object): Mrbr_IO_FileOptions { this.attributes = value; return this; }
}