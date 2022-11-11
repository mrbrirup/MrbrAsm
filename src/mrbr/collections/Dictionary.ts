import { Mrbr_IO_ManifestPromise } from "../io/ManifestPromise";
import { Mrbr_System_Component } from "../system/Component";
import { Mrbr_System_Events_EventSubscribers } from "../system/events/EventSubscribers";
import { Mrbr_System_IComponent } from "../system/IComponent";
import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_Promise } from "../system/Promise";
import { Mrbr_Collections_DictionaryChangeTypes } from "./DictionaryChangeTypes";
import { Mrbr_Collections_DictionaryEvent } from "./DictionaryEvent";
import { Mrbr_Collections_DictionaryEventData } from "./DictionaryEventData";
import { Mrbr_Collections_KeyValuePair } from "./KeyValuePair";

/**
 * A Dictionary of key/value [TKey, TValue] typed pairs.
 * @date 01/11/2022 - 04:43:59
 *
 * @export
 * @class Mrbr_Collections_Dictionary
 * @typedef {Mrbr_Collections_Dictionary}
 * @template TKey
 * @template TValue
 * @extends {EventTarget}
 */
export class Mrbr_Collections_Dictionary<TKey, TValue> extends Mrbr_System_Component implements Mrbr_System_IComponent {

    //#region Private Static Fields
    private static componentManifest: Mrbr_IO_ManifestPromise = null;
    private static readonly addChangeEvent: string = "add";
    private static readonly removeChangeEvent: string = "remove";
    private static readonly updateChangeEvent: string = "update";
    private static readonly clearChangeEvent: string = "clear";
    //#endregion Public Methods

    //#region Private Properties
    /**
     * Returns this class type
     * @date 01/11/2022 - 05:19:06
     *
     * @readonly
     * @type {typeof Mrbr_Collections_Dictionary}
     */
    get $cls(): typeof Mrbr_Collections_Dictionary { return Mrbr_Collections_Dictionary; }

    /**
     * Alias for DictionaryChangeTypes
     * @date 01/11/2022 - 19:07:11
     *
     * @readonly
     * @type {typeof Mrbr_Collections_DictionaryChangeTypes}
     */
    get $changeTypes(): typeof Mrbr_Collections_DictionaryChangeTypes { return Mrbr_Collections_DictionaryChangeTypes; }

    //#endregion Private Properties

    //#region Private Fields

    /**
     * Map Waspped by Dictionary 
     * @date 01/11/2022 - 19:07:45
     *
     * @private
     * @type {Map<TKey, TValue>}
     */
    private _dictionary: Map<TKey, TValue>;

    /**
     * Event Subscribers
     * @date 01/11/2022 - 19:08:06
     *
     * @private
     * @type {Mrbr_System_Events_EventSubscribers}
     */
    private _eventSubscribers: Mrbr_System_Events_EventSubscribers;

    /**
     * Proxy wrapper around the dictionary
     * @date 01/11/2022 - 19:08:16
     *
     * @private
     * @type {Map<TKey, TValue>}
     */
    private _index: Map<TKey, TValue>;
    //#endregion Private Fields

    /**
     * Creates an instance of Mrbr_Collections_Dictionary.
     * @date 01/11/2022 - 19:09:18
     *
     * @constructor
     * @param {?Map<TKey, TValue>} [sourceMap] Optional source map to populate the dictionary with.
     */
    constructor(sourceMap?: Map<TKey, TValue>) {
        super();
        const self = this;
        self._dictionary = sourceMap ? sourceMap : new Map<TKey, TValue>()
        self.index = new Proxy(self._dictionary,
            {
                get(target, name) { return (target.has(((name as unknown) as TKey))) ? target.get(((name as unknown) as TKey)) : undefined; },
                set(target, name, value) {
                    target.set(((name as unknown) as TKey), value);
                    return true;
                }
            })
    }
    //#region Event Handling

