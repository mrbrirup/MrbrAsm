import { Mrbr_IO_ManifestPromise } from "../io/ManifestPromise";
import { Mrbr_System_Promise } from "./Promise";

/**
 * Interface for all Components.
 * @date 01/11/2022 - 04:59:40
 *
 * @export
 * @interface Mrbr_System_IComponent
 * @typedef {Mrbr_System_IComponent}
 */
export interface Mrbr_System_IComponent {
    /**
     * Initialize the control, set properties and load control manifest
     * @date 31/10/2022 - 21:26:50
     *
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    initialise(...args): Mrbr_System_Promise<Mrbr_System_IComponent>;
    loadManifest(type: any): Mrbr_IO_ManifestPromise | Mrbr_System_Promise<any>;
} 