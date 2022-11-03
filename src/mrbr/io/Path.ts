/**
 * @class Path
 * @description A class to handle path manipulation
 * @date 03/11/2022 - 05:48:59
 *
 * @export
 * @class Mrbr_IO_Path
 * @typedef {Mrbr_IO_Path}
 */
export class Mrbr_IO_Path {

    /**
     * Regex to split a path
     * @date 03/11/2022 - 05:49:47
     *
     * @private
     * @static
     * @readonly
     * @type {RegExp}
     */
    private static readonly pathSplitRegex: RegExp = /[\\\/]/g

    /**
     * Relative Path Current folder
     * @date 03/11/2022 - 05:50:00
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly currentFolder: string = ".";

    /**
     * File extension seperator
     * @date 03/11/2022 - 05:50:11
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly extensionSeperator: string = ".";

    /**
     * Relative path Parent folder
     * @date 03/11/2022 - 05:50:24
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly parentFolder: string = "..";

    /**
     * Double slash filler for path whilst splitting
     * @date 03/11/2022 - 05:50:45
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly doubleSlash: string = "##mrbr_double_slash##"

    /**
     * Regex to find double slashes
     * @date 03/11/2022 - 05:51:07
     *
     * @private
     * @static
     * @readonly
     * @type {RegExp}
     */
    private static readonly doubleSlashRegex: RegExp = /[\\]{2}|[\/]{2}/

    /**
     * Creates an instance of Mrbr_IO_Path.
     * @date 03/11/2022 - 05:51:24
     *
     * @constructor
     */
    constructor() { }

    /**
     * Join parts to make a path    
     * @date 03/11/2022 - 05:51:32
     *
     * @public
     * @static
     * @param {(Array<string | Array<string>>)} parts
     * @param {boolean} isFileName
     * @returns {string}
     */

    public static join(parts: Array<string | Array<string>>, isFileName: boolean): string {
        const path = Mrbr_IO_Path;
        if (!parts) { return null }
        const
            entries: Array<string> = [],
            pathParts: Array<string> = [];
        parts.forEach(part => path.toParts(part, entries));
        for (let entryCounter = 0, entryCount = entries.length; entryCounter < entryCount; entryCounter++) {
            const entry = entries[entryCounter]
            if (isFileName === true && entryCount - 1 === entryCounter && entries[entryCounter] === Mrbr_IO_Path.extensionSeperator) {
                pathParts.push(entry);
                continue;
            }
            if (entry === path.currentFolder) { continue; }
            if (entry === path.parentFolder) { pathParts.pop(); continue; }
            (entry !== undefined && entries[entryCounter] !== null && entries[entryCounter] !== "") &&
                (pathParts.push(entry === path.doubleSlash ? "//" : entry));
        }
        return pathParts.join("/");
    }

    /**
     * Convert a path to parts
     * @date 03/11/2022 - 05:54:55
     *
     * @private
     * @static
     * @param {(string | Array<string>)} part
     * @param {Array<string>} entries
     * @returns {Array<string>}
     */
    private static toParts(part: string | Array<string>, entries: Array<string>): Array<string> {
        const path = Mrbr_IO_Path;
        if (typeof part === "string") {
            let replacedPart = part.replace(path.doubleSlashRegex, `/${path.doubleSlash}/`);
            replacedPart.split(path.pathSplitRegex).forEach(entry => entries.push(entry))
        }
        if (Array.isArray(part)) { part.forEach(_part => path.toParts(_part, entries)); }
        return entries;
    }
}