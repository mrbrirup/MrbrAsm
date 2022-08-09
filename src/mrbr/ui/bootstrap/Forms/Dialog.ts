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
    public static TITLEBAR_CONTROL_NAME: string = "titlebar";
    public static TITLE_TEXT_CONTROL_NAME: string = "titleText";
    public static DRAG_HANDLE_CONTROL_NAME: string = "titlebar_drag_handle";
    public static RESIZE_HANDLE_CONTROL_NAME: string = "resize_handles";
    public static CONTROL_BOX_CONTROL_NAME: string = "controlBox";
    public static CONTENT_CONTAINER_CONTROL_NAME: string = "contentContainer";
    public static FOOTER_CONTROL_NAME: string = "footer";

    private _bounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    private _newBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    private _parentBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    private _minBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 320, 240);
    private _lastBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    private _resizeDialog: boolean = false;
    private _moveDialog: boolean = false;
    private _animationFrame: number = 0;
    private _title: string = "";
    private _titleBar: boolean = true;
    private _controlBox: boolean = true;
    private _minimiseBox: boolean = false;
    private _maximiseBox: boolean = false;
    private _closeBox: boolean = false;
    private _fullScreenBox: boolean = false;
    private _acceptButton: HTMLElement = null;
    private _cancelButton: HTMLElement = null;
    private _startPosition: number = 0;
    private _dialogBorderStyle: number = 0;
    private _icon: string = "";
    private _handleSize: string = "";
    private _dialogResult: number = 0;
    private _parentElement: HTMLElement = null;
    private _windowState: Mrbr_UI_Bootstrap_Forms_Dialog$States = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
    private _footer: boolean = false;
    private _draggable: boolean = false;
    private _resizable: boolean = false;
    constructor(rootElementName: string) {
        super(rootElementName);
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        self.createElement(new Mrbr_UI_Controls_ControlConfig(this.rootElementName, "div",
            {
                classes: ["border", "shadow", "d-flex", "flex-column", "border-1", "border-dark", "d-none"],
                styles: { transform: `translate(${this.bounds.x}px,${this.bounds.y}px)`, position: "absolute", top: "0px", left: "0px", width: `${self.bounds.width}px`, height: `${self.bounds.height}` },
                children: [
                    new ctrlCfg(Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME, "div", {
                        classes: ["container-fluid", "h-100", "p-1", "bg-light"],
                        styles: { "minHeight": `${self._minBounds.height / 2}px` }
                    })
                ]
            }));
        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }
    }
    get contentContainer(): HTMLElement { return this.elements[Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME]; }
    get bounds(): Mrbr_Geometry_Bounds2d { return this._bounds; }
    get newBounds(): Mrbr_Geometry_Bounds2d { return this._newBounds; }
    _drawDialog: () => any;
    setParentBounds() {
        const self = this;
        self._parentBounds.setBounds(
            0,
            0,
            self.parentElement.clientWidth,
            self.parentElement.clientHeight)
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
            self.attributes(self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME].elements[Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxControls["maximise"].imageName], { src: "/htmlTest/images/forms/restoreWindow.svg" });
            self._lastBounds.setBounds(
                self.bounds.x,
                self.bounds.y,
                self.bounds.width,
                self.bounds.height
            );
            self.setParentBounds();
            const endTime = Date.now() + Math.floor(750 / 60) * 60,
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
            self.attributes(self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME].elements[Mrbr_UI_Bootstrap_Forms_ControlBox.controlBoxControls["maximise"].imageName], { src: "/htmlTest/images/forms/maximise.svg" });
        }
    }
    createTitleBar() {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        if (self.titleBar !== true) { return; }
        self.createElement(
            new ctrlCfg(Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME, "div", {
                classes: ["mrbr-dialog-handle-drag", "container-fluid", "bg-dark", "d-flex", "user-select-none"],
                children: [
                    new ctrlCfg(Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME, "span",
                        {
                            classes: ["row", "justify-content-left", "align-self-center", "text-light", "py-1", "pe-1", "ps-3", "flex-fill"],
                            styles: { "pointerEvents": "none" },
                            properties: { textContent: self.title }
                        })
                ]
            })
        )
        self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME].prepend(self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME]);

    }
    createFooter() {
        const self = this;
        if (self.footer !== true) { return; }
        self.createElement(
            new Mrbr_UI_Controls_ControlConfig(Mrbr_UI_Bootstrap_Forms_Dialog.FOOTER_CONTROL_NAME, "div", {
                classes: ["container-fluid", "bg-dark", "d-flex", "p-4"],
                styles: { height: "3rem" }
            })
        )
        self.rootElement.append(self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.FOOTER_CONTROL_NAME]);
    }
    createControlBox() {
        const self = this;
        if (self.titleBar !== true || self.controlBox !== true) { return; }
        const controlBox = self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME] = new Mrbr_UI_Bootstrap_Forms_ControlBox(Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME);
        controlBox.minimiseBox = self.minimiseBox;
        controlBox.maximiseBox = self.maximiseBox;
        controlBox.closeBox = self.closeBox;
        controlBox.fullScreenBox = self.fullScreenBox;
        self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME].appendChild(self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME].rootElement)
        self.events[Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
            context: self,
            eventName: Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME,
            eventTarget: self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME],
            event: self.controlBoxClick
        }

    }
    addDragHandle() {
        const self = this
        if (self.titleBar !== true || self.draggable !== true) { return; }
        let titlebar = self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME];
        if (!(titlebar) || !self.rootElement || !self.parentElement) { return; }
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.DRAG_HANDLE_CONTROL_NAME] = new Mrbr_UI_Controls_Handles_Drag(titlebar, self.rootElement, self.parentElement);
        self.events[Mrbr_UI_Controls_Handles_Drag.DRAGGING_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
            context: self,
            eventName: Mrbr_UI_Controls_Handles_Drag.DRAGGING_EVENT_NAME,
            eventTarget: self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.DRAG_HANDLE_CONTROL_NAME],
            event: self.dragDialog
        }
    }

    dragDialog(event: CustomEvent) {
        const self = this;
        let bounds = (<Mrbr_Geometry_Bounds2d>event.detail);
        self.newBounds.setFromBounds(bounds)
        self._moveDialog = true;
        if (self._animationFrame === 0) { self._animationFrame = window.requestAnimationFrame(self._drawDialog); }
    }

    removeDragHandle() {
        const self = this;
        self.events[Mrbr_UI_Controls_Handles_Drag.DRAGGING_EVENT_NAME]?.remove();
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.DRAG_HANDLE_CONTROL_NAME]?.dispose();
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.DRAG_HANDLE_CONTROL_NAME] = null;
    }

    addResizeHandles() {
        const self = this;
        if (self.resizable !== true) { return; }
        if (!self.rootElement || !self.parentElement) { return; }
        if (self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME] === null) {
            self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME] = new Mrbr_UI_Controls_Handles_Resize(self.rootElement, self.parentElement);
            self.events[Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
                eventName: Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME,
                eventTarget: self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME],
                event: self.resizeHandle_resizing,
                context: self
            }
        }
    }
    removeResizeHandles() {
        const self = this;
        self.events[Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME].remove()
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME]?.dispose();
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME] = null;
    }
    createDialog() {
        const self = this
        self.createTitleBar();
        self.createFooter();
        self.createControlBox();
        self.addDragHandle();
        self.addResizeHandles();
        self.setParentBounds();
        self.newBounds.setXY(
            self.parentBounds.x,
            self.parentBounds.y
        )
        self._resizeDialog = true;
        self._moveDialog = true;
        self.parentElement.appendChild(self.rootElement);
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
    show() {
        this.createDialog();
        this.drawDialog();
        this.classes(this.rootElement, Mrbr_UI_Bootstrap_Controls_ClassActions.Remove, "d-none")
    }
    showDialog() {
        this.createDialog()
        this.drawDialog();
        this.classes(this.rootElement, Mrbr_UI_Bootstrap_Controls_ClassActions.Remove, "d-none")
    }
    public get parentBounds(): Mrbr_Geometry_Bounds2d {
        return this._parentBounds;
    }
    public set parentBounds(value: Mrbr_Geometry_Bounds2d) {
        this._parentBounds = value;
    }
    public get resizable(): boolean {
        return this._resizable;
    }
    public set resizable(value: boolean) {
        this._resizable = value;
        if (this._resizable === true) { this.addResizeHandles() } else { this.removeResizeHandles(); }
    }
    public get draggable(): boolean {
        return this._draggable;
    }
    public set draggable(value: boolean) {
        this._draggable = value;
        if (this._draggable === true) { this.addDragHandle() } else { this.removeDragHandle(); }
    }
    public get footer(): boolean {
        return this._footer;
    }
    public set footer(value: boolean) {
        this._footer = value;
    }
    public get parentElement(): HTMLElement {
        return this._parentElement || document.body;
    }
    public set parentElement(value: HTMLElement) {
        this._parentElement = value;
    }
    public get dialogResult(): number {
        return this._dialogResult;
    }
    public set dialogResult(value: number) {
        this._dialogResult = value;
    }
    public get handleSize(): string {
        return this._handleSize;
    }
    public set handleSize(value: string) {
        this._handleSize = value;
    }
    public get icon(): string {
        return this._icon;
    }
    public set icon(value: string) {
        this._icon = value;
    }
    public get dialogBorderStyle(): number {
        return this._dialogBorderStyle;
    }
    public set dialogBorderStyle(value: number) {
        this._dialogBorderStyle = value;
    }
    public get startPosition(): number {
        return this._startPosition;
    }
    public set startPosition(value: number) {
        this._startPosition = value;
    }
    public get cancelButton(): HTMLElement {
        return this._cancelButton;
    }
    public set cancelButton(value: HTMLElement) {
        this._cancelButton = value;
    }
    public get acceptButton(): HTMLElement {
        return this._acceptButton;
    }
    public set acceptButton(value: HTMLElement) {
        this._acceptButton = value;
    }
    public get fullScreenBox(): boolean {
        return this._fullScreenBox;
    }
    public set fullScreenBox(value: boolean) {
        this._fullScreenBox = value;
    }
    public get closeBox(): boolean {
        return this._closeBox;
    }
    public set closeBox(value: boolean) {
        this._closeBox = value;
    }
    public get maximiseBox(): boolean {
        return this._maximiseBox;
    }
    public set maximiseBox(value: boolean) {
        this._maximiseBox = value;
    }
    public get minimiseBox(): boolean {
        return this._minimiseBox;
    }
    public set minimiseBox(value: boolean) {
        this._minimiseBox = value;
    }
    public get controlBox(): boolean {
        return this._controlBox;
    }
    public set controlBox(value: boolean) {
        this._controlBox = value;
    }
    public get titleBar(): boolean {
        return this._titleBar;
    }
    public set titleBar(value: boolean) {
        this._titleBar = value;
    }
    public get title(): string {
        return this._title || "";
    }
    public set title(value: string) {
        this._title = value;
        if(this.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME]){this.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME].textContent = value; }
    }
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