import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_CheckBox } from "./checkbox";
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

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_CheckBoxEvent.
     * @date 02/01/2023 - 22:30:46
     *
     * @constructor
     * @param {string} eventName
     * @param {Mrbr_UI_Bootstrap_Form_CheckBox} source
     * @param {Mrbr_UI_Bootstrap_Form_CheckBoxEventData} data
     */
    constructor(eventName: string, source: Mrbr_UI_Bootstrap_Form_CheckBox, data: Mrbr_UI_Bootstrap_Form_CheckBoxEventData) {
        super(eventName, source, data);
    }

}