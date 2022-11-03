import { Mrbr_System_Collections_Map } from "../../system/collections/Map";

/**
 * A map of elements.
 * @date 03/11/2022 - 05:30:51
 *
 * @export
 * @class Mrbr_UI_Controls_ElementsMap
 * @typedef {Mrbr_UI_Controls_ElementsMap}
 * @extends {Mrbr_System_Collections_Map<string, HTMLElement>}
 */
export class Mrbr_UI_Controls_ElementsMap extends Mrbr_System_Collections_Map<string, HTMLElement> {
    constructor() { super(); }
    
    /**
     * Adds an element to the map and adds data-mrbr-id
     * @date 03/11/2022 - 05:31:05
     *
     * @public
     * @param {string} key
     * @param {HTMLElement} element
     */
    public add(key: string, element: HTMLElement): void {
        if (this.has(key)) { return; }
        (element && !element.dataset.mrbrId) && (element.dataset.mrbrId = key)
        this.map.set(key, element);
    }
}