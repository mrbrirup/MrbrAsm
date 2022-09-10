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

    public static CreateFilePromise(reference: string, file: Mrbr_IO_File): Mrbr_IO_FilePromise {
        //const id: string = `promise_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`;
        //const id: string = file.fileName;// || `file_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`
        let id: string;

        if (file.fileType === Mrbr_IO_FileType.Component) {
            //debugger
            id = MrbrBase.Namespace.namespace(file.entry);
        }
        else {
        }
        if(!id){
            id = file.fileName || file.entry || `file_${((new Date()).getTime())}_${Math.floor(Math.random() * 100)}`
            //debugger
        }
        console.log(id);
        if (Mrbr_IO_FilePromise.Promises.has(id) === true) {
            file.loadingPromise = Mrbr_IO_FilePromise.Promises.get(id);
            return file.loadingPromise;
        }
        let mrbrFilePromise: Mrbr_IO_FilePromise = new Mrbr_IO_FilePromise(file);
        mrbrFilePromise.promise = new Promise((resolve, reject) => {
            mrbrFilePromise.executor = {
                reject: (reason: any) => {
                    //Mrbr_IO_FilePromise.Promises.delete(id);
                    mrbrFilePromise.rejected = true;
                    reject(reason);
                },
                resolve: _ => {
                    console.log("file resolved: ", id)
                    //Mrbr_IO_FilePromise.Promises.delete(id);
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
    public static Promises: Map<string, Mrbr_IO_FilePromise> = new Map<string, Mrbr_IO_FilePromise>();
}