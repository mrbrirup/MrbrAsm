import { Mrbr_System_Collections_Map } from "../../system/collections/Map";

export class Mrbr_UI_Controls_ElementsMap extends Mrbr_System_Collections_Map<string, HTMLElement> {
    constructor() { super(); }
    public add(key: string, element: HTMLElement): void {
        if (this.has(key)) { return; }
        (element && !element.dataset.mrbrId) && (element.dataset.mrbrId = key)
        this.map.set(key, element);
    }
}