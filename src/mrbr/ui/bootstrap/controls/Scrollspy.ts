import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_ScrollspyEvent } from "./ScrollspyEvent";
import { Mrbr_UI_Bootstrap_Controls_ScrollspyEventData } from "./ScrollspyEventData";


/**
 * Create a Bootstrap Scrollspy Control
 * @date 11/12/2022 - 04:03:33
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_Scrollspy
 * @typedef {Mrbr_UI_Bootstrap_Controls_Scrollspy}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Controls_Scrollspy extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Internal Scrollspy Name
     * @date 11/12/2022 - 04:03:54
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SCROLLSPY_NAME: string = "scrollspy";

    /**
     * Internal Scrollspy Navigation Name
     * @date 11/12/2022 - 04:04:09
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SCROLLSPY_NAVIGATION_NAME: string = "scrollspy_navigation";

    /**
     * Internal Scrollspy Spied Name
     * @date 11/12/2022 - 04:04:22
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SCROLLSPY_SPIED_NAME: string = "scrollspy_spied";

    /**
     * Internal Scrollspy Event Name
     * @date 11/12/2022 - 04:04:29
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SCROLLSPY_EVENT: string = "activate.bs.scrollspy";


    /**
     * Scrollspy Class Type Alias
     * @date 11/12/2022 - 04:04:41
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Scrollspy}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Scrollspy { return this.$bsc.Scrollspy as typeof Mrbr_UI_Bootstrap_Controls_Scrollspy; }

    /**
     * ScrollspyEvent Type Alias
     * @date 11/12/2022 - 04:05:02
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ScrollspyEvent}
     */
    public get $sse(): typeof Mrbr_UI_Bootstrap_Controls_ScrollspyEvent { return this.$bsc.ScrollspyEvent as typeof Mrbr_UI_Bootstrap_Controls_ScrollspyEvent; }

    /**
     * ScrollspyEventData Type Alias
     * @date 11/12/2022 - 04:05:15
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ScrollspyEventData}
     */
    public get $ssed(): typeof Mrbr_UI_Bootstrap_Controls_ScrollspyEventData { return this.$bsc.ScrollspyEventData as typeof Mrbr_UI_Bootstrap_Controls_ScrollspyEventData; }



    /**
     * Scrollspy RootMargin field. Intersection Observer rootMargin valid units, when calculating scroll position.
     * @date 11/12/2022 - 04:36:08
     *
     * @private
     * @type {string}
     */
    private _rootMargin: string = "0px 0px -25%";

    /**
     * Scrollspy Threshold field. IntersectionObserver threshold valid input, when calculating scroll position.
     * @date 11/12/2022 - 04:37:06
     *
     * @private
     * @type {Array<number>}
     */
    private _threshold: Array<number> = [0.1, 0.5, 1];

    /**
     * Scrollspy SmoothScroll field. Enables smooth scrolling when a user clicks on a link that refers to ScrollSpy observables.
     * @date 11/12/2022 - 04:37:38
     *
     * @private
     * @type {boolean}
     */
    private _smoothScroll: boolean = false;

    /**
     * Scrollspy Navigation Element field
     * @date 11/12/2022 - 04:05:25
     *
     * @private
     * @type {HTMLElement}
     */
    private _navigationElement: HTMLElement;

    /**
     * Scrollspy Spied Element field
     * @date 11/12/2022 - 04:05:39
     *
     * @private
     * @type {HTMLElement}
     */
    private _spiedElement: HTMLElement;

    /**
     * Scrollspy RootMargin property. Intersection Observer rootMargin valid units, when calculating scroll position.
     * @date 11/12/2022 - 04:38:08
     *
     * @public
     * @type {string}
     */
    public get rootMargin(): string { return this._rootMargin; }

    /**
     * Scrollspy RootMargin property. Intersection Observer rootMargin valid units, when calculating scroll position.
     */
    public set rootMargin(value: string) {
        const scrollspy = this.bootstrap.ScrollSpy.getOrCreateInstance(this._spiedElement);
        scrollspy && (scrollspy.rootMargin = value);
        this._rootMargin = value;
    }

    /**
     * Scrollspy SmoothScroll property. Enables smooth scrolling when a user clicks on a link that refers to ScrollSpy observables.
     * @date 11/12/2022 - 04:38:45
     *
     * @public
     * @type {boolean}
     */
    public get smoothScroll(): boolean { return this._smoothScroll; }

    /**
     * Scrollspy SmoothScroll property. Enables smooth scrolling when a user clicks on a link that refers to ScrollSpy observables.
     */
    public set smoothScroll(value: boolean) {
        this.dataset(this._spiedElement, { bsSmoothScroll: value })
        this.refresh();
        this._smoothScroll = value;
    }

    /**
     * Scrollspy Threshold property. IntersectionObserver threshold valid input, when calculating scroll position.
     * @date 11/12/2022 - 04:39:01
     *
     * @public
     * @type {Array<number>}
     */
    public get threshold(): Array<number> { return this._threshold; }

    /**
     * Scrollspy Threshold property. IntersectionObserver threshold valid input, when calculating scroll position.
     */
    public set threshold(value: Array<number>) {
        const scrollspy = this.bootstrap.ScrollSpy.getOrCreateInstance(this._spiedElement);
        scrollspy && (scrollspy.threshold = value);
        this._threshold = value;
    }

    /**
     * Scrollspy Spied Element Property
     * @date 11/12/2022 - 04:05:48
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get spiedElement(): HTMLElement { return this._spiedElement; }

    /**
     * Scrollspy Navigation Element Property
     * @date 11/12/2022 - 04:06:04
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get navigationElement(): HTMLElement { return this._navigationElement; }


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Scrollspy.
     * @date 11/12/2022 - 04:06:14
     *
     * @constructor
     * @param {string} name
     * @param {HTMLElement} spiedElement
     * @param {HTMLElement} navigationElement
     */
    constructor(spiedElement: HTMLElement, navigationElement: HTMLElement) {
        super();
        this._spiedElement = spiedElement;
        this._navigationElement = navigationElement;
    }

    /**
     * Initialise the Scrollspy Control, load manifest, set default config and properties
     * @date 11/12/2022 - 04:06:33
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Scrollspy>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Scrollspy> {
        const self = this,
            cls = self.$cls,
            ctrl = self.$ctrl,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(self.$cls)
                await self.setDefaultConfig();
                const
                    spiedElement = self.spiedElement,
                    navigationElement = self.navigationElement;
                if (!spiedElement.id) { spiedElement.id = ctrl.createId(cls.SCROLLSPY_SPIED_NAME); }
                if (!navigationElement.id) { navigationElement.id = ctrl.createId(cls.SCROLLSPY_NAVIGATION_NAME); }
                self.assignElementConfig(spiedElement, self.elementConfig.getConfig(self.$cls.SCROLLSPY_SPIED_NAME)
                    .Data({ bsTarget: `#${self.navigationElement.id}` }));
                requestAnimationFrame(() => {
                    self.bootstrap.ScrollSpy.getOrCreateInstance(spiedElement);
                    self.threshold = self.threshold;
                    self.rootMargin = self.rootMargin;
                    self.smoothScroll = self.smoothScroll;
                });
                initialisePromise.resolve(self);
            })
            .catch(err => initialisePromise.reject(err));
        return initialisePromise;
    }

    /**
     * Set the default config for the Scrollspy Control
     * @date 11/12/2022 - 04:07:05
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Scrollspy>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Scrollspy> {
        const self = this,
            cls = self.$cls,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(cls.SCROLLSPY_SPIED_NAME, new self.$ctrlPrm()
                        .Data({ bsSpy: "scroll", bsSmoothScroll: "true" })
                        .Attributes({ tabIndex: 0 }))
                setDefaultConfigPromise.resolve(self);
            })
            .catch(err => setDefaultConfigPromise.reject(err));
        return setDefaultConfigPromise;
    }


    /**
     * Override the mount method to return the Scrollspy Control. Scrollspy cannot be mounted, elements must exist in the DOM 
     * @date 11/12/2022 - 04:07:15
     *
     * @public
     * @returns {Mrbr_UI_Controls_IControl}
     */
    public mount(): Mrbr_UI_Controls_IControl { return this; }


    /**
     * Dispose the Scrollspy Control
     * @date 11/12/2022 - 04:08:07
     *
     * @public
     */
    public dispose(): void {
        const
            spiedElement = this.spiedElement,
            dataset = spiedElement?.dataset;
        this.bootstrap.ScrollSpy.getInstance(spiedElement)?.dispose();
        if (dataset) {
            delete dataset.bsSpy;
            delete dataset.bsTarget;
            delete dataset.bsSmoothScroll;
            spiedElement.tabIndex = 0;
        }
        super.dispose();
    }

    /**
     * Join the Spied Element and Navigation Element by ids. If Ids are not present, they will be created
     * @date 11/12/2022 - 04:08:17
     *
     * @public
     * @param {HTMLAnchorElement} navigationElement
     * @param {HTMLElement} spiedElement
     * @returns {Mrbr_UI_Bootstrap_Controls_Scrollspy}
     */
    public joinSpiedElements(navigationElement: HTMLAnchorElement, spiedElement: HTMLElement): Mrbr_UI_Bootstrap_Controls_Scrollspy {
        const
            cls = this.$cls,
            createId = this.$ctrl.createId;
        if (!spiedElement.id) { spiedElement.id = createId(cls.SCROLLSPY_SPIED_NAME); }
        if (!navigationElement.id) { navigationElement.id = createId(cls.SCROLLSPY_NAVIGATION_NAME); }
        navigationElement.href = `#${spiedElement.id}`;
        return this;
    }

    /**
     * Add a Scrollspy Event Subscriber
     * @date 11/12/2022 - 04:08:50
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ScrollspyEvent) => void | number)} callback
     * @returns {Mrbr_UI_Bootstrap_Controls_Scrollspy}
     */
    public onScrollspy(callback: (event: Mrbr_UI_Bootstrap_Controls_ScrollspyEvent) => void | number): Mrbr_UI_Bootstrap_Controls_Scrollspy {
        const self = this,
            eventName = self.$cls.SCROLLSPY_EVENT;
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return null
        }
        self.events.add(eventName, new self.$evtHandler(
            eventName,
            self.spiedElement,
            self.onScrollspy_handler,
            self));
        self.eventSubscribers.add(eventName, callback);
    }

    /**
     * Scrollspy Event Handler
     * @date 11/12/2022 - 04:09:08
     *
     * @private
     * @param {MouseEvent} event
     */
    private onScrollspy_handler(event: MouseEvent): void {
        const self = this,
            eventName = self.$cls.SCROLLSPY_EVENT,
            relatedTarget = event.relatedTarget as HTMLAnchorElement;
        self.eventSubscribers.raise(eventName, new self.$sse(eventName, self, new self.$ssed(event, relatedTarget, relatedTarget?.id)));
    }

    /**
     * Refresh the Scrollspy Control. This is required if the DOM changes for the Spied or Navigation Element
     * @date 11/12/2022 - 04:10:38
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Controls_Scrollspy}
     */
    public refresh(): Mrbr_UI_Bootstrap_Controls_Scrollspy {
        this.bootstrap.ScrollSpy.getInstance(this.spiedElement)?.refresh();
        return this;
    }
}