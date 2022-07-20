export class Mrbr_Assembly_MrbrConfig {
    host: object;
    _paths: {};
    constructor(host: object) {
        this.host = host;
    }
    get paths() { return this._paths }
    set paths(value) { this._paths = value; }
}