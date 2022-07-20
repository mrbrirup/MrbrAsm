export class Mrbr_IO_Path {
    static pathSplitRegex: RegExp = /[\\\/]/g
    static currentFolder: string = ".";
    static extensionSeperator: string = ".";
    static parentFolder: string = "..";
    static doubleSlash: string = "##mrbr_double_slash##"
    static doubleSlashRegex: RegExp = /[\\]{2}|[\/]{2}/
    constructor() { }
    static join(parts: Array<string | Array<string>>, isFileName: boolean): string {
        if (!parts) { return null }
        const entries: Array<string> = [];
        parts.forEach(part => {
            Mrbr_IO_Path.toParts(part, entries);
        })
        let pathParts: Array<string> = [];
        for (let entryCounter = 0, entryCount = entries.length; entryCounter < entryCount; entryCounter++) {
            if (isFileName === true && entryCount - 1 === entryCounter && entries[entryCounter] === Mrbr_IO_Path.extensionSeperator) {
                pathParts.push(entries[entryCounter]);
                continue;
            }
            if (entries[entryCounter] === Mrbr_IO_Path.currentFolder) { continue; }
            if (entries[entryCounter] === Mrbr_IO_Path.parentFolder) { pathParts.pop(); continue; }
            if (entries[entryCounter] !== undefined && entries[entryCounter] !== null && entries[entryCounter] !== "") {
                if (entries[entryCounter] === Mrbr_IO_Path.doubleSlash) {
                    pathParts.push("//");
                }
                else {
                    pathParts.push(entries[entryCounter]);
                }
            }
        }
        let returnPath = pathParts.join("/")
        return returnPath;
    }
    static toParts(part: string | Array<string>, entries: Array<string>): Array<string> {
        if (typeof part === "string") {

            let replacedPart = part.replace(Mrbr_IO_Path.doubleSlashRegex, `/${Mrbr_IO_Path.doubleSlash}/`);
            replacedPart.split(Mrbr_IO_Path.pathSplitRegex).forEach(entry => entries.push(entry))
        }
        if (Array.isArray(part)) {
            part.forEach(_part => Mrbr_IO_Path.toParts(_part, entries));
        }
        return entries;
    }
}