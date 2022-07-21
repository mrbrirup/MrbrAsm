import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_IO_Fetch } from "./Fetch";
import { Mrbr_IO_File } from "./File";

export function Mrbr_IO_LoadScript(file: Mrbr_IO_File): Promise<any> {
    const self = this;
    let mrbrFetch = new Mrbr_IO_Fetch();
    let fileReject: Function, fileResolve: Function,
        filePromise = new Promise((resolve, reject) => { fileReject = reject, fileResolve = resolve });
        console.log(file)
    mrbrFetch.fetch(file.entryName, {})
        .then(result => {
            result.text()
                .then((txt: any) => {
                    var returnResult = new Function("mrbr", "returnResult", "data", txt)(MrbrBase.mrbrInstance, true, file.data);
                    setTimeout(fileResolve(returnResult), 0);
                })
        })
        .catch(err => fileReject(err));
    return filePromise;
}