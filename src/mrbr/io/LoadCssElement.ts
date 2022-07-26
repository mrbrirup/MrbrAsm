import { Mrbr_IO_Fetch } from "./Fetch";
import { Mrbr_IO_File } from "./File";

/**
 * Load Css Element Function
 * @date 03/11/2022 - 06:04:15
 *
 * @export
 * @param {Mrbr_IO_File} file
 * @returns {Promise<any>}
 */
export function Mrbr_IO_LoadCssElement(file: Mrbr_IO_File): Promise<any> {
    let resolveResult: Function,
        rejectResult: Function;
    const style = document.createElement('style'),
        loadResultPromise = new Promise((resolve, reject) => {
            resolveResult = resolve;
            rejectResult = reject;
        });
    let mrbrFetch = new Mrbr_IO_Fetch();
    file.fileName = file.entry.replace(/_/g, "/")

    if (file.attributes) {
        Object.keys(file.attributes)
            .forEach(attributeName => {
                style.setAttribute(attributeName, file.attributes[attributeName])
            })
    }
    if(!style.id) { style.id = Mrbr_IO_File.createId("style")}
    const
        insertedNodes: Array<string> = [],
        observer = new MutationObserver(mutations => {
            mutations.forEach(function (mutation: MutationRecord) {
                for (var mutationsCounter = 0, mutationsCount = (mutation?.addedNodes?.length || 0); mutationsCounter <= mutationsCount; mutationsCounter++)
                    if ((<HTMLElement>mutation.addedNodes[mutationsCounter])?.id) {
                        insertedNodes.push((<HTMLElement>mutation.addedNodes[mutationsCounter]).id);
                    }
            })
        }),
        interval = Math.floor(1000 / 60),
        checkMutations = () => {
            if (insertedNodes.indexOf(style.id) > -1) {
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
                    let styleText = document.createTextNode(txt);
                    style.appendChild(styleText);
                    document.head.appendChild(style);
                    checkMutations();
                })
        })
        .catch(err => rejectResult(err));
    return loadResultPromise;
}