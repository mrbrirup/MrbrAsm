export class Mrbr_Collections_DoubleLinkedListNode<T> {
    private _value: T;
    private _previous: Mrbr_Collections_DoubleLinkedListNode<T>;
    private _next: Mrbr_Collections_DoubleLinkedListNode<T>;
    private _key: string;
    constructor(value: T, key?: string) {
        this._value = value;
        this._key = key;
    }
    public get key(): string {
        return this._key;
    }
    public set key(value: string) {
        this._key = value;
    }
    public get value(): T {
        return this._value;
    }
    public set value(value: T) {
        this._value = value;
    }
    public get previous(): Mrbr_Collections_DoubleLinkedListNode<T> {
        return this._previous;
    }
    public set previous(value: Mrbr_Collections_DoubleLinkedListNode<T>) {
        this._previous = value;
    }
    public get next(): Mrbr_Collections_DoubleLinkedListNode<T> {
        return this._next;
    }
    public set next(value: Mrbr_Collections_DoubleLinkedListNode<T>) {
        this._next = value;
    }
}