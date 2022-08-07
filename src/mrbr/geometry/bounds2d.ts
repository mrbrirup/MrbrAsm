export class Mrbr_Geometry_Bounds2d {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this._y = y;
        this.width = width;
        this.height = height;
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
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }
    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    setBounds(x: number, y: number, width: number, height: number) {
        this.x = x;
        this._y = y;
        this.width = width;
        this.height = height;
    }
    setXY(x: number, y: number) {
        this.x = x;
        this._y = y;
    }
    setWidthHeight(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}