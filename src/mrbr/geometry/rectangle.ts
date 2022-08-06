export class Mrbr_Geometry_Rectangle {
    private _x1: number;
    private _y1: number;
    private _x2: number;
    private _y2: number;
    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    public get y1(): number {
        return this._y1;
    }
    public set y1(value: number) {
        this._y1 = value;
    }
    public get x1(): number {
        return this._x1;
    }
    public set x1(value: number) {
        this._x1 = value;
    }
    public get y2(): number {
        return this._y2;
    }
    public set y2(value: number) {
        this._y2 = value;
    }
    public get x2(): number {
        return this._x2;
    }
    public set x2(value: number) {
        this._x2 = value;
    }
}