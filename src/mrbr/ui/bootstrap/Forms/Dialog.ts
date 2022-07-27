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
    startHeight: number = 0;
    activeHandle: HTMLElement;
    resizeDialog: boolean = false;
    moveDialog: boolean = false;
    minWidth: number = 320;
    minHeight: number = 240;
    animationFrame: number = 0;
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
        this.controls["dialogContainer"] = document.createElement("div");
        this.controls["titleBar"] = document.createElement("div");
        this.controls["titleText"] = document.createElement("span");
        this.controls["contentContainer"] = document.createElement("div");
        this.controls["footer"] = document.createElement("div");

        let style = this.controls["dialogContainer"].style
        style.position = "absolute";
        style.top = "0px";
        style.left = "0px";
        style.width = "640px"
        style.height = "480px"

        this.controls["dialogContainer"].classList.add("border")
        this.controls["dialogContainer"].classList.add("shadow")
        this.controls["dialogContainer"].classList.add("d-flex")
        this.controls["dialogContainer"].classList.add("flex-column")
        this.controls["dialogContainer"].classList.add("border-1")
        this.controls["dialogContainer"].classList.add("border-dark")

        this.controls["titleBar"].classList.add("container-fluid")
        this.controls["titleBar"].classList.add("bg-dark")
        this.controls["titleBar"].classList.add("d-flex")
        //this.controls["titleBar"].style.height = "4rem";

        this.controls["footer"].classList.add("container-fluid")
        this.controls["footer"].classList.add("bg-dark")
        this.controls["footer"].classList.add("d-flex")
        this.controls["footer"].classList.add("p-4")
        //this.controls["footer"].style.height = "3rem";





        this.controls["titleText"].textContent = "Title Text";

        this.controls["titleText"].classList.add("row")
        this.controls["titleText"].classList.add("justify-content-center")
        this.controls["titleText"].classList.add("align-self-center")
        this.controls["titleText"].classList.add("text-light")
        this.controls["titleText"].classList.add("p-3")
        //this.controls["titleText"].style.height = "1rem";

        this.controls["titleBar"].appendChild(this.controls["titleText"])
        this.controls["dialogContainer"].appendChild(this.controls["titleBar"]);

        this.controls["contentContainer"].classList.add("container-fluid")
        this.controls["contentContainer"].classList.add("h-100")
        this.controls["contentContainer"].classList.add("p-1")
        this.controls["contentContainer"].classList.add("bg-light")

        this.controls["dialogContainer"].appendChild(this.controls["contentContainer"]);
        this.controls["dialogContainer"].appendChild(this.controls["footer"]);


        this.controls["mrbr-dialog-handle-n"] = document.createElement("div");
        this.controls["mrbr-dialog-handle-s"] = document.createElement("div");
        this.controls["mrbr-dialog-handle-e"] = document.createElement("div");
        this.controls["mrbr-dialog-handle-w"] = document.createElement("div");
        this.controls["mrbr-dialog-handle-nw"] = document.createElement("div");
        this.controls["mrbr-dialog-handle-se"] = document.createElement("div");
        this.controls["mrbr-dialog-handle-ne"] = document.createElement("div");
        this.controls["mrbr-dialog-handle-sw"] = document.createElement("div");


        let handles = [
            "n",
            "s",
            "e",
            "w",
            "nw",
            "se",
            "ne",
            "sw"
        ];
        handles
            .forEach(handle => {
                self.controls[handle] = document.createElement("div");
                let controlHandle: HTMLElement = this.controls[handle];
                controlHandle.dataset.handle = handle.substring(handle.length - 2);
                controlHandle.dataset.lat = handle.includes("n") ? "n" : (handle.includes("s") ? "s" : "")
                controlHandle.dataset.long = handle.includes("e") ? "e" : (handle.includes("w") ? "w" : "")
                controlHandle.classList.add(`mrbr-dialog-handle`);
                controlHandle.classList.add(`mrbr-dialog-handle-${handle}`);
                controlHandle.dataset.handle = handle;
                controlHandle.addEventListener("mousedown", self.handleMouseDown.bind(self));
                controlHandle.addEventListener("touchstart", self.handleTouchDown.bind(self), { passive: true });
                self.controls["dialogContainer"].appendChild(controlHandle);
            })

        config.host.appendChild(this.controls["dialogContainer"]);



    }
    get controls() {
        return this._controls;
    }
    get width(): number { return this._width }
    set width(value: number) { this._width = Math.max(value, this.minWidth); }
    get height(): number { return this._height }
    set height(value: number) { this._height = Math.max(value, this.minHeight); }
    get x(): number { return this._x }
    set x(value: number) { this._x = Math.max(value, 0); }
    get y(): number { return this._y }
    set y(value: number) { this._y = Math.max(value, 0); }
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
            self.activeHandle = (<HTMLElement>touchEvent.target);
            self.focus();
        }
    }
    handleMouseDown(mouseEvent: MouseEvent) {
        const self = this;
        mouseEvent.stopPropagation();
        mouseEvent.cancelable && mouseEvent.preventDefault();
        if (self.isMaximised === false) {
            self.controls["dialogContainer"].classList.add("mrbr-dialog-handle-drag")
            self.activeHandle = (<HTMLElement>mouseEvent.target);
            self._startX = mouseEvent.pageX;
            self._startY = mouseEvent.pageY;
            self.startHeight = self.controls["dialogContainer"].offsetHeight;
            self._startWidth = self.controls["dialogContainer"].offsetWidth;
            self.height = self.controls["dialogContainer"].offsetHeight;
            self.width = self.controls["dialogContainer"].offsetWidth;
            self.resizeDialog = false;
            self.moveDialog = false;
            self.handleMouseMove_handler = self.mouseMove.bind(self);
            self.windowMouseLeave_handler = self.mouseUp.bind(self);
            self.handleMouseUp_handler = self.mouseUp.bind(self);
            self.windowMouseUp_handler = self.mouseUp.bind(self);
            window.addEventListener("mousemove", self.handleMouseMove_handler);
            window.addEventListener("mouseleave", self.windowMouseLeave_handler);
            window.addEventListener("mouseout", self.windowMouseOut_handler);
            window.addEventListener("mouseup", self.windowMouseUp_handler);
            self.activeHandle.addEventListener("mouseup", self.handleMouseUp_handler);
            self.focus();
        }
    }
    handleMouseUp_handler: any;
    windowMouseUp_handler: any;
    handleMouseMove_handler: any;
    windowMouseLeave_handler: any;
    windowMouseOut_handler: any;

    touchMove() { }
    touchUp() { }
    mouseMove(event: MouseEvent) {
        const self = this,
            offsetX = event.pageX - self._startX,
            offsetY = event.pageY - self._startY,
            latitide = self.activeHandle.dataset.lat,
            longitude = self.activeHandle.dataset.long;

        if (longitude === "e") {
            self.width = self._startWidth + offsetX;
            self.resizeDialog = true;
        }
        else if (longitude === "w") {
            self.x = self._startX + offsetX;
            self.width = self._startWidth - offsetX;
            self.resizeDialog = true;
            self.moveDialog = true;
        }
        if (latitide === "s") {
            self.height = self.startHeight + offsetY;
            self.resizeDialog = true;
        }
        else if (latitide === "n") {
            self.y = self._startY + offsetY;
            self.height = self.startHeight - offsetY;
            self.resizeDialog = true;
            self.moveDialog = true;
        }
        if (self.animationFrame === 0) {
            self.animationFrame = window.requestAnimationFrame(self.drawDialog.bind(self));
        }
        if (event.pageX < -3 || event.pageY < -3) {
            self.mouseUp(null);
        }
    }
    drawDialog() {
        const self = this,
            dialog = self.controls["dialogContainer"];

        if (self.resizeDialog === true) {
            dialog.style.width = `${self.width}px`
            dialog.style.height = `${self.height}px`
        }
        if (self.moveDialog === true) {
            dialog.style.transform = `translate(${this.x}px,${this.y}px)`
        }
        self.resizeDialog = false;
        self.moveDialog = false;
        self.animationFrame = 0;
    }
    focus() { }
    mouseUp(event) {
        const self = this;
        window.removeEventListener("mousemove", self.handleMouseMove_handler);
        window.removeEventListener("mouseleave", self.windowMouseLeave_handler);
        window.removeEventListener("mouseup", self.windowMouseUp_handler);
        window.removeEventListener("mouseout", self.windowMouseOut_handler);
        self.activeHandle.removeEventListener("mouseup", self.handleMouseUp_handler);
    }
}