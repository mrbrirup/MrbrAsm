import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_TabPanelContainer } from "./TabPanelContainer";
import { Mrbr_UI_Bootstrap_Controls_TabPanelEventData } from "./TabPanelEventData";

/**
 * TabPanel Event
 * @date 12/12/2022 - 09:13:28
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_TabPanelEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_TabPanelEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_TabPanelEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_TabPanelEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_TabPanelEventData> {
    constructor(eventName: string, source: Mrbr_UI_Bootstrap_Controls_TabPanelContainer, data: Mrbr_UI_Bootstrap_Controls_TabPanelEventData) {
        super(eventName, source, data);
    }
}