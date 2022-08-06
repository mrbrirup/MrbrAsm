export class Mrbr_Geometry_Point2d {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }
    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }
}