import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_IO_File } from "./File";
import { Mrbr_IO_FilePromise } from "./FilePromise";

export function Mrbr_IO_LoadCssLink(file: Mrbr_IO_File): Mrbr_IO_FilePromise {
    let link = document.createElement('link'),
        instance = MrbrBase.mrbrInstance,
        loadResultPromise = Mrbr_IO_FilePromise.create("function:Mrbr_IO_LoadScript", file);
    link.rel = 'stylesheet';
    link.type = 'text/css';


    link.href = file.entry;

    if (file.attributes) {
        Object.keys(file.attributes)
            .forEach(attributeName => {
                link.setAttribute(attributeName, file.attributes[attributeName])
            })
    }
    if (!link.id) { link.id = Mrbr_IO_File.createId("link") }
    function scriptLoad_Handler() {
        link.removeEventListener("load", scriptLoad_Handler);
        link.removeEventListener("error", scriptError_Handler);
        setTimeout(() => { loadResultPromise.resolve(); }, 0);
    }
    function scriptError_Handler() {
        link.removeEventListener("load", scriptLoad_Handler);
        link.removeEventListener("error", scriptError_Handler);
        loadResultPromise.reject(file);
    }

    link.addEventListener("load", scriptLoad_Handler, { once: true })
    link.addEventListener("error", scriptError_Handler, { once: true })
    document.head.appendChild(link);
    return loadResultPromise;
}