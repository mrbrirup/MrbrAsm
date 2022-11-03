import { Mrbr_System_Collections_Map } from "../../system/collections/Map";
import { Mrbr_UI_Controls_Control } from "./Control";


/**
 * A map of controls.
 * @date 03/11/2022 - 05:31:50
 *
 * @export
 * @class Mrbr_UI_Controls_ControlsMap
 * @typedef {Mrbr_UI_Controls_ControlsMap}
 * @extends {Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_Control>}
 */
export class Mrbr_UI_Controls_ControlsMap extends Mrbr_System_Collections_Map<string, Mrbr_UI_Controls_Control>{
    constructor() { super(); }
}
