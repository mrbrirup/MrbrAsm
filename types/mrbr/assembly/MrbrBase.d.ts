import { Mrbr_Assembly_MrbrConfig } from './mrbrConfig';
import { Mrbr_IO_File } from "../io/File";
export declare class MrbrBase {
    config: Mrbr_Assembly_MrbrConfig;
    constructor(config: Mrbr_Assembly_MrbrConfig);
    initialise(): Promise<any>;
    createNamespace(namespace: String): void;
    load(file: Mrbr_IO_File): Promise<any>;
    loadText(): void;
    loadJson(): void;
    loadScript(): void;
    loadScriptElement(file: Mrbr_IO_File): Promise<any>;
    loadScriptLink(file: Mrbr_IO_File): Promise<any>;
    loadCssElement(): void;
    loadCssLink(): void;
    loadHtml(): void;
    loadComponent(): void;
    loadOther(): void;
    /**
 * When run in the Browser provides an onReady function.
 * Once Assembly.initialised is resolved events are set for when browser DOM is "ready"
 * @returns {Promise} DOM is "ready"
 */
    static eventNames: {
        document: {
            DOMContentLoaded: string;
            load: string;
        };
        window: {
            DOMContentLoaded: string;
            load: string;
        };
    };
    static documentStates: {
        complete: string;
    };
    static readyStates: {
        complete: string;
    };
    onReady(config: any): Promise<unknown>;
}
