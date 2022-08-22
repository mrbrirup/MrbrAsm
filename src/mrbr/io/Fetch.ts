/*
The MIT License (MIT)
Copyright © 2022 mrbrirup
https://github.com/mrbrirup/MrbrAsm/blob/main/LICENSE
*/
import { Mrbr_IO_FetchProgress } from "./FetchProgress";

/**
 * Provides Fetch functionlity with Progress Events
 * @date 22/08/2022 - 22:49:00
 *
 * @export
 * @class Mrbr_IO_Fetch
 * @typedef {Mrbr_IO_Fetch}
 * @extends {EventTarget}
 */
export class Mrbr_IO_Fetch extends EventTarget {
    private static emptyString: string = "";
    private static contentEncodingHeaderName: string = "content-encoding";
    private static contentLengthHeaderName: string = "content-length";
    private static customFileSizeHeaderName: string = "x-file-size";
    private static cancelRequestRejectMessage: string = `Cancel requested before server response.`;
    private static readableStreamNotSupportedMessage: string = `ReadableStream not supported in browser`;
    private static cancellingDownloadRequestMessage: string = "Cancel download requested";
    private static cancellingDownloadMessage: string = "Cancelling current download";
    private static cancellingReadMessage: string = "Canceling read";
    public static loadProgressEvent: string = "fetch_loadProgress";
    public static messageEvent: string = "fetch_message";
    private cancelRequested: boolean = false;
    private reader: ReadableStreamDefaultReader<Uint8Array>;
    private contentSizeAvailable: boolean = false;
    private fetchResponse: Promise<any>;
    private reject: Function;
    private resolve: Function;

    /**
     * Creates an instance of Mrbr_IO_Fetch.
     * @date 22/08/2022 - 22:48:50
     *
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Fetch a file
     * @date 22/08/2022 - 22:49:49
     *
     * @public
     * @param {*} input Url or Fetch Request
     * @param {*} config optional configuration for Fetch
     * @returns {Promise<any>}
     */
    public fetch(input: any, config?: any): Promise<any> {
        const self = this,
            request = (input instanceof Request) ? input : new Request(input),
            mrbrIOFetch = Mrbr_IO_Fetch,
            mrbrIOFetchProgress = Mrbr_IO_FetchProgress,
            customEvent = CustomEvent;
        self.fetchResponse = new Promise((resolve, reject) => { self.resolve = resolve; self.reject = reject; })
        fetch(request, config)
            .then(response => {
                if (!response.body) {
                    throw Error(mrbrIOFetch.readableStreamNotSupportedMessage)
                }
                // this occurs if cancel() was called before server responded (before fetch() Promise resolved)
                if (self.cancelRequested) {
                    response.body.getReader().cancel(mrbrIOFetch.cancelRequestRejectMessage);
                    return self.reject(mrbrIOFetch.emptyString);
                }

                if (!response.ok) {
                    // HTTP error server response
                    throw Error(`Server response ${response.status} ${response.statusText}`);
                }

                // to access headers, server must send CORS header "Access-Control-Expose-Headers: content-encoding, content-length x-file-size"
                // server must send custom x-file-size header if gzip or other content-encoding is used
                const contentEncoding = response.headers.get(mrbrIOFetch.contentEncodingHeaderName);
                const contentLength: string = response.headers.get((contentEncoding ? mrbrIOFetch.customFileSizeHeaderName : mrbrIOFetch.contentLengthHeaderName));
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
                                self.dispatchEvent(new customEvent(mrbrIOFetch.messageEvent));
                                streamController.close();
                                return;
                            }
                            //const selfOnProgress = self.onProgress.bind(self),
                            //const selfOnProgress = self.dispatchEvent(selfClass.loadProgressEvent onProgress.bind(self),
                            const read = () => {
                                self.reader.read().then(({ done, value }) => {
                                    if (done) {

                                        self.dispatchEvent(new customEvent(mrbrIOFetch.loadProgressEvent, { detail: new mrbrIOFetchProgress(loaded, total, self.contentSizeAvailable, true) }));
                                        streamController.close();
                                        return;
                                    }
                                    if (self.contentSizeAvailable) {
                                        loaded += value.byteLength;
                                    }
                                    self.dispatchEvent(new customEvent(mrbrIOFetch.loadProgressEvent, { detail: new mrbrIOFetchProgress(loaded, total, self.contentSizeAvailable, false) }));
                                    streamController.enqueue(value);
                                    read();
                                }).catch(error => {
                                    self.dispatchEvent(new customEvent(mrbrIOFetch.messageEvent, { detail: error }));
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


    /**
     * Cancel Fetch request
     * @date 22/08/2022 - 22:50:59
     *
     * @public
     * @returns {Promise<any>}
     */
    public cancel(): Promise<any> {
        const self = this,
            mrbrIOFetch = Mrbr_IO_Fetch,
            customEvent = CustomEvent;;
        let cancelResolve,
            cancelReject,
            cancelResponse = new Promise((resolve, reject) => { cancelResolve = resolve; cancelReject = reject; })
        self.dispatchEvent(new customEvent(mrbrIOFetch.messageEvent, { detail: mrbrIOFetch.cancellingDownloadRequestMessage }));
        //self.onFetchMessages(selfClass.cancellingDownloadRequestMessage)
        self.cancelRequested = true;
        if (self.reader) {
            self.dispatchEvent(new customEvent(mrbrIOFetch.messageEvent, { detail: mrbrIOFetch.cancellingDownloadMessage }));
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