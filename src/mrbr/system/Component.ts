import { Mrbr_System_Object } from "./Object";
import { Mrbr_IO_ManifestPromise } from "../io/ManifestPromise";
import { Mrbr_System_IComponent } from "./IComponent";
import { MrbrBase } from "./MrbrBase";
import { Mrbr_System_Promise } from "./Promise";

export class Mrbr_System_Component extends Mrbr_System_Object implements Mrbr_System_IComponent {
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        return Mrbr_System_Promise.createResolved("Mrbr_System_Component", this);
    }
    public loadManifest(type: any): Mrbr_IO_ManifestPromise {
        let componentManifest = Symbol.for(`${type[MrbrBase.MRBR_COMPONENT_NAME]}:componentManifest`);
        !type[componentManifest] && (type[componentManifest] = MrbrBase.mrbrInstance.loadManifest(type[MrbrBase.MRBR_COMPONENT_MANIFEST]));
        return type[componentManifest];
    }
}