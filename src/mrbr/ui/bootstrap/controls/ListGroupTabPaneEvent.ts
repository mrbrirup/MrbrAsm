import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData } from "./ListGroupTabPaneEventData";

/**
 * TabPane Event of TabPaneEventData
 * @date 04/12/2022 - 06:41:49
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData> {
    constructor(type: string, source: unknown, data: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData) {
        super(type, source, data);
    }
}