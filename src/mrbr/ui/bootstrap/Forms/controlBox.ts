import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
type ControlBoxControl = {
    name: string,
    src: string,
    imageName: string,
    eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events,
    order: number
}
export class Mrbr_UI_Bootstrap_Forms_ControlBox extends Mrbr_UI_Controls_Control {
    static CONTROL_BOX_CLICK_EVENT_NAME: string = "controlbox_click";
    public static controlBoxControls: object = {
        close: { name: "close_button", imageName: "close_image", src: "/htmlTest/images/forms/close.svg", eventType: 4, order: 1 },
        minimise: { name: "minimise_button", imageName: "minimise_image", src: "/htmlTest/images/forms/minimise.svg", eventType: 2, order: 2 },
        maximise: { name: "maximise_button", imageName: "maximise_image", src: "/htmlTest/images/forms/maximise.svg", eventType: 1, order: 3 },
        fullscreen: { name: "fullscreen_button", imageName: "fullscreen_image", src: "/htmlTest/images/forms/fullscreen.svg", eventType: 3, order: 4 }
    }

    constructor(rootElementName: string) {
        super(rootElementName);

        this.createControls();
    }

    createControls() {

        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            eventTypes = Mrbr_UI_Bootstrap_Forms_ControlBox$Events,
            ctrlBoxControls = Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxControls;
        self.createControlBox();
        let controlBoxControls: Array<string> = [];
        if (self.closeBox === true) { "close" }
        if (self.minimiseBox === true) { "minimise" }
        if (self.maximiseBox === true) { "maximise" }
        if (self.fullScreenBox === true) { "fullscreen" };

        controlBoxControls.sort((a: string, b: string) => - ctrlBoxControls[a].order + ctrlBoxControls[b].order).forEach(element => self.rootElement.appendChild(self.elements[element]))
        controlBoxControls.forEach(controlBoxControl => self.addControlButton(controlBoxControl))

        self.events[Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
            eventName: "click",
            eventTarget: self.rootElement,
            event: self.controlBoxClick,
            context: self
        };
    }
    controlBoxClick(mouseEvent: MouseEvent) {
        console.log(mouseEvent);
        let eventTypeName = (<HTMLElement>(mouseEvent.target)).dataset.eventType || (<HTMLElement>(mouseEvent.currentTarget)).dataset.eventType;
        if (!eventTypeName) { return; }
        mouseEvent.stopImmediatePropagation();
        let eventType = Mrbr_UI_Bootstrap_Forms_ControlBox$Events[Object.keys(Mrbr_UI_Bootstrap_Forms_ControlBox$Events).find(key => eventTypeName === key)]
        let event = new Mrbr_UI_Bootstrap_Forms_ControlBox$Event(Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME, eventType);
        this.dispatchEvent(event);
    }
    createControlBox() {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            eventTypes = Mrbr_UI_Bootstrap_Forms_ControlBox$Events;
        self.createElement(new ctrlCfg(this.rootElementName, "div", {
            classes: ["btn-group p-1"]
        }));
    }
    addControlButton(name: string) {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        if (self.elements[`${name}_button`]) {
            if (self.elements[`${name}_button`].hasClass("d-none")) {
                self.classes(self.elements[`${name}_button`], Mrbr_UI_Bootstrap_Controls_ClassActions.Remove, "d-none")
            }
            return;
        }
        let controlBoxControl: ControlBoxControl = Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxControls[name];
        let controlBoxControlElement = <HTMLElement>self.createElement(new ctrlCfg(name, "button",
            {
                classes: ["btn", "btn-dark"],
                attributes: { type: "button" },
                data: {
                    eventType: controlBoxControl.eventType.toString(),
                    order: controlBoxControl.order.toString()
                },
                children: [
                    new ctrlCfg(controlBoxControl.imageName, "img",
                        {
                            attributes: {
                                src: controlBoxControl.src
                            },
                            classes: ["w-100", "h-100", "mrbr-invert-color"],
                            styles: { "pointerEvents": "none" }
                        })
                ]
            }));
        self.rootElement.appendChild(controlBoxControlElement);
    }

    removeControlButton(name: string) {
        const self = this;
        if (self.elements[name]) {
            self.classes(self.elements[name], Mrbr_UI_Bootstrap_Controls_ClassActions.Add, "d-none")
        }
    }

    private _minimiseBox: boolean = false;
    private _maximiseBox: boolean = false;
    private _closeBox: boolean = true;
    private _fullScreenBox: boolean = false;
    public get fullScreenBox(): boolean {
        return this._fullScreenBox;
    }
    public set fullScreenBox(value: boolean) {
        this._fullScreenBox = value;
        value === true ? this.addControlButton("fullscreen") : this.removeControlButton("fullscreen");
    }

    public get closeBox(): boolean {
        return this._closeBox;
    }
    public set closeBox(value: boolean) {
        this._closeBox = value;
        value === true ? this.addControlButton("close") : this.removeControlButton("close");
    }

    public get maximiseBox(): boolean {
        return this._maximiseBox;
    }
    public set maximiseBox(value: boolean) {
        this._maximiseBox = value;
        value === true ? this.addControlButton("maximise") : this.removeControlButton("maximise");
    }

    public get minimiseBox(): boolean {
        return this._minimiseBox;
    }
    public set minimiseBox(value: boolean) {
        this._minimiseBox = value;
        value === true ? this.addControlButton("minimise") : this.removeControlButton("minimise");
    }



}