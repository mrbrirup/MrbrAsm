import { Mrbr_Geometry_Bounds2d } from "../../../geometry/bounds2d";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_UI_Bootstrap_Forms_ControlBox } from "./controlBox";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Event } from "./controlBox$Event";
import { Mrbr_UI_Bootstrap_Forms_ControlBox$Events } from "./controlBox$Events";
import { Mrbr_UI_Bootstrap_Forms_Dialog$States } from "./Dialog$States";
import { Mrbr_UI_Controls_Handles_Drag } from "../../controls/handles/drag";
import { Mrbr_UI_Controls_Handles_Resize } from "../../controls/handles/resize";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_Defaults } from "../controls/defaults";
import { MrbrBase } from "../../../system/MrbrBase";

type AnyOp = (...args) => void;

export class Mrbr_UI_Bootstrap_Forms_Dialog extends Mrbr_UI_Controls_Control {
    public static TITLEBAR_CONTROL_NAME: string = "titlebar";
    public static TITLE_TEXT_CONTROL_NAME: string = "titleText";
    public static DRAG_HANDLE_CONTROL_NAME: string = "titlebar_drag_handle";
    public static RESIZE_HANDLE_CONTROL_NAME: string = "resize_handles";
    public static CONTROL_BOX_CONTROL_NAME: string = "controlBox";
    public static CONTENT_CONTAINER_CONTROL_NAME: string = "contentContainer";
    public static FOOTER_CONTROL_NAME: string = "footer";
    public static DIALOG_FULLSCREEN_EVENT_NAME: string = "footer";
    protected _bounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    protected _newBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 640, 480);
    protected _parentBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    protected _minBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 320, 240);
    protected _lastBounds: Mrbr_Geometry_Bounds2d = new Mrbr_Geometry_Bounds2d(0, 0, 0, 0);
    protected _resizeDialog: boolean = false;
    protected _moveDialog: boolean = false;
    protected _animationFrame: number = 0;
    protected _title: string = "";
    protected _titleBar: boolean = true;
    protected _controlBox: boolean = true;
    protected _minimiseBox: boolean = false;
    protected _maximiseBox: boolean = false;
    protected _closeBox: boolean = false;
    protected _fullScreenBox: boolean = false;
    protected _acceptButton: HTMLElement = null;
    protected _cancelButton: HTMLElement = null;
    protected _startPosition: number = 0;
    protected _dialogBorderStyle: number = 0;
    protected _icon: string = "";
    protected _handleSize: string = "";
    protected _dialogResult: number = 0;
    protected _parentElement: HTMLElement = null;
    protected _dialogState: Mrbr_UI_Bootstrap_Forms_Dialog$States = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
    protected _footer: boolean = false;
    protected _draggable: boolean = false;
    protected _resizable: boolean = false;
    constructor(rootElementName: string) {
        super(rootElementName);
        const self = this
        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }
    }

    initialise(...args): Mrbr_System_Promise<any> {
        const self = this,
            muccop = Mrbr_UI_Controls_ControlConfigOptionalParameters,
            initialisePromise = Mrbr_System_Promise.create("");
        super.initialise(args)
            .then(async _ => {
                MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MANIFEST])
                    .then(_ => {

                        if (!self._drawDialog) { self._drawDialog = self.drawDialog.bind(self) }
                        !self.defaultConfig.has(self.rootElementName) && self.defaultConfig.add(self.rootElementName, new muccop()
                            .Classes(["border", "shadow", "d-flex", "flex-column", "border-1", "border-dark", "d-none"])
                            .Styles({
                                transform: `translate(${self.bounds.x}px,${self.bounds.y}px)`, position: "absolute", top: "0px", left: "0px", width: `${self.bounds.width}px`, height: `${self.bounds.height}`
                            }));
                        !self.defaultConfig.has(Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME) &&
                            self.defaultConfig.add(Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME, new muccop()
                                .Classes(["container-fluid", "h-100", "p-1", "bg-light", "d-flex", "flex-column"])
                                .Styles({ "minHeight": `${self._minBounds.height / 2}px` })
                            )
                        !self.defaultConfig.has(Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME) &&
                            self.defaultConfig.add(Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME,
                                new muccop()
                                    .Classes(["mrbr-dialog-handle-drag", "container-fluid", "bg-dark", "d-flex", "user-select-none", "pe-0"])
                                    .Styles({ height: "3rem" })
                                    .LightTheme("bg-light")
                                    .DarkTheme("bg-dark")
                            );
                        !self.defaultConfig.has(Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME) &&
                            self.defaultConfig.add(Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME,
                                new muccop()
                                    .Classes(["row", "justify-content-left", "align-self-center", "text-light", "py-1", "pe-1", "ps-3", "flex-fill"])
                                    .LightTheme(Mrbr_UI_Bootstrap_Controls_Defaults.textDark)
                                    .DarkTheme(Mrbr_UI_Bootstrap_Controls_Defaults.textLight)
                                    .Styles({ "pointerEvents": "none" })
                                    .Properties({ textContent: self.title })
                            )
                        !self.defaultConfig.has(Mrbr_UI_Bootstrap_Forms_Dialog.FOOTER_CONTROL_NAME) &&
                            self.defaultConfig.add(Mrbr_UI_Bootstrap_Forms_Dialog.FOOTER_CONTROL_NAME,
                                new muccop()
                                    .Classes(["container-fluid", "bg-dark", "d-flex", "p-4"])
                                    .Styles({ height: "3rem" })
                                    .LightTheme("bg-light")
                                    .DarkTheme("bg-dark")
                            )

                        self.createRootElement();
                        self.createTitleBar();
                        self.createFooter();
                        self.createControlBox()
                            .then(_ => {

                                self.addDragHandle();
                                self.addResizeHandles();
                                self.setParentBounds();
                                self.newBounds.setXY(
                                    self.parentBounds.x,
                                    self.parentBounds.y
                                )
                                self._resizeDialog = true;
                                self._moveDialog = true;
                                initialisePromise.resolve(this);
                            })
                    })
            })
        return initialisePromise;
    }

    protected _rootElementConfig(): Mrbr_UI_Controls_ControlConfig {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        return new ctrlCfg(this.rootElementName, "div", self.configuration(this.rootElementName)
            .Children([new ctrlCfg(Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME, "div", self.configuration(Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME))]));
    }

    protected _titleBarConfig(): Mrbr_UI_Controls_ControlConfig {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        return new ctrlCfg(Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME, "div", self.configuration(Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME)
            .Children([new ctrlCfg(Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME, "span", self.configuration(Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME))]));
    }
    protected _footerConfig(): Mrbr_UI_Controls_ControlConfig {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        return new ctrlCfg(Mrbr_UI_Bootstrap_Forms_Dialog.FOOTER_CONTROL_NAME, "div", self.configuration(Mrbr_UI_Bootstrap_Forms_Dialog.FOOTER_CONTROL_NAME))
    }

    public get footerConfig() {
        return this._footerConfig();
    }
    public get rootElementConfig() {
        return this._rootElementConfig();
    }
    public get titleBarConfig() {
        return this._titleBarConfig();
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
            denominator = 2;
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
        const detail: Mrbr_UI_Bootstrap_Forms_ControlBox$Events = event.detail;
        if (controlBoxEvents.maximise === detail) { self.maximiseDialog(event); }
        else if (controlBoxEvents.fullScreen === detail) {
            self.fullScreenDialog();
            self.events[Mrbr_UI_Bootstrap_Forms_Dialog.DIALOG_FULLSCREEN_EVENT_NAME] = new Mrbr_System_Events_EventHandler(
                "fullscreenchange",
                document,
                self.exitFullScreenHandler,
                self
            )
        }

    }
    exitFullScreenHandler(event: Event) {
        const self = this;
        if (!document.fullscreenElement) {
            self.dialogState = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
            self.events[Mrbr_UI_Bootstrap_Forms_Dialog.DIALOG_FULLSCREEN_EVENT_NAME].remove();
        }
    }
    fullScreenDialog() {
        const self = this;
        if (self.dialogState !== Mrbr_UI_Bootstrap_Forms_Dialog$States.FullScreen) {
            self.rootElement.requestFullscreen();
            self.dialogState = Mrbr_UI_Bootstrap_Forms_Dialog$States.FullScreen;
        }
        else {
            document.exitFullscreen();
            self.dialogState = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
        }
    }
    private defaultMaximise(event: Mrbr_UI_Bootstrap_Forms_ControlBox$Event) {
        const self = this;
        self.newBounds.setBounds(self._parentBounds.x, self._parentBounds.y, self._parentBounds.width - self._parentBounds.x, self._parentBounds.height - self._parentBounds.y);
        self._moveDialog = self._resizeDialog = true;
        self.drawDialog();
    }
    private defaultRestoreFromMaximised(event: Mrbr_UI_Bootstrap_Forms_ControlBox$Event) {
        const self = this;
        self.dialogState = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
        (<Mrbr_UI_Bootstrap_Forms_ControlBox>self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME]).dialogState = self.dialogState;
        self.newBounds.setFromBounds(self._lastBounds);
        self._moveDialog = true;
        self._resizeDialog = true;
        self.drawDialog();
    }
    private _customMaximise: AnyOp;
    public get customMaximise(): AnyOp {
        return this._customMaximise;
    }
    public set customMaximise(value: AnyOp) {
        const self = this;
        self._customMaximise = value.bind(self);
    }
    maximiseDialog(event: Mrbr_UI_Bootstrap_Forms_ControlBox$Event) {
        const self = this;
        if (self.dialogState !== Mrbr_UI_Bootstrap_Forms_Dialog$States.Maximised) {
            self.dialogState = Mrbr_UI_Bootstrap_Forms_Dialog$States.Maximised;
            (<Mrbr_UI_Bootstrap_Forms_ControlBox>self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME]).dialogState = self.dialogState;
            self._lastBounds.setBounds(self.bounds.x, self.bounds.y, self.bounds.width, self.bounds.height);
            self.customMaximise ? self.customMaximise(event) : self.defaultMaximise(event);
        }
        else if (self.dialogState === Mrbr_UI_Bootstrap_Forms_Dialog$States.Maximised) {
            // self.dialogState = Mrbr_UI_Bootstrap_Forms_Dialog$States.Normal;
            // (<Mrbr_UI_Bootstrap_Forms_ControlBox>self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME]).dialogState = self.dialogState;
            // self.bounds.setFromBounds(self._lastBounds);
            // self._moveDialog = true;
            // self._resizeDialog = true;
            // self.drawDialog();
            //self._lastBounds.setBounds(self.bounds.x, self.bounds.y, self.bounds.width, self.bounds.height);
            //self.customMaximise ? self.customMaximise(event) : self.defaultMaximise(event);
            self.defaultRestoreFromMaximised(event);
        }
    }
    createRootElement() {
        const self = this;
        self.createElement(self.rootElementConfig);
    }
    createTitleBar() {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        if (self.titleBar !== true) { return; }
        self.createElement(self.titleBarConfig)
        self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.CONTENT_CONTAINER_CONTROL_NAME].prepend(self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME]);
    }
    createFooter() {
        const self = this;
        if (self.footer !== true) { return; }
        self.createElement(self.footerConfig)
        self.rootElement.append(self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.FOOTER_CONTROL_NAME]);
    }

    async createControlBox() {
        const self = this;
        if (self.titleBar !== true || self.controlBox !== true) { return; }
        const controlBox = self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME] = new Mrbr_UI_Bootstrap_Forms_ControlBox(Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME);
        controlBox.minimiseBox = self.minimiseBox;
        controlBox.maximiseBox = self.maximiseBox;
        controlBox.closeBox = self.closeBox;
        controlBox.fullScreenBox = self.fullScreenBox;
        await controlBox.initialise();
        self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME].appendChild(self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME].rootElement)
        self.events[Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME] = new Mrbr_System_Events_EventHandler(
            Mrbr_UI_Bootstrap_Forms_ControlBox.CONTROL_BOX_CLICK_EVENT_NAME,
            self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME],
            self.controlBoxClick,
            self
        )

    }
    addDragHandle() {
        const self = this
        if (self.titleBar !== true || self.draggable !== true) { return; }
        let titlebar = self.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLEBAR_CONTROL_NAME];
        if (!(titlebar) || !self.rootElement || !self.parentElement) { return; }
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.DRAG_HANDLE_CONTROL_NAME] = new Mrbr_UI_Controls_Handles_Drag(titlebar, self.rootElement, self.parentElement);
        self.events[Mrbr_UI_Controls_Handles_Drag.DRAGGING_EVENT_NAME] = new Mrbr_System_Events_EventHandler(
            Mrbr_UI_Controls_Handles_Drag.DRAGGING_EVENT_NAME,
            self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.DRAG_HANDLE_CONTROL_NAME],
            self.dragDialog,
            self
        )
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
            self.events[Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME] = new Mrbr_System_Events_EventHandler(
                Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME,
                self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME],
                self.resizeHandle_resizing,
                self
            )
        }
    }
    removeResizeHandles() {
        const self = this;
        self.events[Mrbr_UI_Controls_Handles_Resize.RESIZING_EVENT_NAME].remove()
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME]?.dispose();
        self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.RESIZE_HANDLE_CONTROL_NAME] = null;
    }
    // async initialise(...args: any): Mrbr_System_MrbrPromise<any> {
    //     const self = this
    //     const retval = Mrbr_System_MrbrPromise.CreateMrbrPromise("");
    //     await super.initialise(args);
    //     self.createRootElement();
    //     self.createTitleBar();
    //     self.createFooter();
    //     await self.createControlBox();
    //     self.addDragHandle();
    //     self.addResizeHandles();
    //     self.setParentBounds();
    //     self.newBounds.setXY(
    //         self.parentBounds.x,
    //         self.parentBounds.y
    //     )
    //     self._resizeDialog = true;
    //     self._moveDialog = true;
    //     retval.resolve(this);
    //     return retval;
    // }
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
    get dialogState(): Mrbr_UI_Bootstrap_Forms_Dialog$States {
        return this._dialogState;
    }
    set dialogState(value: Mrbr_UI_Bootstrap_Forms_Dialog$States) {
        const self = this;
        this._dialogState = value;
        (<Mrbr_UI_Bootstrap_Forms_ControlBox>self.controls[Mrbr_UI_Bootstrap_Forms_Dialog.CONTROL_BOX_CONTROL_NAME]).dialogState = self.dialogState;
    }
    show() {
        const self = this;
        //self.initialise();
        self.parentElement.appendChild(self.rootElement);
        self.drawDialog();
        self.classes(this.rootElement, Mrbr_UI_Controls_ClassActions.remove, "d-none")
    }
    showDialog() {
        const self = this;
        //await self.initialise()
        self.parentElement.appendChild(self.rootElement);
        self.drawDialog();
        self.classes(this.rootElement, Mrbr_UI_Controls_ClassActions.remove, "d-none")
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
        if (this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]) { (<Mrbr_UI_Bootstrap_Forms_ControlBox>this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]).fullScreenBox = value; }
    }
    public get closeBox(): boolean {
        return this._closeBox;
    }
    public set closeBox(value: boolean) {
        this._closeBox = value;
        if (this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]) { (<Mrbr_UI_Bootstrap_Forms_ControlBox>this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]).closeBox = value; }
    }
    public get maximiseBox(): boolean {
        return this._maximiseBox;
    }
    public set maximiseBox(value: boolean) {
        this._maximiseBox = value;
        if (this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]) { (<Mrbr_UI_Bootstrap_Forms_ControlBox>this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]).maximiseBox = value; }
    }
    public get minimiseBox(): boolean {
        return this._minimiseBox;
    }
    public set minimiseBox(value: boolean) {
        this._minimiseBox = value;
        if (this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]) { (<Mrbr_UI_Bootstrap_Forms_ControlBox>this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]).minimiseBox = value; }
    }
    public get controlBox(): boolean {
        return this._controlBox;
    }
    public set controlBox(value: boolean) {
        this._controlBox = value;
        let action = value ? Mrbr_UI_Controls_ClassActions.remove : Mrbr_UI_Controls_ClassActions.add;
        if (this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]) {
            this.classes(
                (<Mrbr_UI_Bootstrap_Forms_ControlBox>this.controls[(<typeof Mrbr_UI_Bootstrap_Forms_Dialog>this.constructor).CONTROL_BOX_CONTROL_NAME]).rootElement,
                action,
                "d-none");
        }
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
        if (this.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME]) { this.elements[Mrbr_UI_Bootstrap_Forms_Dialog.TITLE_TEXT_CONTROL_NAME].textContent = value; }
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