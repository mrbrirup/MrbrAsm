import { Mrbr_Geometry_Bounds2d } from "../../../geometry/bounds2d";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../control";
import { Mrbr_UI_Controls_ControlConfig } from "../ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../ControlConfigOptionalParameters";

export class Mrbr_UI_Controls_Handles_Resize extends Mrbr_UI_Controls_Control {
    static RESIZING_EVENT_NAME: string = "resizing";
    _bounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    _newBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    _resizeStartBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0)
    _parentBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    _minBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 320, 240);
    _lastBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    _activeHandle: HTMLElement;
    _horizontalHandleHeight: number = 0;
    _verticalHandleWidth: number = 0;
    static resizeHandles = {
        "n": "n",
        "s": "s",
        "e": "e",
        "w": "w",
        "ne": "ne",
        "se": "se",
        "sw": "sw",
        "nw": "nw"
    }
    private _resizeTarget: HTMLElement;
    private _parentElement: HTMLElement;
    constructor(resizeTarget: HTMLElement, parentElement: HTMLElement) {
        super("");
        const self = this;
        self.resizeTarget = resizeTarget;
        self.parentElement = parentElement;
        this.createHandles();
    }
    public get resizeTarget(): HTMLElement {
        return this._resizeTarget;
    }
    public set resizeTarget(value: HTMLElement) {
        this._resizeTarget = value;
    }
    public get parentElement(): HTMLElement {
        return this._parentElement;
    }
    public set parentElement(value: HTMLElement) {
        this._parentElement = value;
    }
    initialise(...args: any[]): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initalisePromise = Mrbr_System_MrbrPromise.create("Mrbr_UI_Controls_Handles_Drag:initalise", self);
        super.initialise(...args)
            .then(() => {
                MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(() => {
                        initalisePromise.resolve(self);
                    })
            })
        return initalisePromise;
    }
    createHandles() {
        const self = this,
            resizeHandles = Mrbr_UI_Controls_Handles_Resize.resizeHandles;
        Object.keys(resizeHandles)
            .forEach(handle => {
                const controlHandle = <HTMLElement>self.createElement(new Mrbr_UI_Controls_ControlConfig(`mrbr-dialog-handle-${handle}`, "div",
                    new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                        .Data({
                            handle: handle,
                            lat: handle.includes(resizeHandles.n) ? resizeHandles.n : (handle.includes(resizeHandles.s) ? resizeHandles.s : ""),
                            long: handle.includes(resizeHandles.e) ? resizeHandles.e : (handle.includes(resizeHandles.w) ? resizeHandles.w : "")
                        })
                        .Classes([`mrbr-dialog-handle`, `mrbr-dialog-handle-${handle}`])
                        .Properties({ draggable: false })
                ))
                self.events[`mrbr-dialog-handle-${handle}_mousedown`] = <Mrbr_System_Events_EventHandler>{
                    event: self.handle_mouseDown,
                    eventName: "mousedown",
                    context: self,
                    eventTarget: controlHandle
                }
                self.events[`mrbr-dialog-handle-${handle}_touchstart`] = <Mrbr_System_Events_EventHandler>{
                    event: self.handle_touchDown,
                    eventName: "touchstart",
                    context: self,
                    eventTarget: controlHandle
                }
                self._resizeTarget.appendChild(controlHandle)
                return controlHandle;
            })
    }
    handle_mouseDown(mouseEvent: MouseEvent) {
        const self = this;
        //debugger;
        mouseEvent.stopPropagation();
        mouseEvent.preventDefault();
        if (self._activeHandle) { return; }
        self.setParentBounds();
        self._activeHandle = (<HTMLElement>mouseEvent.target);
        self._resizeStartBounds.setBounds(
            mouseEvent.pageX,
            mouseEvent.pageY,
            self.resizeTarget.offsetWidth,
            self.resizeTarget.offsetHeight
        )
        const
            transform = self.resizeTarget.style.transform || "",
            translateRegex = /\s*translate\s*\(\s*(?<xPos>[0-9]+)\s*\w+\s*,\s*(?<yPos>[0-9]+)\s*\w+\s*\)/,
            match: any = transform.match(translateRegex);
        self.newBounds.setBounds(
            self.resizeTarget.offsetLeft + (match ? parseFloat(match?.groups?.xPos) : 0),
            self.resizeTarget.offsetTop + (match ? parseFloat(match?.groups?.yPos) : 0),
            self.resizeTarget.offsetWidth,
            self.resizeTarget.offsetHeight
        )
        self.events[`window_handle_mousemove`] = <Mrbr_System_Events_EventHandler>{
            event: self.handle_mouseMove,
            eventName: "mousemove",
            context: self,
            eventTarget: window
        }
        self.events[`window_handle_mouseup`] = <Mrbr_System_Events_EventHandler>{
            event: self.handle_mouseUp,
            eventName: "mouseup",
            context: self,
            eventTarget: window
        }
        self.events["container_handle_mousemove"] = <Mrbr_System_Events_EventHandler>{
            event: self.handle_mouseMove,
            eventName: "mousemove",
            context: self,
            eventTarget: self.resizeTarget
        }
        self.events[`activehandle_mouseup`] = <Mrbr_System_Events_EventHandler>{
            event: self.handle_mouseUp,
            eventName: "mouseup",
            context: self,
            eventTarget: self._activeHandle
        }
        self.createElement(new Mrbr_UI_Controls_ControlConfig("contentContainer_overlay", "div",
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes("w-100 h-100")
                .Styles({ position: "absolute", backgroundColor: "transparent", top: "0", left: "0", zIndex: "2000" })
        ))
        self.resizeTarget.appendChild(self.elements["contentContainer_overlay"])
    }
    setParentBounds() {
        const self = this;
        self._parentBounds.setBounds(
            0,
            0,
            self.parentElement.clientWidth,
            self.parentElement.clientHeight)
    }
    handle_mouseMove(event: MouseEvent) {
        const self = this;
        if (!self._activeHandle) { return; }
        const offsetX = event.pageX - self._resizeStartBounds.x,
            offsetY = event.pageY - self._resizeStartBounds.y,
            latitide = self._activeHandle.dataset.lat,
            longitude = self._activeHandle.dataset.long,
            dialogHandles = Mrbr_UI_Controls_Handles_Resize.resizeHandles;
        const
            transform = self.resizeTarget.style.transform || "",
            translateRegex = /\s*translate\s*\(\s*(?<xPos>[0-9]+)\s*\w+\s*,\s*(?<yPos>[0-9]+)\s*\w+\s*\)/,
            match: any = transform.match(translateRegex);
        self._lastBounds.setFromBounds(self.newBounds)
        self.newBounds.setBounds(
            self.resizeTarget.offsetLeft + (match ? parseFloat(match?.groups?.xPos) : 0),
            self.resizeTarget.offsetTop + (match ? parseFloat(match?.groups?.yPos) : 0),
            self.resizeTarget.offsetWidth,
            self.resizeTarget.offsetHeight
        )


        if (latitide === dialogHandles.n) {
            self.newBounds.y = (self._resizeStartBounds.y + offsetY <= 0) ? 0 : self._resizeStartBounds.y + offsetY;
            self.newBounds.height = self._lastBounds.height + (self._lastBounds.y - self.newBounds.y);
            if (self.newBounds.height <= self._minBounds.height) {
                let heightDelta = self._minBounds.height - self.newBounds.height;
                self.newBounds.y = self._resizeStartBounds.y + offsetY - heightDelta;
                self.newBounds.height = self._minBounds.height;
            }
        }
        else if (latitide === dialogHandles.s) {
            self.newBounds.height = Math.max(self._resizeStartBounds.height + offsetY, self._minBounds.height)
            if (self.newBounds.height + self.newBounds.y > self._parentBounds.height - self._horizontalHandleHeight) {
                self.newBounds.height = self._parentBounds.height - self._horizontalHandleHeight - self.newBounds.y;
            }
        }


        if (longitude === dialogHandles.w) {
            self.newBounds.x = (self._resizeStartBounds.x + offsetX <= self._parentBounds.x) ? self._parentBounds.x : self._resizeStartBounds.x + offsetX;
            self.newBounds.width = self._lastBounds.width + (self._lastBounds.x - self.newBounds.x);
            if (self.newBounds.width <= self._minBounds.width) {
                let widthDelta = self._minBounds.width - self.newBounds.width;
                self.newBounds.x = self._resizeStartBounds.x + offsetX - widthDelta;
                self.newBounds.width = self._minBounds.width;
            }
        }
        else if (longitude === dialogHandles.e) {
            self.newBounds.width = Math.max(self._resizeStartBounds.width + offsetX, self._minBounds.width)
            if (self.newBounds.width + self.newBounds.x > self._parentBounds.width - self._verticalHandleWidth) {
                self.newBounds.width = self._parentBounds.width - self._verticalHandleWidth - self.newBounds.x;
            }
        }
        self.dispatchEvent(new CustomEvent(Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME, { detail: self.newBounds }));
    }
    handle_mouseUp(mouseEvent: MouseEvent) {
        const self = this;
        if (!self._activeHandle) { return; }

        self.events["window_handle_mousemove"].remove();
        self.events["window_handle_mouseup"].remove();
        self.events["activehandle_mouseup"].remove();
        self.events["container_handle_mousemove"].remove();
        self._activeHandle = null;

        self.resizeTarget.removeChild(self.elements["contentContainer_overlay"])
        self.elements["contentContainer_overlay"] = null;

    }
    get bounds(): Mrbr_Geometry_Bounds2d { return this._bounds; }
    get newBounds(): Mrbr_Geometry_Bounds2d { return this._newBounds; }
    handle_touchDown(touchEvent: TouchEvent) {
        const self = this;
        let touch: Touch = touchEvent.touches.item(0)
        touchEvent.stopPropagation();
        touchEvent.cancelable && touchEvent.preventDefault();
        this.resizeTarget.classList.add("mrbr-dialog-handle-drag")
        self.events["window_touchmove"] = <Mrbr_System_Events_EventHandler>{
            event: self.touchMove,
            eventName: "touchmove",
            context: self,
            eventTarget: window
        };
        self.events[`window_touchend`] = <Mrbr_System_Events_EventHandler>{
            event: self.handle_touchDown,
            eventName: "touchend",
            context: self,
            eventTarget: window
        }
        self.newBounds.x = touch.pageX;
        self.newBounds.y = touch.pageY;
        self._activeHandle = (<HTMLElement>touchEvent.target);
    }
    touchMove() { }
    touchUp() { }
    dispose() {
        super.dispose();
    }
}