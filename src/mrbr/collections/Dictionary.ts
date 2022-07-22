import { Mrbr_Collections_KeyValuePair } from "./KeyValuePair";

export class Mrbr_Collections_Dictionary<TKey, TValue> extends EventTarget {
    static changeEvent = "dictionaryChangeEvent";
    static addChange = "add";
    static removeChange = "remove";
    static updateChange = "update";
    static clearChange = "clear";
    //_dictionary: Map<TKey, TValue> = new Map();
    _dictionary: Map<TKey, TValue>;
    index: Map<TKey, TValue>
    get dictionary() { return this.index; }

    constructor(sourceMap?: Map<TKey, TValue>) {
        super();
        const self = this;
        if(sourceMap){
            self._dictionary = sourceMap;
        }
        else{
            this._dictionary = new Map<TKey,TValue>();
        }
        self.index =
            new Proxy(
                self._dictionary,
                {
                    get(target, name) {
                        return (target.has(((name as unknown) as TKey))) ? target.get(((name as unknown) as TKey)) : undefined;
                    },
                    set(target, name, value) {
                        target.set(((name as unknown) as TKey), value);
                        return true;
                    }
                }
            )
    }
    changed(changeType, value, previousValue) {
        const self = this,
            changeEventName = (self.constructor as any).changeEvent,
            changeEvent = new CustomEvent(changeEventName, { detail: { change: changeType, entry: value } });
        self.dispatchEvent(changeEvent);
    }
    get length() {
        var self = this;
        return self._dictionary.size;
    }
    has(key: TKey): boolean { return this._dictionary.has(key) }
    get(key: TKey): TValue { return this._dictionary.get(key) }
    set(key: TKey, value: TValue) {
        const self = this;
        let changeType,
            lastValue;
        if (self.has(key)) {
            changeType = (self.constructor as any).updateChange;
            lastValue = self.get(key);
        }
        else {
            changeType = (self.constructor as any).addChange;
            lastValue = null;
        }
        self._dictionary.set(key, value);
        let currentValue = self.get(key);
        self.changed(changeType, currentValue, lastValue);
    }
    add(key: TKey, value: TValue) {
        const self = this;
        if (self.has(key)) {
            throw new Error(`Item with key "${key}" exists in collection`)
        }
        else {
            this._dictionary.set(key, value)
        }

        let changeType = (self.constructor as any).addChange,
            lastValue = null,
            currentValue = self.get(key);
        self.changed(changeType, currentValue, lastValue);
    }
    entries() {
        return this._dictionary.entries();
    }
    remove(key: TKey) {
        const self = this;
        let changeType = (self.constructor as any).removeChange,
            lastValue,
            currentValue = self.get(key);
        if (self.has(key)) {
            lastValue = self._dictionary.get(key)
        }
        else {
            currentValue = null;
        }
        self.changed(changeType, currentValue, lastValue);
        return lastValue;
    }
    get keysToArray() {
        return Array.from(this._dictionary.keys());
    }
    get toArray() {
        var collectionArray = {};
        return this._dictionary.forEach((key, value) => collectionArray[key.toString()] = value);
    }
    get keys() {
        return this._dictionary.keys();
    }
    values() {
        return this._dictionary.values();
    }
    clear() {

        const self = this;
        let changeType = (self.constructor as any).clear,
            lastValue = null,
            currentValue = null;
        self.changed(changeType, currentValue, lastValue);
        return self._dictionary.clear();
    }
    addEach(pairs: Array<Mrbr_Collections_KeyValuePair<TKey, TValue>>) {
        const self = this,
            collection = this._dictionary;
        pairs.forEach((key, value) => {
            if (collection.has((key as unknown) as TKey)) {
                throw new Error(`Key "${key}" already exists in collection`)
            }
        })
        pairs.forEach((key, value) => {
            self.add(((key as unknown) as TKey), ((value as unknown) as TValue))
        })
        return collection
    }
    merge(pairs: Array<Mrbr_Collections_KeyValuePair<TKey, TValue>>) {
        const self = this,
            collection = this._dictionary;


        pairs.forEach((key, value) => {
            if (self.has(((key as unknown) as TKey))) {
                self.set(((key as unknown) as TKey), ((value as unknown) as TValue))
            }
            else {
                self.add(((key as unknown) as TKey), ((value as unknown) as TValue))
            }
        })
        return collection
    }
    removeEach(keys) {
        var deleted = [];
        var self = this,
            collection = self._dictionary
        keys.forEach(key => {
            if (self.has(key)) {
                self.remove(key);
                deleted.push(key);
            }
        })
        return deleted;
    }
    forEach(callback: Function) {
        var collection = this._dictionary;
        collection.forEach(entry => callback(entry));
    }
    *filter(comparator: Function) {
        const dictionary = this._dictionary;
        const iterator = dictionary.entries();
        let next = iterator.next();
        while (!next.done) {
            if (comparator(next.value)) {
                yield next;
            }
            next = iterator.next();
        }
    }
    toFiteredArray(comparator: Function) {
        const dictionary = this._dictionary;
        let result = {};
        dictionary.forEach(entry => {
            if (comparator(entry)) {
                result[entry[0]] = entry[1];
            }
        });
        return result;
    }
}