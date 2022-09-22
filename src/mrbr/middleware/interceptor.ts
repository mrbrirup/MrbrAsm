import { Mrbr_Middleware_InterceptorFunction } from "./interceptorFunction";

export class Mrbr_Middleware_Interceptor extends EventTarget {
    private _preFunctions: Array<Mrbr_Middleware_InterceptorFunction>;
    private _postFunctions: Array<Mrbr_Middleware_InterceptorFunction>;
    constructor(...args) {
        super();
        this._preFunctions = Array<Mrbr_Middleware_InterceptorFunction>();
        this._postFunctions = Array<Mrbr_Middleware_InterceptorFunction>();
    }
    public get preFunctions(): Array<Mrbr_Middleware_InterceptorFunction> {
        return this._preFunctions;
    }
    public set preFunctions(value: Array<Mrbr_Middleware_InterceptorFunction>) {
        this._preFunctions = value;
    }
    public get postFunctions(): Array<Mrbr_Middleware_InterceptorFunction> {
        return this._postFunctions;
    }
    public set postFunctions(value: Array<Mrbr_Middleware_InterceptorFunction>) {
        this._postFunctions = value;
    }
    addPre(interceptor: Mrbr_Middleware_InterceptorFunction): Mrbr_Middleware_Interceptor {
        const self = this;
        self.preFunctions.push(interceptor);
        return self;
    }
    addPost(interceptor: Mrbr_Middleware_InterceptorFunction): Mrbr_Middleware_Interceptor {
        const self = this;
        self.postFunctions.push(interceptor);
        return self;
    }

    wrap(preInterceptor: Mrbr_Middleware_InterceptorFunction, postInterceptor: Mrbr_Middleware_InterceptorFunction): Mrbr_Middleware_Interceptor {
        const self = this;
        self.preFunctions.push(preInterceptor);
        self.postFunctions.push(postInterceptor);
        return self;
    }


    _intercept(interceptors: Array<Mrbr_Middleware_InterceptorFunction>, ...args: any[]): any {
        const self = this
        if (!interceptors) { return args; }
        const interceptorsLength = interceptors.length;
        for (let interceptorCounter = 0; interceptorCounter < interceptorsLength; interceptorCounter++) {
            const interceptor: Mrbr_Middleware_InterceptorFunction = interceptors[interceptorCounter]
            let result = interceptor.fn.apply(interceptor.context || self, args)
            result && args.push(result)
        }
    }
    intercept(fn: (args: any) => any, context: any, ...args: any) {
        const self = this;
        args = args || [];
        self._intercept(self.preFunctions);
        let result = fn.apply(context || self, args);
        self._intercept(self.postFunctions);
        result !== undefined && args.push(result);
        return args;
    }
}
