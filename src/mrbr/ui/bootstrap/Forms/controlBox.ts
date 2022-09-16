import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
import { Mrbr_UI_Bootstrap_Forms_Dialog$States } from "./Dialog$States";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
type ControlBoxControl = {
    name: string,
    src: string,
    imageName: string,
    eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events,
    order: number
}
export class Mrbr_UI_Bootstrap_Forms_ControlBox extends Mrbr_UI_Controls_Control {
    static CONTROL_BOX_CLICK_EVENT_NAME: string = "controlbox_click";
    public controlBoxControls: object = {
        close: { name: "close_button", imageName: "close_image", src: `mrbr/images/forms/close.svg`, eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events.close, order: 1 },
        minimise: { name: "minimise_button", imageName: "minimise_image", src: "mrbr/images/forms/minimise.svg", eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events.minimise, order: 2 },
        maximise: { name: "maximise_button", imageName: "maximise_image", src: "mrbr/images/forms/maximise.svg", eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events.maximise, order: 3 },
        fullscreen: { name: "fullscreen_button", imageName: "fullscreen_image", src: "mrbr/images/forms/fullscreen.svg", eventType: Mrbr_UI_Bootstrap_Forms_ControlBox$Events.fullScreen, order: 4 }
    }
    private _dialogState: Mrbr_UI_Bootstrap_Forms_Dialog$States;
    private _lastDialogState: Mrbr_UI_Bootstrap_Forms_Dialog$States;
    constructor(rootElementName: string) {
        super(rootElementName);

        //this.createControls();
    }
    initialise(...args): Mrbr_System_MrbrPromise<any> {
        const retval = Mrbr_System_MrbrPromise.CreateMrbrPromise("");
        super.initialise(args)
            .then(_ => {
                this.createControls();
                retval.resolve(this);
            })
        return retval;
    }


    protected _controlBoxConfig(): Mrbr_UI_Controls_ControlConfig {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        return new ctrlCfg(this.rootElementName, "div",
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes(["btn-group p-1"])
        );
    }

    protected _controlButtonConfig(): Mrbr_UI_Controls_ControlConfig {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;

        return new ctrlCfg("", "button",
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes(["btn", "btn-dark", "px-1"])
                .Attributes({ type: "button" })
        );
    }


    protected _controlImageConfig(): Mrbr_UI_Controls_ControlConfig {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;

        return new ctrlCfg("", "img",
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes(["w-100", "h-100", "mrbr-invert-color", "p-1"])
                .Styles({ "pointerEvents": "none" })
        );
    }


    public get controlBoxConfig(): Mrbr_UI_Controls_ControlConfig {
        return this._controlBoxConfig();
    }
    public get controlButtonConfig(): Mrbr_UI_Controls_ControlConfig {
        return this._controlButtonConfig();
    }
    public get controlImageConfig(): Mrbr_UI_Controls_ControlConfig {
        return this._controlImageConfig();
    }



    createControls() {

        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            eventTypes = Mrbr_UI_Bootstrap_Forms_ControlBox$Events,
            ctrlBoxControls = self.controlBoxControls;
        self.createControlBox();
        self.maximiseBox = self.maximiseBox;
        self.minimiseBox = self.minimiseBox;
        self.fullScreenBox = self.fullScreenBox;
        self.closeBox = self.closeBox;
        self.events[Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
            eventName: "click",
            eventTarget: self.rootElement,
            event: self.controlBoxClick,
            context: self
        };
    }

