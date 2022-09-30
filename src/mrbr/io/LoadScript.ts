import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_IO_Fetch } from "./Fetch";
import { Mrbr_IO_File } from "./File";
import { Mrbr_IO_FilePromise } from "./FilePromise";

export function Mrbr_IO_LoadScript(file: Mrbr_IO_File): Mrbr_IO_FilePromise {
    const self = this;
    let mrbrFetch = new Mrbr_IO_Fetch(),
        instance = MrbrBase.mrbrInstance,
        promise = Mrbr_IO_FilePromise.create("function:Mrbr_IO_LoadScript", file)
    mrbrFetch.fetch(file.entry, {})
        .then(result => {
            result.text()
                .then((txt: any) => {
                    var returnResult = new Function("mrbr", "returnResult", "data", txt)(instance, true, file.data);
                    setTimeout(_ => promise.resolve(), 0);
                })
        })
        .catch(err => promise.reject(err));
    return promise;
}