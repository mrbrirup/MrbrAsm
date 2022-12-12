import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_Toast } from "./Toast";
import { Mrbr_UI_Bootstrap_Controls_ToastEventData } from "./ToastEventData";


/**
 * Boostrap Toast Event Class
 * @date 12/12/2022 - 14:55:29
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ToastEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_ToastEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ToastEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_ToastEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ToastEventData> {

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ToastEvent.
     * @date 12/12/2022 - 14:55:49
     *
     * @constructor
     * @param {string} eventName
     * @param {Mrbr_UI_Bootstrap_Controls_Toast} source
     * @param {Mrbr_UI_Bootstrap_Controls_ToastEventData} data
     */
    constructor(eventName: string, source: Mrbr_UI_Bootstrap_Controls_Toast, data: Mrbr_UI_Bootstrap_Controls_ToastEventData) {
        super(eventName, source, data);
    }
}