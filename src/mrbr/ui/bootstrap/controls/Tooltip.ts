import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_TooltipConfig } from "./TooltipConfig";

export class Mrbr_UI_Bootstrap_Controls_Tooltip extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Tooltip { return Mrbr_UI_Bootstrap_Controls_Tooltip; }



    public static readonly TOOLTIP: string = "tooltip";
    public static readonly TOOLTIP_HOST_NAME: string = "tooltip_host";

    private _hostElement: HTMLElement;
    public get hostElement(): HTMLElement { return this._hostElement; }
    private _config: Mrbr_UI_Bootstrap_Controls_TooltipConfig;
    public get config(): Mrbr_UI_Bootstrap_Controls_TooltipConfig { return this._config; }
    public set config(value: Mrbr_UI_Bootstrap_Controls_TooltipConfig) { this._config = value; }
    constructor(hostElement: string | HTMLElement, config?: Mrbr_UI_Bootstrap_Controls_TooltipConfig | string) {
        super("tooltip");
        if (typeof hostElement === "string") { this._hostElement = document.getElementById(hostElement); } else { this._hostElement = hostElement; }
        if (!this._hostElement) {
            throw new Error("Mrbr_UI_Bootstrap_Controls_Tooltip.mount: Host element not found");
        }

        if (config instanceof Mrbr_UI_Bootstrap_Controls_TooltipConfig) {
            this._config = config;
        } else {
            this._config = new Mrbr_UI_Bootstrap_Controls_TooltipConfig();
            this._config.title = config;
        }
    }
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Tooltip> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Tooltip>("Mrbr_UI_Bootstrap_Controls_Tooltip.initialise");
        super
            .initialise(args)
            .then(() => initalisePromise.resolve(self));
        return initalisePromise;
    }


    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Tooltip> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Tooltip>(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig(args)
            .then(async _ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$cls.TOOLTIP, new self.$ctrlPrm()
                        .Classes("tooltip")
                        .Properties({ role: "tooltip" }));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(err => setDefaultConfigPromise.reject(err));
        return setDefaultConfigPromise;
    }

    public override mount(): Mrbr_UI_Bootstrap_Controls_Tooltip {
        const self = this;
        self.dataset(self._hostElement, self.config?.toBootstrapConfig());
        new self.bootstrap.Tooltip(self._hostElement);
        self.runDeferedMountFunctions();
        return self;
    }
    private get bootstrapTooltip() {
        const root = this._hostElement;
        return root && this.bootstrap?.Tooltip?.getOrCreateInstance(this._hostElement);
    }
    public dispose(): void {
        this.bootstrapTooltip?.dispose();
        super.dispose();
    }
    public disable(): void { this.bootstrapTooltip?.disable(); }
    public enable(): void { this.bootstrapTooltip?.enable(); }
    public toggle(): void { this.bootstrapTooltip?.toggle(); }
    public show(): void { this.bootstrapTooltip?.show(); }
    public hide(): void { this.bootstrapTooltip?.hide(); }
    public update(): void { this.bootstrapTooltip?.update(); }
    public toggleEnabled(): void { this.bootstrapTooltip?.toggleEnabled(); }
    public setContent(content: string): void { this.bootstrapTooltip?.setContent(content); }
    public onHide(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const self = this,
            eventName = "hide.bs.tooltip";
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            this.hostElement,
            this.onHide_handler,
            self,
            callback
        )
    }
    private onHide_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new Mrbr_System_Events_Event("hide.bs.tooltip", this, e));
    }
    public onHidden(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const self = this,
            eventName = "hidden.bs.tooltip";
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            this.hostElement,
            this.onHidden_handler,
            self,
            callback
        )
    }
    private onHidden_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new Mrbr_System_Events_Event("hidden.bs.tooltip", this, e));
    }
    public onInserted(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const self = this,
            eventName = "inserted.bs.tooltip";
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            this.hostElement,
            this.onInserted_handler,
            self,
            callback
        )
    }
    private onInserted_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new Mrbr_System_Events_Event("inserted.bs.tooltip", this, e));
    }
    public onShow(callback: (e: Mrbr_System_Events_Event<any>) => void | number): number {
        const self = this,
            eventName = "show.bs.tooltip";
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return callback;
        }
        return self.addDeferredOnMountFn(
            eventName,
            eventName,
            this.hostElement,
            this.onShow_handler,
            self,
            callback
        )
    }
    private onShow_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new Mrbr_System_Events_Event("show.bs.tooltip", this, e));
    }
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
            this.hostElement,
            this.onShown_handler,
            self,
            callback
        )
    }
    private onShown_handler(e: Event): void {
        const self = this;
        self.eventSubscribers.raiseEvent(new Mrbr_System_Events_Event("shown.bs.tooltip", this, e));
    }
}
