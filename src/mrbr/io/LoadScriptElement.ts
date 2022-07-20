import { Mrbr_IO_File } from "./File";

export function Mrbr_IO_LoadScriptElement(file: Mrbr_IO_File): Promise<any> {
    let resolveResult: Function,
        rejectResult: Function;
    let script = document.createElement('script'),
        loadResultPromise = new Promise((resolve, reject) => {
            resolveResult = resolve;
            rejectResult = reject;
        });
    script.id = file.id;
    script.setAttribute('src', file.entryName);
    if (file.isAsync) { script.setAttribute('async', ''); }
    if (file.isModule) { script.setAttribute('type', 'module'); }
    function scriptLoad_Handler() {
        console.log("scriptLoaded")
        script.removeEventListener("load", scriptLoad_Handler);
        script.removeEventListener("error", scriptError_Handler);
        setTimeout(() => { resolveResult(file); }, 0);
    }
    function scriptError_Handler() {
        script.removeEventListener("load", scriptLoad_Handler);
        script.removeEventListener("error", scriptError_Handler);
        rejectResult(file);
    }
    script.addEventListener("load", _ => scriptLoad_Handler)
    script.addEventListener("error", _ => scriptError_Handler)
    document.head.appendChild(script);
    return loadResultPromise;
}