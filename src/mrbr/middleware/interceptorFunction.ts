export class Mrbr_Middleware_InterceptorFunction {
    private _fn: (args: any) => any;
    private _context: any;
    constructor(fn: (args: any) => any, context: any) {
        this.fn = fn;
        this.context = context;
    }
    public get fn(): (args: any) => any {
        return this._fn;
    }
    public set fn(value: (args: any) => any) {
        this._fn = value;
    }
    public get context(): any {
        return this._context;
    }
    public set context(value: any) {
        this._context = value;
    }
}