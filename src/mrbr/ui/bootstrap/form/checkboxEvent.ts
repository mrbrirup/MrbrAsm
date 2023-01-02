import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_CheckBoxEventData } from "./checkboxEventData";

/**
 * Checkbox event, event fired when the checkbox is changed
 * @date 02/01/2023 - 00:31:24
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_CheckBoxEvent
 * @typedef {Mrbr_UI_Bootstrap_Form_CheckBoxEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_CheckBoxEventData>}
 */
export class Mrbr_UI_Bootstrap_Form_CheckBoxEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_CheckBoxEventData> {
    constructor(eventName: string, source: unknown, data: Mrbr_UI_Bootstrap_Form_CheckBoxEventData) {
        super(eventName, source, data);
    }

}