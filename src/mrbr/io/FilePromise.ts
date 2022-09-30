import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../system/MrbrPromise"
import { Mrbr_IO_File } from "./File";
import { Mrbr_IO_FileType } from "./FileType";

export class Mrbr_IO_FilePromise extends Mrbr_System_MrbrPromise<Mrbr_IO_File> {
    private _file: Mrbr_IO_File;

    /**
     *
     */
    constructor(file: Mrbr_IO_File) {
        super();
        this.file = file;
    }
    public get file(): Mrbr_IO_File {
        return this._file;
    }
    public set file(value: Mrbr_IO_File) {
        this._file = value;
    }
    public resolve() {
        return this.executor.resolve(this.file);
    }

    public static create(reference: string, file: Mrbr_IO_File): Mrbr_IO_FilePromise {
        let id: string;
        (file.fileType === Mrbr_IO_FileType.Component) && (_ => id = MrbrBase.Namespace.namespace(file.entry))();
        (!id) && (_ => id = file.fileName || file.entry || `file_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`)();
        if (Mrbr_IO_FilePromise.Promises.has(id) === true) {
            file.loadingPromise = Mrbr_IO_FilePromise.Promises.get(id);
            return file.loadingPromise;
        }
        const mrbrFilePromise: Mrbr_IO_FilePromise = new Mrbr_IO_FilePromise(file);
        mrbrFilePromise.promise = new Promise((resolve, reject) => {
            mrbrFilePromise.executor = {
                reject: (reason: any) => {
                    mrbrFilePromise.rejected = true;
                    reject(reason);
                },
                resolve: _ => {
                    mrbrFilePromise.fulfilled = true;
                    resolve(mrbrFilePromise.file);
                }
            }
        });
        mrbrFilePromise.id = id;
        mrbrFilePromise.reference = reference;
        file.loadingPromise = mrbrFilePromise;
        Mrbr_IO_FilePromise.Promises.set(id, mrbrFilePromise);
        return mrbrFilePromise;
    }
    public static createResolved(reference: string, file?: Mrbr_IO_File): Mrbr_IO_FilePromise {
        const retVal = Mrbr_IO_FilePromise.create(reference, file);
        retVal.resolve();
        return retVal;
    }
    public static Promises: Map<string, Mrbr_IO_FilePromise> = new Map<string, Mrbr_IO_FilePromise>();
}