import { Mrbr_System_IPromise } from "./IPromise";

export class Mrbr_System_PromiseGC {


    /**
     * Collection Target Type containing Promises
     * @date 02/11/2022 - 06:14:48
     *
     * @private
     * @type {Mrbr_System_IPromise<any>}
     */
    private collectionTarget: Mrbr_System_IPromise<any>;


    /**
     * Creates an instance of Mrbr_System_PromiseGC.
     * @date 02/11/2022 - 06:15:50
     *
     * @constructor
     * @param {Mrbr_System_IPromise<any>} collectionTarget
     */
    constructor(collectionTarget: Mrbr_System_IPromise<any>) {
        this.collectionTarget = collectionTarget;
    }


    /**
     * Fillfilled Promises to be Garbage collected
     * @date 01/11/2022 - 04:33:48
     *
     * @private
     * @static
     * @type {Array<string>}
     */
    private promisesGarbage: Array<string> = [];

    /**
     * Are Promises being GrbageCollected
     * @date 01/11/2022 - 04:34:13
     *
     * @private
     * @static
     * @type {boolean}
     */
    private GCisRunning: boolean = false;
    /**
     * Static Collection of Promises
     * @date 01/11/2022 - 04:24:29
     *
     * @public
     * @static
     * @type {Map<string, Mrbr_System_Promise<any>>}
     */
    /**
     * Iterator over the Garbage Collection
     * @date 01/11/2022 - 04:34:42
     *
     * @param {*} garbage
     * @returns {{}}
     */
    public garbageIterator = function* (garbage) { yield* garbage; };

    /**
     * Add a Promise to the Garbage Collection
     * @date 01/11/2022 - 04:35:05
     *
     * @private
     * @static
     */
    public markGarbage() {
        if (this.GCisRunning === true) { return; }
        this.GCisRunning = true;
        this.collectionTarget.promises
            .forEach((value: Mrbr_System_IPromise<any>, key: string) => (value.fulfilled) && (this.promisesGarbage.push(key)));

        if (this.promisesGarbage.length === 0) {
            this.GCisRunning = false;
            return;
        }
        this.runGarbageCollector();
    }
    /**
     * Run the Garbage Collector
     * @date 01/11/2022 - 04:35:26
     *
     * @private
     * @static
     */
    public runGarbageCollector() {
        const getGarbage = this.garbageIterator(this.promisesGarbage);
        let nextKey;
        while (!(nextKey = getGarbage.next()).done) { this.collectionTarget.promises.delete(nextKey.value); }
        this.promisesGarbage = [];
        this.GCisRunning = false;
        this.markGarbage();
    }
}