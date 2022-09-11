import { Mrbr_System_MrbrPromise } from "../system/MrbrPromise"
import { Mrbr_IO_File } from "./File";

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
    public resolve() {
        return this.executor.resolve(this.files);
    }

    public static CreateManifestPromise(reference: string, files: Mrbr_IO_File[]): Mrbr_IO_ManifestPromise {
        const id: string = `promise_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`;
        let mrbrManifestPromise: Mrbr_IO_ManifestPromise = new Mrbr_IO_ManifestPromise(files);
        mrbrManifestPromise.promise = new Promise((resolve, reject) => {
            mrbrManifestPromise.executor = {
                reject: (reason: any) => {
                    //Mrbr_IO_ManifestPromise.Promises.delete(id);
                    mrbrManifestPromise.rejected = true;
                    reject(reason);
                },
                resolve: _ => {
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
    public static Promises: Map<string, Mrbr_IO_ManifestPromise> = new Map<string, Mrbr_IO_ManifestPromise>();
}