import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_PopoverConfig } from "./PopoverConfig";
import { Mrbr_UI_Bootstrap_Controls_PopoverEvent } from "./PopoverEvent";
import { Mrbr_UI_Bootstrap_Controls_PopoverEventData } from "./PopoverEventData";
import { Mrbr_UI_Bootstrap_Controls_PopoverEvents } from "./PopoverEvents";

export class Mrbr_UI_Bootstrap_Controls_Popover extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    /**
     * Popover Configuration, Contents and Settings field
     * @date 09/12/2022 - 08:44:15
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    private _config: Mrbr_UI_Bootstrap_Controls_PopoverConfig;

    /**
     * Popover Configuration, Contents and Settings Property
     * @date 09/12/2022 - 08:44:35
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public get config(): Mrbr_UI_Bootstrap_Controls_PopoverConfig { return this._config; }

    /**
     * Popover Configuration, Contents and Settings Property
     */
    public set config(value: Mrbr_UI_Bootstrap_Controls_PopoverConfig) { this._config = value; }

    //#region Type Aliases
    /**
     * Popover Class Type Alias
     * @date 09/12/2022 - 08:45:05
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Popover}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Popover { return this.$bsc.Popover as typeof Mrbr_UI_Bootstrap_Controls_Popover; }



    /**
     * Popover Events Names Enum Alias
     * @date 09/12/2022 - 09:03:16
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PopoverEvents}
     */
    public get $pevs(): typeof Mrbr_UI_Bootstrap_Controls_PopoverEvents { return this.$bsc.PopoverEvents as typeof Mrbr_UI_Bootstrap_Controls_PopoverEvents; }

    /**
     * Popover Event Class Type Alias
     * @date 09/12/2022 - 09:01:59
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PopoverEvent}
     */
    public get $pev(): typeof Mrbr_UI_Bootstrap_Controls_PopoverEvent { return this.$bsc.PopoverEvent as typeof Mrbr_UI_Bootstrap_Controls_PopoverEvent; }

    /**
     * Popover Event Data Class Type Alias
     * @date 09/12/2022 - 09:02:07
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PopoverEventData}
     */
    public get $ped(): typeof Mrbr_UI_Bootstrap_Controls_PopoverEventData { return this.$bsc.PopoverEventData as typeof Mrbr_UI_Bootstrap_Controls_PopoverEventData; }
    //#endregion Type Aliases

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Popover to attach to the specified host element.
     * @date 09/12/2022 - 08:45:42
     *
     * @constructor
     * @param {(HTMLElement | Mrbr_UI_Controls_Control | string)} hostElement
     * @param {?string} [name]
     * @param {?Mrbr_UI_Bootstrap_Controls_PopoverConfig} [config]
     */
    constructor(hostElement: HTMLElement | Mrbr_UI_Controls_Control | string, config?: Mrbr_UI_Bootstrap_Controls_PopoverConfig) {
        super();
        config && (this._config = config);
        let targetElement;
        if (hostElement instanceof Mrbr_UI_Controls_Control) { targetElement = hostElement.rootElement; }
        else if (typeof hostElement === "string") { targetElement = document.querySelector(hostElement); }
        else { targetElement = hostElement; }
        this.elements.set(this.rootElementName, targetElement);
    }

    //#region Public Methods
    /**
     * Initialise the Popover Control, load Manifest and set up the Control
     * @date 09/12/2022 - 08:46:00
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Popover>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Popover> {
        const
            self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            promise = self.$promise.create(`${controlName}:initialise`);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(this.$cls);
                promise.resolve(self)
            })
            .catch(error => promise.reject(error));
        return promise;
    }

    /**
     * Mount the Popover Control to the Host Element
     * @date 09/12/2022 - 08:48:12
     *
     * @public
     * @override
     * @param {(HTMLElement | Mrbr_UI_Controls_Control | string)} hostElement
     * @returns {Mrbr_UI_Controls_IControl}
     */
    public override mount(hostElement: HTMLElement | Mrbr_UI_Controls_Control | string): Mrbr_UI_Controls_IControl {
        const
            self = this,
            bootstrap = self.bootstrap,
            config = {},
            thisConfig = self._config || {};

        Reflect
            .ownKeys(thisConfig)
            .filter(key => thisConfig[key])
            .forEach(key => config[key] = thisConfig[key]);
        requestAnimationFrame(_ => {
            bootstrap.Popover.getOrCreateInstance(this.rootElement, config);
            self.runDeferedMountFunctions();
        }
        );
        return this;
    }

    /**
     * Dispose the Popover Control
     * @date 09/12/2022 - 08:48:23
     *
     * @public
     */
    public dispose(): void {
        this.bootstrap.Popover.getInstance(this.rootElement)?.dispose();
        super.dispose();
    }
    //#endregion Public Methods
    //#region Event Handlers
    /**
     * Add onShow Event Subscriber
     * @date 09/12/2022 - 09:23:34
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number)} callback
     * @returns {number}
     */
    public onShow(callback: (event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number): number {
        const eventName = this.$pevs.show;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(this.$pevs.show, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onShow_handler,
            this,
            callback
        )
    }

    /**
     * onShow Event Handler
     * @date 09/12/2022 - 09:23:56
     *
     * @private
     * @param {MouseEvent} event
     */
    private onShow_handler(event: MouseEvent): void {
        const
            self = this,
            eventName = self.$pevs.show,
            popoverEvent = new self.$pev(eventName, this, new self.$ped(this.rootElementName, event));
        self.eventSubscribers.raiseEvent(popoverEvent);
    }

    /**
     * Add onShown Event Subscriber
     * @date 09/12/2022 - 09:24:03
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number)} callback
     * @returns {number}
     */
    public onShown(callback: (event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number): number {
        const eventName = this.$pevs.shown;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(this.$pevs.shown, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onShown_handler,
            this,
            callback
        )
    }

    /**
     * onShown Event Handler
     * @date 09/12/2022 - 09:24:12
     *
     * @private
     * @param {MouseEvent} event
     */
    private onShown_handler(event: MouseEvent): void {
        const
            self = this,
            eventName = self.$pevs.shown,
            popoverEvent = new self.$pev(eventName, this, new self.$ped(this.rootElementName, event));
        self.eventSubscribers.raiseEvent(popoverEvent);
    }

    /**
     * Add onHide Event Subscriber
     * @date 09/12/2022 - 09:24:59
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number)} callback
     * @returns {number}
     */
    public onHide(callback: (event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number): number {
        const eventName = this.$pevs.hide;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(this.$pevs.hide, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onHide_handler,
            this,
            callback
        )
    }

    /**
     * onHide Event Handler
     * @date 09/12/2022 - 09:25:17
     *
     * @private
     * @param {MouseEvent} event
     */
    private onHide_handler(event: MouseEvent): void {
        const
            self = this,
            eventName = self.$pevs.hide,
            popoverEvent = new self.$pev(eventName, this, new self.$ped(this.rootElementName, event));
        self.eventSubscribers.raiseEvent(popoverEvent);
    }

    /**
     * Add onHidden Event Subscriber
     * @date 09/12/2022 - 09:25:26
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number)} callback
     * @returns {number}
     */
    public onHidden(callback: (event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number): number {
        const eventName = this.$pevs.hidden;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(this.$pevs.hidden, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onHidden_handler,
            this,
            callback
        )
    }

    /**
     * onHidden Event Handler
     * @date 09/12/2022 - 09:25:36
     *
     * @private
     * @param {MouseEvent} event
     */
    private onHidden_handler(event: MouseEvent): void {
        const
            self = this,
            eventName = self.$pevs.hidden,
            popoverEvent = new self.$pev(eventName, this, new self.$ped(this.rootElementName, event));
        self.eventSubscribers.raiseEvent(popoverEvent);
    }

    /**
     * Add onInserted Event Subscriber
     * @date 09/12/2022 - 09:25:44
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number)} callback
     * @returns {number}
     */
    public onInserted(callback: (event: Mrbr_UI_Bootstrap_Controls_PopoverEvent) => void | number): number {
        const eventName = this.$pevs.inserted;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(this.$pevs.inserted, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.onInserted_handler,
            this,
            callback
        )
    }

    /**
     * onInserted Event Handler
     * @date 09/12/2022 - 09:25:51
     *
     * @private
     * @param {MouseEvent} event
     */
    private onInserted_handler(event: MouseEvent): void {
        const
            self = this,
            eventName = self.$pevs.inserted,
            popoverEvent = new self.$pev(eventName, this, new self.$ped(this.rootElementName, event));
        self.eventSubscribers.raiseEvent(popoverEvent);
    }
    //#endregion Event Handlers    

}