import { Mrbr_System_IComponent } from "../system/IComponent";
import { Mrbr_System_IPromise } from "../system/IPromise";
import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_Promise } from "../system/Promise"
import { Mrbr_System_PromiseGC } from "../system/PromiseGC";
import { Mrbr_IO_File } from "./File";
import { Mrbr_IO_FileType } from "./FileType";


/**
 * A promise that resolves to a file.
 * @date 02/11/2022 - 21:47:03
 *
 * @export
 * @class Mrbr_IO_FilePromise
 * @typedef {Mrbr_IO_FilePromise}
 * @extends {Mrbr_System_Promise<Mrbr_IO_File>}
 */
export class Mrbr_IO_FilePromise extends Mrbr_System_Promise<Mrbr_IO_File> implements Mrbr_System_IComponent, Mrbr_System_IPromise<Mrbr_IO_File> {

    protected get $mifp(): typeof Mrbr_IO_FilePromise { return Mrbr_IO_FilePromise; }


    /**
     * Map of Unresolved and Uncollected Promises
     * @date 02/11/2022 - 21:50:23
     *
     * @public
     * @static
     * @type {Map<string, Mrbr_IO_FilePromise>}
     */
    public static promises: Map<string, Mrbr_IO_FilePromise> = new Map<string, Mrbr_IO_FilePromise>();




    /**
     * Garbage Collector for Manifest Promises
     * @date 02/11/2022 - 05:38:33
     *
     * @public
     * @readonly
     * @type {Mrbr_System_PromiseGC}
     */
    protected override get garbageCollector(): Mrbr_System_PromiseGC {
        let gcName = Symbol.for("Mrbr_IO_FilePromise:garbageCollector");
        !Mrbr_IO_FilePromise[gcName] && (Mrbr_IO_FilePromise[gcName] = new Mrbr_System_PromiseGC(Mrbr_IO_FilePromise as unknown as Mrbr_IO_FilePromise));
        return Mrbr_IO_FilePromise[gcName];
    }

    /**
     * The file that this promise resolves to.
     * @date 02/11/2022 - 21:47:12
     *
     * @private
     * @type {Mrbr_IO_File}
     */
    private _file: Mrbr_IO_File;

    /**
     * Alias Mrbr_IO_FilePromise for Class Type
     * @date 02/11/2022 - 21:47:20
     *
     * @readonly
     * @type {typeof Mrbr_IO_FilePromise}
     */
    get $mif(): typeof Mrbr_IO_FilePromise { return Mrbr_IO_FilePromise; }

    /**
     * Creates an instance of Mrbr_IO_FilePromise.
     * @date 02/11/2022 - 21:47:50
     *
     * @constructor
     * @param {Mrbr_IO_File} file Used for resolve
     */
    constructor(file: Mrbr_IO_File) {
        super();
        this.file = file;
    }

    /**
     * The File Promise reolves to
     * @date 02/11/2022 - 21:48:19
     *
     * @public
     * @type {Mrbr_IO_File}
     */
    public get file(): Mrbr_IO_File { return this._file; }

    /**
     * The File Promise reolves to
     */
    public set file(value: Mrbr_IO_File) { this._file = value; }

    /**
     * Wrapper around Promise resolve using file
     * @date 02/11/2022 - 21:48:44
     *
     * @public
     */
    public override resolve() {
        this.fulfilled = true;
        return super.executor.resolve(this.file);
    }

    /**
     * Creates a new File Promise
     * @date 02/11/2022 - 21:49:11
     *
     * @public
     * @static
     * @param {string} reference Used for Tracing Promises
     * @param {Mrbr_IO_File} file
     * @returns {Mrbr_IO_FilePromise}
     */
    public static create(reference: string, file: Mrbr_IO_File): Mrbr_IO_FilePromise {
        const mif = Mrbr_IO_FilePromise;
        let id: string;
        (file.fileType === Mrbr_IO_FileType.Component) && (_ => id = MrbrBase.Namespace.namespace(file.entry))();
        if (mif.promises.has(reference) === true) { file.loadingPromise = mif.promises.get(reference) }
        else if (mif.promises.has(id) === true) { file.loadingPromise = mif.promises.get(id); }
        else { file.loadingPromise = Array.from(mif.promises.values()).find((promise: Mrbr_IO_FilePromise) => promise.reference === reference); };
        if (file.loadingPromise) { return file.loadingPromise; }
        const mrbrFilePromise: Mrbr_IO_FilePromise = new mif(file);
        mrbrFilePromise.id = reference;
        mrbrFilePromise.promise = new Promise((resolve, reject) => {
            mrbrFilePromise.executor = {
                reject: (reason: any) => {
                    mrbrFilePromise.reason = reason;
                    mrbrFilePromise.rejected = true;
                    reject(reason);
                },
                resolve: _ => {
                    mrbrFilePromise.fulfilled = true;
                    setTimeout(_ => mrbrFilePromise.garbageCollector.markGarbage(), 0);
                    resolve(file);
                }
            }
        });
        mrbrFilePromise.reference = reference;
        file.loadingPromise = mrbrFilePromise;
        mif.promises.set(reference, mrbrFilePromise);
        return mrbrFilePromise;
    }
    /**
     * Create a Resolved File Promise
     * @date 02/11/2022 - 21:50:01
     *
     * @public
     * @static
     * @param {string} reference
     * @param {?Mrbr_IO_File} [file]
     * @returns {Mrbr_IO_FilePromise}
     */
    public static createResolved(reference: string, file?: Mrbr_IO_File): Mrbr_IO_FilePromise {
        const retVal = Mrbr_IO_FilePromise.create(reference, file);
        retVal.resolve();
        retVal.fulfilled = true;
        return retVal;
    }

}
