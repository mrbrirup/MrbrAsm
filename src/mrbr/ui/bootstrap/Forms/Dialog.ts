import { Mrbr_UI_Bootstrap_Forms_Dialog$Handles } from "./Dialog$Handles";

type MrbrDialogParameters = {
    host: HTMLElement;
}
export class Mrbr_UI_Bootstrap_Forms_Dialog extends EventTarget {
    _controls: Map<string, HTMLElement>
    _events: Map<string, Function>;
    isMaximised: boolean = false;
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
    constructor(config: MrbrDialogParameters) {
        super();
        const self = this;
        self._events = new Map<string, Function>();
        self._controls = new Proxy(new Map<string, HTMLElement>(), {
            get(target, name) {
                return (target.has(name as string)) ? target.get(name as string) : undefined;
            },
            set(target, name, value) {
                if (value instanceof HTMLElement) {
                    if (value && !value?.dataset?.id) {
                        value.dataset.id = <string>name;
                    }
                }
                target.set((name as string), value);
                return true;
            }
        })

        const dialogContainer = this.createDialog(),
            titleBar = this.createTitleBar(),
            footer = this.createFooter(),
            contentContainer = this.createContentContainer(),
            handles = this.createHandles();

        dialogContainer.appendChild(titleBar);
        dialogContainer.appendChild(contentContainer);
        dialogContainer.appendChild(footer);
        handles.forEach(handle => dialogContainer.appendChild(handle))
        config.host.appendChild(dialogContainer);


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
    get controls() {
        return this._controls;
    }
    get width(): number { return this._width }
    set width(value: number) { this._width = Math.max(value, this._minWidth); }
    get height(): number { return this._height }
    set height(value: number) { this._height = Math.max(value, this._minHeight); }
    get x(): number { return this._x }
    set x(value: number) { this._x = Math.max(value, 0); }
    get y(): number { return this._y }
    set y(value: number) { this._y = Math.max(value, 0); }


    createDialog(): HTMLElement {
        const dialog = this.controls["dialogContainer"] = document.createElement("div"),
            classListAdd = dialog.classList.add.bind(dialog.classList);
        classListAdd("border")
        classListAdd("shadow")
        classListAdd("d-flex")
        classListAdd("flex-column")
        classListAdd("border-1")
        classListAdd("border-dark")
        let style = this.controls["dialogContainer"].style
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
            titleBar = self.controls["titleBar"] = document.createElement("div"),
            titleText = self.controls["titleText"] = document.createElement("span"),
            titleBarClassListAdd = titleBar.classList.add.bind(titleBar.classList),
            titleTextClassListAdd = titleText.classList.add.bind(titleText.classList);
        titleBarClassListAdd("mrbr-dialog-handle-drag")
        titleBarClassListAdd("container-fluid")
        titleBarClassListAdd("bg-dark")
        titleBarClassListAdd("d-flex")
        titleBarClassListAdd("user-select-none")
        titleText.textContent = "Title Text";
        titleTextClassListAdd("row")
        titleTextClassListAdd("justify-content-center")
        titleTextClassListAdd("align-self-center")
        titleTextClassListAdd("text-light")
        titleTextClassListAdd("p-3")
        titleBar.appendChild(titleText)
        if (!self.titleBarMouseDown_handler) { self.titleBarMouseDown_handler = self.titleBarMouseDown.bind(this); }
        titleBar.addEventListener("mousedown", self.titleBarMouseDown_handler);
        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }
        return titleBar;
    }
    _dragXStart: number = 0;
    _dragYStart: number = 0;
    titleBarMouseDown(mouseEvent: MouseEvent) {
        mouseEvent.stopPropagation();
        const self = this,
            titleBar = self.controls["titleBar"],
            dialogContainer = self.controls["dialogContainer"];
        self._dragXStart = mouseEvent.pageX;
        self._dragYStart = mouseEvent.pageY;
        self._startX = self.x;
        self._startY = self.y;
        self._resizeDialog = false;
        self._moveDialog = false;
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
    titleBarMouseDown_handler: any;
    dragMouseMove(mouseEvent: MouseEvent) {
        const self = this,
            offsetX = mouseEvent.pageX - self._dragXStart,
            offsetY = mouseEvent.pageY - self._dragYStart;
        self.x = this._startX + offsetX;
        self.y = this._startY + offsetY;
        self._moveDialog = true;

        if (self._animationFrame === 0) {
            self._animationFrame = window.requestAnimationFrame(self._drawDialog);
        }
        if (mouseEvent.pageX < -3 || mouseEvent.pageY < -3) {
            self.handleMouseUp(null);
        }
    }
    dragMouseUp(event: MouseEvent) {
        const self = this,
            dialogContainer = this.controls["dialogContainer"],
            titleBar = this.controls["titleBar"];
        window.removeEventListener("mousemove", self.dragMouseMove_handler);
        window.removeEventListener("mouseleave", self.windowMouseLeave_handler);
        window.removeEventListener("mouseout", self.windowMouseOut_handler);
        window.removeEventListener("mouseup", self.windowDragMouseUp_handler);

        dialogContainer.removeEventListener("mousemove", self.dragMouseMove_handler);
        dialogContainer.removeEventListener("mouseup", self.windowDragMouseUp_handler);
        titleBar.addEventListener("mousedown", this.titleBarMouseDown_handler)
    }

    createFooter(): HTMLElement {
        const footer = this.controls["footer"] = document.createElement("div"),
            classListAdd = footer.classList.add.bind(footer.classList);
        classListAdd("container-fluid")
        classListAdd("bg-dark")
        classListAdd("d-flex")
        classListAdd("p-4")
        return footer;
    }
    createContentContainer(): HTMLElement {
        const contentContainer = this.controls["contentContainer"] = document.createElement("div"),
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
                const controlHandle = self.controls[`mrbr-dialog-handle-${handle}`] = document.createElement("div");
                controlHandle.dataset.handle = handle;
                controlHandle.dataset.lat = handle.includes(dialogHandles.n) ? dialogHandles.n : (handle.includes(dialogHandles.s) ? dialogHandles.s : "")
                controlHandle.dataset.long = handle.includes(dialogHandles.e) ? dialogHandles.e : (handle.includes(dialogHandles.w) ? dialogHandles.w : "")
                controlHandle.classList.add(`mrbr-dialog-handle`);
                controlHandle.classList.add(`mrbr-dialog-handle-${handle}`);
                controlHandle.dataset.handle = handle;
                controlHandle.addEventListener("mousedown", self.handleMouseDown.bind(self));
                controlHandle.addEventListener("touchstart", self.handleTouchDown.bind(self), { passive: true });
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

        if (self.isMaximised === false) {
            self.controls["dialogContainer"].classList.add("mrbr-dialog-handle-drag")
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
            dialogContainer = self.controls["dialogContainer"];
        mouseEvent.stopPropagation();
        mouseEvent.cancelable && mouseEvent.preventDefault();
        if (self.isMaximised === false) {
            self._activeHandle = (<HTMLElement>mouseEvent.target);
            self._startX = mouseEvent.pageX;
            self._startY = mouseEvent.pageY;
            self._startHeight = dialogContainer.offsetHeight;
            self._startWidth = dialogContainer.offsetWidth;
            self.height = dialogContainer.offsetHeight;
            self.width = dialogContainer.offsetWidth;
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
            dialogHandles = Mrbr_UI_Bootstrap_Forms_Dialog$Handles;

        if (longitude === dialogHandles.e) {
            self.width = self._startWidth + offsetX;
            self._resizeDialog = true;
        }
        else if (longitude === dialogHandles.w) {
            self.x = self._startX + offsetX;
            self.width = self._startWidth - offsetX;
            self._resizeDialog = true;
            self._moveDialog = true;
        }
        if (latitide === dialogHandles.s) {
            self.height = self._startHeight + offsetY;
            self._resizeDialog = true;
        }
        else if (latitide === dialogHandles.n) {
            self.y = self._startY + offsetY;
            self.height = self._startHeight - offsetY;
            self._resizeDialog = true;
            self._moveDialog = true;
        }
        if (self._animationFrame === 0) {
            self._animationFrame = window.requestAnimationFrame(self._drawDialog);
        }
        if (event.pageX < -3 || event.pageY < -3) {
            self.handleMouseUp(null);
        }
    }
    drawDialog() {
        const self = this,
            dialog = self.controls["dialogContainer"];

        if (self._resizeDialog === true) {
            dialog.style.width = `${self.width}px`
            dialog.style.height = `${self.height}px`
        }
        if (self._moveDialog === true) {
            dialog.style.transform = `translate(${this.x}px,${this.y}px)`
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
}