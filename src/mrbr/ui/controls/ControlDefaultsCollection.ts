import { Mrbr_Collections_Dictionary } from "../../collections/Dictionary";
import { Mrbr_System_IComponent } from "../../system/IComponent";
import { MrbrBase } from "../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../system/Promise";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "./ControlConfigOptionalParameters";

/**
 * Default configuration for Controls.
 * @date 01/11/2022 - 04:41:32
 *
 * @export
 * @class Mrbr_UI_Controls_ControlDefaultsCollection
 * @typedef {Mrbr_UI_Controls_ControlDefaultsCollection}
 * @extends {Mrbr_Collections_Dictionary<string, Mrbr_UI_Controls_ControlConfigOptionalParameters>}
 */
export class Mrbr_UI_Controls_ControlDefaultsCollection extends Mrbr_Collections_Dictionary<string, Mrbr_UI_Controls_ControlConfigOptionalParameters> implements Mrbr_System_IComponent {
    constructor() {
        super();
    }

    /**
     * Initialise the Component, set properties and load manifest.
     * @date 03/11/2022 - 03:39:49
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const
            self = this,
            cls = Mrbr_System_Promise,
            initalisePromise = self.$promise.create<Mrbr_System_IComponent>(`${cls[MrbrBase.MRBR_COMPONENT_NAME]}.initialise`);
        try {
            super.initialise(args).then(async () => {
                await self.loadManifest(cls);
                initalisePromise.resolve(self);
            });
        } catch (error) {
            initalisePromise.reject(error);
        }
        return initalisePromise;
    }
}