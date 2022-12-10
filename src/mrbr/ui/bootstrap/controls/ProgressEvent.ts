import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_ProgressEventData } from "./ProgressEventData";

/**
 * Progress Event. Fired when the progress changes.
 * @date 10/12/2022 - 07:34:54
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ProgressEvent
 * @typedef {Mrbr_UI_Bootstrap_Controls_ProgressEvent}
 * @extends {Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ProgressEventData>}
 */
export class Mrbr_UI_Bootstrap_Controls_ProgressEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ProgressEventData> {
    constructor(eventName: string, source: unknown, data: Mrbr_UI_Bootstrap_Controls_ProgressEventData) {
        super(eventName, source, data);
    }
}