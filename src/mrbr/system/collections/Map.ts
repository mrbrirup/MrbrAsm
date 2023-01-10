import { Mrbr_System_Object } from "../Object";

export class Mrbr_System_Collections_Map<TKey, TValue> extends Mrbr_System_Object {
    protected _map: Map<TKey, TValue>;
    constructor() { super(); this._map = new Map<TKey, TValue>(); }
    public add(key: TKey, value: TValue): void { throw new Error("Not implemented"); }
    public remove(key: TKey): void { this._map.delete(key); }
    public get(key: TKey): TValue { return this._map.get(key); }
    public clear(): void { this._map.clear(); }
    public keys(): IterableIterator<TKey> { return this._map.keys(); }
    public values(): IterableIterator<TValue> { return this._map.values(); }
    public forEach(callbackfn: (value: TValue, key: TKey, map: Map<TKey, TValue>) => void, thisArg?: any): void { this._map.forEach(callbackfn, thisArg); }
    public has(key: TKey): boolean { return this._map.has(key); }
    public delete(key: TKey): boolean { return this._map.delete(key); }
    public set(key: TKey, value: TValue): this { this._map.set(key, value); return this; }
    public setMultiple(...args: [TKey, TValue][]): this { args.forEach((arg) => this.set(arg[0], arg[1])); return this; }
    public setIfNotExist(key: TKey, value: TValue): this {
        if (this.has(key)) { return this; }
        this.set(key, value); return this;
    }
    public entries(): IterableIterator<[TKey, TValue]> { return this._map.entries(); }
    public get isEmpty(): boolean { return this._map.size === 0; }
    public get map(): Map<TKey, TValue> { return this._map; }
    public get size(): number { return this._map.size; }
    public [Symbol.iterator](): IterableIterator<[TKey, TValue]> { return this._map[Symbol.iterator](); }
    public [Symbol.toStringTag]: string = "Mrbr_System_Collections_Map";
}