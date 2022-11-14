import { Mrbr_System_Collections_Map } from "../collections/Map";
import { MrbrBase } from "../MrbrBase";
import { Mrbr_System_Promise } from "../Promise";
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
    constructor() { super(); }


    /**
     * Initialize the Map, load manifest and set properties
     * @date 10/11/2022 - 15:39:37
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_System_Events_EventsMap>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_System_Events_EventsMap> {
        const self = this,
            cls = Mrbr_System_Events_EventsMap,
            initialisePromise = Mrbr_System_Promise.create<Mrbr_System_Events_EventsMap>(`${cls[MrbrBase.COMPONENT_NAME]}:initialise`);
        MrbrBase.mrbrInstance.loadManifest(cls[MrbrBase.MANIFEST])
            .then(() => {
                self._events = new Map<string, Mrbr_System_Events_EventHandler>();
                initialisePromise.resolve(self);
            });
        return initialisePromise;
    }


    /**
     * Add an Event to the Map
     * @date 03/11/2022 - 03:55:54
     *
     * @public
     * @param {Mrbr_System_Events_EventHandler} event
     */
    public addEventHandler(event: Mrbr_System_Events_EventHandler): void { this.add(event.eventName, event); }

    /**
     * Add a Map of Events to the Map using different keys
     * @date 03/11/2022 - 03:56:14
     *
     * @public
     * @param {string} key
     * @param {Mrbr_System_Events_EventHandler} event
     */
    public add(key: string, event: Mrbr_System_Events_EventHandler): void {
        const self = this;
        if (self.has(key)) {
            self.get(key).count++;
            return;
        }
        (!event.boundHandler) && (event.boundHandler = event.eventHandler.bind((event.context || event.eventTarget)))

        event.eventTarget.addEventListener(event.eventName, event.boundHandler, event.options);
        event.remove = () => {
            if (!self.has(key)) { return; }
            if (event.count > 1) {
                self.get(key).count--;
                return;
            }
            event.eventTarget.removeEventListener(key, event.boundHandler, event.options);
            setTimeout(() => { self.delete(key); }, 0);
        }
        this.map.set(event.eventName, event);
    }
}