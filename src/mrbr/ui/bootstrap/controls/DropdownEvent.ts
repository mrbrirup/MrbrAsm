import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_DropdownEventData } from "./DropdownEventData";

/**
 * Dropdown Event
 * @date 02/12/2022 - 01:58:38
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_DropdownEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_DropdownEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_DropdownEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_DropdownEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_DropdownEventData>{
    constructor(type: string, source: unknown, data: Mrbr_UI_Bootstrap_Controls_DropdownEventData) {
        super(type, source, data);
    }
}