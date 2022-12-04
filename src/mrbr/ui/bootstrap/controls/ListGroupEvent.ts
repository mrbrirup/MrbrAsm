import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_ListGroupEventData } from "./ListGroupEventData";


/**
 * Event for the ListGroupItem events.
 * @date 03/12/2022 - 17:28:33
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ListGroupEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_ListGroupEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ListGroupEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_ListGroupEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ListGroupEventData>{
    constructor(type: string, source: unknown, data: Mrbr_UI_Bootstrap_Controls_ListGroupEventData) { super(type, source, data); }
}