    /**
     * Raises events to subscribers
     * @date 01/11/2022 - 19:09:41
     *
     * @private
     * @param {Mrbr_Collections_DictionaryChangeTypes} changeType
     * @param {TKey} key
     * @param {TValue} value
     * @param {TValue} [previousValue=null]
     */
    private changed(changeType: Mrbr_Collections_DictionaryChangeTypes, key: TKey, value: TValue, previousValue: TValue = null) {
        const self = this,
            changeEventName = (self.constructor as any).changeEvent,
            //changeEvent = new CustomEvent(changeEventName, { detail: { change: changeType, entry: value } });
            changeData = new Mrbr_Collections_DictionaryEventData<TKey, TValue>(key, value, previousValue, changeType),
            changeEvent = new Mrbr_Collections_DictionaryEvent(self, changeData);
        self._eventSubscribers.raise(changeEventName, changeEvent);

    }


    /**
     * Event Raised when a key/value pair is added to the dictionary
     * @date 01/11/2022 - 19:10:09
     *
     * @public
     * @param {(source: Mrbr_Collections_Dictionary<TKey, TValue>, event: any) => void} callback
     * @returns {number}
     */
    public onAdd(callback: (source: Mrbr_Collections_Dictionary<TKey, TValue>, event: any) => void): number {
        return this._eventSubscribers.add(this.$cls.addChangeEvent, callback);
    }

    /**
     * Event Raised when a key/value pair is removed from the dictionary
     * @date 01/11/2022 - 19:10:28
     *
     * @public
     * @param {(source: Mrbr_Collections_Dictionary<TKey, TValue>, event: any) => void} callback
     * @returns {number}
     */
    public onRemove(callback: (source: Mrbr_Collections_Dictionary<TKey, TValue>, event: any) => void): number {
        return this._eventSubscribers.add(this.$cls.removeChangeEvent, callback);
    }

    /**
     * Event Raised when a key/value pair is updated in the dictionary
     * @date 01/11/2022 - 19:10:37
     *
     * @public
     * @param {(source: Mrbr_Collections_Dictionary<TKey, TValue>, event: any) => void} callback
     * @returns {number}
     */
    public onUpdate(callback: (source: Mrbr_Collections_Dictionary<TKey, TValue>, event: any) => void): number {
        return this._eventSubscribers.add(this.$cls.updateChangeEvent, callback);
    }

    /**
     * Event Raised when the dictionary is cleared
     * @date 01/11/2022 - 19:10:46
     *
     * @public
     * @param {(event: Mrbr_Collections_DictionaryEvent<TKey, TValue>) => void} callback
     * @returns {number}
     */
    public onClear(callback: (event: Mrbr_Collections_DictionaryEvent<TKey, TValue>) => void): number {
        return this._eventSubscribers.add(this.$cls.clearChangeEvent, callback);
    }



    //#endregion Event Handling
    //#region Public Properties

    /**
     * Indexed wrapper around dictionary
     * @date 01/11/2022 - 19:11:00
     *
     * @public
     * @type {Map<TKey, TValue>}
     */
    public get index(): Map<TKey, TValue> { return this._index; }

    /**
     * Indexed wrapper around dictionary
     */
    public set index(value: Map<TKey, TValue>) { this._index = value; }

    /**
     * Returns dictionary Map 
     * @date 01/11/2022 - 19:11:25
     *
     * @public
     * @readonly
     * @type {Map<TKey, TValue>}
     */
    public get dictionary(): Map<TKey, TValue> { return this.index; }
    /**
     * Returns the number of key/value pairs in the dictionary
     * @date 01/11/2022 - 19:12:30
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get length(): number { return this._dictionary.size; }

    /**
     * Returns an array of the keys in the dictionary
     * @date 01/11/2022 - 19:12:38
     *
     * @public
     * @readonly
     * @type {Array<TKey>}
     */
    public get keysToArray(): Array<TKey> { return Array.from(this._dictionary.keys()); }

    /**
     * Returns an object of the key/values in the dictionary
     * @date 01/11/2022 - 19:12:58
     *
     * @public
     * @readonly
     * @type {object}
     */
    public get toObject(): object {
        const collectionArray = {};
        this._dictionary.forEach((key, value) => collectionArray[key.toString()] = value);
        return collectionArray
    }

