import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";

export class Mrbr_UI_Bootstrap_Controls_CloseButton extends Mrbr_UI_Controls_Control {
    //#region Static Members

    /**
     * Internal CloseButton name
     * @date 13/11/2022 - 15:23:26
     *
     * @public
     * @static
     * @type {string}
     */
    public static CLOSE_BUTTON_NAME: string = "close_button";

    /**
     * Internal CloseButton click event name
     * @date 13/11/2022 - 15:24:29
     *
     * @public
     * @static
     * @type {string}
     */
    public static CLOSE_BUTTON_CLICK_EVENT_NAME: string = "close_button_click";
    //#endregion Static Members
    constructor() { super(); }
    //#region Private Field

    /**
     * Is the CloseButton Disabled
     * @date 13/11/2022 - 15:24:41
     *
     * @private
     * @type {boolean}
     */
    private _disabled: boolean = false;

    /**
     * Use CloseButton WhiteVariant style
     * @date 13/11/2022 - 15:24:58
     *
     * @private
     * @type {boolean}
     */
    private _whiteVariant: boolean = false;
    //#endregion Private Fields
    //#region Private Property

    /**
     * Type Alias for CloseButton
     * @date 13/11/2022 - 15:25:27
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_CloseButton}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_CloseButton { return Mrbr_UI_Bootstrap_Controls_CloseButton; }
    //#endregion Private Property
    //#region Public Members

    /**
     * Use CloseButton WhiteVariant style
     * @date 13/11/2022 - 15:25:52
     *
     * @public
     * @type {boolean}
     */
    public get whiteVariant(): boolean { return this._whiteVariant; }

    /**
     * Use CloseButton WhiteVariant style
     */
    public set whiteVariant(value: boolean) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        root && this.classes(root, value ? act.add : act.remove, "btn-close-white");
        this._whiteVariant = value;
    }

    /**
     * Disable CloseButton
     * @date 13/11/2022 - 15:26:17
     *
     * @public
     * @type {boolean}
     */
    public get disabled(): boolean { return this._disabled; }

    /**
     * Disable CloseButton
     */
    public set disabled(value: boolean) {
        const root = this.rootElement;
        root && this.attributes(root, { disabled: value ? "" : super.$ctrl.DELETE });
        this._disabled = value;
    }
    //#endregion Public Properties

    //#region Public Methods
    /**
     * Initialize CloseButton, load manifest and set default config
     * @date 13/11/2022 - 15:26:55
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_CloseButton>}
     */
    public initialise(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_CloseButton> {
        const self = this,
            initalisePromise = self.$promise.create(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:initialise`);
        super.initialise().then(async _ => {
            await self.loadManifest(self.$cls);
            await self.setDefaultConfig();
            self.createElement(new self.$ctrlCfg(self.rootElementName, "button", self.elementConfig.getConfig(self.$cls.CLOSE_BUTTON_NAME)));
            self.disabled = self._disabled;
            self.whiteVariant = self._whiteVariant;
            self.onMounted((evt) => {
                let fn;
                while ((fn = self.deferredOnMountFunctions.shift()) !== undefined) { fn(); }
            });
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }

    /**
     * Set Default Configuration for CloseButton
     * @date 14/11/2022 - 08:32:43
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_CloseButton>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_CloseButton> {
        const
            self = this,
            setDefaultConfigPromise = self.$promise.create(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:setDefaultConfig`);
        super.setDefaultConfig().then(() => {
            self.elementConfig
                .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
                .setIfNotExist(self.$cls.CLOSE_BUTTON_NAME, new self.$ctrlPrm()
                    .Aria({ label: "Close" })
                    .Attributes({ type: "button" })
                    .Classes("btn-close")
                );
            setDefaultConfigPromise.resolve(self);
        })
        return setDefaultConfigPromise;
    }
    //#endregion Public Methods
    //#region Event Handlers

    /**
     * Handle CloseButton Element Click Event, raise CloseButton Control Click Event
     * @date 14/11/2022 - 08:33:11
     *
     * @private
     * @param {Event} e
     */
    private closeButtonClick_handler(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.eventSubscribers.raiseEvent(new Mrbr_System_Events_Event<any>(this.$cls.CLOSE_BUTTON_CLICK_EVENT_NAME, self, e));
    }

    /**
     * Add onClick Event Subscriber to CloseButton or remove using Event Handle
     * @date 14/11/2022 - 08:33:40
     *
     * @public
     * @param {((event: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onClick(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        const eventName = this.$cls.CLOSE_BUTTON_CLICK_EVENT_NAME
        const self = this;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback)
            return null;
        }
        self.deferredOnMountFunctions.push(
            (() => {
                self.events.add(eventName, new self.$evtHandler(
                    "click",
                    self.rootElement,
                    self.closeButtonClick_handler,
                    self));
                return self.eventSubscribers.add(this.$cls.CLOSE_BUTTON_CLICK_EVENT_NAME, callback);
            }).bind(self));
        if (self.rootElement?.isConnected) { self.deferredOnMountFunctions.forEach(d => d()); self.deferredOnMountFunctions = []; }
    }
    //#endregion Event Handlers
}