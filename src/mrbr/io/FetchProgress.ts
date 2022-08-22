/*
The MIT License (MIT)
Copyright © 2022 mrbrirup
https://github.com/mrbrirup/MrbrAsm/blob/main/LICENSE
*/

/**
 * FetchProgress for Mrbr.IO.Fetch
 * @date 22/08/2022 - 22:52:04
 *
 * @export
 * @class Mrbr_IO_FetchProgress
 * @typedef {Mrbr_IO_FetchProgress}
 */
export class Mrbr_IO_FetchProgress {
    private _loaded: number = 0;
    private _total: number = 0;
    private _complete: boolean = false;
    private _contentSizeAvailable: boolean = false;
    
    /**
     * Creates an instance of Mrbr_IO_FetchProgress.
     * @date 22/08/2022 - 22:53:35
     *
     * @constructor
     * @param {number} loaded loaded bytes
     * @param {number} total total bytes
     * @param {boolean} contentSizeAvailable is content size available from headers
     * @param {boolean} complete download complete
     */
    constructor(loaded: number, total: number, contentSizeAvailable: boolean, complete: boolean) {
        const self = this;
        self.loaded = loaded;
        self.total = total;
        self.complete = complete;
        self.contentSizeAvailable = contentSizeAvailable;
    }
    
    /**
     * Loaded bytes
     * @date 22/08/2022 - 22:54:28
     *
     * @public
     * @type {number}
     */
    public get loaded(): number {
        return this._loaded;
    }
    
    /**
     * Loaded bytes
     */
    public set loaded(value: number) {
        this._loaded = value;
    }
    
    /**
     * Total bytes for download
     * @date 22/08/2022 - 22:54:44
     *
     * @public
     * @type {number}
     */
    public get total(): number {
        return this._total;
    }
    
    /**
     * Total bytes for download
     */
    public set total(value: number) {
        this._total = value;
    }
    
    /**
     * Download complete
     * @date 22/08/2022 - 22:55:02
     *
     * @public
     * @type {boolean}
     */
    public get complete(): boolean {
        return this._complete;
    }
    
    /**
     * Download complete
     */
    public set complete(value: boolean) {
        this._complete = value;
    }
    
    /**
     * Content size available from headers
     * @date 22/08/2022 - 22:55:19
     *
     * @public
     * @type {boolean}
     */
    public get contentSizeAvailable(): boolean {
        return this._contentSizeAvailable;
    }
    
    /**
     * Content size available from headers
     */
    public set contentSizeAvailable(value: boolean) {
        this._contentSizeAvailable = value;
    }
}