    /**
     * Returns an iterator of the keys in the dictionary
     * @date 01/11/2022 - 19:13:39
     *
     * @public
     * @readonly
     * @type {IterableIterator<TKey>}
     */
    public get keys(): IterableIterator<TKey> { return this._dictionary.keys(); }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Does Dictionary contain key
     * @date 01/11/2022 - 19:18:32
     *
     * @public
     * @param {TKey} key
     * @returns {boolean}
     */
    public has(key: TKey): boolean { return this._dictionary.has(key) }

    /**
     * Returns the value associated with the key
     * @date 01/11/2022 - 19:18:52
     *
     * @public
     * @param {TKey} key
     * @returns {TValue}
     */
    public get(key: TKey): TValue { return this._dictionary.get(key) }

    /**
     * Sets or Adds a key/value pair to the dictionary
     * @date 01/11/2022 - 19:19:04
     *
     * @public
     * @param {TKey} key
     * @param {TValue} value
     */
    public set(key: TKey, value: TValue) {
        let changeType,
            lastValue,
            currentValue;
        if (this.has(key)) {
            changeType = this.$changeTypes.Update;
            lastValue = this.get(key);
        }
        else {
            changeType = this.$changeTypes.Add
            lastValue = null;
        }
        this._dictionary.set(key, value);
        currentValue = this.get(key);
        this.changed(changeType, key, currentValue, lastValue);
    }

    /**
     * Add collection of key/value pairs to the dictionary
     * @date 01/11/2022 - 19:20:18
     *
     * @public
     * @param {Array<[key: TKey, value: TValue]>} values
     */
    public addEntries(values: Array<[key: TKey, value: TValue]>): void {
        if (!values) return;
        const self = this;
        values.forEach(value => self.add(value[0], value[1]));
    }

    /**
     * Add key/value pair to the dictionary
     * @date 01/11/2022 - 19:20:52
     *
     * @public
     * @param {TKey} key
     * @param {TValue} value
     */
    public add(key: TKey, value: TValue): void {
        if (this.has(key)) { throw new Error(`Item with key "${key}" exists in collection`) }
        this._dictionary.set(key, value);
        let changeType = this.$changeTypes.Add,
            lastValue = null,
            currentValue = this.get(key);
        this.changed(changeType, key, currentValue, lastValue);
    }

    /**
     * Returns Iterator of the values in the dictionary
     * @date 01/11/2022 - 19:21:27
     *
     * @public
     * @returns {IterableIterator<[TKey, TValue]>}
     */
    public entries(): IterableIterator<[TKey, TValue]> { return this._dictionary.entries(); }

    /**
     * Removes the key/value pair from the dictionary
     * @date 01/11/2022 - 19:21:47
     *
     * @public
     * @param {TKey} key
     */
    public remove(key: TKey): void {
        const self = this;
        if (!self.has(key)) { throw new Error(`Item with key "${key}" does not exist in collection`) }
        let lastValue = self.get(key);
        self._dictionary.delete(key);
        let changeType = self.$changeTypes.Remove,
            currentValue = null;
        self.changed(changeType, key, currentValue, lastValue);
    }

    /**
     * Returns Iterator of the values in the dictionary
     * @date 01/11/2022 - 19:22:03
     *
     * @public
     * @returns {IterableIterator<TValue>}
     */
    public values(): IterableIterator<TValue> { return this._dictionary.values(); }

    /**
     * Clears the dictionary
     * @date 01/11/2022 - 19:22:27
     *
     * @public
     */
    public clear(): void {
        const self = this;
        let changeType = self.$changeTypes.Clear,
            lastValue = null,
            currentValue = null;
        self.changed(changeType, null, currentValue, lastValue);
        return self._dictionary.clear();
    }

