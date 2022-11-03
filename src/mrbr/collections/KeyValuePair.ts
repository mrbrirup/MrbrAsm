
/**
 * Represents a key/value pair that can be set or retrieved.
 * @date 02/11/2022 - 06:20:59
 *
 * @export
 * @class Mrbr_Collections_KeyValuePair
 * @typedef {Mrbr_Collections_KeyValuePair}
 * @template TKey
 * @template TValue
 */
export class Mrbr_Collections_KeyValuePair<TKey, TValue> {
    
    /**
     * Key field
     * @date 02/11/2022 - 06:21:11
     *
     * @type {TKey}
     */
    _key: TKey      
    
    /**
     * Value field
     * @date 02/11/2022 - 06:21:26
     *
     * @type {TValue}
     */
    _value: TValue
    
    /**
     * Creates an instance of Mrbr_Collections_KeyValuePair.
     * @date 02/11/2022 - 06:21:34
     *
     * @constructor
     * @param {TKey} key
     * @param {TValue} value
     */
    constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;
    }
    
    /**
     * Key
     * @date 02/11/2022 - 06:21:40
     *
     * @type {TKey}
     */
    set key(value: TKey) { this._key = value; }
    
    /**
     * Key
     */
    get key(): TKey { return this._key }
    
    /**
     * Value
     * @date 02/11/2022 - 06:22:05
     *
     * @type {TValue}
     */
    set value(value: TValue) { this._value = value; }
    
    /**
     * Value
     */
    get value(): TValue { return this._value; }
}