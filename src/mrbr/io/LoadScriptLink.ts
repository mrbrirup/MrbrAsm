import { Mrbr_IO_File } from "./File";

export function Mrbr_IO_LoadScriptLink(file: Mrbr_IO_File): Promise<any> {
    let resolveResult: Function,
        rejectResult: Function;
    let script = document.createElement('script'),
        loadResultPromise = new Promise((resolve, reject) => {
            resolveResult = resolve;
            rejectResult = reject;
        });
    script.setAttribute('src', file.entryName);
    if (file.attributes) {
        Object.keys(file.attributes)
            .forEach(attributeName => {
                script.setAttribute(attributeName, file.attributes[attributeName])
            })
    }
    if(!script.id) { script.id = Mrbr_IO_File.createId("script")}
    function scriptLoad_Handler() {
        script.removeEventListener("load", scriptLoad_Handler);
        script.removeEventListener("error", scriptError_Handler);
        setTimeout(() => { resolveResult(file); }, 0);
    }
    function scriptError_Handler() {
        script.removeEventListener("load", scriptLoad_Handler);
        script.removeEventListener("error", scriptError_Handler);
        rejectResult(file);
    }

    script.addEventListener("load", scriptLoad_Handler, {once: true})
    script.addEventListener("error", scriptError_Handler, {once: true})
    document.head.appendChild(script);
    return loadResultPromise;
}