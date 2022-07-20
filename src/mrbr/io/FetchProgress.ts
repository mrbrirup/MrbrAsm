export class Mrbr_IO_FetchProgress {
    loaded: number = 0;
    total: number = 0;
    complete: boolean = false;
    contentSizeAvailable: boolean = false;
    constructor(loaded: number, total: number, contentSizeAvailable: boolean, complete: boolean) {
        const self = this;
        self.loaded = loaded;
        self.total = total;
        self.complete = complete;
        self.contentSizeAvailable = contentSizeAvailable;
    }
}