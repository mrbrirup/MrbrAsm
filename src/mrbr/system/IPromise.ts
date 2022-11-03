import { Mrbr_System_Promise } from "./Promise";

/**
 * Interface for a promise. 
 * @date 02/11/2022 - 06:09:07
 *
 * @export
 * @interface Mrbr_System_IPromise
 * @typedef {Mrbr_System_IPromise}
 * @template T Generic Return Type for Promise
 */
export interface Mrbr_System_IPromise<T> {
    
    /**
     * Oustanding an Uncollected Promises Collection
     * @date 02/11/2022 - 06:09:53
     *
     * @type {Map<string, Mrbr_System_IPromise<T>>}
     */
    promises: Map<string, Mrbr_System_IPromise<T>>;
    
    /**
     * Wrapper around Promise resolve and reject
     * @date 02/11/2022 - 06:10:21
     *
     * @type {({ resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void })}
     */
    executor: { resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void }
    
    /**
     * Promise resolved or rejected time
     * @date 02/11/2022 - 06:10:48
     *
     * @type {number}
     */
    completedTime: number;
    
    /**
     * Additional User supplied data
     * @date 02/11/2022 - 06:11:02
     *
     * @type {*}
     */
    data: any;
    
    /**
     * Wrapped Promise
     * @date 02/11/2022 - 06:11:22
     *
     * @type {Promise<any>}
     */
    promise: Promise<any>;
    
    /**
     * Rejected Reason
     * @date 02/11/2022 - 06:11:34
     *
     * @type {*} Any value can be provided, usually the Error object
     */
    reason: any;
    
    /**
     * Promise is outstanding
     * @date 02/11/2022 - 06:11:48
     *
     * @type {boolean}
     */
    pending: boolean;
    
    /**
     * Promise is rejected
     * @date 02/11/2022 - 06:12:31
     *
     * @type {boolean}
     */
    rejected: boolean;
    
    /**
     * Promise is resolved
     * @date 02/11/2022 - 06:12:43
     *
     * @type {boolean}
     */
    fulfilled: boolean;
    
    /**
     * Unqiue ID for the Promise
     * @date 02/11/2022 - 06:12:50
     *
     * @type {string}
     */
    id: string;
    
    /**
     * Promise reference for tracing
     * @date 02/11/2022 - 06:13:03
     *
     * @type {string}
     */
    reference: string;
    
    /**
     * Promise can be cancelled
     * @date 02/11/2022 - 06:13:17
     *
     * @type {boolean}
     */
    cancellable: boolean;
    
    /**
     * Reject method wrapping the Promise reject
     * @date 02/11/2022 - 06:13:37
     *
     * @type {(reason?: any) => void}
     */
    reject: (reason?: any) => void;
    
    /**
     * Resolve method wrapping the Promise resolve
     * @date 02/11/2022 - 06:14:05
     *
     * @type {((value: T | PromiseLike<T>) => void)}
     */
    resolve: (value: T | PromiseLike<T>) => void;
    
    /**
     * Cancel the Promise
     * @date 02/11/2022 - 06:14:14
     *
     * @type {(reason: string, data: object) => boolean}
     */
    cancel: (reason: string, data: object) => boolean;
}