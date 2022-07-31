import { Mrbr_IO_File } from "./File";

export function Mrbr_IO_LoadCssLink(file: Mrbr_IO_File): Promise<any> {
    let resolveResult: Function,
        rejectResult: Function;
    let link = document.createElement('link'),
        loadResultPromise = new Promise((resolve, reject) => {
            resolveResult = resolve;
            rejectResult = reject;
        });
    link.rel = 'stylesheet';
    link.type = 'text/css';


    link.href = file.entryName;

    if (file.attributes) {
        Object.keys(file.attributes)
            .forEach(attributeName => {
                link.setAttribute(attributeName, file.attributes[attributeName])
            })
    }
    if(!link.id) { link.id = Mrbr_IO_File.createId("link")}
    function scriptLoad_Handler() {
        link.removeEventListener("load", scriptLoad_Handler);
        link.removeEventListener("error", scriptError_Handler);
        setTimeout(() => { resolveResult(file); }, 0);
    }
    function scriptError_Handler() {
        link.removeEventListener("load", scriptLoad_Handler);
        link.removeEventListener("error", scriptError_Handler);
        rejectResult(file);
    }

    link.addEventListener("load", scriptLoad_Handler, { once: true })
    link.addEventListener("error", scriptError_Handler, { once: true })
    document.head.appendChild(link);
    return loadResultPromise;
}