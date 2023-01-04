import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_SelectInputEventData } from "./selectInputEventData";

export class Mrbr_UI_Bootstrap_Form_SelectInputEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_SelectInputEventData> {

    constructor(eventName: string, source: unknown, data: Mrbr_UI_Bootstrap_Form_SelectInputEventData) {
        super(eventName, source, data);
    }

}