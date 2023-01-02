import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_Radio } from "./radio";
import { Mrbr_UI_Bootstrap_Form_RadioEventData } from "./radioEventData";


/**
 * Radio Event
 * @date 02/01/2023 - 22:59:15
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_RadioEvent
 * @typedef {Mrbr_UI_Bootstrap_Form_RadioEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_RadioEventData>}
 */
export class Mrbr_UI_Bootstrap_Form_RadioEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_RadioEventData> {
    constructor(eventName: string, source: Mrbr_UI_Bootstrap_Form_Radio, data: Mrbr_UI_Bootstrap_Form_RadioEventData) {
        super(eventName, source, data);

    }
}