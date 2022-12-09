import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_PaginationEventData } from "./PaginationEventData";

/**
 * Pagination Event
 * @date 09/12/2022 - 03:10:22
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_PaginationEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_PaginationEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_PaginationEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_PaginationEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_PaginationEventData> {
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_PaginationEvent.
     * @date 09/12/2022 - 03:10:34
     *
     * @constructor
     * @param {string} eventName
     * @param {unknown} source
     * @param {Mrbr_UI_Bootstrap_Controls_PaginationEventData} data
     */
    constructor(eventName: string, source: unknown, data: Mrbr_UI_Bootstrap_Controls_PaginationEventData) {
        super(eventName, source, data);
    }
}