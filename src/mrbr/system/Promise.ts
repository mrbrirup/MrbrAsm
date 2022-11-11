import { Mrbr_System_IComponent } from "./IComponent";
import { Mrbr_System_IPromise } from "./IPromise";
import { MrbrBase } from "./MrbrBase";
import { Mrbr_System_PromiseGC } from "./PromiseGC";

/**
 * A promise that can be resolved or rejected from outside.
 * @date 31/10/2022 - 21:38:01
 *
 * @export
 * @class Mrbr_System_MrbrPromise
 * @typedef {Mrbr_System_Promise}
 * @template T ResolvingType
 */
export class Mrbr_System_Promise<T> implements Mrbr_System_IComponent, Mrbr_System_IPromise<T> {
    //#region Static Fields


    /**
     * Garbage Collector for Promises
     * @date 02/11/2022 - 05:05:57
     *
     * @public
     * @static
     * @type {Mrbr_System_PromiseGC}
     */
    public static garbageCollector: Mrbr_System_PromiseGC;


    /**
     * Outstanding and uncollected Promises
     * @date 02/11/2022 - 05:06:24
     *
     * @public
     * @static
     * @type {Map<string, Mrbr_System_Promise<any>>}
     */
    public static promises: Map<string, Mrbr_System_Promise<any>> = new Map<string, Mrbr_System_Promise<any>>();
    //endregion Static Fields

    //#region Private Fields

    /**
     * Alias for class type
     * @date 02/11/2022 - 05:07:03
     *
     * @private
     * @readonly
     * @type {typeof Mrbr_System_Promise}
     */
    private get $msp(): typeof Mrbr_System_Promise { return Mrbr_System_Promise; }
    //#endregion Private Fields
    //#region Properties' Fields

    /**
     * Is Promise Cancellable Field
     * @date 01/11/2022 - 04:24:56
     *
     * @private
     * @type {boolean}
     */
    private _cancellable: boolean = true;

    /**
     * Completed Time Field
     * @date 01/11/2022 - 04:37:05
     *
     * @private
     * @type {number}
     */
    private _completedTime: number;

    /**
     * Fulfilled Value Field
     * @date 01/11/2022 - 04:37:20
     *
     * @private
     * @type {boolean}
     */
    private _fulfilled: boolean = false;

    /**
     * Id Field
     * @date 01/11/2022 - 04:37:35
     *
     * @private
     * @type {string}
     */
    private _id: string;

    /**
     * Wrapped Promise Field
     * @date 01/11/2022 - 04:37:49
     *
     * @private
     * @type {Promise<any>}
     */
    private _promise: Promise<any>;

    /**
     * Reference Field
     * @date 01/11/2022 - 04:38:00
     *
     * @private
     * @type {string}
     */
    private _reference: string;

    /**
     * Rejected Field
     * @date 01/11/2022 - 04:38:14
     *
     * @private
     * @type {boolean}
     */
    private _rejected: boolean = false;

    /**
     * Rejection Field
     * @date 01/11/2022 - 04:38:23
     *
     * @private
     * @type {*}
     */
    private _reason: any;

    /**
     * User custom data Field
     * @date 01/11/2022 - 04:38:43
     *
     * @private
     * @type {*}
     */
    private _data: any;
    //#endregion Properties' Fields

    /**
     * Creates an instance of Mrbr_System_Promise.
     * @date 02/11/2022 - 05:07:31
     *
     * @constructor
     */
    constructor() { }

    /**
     * Initialises the Promise, set properties and loads manifest
     * @date 05/11/2022 - 09:39:57
     *
     * @public
     * @param {?string} [componentName]
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(componentName?: string, ...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const
            self = this,
            manifest = self.loadManifest(self.$msp);
        const initalisePromise = self.$msp.create<Mrbr_System_Promise<any>>("Mrbr_System_Promise.initialise", this);
        manifest
            .then(_ => initalisePromise.resolve(this))
            .catch(reason => initalisePromise.reject(reason));
        return initalisePromise;
    }

    /**
     * Create and cache component loadManifest promise
     * @date 05/11/2022 - 09:40:26
     *
     * @public
     * @param {*} type
     * @returns {Mrbr_System_Promise<any>}
     */
    public loadManifest(type: any): Mrbr_System_Promise<any> {
        let componentManifest = Symbol.for(`${type[MrbrBase.MRBR_COMPONENT_NAME]}:componentManifest`);
        !type[componentManifest] && (type[componentManifest] = MrbrBase.mrbrInstance.loadManifest(type[MrbrBase.MRBR_COMPONENT_MANIFEST]));
        return type[componentManifest];
    }
    //#region Properties    

