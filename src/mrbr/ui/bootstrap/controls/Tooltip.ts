import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_TooltipConfig } from "./TooltipConfig";

export class Mrbr_UI_Bootstrap_Controls_Tooltip extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    /**
     * Tooltip show event name
     * @date 14/12/2022 - 08:42:20
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOOLTIP_SHOW_EVENT: string = "show.bs.tooltip";

    /**
     * Tooltip shown event name
     * @date 14/12/2022 - 08:42:40
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOOLTIP_SHOWN_EVENT: string = "shown.bs.tooltip";

    /**
     * Tooltip hide event name
     * @date 14/12/2022 - 08:42:47
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOOLTIP_HIDE_EVENT: string = "hide.bs.tooltip";

    /**
     * Tooltip hidden event name
     * @date 14/12/2022 - 08:42:54
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOOLTIP_HIDDEN_EVENT: string = "hidden.bs.tooltip";

    /**
     * Tooltip inserted event name
     * @date 14/12/2022 - 08:43:00
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOOLTIP_INSERTED_EVENT: string = "inserted.bs.tooltip";


    /**
     * Tooltip Type Alias
     * @date 14/12/2022 - 08:43:08
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Tooltip}
     */
    get $tooltip(): typeof Mrbr_UI_Bootstrap_Controls_Tooltip { return Mrbr_UI_Bootstrap_Controls_Tooltip; }

    /**
     * TooltipConfig Type Alias
     * @date 14/12/2022 - 08:43:28
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    public get $TooltipCfg(): typeof Mrbr_UI_Bootstrap_Controls_TooltipConfig { return this.$bsc.TooltipConfig as typeof Mrbr_UI_Bootstrap_Controls_TooltipConfig; }



    /**
     * Tooltip Host Element field
     * @date 14/12/2022 - 08:43:37
     *
     * @private
     * @type {HTMLElement}
     */
    private _hostElement: HTMLElement;

    /**
     * Tooltip Config field
     * @date 14/12/2022 - 08:43:50
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    private _config: Mrbr_UI_Bootstrap_Controls_TooltipConfig;

    /**
     * Tooltip Host Element property
     * @date 14/12/2022 - 08:43:59
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get hostElement(): HTMLElement { return this._hostElement; }

    /**
     * Tooltip Config property
     * @date 14/12/2022 - 08:44:06
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    public get config(): Mrbr_UI_Bootstrap_Controls_TooltipConfig { return this._config; }

    /**
     * Tooltip Config property
     */
    public set config(value: Mrbr_UI_Bootstrap_Controls_TooltipConfig) { this._config = value; }

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Tooltip.
     * @date 14/12/2022 - 08:44:22
     *
     * @constructor
     * @param {(string | HTMLElement)} hostElement
     * @param {?(Mrbr_UI_Bootstrap_Controls_TooltipConfig | string)} [config]
     */
    constructor(hostElement: string | HTMLElement, config?: Mrbr_UI_Bootstrap_Controls_TooltipConfig | string) {
        super();
        const cfg = Mrbr_UI_Bootstrap_Controls_TooltipConfig;
        if (typeof hostElement === "string") { this._hostElement = document.getElementById(hostElement); } else { this._hostElement = hostElement; }
        if (!this._hostElement) { throw new Error("Mrbr_UI_Bootstrap_Controls_Tooltip.mount: Host element not found"); }
        if (config instanceof cfg) { this._config = config; }
        else { this._config = new cfg(config); }
    }

    /**
     * Initialise the tooltip, load manifest
     * @date 14/12/2022 - 08:44:35
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Tooltip>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Tooltip> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Tooltip>("Mrbr_UI_Bootstrap_Controls_Tooltip.initialise");
        super
            .initialise(args)
            .then(async () => {
                await self.loadManifest(self.$tooltip)
                initalisePromise.resolve(self);
            }
            );
        return initalisePromise;
    }

    /**
     * Mount the tooltip to the host element
     * @date 14/12/2022 - 08:44:57
     *
     * @public
     * @override
     * @returns {Mrbr_UI_Bootstrap_Controls_Tooltip}
     */
    public override mount(): Mrbr_UI_Bootstrap_Controls_Tooltip {
        const self = this;
        self.dataset(self._hostElement, self.config?.toBootstrapConfig());
        new self.bootstrap.Tooltip(self._hostElement);
        self.runDeferedMountFunctions();
        return self;
    }

    /**
     * Bootstrap Tooltip property
     * @date 14/12/2022 - 08:45:20
     *
     * @private
     * @readonly
     * @type {*}
     */
    private get bootstrapTooltip() {
        const root = this._hostElement;
        return root && this.bootstrap?.Tooltip?.getOrCreateInstance(this._hostElement);
    }

    /**
     * Dispose the tooltip
     * @date 14/12/2022 - 08:45:34
     *
     * @public
     */
    public dispose(): void {
        this.bootstrapTooltip?.dispose();
        super.dispose();
    }

    /**
     * Disable the tooltip
     * @date 14/12/2022 - 08:45:41
     *
     * @public
     */
    public disable(): void { this.bootstrapTooltip?.disable(); }

    /**
     * Enable the tooltip
     * @date 14/12/2022 - 08:45:51
     *
     * @public
     */
    public enable(): void { this.bootstrapTooltip?.enable(); }

    /**
     * Toggle the tooltip
     * @date 14/12/2022 - 08:45:58
     *
     * @public
     */
    public toggle(): void { this.bootstrapTooltip?.toggle(); }

    /**
     * Show the tooltip
     * @date 14/12/2022 - 08:46:04
     *
     * @public
     */
    public show(): void { this.bootstrapTooltip?.show(); }

    /**
     * Hide the tooltip
     * @date 14/12/2022 - 08:46:11
     *
     * @public
     */
    public hide(): void { this.bootstrapTooltip?.hide(); }

    /**
     * Update the tooltip
     * @date 14/12/2022 - 08:46:17
     *
     * @public
     */
    public update(): void { this.bootstrapTooltip?.update(); }

    /**
     * Toggle the tooltip enabled state
     * @date 14/12/2022 - 08:46:25
     *
     * @public
     */
    public toggleEnabled(): void { this.bootstrapTooltip?.toggleEnabled(); }

    /**
     * Set the tooltip content
     * @date 14/12/2022 - 08:46:33
     *
     * @public
     * @param {string} content
     */
    public setContent(content: string): void { this.bootstrapTooltip?.setContent(content); }

    /**
     * OnHide event subscriber
     * @date 14/12/2022 - 08:46:39
     *
     * @public
     * @param {((e: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onHide(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const
            self = this,
            eventName = self.$tooltip.TOOLTIP_HIDE_EVENT;
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.hostElement,
            self.onHide_handler,
            self,
            callback
        )
    }

    /**
     * OnHide event handler
     * @date 14/12/2022 - 08:46:59
     *
     * @private
     * @param {Event} e
     */
    private onHide_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new self.$event(self.$tooltip.TOOLTIP_HIDE_EVENT, this, e));
    }
    public onHidden(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const self = this,
            eventName = self.$tooltip.TOOLTIP_HIDDEN_EVENT;
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.hostElement,
            self.onHidden_handler,
            self,
            callback
        )
    }

    /**
     * OnHidden event handler
     * @date 14/12/2022 - 08:47:09
     *
     * @private
     * @param {Event} e
     */
    private onHidden_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new self.$event(self.$tooltip.TOOLTIP_HIDDEN_EVENT, this, e));
    }

    /**
     * OnInserted event subscriber
     * @date 14/12/2022 - 08:47:17
     *
     * @public
     * @param {((e: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onInserted(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const
            self = this,
            eventName = self.$tooltip.TOOLTIP_INSERTED_EVENT
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.hostElement,
            self.onInserted_handler,
            self,
            callback
        )
    }

    /**
     * OnInserted event handler
     * @date 14/12/2022 - 08:47:35
     *
     * @private
     * @param {Event} e
     */
    private onInserted_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new this.$event(self.$tooltip.TOOLTIP_INSERTED_EVENT, this, e));
    }

    /**
     * OnShow event subscriber
     * @date 14/12/2022 - 08:47:43
     *
     * @public
     * @param {((e: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onShow(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const
            self = this,
            eventName = self.$tooltip.TOOLTIP_SHOW_EVENT;
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.hostElement,
            self.onShow_handler,
            self,
            callback
        )
    }

    /**
     * OnShow event handler
     * @date 14/12/2022 - 08:47:55
     *
     * @private
     * @param {Event} e
     */
    private onShow_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new self.$event(self.$tooltip.TOOLTIP_SHOW_EVENT, this, e));
    }

    /**
     * OnShown event subscriber
     * @date 14/12/2022 - 08:48:04
     *
     * @public
     * @param {((e: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onShown(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const self = this,
            eventName = "shown.bs.tooltip";
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            self.hostElement,
            self.onShown_handler,
            self,
            callback
        )
    }

    /**
     * OnShown event handler
     * @date 14/12/2022 - 08:48:13
     *
     * @private
     * @param {Event} e
     */
    private onShown_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new self.$event(self.$tooltip.TOOLTIP_SHOWN_EVENT, this, e));
    }
}
