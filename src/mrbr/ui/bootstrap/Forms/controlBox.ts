import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../controls/classActions";
import { Mrbr_UI_Bootstrap_Controls_Control } from "../controls/control";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
type ControlBoxControl = {
    name: string,
    src: string,
    eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events

}
export class Mrbr_UI_Bootstrap_Forms_ControlBox extends Mrbr_UI_Bootstrap_Controls_Control {
    static controlBoxClickEventName: string = "controlBox_click";
    constructor() {
        super();
    }

    createControls(): Array<HTMLElement> {

        let toolboxControls: Array<HTMLElement> = [],
            eventTypes = Mrbr_UI_Bootstrap_Forms_ControlBox$Events;
        let controlBoxControls: Array<ControlBoxControl> = [
            { name: "closeButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.close },
            { name: "minButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.minimise },
            { name: "maxButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.maximise },
            { name: "fullScreenButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.fullScreen }
        ]
        const self = this;
        self._controlBoxClickHandler = self.controlBoxClick.bind(self);
        controlBoxControls.forEach(controlBoxControl => {
            let controlBoxControlElement = self.controls[controlBoxControl.name] = document.createElement("button");
            controlBoxControlElement.style.width = "2em";
            controlBoxControlElement.style.height = "2em";
            self.classes(controlBoxControlElement, Mrbr_UI_Bootstrap_Controls_ClassActions.Add, [
                "p-0",
                "btn",
                "ms-1",
                "btn-light",
                "align-self-center",
                "btn-secondary",
                "rounded-0"
            ])
            controlBoxControlElement.setAttribute("type", "button");
            let controlBoxControlImageElement = self.controls[`${controlBoxControl.name}_image`] = document.createElement("img");
            controlBoxControlImageElement.setAttribute("src", "/htmlTest/images/forms/close.svg");

            controlBoxControlImageElement.classList.add("w-100");
            controlBoxControlImageElement.classList.add("h-100");
            controlBoxControlElement.dataset.eventType = controlBoxControl.eventType.toString();
            controlBoxControlElement.appendChild(controlBoxControlImageElement);
            controlBoxControlElement.addEventListener("click", self._controlBoxClickHandler)
            toolboxControls.push(controlBoxControlElement);
        })

        return toolboxControls;

    }
    _controlBoxClickHandler: (mouseEvent: MouseEvent) => any;
    controlBoxClick(mouseEvent: MouseEvent) {
        let eventTypeName = (<HTMLElement>(mouseEvent.target)).dataset.eventType || (<HTMLElement>(mouseEvent.currentTarget)).dataset.eventType;
        if (!eventTypeName) { return; }
        mouseEvent.preventDefault();
        mouseEvent.stopImmediatePropagation();
        let eventType = Mrbr_UI_Bootstrap_Forms_ControlBox$Events[Object.keys(Mrbr_UI_Bootstrap_Forms_ControlBox$Events).find(key => eventTypeName === key)]
        let event = new Mrbr_UI_Bootstrap_Forms_ControlBox$Event(Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxClickEventName, eventType);
        this.dispatchEvent(event);
    }
}