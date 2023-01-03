import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_FileInput } from "./fileInput";
import { Mrbr_UI_Bootstrap_Form_FileInputEventData } from "./fileInputEventData";

/**
 * File Input Event
 * @date 03/01/2023 - 15:37:12
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_FileInputEvent
 * @typedef {Mrbr_UI_Bootstrap_Form_FileInputEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_FileInputEventData>}
 */
export class Mrbr_UI_Bootstrap_Form_FileInputEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Form_FileInputEventData>{
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_FileInputEvent.
     * @date 03/01/2023 - 15:38:16
     *
     * @constructor
     * @param {string} eventName
     * @param {Mrbr_UI_Bootstrap_Form_FileInput} source
     * @param {*} data
     */
    constructor(eventName: string, source: Mrbr_UI_Bootstrap_Form_FileInput, data: any) {
        super(eventName, source, data);
    }
}