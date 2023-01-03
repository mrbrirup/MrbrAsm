import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_TextInputEventData } from "./textInputEventData";


/**
 * Text Input Event for Text-based elements 
 * @date 03/01/2023 - 16:11:28
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_TextInputEvent
 * @typedef {Mrbr_UI_Bootstrap_Form_TextInputEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_TextInputEventData>}
 */
export class Mrbr_UI_Bootstrap_Form_TextInputEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_TextInputEventData>{
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_TextInputEvent.
     * @date 03/01/2023 - 16:11:50
     *
     * @constructor
     * @param {string} eventName
     * @param {unknown} source
     * @param {Mrbr_UI_Bootstrap_Form_TextInputEventData} data
     */
    constructor(eventName: string, source: unknown, data: Mrbr_UI_Bootstrap_Form_TextInputEventData) {
        super(eventName, source, data);
    }
}