export class Mrbr_IO_FileOptions {
    _attributes: object;
    _data: object;
    constructor(attributes?: object, data?: object) {
        const self = this;
        self.data = data;
        self.attributes = attributes;
    }
    get attributes(): object { return this._attributes; }
    set attributes(value: object) { this._attributes = value; }
    get data(): object { return this._data; }
    set data(value: object) { this._data = value; }
    setData(value: object): Mrbr_IO_FileOptions { this.data = value; return this; }
    setAttributes(value: object): Mrbr_IO_FileOptions { this.attributes = value; return this; }
}