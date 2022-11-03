import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_Tooltip$Placements } from "./Tooltip$Placements";

export class Mrbr_UI_Bootstrap_Controls_Tooltip extends Mrbr_UI_Controls_Control {
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Tooltip { return Mrbr_UI_Bootstrap_Controls_Tooltip; }



    public static readonly TOOLTIP_HOST_NAME: string = "tooltip_host";


    //#region Private Static Fields
    private static _tooltip_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    //#endregion Private Static Fields
    //#region Public Properties
    public static get tooltip_config(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self._tooltip_config) && (self._tooltip_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("tooltip")
            .Properties({ role: "tooltip" })
        );
        return Mrbr_UI_Bootstrap_Controls_Tooltip._tooltip_config;
    }
    //#endregion Public Properties
    //#region Public Static Methods
    // public static CreateTooltip(element: HTMLElement, tooltip: string, placement: Mrbr_UI_Bootstrap_Controls_Tooltip$Placements = Mrbr_UI_Bootstrap_Controls_Tooltip$Placements.top): void {
    //     const self = this;
    //     const tooltip_element = null;// = self.$ctrl.CreateControl(self.tooltip_config);
    //     tooltip_element.classList.add(placement);
    //     tooltip_element.innerHTML = `<div class="tooltip-arrow"></div><div class="tooltip-inner">${tooltip}</div>`;
    //     element.appendChild(tooltip_element);
    //     element.addEventListener("mouseenter", (e: MouseEvent) => {
    //         tooltip_element.classList.add("show");
    //     });
    //     element.addEventListener("mouseleave", (e: MouseEvent) => {
    //         tooltip_element.classList.remove("show");
    //     });
    // }
    //#endregion Public Static Methods


    private _placement: Mrbr_UI_Bootstrap_Controls_Tooltip$Placements;
    //    private _title: string;
    private _options: object;
    public get options(): object { return this._options; }
    public set options(value: object) { this._options = value; }
    public get placement(): Mrbr_UI_Bootstrap_Controls_Tooltip$Placements { return this._placement; }
    public set placement(value: Mrbr_UI_Bootstrap_Controls_Tooltip$Placements) {
        const self = this;
        self._placement = value;
        self.rootElement && self.elementDataset(self.rootElement, { bsPlacement: value });
    }
    constructor(rootElement: string | HTMLElement)
    constructor(rootElement: string | HTMLElement, options: object | string)
    constructor(rootElement: string | HTMLElement, options?: object | string) {
        super(typeof rootElement === "string" ? rootElement : rootElement.id);
        const self = this;
        (options) &&
            ((typeof options === "string") ? (self.options = { title: options }) : (self.options = options));
        if (rootElement instanceof HTMLElement) { self.elements[self.rootElementName] = rootElement; }
    }
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Tooltip> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Tooltip>("Mrbr_UI_Bootstrap_Controls_Tooltip.initialise");
        super
            .initialise(args)
            .then(() => {
                if (!self.elements[self.rootElementName]) {
                    self.createElement(new self.$ctrlCfg(self.rootElementName, "div"));
                }
                self.elementDataset(self.rootElement, { bsToggle: "tooltip" })
                initalisePromise.resolve(self);
            });
        return initalisePromise;
    }
    
    public render(): Mrbr_UI_Bootstrap_Controls_Tooltip {
        const self = this;
        let options = Object.assign(self.options, {
            popperConfig(defaultBsPopperConfig) {
                if (self.placement) { defaultBsPopperConfig.placement = self.placement; }
                return defaultBsPopperConfig
            }
        });
        self.$mrbrInstance.host.bootstrap.Tooltip.getOrCreateInstance(self.rootElement, options);
        return self;
    }
    public dispose(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.dispose();
        super.dispose();
    }
    public disable(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.disable();
    }
    public enable(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.enable();
    }
    public toggle(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.toggle();
    }
    public show(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.show();
    }
    public hide(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.hide();
    }
    public update(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.update();
    }
    public toggleEnabled(): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.toggleEnabled();
    }
    public setContent(content: string): void {
        const self = this;
        self.rootElement && self.$mrbrInstance.host.bootstrap.Tooltip.getInstance(self.rootElement)?.setContent(content);
    }
    public onHide(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["tooltip_hide"] = new Mrbr_System_Events_EventHandler(
            "hide.bs.tooltip",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["tooltip_hide"];
    }
    public onHidden(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["tooltip_hidden"] = new Mrbr_System_Events_EventHandler(
            "hidden.bs.tooltip",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["tooltip_hidden"];
    }
    public onInserted(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["tooltip_inserted"] = new Mrbr_System_Events_EventHandler(
            "inserted.bs.tooltip",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["tooltip_inserted"];
    }
    public onShow(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["tooltip_show"] = new Mrbr_System_Events_EventHandler(
            "show.bs.tooltip",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["tooltip_show"];
    }
    public onShown(callback: (e: any) => any, context?: any): Mrbr_System_Events_EventHandler {
        const self = this;
        self.events["tooltip_shown"] = new Mrbr_System_Events_EventHandler(
            "shown.bs.tooltip",
            self.rootElement,
            callback,
            context || self
        );
        return self.events["tooltip_shown"];
    }
}
