import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../controls/classActions";
import { Mrbr_UI_Bootstrap_Controls_Control } from "../controls/control";
import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "../controls/ControlConfig";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
type ControlBoxControl = {
    name: string,
    src: string,
    eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events,
    order: number
}
export class Mrbr_UI_Bootstrap_Forms_ControlBox extends Mrbr_UI_Bootstrap_Controls_Control {
    static controlBoxClickEventName: string = "controlBox_click";
    constructor(rootElementName: string) {
        super(rootElementName);
        this.createControls();
    }

    createControls() {

        const self = this,
            ctrlCfg = Mrbr_UI_Bootstrap_Controls_ControlConfig,
            eventTypes = Mrbr_UI_Bootstrap_Forms_ControlBox$Events;
        this.createElement(new ctrlCfg(this.rootElementName, "div", {
            classes: ["p-2 align-self-center"]
        }));
        let controlBoxControls: Array<ControlBoxControl> = [
            { name: "closeButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.close, order: 1 },
            { name: "minButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.minimise, order: 2 },
            { name: "maxButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.maximise, order: 3 },
            { name: "fullScreenButton", src: "/htmlTest/images/forms/close.svg", eventType: eventTypes.fullScreen, order: 4 }
        ]
        self._controlBoxClickHandler = self.controlBoxClick.bind(self);
        controlBoxControls.forEach(controlBoxControl => {
            let controlBoxControlElement = <HTMLElement>self.createElement(new ctrlCfg(controlBoxControl.name, "button",
                {
                    styles: { width: "2em" },
                    classes: ["p-0", "btn", "ms-1", "btn-light", "btn-secondary", "rounded-0"],
                    attributes: { type: "button" },
                    children: [
                        new ctrlCfg(`${controlBoxControl.name}_image`, "img",
                            {
                                attributes: { src: "/htmlTest/images/forms/close.svg" },
                                classes: ["w-100", "h-100"],
                                data: {
                                    eventType: controlBoxControl.eventType.toString(),
                                    order: controlBoxControl.order.toString()
                                }

                            })
                    ]
                }));
            controlBoxControlElement.addEventListener("click", self._controlBoxClickHandler)
            this.rootElement.appendChild(controlBoxControlElement);
        })
        Array.from(self.rootElement.children).sort((a, b) => parseInt((<HTMLElement>a).dataset.order) > parseInt((<HTMLElement>b).dataset.order) ? 1 : -1).forEach(element => self.rootElement.appendChild(element))
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