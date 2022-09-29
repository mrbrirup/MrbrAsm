import { Mrbr_System_MrbrPromise } from "../system/MrbrPromise"
import { Mrbr_IO_File } from "./File";
type z1 = { resolve: (value: Mrbr_IO_File[] | PromiseLike<Mrbr_IO_File[]>) => void, reject: (reason?: any) => void };
type res1 = (value: Mrbr_IO_File[] | PromiseLike<Mrbr_IO_File[]>) => void;
export class Mrbr_IO_ManifestPromise extends Mrbr_System_MrbrPromise<Mrbr_IO_File[]> {
    private _files: Mrbr_IO_File[];

    /**
     *
     */
    constructor(files: Mrbr_IO_File[]) {
        super();
        this.files = files;
    }
    public get files(): Mrbr_IO_File[] {
        return this._files;
    }
    public set files(value: Mrbr_IO_File[]) {
        this._files = value;
    }
    //private override _executor: { resolve: (value: Mrbr_IO_File[] | PromiseLike<Mrbr_IO_File[]) => void, reject: (reason?: any) => void }

    // public get executor(): { resolve: (value: Mrbr_IO_File[]) => void, reject: (reason?: any) => void } {
    //     return this._executor;
    // }
    // public set executor(value: { resolve: (value: Mrbr_IO_File[]) => void, reject: (reason?: any) => void }) {
    //     this._executor = value;
    // }

    public override resolve() {
        return this.executor.resolve(this.files);
    }

    public static create(reference: string, data: Mrbr_IO_File[]): Mrbr_IO_ManifestPromise {
        const id: string = `promise_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`;
        let mrbrManifestPromise: Mrbr_IO_ManifestPromise = new Mrbr_IO_ManifestPromise(data);
        mrbrManifestPromise.promise = new Promise<Mrbr_IO_File[]>((resolve, reject) => {
            mrbrManifestPromise.executor = {
                reject: (reason: any) => {
                    //Mrbr_IO_ManifestPromise.Promises.delete(id);
                    mrbrManifestPromise.rejected = true;
                    reject(reason);
                },
                resolve: (value: Mrbr_IO_File[] | PromiseLike<Mrbr_IO_File[]>) => {
                    //Mrbr_IO_ManifestPromise.Promises.delete(id);
                    mrbrManifestPromise.fulfilled = true;
                    resolve(mrbrManifestPromise.files);
                }
            }
        })
        mrbrManifestPromise.id = id;
        mrbrManifestPromise.reference = reference;
        Mrbr_IO_ManifestPromise.Promises.set(id, mrbrManifestPromise);
        return mrbrManifestPromise;
    }
    public static createResolved(reference: string, files: Mrbr_IO_File[]): Mrbr_IO_ManifestPromise {
        const retval = Mrbr_IO_ManifestPromise.create(reference, files);
        retval.resolve();
        return retval;
    }
    public static Promises: Map<string, Mrbr_IO_ManifestPromise> = new Map<string, Mrbr_IO_ManifestPromise>();
}