import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_IO_File } from "./File";
import { Mrbr_IO_FilePromise } from "./FilePromise";

export function Mrbr_IO_LoadScriptLink(file: Mrbr_IO_File): Mrbr_IO_FilePromise {
    let script = document.createElement('script'),
        instance = MrbrBase.mrbrInstance,
        loadResultPromise = Mrbr_IO_FilePromise.create("function:Mrbr_IO_LoadScript", file)
    script.setAttribute('src', file.entry);
    if (file.attributes) {
        Object.keys(file.attributes)
            .forEach(attributeName => {
                script.setAttribute(attributeName, file.attributes[attributeName])
            })
    }
    if (!script.id) { script.id = Mrbr_IO_File.createId("script") }
    function scriptLoad_Handler() {
        script.removeEventListener("load", scriptLoad_Handler);
        script.removeEventListener("error", scriptError_Handler);
        setTimeout(() => { loadResultPromise.resolve(); }, 0);
    }
    function scriptError_Handler() {
        script.removeEventListener("load", scriptLoad_Handler);
        script.removeEventListener("error", scriptError_Handler);
        loadResultPromise.reject(file);
    }

    script.addEventListener("load", scriptLoad_Handler, { once: true })
    script.addEventListener("error", scriptError_Handler, { once: true })
    document.head.appendChild(script);
    return loadResultPromise;
}