//import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_ToastEvent } from "./ToastEvent";
import { Mrbr_UI_Bootstrap_Controls_ToastEventData } from "./ToastEventData";
import { Mrbr_UI_Bootstrap_Controls_ToastEvents } from "./ToastEvents";

export class Mrbr_UI_Bootstrap_Controls_Toast extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    /**
     * Internal Name of the Toast Control
     * @date 12/12/2022 - 14:41:21
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOAST_NAME: string = "toast";

    /**
     * Internal Name of the Toast Header
     * @date 12/12/2022 - 14:41:32
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOAST_HEADER_NAME: string = "toast_header";

    /**
     * Internal Name of the Toast Body
     * @date 12/12/2022 - 14:42:30
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOAST_BODY_NAME: string = "toast_body";

    /**
     * Toast Header Selector from Toast Template
     * @date 12/12/2022 - 14:42:39
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly TOAST_HEADER_SELECTOR: string = ".toast-header";

    /**
     * Toast Image Selector from Toast Template
     * @date 12/12/2022 - 14:43:06
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly TOAST_IMAGE_SELECTOR: string = "img";

    /**
     * Toast Title Selector from Toast Template
     * @date 12/12/2022 - 14:43:19
     *
     * @private
     * @static
     * @readonly
     * @type {"strong"}
     */
    private static readonly TOAST_TITLE_SELECTOR = "strong";

    /**
     * Toast Subtitle Selector from Toast Template
     * @date 12/12/2022 - 14:43:26
     *
     * @private
     * @static
     * @readonly
     * @type {"small"}
     */
    private static readonly TOAST_SUBTITLE_SELECTOR = "small";

    /**
     * Toast Close Button Selector from Toast Template
     * @date 12/12/2022 - 14:43:33
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly TOAST_CLOSE_BUTTON_SELECTOR: string = "button.btn-close";


    /**
     * Toast Type Class Alias
     * @date 12/12/2022 - 14:44:08
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Toast}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Toast { return Mrbr_UI_Bootstrap_Controls_Toast; }

    /**
     * Toast Event Class Alias
     * @date 12/12/2022 - 14:44:28
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ToastEvent}
     */
    public get $ToastEvent(): typeof Mrbr_UI_Bootstrap_Controls_ToastEvent { return this.$bsc.ToastEvent as typeof Mrbr_UI_Bootstrap_Controls_ToastEvent; }

    /**
     * Toast Event Data Class Alias
     * @date 12/12/2022 - 14:44:34
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ToastEventData}
     */
    public get $ToastEventData(): typeof Mrbr_UI_Bootstrap_Controls_ToastEventData { return this.$bsc.ToastEventData as typeof Mrbr_UI_Bootstrap_Controls_ToastEventData; }

    /**
     * Toast Event Class Alias
     * @date 12/12/2022 - 14:44:41
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ToastEvents}
     */
    public get $ToastEvents(): typeof Mrbr_UI_Bootstrap_Controls_ToastEvents { return this.$bsc.ToastEvents as typeof Mrbr_UI_Bootstrap_Controls_ToastEvents; }

    /**
     * Show/Hide Header Flag field
     * @date 12/12/2022 - 14:44:53
     *
     * @private
     * @type {boolean}
     */
    private _showHeader: boolean = true;

    /**
     * Image Source field
     * @date 12/12/2022 - 14:45:18
     *
     * @private
     * @type {string}
     */
    private _imageSource: string;

    /**
     * Image Alt Text field
     * @date 12/12/2022 - 14:45:36
     *
     * @private
     * @type {string}
     */
    private _imageAltText: string;

    /**
     * Sub Title field
     * @date 12/12/2022 - 14:45:42
     *
     * @private
     * @type {string}
     */
    private _subTitle: string;

    /**
     * Title field
     * @date 12/12/2022 - 14:45:51
     *
     * @private
     * @type {string}
     */
    private _title: string;
    /**
     * Toast Body Text field
     * @date 12/12/2022 - 14:50:25
     *
     * @private
     * @type {string}
     */
    private _bodyText: string;
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Toast.
     * @date 12/12/2022 - 14:46:00
     *
     * @constructor
     * @param {?string} [title]
     * @param {?string} [bodyText]
     */
    constructor(title?: string, bodyText?: string) {
        super();
        this.title = title;
        this.bodyText = bodyText;
    }

    /**
     * Get a Toast Element from Template using selector
     * @date 12/12/2022 - 14:47:13
     *
     * @private
     * @param {string} name
     * @param {?HTMLElement} [startElement]
     * @returns {HTMLElement}
     */
    private getToastElement(name: string, startElement?: HTMLElement): HTMLElement {
        const start = startElement || this.rootElement;
        return (start) ? <HTMLDivElement>start?.querySelector(this.$cls.TOAST_HEADER_SELECTOR) : null;
    }

    /**
     * Get Toast Header Element from Template
     * @date 12/12/2022 - 14:48:03
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get headerElement(): HTMLElement { return this.getToastElement(this.$cls.TOAST_HEADER_NAME); }

    /**
     * Get Toast Title Element from Template
     * @date 12/12/2022 - 14:48:10
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get titleElement(): HTMLElement { return this.getToastElement(this.$cls.TOAST_TITLE_SELECTOR); }

    /**
     * Get Toast Sub Title Element from Template
     * @date 12/12/2022 - 14:48:18
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get subtitleElement(): HTMLElement { return this.getToastElement(this.$cls.TOAST_SUBTITLE_SELECTOR); }

    /**
     * Get Toast Close Button Element from Template
     * @date 12/12/2022 - 14:48:24
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get closeButton(): HTMLElement { return this.getToastElement(this.$cls.TOAST_CLOSE_BUTTON_SELECTOR); }

    /**
     * Get Toast Body Element from Template
     * @date 12/12/2022 - 14:48:35
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get bodyElement(): HTMLElement { const self = this; return self.elements.get(self.$cls.TOAST_BODY_NAME) }

    /**
     * Get Toast Image Element from Template
     * @date 12/12/2022 - 14:48:42
     *
     * @public
     * @readonly
     * @type {HTMLImageElement}
     */
    public get imageElement(): HTMLImageElement {
        const self = this, header = self.headerElement;
        return (header) ? <HTMLImageElement>self.getToastElement(self.$cls.TOAST_IMAGE_SELECTOR, header) : null;
    }

    /**
     * Show/Hide Header property
     * @date 12/12/2022 - 14:48:51
     *
     * @public
     * @type {boolean}
     */
    public get showHeader(): boolean { return this._showHeader; }

    /**
     * Show/Hide Header property
     */
    public set showHeader(value: boolean) {
        const self = this,
            header = self.headerElement,
            act = self.$clsActions;
        self._showHeader = value;
        header && self.classes(header, value ? act.remove : act.add, "visually-hidden");
    }

    /**
     * Image Alt Text property
     * @date 12/12/2022 - 14:49:12
     *
     * @public
     * @type {string}
     */
    public get imageAltText(): string { return this._imageAltText; }

    /**
     * Image Alt Text property
     */
    public set imageAltText(value: string) {
        const self = this,
            image = self.imageElement;
        self._imageAltText = value;
        image && value && (image.alt = value);
    }

    /**
     * Toast Title property
     * @date 12/12/2022 - 14:49:33
     *
     * @public
     * @type {string}
     */
    public get title(): string { return this._title; }

    /**
     * Toast Title property
     */
    public set title(value: string) {
        const self = this,
            titleElement = self.titleElement;
        self._title = value;
        titleElement && value && (titleElement.innerText = value);
    }

    /**
     * Toast Sub Title property
     * @date 12/12/2022 - 14:49:56
     *
     * @public
     * @type {string}
     */
    public get subTitle(): string { return this._subTitle; }

    /**
     * Toast Sub Title property
     */
    public set subTitle(value: string) {
        const self = this,
            subtitleElement = self.subtitleElement;
        self._subTitle = value;
        subtitleElement && value && (subtitleElement.innerText = value);
    }

    /**
     * Image Source property
     * @date 12/12/2022 - 14:50:09
     *
     * @public
     * @type {string}
     */
    public get imageSource(): string { return this._imageSource; }

    /**
     * Image Source property
     */
    public set imageSource(value: string) {
        const self = this,
            image = self.imageElement;
        self._imageSource = value;
        image && value && (image.src = value);
    }


    /**
     * Toast Body Text property
     * @date 12/12/2022 - 14:51:04
     *
     * @public
     * @type {string}
     */
    public get bodyText(): string { return this.bodyElement.innerText; }

    /**
     * Toast Body Text property
     */
    public set bodyText(value: string) {
        const self = this,
            body = self.bodyElement;
        self._bodyText = value;
        body && value && (body.innerText = value);
    }


    /**
     * Toast Title property - fluent interface
     * @date 12/12/2022 - 14:51:16
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_Toast}
     */
    public Title(value: string): Mrbr_UI_Bootstrap_Controls_Toast {
        this.title = value;
        return this;
    }

    /**
     * Toast Sub Title property - fluent interface
     * @date 12/12/2022 - 14:51:43
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_Toast}
     */
    public SubTitle(value: string): Mrbr_UI_Bootstrap_Controls_Toast {
        this.subTitle = value;
        return this;
    }

    /**
     * Image Source property - fluent interface
     * @date 12/12/2022 - 14:51:51
     *
     * @public
     * @param {string} imageSource
     * @param {string} imageAlt
     * @returns {Mrbr_UI_Bootstrap_Controls_Toast}
     */
    public Image(imageSource: string, imageAlt: string): Mrbr_UI_Bootstrap_Controls_Toast {
        this.imageSource = imageSource;
        this.imageAltText = imageAlt;
        return this;
    }

    /**
     * Toast Body Text property - fluent interface
     * @date 12/12/2022 - 14:52:05
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_Toast}
     */
    public BodyText(value: string): Mrbr_UI_Bootstrap_Controls_Toast {
        this.bodyText = value;
        return this;
    }


    /**
     * Initialise the control, loading the manifest and setting the default config
     * @date 12/12/2022 - 14:52:16
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toast>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toast> {
        const
            self = this,
            controlName = self.$cls.TOAST_NAME,
            initialisePromise = Mrbr_System_Promise.create<Mrbr_UI_Bootstrap_Controls_Toast>(`${controlName}:initialise`);
        super.initialise(args)
            .then(async () => {
                await self.loadManifest(self.$cls)
                await self.setDefaultConfig();
                const
                    header = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.TOAST_HEADER_NAME, "div", self.elementConfig.getConfig(self.$cls.TOAST_HEADER_NAME))),
                    body = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.TOAST_BODY_NAME, "div", self.elementConfig.getConfig(self.$cls.TOAST_BODY_NAME)));
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.getConfig(self.$cls.TOAST_NAME)
                    .Children([header, body])));
                self.defaultContainerElementName = self.$cls.TOAST_BODY_NAME;

                self.showHeader = self._showHeader;
                self.title = self._title;
                self.subTitle = self._subTitle;
                self.imageSource = self._imageSource;
                self.imageAltText = self._imageAltText;
                self.bodyText = self._bodyText;

                initialisePromise.resolve(self);
            })

        return initialisePromise;
    }
    /**
    * Set Default Config
    * @date 12/12/2022 - 14:46:11
    *
    * @public
    * @param {...any[]} args
    * @returns {Mrbr_System_Promise<any>}
    */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<any> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig(...args)
            .then(() => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$cls.TOAST_NAME, new self.$ctrlPrm()
                        .Classes("toast")
                        .Properties({ role: "alert" })
                        .Aria({ "live": "assertive", "atomic": "true" }))
                    .setIfNotExist(self.$cls.TOAST_HEADER_NAME, new self.$ctrlPrm()
                        .Classes("toast-header")
                        .Template(`<img class="rounded me-2"><strong class="me-auto"></strong><small></small><button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>`))
                    .setIfNotExist(self.$cls.TOAST_BODY_NAME, new self.$ctrlPrm()
                        .Classes("toast-body"));
                setDefaultConfigPromise.resolve(this);
            });
        return setDefaultConfigPromise;
    }

    /**
     * Get the bootstrap Toast instance
     * @date 12/12/2022 - 14:53:07
     *
     * @protected
     * @readonly
     * @type {*}
     */
    protected get bootstrapToastInstance() { return this.bootstrap.Toast.getOrCreateInstance(this.rootElement); }

    /**
     * Show the toast
     * @date 12/12/2022 - 14:53:22
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Controls_Toast}
     */
    public show(): Mrbr_UI_Bootstrap_Controls_Toast {
        this.bootstrapToastInstance?.show();
        return this;
    }

    /**
     * Hide the toast
     * @date 12/12/2022 - 14:53:32
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Controls_Toast}
     */
    public hide(): Mrbr_UI_Bootstrap_Controls_Toast {
        this.bootstrapToastInstance?.hide();
        return this;
    }

    /**
     * Dispose of the toast
     * @date 12/12/2022 - 14:53:40
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Controls_Toast}
     */
    public dispose(): Mrbr_UI_Bootstrap_Controls_Toast {
        const root = this.rootElement;
        this.bootstrapToastInstance.dispose();
        root && root.remove();
        super.dispose();
        return this;
    }

    /**
     * Subscribe to the Hide event
     * @date 12/12/2022 - 14:53:51
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number)} callback
     * @returns {number}
     */
    public onHide(callback: (event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number): number {
        const eventName = this.$ToastEvents.hide;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onHide_handler,
            this,
            callback);

    }

    /**
     * Hide event handler
     * @date 12/12/2022 - 14:54:12
     *
     * @private
     * @param {Event} event
     */
    private onHide_handler(event: Event): void { this.eventSubscribers.raiseEvent(new this.$ToastEvent(this.$ToastEvents.hide, this, new this.$ToastEventData(event))); }

    /**
     * Subscribe to the Hidden event
     * @date 12/12/2022 - 14:54:21
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number)} callback
     * @returns {number}
     */
    public onHidden(callback: (event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number): number {
        const eventName = this.$ToastEvents.hidden;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onHidden_handler,
            this,
            callback);
    }

    /**
     * Hidden event handler
     * @date 12/12/2022 - 14:54:35
     *
     * @private
     * @param {Event} event
     */
    private onHidden_handler(event: Event): void { this.eventSubscribers.raiseEvent(new this.$ToastEvent(this.$ToastEvents.hidden, this, new this.$ToastEventData(event))); }

    /**
     * Subscribe to the Show event
     * @date 12/12/2022 - 14:54:42
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number)} callback
     * @returns {number}
     */
    public onShow(callback: (event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number): number {
        const eventName = this.$ToastEvents.show;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onShow_handler,
            this,
            callback);
    }

    /**
     * Show event handler
     * @date 12/12/2022 - 14:54:54
     *
     * @private
     * @param {Event} event
     */
    private onShow_handler(event: Event): void { this.eventSubscribers.raiseEvent(new this.$ToastEvent(this.$ToastEvents.show, this, new this.$ToastEventData(event))); }

    /**
     * Subscribe to the Shown event
     * @date 12/12/2022 - 14:55:01
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number)} callback
     * @returns {number}
     */
    public onShown(callback: (event: Mrbr_UI_Bootstrap_Controls_ToastEvent) => void | number): number {
        const eventName = this.$ToastEvents.shown;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onShown_handler,
            this,
            callback);
    }

    /**
     * Shown event handler
     * @date 12/12/2022 - 14:55:10
     *
     * @private
     * @param {Event} event
     */
    private onShown_handler(event: Event): void { this.eventSubscribers.raiseEvent(new this.$ToastEvent(this.$ToastEvents.shown, this, new this.$ToastEventData(event))); }
}