import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_IO_Fetch } from "./Fetch";
import { Mrbr_IO_File } from "./File";

export function Mrbr_IO_LoadScript(file: Mrbr_IO_File): Promise<any> {
    const self = this;
    let mrbrFetch = new Mrbr_IO_Fetch(),
        instance = MrbrBase.mrbrInstance,
        promise = instance._promise()
    mrbrFetch.fetch(file.entryName, {})
        .then(result => {
            result.text()
                .then((txt: any) => {
                    var returnResult = new Function("mrbr", "returnResult", "data", txt)(instance, true, file.data);
                    setTimeout(promise.resolve(returnResult), 0);
                })
        })
        .catch(err => promise.reject(err));
    return promise.promise;
}