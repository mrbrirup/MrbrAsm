import { Mrbr_UI_Bootstrap_Controls_Control } from "../controls/control";
import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "../controls/ControlConfig";
import { MrbrEventHandler } from "../controls/MrbrEventHandler";
import { Mrbr_UI_Bootstrap_Forms_ControlBox } from "./controlBox";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
import { Mrbr_UI_Bootstrap_Forms_Dialog$Handles } from "./Dialog$Handles";
import { Mrbr_UI_Bootstrap_Forms_Dialog$States } from "./Dialog$States";

type MrbrDialogParameters = {
    host: HTMLElement;
}
export class Mrbr_UI_Bootstrap_Forms_Dialog extends Mrbr_UI_Bootstrap_Controls_Control {
    _x: number = 0;
    _y: number = 0;
    _startX: number = 0;
    _startY: number = 0;
    _width: number = 0;
    _height: number = 0;
    _startWidth: number = 0;
    _startHeight: number = 0;
    _activeHandle: HTMLElement;
    _resizeDialog: boolean = false;
    _moveDialog: boolean = false;
    _minWidth: number = 320;
    _minHeight: number = 240;
    _defaultWidth: number = 640;
    _defaultHeight: number = 480;
    _animationFrame: number = 0;
    _config: MrbrDialogParameters;
    _minX: number = 0;
    _minY: number = 0;
    _maxX: number = 0;
    _maxY: number = 0;
    _sHandleHeight: number = 0;
    _eHandleWidth: number = 0;
    _controlBox: Mrbr_UI_Bootstrap_Forms_ControlBox;
    _windowState: Mrbr_UI_Bootstrap_Forms_Dialog$States = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
    _isDragging: boolean = false;
    constructor(rootElementName: string, config: MrbrDialogParameters) {
        super(rootElementName);
        const self = this;
        self.createDialog();
        const dialogContainer = self.rootElement,
            titleBar = self.elements["titleBar"],
            handleW = self.elements["mrbr-dialog-handle-w"],
            handleN = self.elements["mrbr-dialog-handle-n"];
        config.host.appendChild(dialogContainer);
        self._config = config;
        self._maxX = config.host.clientWidth;
        self._maxY = config.host.clientHeight;
        let computedHostStyle = getComputedStyle(config.host),
            computedHandleWStyle = getComputedStyle(handleW),
            computedHandleNStyle = getComputedStyle(handleN);
        self._minX = parseFloat(computedHostStyle.getPropertyValue('border-left-width')) + Math.ceil(parseFloat(computedHandleWStyle.getPropertyValue('left')) + parseFloat(computedHandleWStyle.getPropertyValue('width')));
        self._minY = parseFloat(computedHostStyle.getPropertyValue('border-top-width')) + Math.ceil(parseFloat(getComputedStyle(handleN).getPropertyValue('top')) + parseFloat(getComputedStyle(handleN).getPropertyValue('height')));
        self.x = parseFloat(computedHostStyle.getPropertyValue('border-left-width')) + Math.ceil(parseFloat(computedHandleWStyle.getPropertyValue('left')) + parseFloat(computedHandleWStyle.getPropertyValue('width'))) + self._minX;
        self.y = parseFloat(computedHostStyle.getPropertyValue('border-top-width')) + Math.ceil(parseFloat(computedHandleNStyle.getPropertyValue('top')) + parseFloat(computedHandleNStyle.getPropertyValue('height'))) + this._minY;
        self.width = self._defaultWidth;
        self.height = self._defaultHeight;
        self._resizeDialog = true;
        self._moveDialog = true;
        self.events["titlebar_mousedown"] = <MrbrEventHandler>{
            eventName: "mousedown",
            eventTarget: titleBar,
            event: self.titleBarMouseDown,
            context: self
        }
        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }
        self.events["controlBoxClick"] = <MrbrEventHandler>{
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
    _drawDialog: () => any;
    get width(): number { return this._width }
    set width(value: number) { this._width = value; }
    get height(): number { return this._height }
    set height(value: number) { this._height = value; }
    get x(): number { return this._x }
    set x(value: number) { this._x = value; }
    get y(): number { return this._y }
    set y(value: number) { this._y = value; }
    controlBoxClick_handler: (event: CustomEvent) => any;
    controlBoxClick(event: CustomEvent) {
        let detail = event.detail
        console.log("event: ", detail, event);
    }
    createDialog(): HTMLElement {
        const self = this;
        self._controlBox = new Mrbr_UI_Bootstrap_Forms_ControlBox("controlBox");
        const ctrlCfg = Mrbr_UI_Bootstrap_Controls_ControlConfig,
            handles: (Mrbr_UI_Bootstrap_Controls_ControlConfig | HTMLElement)[] = self.createHandles(),
            dialog = <HTMLElement>this.createElement(new ctrlCfg(this.rootElementName, "div",
                {
                    classes: ["border", "shadow", "d-flex", "flex-column", "border-1", "border-dark"],
                    styles: { transform: `translate(${this.x}px,${this.y}px)`, position: "absolute", top: "0px", left: "0px", width: `${self._defaultWidth}px`, height: `${self._defaultHeight}` },
                    children: [
                        new ctrlCfg("titleBar", "div", {
                            classes: ["mrbr-dialog-handle-drag", "container-fluid", "bg-dark", "d-flex", "user-select-none"],
                            children: [
                                new ctrlCfg("titleText", "span",
                                    {
                                        classes: ["row", "justify-content-left", "align-self-center", "text-light", "py-1", "pe-1", "ps-3", "flex-fill"],
                                        properties: { textContent: "Title Text" }
                                    })
                                ,
                                self._controlBox.rootElement
                            ]
                        }),
                        new ctrlCfg("contentContainer", "div", {
                            classes: ["container-fluid", "h-100", "p-1", "bg-light"],
                            styles: {"minHeight": `${self._minHeight/2}px`}
                        }),
                        new Mrbr_UI_Bootstrap_Controls_ControlConfig("footer", "div", {
                            classes: ["container-fluid", "bg-dark", "d-flex", "p-4"],
                            styles:{height: "3rem"}
                        }),
                        ...handles
                    ]
                }));
        return dialog;
    }
    _dragXStart: number = 0;
    _dragYStart: number = 0;
    titleBarMouseDown(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
        const self = this,
            dialogContainer = this.rootElement;
        if (self._isDragging === true) { return; }
        self._isDragging = true;
        self._dragXStart = mouseEvent.pageX;
        self._dragYStart = mouseEvent.pageY;
        self._startX = this._x;
        self._startY = this._y;
        self._resizeDialog = false;
        self._moveDialog = false;
        self._sHandleHeight = parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-s"]).getPropertyValue('bottom')) + parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-s"]).getPropertyValue('height'));
        self._eHandleWidth = parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-e"]).getPropertyValue('right')) + parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-e"]).getPropertyValue('width'));
        self.events["window_drag_mousemove"] = <MrbrEventHandler>{
            eventName: "mousemove",
            eventTarget: window,
            context: self,
            event: self.dragMouseMove
        }
        self.events["dialogcontainer_mousemove"] = <MrbrEventHandler>{
            eventName: "mousemove",
            eventTarget: dialogContainer,
            context: self,
            event: self.dragMouseMove
        }
        //window.addEventListener("mousemove", self.dragMouseMove_handler);
        self.events["window_drag_mouseup"] = <MrbrEventHandler>{
            eventName: "mouseup",
            eventTarget: window,
            context: self,
            event: self.dragMouseUp
        }
        self.events["dialogcontainer_mouseup"] = <MrbrEventHandler>{
            eventName: "mouseup",
            eventTarget: dialogContainer,
            context: self,
            event: self.dragMouseUp
        }
        self.events["titlebar_mousedown"].remove();
    }
    dragMouseMove(mouseEvent: MouseEvent) {
        const self = this,
            dialog = this.rootElement,
            offsetX = mouseEvent.pageX - self._dragXStart,
            offsetY = mouseEvent.pageY - self._dragYStart,
            _minY = self._minY,
            _minX = self._minX;
        self._x = this._startX + offsetX;
        self._y = this._startY + offsetY;
        if (self._y < _minY) { self._y = _minY; }
        if (self._y + dialog.offsetHeight > self._config.host.clientHeight) { self._y = self._config.host.clientHeight - dialog.offsetHeight - self._sHandleHeight }
        if (self._x < _minX) { self._x = _minX; }
        if (self._x + dialog.offsetWidth > self._config.host.clientWidth) { self._x = self._config.host.clientWidth - dialog.offsetWidth - self._eHandleWidth }
        self._moveDialog = true;
        if (self._animationFrame === 0) { self._animationFrame = window.requestAnimationFrame(self._drawDialog); }
    }
    dragMouseUp(event: MouseEvent) {
        const self = this,
            titleBar = this.elements["titleBar"];
        if (self._isDragging === false) { return; }
        self._isDragging = false;
        self.events["window_drag_mousemove"].remove();
        self.events["window_drag_mouseup"].remove();
        self.events["dialogcontainer_mousemove"].remove();
        self.events["dialogcontainer_mouseup"].remove();
        self.events["titlebar_mousedown"] = ({
            eventName: "mousedown",
            eventTarget: titleBar,
            event: self.titleBarMouseDown,
            context: self
        } as MrbrEventHandler)
        self._isDragging = false;
    }
    createHandles(): Array<HTMLElement> {
        const self = this,
            dialogHandles = Mrbr_UI_Bootstrap_Forms_Dialog$Handles;
        let handles =
            Object.keys(dialogHandles)
                .map(handle => {
                    const controlHandle = <HTMLElement>self.createElement(new Mrbr_UI_Bootstrap_Controls_ControlConfig(`mrbr-dialog-handle-${handle}`, "div", {
                        data: {
                            handle: handle,
                            lat: handle.includes(dialogHandles.n) ? dialogHandles.n : (handle.includes(dialogHandles.s) ? dialogHandles.s : ""),
                            long: handle.includes(dialogHandles.e) ? dialogHandles.e : (handle.includes(dialogHandles.w) ? dialogHandles.w : "")
                        },
                        classes: [`mrbr-dialog-handle`, `mrbr-dialog-handle-${handle}`],
                        properties: { draggable: false }
                    }))
                    self.events[`mrbr-dialog-handle-${handle}_mousedown`] = <MrbrEventHandler>{
                        event: self.handleMouseDown,
                        eventName: "mousedown",
                        context: self,
                        eventTarget: controlHandle
                    }
                    self.events[`mrbr-dialog-handle-${handle}_touchstart`] = <MrbrEventHandler>{
                        event: self.handleTouchDown,
                        eventName: "touchstart",
                        context: self,
                        eventTarget: controlHandle,
                        options: { passive: true }
                    }
                    return controlHandle;
                })
        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }
        return handles;
    }
    handleTouchDown(touchEvent: TouchEvent) {
        const self = this;
        let touch: Touch = touchEvent.touches.item(0)
        touchEvent.stopPropagation();
        touchEvent.cancelable && touchEvent.preventDefault();

        if (self._windowState === Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal) {
            this.rootElement.classList.add("mrbr-dialog-handle-drag")
            self.events["window_touchmove"] = <MrbrEventHandler>{
                event: self.touchMove,
                eventName: "touchmove",
                context: self,
                eventTarget: window
            };
            self.events[`window_touchend`] = <MrbrEventHandler>{
                event: self.handleTouchDown,
                eventName: "touchend",
                context: self,
                eventTarget: window
            }
            self.x = touch.pageX;
            self.y = touch.pageY;
            self._activeHandle = (<HTMLElement>touchEvent.target);
            self.focus();
        }
    }
    handleMouseDown(mouseEvent: MouseEvent) {
        const self = this,
            dialogContainer = this.rootElement;
        mouseEvent.stopPropagation();
        mouseEvent.preventDefault();
        if (self._activeHandle) { return; }
        if (self._windowState === Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal) {
            self._activeHandle = (<HTMLElement>mouseEvent.target);
            self._startX = mouseEvent.pageX;
            self._startY = mouseEvent.pageY;
            self._startHeight = dialogContainer.offsetHeight;

            self._startWidth = dialogContainer.offsetWidth;
            self._resizeDialog = false;
            self._moveDialog = false;
            self.events[`window_handle_mousemove`] = <MrbrEventHandler>{
                event: self.handleMouseMove,
                eventName: "mousemove",
                context: self,
                eventTarget: window
            }
            self.events[`window_handle_mouseup`] = <MrbrEventHandler>{
                event: self.handleMouseUp,
                eventName: "mouseup",
                context: self,
                eventTarget: window
            }
            self.events["container_handle_mousemove"] = <MrbrEventHandler>{
                event: self.handleMouseMove,
                eventName: "mousemove",
                context: self,
                eventTarget: self.rootElement
            }
            self.events[`activehandle_mouseup`] = <MrbrEventHandler>{
                event: self.handleMouseUp,
                eventName: "mouseup",
                context: self,
                eventTarget: self._activeHandle
            }
            self.focus();
            self.createElement(new Mrbr_UI_Bootstrap_Controls_ControlConfig("contentContainer_overlay", "div", {
                classes: "w-100 h-100",
                styles: { position: "absolute", backgroundColor: "transparent", top: "0", left: "0", zIndex: "2000" }
            }))
            self.elements["contentContainer"].appendChild(self.elements["contentContainer_overlay"])
        }
    }


    touchMove() { }
    touchUp() { }
    handleMouseMove(event: MouseEvent) {
        const self = this;
        if (!self._activeHandle) { return; }
        const offsetX = event.pageX - self._startX,
            offsetY = event.pageY - self._startY,
            latitide = self._activeHandle.dataset.lat,
            longitude = self._activeHandle.dataset.long,
            dialogHandles = Mrbr_UI_Bootstrap_Forms_Dialog$Handles,
            _minY = self._minY,
            _minX = self._minX,
            lastY = self._y,
            lastX = self._x;
        if (latitide === dialogHandles.n) {
            self._y = (self._startY + offsetY <= _minY) ? _minY : self._startY + offsetY;
            self._height += (lastY - self._y)
            if (self._height <= self._minHeight) {
                let heightDelta = self._minHeight - self._height;
                self._y = self._startY + offsetY - heightDelta;
                self._height = self._minHeight;
            }
        }
        else if (latitide === dialogHandles.s) {
            self._height = Math.max(self._startHeight + offsetY, self._minHeight)
            if (self._height + self._y > self._config.host.clientHeight - self._sHandleHeight) {
                self._height = self._config.host.clientHeight - self._sHandleHeight - self._y;
            }
        }


        if (longitude === dialogHandles.w) {
            self._x = (self._startX + offsetX <= _minX) ? _minX : self._startX + offsetX;
            self._width += (lastX - self._x)
            if (self._width <= self._minWidth) {
                let widthDelta = self._minWidth - self._width;
                self._x = self._startX + offsetX - widthDelta;
                self._width = self._minWidth;
            }
        }
        else if (longitude === dialogHandles.e) {
            self._width = Math.max(self._startWidth + offsetX, self._minWidth)
            if (self._width + self._x > self._config.host.clientWidth - self._eHandleWidth) {
                self._width = self._config.host.clientWidth - self._eHandleWidth - self._x;
            }
        }
        self._resizeDialog = true;
        self._moveDialog = true;

        if (self._animationFrame === 0) { self._animationFrame = window.requestAnimationFrame(self._drawDialog); }
    }
    drawDialog() {
        const self = this,
            dialog = this.rootElement;
        if (self._resizeDialog === false && self._moveDialog === false) { self._animationFrame = 0; return; }
        self.x = self._x
        self.y = self._y
        self.height = self._height;
        self.width = self._width;

        if (self._moveDialog === true) {
            dialog.style.transform = `translate(${this.x}px,${this.y}px)`
        }
        if (self._resizeDialog === true) {
            dialog.style.width = `${self.width}px`
            dialog.style.height = `${self.height}px`
        }
        self._resizeDialog = false;
        self._moveDialog = false;
        self._animationFrame = 0;
    }
    focus() { }
    handleMouseUp(mouseEvent: MouseEvent) {
        const self = this;
        if (!self._activeHandle) { return; }

        self.events["window_handle_mousemove"].remove();
        self.events["window_handle_mouseup"].remove();
        self.events["activehandle_mouseup"].remove();
        self.events["container_handle_mousemove"].remove();
        self._activeHandle = null;

        self.elements["contentContainer"].removeChild(self.elements["contentContainer_overlay"])
        self.elements["contentContainer_overlay"] = null;

    }
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