    /**
     * Initialises the Garbage Collector 
     * @date 03/11/2022 - 02:34:53
     *
     * @protected
     * @readonly
     * @type {Mrbr_System_PromiseGC}
     */
    protected get garbageCollector(): Mrbr_System_PromiseGC {
        const gcName = Symbol.for("Mrbr_System_Promise:garbageCollector");
        !Mrbr_System_Promise[gcName] && (Mrbr_System_Promise[gcName] = new Mrbr_System_PromiseGC(Mrbr_System_Promise as unknown as Mrbr_System_Promise<any>));
        return Mrbr_System_Promise[gcName];
    }




    //private _promises: Map<string, Mrbr_System_Promise<any>>
    public get promises(): Map<string, Mrbr_System_IPromise<T>> {
        return Mrbr_System_Promise.promises as unknown as Map<string, Mrbr_System_IPromise<T>>;
    }
    /**
     * Executor wrapper for Promise
     * @date 01/11/2022 - 04:39:12
     *
     * @protected
     * @type {({ resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void })}
     */
    protected _executor: { resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }

    /**
     * Time Promise was completed, Resolved or Rejected
     * @date 01/11/2022 - 04:26:26
     *
     * @public
     * @type {number}
     */
    public get completedTime(): number { return this._completedTime; }

    /**
     * Time Promise was completed, Resolved or Rejected
     */
    public set completedTime(value: number) { this._completedTime = value; }

    /**
     * Additional User Supplied Data
     * @date 01/11/2022 - 04:27:12
     *
     * @public
     * @type {*}
     */
    public get data(): any { return this._data; }

    /**
     * Additional User Suplpied Data
     */
    public set data(value: any) { this._data = value; }

    /**
     * Exposes Promise Executor
     * @date 01/11/2022 - 04:27:29
     *
     * @public
     * @type {({ resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void })}
     */
    public get executor(): { resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void } { return this._executor; }

    /**
     * Exposes Promise Executor
     */
    public set executor(value: { resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }) { this._executor = value; }

    /**
     * Internal Promise wrapped by this type
     * @date 01/11/2022 - 04:28:15
     *
     * @public
     * @type {Promise<any>}
     */
    public get promise(): Promise<any> { return this._promise; }

    /**
     * Internal Promise wrapped by this type
     */
    public set promise(value: Promise<any>) { this._promise = value; }

    /**
     * Value from Rejection
     * @date 01/11/2022 - 04:28:40
     *
     * @public
     * @type {*}
     */
    public get reason(): any { return this._reason; }

    /**
     * Value from Rejection
     */
    public set reason(value: any) { this._reason = value; }

    /**
     * Returns is Promise is not complete
     * @date 01/11/2022 - 04:29:01
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get pending(): boolean {
        return !(this.rejected || this.fulfilled)
    }

    /**
     * Has Promise been rejected
     * @date 01/11/2022 - 04:29:43
     *
     * @public
     * @type {boolean}
     */
    public get rejected(): boolean { return this._rejected; }

    /**
     * Has Promise been rejected
     */
    public set rejected(value: boolean) {
        this._completedTime = Date.now();
        this._rejected = value;
    }
    /**
     * Has Promise been resolevd successfully
     * @date 01/11/2022 - 04:30:07
     *
     * @public
     * @type {boolean}
     */
    public get fulfilled(): boolean { return this._fulfilled; }

    /**
     * Has Promise been resolevd successfully
     */
    public set fulfilled(value: boolean) {
        this._completedTime = Date.now()
        this._fulfilled = value;
    }
    /**
     * Unique ID of Promise
     * @date 01/11/2022 - 04:30:51
     *
     * @public
     * @type {string}
     */
    public get id(): string { return this._id; }

    /**
     * Unique ID of Promise
     */
    public set id(value: string) { this._id = value; }

    /**
     * Reference supplied by user, used to tracing promise source
     * @date 01/11/2022 - 04:31:08
     *
     * @public
     * @type {string}
     */
    public get reference(): string { return this._reference; }

