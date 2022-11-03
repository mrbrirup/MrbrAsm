import { Mrbr_System_IPromise } from "../system/IPromise";
import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_Promise } from "../system/Promise"
import { Mrbr_System_PromiseGC } from "../system/PromiseGC";
import { Mrbr_IO_File } from "./File";


/**
 * A promise that resolves to a manifest object.
 * @date 02/11/2022 - 05:33:50
 *
 * @export
 * @class Mrbr_IO_ManifestPromise
 * @typedef {Mrbr_IO_ManifestPromise}
 * @extends {Mrbr_System_Promise<Mrbr_IO_File[]>}
 */
export class Mrbr_IO_ManifestPromise extends Mrbr_System_Promise<Mrbr_IO_File[]> {



    /**
     * Manifest Promises Collection
     * @date 02/11/2022 - 05:37:43
     *
     * @public
     * @static
     * @type {Map<string, Mrbr_IO_ManifestPromise>}
     */
    public static promises: Map<string, Mrbr_IO_ManifestPromise> = new Map<string, Mrbr_IO_ManifestPromise>();
    //#endregion Private Static Members

    //#region Private Properties

    /**
     * Alias for ManifestPromise class type
     * @date 02/11/2022 - 05:38:07
     *
     * @private
     * @readonly
     * @type {typeof Mrbr_IO_ManifestPromise}
     */
    private get $mimp(): typeof Mrbr_IO_ManifestPromise { return Mrbr_IO_ManifestPromise; }
    //#endregion Private Properties
    //#region Public Properties

    /**
     * Garbage Collector for Manifest Promises
     * @date 02/11/2022 - 05:38:33
     *
     * @public
     * @readonly
     * @type {Mrbr_System_PromiseGC}
     */
    protected override get garbageCollector(): Mrbr_System_PromiseGC {
        const gcName = Symbol.for("Mrbr_IO_ManifestPromise:garbageCollector");
        !Mrbr_IO_ManifestPromise[gcName] && (Mrbr_IO_ManifestPromise[gcName] = new Mrbr_System_PromiseGC(Mrbr_IO_ManifestPromise as unknown as Mrbr_IO_ManifestPromise));
        return Mrbr_IO_ManifestPromise[gcName];
    }

    /**
     * Manifest Promises Collection
     * @date 02/11/2022 - 05:38:52
     *
     * @public
     * @readonly
     * @type {Map<string, Mrbr_System_IPromise<Mrbr_IO_File[]>>}
     */
    public get promises(): Map<string, Mrbr_System_IPromise<Mrbr_IO_File[]>> {
        return this.$mimp.promises as unknown as Map<string, Mrbr_System_IPromise<Mrbr_IO_File[]>>
    }

    //#endregion Public Properties

    //#region Private Property Fields

    /**
     * Files in manifest to be loaded
     * @date 02/11/2022 - 05:39:12
     *
     * @private
     * @type {Mrbr_IO_File[]}
     */
    private _files: Mrbr_IO_File[];
    //#endregion Private Property Fields


    /**
     * Creates an instance of Mrbr_IO_ManifestPromise.
     * @date 02/11/2022 - 05:39:37
     *
     * @constructor
     * @param {Mrbr_IO_File[]} files
     */
    constructor(files: Mrbr_IO_File[]) {
        super();
        this.files = files;
    }
    //#region Public Properties

    /**
     * Files in manifest to be loaded
     * @date 02/11/2022 - 05:39:57
     *
     * @public
     * @type {Mrbr_IO_File[]}
     */
    public get files(): Mrbr_IO_File[] { return this._files; }

    /**
     * Files in manifest to be loaded
     */
    public set files(value: Mrbr_IO_File[]) { this._files = value; }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Resolve the manifest with this.files
     * @date 02/11/2022 - 05:40:13
     *
     * @public
     * @override
     */
    public override resolve() {
        this.fulfilled = true;
        return this.executor.resolve(this.files);
    }
    //#endregion Public Methods
    //#region Public Static Methods
    /**
     * Create a new ManifestPromise
     * @date 02/11/2022 - 05:41:27
     *
     * @public
     * @static
     * @param {string} reference
     * @param {Mrbr_IO_File[]} data
     * @returns {Mrbr_IO_ManifestPromise}
     */
    public static create(reference: string, data: Mrbr_IO_File[]): Mrbr_IO_ManifestPromise {
        const
            mimp = Mrbr_IO_ManifestPromise,
            id: string = `manifestPromise_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`;
        let mrbrManifestPromise: Mrbr_IO_ManifestPromise = new mimp(data);
        mrbrManifestPromise.promise = new Promise<Mrbr_IO_File[]>((resolve, reject) => {
            mrbrManifestPromise.executor = {
                reject: (reason: any) => {
                    mrbrManifestPromise.reason = reason;
                    mrbrManifestPromise.rejected = true;
                    reject(reason)
                },
                resolve: (value: Mrbr_IO_File[] | PromiseLike<Mrbr_IO_File[]>) => {
                    mrbrManifestPromise.fulfilled = true;
                    setTimeout(_ => mrbrManifestPromise.garbageCollector.markGarbage(), 0);
                    resolve(mrbrManifestPromise.files)
                }
            }
        })
        mrbrManifestPromise.id = id;
        mrbrManifestPromise.reference = reference;
        mimp.promises.set(id, mrbrManifestPromise);
        return mrbrManifestPromise;
    }

    /**
     * Create a resolved ManifestPromise
     * @date 02/11/2022 - 05:41:51
     *
     * @public
     * @static
     * @param {string} reference
     * @param {Mrbr_IO_File[]} files
     * @returns {Mrbr_IO_ManifestPromise}
     */
    public static createResolved(reference: string, files: Mrbr_IO_File[]): Mrbr_IO_ManifestPromise {
        const retval = Mrbr_IO_ManifestPromise.create(reference, files);
        retval.resolve();
        return retval;
    }
    //#endregion Public Static Methods
}