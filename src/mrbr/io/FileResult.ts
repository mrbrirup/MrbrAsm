import { Mrbr_IO_File } from "./File";//optional

export class Mrbr_IO_FileResult {
    _file: Mrbr_IO_File
    _result: any;
    constructor(file: Mrbr_IO_File, result: any | null | undefined) {
        this.file = file;
        this.result = result;
    }
    get file(): Mrbr_IO_File { return this._file }
    set file(value: Mrbr_IO_File) { this._file = value; }
    get result(): any { return this._result; }
    set result(value: any) { this._result = value; }
}