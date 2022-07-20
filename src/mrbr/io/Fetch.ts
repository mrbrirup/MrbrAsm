import { Mrbr_IO_FetchProgress } from "./FetchProgress";

export class Mrbr_IO_Fetch extends EventTarget {
    static emptyString: string = "";
    static loadProgressEvent: string = "fetch_loadProgress";
    static messageEvent: string = "fetch_message";
    static contentEncodingHeaderName: string = "content-encoding";
    static contentLengthHeaderName: string = "content-length";
    static customFileSizeHeaderName: string = "x-file-size";
    static cancelRequestRejectMessage: string = `Cancel requested before server response.`;
    static readableStreamNotSupportedMessage: string = `ReadableStream not supported in browser`;
    static cancellingDownloadRequestMessage: string = "Cancel download requested";
    static cancellingDownloadMessage: string = "Cancelling current download";
    static cancellingReadMessage: string = "Canceling read";
    constructor() {
        super();
    }
    cancelRequested: boolean = false;
    reader: ReadableStreamDefaultReader<Uint8Array>;
    contentSizeAvailable: boolean = false;
    fetchResponse: Promise<any>;
    reject: Function;
    resolve: Function;
    fetch(input: any, config: any): Promise<any> {
        const self = this,
            request = (input instanceof Request) ? input : new Request(input);
        self.fetchResponse = new Promise((resolve, reject) => { self.resolve = resolve; self.reject = reject; })
        fetch(request, config)
            .then(response => {
                if (!response.body) {
                    throw Error(Mrbr_IO_Fetch.readableStreamNotSupportedMessage)
                }
                // this occurs if cancel() was called before server responded (before fetch() Promise resolved)
                if (self.cancelRequested) {
                    response.body.getReader().cancel(Mrbr_IO_Fetch.cancelRequestRejectMessage);
                    return self.reject(Mrbr_IO_Fetch.emptyString);
                }

                if (!response.ok) {
                    // HTTP error server response
                    throw Error(`Server response ${response.status} ${response.statusText}`);
                }


                // to access headers, server must send CORS header "Access-Control-Expose-Headers: content-encoding, content-length x-file-size"
                // server must send custom x-file-size header if gzip or other content-encoding is used
                const contentEncoding = response.headers.get(Mrbr_IO_Fetch.contentEncodingHeaderName);
                const contentLength: string = response.headers.get((contentEncoding ? Mrbr_IO_Fetch.customFileSizeHeaderName : Mrbr_IO_Fetch.contentLengthHeaderName));
                self.contentSizeAvailable = !(contentLength === null || contentLength === undefined);
                let total = 0
                if (self.contentSizeAvailable) {
                    total = parseInt(contentLength, 10) || 0;
                }
                let loaded = 0;
                self.reader = response.body.getReader()

                return new Response(
                    new ReadableStream({
                        start(streamController) {
                            if (self.cancelRequested) {
                                //self.dispatchEvent(selfClass.messageEvent, selfClass.cancellingReadMessage)
                                self.dispatchEvent(new CustomEvent(Mrbr_IO_Fetch.messageEvent));
                                streamController.close();
                                return;
                            }
                            //const selfOnProgress = self.onProgress.bind(self),
                            //const selfOnProgress = self.dispatchEvent(selfClass.loadProgressEvent onProgress.bind(self),
                            const read = () => {
                                self.reader.read().then(({ done, value }) => {
                                    if (done) {

                                        self.dispatchEvent(new CustomEvent(Mrbr_IO_Fetch.loadProgressEvent, { detail: new Mrbr_IO_FetchProgress(loaded, total, self.contentSizeAvailable, true) }));
                                        streamController.close();
                                        return;
                                    }
                                    if (self.contentSizeAvailable) {
                                        loaded += value.byteLength;
                                    }
                                    self.dispatchEvent(new CustomEvent(Mrbr_IO_Fetch.loadProgressEvent, { detail: new Mrbr_IO_FetchProgress(loaded, total, self.contentSizeAvailable, false) }));
                                    streamController.enqueue(value);
                                    read();
                                }).catch(error => {
                                    self.dispatchEvent(new CustomEvent(Mrbr_IO_Fetch.messageEvent, { detail: error }));
                                    streamController.error(error)
                                });
                            }
                            read();
                        }
                    })
                )
            })
            .then(fetched => self.resolve(fetched))
            .catch(error => self.reject(error));
        return self.fetchResponse;
    }


    cancel(): Promise<any> {
        const self = this;
        let cancelResolve,
            cancelReject,
            cancelResponse = new Promise((resolve, reject) => { cancelResolve = resolve; cancelReject = reject; })
        self.dispatchEvent(new CustomEvent(Mrbr_IO_Fetch.messageEvent, { detail: Mrbr_IO_Fetch.cancellingDownloadRequestMessage }));
        //self.onFetchMessages(selfClass.cancellingDownloadRequestMessage)
        self.cancelRequested = true;
        if (self.reader) {
            self.dispatchEvent(new CustomEvent(Mrbr_IO_Fetch.messageEvent, { detail: Mrbr_IO_Fetch.cancellingDownloadMessage }));
            //self.onFetchMessages(selfClass.cancellingDownloadMessage);
            self.reader.cancel()
                .then(_ => cancelResolve())
        }
        else {
            cancelResolve();
        }
        return cancelResponse;
    }
}