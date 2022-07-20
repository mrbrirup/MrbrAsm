import { Mrbr_IO_FileType } from "./FileType";
export declare class Mrbr_IO_File {
    fileType: Mrbr_IO_FileType;
    fileName: string;
    id: string;
    isAsync: boolean;
    isModule: boolean;
    constructor(fileType: Mrbr_IO_FileType, fileName: string, id: string | null, isAsync: boolean, isModule: boolean);
    newId(): string;
}
