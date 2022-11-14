import { Mrbr_IO_ManifestPromise } from "../io/ManifestPromise";
import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_System_IComponent } from "../system/IComponent";
import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_Promise } from "../system/Promise";
import { Mrbr_Collections_Dictionary } from "./Dictionary";
import { Mrbr_Collections_DictionaryEventData } from "./DictionaryEventData";

/**
 * Event for Changes to Dictionary
 * @date 02/11/2022 - 06:16:30
 *
 * @export
 * @class Mrbr_Collections_DictionaryEvent
 * @typedef {Mrbr_Collections_DictionaryEvent}
 * @template TKey
 * @template TValue
 * @extends {Mrbr_System_Events_Event<Mrbr_Collections_DictionaryEventData<TKey, TValue>>}
 * @implements {Mrbr_System_IComponent}
 */
export class Mrbr_Collections_DictionaryEvent<TKey, TValue> extends Mrbr_System_Events_Event<Mrbr_Collections_DictionaryEventData<TKey, TValue>> implements Mrbr_System_IComponent {

    
    /**
     * Cached Manifest Promise
     * @date 02/11/2022 - 06:17:25
     *
     * @private
     * @static
     * @type {Mrbr_IO_ManifestPromise}
     */
    private static componentManifest: Mrbr_IO_ManifestPromise = null;
    
    /**
     * Event Type for Dictionary Change
     * @date 02/11/2022 - 06:16:59
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DICTIONARY_EVENT_CHANGE: string = "DICTIONARY_EVENT_CHANGE";

    
    /**
     * Creates an instance of Mrbr_Collections_DictionaryEvent.
     * @date 02/11/2022 - 06:17:09
     *
     * @constructor
     * @param {Mrbr_Collections_Dictionary<TKey, TValue>} source
     * @param {Mrbr_Collections_DictionaryEventData<TKey, TValue>} eventData
     */
    constructor(source: Mrbr_Collections_Dictionary<TKey, TValue>, eventData: Mrbr_Collections_DictionaryEventData<TKey, TValue>) {
        super(Mrbr_Collections_DictionaryEvent.DICTIONARY_EVENT_CHANGE, source, eventData);
    }
    
    /**
     * Initialise Component and Load Manifest
     * @date 02/11/2022 - 06:18:03
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const
            self = this,
            promise = Mrbr_System_Promise,
            cls = Mrbr_Collections_DictionaryEvent;
        !cls.componentManifest && (cls.componentManifest = MrbrBase.mrbrInstance.loadManifest(cls[MrbrBase.MANIFEST]));
        const initialisePromise = promise.create<Mrbr_System_IComponent>("Mrbr_Collections_DictionaryEvent.initialise");
        cls.componentManifest
            .then(() => {
                initialisePromise.resolve(this);
            });
        return initialisePromise;
    }


}