import { Mrbr_UI_Bootstrap_Controls_Control } from "../controls/control";
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
    _animationFrame: number = 0;
    _config: MrbrDialogParameters;
    _minX: number = 0;
    _minY: number = 0;
    _maxX: number = 0;
    _maxY: number = 0;
    _sHandleHeight: number = 0;
    _eHandleWidth: number = 0;

    _windowState: Mrbr_UI_Bootstrap_Forms_Dialog$States = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
    constructor(config: MrbrDialogParameters) {
        super();
        const self = this;
        const dialogContainer = self.createDialog(),
            titleBar = self.createTitleBar(),
            footer = self.createFooter(),
            contentContainer = self.createContentContainer(),
            handles = self.createHandles(),
            handleW = self.elements["mrbr-dialog-handle-w"],
            handleN = self.elements["mrbr-dialog-handle-n"],
            controlBox = self.createControlBox();
        dialogContainer.appendChild(titleBar);
        dialogContainer.appendChild(contentContainer);
        dialogContainer.appendChild(footer);
        handles.forEach(handle => dialogContainer.appendChild(handle))
        config.host.appendChild(dialogContainer);
        self._config = config;
        self._maxX = config.host.clientWidth;
        self._maxY = config.host.clientHeight;
        self._minX = parseFloat(getComputedStyle(config.host).getPropertyValue('border-left-width')) + Math.ceil(parseFloat(getComputedStyle(handleW).getPropertyValue('left')) + parseFloat(getComputedStyle(handleW).getPropertyValue('width')));
        self._minY = parseFloat(getComputedStyle(config.host).getPropertyValue('border-top-width')) + Math.ceil(parseFloat(getComputedStyle(handleN).getPropertyValue('top')) + parseFloat(getComputedStyle(handleN).getPropertyValue('height')));
        self.x = parseFloat(getComputedStyle(config.host).getPropertyValue('border-left-width')) + Math.ceil(parseFloat(getComputedStyle(handleW).getPropertyValue('left')) + parseFloat(getComputedStyle(handleW).getPropertyValue('width'))) + self._minX;
        self.y = parseFloat(getComputedStyle(config.host).getPropertyValue('border-top-width')) + Math.ceil(parseFloat(getComputedStyle(handleN).getPropertyValue('top')) + parseFloat(getComputedStyle(handleN).getPropertyValue('height'))) + this._minY;
        self.width = dialogContainer.offsetWidth;
        self.height = dialogContainer.offsetHeight;
        self._resizeDialog = true;
        self._moveDialog = true;
        self.drawDialog();
        controlBox.createControls().reverse().forEach(controlBoxControl => titleBar.appendChild(controlBoxControl))
        //controlBox.addEventListener(Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxClickEventName, self.controlBoxClick_handler);        
        controlBox.addEventListener(Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxClickEventName, <EventListenerOrEventListenerObject>self.controlBoxClick_handler);
        //controlBox.addEventListener("click", function(w){console.log(w)});
        window["controlBox"] = controlBox;
    }
    dragMouseMove_handler: (mouseEvent: MouseEvent) => any;
    windowDragMouseLeave_handler: (mouseEvent: MouseEvent) => any;
    dragMouseUp_handler: (mouseEvent: MouseEvent) => any;
    windowDragMouseUp_handler: (mouseEvent: MouseEvent) => any;
    handleMouseUp_handler: (mouseEvent: MouseEvent) => any;
    windowMouseUp_handler: (mouseEvent: MouseEvent) => any;
    handleMouseMove_handler: (mouseEvent: MouseEvent) => any;
    windowMouseLeave_handler: (mouseEvent: MouseEvent) => any;
    windowMouseOut_handler: (mouseEvent: MouseEvent) => any;
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
    //export class Mrbr_UI_Bootstrap_Forms_ControlBox$Event extends CustomEvent<Mrbr_UI_Bootstrap_Forms_ControlBox$Events> {
    controlBoxClick(event: CustomEvent) {
        let detail = event.detail
        console.log("event: ", detail, event);
    }
    createDialog(): HTMLElement {
        const dialog = this.elements["dialogContainer"] = document.createElement("div"),
            classListAdd = dialog.classList.add.bind(dialog.classList);
        classListAdd("border")
        classListAdd("shadow")
        classListAdd("d-flex")
        classListAdd("flex-column")
        classListAdd("border-1")
        classListAdd("border-dark")
        let style = this.elements["dialogContainer"].style
        style.transform = `translate(${this.x}px,${this.y}px)`
        style.position = "absolute";
        style.top = "0px";
        style.left = "0px";
        style.width = "640px"
        style.height = "480px"
        return dialog;
    }
    createTitleBar(): HTMLElement {
        const self = this,
            titleBar = self.elements["titleBar"] = document.createElement("div"),
            titleText = self.elements["titleText"] = document.createElement("span"),
            titleBarClassListAdd = titleBar.classList.add.bind(titleBar.classList),
            titleTextClassListAdd = titleText.classList.add.bind(titleText.classList);
        titleBarClassListAdd("mrbr-dialog-handle-drag")
        titleBarClassListAdd("container-fluid")
        titleBarClassListAdd("bg-dark")
        titleBarClassListAdd("d-flex")
        titleBarClassListAdd("user-select-none")
        titleText.textContent = "Title Text";
        titleTextClassListAdd("row")
        titleTextClassListAdd("justify-content-left")
        titleTextClassListAdd("align-self-center")
        titleTextClassListAdd("text-light")
        titleTextClassListAdd("p-3")
        titleTextClassListAdd("flex-fill")
        titleBar.appendChild(titleText)
        if (!self.titleBarMouseDown_handler) { self.titleBarMouseDown_handler = self.titleBarMouseDown.bind(this); }
        titleBar.addEventListener("mousedown", self.titleBarMouseDown_handler);
        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }

        return titleBar;
    }
    createControlBox(): Mrbr_UI_Bootstrap_Forms_ControlBox {
        this.controlBoxClick_handler = this.controlBoxClick.bind(this);
        return new Mrbr_UI_Bootstrap_Forms_ControlBox();
    }
    _dragXStart: number = 0;
    _dragYStart: number = 0;
    titleBarMouseDown(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
        const self = this,
            titleBar = self.elements["titleBar"],
            dialogContainer = self.elements["dialogContainer"];
        self._dragXStart = mouseEvent.pageX;
        self._dragYStart = mouseEvent.pageY;
        self._startX = this._x;
        self._startY = this._y;
        self._resizeDialog = false;
        self._moveDialog = false;
        self._sHandleHeight = parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-s"]).getPropertyValue('bottom')) + parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-s"]).getPropertyValue('height'));
        self._eHandleWidth = parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-e"]).getPropertyValue('right')) + parseFloat(getComputedStyle(self.elements["mrbr-dialog-handle-e"]).getPropertyValue('width'));
        if (!self.dragMouseMove_handler) { self.dragMouseMove_handler = self.dragMouseMove.bind(self); }
        if (!self.windowDragMouseLeave_handler) { self.windowDragMouseLeave_handler = self.dragMouseUp.bind(self); }
        if (!self.dragMouseUp_handler) { self.dragMouseUp_handler = self.dragMouseUp.bind(self); }
        if (!self.windowDragMouseUp_handler) { self.windowDragMouseUp_handler = self.dragMouseUp.bind(self); }
        window.addEventListener("mousemove", self.dragMouseMove_handler);
        window.addEventListener("mouseup", self.windowDragMouseUp_handler);
        dialogContainer.addEventListener("mousemove", self.dragMouseMove_handler);
        dialogContainer.addEventListener("mouseup", self.windowDragMouseUp_handler);
        titleBar.removeEventListener("mousedown", self.titleBarMouseDown_handler)
    }
    titleBarMouseDown_handler: (mouseEvent: MouseEvent) => any;
    dragMouseMove(mouseEvent: MouseEvent) {
        const self = this,
            dialog = self.elements["dialogContainer"],
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
            dialogContainer = this.elements["dialogContainer"],
            titleBar = this.elements["titleBar"];
        window.removeEventListener("mousemove", self.dragMouseMove_handler);
        window.removeEventListener("mouseleave", self.windowMouseLeave_handler);
        window.removeEventListener("mouseout", self.windowMouseOut_handler);
        window.removeEventListener("mouseup", self.windowDragMouseUp_handler);

        dialogContainer.removeEventListener("mousemove", self.dragMouseMove_handler);
        dialogContainer.removeEventListener("mouseup", self.windowDragMouseUp_handler);
        titleBar.addEventListener("mousedown", this.titleBarMouseDown_handler)
    }
    createFooter(): HTMLElement {
        const footer = this.elements["footer"] = document.createElement("div"),
            classListAdd = footer.classList.add.bind(footer.classList);
        classListAdd("container-fluid")
        classListAdd("bg-dark")
        classListAdd("d-flex")
        classListAdd("p-4")
        return footer;
    }
    createContentContainer(): HTMLElement {
        const contentContainer = this.elements["contentContainer"] = document.createElement("div"),
            classListAdd = contentContainer.classList.add.bind(contentContainer.classList);
        classListAdd("container-fluid")
        classListAdd("h-100")
        classListAdd("p-1")
        classListAdd("bg-light")
        return contentContainer;
    }
    createHandles(): Array<HTMLElement> {
        let handles = [];
        const self = this,
            dialogHandles = Mrbr_UI_Bootstrap_Forms_Dialog$Handles;
        Object.keys(dialogHandles)
            .forEach(handle => {
                const controlHandle = self.elements[`mrbr-dialog-handle-${handle}`] = document.createElement("div");
                controlHandle.dataset.handle = handle;
                controlHandle.dataset.lat = handle.includes(dialogHandles.n) ? dialogHandles.n : (handle.includes(dialogHandles.s) ? dialogHandles.s : "")
                controlHandle.dataset.long = handle.includes(dialogHandles.e) ? dialogHandles.e : (handle.includes(dialogHandles.w) ? dialogHandles.w : "")
                controlHandle.classList.add(`mrbr-dialog-handle`);
                controlHandle.classList.add(`mrbr-dialog-handle-${handle}`);
                controlHandle.dataset.handle = handle;
                controlHandle.addEventListener("mousedown", self.handleMouseDown.bind(self));
                controlHandle.addEventListener("touchstart", self.handleTouchDown.bind(self), { passive: true });
                controlHandle.draggable = false
                handles.push(controlHandle)
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
            self.elements["dialogContainer"].classList.add("mrbr-dialog-handle-drag")
            window.addEventListener("touchmove", self.touchMove.bind(self));
            window.addEventListener("touchend", self.touchUp.bind(self));
            self.x = touch.pageX;
            self.y = touch.pageY;
            self._activeHandle = (<HTMLElement>touchEvent.target);
            self.focus();
        }
    }
    handleMouseDown(mouseEvent: MouseEvent) {
        const self = this,
            dialogContainer = self.elements["dialogContainer"];
        mouseEvent.stopPropagation();
        mouseEvent.preventDefault();
        if (self._windowState === Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal) {
            self._activeHandle = (<HTMLElement>mouseEvent.target);
            self._startX = mouseEvent.pageX;
            self._startY = mouseEvent.pageY;
            self._startHeight = dialogContainer.offsetHeight;

            self._startWidth = dialogContainer.offsetWidth;
            self._resizeDialog = false;
            self._moveDialog = false;
            if (!self.handleMouseMove_handler) self.handleMouseMove_handler = self.handleMouseMove.bind(self);
            if (!self.windowMouseLeave_handler) self.windowMouseLeave_handler = self.handleMouseUp.bind(self);
            if (!self.handleMouseUp_handler) self.handleMouseUp_handler = self.handleMouseUp.bind(self);
            if (!self.windowMouseUp_handler) self.windowMouseUp_handler = self.handleMouseUp.bind(self);
            window.addEventListener("mousemove", self.handleMouseMove_handler);
            window.addEventListener("mouseleave", self.windowMouseLeave_handler);
            window.addEventListener("mouseout", self.windowMouseOut_handler);
            window.addEventListener("mouseup", self.windowMouseUp_handler);
            self._activeHandle.addEventListener("mouseup", self.handleMouseUp_handler);
            self.focus();
        }
    }


    touchMove() { }
    touchUp() { }
    handleMouseMove(event: MouseEvent) {
        const self = this,
            offsetX = event.pageX - self._startX,
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
            dialog = self.elements["dialogContainer"];
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
        window.removeEventListener("mousemove", self.handleMouseMove_handler);
        window.removeEventListener("mouseleave", self.windowMouseLeave_handler);
        window.removeEventListener("mouseup", self.windowMouseUp_handler);
        window.removeEventListener("mouseout", self.windowMouseOut_handler);
        self._activeHandle.removeEventListener("mouseup", self.handleMouseUp_handler);
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
}