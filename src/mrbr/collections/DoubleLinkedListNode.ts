
/**
 * A node in a double linked list.
 * @date 11/11/2022 - 08:32:04
 *
 * @export
 * @class Mrbr_Collections_DoubleLinkedListNode
 * @typedef {Mrbr_Collections_DoubleLinkedListNode}
 * @template T Type of the Value Property
 */
export class Mrbr_Collections_DoubleLinkedListNode<T> {
    
    /**
     * T Typed value Field
     * @date 11/11/2022 - 08:32:52
     *
     * @private
     * @type {T}
     */
    private _value: T;
    
    /**
     * Previous node in the list Field
     * @date 11/11/2022 - 08:33:11
     *
     * @private
     * @type {Mrbr_Collections_DoubleLinkedListNode<T>}
     */
    private _previous: Mrbr_Collections_DoubleLinkedListNode<T>;
    
    /**
     * Next node in the list Field
     * @date 11/11/2022 - 08:33:21
     *
     * @private
     * @type {Mrbr_Collections_DoubleLinkedListNode<T>}
     */
    private _next: Mrbr_Collections_DoubleLinkedListNode<T>;
    
    /**
     * Node Key Field
     * @date 11/11/2022 - 08:33:29
     *
     * @private
     * @type {string}
     */
    private _key: string;
    
    /**
     * Creates an instance of Mrbr_Collections_DoubleLinkedListNode.
     * @date 11/11/2022 - 08:34:04
     *
     * @constructor
     * @param {T} value
     * @param {?string} [key]
     */
    constructor(value: T, key?: string) {
        this._value = value;
        this._key = key;
    }
    
    /**
     * Node Key
     * @date 11/11/2022 - 08:34:15
     *
     * @public
     * @type {string}
     */
    public get key(): string { return this._key; }
    
    /**
     * Node Key
     */
    public set key(value: string) { this._key = value; }
    
    /**
     * Node Value of type T
     * @date 11/11/2022 - 08:34:33
     *
     * @public
     * @type {T}
     */
    public get value(): T { return this._value; }
    
    /**
     * Node Value of type T
     */
    public set value(value: T) { this._value = value; }
    public get previous(): Mrbr_Collections_DoubleLinkedListNode<T> { return this._previous; }
    
    /**
     * Previous node in the list
     * @date 11/11/2022 - 08:34:51
     *
     * @public
     * @type {Mrbr_Collections_DoubleLinkedListNode<T>}
     */
    public set previous(value: Mrbr_Collections_DoubleLinkedListNode<T>) { this._previous = value; }
    
    /**
     * Next node in the list
     * @date 11/11/2022 - 08:34:57
     *
     * @public
     * @type {Mrbr_Collections_DoubleLinkedListNode<T>}
     */
    public get next(): Mrbr_Collections_DoubleLinkedListNode<T> { return this._next; }
    
    /**
     * Next node in the list
     */
    public set next(value: Mrbr_Collections_DoubleLinkedListNode<T>) { this._next = value; }
}