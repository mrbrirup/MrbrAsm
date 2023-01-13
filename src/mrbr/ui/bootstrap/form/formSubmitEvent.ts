import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_Form } from "./form";
import { Mrbr_UI_Bootstrap_Form_FormSubmitEventData } from "./formSubmitEventData";

/**
 * Form Submit Event
 * @date 13/01/2023 - 07:25:08
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_FormSubmitEvent
 * @typedef {Mrbr_UI_Bootstrap_Form_FormSubmitEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_FormSubmitEventData>}
 */
export class Mrbr_UI_Bootstrap_Form_FormSubmitEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_FormSubmitEventData> {
    constructor(eventName: string, sender: Mrbr_UI_Bootstrap_Form_Form, event: Mrbr_UI_Bootstrap_Form_FormSubmitEventData) {
        super(eventName, sender, event);
    }
}