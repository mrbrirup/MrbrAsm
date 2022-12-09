import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_PopoverEventData } from "./PopoverEventData";

/**
 * Popover Event Class
 * @date 09/12/2022 - 09:28:39
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_PopoverEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_PopoverEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_PopoverEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_PopoverEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_PopoverEventData> {
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_PopoverEvent.
     * @date 09/12/2022 - 09:30:03
     *
     * @constructor
     * @param {string} eventName
     * @param {unknown} source
     * @param {Mrbr_UI_Bootstrap_Controls_PopoverEventData} data
     */
    constructor(eventName: string, source: unknown, data: Mrbr_UI_Bootstrap_Controls_PopoverEventData) {
        super(eventName, source, data);
    }

}