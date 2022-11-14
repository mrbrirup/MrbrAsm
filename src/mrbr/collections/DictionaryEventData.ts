import { Mrbr_IO_ManifestPromise } from "../io/ManifestPromise";
import { Mrbr_System_Component } from "../system/Component";
import { Mrbr_System_IComponent } from "../system/IComponent";
import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_Promise } from "../system/Promise";
import { Mrbr_Collections_DictionaryChangeTypes } from "./DictionaryChangeTypes";


/**
 * EventData detailing change to Dictionary
 * @date 02/11/2022 - 06:18:42
 *
 * @export
 * @class Mrbr_Collections_DictionaryEventData
 * @typedef {Mrbr_Collections_DictionaryEventData}
 * @template TKey
 * @template TValue
 * @implements {Mrbr_System_IComponent}
 */
export class Mrbr_Collections_DictionaryEventData<TKey, TValue> extends Mrbr_System_Component implements Mrbr_System_IComponent {


    /**
     * Cached Manifest Promise
     * @date 02/11/2022 - 06:20:08
     *
     * @private
     * @static
     * @type {Mrbr_IO_ManifestPromise}
     */
    private static componentManifest: Mrbr_IO_ManifestPromise = null;

    /**
     * Dictionary Key
     * @date 02/11/2022 - 06:19:25
     *
     * @public
     * @type {TKey}
     */
    public key: TKey;

    /**
     * Current Value
     * @date 02/11/2022 - 06:19:35
     *
     * @public
     * @type {TValue}
     */
    public value: TValue;

    /**
     * Previous Value before update or delete
     * @date 02/11/2022 - 06:19:45
     *
     * @public
     * @type {TValue}
     */
    public oldValue: TValue;
    public action: Mrbr_Collections_DictionaryChangeTypes;


    /**
     * Creates an instance of Mrbr_Collections_DictionaryEventData.
     * @date 02/11/2022 - 06:19:15
     *
     * @constructor
     * @param {TKey} key
     * @param {TValue} value
     * @param {TValue} oldValue
     * @param {Mrbr_Collections_DictionaryChangeTypes} action
     */
    constructor(key: TKey, value: TValue, oldValue: TValue, action: Mrbr_Collections_DictionaryChangeTypes) {
        super();
        const self = this;
        self.key = key;
        self.value = value;
        self.oldValue = oldValue;
        self.action = action;
    }

    /**
     * Initialize Component, set properties and Load Manifest
     * @date 02/11/2022 - 06:20:18
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const
            self = this,
            promise = Mrbr_System_Promise,
            cls = Mrbr_Collections_DictionaryEventData;

        const initialisePromise = promise.create<Mrbr_System_IComponent>("Mrbr_Collections_DictionaryEventData.initialise");
        !cls.componentManifest && (cls.componentManifest = MrbrBase.mrbrInstance.loadManifest(cls[MrbrBase.MANIFEST]));
        cls.componentManifest
            .then(() => {
                initialisePromise.resolve(this);
            });
        return initialisePromise;
    }
}