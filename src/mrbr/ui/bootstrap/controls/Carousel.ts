import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
type carouselItemType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Carousel.CarouselItem>;
export class Mrbr_UI_Bootstrap_Controls_Carousel extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Members

    /**
     * Internal Carousel Element Name
     * @date 14/11/2022 - 08:09:27
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_NAME: string = "carousel";

    /**
     * Carousel Inner Container Element Name
     * @date 14/11/2022 - 08:09:50
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_INNER_NAME: string = "carousel_inner";

    /**
     * Internal CarouselItem Element Name
     * @date 14/11/2022 - 08:10:15
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_ITEM_NAME: string = "carousel_item";

    /**
     * Internal CarouselItemImage Element Name
     * @date 14/11/2022 - 08:10:44
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_ITEM_IMAGE_NAME: string = "carousel_item_image";

    /**
     * Internal CarouselItemCaption Element Name 
     * @date 14/11/2022 - 08:11:05
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_ITEM_CAPTION_NAME: string = "carousel_item_caption";

    /**
     * Internal CarouselIndicator Element Name
     * @date 14/11/2022 - 08:11:27
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_INDICATOR_NAME: string = "carousel_indicator";

    /**
     * Internal CarouselIndicators Container Element Name
     * @date 14/11/2022 - 08:11:49
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_INDICATORS_NAME: string = "carousel_indicators";

    /**
     * Internal Previous Control Element Name
     * @date 14/11/2022 - 08:12:17
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_CONTROL_PREV_NAME: string = "carousel_control_prev";

    /**
     * Internal Next Control Element Name
     * @date 14/11/2022 - 08:12:44
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_CONTROL_NEXT_NAME: string = "carousel_control_next";

    /**
     * Internal CarouselSlid Event Name
     * @date 14/11/2022 - 08:12:56
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_SLID_EVENT_NAME: string = "slid.bs.carousel";

    /**
     * Internal CarouselSlide Event Name
     * @date 14/11/2022 - 08:13:23
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly CAROUSEL_SLIDE_EVENT_NAME: string = "slide.bs.carousel";
    //#endregion Public Static Members

    /**
     * CarouselItem Calss
     * @date 14/11/2022 - 08:14:51
     *
     * @class
     */
    public static CarouselItem = class {
        _id: string;
        _active: boolean;
        _container: HTMLElement;
        _image: HTMLImageElement;
        _src: string;
        _captionContainer: HTMLElement;
        _alt: string = "";
        _slideName: string;
        _interval: number = 0;

        /**
         * @date 14/11/2022 - 08:15:22
         *
         * @constructor
         * @param {string} id
         * @param {string} src
         * @param {string} alt
         * @param {string} slideName
         * @param {boolean} [active=false]
         */
        constructor(id: string, src: string, alt: string, slideName: string, active: boolean = false) {
            const self = this;
            self.id = id;
            self.alt = alt;
            self.active = active;
            self.src = src;
            self.slideName = slideName;
        }

        /**
         * CarouselItem specific Interval in Milliseconds
         * @date 14/11/2022 - 08:15:30
         *
         * @public
         * @type {number} Interval in milliseconds
         */
        public get interval(): number { return this._interval; }


        /**
         * CarouselItem specific Interval in Milliseconds
         */
        public set interval(value: number) { this._interval = value; }

        /**
         * Slide Name
         * @date 14/11/2022 - 08:16:23
         *
         * @public
         * @type {string}
         */
        public get slideName(): string { return this._slideName; }

        /**
         * Slide Name
         */
        public set slideName(value: string) { this._slideName = value; }

        /**
         * Image Source
         * @date 14/11/2022 - 08:16:39
         *
         * @public
         * @type {string} URL
         */
        public get src(): string { return this._src; }

        /**
         * Image Source
         */
        public set src(value: string) { this._src = value; }

        /**
         * CaptionContainer Element
         * @date 14/11/2022 - 08:17:02
         *
         * @public
         * @type {HTMLElement}
         */
        public get captionContainer(): HTMLElement { return this._captionContainer; }

        /**
         * CaptionContainer Element
         */
        public set captionContainer(value: HTMLElement) { this._captionContainer = value; }

        /**
         * Image Element Alt Attribute
         * @date 14/11/2022 - 08:17:22
         *
         * @public
         * @type {string}
         */
        public get alt(): string { return this._alt; }

        /**
         * Image Element Alt Attribute
         */
        public set alt(value: string) { this._alt = value; }

        /**
         * Image Element
         * @date 14/11/2022 - 08:17:41
         *
         * @public
         * @type {HTMLImageElement}
         */
        public get image(): HTMLImageElement { return this._image; }

        /**
         * Image Element
         */
        public set image(value: HTMLImageElement) { this._image = value; }

        /**
         * Item Id
         * @date 14/11/2022 - 08:17:55
         *
         * @public
         * @type {string}
         */
        public get id(): string { return this._id; }

        /**
         * Item Id
         */
        public set id(value: string) { this._id = value; }

        /**
         * Active State
         * @date 14/11/2022 - 08:18:11
         *
         * @public
         * @type {boolean}
         */
        public get active(): boolean { return this._active; }

        /**
         * Active State
         */
        public set active(value: boolean) { this._active = value; }

        /**
         * Item Container Element
         * @date 14/11/2022 - 08:18:27
         *
         * @public
         * @type {HTMLElement}
         */
        public get container(): HTMLElement { return this._container; }
        public set container(value: HTMLElement) { this._container = value; }
    }
    //#region Private Members

    /**
     * Carousel Items Map
     * @date 14/11/2022 - 08:18:41
     *
     * @private
     * @type {Map<string, carouselItemType>}
     */
    private _carouselItems: Map<string, carouselItemType> = new Map<string, carouselItemType>();

    /**
     * Show/Hide Controls
     * @date 14/11/2022 - 08:18:55
     *
     * @private
     * @type {boolean}
     */
    private _withControls: boolean = false;

    /**
     * White/Dark Theme
     * @date 14/11/2022 - 08:19:07
     *
     * @private
     * @type {boolean}
     */
    private _darkVariant: boolean = false;

    /**
     * Disable/Enable Touch Swipe
     * @date 14/11/2022 - 08:19:23
     *
     * @private
     * @type {boolean}
     */
    private _disableTouchSwipe: boolean = false;

    /**
     * Use CrossFade Effect
     * @date 14/11/2022 - 08:19:39
     *
     * @private
     * @type {boolean}
     */
    private _useCrossFade: boolean = false;

    /**
     * Show/Hide Captions
     * @date 14/11/2022 - 08:19:52
     *
     * @private
     * @type {boolean}
     */
    private _withCaptions: boolean = false;

    /**
     * Show/Hide Indicators
     * @date 14/11/2022 - 08:20:03
     *
     * @private
     * @type {boolean}
     */
    private _withIndicators: boolean = false;

    /**
     * AutoPlay Carousel on mount
     * @date 14/11/2022 - 08:20:12
     *
     * @private
     * @type {boolean}
     */
    private _autoPlay: boolean = true;

    /**
     * Bootstrap Carousel Instance
     * @date 14/11/2022 - 08:20:36
     *
     * @private
     * @type {*}
     */
    private _bootstrapCarousel: any;

    /**
     * Interval to move between slides
     * @date 14/11/2022 - 08:20:57
     *
     * @private
     * @type {number}
     */
    private _interval: number = 5000;

    /**
     * Enable/disable Keyboard Navigation
     * @date 14/11/2022 - 08:21:11
     *
     * @private
     * @type {boolean}
     */
    private _keyboard: boolean = true;

    /**
     * Wrap carousel around from last to first slide
     * @date 14/11/2022 - 08:21:33
     *
     * @private
     * @type {boolean}
     */
    private _wrap: boolean = true;

    /**
     * Use Touch Controls
     * @date 14/11/2022 - 08:21:53
     *
     * @private
     * @type {boolean}
     */
    private _touch: boolean = true;

    /**
     * Pause on Hover
     * @date 14/11/2022 - 08:22:08
     *
     * @private
     * @type {boolean}
     */
    private _pauseOnHover: boolean = true;
    //#endregion Private Members

    /**
     * Type Alias for Carsousel Class
     * @date 14/11/2022 - 08:22:18
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Carousel}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Carousel { return Mrbr_UI_Bootstrap_Controls_Carousel; }

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Carousel.
     * @date 24/11/2022 - 22:58:55
     *
     * @constructor
     * @param {?string} [rootElementName]
     * @param {?(HTMLElement | string)} [rootElement]
     */
    constructor(rootElementName?: string, rootElement?: HTMLElement | string) { super(rootElementName, rootElement); }
    //#region Public Properties

    /**
     * Pause on Hover
     * @date 14/11/2022 - 08:23:03
     *
     * @public
     * @type {boolean}
     */
    public get pauseOnHover(): boolean { return this._pauseOnHover; }

    /**
     * Pause on Hover
     */
    public set pauseOnHover(value: boolean) {
        (this.rootElement) && (this.dataset(this.rootElement, { bsPause: value ? "hover" : "false" }))
        this._pauseOnHover = value;
    }

    /**
     * Carousel Interval between slides in Milliseconds
     * @date 14/11/2022 - 08:23:26
     *
     * @public
     * @type {number}
     */
    public get interval(): number { return this._interval; }

    /**
     * Carousel Interval between slides in Milliseconds
     */
    public set interval(value: number) {
        value = Math.max(0, value);
        (this.rootElement) && (this.dataset(this.rootElement, { bsInterval: value }));
        this._interval = value;
    }

    /**
     * Enable/disable Keyboard Navigation
     * @date 14/11/2022 - 08:24:07
     *
     * @public
     * @type {boolean}
     */
    public get keyboard(): boolean { return this._keyboard; }

    /**
     * Enable/disable Keyboard Navigation
     */
    public set keyboard(value: boolean) {
        (this.rootElement) && (this.dataset(this.rootElement, { bsKeyboard: value }));
        this._keyboard = value;
    }

    /**
     * Enable/disable Touch Controls
     * @date 14/11/2022 - 08:24:23
     *
     * @public
     * @type {boolean}
     */
    public get touch(): boolean { return this._touch; }

    /**
     * Enable/disable Touch Controls
     */
    public set touch(value: boolean) {
        (this.rootElement) && (this.dataset(this.rootElement, { bsTouch: value }));
        this._touch = value;
    }

    /**
     * Enable/disable wrap around from last to first slide
     * @date 14/11/2022 - 08:24:37
     *
     * @public
     * @type {boolean}
     */
    public get wrap(): boolean { return this._wrap; }

    /**
     * Enable/disable wrap around from last to first slide
     */
    public set wrap(value: boolean) {
        (this.rootElement) && (this.dataset(this.rootElement, { bsWrap: value }));
        this._wrap = value;
    }

    /**
     * AutoPlay Carousel on mount
     * @date 14/11/2022 - 08:25:05
     *
     * @public
     * @type {boolean}
     */
    public get autoPlay(): boolean { return this._autoPlay; }

    /**
     * AutoPlay Carousel on mount
     */
    public set autoPlay(value: boolean) {
        (this.rootElement) && (this.dataset(this.rootElement, { bsRide: value ? "carousel" : "true" }));
        this._autoPlay = value;
    }

    /**
     * Bootstrap Carousel Instance
     * @date 14/11/2022 - 08:25:22
     *
     * @public
     * @type {object} Boostrap Carousel Instance
     */
    public get bootstrapCarousel(): any { return this._bootstrapCarousel; }

    /**
     * Bootstrap Carousel Instance
     */
    public set bootstrapCarousel(value: any) { this._bootstrapCarousel = value; }

    /**
     * Show/Hide Carousel Controls
     * @date 14/11/2022 - 08:26:02
     *
     * @public
     * @type {boolean}
     */
    public get withControls(): boolean { return this._withControls; }

    /**
     * Show/Hide Carousel Controls
     */
    public set withControls(value: boolean) {
        this._withControls = value;
        if (!this.rootElement) { return; }
        const controlNames = [this.$cls.CAROUSEL_CONTROL_PREV_NAME, this.$cls.CAROUSEL_CONTROL_NEXT_NAME];
        if (value) {
            controlNames.forEach((controlName: string) =>
                this.rootElement.appendChild(
                    <HTMLButtonElement>this.createElement(new this.$ctrlCfg(controlName, "button", this.elementConfig.getConfig(controlName)
                        .Data({ bsTarget: `#${this.rootElement.id}` })
                    ))));
        }
        else {
            controlNames.forEach((controlName: string) => {
                this.elements.get(controlName)?.remove();
                this.elements.delete(controlName);
            });
        }

    }

    /**
     * Show/Hide Carousel Indicators
     * @date 14/11/2022 - 08:26:40
     *
     * @public
     * @type {boolean}
     */
    public get withIndicators(): boolean { return this._withIndicators; }

    /**
     * Show/Hide Carousel Indicators
     */
    public set withIndicators(value: boolean) {
        this._withIndicators = value;
        const
            root = this.rootElement,
            indicatorsControlName = this.$cls.CAROUSEL_INDICATORS_NAME;
        if (!root) { return; }
        if (value && !this.elements.get(indicatorsControlName)) {
            let indicatorCount = 0;
            const
                indicatorConfig = this.elementConfig.getConfig(this.$cls.CAROUSEL_INDICATOR_NAME),
                bsTarget = `#${root.id}`,
                indicators = Array.from(this.carouselItems.values())
                    .map((item: carouselItemType) => {
                        const
                            isActive = item.container.classList.contains("active"),
                            indicatorId = `indicator_${indicatorCount}`,
                            indicator = <HTMLElement>this.createElement(new this.$ctrlCfg(indicatorId, "button", indicatorConfig
                                .Data({ bsTarget: bsTarget, bsSlideTo: indicatorCount })
                                .Aria({ label: item.slideName, current: isActive ? "true" : "false" })));
                        (isActive) && this.classes(indicator, this.$clsActions.Add, "active");
                        indicatorCount++;
                        return indicator;
                    });
            root.prepend(
                <HTMLDivElement>this.createElement(new this.$ctrlCfg(indicatorsControlName, "div", this.elementConfig.getConfig(indicatorsControlName)
                    .Children(indicators))
                ));
        }
        else if (!value && this.elements.has(indicatorsControlName)) {
            root.removeChild(this.elements.get(indicatorsControlName));
        }
    }

    /**
     * Show/Hide Carousel Captions
     * @date 14/11/2022 - 08:27:00
     *
     * @public
     * @type {boolean}
     */
    public get withCaptions(): boolean { return this._withCaptions; }
    public set withCaptions(value: boolean) {
        this._withCaptions = value;
        const
            root = this.rootElement,
            carouselItems = Array.from(this.carouselItems.values());
        if (!root) { return; }
        if (value) {
            carouselItems.forEach((item: carouselItemType) => (!item.captionContainer) && (this.addCaptionContainer(item)));
        }
        else {
            carouselItems.forEach((item: carouselItemType) => {
                item.captionContainer?.remove();
                item.captionContainer = null;
            });
        }
    }

    /**
     * Add Caption Container to Carousel Item
     * @date 14/11/2022 - 08:27:12
     *
     * @private
     * @param {carouselItemType} item
     */
    private addCaptionContainer(item: carouselItemType) {
        const
            carouselCaptionItemName = this.$cls.CAROUSEL_ITEM_CAPTION_NAME,
            captionId = `${item.id}_caption`;
        item.captionContainer = <HTMLElement>this.createElement(new this.$ctrlCfg(captionId, "div", this.elementConfig.getConfig(carouselCaptionItemName)));
        item.container.appendChild(item.captionContainer);

    }

    /**
     * Use CrossFade Animation
     * @date 14/11/2022 - 08:28:00
     *
     * @public
     * @type {boolean}
     */
    public get useCrossFade(): boolean { return this._useCrossFade; }

    /**
     * Use CrossFade Animation
     */
    public set useCrossFade(value: boolean) {
        (this.rootElement) && (this.classes(this.rootElement, value ? this.$clsActions.Add : this.$clsActions.Remove, "carousel-fade"));
        this._useCrossFade = value;
    }

    /**
     * Enable/disable Touch Swipe
     * @date 14/11/2022 - 08:28:22
     *
     * @public
     * @type {boolean}
     */
    public get disableTouchSwipe(): boolean { return this._disableTouchSwipe; }

    /**
     * Enable/disable Touch Swipe
     */
    public set disableTouchSwipe(value: boolean) {
        (this.rootElement) && (this.dataset(this.rootElement, { bsTouch: value ? "false" : this.$cls.DELETE }));
        this._disableTouchSwipe = value;
    }

    /**
     * Use Dark/White Variant
     * @date 14/11/2022 - 08:28:48
     *
     * @public
     * @type {boolean}
     */
    public get darkVariant(): boolean { return this._darkVariant; }

    /**
     * Use Dark/White Variant
     */
    public set darkVariant(value: boolean) {
        (this.rootElement) && (this.classes(this.rootElement, value ? this.$clsActions.Add : this.$clsActions.Remove, "carousel-dark"));
        this._darkVariant = value;
    }

    /**
     * Carousel Items
     * @date 14/11/2022 - 08:29:16
     *
     * @public
     * @type {Map<string, carouselItemType>}
     */
    public get carouselItems(): Map<string, carouselItemType> { return this._carouselItems; }

    /**
     * Carousel Items
     */
    public set carouselItems(value: Map<string, carouselItemType>) { this._carouselItems = value; }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Set Active Carousel Item
     * @date 14/11/2022 - 08:29:42
     *
     * @public
     * @param {(string | carouselItemType)} item
     * @returns {Mrbr_UI_Bootstrap_Controls_Carousel}
     */
    public setActiveItem(item: string | carouselItemType): Mrbr_UI_Bootstrap_Controls_Carousel {
        if (!item) { throw new Error("item is required"); }
        if (typeof item === "string") {
            item = this.carouselItems.get(item);
            if (!item) { throw new Error(`Carousel item with id ${item} does not exist`) };
            return this.setActiveItem(item);
        }
        const act = this.$clsActions
        this.carouselItems.forEach((value, key) => this.classes(value.container, value.id === (item as carouselItemType).id ? act.Add : act.Remove, "active"));
        return this;

    }

    /**
     * Add Carousel Item
     * @date 14/11/2022 - 08:30:01
     *
     * @public
     * @param {carouselItemType} item
     * @returns {Mrbr_UI_Bootstrap_Controls_Carousel}
     */
    public addCarouselItem(item: carouselItemType): Mrbr_UI_Bootstrap_Controls_Carousel {
        if (this.carouselItems.has(item.id)) { throw new Error(`Carousel item with id ${item.id} already exists`); }
        this.carouselItems.set(item.id, item);
        const
            cfg = this.elementConfig,
            image: HTMLImageElement = <HTMLImageElement>this.createElement(new this.$ctrlCfg(`${item.id}_image`, "img", cfg.getConfig(this.$cls.CAROUSEL_ITEM_IMAGE_NAME)
                .Attributes({ src: item.src, alt: item.alt }))),
            carouselItem: HTMLElement = <HTMLElement>this.createElement(new this.$ctrlCfg(item.id, "div", cfg.getConfig(this.$cls.CAROUSEL_ITEM_NAME)
                .Children([image]))
            );
        if (item.interval > 0) { this.dataset(carouselItem, { bsInterval: item.interval }); }
        item.container = carouselItem;
        item.image = image;
        (this.withCaptions) && (this.addCaptionContainer(item));
        this.elements.get(this.$cls.CAROUSEL_INNER_NAME)?.appendChild(carouselItem);
        return this;
    }

    /**
     * Add Array of CarouselItems
     * @date 14/11/2022 - 08:30:12
     *
     * @public
     * @param {Array<carouselItemType>} items
     * @returns {Mrbr_UI_Bootstrap_Controls_Carousel}
     */
    public addCarouselItems(items: Array<carouselItemType>): Mrbr_UI_Bootstrap_Controls_Carousel {
        const
            self = this,
            carouselItems = self.carouselItems,
            errors = items.filter((item) => carouselItems.has(item.id)).map((item) => item.id);
        if (errors.length > 0) { throw new Error(`Carousel items with ids ${errors.join(", ")} already exists`); }
        items.forEach((item) => self.addCarouselItem(item));
        return self;
    }

    /**
     * Remove Carousel Item
     * @date 14/11/2022 - 08:30:47
     *
     * @public
     * @param {carouselItemType} item
     * @returns {Mrbr_UI_Bootstrap_Controls_Carousel}
     */
    public removeCarouselItem(item: carouselItemType): Mrbr_UI_Bootstrap_Controls_Carousel {
        if (!this.carouselItems.has(item.id)) { throw new Error(`Carousel item with id ${item.id} does not exist`); }
        const carouselInner = this.elements.get(this.$cls.CAROUSEL_INNER_NAME)
        if (carouselInner) {
            const carouselItem: HTMLElement = this.carouselItems.get(item.id).container;
            this.elements.get(this.$cls.CAROUSEL_INNER_NAME).removeChild(carouselItem);
        }
        this.carouselItems.delete(item.id);
        return this;
    }

    /**
     * Initialise Carousel, load manifest and set properties
     * @date 14/11/2022 - 08:30:56
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Carousel>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Carousel> {
        const self = this,
            initalisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Carousel:initialise");
        super.initialise(...args).then(async () => {
            await self.setDefaultConfig();
            await self.loadManifest(self.$cls);
            const carouselInner: HTMLElement = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.CAROUSEL_INNER_NAME, "div", self.elementConfig.getConfig(self.$cls.CAROUSEL_INNER_NAME)));
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.getConfig(self.$cls.CAROUSEL_NAME)
                .Children([carouselInner]))
            );
            Object.assign(self, {
                withControls: self._withControls,
                withIndicators: self._withIndicators,
                withCaptions: self._withCaptions,
                disableTouchSwipe: self._disableTouchSwipe,
                darkVariant: self._darkVariant,
                autoPlay: self._autoPlay,
                useCrossFade: self._useCrossFade,
                interval: self._interval,
                pauseOnHover: self._pauseOnHover
            });
            let active = Array.from(self.carouselItems.keys()).find((value, key) => self.carouselItems.get(value).container.classList.contains("active"));
            if (!active) {
                let [first] = self.carouselItems.keys();
                first && self.setActiveItem(first);
            }

            self.onMounted(() => {
                self.bootstrapCarousel = self.bootstrap.Carousel.getOrCreateInstance(`#${self.rootElement.id}`);
                (self.autoPlay) && self.bootstrapCarousel.cycle();
            });
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }

    /**
     * Add Onslide Handler
     * @date 13/11/2022 - 13:04:37
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} handler
     * @returns {Mrbr_UI_Bootstrap_Controls_Carousel}
     */
    public onSlide(handler: (event: Mrbr_System_Events_Event<any>) => void): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        self.events.addEventHandler(new Mrbr_System_Events_EventHandler(
            self.$cls.CAROUSEL_SLIDE_EVENT_NAME,
            self.rootElement,
            self.carouselSlide_handler,
            self
        ));
        self.eventSubscribers.add(self.$cls.CAROUSEL_SLIDE_EVENT_NAME, handler);
        return self;
    }


    /**
     * Add Onslid Handler
     * @date 13/11/2022 - 13:04:53
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} handler
     * @returns {Mrbr_UI_Bootstrap_Controls_Carousel}
     */
    public onSlid(handler: (event: Mrbr_System_Events_Event<any>) => void): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        self.events.addEventHandler(new Mrbr_System_Events_EventHandler(
            self.$cls.CAROUSEL_SLID_EVENT_NAME,
            self.rootElement,
            self.carouselSlid_handler,
            self
        ));
        self.eventSubscribers.add(self.$cls.CAROUSEL_SLID_EVENT_NAME, handler);
        return self;
    }


    /**
     * Raise Carousel Slid Event
     * @date 13/11/2022 - 13:05:57
     *
     * @private
     * @param {*} event
     */
    private carouselSlid_handler(event): void { this.eventSubscribers.raise(this.$cls.CAROUSEL_SLID_EVENT_NAME, event); }

    /**
     * Raise Carousel Slide Event
     * @date 13/11/2022 - 13:06:10
     *
     * @private
     * @param {*} event
     */
    private carouselSlide_handler(event): void { this.eventSubscribers.raise(this.$cls.CAROUSEL_SLIDE_EVENT_NAME, event); }

    /**
     * Set Default Configuration
     * @date 14/11/2022 - 08:31:41
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Carousel>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Carousel> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Carousel:setDefaultConfig");
        super.setDefaultConfig().then(() => {
            self.elementConfig
                .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
                .setIfNotExist(self.$cls.CAROUSEL_NAME, new self.$ctrlPrm()
                    .Classes("carousel slide"))
                .setIfNotExist(self.$cls.CAROUSEL_INNER_NAME, new self.$ctrlPrm()
                    .Classes("carousel-inner"))
                .setIfNotExist(self.$cls.CAROUSEL_ITEM_NAME, new self.$ctrlPrm()
                    .Classes("carousel-item"))
                .setIfNotExist(self.$cls.CAROUSEL_INDICATOR_NAME, new self.$ctrlPrm()
                    .Attributes({ type: "button" }))
                .setIfNotExist(self.$cls.CAROUSEL_INDICATORS_NAME, new self.$ctrlPrm()
                    .Classes("carousel-indicators"))
                .setIfNotExist(self.$cls.CAROUSEL_CONTROL_PREV_NAME, new self.$ctrlPrm()
                    .Classes("carousel-control-prev")
                    .Attributes({ type: "button" })
                    .Data({ bsSlide: "prev" })
                    .Template("<span class='carousel-control-prev-icon' aria-hidden='true'></span><span class='visually-hidden'>Previous</span>"))
                .setIfNotExist(self.$cls.CAROUSEL_CONTROL_NEXT_NAME, new self.$ctrlPrm()
                    .Classes("carousel-control-next")
                    .Attributes({ type: "button" })
                    .Data({ bsSlide: "next" })
                    .Template("<span class='carousel-control-next-icon' aria-hidden='true'></span><span class='visually-hidden'>Next</span>"))
                .setIfNotExist(self.$cls.CAROUSEL_ITEM_IMAGE_NAME, new self.$ctrlPrm()
                    .Classes("d-block w-100"))
                .setIfNotExist(self.$cls.CAROUSEL_ITEM_CAPTION_NAME, new self.$ctrlPrm()
                    .Classes("carousel-caption d-none d-md-block"));
            setDefaultConfigPromise.resolve(self);
        })
        return setDefaultConfigPromise;
    }

    /**
     * Call Bootstrap Carousel Cycle. Cycles through the carousel items from left to right.
     * @date 13/11/2022 - 13:26:21
     */
    public cycle(): void { this.bootstrapCarousel.cycle(); }

    /**
     * Call Bootstrap Carousel Next. Cycles to the next item.
     * Cycles to the next item. Returns to the caller before the next item has been shown (e.g., before the slid.bs.carousel event occurs).
     * @date 13/11/2022 - 13:27:16
     */
    public next(): void { this.bootstrapCarousel.next(); }

    /**
     * Call Bootstrap Carousel nextWhenVisible. Don’t cycle carousel to next when the page isn’t visible or the carousel or its parent isn’t visible. Returns to the caller before the target item has been shown.
     * @date 13/11/2022 - 13:27:54
     */
    public nextWhenVisible(): void { this.bootstrapCarousel.nextWhenVisible(); }

    /**
     * Call Bootstrap Carousel Pause. Stops the carousel from cycling through items.
     * @date 13/11/2022 - 13:28:30
     */
    public pause(): void { this.bootstrapCarousel.pause(); }

    /**
     * Call Bootstrap Carousel Prev. Cycles to the previous item. Returns to the caller before the previous item has been shown (e.g., before the slid.bs.carousel event occurs).
     * @date 13/11/2022 - 13:28:56
     */
    public prev(): void { this.bootstrapCarousel.prev(); }

    /**
     * Call Bootstrap Carousel to. Cycles the carousel to a particular frame (0 based, similar to an array). Returns to the caller before the target item has been shown.
     * @date 13/11/2022 - 13:29:24
     */
    public to(): void { this.bootstrapCarousel.to(); }
    //#endregion Public Methods
}