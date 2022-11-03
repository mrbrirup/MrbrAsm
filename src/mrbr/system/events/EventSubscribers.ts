import { Mrbr_System_Collections_Map } from "../collections/Map";
import { Mrbr_System_Promise } from "../Promise";
import { Mrbr_System_Object } from "../Object";
import { Mrbr_System_IComponent } from "../IComponent";
import { Mrbr_IO_ManifestPromise } from "../../io/ManifestPromise";
import { MrbrBase } from "../MrbrBase";

/**
 * @class Mrbr_System_Events_Event
 * @description Collection and dispatcher for subscribed events.
 * @date 02/11/2022 - 05:42:23
 *
 * @export
 * @class Mrbr_System_Events_EventSubscribers
 * @typedef {Mrbr_System_Events_EventSubscribers}
 * @extends {Mrbr_System_Object}
 * @implements {Mrbr_System_IComponent}
 */
export class Mrbr_System_Events_EventSubscribers extends Mrbr_System_Object implements Mrbr_System_IComponent {
    //#region Private Members

    /**
     * Event Subscribers Map Field
     * @date 02/11/2022 - 05:51:20
     *
     * @private
     * @type {Mrbr_System_Collections_Map<string, Map<number, ((source: object, event: object, data: object) => void)>>}
     */
    private _map: Mrbr_System_Collections_Map<string, Map<number, ((source: object, event: object, data: object) => void)>>

    /**
     * Unique EventKey incremented each time a new event is added.
     * @date 02/11/2022 - 05:52:01
     *
     * @private
     * @type {number}
     */
    private eventKey: number = 0;

    /**
     * Cached Component Manifest
     * @date 02/11/2022 - 05:52:28
     *
     * @private
     * @static
     * @type {Mrbr_IO_ManifestPromise}
     */
    private static componentManifest: Mrbr_IO_ManifestPromise = null;
    //#endregion Private Members

    constructor() { super(); }
    //#region Public Properties

    /**
     * Event Subscribers Map Property
     * @date 02/11/2022 - 05:52:55
     *
     * @public
     * @readonly
     * @type {Mrbr_System_Collections_Map<string, Map<number, (source: object, event: object, data: object) => void>>}
     */
    public get map(): Mrbr_System_Collections_Map<string, Map<number, (source: object, event: object, data: object) => void>> { return this._map; }

    /**
     * Is EventSubscriber Map Empty
     * @date 02/11/2022 - 05:53:22
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get isEmpty(): boolean { return this._map.isEmpty; }

    /**
     * Number of EventTypes in the EventSubscribers Map
     * @date 02/11/2022 - 05:53:56
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get size(): number { return this._map.size; }

    /**
     * toString override
     * @date 02/11/2022 - 05:54:13
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get [Symbol.toStringTag](): string { return "Mrbr_System_Events_EventSubscriber"; }
    //#endregion Public Methods
    //#region Private Methods
    private *eventsGenerator(array: Array<((source: object, event: object, data: object) => void)>): IterableIterator<((source: object, event: object, data: object) => void)> {
        yield* array;
    }
    //#endregion Private Methods

    //#region Public Methods

    /**
     * @description Initialize the component, set properties and loadManifest
     * @date 02/11/2022 - 05:45:15
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const self = this,
            cls = Mrbr_System_Events_EventSubscribers,
            initalisePromise = self.$promise.create<Mrbr_System_Events_EventSubscribers>("Mrbr_System_Events_EventSubscriber.initialise");
        !cls.componentManifest && (cls.componentManifest = MrbrBase.mrbrInstance.loadManifest(cls[MrbrBase.MRBR_COMPONENT_MANIFEST]));
        cls.componentManifest
            .then(() => {
                self._map = new Mrbr_System_Collections_Map<string, any>();
                initalisePromise.resolve(self);
            })
            .catch((error) => {
                initalisePromise.reject(error);
            });
        return initalisePromise;
    }

    /**
     * @description Add a new event to the EventSubscribers Map
     * @date 02/11/2022 - 05:54:42
     *
     * @public
     * @param {string} key
     * @param {(source: any, event: any, data: any) => void} callback
     * @returns {number} Unique EventKey
     */
    public add(key: string, callback: (source: any, event: any, data: any) => void): number {
        const self = this;
        if (!self._map.has(key)) {
            self._map.add(key, new Map<number, (source: object, event: object, data: object) => void>());
        }
        let nextKey = self.eventKey++;
        self._map.get(key).set(nextKey, callback);
        return nextKey;
    }

    /**
     * @description Remove an event from the EventSubscribers Map
     * @date 02/11/2022 - 05:55:01
     *
     * @public
     * @param {string} key
     * @param {number} eventKey
     */
    public remove(key: string, eventKey: number): void {
        const self = this;
        if (!self._map.has(key)) { return; }
        self._map.get(key).delete(eventKey);
    }

    /**
     * @description Remove all events for a given key
     * @date 02/11/2022 - 05:55:13
     *
     * @public
     * @param {string} key
     */
    public clear(key: string): void {
        const self = this;
        if (!self._map.has(key)) { return; }
        self._map.get(key).clear();
    }

    /**
     * @description Clear all events from the EventSubscribers Map
     * @date 02/11/2022 - 05:55:30
     *
     * @public
     */
    public clearAll(): void {
        const self = this;
        self._map.clear();
    }

    /**
     * Raise all events for a given key
     * @date 02/11/2022 - 05:55:39
     *
     * @public
     * @param {string} key
     * @param {object} event
     * @param {...{}} args
     */
    public raise(key: string, event: object, ...args): void {
        const self = this;
        if (!self._map.has(key)) { return; }
        const events = Array.from(self._map.get(key).values());
        if (!events || events.length === 0) { return; }
        let callbacks: IterableIterator<((source: object, event: object, data: object) => void)> = self.eventsGenerator(events);
        let callback: IteratorResult<((source: object, event: object, data: object) => void)>;
        while (!(callback = callbacks.next()).done) {
            callback.value(self, event, ...args);
        };
    }
    //#endregion Public Methods
}