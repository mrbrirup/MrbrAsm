export class Mrbr_Collections_KeyValuePair<TKey, TValue> {
    _key: TKey
    _value: TValue
    constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;
    }

    set key(value: TKey) { this._key = value; }
    get key(): TKey { return this._key }
    set value(value: TValue) { this._value = value; }
    get value(): TValue { return this._value; }
}