import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_ScrollspyEventData } from "./ScrollspyEventData";

/**
 * Scrollspy event
 * @date 11/12/2022 - 04:39:50
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ScrollspyEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_ScrollspyEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ScrollspyEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_ScrollspyEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ScrollspyEventData> {
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ScrollspyEvent.
     * @date 11/12/2022 - 04:41:40
     *
     * @constructor
     * @param {string} eventName
     * @param {unknown} source Scrollspy instance
     * @param {Mrbr_UI_Bootstrap_Controls_ScrollspyEventData} data
     */
    constructor(eventName: string, source: unknown, data: Mrbr_UI_Bootstrap_Controls_ScrollspyEventData) {
        super(eventName, source, data);
    }
} 