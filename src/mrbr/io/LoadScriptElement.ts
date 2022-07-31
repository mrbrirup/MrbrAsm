import { Mrbr_IO_Fetch } from "./Fetch";
import { Mrbr_IO_File } from "./File";

export function Mrbr_IO_LoadScriptElement(file: Mrbr_IO_File): Promise<any> {
    let resolveResult: Function,
        rejectResult: Function;
    const script = document.createElement('script'),
        loadResultPromise = new Promise((resolve, reject) => {
            resolveResult = resolve;
            rejectResult = reject;
        });
    let mrbrFetch = new Mrbr_IO_Fetch();
    file.fileName = file.entryName.replace(/_/g, "/")
    if(!script.id) { script.id = Mrbr_IO_File.createId("script")}

    if (file.attributes) {
        Object.keys(file.attributes)
            .forEach(attributeName => {
                script.setAttribute(attributeName, file.attributes[attributeName])
            })
    }
    const
        insertedNodes: Array<string> = [],
        observer = new MutationObserver(mutations => {
            mutations.forEach(function (mutation: MutationRecord) {
                for (var mutationsCounter = 0, mutationsCount = (mutation?.addedNodes?.length || 0); mutationsCounter <= mutationsCount; mutationsCounter++)
                if((<HTMLElement>mutation.addedNodes[mutationsCounter])?.id){
                    insertedNodes.push((<HTMLElement>mutation.addedNodes[mutationsCounter]).id);

                }
            })
        }),
        interval = Math.floor(1000 / 60),
        checkMutations = () => {
            if (insertedNodes.indexOf(script.id) > -1) {
                observer.disconnect();
                resolveResult(file);
            }
            else {
                setTimeout(checkMutations, interval)
            }
        }
    observer.observe(document.head, { childList: true });
    mrbrFetch.fetch(file.fileName, {})
        .then(result => {
            result.text()
                .then((txt: any) => {
                    var inlineScript = document.createTextNode(txt);
                    script.appendChild(inlineScript);
                    document.head.appendChild(script);
                    checkMutations();
                })
        })
        .catch(err => rejectResult(err));
    return loadResultPromise;
}