    /**
     * Add All key/values from an Array. Throws error if any exist
     * @date 01/11/2022 - 19:22:40
     *
     * @public
     * @param {Array<Mrbr_Collections_KeyValuePair<TKey, TValue>>} pairs
     * @returns {Map<TKey, TValue>}
     */
    public addEach(pairs: Array<Mrbr_Collections_KeyValuePair<TKey, TValue>>): Map<TKey, TValue> {
        const self = this,
            collection = this._dictionary;
        let existingKeys = Array.from(collection.keys()).filter(key => pairs.some(pair => pair.key === key));
        if (existingKeys.length > 0) {
            throw new Error(`Collection already contains keys: ${existingKeys.join(", ")}`);
        }
        pairs.forEach(<TKey, TValue>(key, value) => self.add(key, value))
        return collection
    }

    /**
     * Add or updates All key/values from an Array. Overwrites existing keys
     * @date 01/11/2022 - 19:23:42
     *
     * @public
     * @param {Array<Mrbr_Collections_KeyValuePair<TKey, TValue>>} pairs
     * @returns {Map<TKey, TValue>}
     */
    public merge(pairs: Array<Mrbr_Collections_KeyValuePair<TKey, TValue>>): Map<TKey, TValue> {
        const self = this;
        pairs.forEach(<TKey, TValue>(key, value) => (self.has(key)) ? self.set(key, value) : self.add(key, value))
        return self._dictionary
    }

    /**
     * Removes entries from the dictionary with the specified keys
     * @date 01/11/2022 - 19:24:32
     *
     * @public
     * @param {Array<TKey>} keys
     * @returns {Array<TKey>}
     */
    public removeEach(keys: Array<TKey>): Array<TKey> {
        if (!keys || keys.length === 0) return [];
        const deleted = [];
        for (let keyCounter = 0; keyCounter < keys.length; keyCounter++) {
            if (!this.has(keys[keyCounter])) { continue; }
            this.remove(keys[keyCounter]);
            deleted.push(keys[keyCounter]);
        }
        return deleted;
    }

    /**
     * Iterates over the dictionary and calls the callback function for each key/value pair
     * @date 01/11/2022 - 19:27:53
     *
     * @public
     * @param {(value: TValue, key: TKey, dictionary: Map<TKey, TValue>) => void} callback
     */
    public forEach(callback: (value: TValue, key: TKey, dictionary: Map<TKey, TValue>) => void): void {
        this._dictionary.forEach((value, key, map) => callback(value, key, map));
    }

    /**
     * Return an Iterator to return filtered dictionary key/values
     * @date 01/11/2022 - 19:28:22
     *
     * @public
     * @param {Function} comparator
     * @returns {IterableIterator<IteratorResult<[TKey, TValue]>>}
     */
    public *filter(comparator: Function): IterableIterator<IteratorResult<[TKey, TValue]>> {
        const
            dictionary = this._dictionary,
            iterator = dictionary.entries();
        let next: IteratorResult<[TKey, TValue]> = iterator.next();
        while (!next.done) {
            if (comparator(next.value)) { yield next; }
            next = iterator.next();
        }
    }

    /**
     * Return an Array of filtered dictionary key/values
     * @date 01/11/2022 - 19:29:05
     *
     * @public
     * @param {Function} comparator
     * @returns {Array<[TKey, TValue]>}
     */
    public toFiteredArray(comparator: Function): Array<[TKey, TValue]> {
        const dictionary = this._dictionary;
        const result = [];
        dictionary.forEach((entry: TValue, key: TKey) => {
            if (comparator(entry)) { result.push([key, entry]); }
        });
        return result;
    }

    /**
     * Initializes the component, loads manifest and sets default values
     * @date 01/11/2022 - 19:29:43
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const
            self = this,
            initialisePromise = Mrbr_System_Promise.create<Mrbr_System_IComponent>("Dictionary.initialise");
        !self.$cls.componentManifest && (self.$cls.componentManifest = MrbrBase.mrbrInstance.loadManifest([MrbrBase.MRBR_COMPONENT_MANIFEST]));
        self.$cls.componentManifest
            .then(async () => {
                self._eventSubscribers = await new Mrbr_System_Events_EventSubscribers().initialise() as Mrbr_System_Events_EventSubscribers;
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error));
        return initialisePromise;
    }
    //#endregion Public Methods
}