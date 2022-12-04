import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_ModalDialogSizings } from "./ModalDialogSizings";
import { Mrbr_UI_Bootstrap_Controls_ModalEvents } from "./ModalEvents";
import { Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings as Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings } from "./ModalFullScreenSizings";
import { Mrbr_UI_Bootstrap_Controls_ModalEvent } from "./ModalEvent";
import { Mrbr_UI_Bootstrap_Controls_ModalEventData } from "./ModalEventData";

export class Mrbr_UI_Bootstrap_Controls_Modal extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Fields

    /**
     * Internal Modal Name
     * @date 04/12/2022 - 21:37:52
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_NAME: string = "modal";

    /**
     * Internal Modal Dialog Name
     * @date 04/12/2022 - 21:38:06
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_DIALOG_NAME: string = "modal_dialog";

    /**
     * Internal Modal Content Name
     * @date 04/12/2022 - 21:38:21
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_CONTENT_NAME: string = "modal_content";

    /**
     * Internal Modal Header Name
     * @date 04/12/2022 - 21:38:39
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_HEADER_NAME: string = "modal_header";

    /**
     * Internal Modal Body Name
     * @date 04/12/2022 - 21:38:54
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_BODY_NAME: string = "modal_body";

    /**
     * Internal Modal Footer Name
     * @date 04/12/2022 - 21:39:06
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_FOOTER_NAME: string = "modal_footer";

    /**
     * Internal Modal Title Name
     * @date 04/12/2022 - 21:39:22
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_TITLE_NAME: string = "modal_titlebar";

    /**
     * Internal Modal Close Button Name
     * @date 04/12/2022 - 21:39:35
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly MODAL_CLOSE_BUTTON_NAME: string = "modal_close_button";
    //#endregion Public Static Fields
    //#region Public Static Enums




    //#endregion Public Static Enums
    //#region Private Fields

    /**
     * Dialog Title Text Field
     * @date 04/12/2022 - 21:40:10
     *
     * @private
     * @type {string}
     */
    private _titleText: string;

    /**
     * Show/Hide Close Button Field
     * @date 04/12/2022 - 21:40:22
     *
     * @private
     * @type {boolean}
     */
    private _closeButton: boolean = false;

    /**
     * Use Fade Effect Field
     * @date 04/12/2022 - 21:40:47
     *
     * @private
     * @type {boolean}
     */
    private _fade: boolean = false;

    /**
     * Show/Hide Footer Field
     * @date 04/12/2022 - 21:40:56
     *
     * @private
     * @type {boolean}
     */
    private _footer: boolean = true;

    /**
     * Show/Hide Header Field
     * @date 04/12/2022 - 21:41:22
     *
     * @private
     * @type {boolean}
     */
    private _header: boolean = true;

    /**
     * Full Screen Responsive Sizing Field
     * @date 04/12/2022 - 21:41:33
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings}
     */
    private _fullScreenSizing: Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings;

    /**
     * Modal Size Field
     * @date 04/12/2022 - 21:41:43
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_ModalDialogSizings}
     */
    private _modalSize: Mrbr_UI_Bootstrap_Controls_ModalDialogSizings;

    /**
     * Show/Hide Static Backdrop on Modal Show Field
     * @date 04/12/2022 - 21:44:08
     *
     * @private
     * @type {boolean}
     */
    private _staticBackdrop: boolean = false;

    /**
     * Show Title Field
     * @date 04/12/2022 - 21:44:38
     *
     * @private
     * @type {boolean}
     */
    private _title: boolean = true;

    /**
     * Vertical Centre Modal Field
     * @date 04/12/2022 - 21:44:50
     *
     * @private
     * @type {boolean}
     */
    private _verticalCenter: boolean = false;

    /**
     * Scrollable Modal Content Field
     * @date 04/12/2022 - 21:45:12
     *
     * @private
     * @type {boolean}
     */
    private _scrollable: boolean = false;
    //#endregion Private Fields
    //#region Public Properties

    /**
     * Dialog Title Text Property
     * @date 04/12/2022 - 21:45:36
     *
     * @public
     * @type {string}
     */
    public get titleText(): string { return this._titleText; }

    /**
     * Dialog Title Text Property
     */
    public set titleText(value: string) { this._titleText = value; }

    /**
     * Use Fade Effect Property
     * @date 04/12/2022 - 21:46:30
     *
     * @public
     * @type {boolean}
     */
    public get fade(): boolean { return this._fade; }

    /**
     * Use Fade Effect Property
     */
    public set fade(value: boolean) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        this._fade = value;
        if (!root) { return; }
        this.classes(root, value ? act.add : act.remove, "fade");
    }

    /**
     * Show/Hide Header Property
     * @date 04/12/2022 - 21:47:16
     *
     * @public
     * @type {boolean}
     */
    public get header(): boolean { return this._header; }

    /**
     * Show/Hide Header Property
     */
    public set header(value: boolean) { this._header = value; }

    /**
     * Show/Hide Footer Property
     * @date 04/12/2022 - 21:47:32
     *
     * @public
     * @type {boolean}
     */
    public get footer(): boolean { return this._footer; }

    /**
     * Show/Hide Footer Property
     */
    public set footer(value: boolean) { this._footer = value; }

    /**
     * Allow Scrollable Modal Content Property
     * @date 04/12/2022 - 21:47:44
     *
     * @public
     * @type {boolean}
     */
    public get scrollable(): boolean { return this._scrollable; }
    public set scrollable(value: boolean) {
        const
            modalDialog = this.elements.get(this.$cls.MODAL_DIALOG_NAME),
            act = this.$clsActions;
        this._scrollable = value;
        if (!modalDialog) { return; }
        this.classes(modalDialog, value ? act.add : act.remove, "modal-dialog-scrollable");
    }

    /**
     * Show/Hide Title Property
     * @date 04/12/2022 - 21:48:02
     *
     * @public
     * @type {boolean}
     */
    public get title(): boolean { return this._title; }

    /**
     * Show/Hide Title Property
     */
    public set title(value: boolean) { this._title = value; }

    /**
     * Show/Hide Close Button Property
     * @date 04/12/2022 - 21:48:20
     *
     * @public
     * @type {boolean}
     */
    public get closeButton(): boolean { return this._closeButton; }

    /**
     * Show/Hide Close Button Property
     */
    public set closeButton(value: boolean) { this._closeButton = value; }

    /**
     * Show/Hide Static Backdrop on Modal Show Property
     * @date 04/12/2022 - 21:48:34
     *
     * @public
     * @type {boolean}
     */
    public get staticBackdrop(): boolean { return this._staticBackdrop; }

    /**
     * Show/Hide Static Backdrop on Modal Show Property
     */
    public set staticBackdrop(value: boolean) {
        const root = this.rootElement;
        this._staticBackdrop = value;
        if (!root) { return; }
        this.dataset(root, { bsBackdrop: value ? "static" : this.$cls.DELETE });
    }

    /**
     * Vertically Centre Modal Property
     * @date 04/12/2022 - 21:49:01
     *
     * @public
     * @type {boolean}
     */
    public get verticalCenter(): boolean { return this._verticalCenter; }

    /**
     * Vertically Centre Modal Property
     */
    public set verticalCenter(value: boolean) {
        const
            modalDialog = this.elements.get(this.$cls.MODAL_DIALOG_NAME),
            act = this.$clsActions;
        this._verticalCenter = value;
        if (!modalDialog) { return; }
        this.classes(modalDialog, value ? act.add : act.remove, "modal-dialog-centered");
    }

    /**
     * Modal Size Property
     * @date 04/12/2022 - 21:49:29
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_ModalDialogSizings}
     */
    public get modalSize(): Mrbr_UI_Bootstrap_Controls_ModalDialogSizings { return this._modalSize ??= this.$mds.default; }

    /**
     * Modal Size Property
     */
    public set modalSize(value: Mrbr_UI_Bootstrap_Controls_ModalDialogSizings) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        (root) && this.classes(root, act.replace, [this._modalSize, value]);
        this._modalSize = value;
    }

    /**
     * FullScreen Responsive Modal Property
     * @date 04/12/2022 - 21:49:53
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings}
     */
    public get fullScreenSizing(): Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings { return this._fullScreenSizing ??= this.$mfss.none; }

    /**
     * FullScreen Responsive Modal Property
     */
    public set fullScreenSizing(value: Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        (root) && this.classes(root, act.replace, [this._fullScreenSizing, value]);
        this._fullScreenSizing = value;
    }
    //#endregion Public Properties
    //#region Type Aliases

    /**
     * Modal Dialog Type Alias
     * @date 04/12/2022 - 21:50:59
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Modal}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Modal { return this.$bsc.Modal as typeof Mrbr_UI_Bootstrap_Controls_Modal }

    /**
     * Modal Dialog FullScreen Sizing Type Alias
     * @date 04/12/2022 - 21:51:10
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings}
     */
    public get $mfss(): typeof Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings { return this.$bsc.ModalFullScreenSizings as typeof Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings; }

    /**
     * Modal Dialog Sizing Type Alias
     * @date 04/12/2022 - 21:51:27
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ModalDialogSizings}
     */
    public get $mds(): typeof Mrbr_UI_Bootstrap_Controls_ModalDialogSizings { return this.$bsc.ModalDialogSizings as typeof Mrbr_UI_Bootstrap_Controls_ModalDialogSizings; }

    /**
     * Modal Dialog Events Name enum Alias
     * @date 04/12/2022 - 21:51:36
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ModalEvents}
     */
    public get $mes(): typeof Mrbr_UI_Bootstrap_Controls_ModalEvents { return this.$bsc.ModalEvents as typeof Mrbr_UI_Bootstrap_Controls_ModalEvents; }

    /**
     * Modal Dialog Events Type Alias
     * @date 04/12/2022 - 21:51:52
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ModalEvent}
     */
    public get $mev(): typeof Mrbr_UI_Bootstrap_Controls_ModalEvent { return this.$bsc.ModalEvent as typeof Mrbr_UI_Bootstrap_Controls_ModalEvent; }

    /**
     * Modal Dialog EventData Type Alias
     * @date 04/12/2022 - 21:52:07
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ModalEventData}
     */
    public get $mevd(): typeof Mrbr_UI_Bootstrap_Controls_ModalEventData { return this.$bsc.ModalEventData as typeof Mrbr_UI_Bootstrap_Controls_ModalEventData; }

    //#endregion Type Aliases

    //#region Private Properties




    //#endregion Private Properties
    constructor(rootElementName?: string) { super(rootElementName); }
    //#region Public Methods

    /**
     * Initialise Modal Dialog, load manifest and set properties
     * @date 04/12/2022 - 21:52:33
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Modal>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Modal> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Modal>(`${controlName}:initialise`);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                let
                    modalFooter,
                    modalBody,
                    closeButton,
                    modalTitleBar,
                    modalHeader;
                const
                    elementConfig = self.elementConfig,
                    modelLabelId = self.$cls.createId("modalLabel"),
                    cls = self.$cls,
                    ctrlCfg = self.$ctrlCfg,
                    htmlTags = self.$htmlt,
                    getConfig = elementConfig.getConfig.bind(elementConfig),
                    createElement = self.createElement.bind(self);
                (self.footer) && (
                    modalFooter = <HTMLElement>createElement(new ctrlCfg(cls.MODAL_FOOTER_NAME, htmlTags.div, getConfig(cls.MODAL_FOOTER_NAME)
                        .Properties({ innerText: "Footer" }))));
                modalBody = <HTMLElement>createElement(new ctrlCfg(cls.MODAL_BODY_NAME, htmlTags.div, getConfig(cls.MODAL_BODY_NAME)
                    .Properties({ innerText: "..." })));
                (self.closeButton) && (
                    closeButton = <HTMLElement>createElement(new ctrlCfg(cls.MODAL_CLOSE_BUTTON_NAME, htmlTags.div, getConfig(cls.MODAL_CLOSE_BUTTON_NAME))));
                (self.title) && (
                    modalTitleBar = <HTMLElement>createElement(new ctrlCfg(cls.MODAL_TITLE_NAME, htmlTags.heading1, getConfig(cls.MODAL_TITLE_NAME)
                        .Id(modelLabelId)
                        .Properties({ innerText: self.titleText }))));
                (self.header) && (
                    modalHeader = <HTMLElement>createElement(new ctrlCfg(cls.MODAL_HEADER_NAME, htmlTags.div, getConfig(cls.MODAL_HEADER_NAME)
                        .Children([modalTitleBar, closeButton].filter(element => element !== null && element !== undefined)))));
                const
                    modalContent = <HTMLElement>createElement(new ctrlCfg(cls.MODAL_CONTENT_NAME, htmlTags.div, getConfig(cls.MODAL_CONTENT_NAME)
                        .Children([modalHeader, modalBody, modalFooter].filter(element => element !== null && element !== undefined)))),
                    modalDialog = <HTMLElement>createElement(new ctrlCfg(cls.MODAL_DIALOG_NAME, htmlTags.div, getConfig(cls.MODAL_DIALOG_NAME)
                        .Children([modalContent]))),
                    modal = createElement(new ctrlCfg(self.rootElementName, htmlTags.div, getConfig(cls.MODAL_NAME)
                        .Aria({ "labelledby": `#${modelLabelId}`, hidden: true })
                        .Children([modalDialog])));
                self.defaultContainerElementName = cls.MODAL_BODY_NAME;
                self.fade = self.fade;
                self.fullScreenSizing = self.fullScreenSizing;
                self.modalSize = self.modalSize;
                self.scrollable = self.scrollable;
                self.staticBackdrop = self.staticBackdrop;
                self.verticalCenter = self.verticalCenter;

                initalisePromise.resolve(self);
            })
            .catch(error => {
                initalisePromise.reject(error);
            });
        return initalisePromise;
    }
    //#endregion Public Methods
    //#region Private Methods

    /**
     * Set Default Config, load Manifest and set properties
     * @date 04/12/2022 - 22:15:33
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Modal>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Modal> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            cls = self.$cls,
            ctrlPrm = self.$ctrlPrm,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Modal>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(_ => {
                const sine = self.elementConfig.setIfNotExist.bind(self.elementConfig);
                self.elementConfig.controlName(controlName);
                sine(cls.MODAL_NAME, new ctrlPrm()
                    .Classes("modal")
                    .Properties({ tabIndex: -1 }))
                sine(cls.MODAL_DIALOG_NAME, new ctrlPrm()
                    .Classes("modal-dialog"))
                sine(cls.MODAL_CONTENT_NAME, new ctrlPrm()
                    .Classes("modal-content"))
                sine(cls.MODAL_HEADER_NAME, new ctrlPrm()
                    .Classes("modal-header"))
                sine(cls.MODAL_BODY_NAME, new ctrlPrm()
                    .Classes("modal-body"))
                sine(cls.MODAL_FOOTER_NAME, new ctrlPrm()
                    .Classes("modal-footer"))
                sine(cls.MODAL_TITLE_NAME, new ctrlPrm()
                    .Classes("modal-title fs-5"))
                sine(cls.MODAL_CLOSE_BUTTON_NAME, new ctrlPrm()
                    .Classes("btn-close")
                    .Data({ bsDismiss: "modal" })
                    .Properties({ type: "button" })
                    .Aria({ label: "Close" }));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => {
                setDefaultConfigPromise.reject(error);
            });
        return setDefaultConfigPromise;
    }
    //#endregion Private Methods
    //#region Events

    /**
     * Add EventSubscriber to show.bs.modal event
     * @date 04/12/2022 - 22:16:21
     *
     * @public
     * @param {(event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void} callback
     * @returns {number}
     */
    public onShow(callback: (event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void): number {
        const eventName = this.$mes.show;
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.show_handler,
            this,
            callback);
    }

    
    /**
     * Raise Control event from show.bs.modal event
     * @date 04/12/2022 - 22:17:06
     *
     * @private
     * @param {MouseEvent} event
     */
    private show_handler(event: MouseEvent): void {
        const
            eventName = this.$mes.show,
            eventSource = event.relatedTarget as HTMLElement,
            modalEvent = new this.$mev(eventName, this, new this.$mevd(eventName, event, eventSource));
        this.eventSubscribers.raiseEvent(modalEvent);
    }
    
    /**
     * Add EventSubscriber to shown.bs.modal event
     * @date 04/12/2022 - 22:17:33
     *
     * @public
     * @param {(event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void} callback
     * @returns {number}
     */
    public onShown(callback: (event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void): number {
        const eventName = this.$mes.shown;
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.shown_handler,
            this,
            callback);
    }
    
    /**
     * Raise Control event from shown.bs.modal event
     * @date 04/12/2022 - 22:17:42
     *
     * @private
     * @param {MouseEvent} event
     */
    private shown_handler(event: MouseEvent): void {
        const
            eventName = this.$mes.shown,
            eventSource = event.relatedTarget as HTMLElement,
            modalEvent = new this.$mev(eventName, this, new this.$mevd(eventName, event, eventSource));
        this.eventSubscribers.raiseEvent(modalEvent);
    }
    public onHide(callback: (event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void): number {
        const eventName = this.$mes.hide;
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.hide_handler,
            this,
            callback);
    }
    
    /**
     * Raise Control event from hide.bs.modal event
     * @date 04/12/2022 - 22:17:53
     *
     * @private
     * @param {MouseEvent} event
     */
    private hide_handler(event: MouseEvent): void {
        const
            eventName = this.$mes.hide,
            modalEvent = new this.$mev(eventName, this, new this.$mevd(eventName, event, null));
        this.eventSubscribers.raiseEvent(modalEvent);
    }
    
    /**
     * Add EventSubscriber to hidden.bs.modal event
     * @date 04/12/2022 - 22:18:01
     *
     * @public
     * @param {(event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void} callback
     * @returns {number}
     */
    public onHidden(callback: (event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void): number {
        const eventName = this.$mes.hidden;
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.hidden_handler,
            this,
            callback);
    }
    
    /**
     * Raise Control event from hidden.bs.modal event
     * @date 04/12/2022 - 22:18:12
     *
     * @private
     * @param {MouseEvent} event
     */
    private hidden_handler(event: MouseEvent): void {
        const
            eventName = this.$mes.hidden,
            modalEvent = new this.$mev(eventName, this, new this.$mevd(eventName, event, null));
        this.eventSubscribers.raiseEvent(modalEvent);
    }
    
    /**
     * Add EventSubscriber to hidePrevented.bs.modal event
     * @date 04/12/2022 - 22:18:24
     *
     * @public
     * @param {(event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void} callback
     * @returns {number}
     */
    public onHidePrevented(callback: (event: Mrbr_UI_Bootstrap_Controls_ModalEvent) => void): number {
        const eventName = this.$mes.hidePrevented;
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.hidePrevented_handler,
            this,
            callback);
    }
    
    /**
     * Raise Control event from hidePrevented.bs.modal event
     * @date 04/12/2022 - 22:18:33
     *
     * @private
     * @param {MouseEvent} event
     */
    private hidePrevented_handler(event: MouseEvent): void {
        const
            eventName = this.$mes.hidePrevented,
            modalEvent = new this.$mev(eventName, this, new this.$mevd(eventName, event, null));
        this.eventSubscribers.raiseEvent(modalEvent);
    }



    //#endregion Events
}