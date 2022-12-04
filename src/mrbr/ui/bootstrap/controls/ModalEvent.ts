import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_ModalEvents } from "./ModalEvents";
import { Mrbr_UI_Bootstrap_Controls_ModalEventData } from "./ModalEventData";

export class Mrbr_UI_Bootstrap_Controls_ModalEvent extends Mrbr_System_Events_Event<Mrbr_UI_Bootstrap_Controls_ModalEventData> {
    constructor(type: Mrbr_UI_Bootstrap_Controls_ModalEvents, source: unknown, data: Mrbr_UI_Bootstrap_Controls_ModalEventData) {
        super(type, source, data);
    }

}