    sortControlBoxControls() {
        const self = this,
            controlBoxControls = self.controlBoxControls;
        Object.keys(controlBoxControls).map(key => {
            return controlBoxControls[key]
        }).sort((a: ControlBoxControl, b: ControlBoxControl) => - a.order + b.order).forEach(element => {
            if (self.elements[element]) { self.rootElement.appendChild(self.elements[element]) }
        })
    }
    controlBoxClick(mouseEvent: MouseEvent) {
        console.log(mouseEvent);
        let eventTypeName = Mrbr_UI_Bootstrap_Forms_ControlBox$Events[parseInt((<HTMLElement>(mouseEvent.target)).dataset.eventType || (<HTMLElement>(mouseEvent.currentTarget)).dataset.eventType)];
        if (!eventTypeName) { return; }
        mouseEvent.stopImmediatePropagation();
        let eventType = Mrbr_UI_Bootstrap_Forms_ControlBox$Events[Object.keys(Mrbr_UI_Bootstrap_Forms_ControlBox$Events).find(key => eventTypeName === key)];
        let event = new Mrbr_UI_Bootstrap_Forms_ControlBox$Event(Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME, eventType);
        this.dispatchEvent(event);
    }
    createControlBox() {
        const self = this;
        self.createElement(self.controlBoxConfig);
    }
    addControlButton(name: string) {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        if (self.elements[name] && self.elements[name].classList.contains("d-none")) {
            self.classes(self.elements[name], Mrbr_UI_Bootstrap_Controls_ClassActions.Remove, "d-none")
            return;
        }
        const controlBoxControl: ControlBoxControl = self.controlBoxControls[name],
            imageConfig = self.controlImageConfig,
            buttonConfig: Mrbr_UI_Controls_ControlConfig = self.controlButtonConfig,
            buttonData = buttonConfig.data || {};
        buttonConfig.elementName = name;
        imageConfig.elementName = controlBoxControl.imageName;
        imageConfig.attributes = imageConfig.attributes || {};
        Object.assign(imageConfig.attributes, { src: `${MrbrBase.mrbrInstance.paths.get("Mrbr")}${controlBoxControl.src}` });

        Object.assign(buttonConfig, {
            data: Object.assign(buttonData, {
                eventType: controlBoxControl.eventType.toString(),
                order: controlBoxControl.order.toString()
            }),
            children: [...buttonConfig.children || [], imageConfig]
        });
        self.rootElement.appendChild(<HTMLElement>self.createElement(buttonConfig));
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
        if (!(this.rootElement)) { return; }
        value === true ? this.addControlButton("fullscreen") : this.removeControlButton("fullscreen");
        this.sortControlBoxControls()
    }

    public get closeBox(): boolean {
        return this._closeBox;
    }
    public set closeBox(value: boolean) {
        this._closeBox = value;
        if (!(this.rootElement)) { return; }
        value === true ? this.addControlButton("close") : this.removeControlButton("close");
        this.sortControlBoxControls()
    }

    public get maximiseBox(): boolean {
        return this._maximiseBox;
    }
    public set maximiseBox(value: boolean) {
        this._maximiseBox = value;
        if (!(this.rootElement)) { return; }
        value === true ? this.addControlButton("maximise") : this.removeControlButton("maximise");
        this.sortControlBoxControls()
    }

    public get minimiseBox(): boolean {
        return this._minimiseBox;
    }
    public set minimiseBox(value: boolean) {
        this._minimiseBox = value;
        if (!(this.rootElement)) { return; }
        value === true ? this.addControlButton("minimise") : this.removeControlButton("minimise");
        this.sortControlBoxControls()
    }
    public get dialogState(): Mrbr_UI_Bootstrap_Forms_Dialog$States {
        return this._dialogState;
    }
    public set dialogState(value: Mrbr_UI_Bootstrap_Forms_Dialog$States) {
        const self = this,
            states = Mrbr_UI_Bootstrap_Forms_Dialog$States,
            classActions = Mrbr_UI_Bootstrap_Controls_ClassActions,
            rootPath = MrbrBase.mrbrInstance.paths.get("Mrbr");
        self._dialogState = value
        switch (value) {
            case states.FullScreen:
                if (self.elements["fullscreen"]) { self.attributes(self.elements["fullscreen_image"], { src: `${rootPath}mrbr/images/forms/fullscreenRestore.svg` }); }
                setTimeout(() => {
                    if (self.elements["maximise"]) { self.classes(self.elements["maximise"], classActions.Add, "d-none"); }
                }, 0);
                break;
            case states.Maximised:
                if (self.elements["maximise"]) { self.attributes(self.elements["maximise_image"], { src: `${rootPath}mrbr/images/forms/restoreWindow.svg` }); }
                break;
            case states.Minimised:
                break;
            case states.Normal:
                if (self.elements["maximise"]) { self.attributes(self.elements["maximise_image"], { src: `${rootPath}mrbr/images/forms/maximise.svg` }); }
                if (self.elements["fullscreen"]) { self.attributes(self.elements["fullscreen_image"], { src: `${rootPath}mrbr/images/forms/fullscreen.svg` }); }
                setTimeout(() => {
                    if (self.elements["maximise"]) { self.classes(self.elements["maximise"], classActions.Remove, "d-none"); }
                    if (self.elements["fullscreen"]) { self.classes(self.elements["fullscreen"], classActions.Remove, "d-none"); }
                }, 0);
                break;
        }
    }
}