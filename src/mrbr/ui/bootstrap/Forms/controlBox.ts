import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_EventHandler } from "../controls/EventHandler";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
type ControlBoxControl = {
    name: string,
    src: string,
    eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events,
    order: number
}
export class Mrbr_UI_Bootstrap_Forms_ControlBox extends Mrbr_UI_Controls_Control {
    static controlBoxClickEventName: string = "controlBox_click";
    constructor(rootElementName: string) {
        super(rootElementName);
        this.createControls();
    }

    createControls() {

        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            eventTypes = Mrbr_UI_Bootstrap_Forms_ControlBox$Events;
        this.createElement(new ctrlCfg(this.rootElementName, "div", {
            classes: ["btn-group p-1"]
        }));
        let controlBoxControls: Array<ControlBoxControl> = [
            { name: "closeButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.close, order: 1 },
            { name: "minButton", src: "/htmlTest/images/forms/minimise.svg", eventType: eventTypes.minimise, order: 2 },
            { name: "maxButton", src: "/htmlTest/images/forms/maximise.svg", eventType: eventTypes.maximise, order: 3 },
            { name: "fullScreenButton", src: "/htmlTest/images/forms/fullscreen.svg", eventType: eventTypes.fullScreen, order: 4 }
        ]
        controlBoxControls.forEach(controlBoxControl => {
            let controlBoxControlElement = <HTMLElement>self.createElement(new ctrlCfg(controlBoxControl.name, "button",
                {
                    classes: ["btn", "btn-dark"],
                    attributes: { type: "button" },
                    data: {
                        eventType: controlBoxControl.eventType.toString(),
                        order: controlBoxControl.order.toString()
                    },
                    children: [
                        new ctrlCfg(`${controlBoxControl.name}_image`, "img",
                            {
                                attributes: {
                                    src: controlBoxControl.src
                                },
                                classes: ["w-100", "h-100", "mrbr-invert-color"],

                            })
                    ]
                }));
            self.events[`${controlBoxControl.name}_click`] = <Mrbr_UI_Controls_EventHandler>{
                eventName: `click`,
                eventTarget: controlBoxControlElement,
                event: self.controlBoxClick.bind(self),
                context: self
            };
            this.rootElement.appendChild(controlBoxControlElement);
        })

        controlBoxControls.sort((a: ControlBoxControl, b: ControlBoxControl) => - a.order + b.order).forEach(element => self.rootElement.appendChild(self.elements[element.name]))
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