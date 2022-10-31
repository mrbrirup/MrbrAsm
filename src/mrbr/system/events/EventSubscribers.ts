import { Mrbr_System_Collections_Map } from "../collections/Map";
import { Mrbr_System_MrbrPromise } from "../MrbrPromise";
import { Mrbr_System_Object } from "../Object";

export class Mrbr_System_Events_EventSubscribers extends Mrbr_System_Object {
    private _map: Mrbr_System_Collections_Map<string, Map<number, ((source: object, event: object, data: object) => void)>>
    private eventKey: number = 0;
    constructor() { super(); }
    initialise(...args): Mrbr_System_MrbrPromise<Mrbr_System_Events_EventSubscribers> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_System_Events_EventSubscribers>("Mrbr_System_Events_EventSubscriber.initialise");
        self.$mrbrBase.mrbrInstance.loadManifest([self.$mrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(() => {
                self._map = new Mrbr_System_Collections_Map<string, any>();
                initalisePromise.resolve(self);
            })
        return initalisePromise;
    }
    public add(key: string, callback: (source: any, event: any, data: any) => void): number {
        const self = this;
        if (!self._map.has(key)) {
            self._map.add(key, new Map<number, (source: object, event: object, data: object) => void>());
        }
        let nextKey = self.eventKey++;
        self._map.get(key).set(nextKey, callback);
        return nextKey;
    }
    public remove(key: string, eventKey: number): void {
        const self = this;
        if (!self._map.has(key)) { return; }
        self._map.get(key).delete(eventKey);
    }
    public clear(key: string): void {
        const self = this;
        if (!self._map.has(key)) { return; }
        self._map.get(key).clear();
    }
    public clearAll(): void {
        const self = this;
        self._map.clear();
    }
    public get map(): Mrbr_System_Collections_Map<string, Map<number, (source: object, event: object, data: object) => void>> { return this._map; }
    public get isEmpty(): boolean { return this._map.isEmpty; }
    public get size(): number { return this._map.size; }
    public get [Symbol.toStringTag](): string { return "Mrbr_System_Events_EventSubscriber"; }
    public raise(key: string, event: object, ...args): void {
        const self = this;
        if (!self._map.has(key)) { return; }
        self._map.get(key).forEach((callback) => {
            callback(this, event, args);
        });
    }
}