import { Mrbr_System_Collections_Map } from "../collections/Map";
import { MrbrBase } from "../MrbrBase";
import { Mrbr_System_Events_EventHandler } from "./EventHandler";

/**
 * Event Map for Events, for easily adding and removing events
 * @date 03/11/2022 - 03:54:15
 *
 * @export
 * @class Mrbr_System_Events_EventsMap
 * @typedef {Mrbr_System_Events_EventsMap}
 * @extends {Mrbr_System_Collections_Map<string, Mrbr_System_Events_EventHandler>}
 */
export class Mrbr_System_Events_EventsMap extends Mrbr_System_Collections_Map<string, Mrbr_System_Events_EventHandler> {

    /**
     * Event Map Field
     * @date 03/11/2022 - 03:55:08
     *
     * @private
     * @type {Map<string, Mrbr_System_Events_EventHandler>}
     */
    private _events: Map<string, Mrbr_System_Events_EventHandler>;

    /**
     * Creates an instance of Mrbr_System_Events_EventsMap.
     * @date 03/11/2022 - 03:55:39
     *
     * @constructor
     */
    constructor() {
        super();
        const self = this,
            cls = Mrbr_System_Events_EventsMap,
            componentManifest = Symbol.for(`${cls[MrbrBase.MRBR_COMPONENT_NAME]}:componentManifest`);
        !cls[componentManifest] && (cls[componentManifest] = MrbrBase.mrbrInstance.loadManifest(cls[MrbrBase.MRBR_COMPONENT_MANIFEST]));
        try {
            (async () => await cls[componentManifest])();
        } catch (error) {
            throw new Error(`${cls[MrbrBase.MRBR_COMPONENT_NAME]}: error loading manifest: ${error}`);
        }
    }

    /**
     * Add an Event to the Map
     * @date 03/11/2022 - 03:55:54
     *
     * @public
     * @param {Mrbr_System_Events_EventHandler} event
     */
    public addEventHandler(event: Mrbr_System_Events_EventHandler): void {
        this.add(event.eventName, event);
    }

    /**
     * Add a Map of Events to the Map using differnet keys
     * @date 03/11/2022 - 03:56:14
     *
     * @public
     * @param {string} key
     * @param {Mrbr_System_Events_EventHandler} event
     */
    public add(key: string, event: Mrbr_System_Events_EventHandler): void {
        const self = this;
        if (self.has(key)) {
            self._events.get(key).count++;
            return;
        }
        if (!event.boundHandler) {
            event.boundHandler = event.eventHandler.bind((event.context || event.eventTarget));
            (event.options !== undefined) ?
                event.eventTarget.addEventListener(event.eventName, event.boundHandler, event.options) :
                event.eventTarget.addEventListener(event.eventName, event.boundHandler);
        }
        event.remove = () => {
            if (!self.has(key)) { return; }
            if (event.count > 1) {
                self.get(key).count--;
                return;
            }
            (event.options) ?
                event.eventTarget.removeEventListener(key, event.boundHandler, event.options) :
                event.eventTarget.removeEventListener(key, event.boundHandler);
            setTimeout(() => { self.delete(key); }, 0);
        }
        this.map.set(event.eventName, event);
    }
}