    /**
     * Reference supplied by user, used to tracing promise source
     */
    public set reference(value: string) { this._reference = value; }

    /**
     * Can promise be cancelled
     * @date 01/11/2022 - 04:31:56
     *
     * @public
     * @type {boolean}
     */
    public get cancellable(): boolean { return this._cancellable; }

    /**
     * Can promise be cancelled
     */
    public set cancellable(value: boolean) { this._cancellable = value; }

    /**
     * Reject the Promise
     * @date 01/11/2022 - 04:32:13
     *
     * @public
     * @param {?*} [reason]
     */
    public reject(reason?: any) {
        this.rejected = true;
        this.reason = reason;
        return this.executor.reject(this)
    }
    /**
     * Resolve the Promise
     * @date 01/11/2022 - 04:32:24
     *
     * @public
     * @param {(T | PromiseLike<T>)} value
     */
    public resolve(value: T | PromiseLike<T>) {
        this.fulfilled = true;
        return this.executor.resolve(value);
    }
    /**
     * Cancel the Promise
     * @date 01/11/2022 - 04:32:43
     *
     * @public
     * @param {string} reason
     * @param {object} data
     * @returns {boolean}
     */
    public cancel(reason: string, data: object): boolean {
        if (!this.cancellable) { return false; }
        this.executor.reject({ reason: reason, data: data })
        return true;
    }

    /**
     * Exposes the then method of the wrapped Promise
     * @date 01/11/2022 - 04:32:59
     *
     * @public
     * @template TResult1 = T
     * @template TResult2 = never
     * @param {?(((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null)} [onfulfilled]
     * @param {?(((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null)} [onrejected]
     * @returns {(Promise<TResult1 | TResult2>)}
     */
    public then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
        return this.promise.then(onfulfilled, onrejected);
    }

    /**
     * Exposes the catch method of the wrapped Promise
     * @date 01/11/2022 - 04:33:28
     *
     * @public
     * @template TResult = never
     * @param {?((reason: any) => TResult | PromiseLike<TResult>)} [onrejected]
     * @returns {Promise<any>}
     */
    public catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<any> {
        return this.promise.catch(onrejected)
    }

    /**
     * Exposes the finally method of the wrapped Promise
     * @date 01/11/2022 - 04:33:36
     *
     * @public
     * @param {?((() => void) | undefined | null)} [onfinally]
     * @returns {Promise<T>}
     */
    public finally(onfinally?: (() => void) | undefined | null): Promise<T> {
        return this.promise.finally(onfinally);
    }
    //#endregion Public Properties
    //#region Private Static Methods

    /**
     * Created a Resolved Promise
     * @date 01/11/2022 - 04:35:37
     *
     * @public
     * @static
     * @param {string} reference
     * @param {?*} [resolvedObject]
     * @returns {Mrbr_System_Promise<any>}
     */
    public static createResolved(reference: string, resolvedObject?: any): Mrbr_System_Promise<any> {
        const retval = Mrbr_System_Promise.create(reference, resolvedObject);
        retval.resolve(resolvedObject);
        return retval;
    }

    /**
     * Create a new unfulfilled Promise and add to Promises collection
     * @date 01/11/2022 - 04:35:56
     *
     * @public
     * @static
     * @template T
     * @param {string} reference
     * @param {?*} [data]
     * @returns {Mrbr_System_Promise<any>}
     */
    public static create<T>(reference: string, data?: any): Mrbr_System_Promise<any> {
        const id: string = `promise_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`,
            cls = Mrbr_System_Promise;
        let mrbrPromise = new Mrbr_System_Promise<T>();
        mrbrPromise.data = data;
        mrbrPromise.promise = new Promise<T>((resolve, reject) => {
            mrbrPromise.executor = {
                reject: (reason: any) => {
                    mrbrPromise.rejected = true;
                    mrbrPromise.reason = reason;
                    reject(reason)
                },
                resolve: (value: T | PromiseLike<T>) => {
                    mrbrPromise.fulfilled = true;
                    setTimeout(_ => mrbrPromise.garbageCollector.markGarbage(), 0);
                    resolve(value)
                }
            }
        });
        mrbrPromise.id = id;
        mrbrPromise.reference = reference;
        Mrbr_System_Promise.promises.set(id, mrbrPromise);
        return mrbrPromise;
    }
    //#endregion Private Static Methods
}
