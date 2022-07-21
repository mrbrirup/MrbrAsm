export class Mrbr_IO_Path {
    static pathSplitRegex: RegExp = /[\\\/]/g
    static currentFolder: string = ".";
    static extensionSeperator: string = ".";
    static parentFolder: string = "..";
    static doubleSlash: string = "##mrbr_double_slash##"
    static doubleSlashRegex: RegExp = /[\\]{2}|[\/]{2}/
    constructor() { }
    static join(parts: Array<string | Array<string>>, isFileName: boolean): string {
        const path = Mrbr_IO_Path;
        if (!parts) { return null }
        const entries: Array<string> = [];
        parts.forEach(part => {
            path.toParts(part, entries);
        })
        let pathParts: Array<string> = [];
        for (let entryCounter = 0, entryCount = entries.length; entryCounter < entryCount; entryCounter++) {
            const entry = entries[entryCounter]
            if (isFileName === true && entryCount - 1 === entryCounter && entries[entryCounter] === Mrbr_IO_Path.extensionSeperator) {
                pathParts.push(entry);
                continue;
            }
            if (entry === path.currentFolder) { continue; }
            if (entry === path.parentFolder) { pathParts.pop(); continue; }
            if (entry !== undefined && entries[entryCounter] !== null && entries[entryCounter] !== "") {
                if (entry === path.doubleSlash) {
                    pathParts.push("//");
                }
                else {
                    pathParts.push(entry);
                }
            }
        }
        let returnPath = pathParts.join("/")
        return returnPath;
    }
    static toParts(part: string | Array<string>, entries: Array<string>): Array<string> {
        const path = Mrbr_IO_Path;
        if (typeof part === "string") {

            let replacedPart = part.replace(path.doubleSlashRegex, `/${path.doubleSlash}/`);
            replacedPart.split(path.pathSplitRegex).forEach(entry => entries.push(entry))
        }
        if (Array.isArray(part)) {
            part.forEach(_part => path.toParts(_part, entries));
        }
        return entries;
    }
}