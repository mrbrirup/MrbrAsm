export class Mrbr_System_MrbrPromise<T> {
    protected static _garbageCollectionTimeout: number = 5000;
    private _promise: Promise<any>;
    private _id: string;
    private _reference: string;
    private _cancellable: boolean = true;
    private _rejected: boolean = false;
    private _fulfilled: boolean = false;
    private _executor: { resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }
    private static _garbageCollectorHandle: number = 0;
    private completedTime: number;
    private _collectable: boolean = true;
    /**
     *
     */

    constructor() {
    }
    public get executor(): { resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void } {
        return this._executor;
    }
    public set executor(value: { resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }) {
        this._executor = value;
    }
    public get promise(): Promise<any> {
        return this._promise;
    }
    public set promise(value: Promise<any>) {
        this._promise = value;
    }
    public reject(reason?: any) {
        return this.executor.reject(reason)
    }
    public resolve(value: any | PromiseLike<any>) {
        return this.executor.resolve(value);
    }
    // public set resolve(value: (value: T | PromiseLike<T>) => void) {
    //     this._resolve = value;
    // }

    public get pending(): boolean {
        return !(this.rejected || this.fulfilled)
    }
    public get rejected(): boolean {
        return this._rejected;
    }
    public set rejected(value: boolean) {
        this.completedTime = Date.now()
        this._rejected = value;
    }
    public get fulfilled(): boolean {
        return this._fulfilled;
    }
    public set fulfilled(value: boolean) {
        this.completedTime = Date.now()
        this._fulfilled = value;
    }


    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get reference(): string {
        return this._reference;
    }
    public set reference(value: string) {
        this._reference = value;
    }
    public get cancellable(): boolean {
        return this._cancellable;
    }
    public set cancellable(value: boolean) {
        this._cancellable = value;
    }
    public cancel(reason: string, data: object): boolean {
        if (this.cancellable) {
            this.executor.reject({ reason: reason, data: data })
            return true;
        }
        return false;
    }
    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        return this.promise.then(onfulfilled, onrejected);
    }
    public catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<any> {
        return this.promise.catch(onrejected)
    }
    public finally(onfinally?: (() => void) | undefined | null): Promise<T> {
        return this.promise.finally(onfinally);
    }
    private static SetGarbageCollector() {
        const self = Mrbr_System_MrbrPromise;
        if (self._garbageCollectorHandle > 0) {
            clearTimeout(self._garbageCollectorHandle);
            self._garbageCollectorHandle = setTimeout(() => {
                Mrbr_System_MrbrPromise.runGarbageCollector();
            }, self._garbageCollectionTimeout)
        }
    }
    static runGarbageCollector() {

    }
    public static createResolved(resolvedObject: any): Mrbr_System_MrbrPromise<any> {
        // let mrbrPromise = new Mrbr_System_MrbrPromise<object>();
        // mrbrPromise.promise.resolve(resolvedObject);
        // return mrbrPromise;


        const id: string = `promise_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`;
        let mrbrPromise: Mrbr_System_MrbrPromise<any> = new Mrbr_System_MrbrPromise<any>();
        mrbrPromise.promise = new Promise((resolve, reject) => {
            mrbrPromise.executor = {
                reject: (reason: any) => { },
                resolve: (value: any | PromiseLike<any>) => {
                    mrbrPromise.fulfilled = true;
                    resolve(value);
                }
            }
        });
        mrbrPromise.id = id;
        Mrbr_System_MrbrPromise.Promises.set(id, mrbrPromise);
        mrbrPromise.resolve(resolvedObject);
        return mrbrPromise;
    }
    public static create<T>(reference: string): Mrbr_System_MrbrPromise<T> {
        const id: string = `promise_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`;
        let mrbrPromise: Mrbr_System_MrbrPromise<T> = new Mrbr_System_MrbrPromise<T>();
        mrbrPromise.promise = new Promise((resolve, reject) => {
            mrbrPromise.executor = {
                reject: (reason: any) => {
                    //Mrbr_System_MrbrPromise.Promises.delete(id);
                    mrbrPromise.rejected = true;
                    reject(reason);
                },
                resolve: (value: T | PromiseLike<T>) => {
                    //Mrbr_System_MrbrPromise.Promises.delete(id);
                    mrbrPromise.fulfilled = true;
                    resolve(value);
                }
            }
        });
        mrbrPromise.id = id;
        mrbrPromise.reference = reference;
        Mrbr_System_MrbrPromise.Promises.set(id, mrbrPromise);
        return mrbrPromise;
    }
    public static Promises: Map<string, Mrbr_System_MrbrPromise<any>> = new Map<string, Mrbr_System_MrbrPromise<any>>();
}
