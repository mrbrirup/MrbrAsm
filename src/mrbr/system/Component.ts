import { Mrbr_System_Object } from "./Object";
import { Mrbr_IO_ManifestPromise } from "../io/ManifestPromise";
import { Mrbr_System_IComponent } from "./IComponent";
import { MrbrBase } from "./MrbrBase";
import { Mrbr_System_Promise } from "./Promise";


/**
 * Base Component Class
 * @date 07/01/2023 - 09:22:02
 *
 * @export
 * @class Mrbr_System_Component
 * @typedef {Mrbr_System_Component}
 * @extends {Mrbr_System_Object}
 * @implements {Mrbr_System_IComponent}
 */
export class Mrbr_System_Component extends Mrbr_System_Object implements Mrbr_System_IComponent {
    
    
    /**
     * Default intialise method
     * @date 07/01/2023 - 09:22:32
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        return Mrbr_System_Promise.createResolved("Mrbr_System_Component", this);
    }
    
    /**
     * Load the manifest for the component
     * @date 07/01/2023 - 09:22:53
     *
     * @public
     * @param {*} type
     * @returns {Mrbr_IO_ManifestPromise}
     */
    public loadManifest(type: any): Mrbr_IO_ManifestPromise {
        let componentManifest = Symbol.for(`${type[MrbrBase.COMPONENT_NAME]}:componentManifest`);
        !type[componentManifest] && (type[componentManifest] = MrbrBase.mrbrInstance.loadManifest(type[MrbrBase.MANIFEST]));
        return type[componentManifest];
    }
}