import { Mrbr_Geometry_Bounds2d } from "../../../geometry/bounds2d";
import { Mrbr_Geometry_Point2d } from "../../../geometry/point2d";
import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_UI_Bootstrap_Forms_ControlBox } from "./controlBox";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
import { Mrbr_UI_Bootstrap_Forms_Dialog$Handles } from "./Dialog$Handles";
import { Mrbr_UI_Bootstrap_Forms_Dialog$States } from "./Dialog$States";
import { Mrbr_UI_Controls_Handles_Drag } from "../../controls/handles/drag";
import { Mrbr_UI_Controls_Handles_Resize } from "../../controls/handles/resize";

type MrbrDialogParameters = {
    host: HTMLElement;
}
export class Mrbr_UI_Bootstrap_Forms_Dialog extends Mrbr_UI_Controls_Control {
    _bounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    _newBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    _parentBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    _minBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 320, 240);
    _lastBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    _resizeDialog: boolean = false;
    _moveDialog: boolean = false;
    _animationFrame: number = 0;
    _config: MrbrDialogParameters;
    _controlBox: Mrbr_UI_Bootstrap_Forms_ControlBox;
    _windowState: Mrbr_UI_Bootstrap_Forms_Dialog$States = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
    constructor(rootElementName: string, config: MrbrDialogParameters) {
        super(rootElementName);
        const self = this;
        self._config = config;
        self.createDialog();
        const dialogContainer = self.rootElement,
            titleBar = self.elements["titleBar"];
        config.host.appendChild(dialogContainer);
        self.setParentBounds();
        self.newBounds.setXY(
            self._parentBounds.x,
            self._parentBounds.y
        )
        self._resizeDialog = true;
        self._moveDialog = true;
        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }


        self.controls["titleDrag"] = new Mrbr_UI_Controls_Handles_Drag(self.elements["titleBar"], dialogContainer, self._config.host);
        self.controls["titleDrag"].addEventListener(Mrbr_UI_Controls_Handles_Drag.DRAGGING_EVENT_NAME, (event) => {
            let bounds = (<Mrbr_Geometry_Bounds2d>event.detail);
            self.newBounds.setFromBounds(bounds)
            self._moveDialog = true;
            if (self._animationFrame === 0) { self._animationFrame = window.requestAnimationFrame(self._drawDialog); }
        })
        self.events["controlBoxClick"] = <Mrbr_System_Events_EventHandler>{
            context: self,
            eventName: Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxClickEventName,
            eventTarget: self._controlBox,
            event: self.controlBoxClick
        }
        self.drawDialog();
    }
    get titleBar(): HTMLElement { return this.elements["titleBar"]; }
    get contentContainer(): HTMLElement { return this.elements["contentContainer"]; }
    get footer(): HTMLElement { return this.elements["footer"]; }
    get bounds(): Mrbr_Geometry_Bounds2d { return this._bounds; }
    get newBounds(): Mrbr_Geometry_Bounds2d { return this._newBounds; }
    _drawDialog: () => any;
    setParentBounds() {
        const self = this;
        self._parentBounds.setBounds(
            0,
            0,
            self._config.host.clientWidth,
            self._config.host.clientHeight)
    }
    resizeAnimation(xDelta: number, yDelta: number, widthDelta: number, heightDelta: number) {
        const self = this,
            denominator = 5;
        self.newBounds.setBounds(
            self.newBounds.x += Math.floor(xDelta / denominator),
            self.newBounds.y += Math.floor(yDelta / denominator),
            self.newBounds.width += Math.ceil(widthDelta / denominator),
            self.newBounds.height += Math.ceil(heightDelta / denominator)
        )
        self._resizeDialog = true;
        self._moveDialog = true;
        self.drawDialog();
    }
    controlBoxClick(event: Mrbr_UI_Bootstrap_Forms_ControlBox$Event) {
        const self = this,
            controlBoxEvents = Mrbr_UI_Bootstrap_Forms_ControlBox$Events;
        const detail = event.detail;
        if (controlBoxEvents.maximise.toString() === controlBoxEvents[detail].toString() && self.windowState !== Mrbr_UI_Bootstrap_Forms_Dialog$States.Maximised) {
            self.windowState = Mrbr_UI_Bootstrap_Forms_Dialog$States.Maximised;
            self.attributes(self._controlBox.elements["maxButton_image"], { src: "/htmlTest/images/forms/restoreWindow.svg" });
            self._lastBounds.setBounds(
                self.bounds.x,
                self.bounds.y,
                self.bounds.width,
                self.bounds.height
            );
            self.setParentBounds();
            const endTime = Date.now() + Math.floor(500 / 60) * 60,
                runAnimation = () => {
                    if (Date.now() < endTime) {
                        self.resizeAnimation((self._parentBounds.x - self.newBounds.x), (self._parentBounds.y - self.newBounds.y), (self._parentBounds.width - self.newBounds.width - self.newBounds.x), (self._parentBounds.height - self.newBounds.height - self.newBounds.y));
                        requestAnimationFrame(runAnimation);
                    }
                    else {
                        self.newBounds.setBounds(
                            self._parentBounds.x,
                            self._parentBounds.y,
                            self._parentBounds.width - self._parentBounds.x,
                            self._parentBounds.height - self._parentBounds.y
                        );
                        self._moveDialog = true;
                        self._resizeDialog = true;
                        self.drawDialog();
                    }
                }
            requestAnimationFrame(runAnimation);
        }
        else if (controlBoxEvents.maximise.toString() === controlBoxEvents[detail].toString() && self.windowState === Mrbr_UI_Bootstrap_Forms_Dialog$States.Maximised) {
            const
                endTime = Date.now() + 1000,
                runAnimation = () => {
                    if (Date.now() < endTime) {
                        self.resizeAnimation((self._lastBounds.x - self.bounds.x), (self._lastBounds.y - self.bounds.y), self._lastBounds.width - self.newBounds.width, self._lastBounds.height - self.newBounds.height);
                        requestAnimationFrame(runAnimation);
                    }
                    else {
                        self.newBounds.setBounds(
                            self._lastBounds.x,
                            self._lastBounds.y,
                            self._lastBounds.width,
                            self._lastBounds.height);
                        self._moveDialog = true;
                        self._resizeDialog = true;
                        self.drawDialog();
                    }
                }
            requestAnimationFrame(runAnimation);
            self.windowState = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
            self.attributes(self._controlBox.elements["maxButton_image"], { src: "/htmlTest/images/forms/maximise.svg" });
        }
    }
    createDialog(): HTMLElement {
        const self = this;
        self._controlBox = new Mrbr_UI_Bootstrap_Forms_ControlBox("controlBox");
        const ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            dialog = <HTMLElement>this.createElement(new ctrlCfg(this.rootElementName, "div",
                {
                    classes: ["border", "shadow", "d-flex", "flex-column", "border-1", "border-dark"],
                    styles: { transform: `translate(${this.bounds.x}px,${this.bounds.y}px)`, position: "absolute", top: "0px", left: "0px", width: `${self.bounds.width}px`, height: `${self.bounds.height}` },
                    children: [
                        new ctrlCfg("titleBar", "div", {
                            classes: ["mrbr-dialog-handle-drag", "container-fluid", "bg-dark", "d-flex", "user-select-none"],
                            children: [
                                new ctrlCfg("titleText", "span",
                                    {
                                        classes: ["row", "justify-content-left", "align-self-center", "text-light", "py-1", "pe-1", "ps-3", "flex-fill"],
                                        styles: { "pointerEvents": "none" },
                                        properties: { textContent: "Title Text" }
                                    })
                                ,
                                self._controlBox.rootElement
                            ]
                        }),
                        new ctrlCfg("contentContainer", "div", {
                            classes: ["container-fluid", "h-100", "p-1", "bg-light"],
                            styles: { "minHeight": `${self._minBounds.height / 2}px` }
                        }),
                        new Mrbr_UI_Controls_ControlConfig("footer", "div", {
                            classes: ["container-fluid", "bg-dark", "d-flex", "p-4"],
                            styles: { height: "3rem" }
                        })
                    ]
                }));
        self.controls["resizeHandles"] = new Mrbr_UI_Controls_Handles_Resize(dialog, self._config.host);
        self.events["resizeHandle_resizing"] = <Mrbr_System_Events_EventHandler>{
            eventName: Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME,
            eventTarget: self.controls["resizeHandles"],
            event: self.resizeHandle_resizing,
            context: self
        }
        return dialog;
    }
    resizeHandle_resizing(event: CustomEvent) {
        const self = this;
        let bounds = (<Mrbr_Geometry_Bounds2d>event.detail);
        self.newBounds.setBounds(
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height
        )
        self._resizeDialog = true;
        self._moveDialog = true;
        if (self._animationFrame === 0) { self._animationFrame = window.requestAnimationFrame(self._drawDialog); }
    }
    drawDialog() {
        const self = this,
            dialog = this.rootElement;
        if (self._resizeDialog === false && self._moveDialog === false) { self._animationFrame = 0; return; }
        self.bounds.setBounds(
            self.newBounds.x,
            self.newBounds.y,
            self.newBounds.width,
            self.newBounds.height
        )

        if (self._moveDialog === true) {
            dialog.style.transform = `translate(${this.bounds.x}px,${this.bounds.y}px)`
        }
        if (self._resizeDialog === true) {
            dialog.style.width = `${self.bounds.width}px`
            dialog.style.height = `${self.bounds.height}px`
        }
        self._resizeDialog = false;
        self._moveDialog = false;
        self._animationFrame = 0;
    }
    focus() { }
    get windowState(): Mrbr_UI_Bootstrap_Forms_Dialog$States {
        return this._windowState;
    }
    set windowState(value: Mrbr_UI_Bootstrap_Forms_Dialog$States) {
        this._changeState(value);
        this._windowState = value;

    }
    _changeState(newState: Mrbr_UI_Bootstrap_Forms_Dialog$States) {
        const self = this,
            states = Mrbr_UI_Bootstrap_Forms_Dialog$States;
        if (self._windowState === newState) { return; }
        switch (self._windowState) {
            case states.Normal:
            case states.Maximised:
            case states.Minimised:
                break;
        }

    }
    show() { }
    showDialog() { }
    // const beforeUnloadListener = (event) => {
    //     event.preventDefault();
    //     return event.returnValue = "Are you sure you want to exit?";
    //   };

    //   const nameInput = document.querySelector("#name");

    //   nameInput.addEventListener("input", (event) => {
    //     if (event.target.value !== "") {
    //       addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    //     } else {
    //       removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    //     }
    //   });
}