import { Mrbr_Geometry_Bounds2d } from "../../../geometry/bounds2d";
import { Mrbr_Geometry_Point2d } from "../../../geometry/point2d";
import { Mrbr_UI_Controls_EventHandler } from "../../bootstrap/controls/EventHandler";
import { Mrbr_UI_Controls_Control } from "../control";
import { Mrbr_UI_Controls_ControlConfig } from "../ControlConfig";

export class Mrbr_UI_Controls_Handles_Drag extends Mrbr_UI_Controls_Control {
    DRAGGING_EVENT_NAME: string = "dragging";
    _newBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    _startBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0)
    _dragStart: Mrbr_Geometry_Point2d = new Mrbr_Geometry_Point2d(0, 0)
    _resizeDialog: boolean = false;
    _isDragging: boolean = false;
    private _dragHandle: HTMLElement;
    private _dragTarget: HTMLElement;
    private _parentElement: HTMLElement;
    constructor(dragHandle: HTMLElement, dragTarget: HTMLElement, parentElement: HTMLElement) {
        super("");
        const self = this;
        self.dragHandle = dragHandle;
        self.dragTarget = dragTarget;
        self.parentElement = parentElement;
        self.events["draghandle_mousedown"] = <Mrbr_UI_Controls_EventHandler>{
            eventName: "mousedown",
            eventTarget: self.dragHandle,
            event: self.dragHandle_mouseDown,
            context: self
        }
    }
    public get dragHandle(): HTMLElement {
        return this._dragHandle;
    }
    public set dragHandle(value: HTMLElement) {
        this._dragHandle = value;
    }
    public get dragTarget(): HTMLElement {
        return this._dragTarget;
    }
    public set dragTarget(value: HTMLElement) {
        this._dragTarget = value;
    }
    public get parentElement(): HTMLElement {
        return this._parentElement;
    }
    public set parentElement(value: HTMLElement) {
        this._parentElement = value;
    }
    dragHandle_mouseDown(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
        const self = this,
            dragTarget = self.dragTarget;
        if (self._isDragging === true) { return; }
        self._isDragging = true;
        self._dragStart.setPoint(mouseEvent.pageX, mouseEvent.pageY)
        self.createElement(new Mrbr_UI_Controls_ControlConfig("contentContainer_overlay", "div", {
            classes: "w-100 h-100",
            styles: { position: "absolute", backgroundColor: "transparent", top: "0", left: "0", zIndex: "2000" }
        }))
        self.dragTarget.appendChild(self.elements["contentContainer_overlay"])
        const
            transform = self.dragTarget.style.transform || "",
            translateRegex = /\s*translate\s*\(\s*(?<xPos>[0-9]+)\s*\w+\s*,\s*(?<yPos>[0-9]+)\s*\w+\s*\)/,
            match: any = transform.match(translateRegex);
        self._startBounds.setXY(
            self.dragTarget.offsetLeft + (match ? parseFloat(match?.groups?.xPos) : 0),
            self.dragTarget.offsetTop + (match ? parseFloat(match?.groups?.yPos) : 0)
        )
        self.events["window_drag_mousemove"] = <Mrbr_UI_Controls_EventHandler>{
            eventName: "mousemove",
            eventTarget: window,
            context: self,
            event: self.dragTarget_mouseMove
        }
        self.events["dragtarget_mousemove"] = <Mrbr_UI_Controls_EventHandler>{
            eventName: "mousemove",
            eventTarget: dragTarget,
            context: self,
            event: self.dragTarget_mouseMove
        }
        self.events["window_drag_mouseup"] = <Mrbr_UI_Controls_EventHandler>{
            eventName: "mouseup",
            eventTarget: window,
            context: self,
            event: self.dragHandle_mouseUp
        }
        self.events["dragtarget_mouseup"] = <Mrbr_UI_Controls_EventHandler>{
            eventName: "mouseup",
            eventTarget: dragTarget,
            context: self,
            event: self.dragHandle_mouseUp
        }
        self.events["draghandle_mousedown"].remove();
    }
    dragTarget_mouseMove(mouseEvent: MouseEvent) {
        const self = this,
            dialog = self.dragTarget;
        console.log("self.newBounds.setXY: ", self._startBounds)
        self.newBounds.setXY(
            self._startBounds.x + mouseEvent.pageX - self._dragStart.x,
            self._startBounds.y + mouseEvent.pageY - self._dragStart.y
        )
        console.log("self.newBounds.setXY 2: ", self._startBounds)
        if (self.newBounds.y < 0) { self.newBounds.y = 0; }
        if (self.newBounds.y + dialog.offsetHeight > self.parentElement.clientHeight) { self.newBounds.y = self.parentElement.clientHeight - dialog.offsetHeight }
        if (self.newBounds.x < 0) { self.newBounds.x = 0; }
        if (self.newBounds.x + dialog.offsetWidth > self.parentElement.clientWidth) { self.newBounds.x = self.parentElement.clientWidth - dialog.offsetWidth }
        self.dispatchEvent(new CustomEvent(self.DRAGGING_EVENT_NAME, { detail: self.newBounds }));
    }
    dragHandle_mouseUp(event: MouseEvent) {
        const self = this;
        if (self._isDragging === false) { return; }
        self._isDragging = false;
        self.events["window_drag_mousemove"].remove();
        self.events["window_drag_mouseup"].remove();
        self.events["dragtarget_mousemove"].remove();
        self.events["dragtarget_mouseup"].remove();
        self.events["draghandle_mousedown"] = ({
            eventName: "mousedown",
            eventTarget: self.dragHandle,
            event: self.dragHandle_mouseDown,
            context: self
        } as Mrbr_UI_Controls_EventHandler)
        self.dragTarget.removeChild(self.elements["contentContainer_overlay"])
        self.elements["contentContainer_overlay"] = null;
        self._isDragging = false;

    }
    get newBounds(): Mrbr_Geometry_Bounds2d { return this._newBounds; }
}