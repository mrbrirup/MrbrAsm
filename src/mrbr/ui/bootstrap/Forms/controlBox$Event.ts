import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";

export class Mrbr_UI_Bootstrap_Forms_ControlBox$Event extends CustomEvent<Mrbr_UI_Bootstrap_Forms_ControlBox$Events> {
    constructor(eventName, eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events) {
        super(eventName, { detail: eventType })
    }
}