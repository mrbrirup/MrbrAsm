import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
type carouselItemType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Carousel.CarouselItem>;
export class Mrbr_UI_Bootstrap_Controls_Carousel extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Members
    public static CAROUSEL_NAME: string = "carousel";
    public static CAROUSEL_INNER_NAME: string = "carousel_inner";
    public static CAROUSEL_ITEM_NAME: string = "carousel_item";
    public static CAROUSEL_ITEM_IMAGE_NAME: string = "carousel_item_image";
    public static CAROUSEL_ITEM_CAPTION_NAME: string = "carousel_item_caption";
    public static CAROUSEL_INDICATOR_NAME: string = "carousel_indicator";
    public static CAROUSEL_INDICATORS_NAME: string = "carousel_indicators";
    public static CAROUSEL_CONTROL_PREV_NAME: string = "carousel_control_prev";
    public static CAROUSEL_CONTROL_NEXT_NAME: string = "carousel_control_next";
    public static CAROUSEL_SLID_EVENT_NAME: string = "slid.bs.carousel";
    public static CAROUSEL_SLIDE_EVENT_NAME: string = "slide.bs.carousel";
    //#endregion Public Static Members
    public static CarouselItem = class {
        constructor(id: string, src: string, alt: string, slideName: string, active: boolean = false) {
            const self = this;
            self.id = id;
            self.alt = alt;
            self.active = active;
            self.src = src;
            self.slideName = slideName;
        }
        _id: string;
        _active: boolean;
        _container: HTMLElement;
        _image: HTMLImageElement;
        _src: string;
        _captionContainer: HTMLElement;
        _alt: string = "";
        _slideName: string;
        _interval: number = 0;
        public get interval(): number { return this._interval; }
        public set interval(value: number) { this._interval = value; }
        public get slideName(): string { return this._slideName; }
        public set slideName(value: string) { this._slideName = value; }
        public get src(): string { return this._src; }
        public set src(value: string) { this._src = value; }
        public get captionContainer(): HTMLElement { return this._captionContainer; }
        public set captionContainer(value: HTMLElement) { this._captionContainer = value; }
        public get alt(): string { return this._alt; }
        public set alt(value: string) { this._alt = value; }
        public get image(): HTMLImageElement { return this._image; }
        public set image(value: HTMLImageElement) { this._image = value; }
        public get id(): string { return this._id; }
        public set id(value: string) { this._id = value; }
        public get active(): boolean { return this._active; }
        public set active(value: boolean) { this._active = value; }
        public get container(): HTMLElement { return this._container; }
        public set container(value: HTMLElement) { this._container = value; }
    }
    //#region Private Members
    private _carouselItems: Map<string, carouselItemType> = new Map<string, carouselItemType>();
    private _withControls: boolean = false;
    private _darkVariant: boolean = false;
    private _disableTouchSwipe: boolean = false;
    private _useCrossFade: boolean = false;
    private _withCaptions: boolean = false;
    private _withIndicators: boolean = false;
    private _autoPlay: boolean = true;
    private _bootstrapCarousel: any;
    private _interval: number = 5000;
    private _keyboard: boolean = true;
    private _wrap: boolean = true;
    private _touch: boolean = true;
    private _pauseOnHover: boolean = true;
    //#endregion Private Members
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Carousel { return Mrbr_UI_Bootstrap_Controls_Carousel; }
    constructor(rootElementName: string) { super(rootElementName); }
    //#region Public Properties
    public get pauseOnHover(): boolean { return this._pauseOnHover; }
    public set pauseOnHover(value: boolean) {
        (this.rootElement) && (this.elementDataset(this.rootElement, { bsPause: value ? "hover" : "false" }))
        this._pauseOnHover = value;
    }
    public get interval(): number { return this._interval; }
    public set interval(value: number) {
        value = Math.max(0, value);
        (this.rootElement) && (this.elementDataset(this.rootElement, { bsInterval: value }));
        this._interval = value;
    }
    public get keyboard(): boolean { return this._keyboard; }
    public set keyboard(value: boolean) {
        (this.rootElement) && (this.elementDataset(this.rootElement, { bsKeyboard: value }));
        this._keyboard = value;
    }
    public get touch(): boolean { return this._touch; }
    public set touch(value: boolean) {
        (this.rootElement) && (this.elementDataset(this.rootElement, { bsTouch: value }));
        this._touch = value;
    }
    public get wrap(): boolean { return this._wrap; }
    public set wrap(value: boolean) {
        (this.rootElement) && (this.elementDataset(this.rootElement, { bsWrap: value }));
        this._wrap = value;
    }

    public get autoPlay(): boolean { return this._autoPlay; }
    public set autoPlay(value: boolean) {
        (this.rootElement) && (this.elementDataset(this.rootElement, { bsRide: value ? "carousel" : "true" }));
        this._autoPlay = value;
    }
    public get bootstrapCarousel(): any { return this._bootstrapCarousel; }
    public set bootstrapCarousel(value: any) { this._bootstrapCarousel = value; }
    public get withControls(): boolean { return this._withControls; }
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
    public get withIndicators(): boolean { return this._withIndicators; }
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
    public get withCaptions(): boolean { return this._withCaptions; }
    public set withCaptions(value: boolean) {
        this._withCaptions = value;
        const
            root = this.rootElement,
            carouselCaptionItemName = this.$cls.CAROUSEL_ITEM_CAPTION_NAME,
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
    private addCaptionContainer(item: carouselItemType) {
        const
            carouselCaptionItemName = this.$cls.CAROUSEL_ITEM_CAPTION_NAME,
            captionId = `${item.id}_caption`;
        item.captionContainer = <HTMLElement>this.createElement(new this.$ctrlCfg(captionId, "div", this.elementConfig.getConfig(carouselCaptionItemName)));
        item.container.appendChild(item.captionContainer);

    }
    public get useCrossFade(): boolean { return this._useCrossFade; }
    public set useCrossFade(value: boolean) {
        (this.rootElement) && (this.classes(this.rootElement, value ? this.$clsActions.Add : this.$clsActions.Remove, "carousel-fade"));
        this._useCrossFade = value;
    }
    public get disableTouchSwipe(): boolean { return this._disableTouchSwipe; }
    public set disableTouchSwipe(value: boolean) {
        (this.rootElement) && (this.elementDataset(this.rootElement, { bsTouch: value ? "false" : this.$cls.DELETE }));
        this._disableTouchSwipe = value;
    }
    public get darkVariant(): boolean { return this._darkVariant; }
    public set darkVariant(value: boolean) {
        (this.rootElement) && (this.classes(this.rootElement, value ? this.$clsActions.Add : this.$clsActions.Remove, "carousel-dark"));
        this._darkVariant = value;
    }
    public get carouselItems(): Map<string, carouselItemType> { return this._carouselItems; }
    public set carouselItems(value: Map<string, carouselItemType>) { this._carouselItems = value; }
    //#endregion Public Properties
    //#region Public Methods
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
        if (item.interval > 0) { this.elementDataset(carouselItem, { bsInterval: item.interval }); }
        item.container = carouselItem;
        item.image = image;
        (this.withCaptions) && (this.addCaptionContainer(item));
        this.elements.get(this.$cls.CAROUSEL_INNER_NAME)?.appendChild(carouselItem);
        return this;
    }
    public addCarouselItems(items: Array<carouselItemType>): Mrbr_UI_Bootstrap_Controls_Carousel {
        const
            self = this,
            carouselItems = self.carouselItems,
            errors = items.filter((item) => carouselItems.has(item.id)).map((item) => item.id);
        if (errors.length > 0) { throw new Error(`Carousel items with ids ${errors.join(", ")} already exists`); }
        items.forEach((item) => self.addCarouselItem(item));
        return self;
    }
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
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Carousel> {
        const self = this,
            initalisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Carousel:initialise");
        super.initialise(...args).then(async () => {
            await self.setDefaultConfig();
            await self.loadManifest(self.$cls[self.$mrbrBase.MRBR_COMPONENT_MANIFEST]);
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


            //TODO: Update to new Mutation Observer 
            // self.events.add(`carousel_${self.$cls.MUTATION_EVENT_NAME}`, new Mrbr_System_Events_EventHandler(
            //     self.$cls.MUTATION_EVENT_NAME,
            //     self.$cls.mutations,
            //     self.mutation_handler,
            //     self
            // ));

            self.onMounted(() => {
                self.bootstrapCarousel = self.bootstrap.Carousel.getOrCreateInstance(`#${self.rootElement.id}`);
                (self.autoPlay) && self.bootstrapCarousel.cycle();
            });




            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }
    //public mutation_handler(event: InstanceType<typeof Mrbr_UI_Controls_Control.MutationEvent>): void {
    // public mutation_handler(event: any): void {
    //     const self = this;
    //     let nodedAdded: boolean = false;
    //     for (let mutationIndex = 0; mutationIndex < event.detail.length; mutationIndex++) {
    //         if (nodedAdded === true) { break; }
    //         const mutation = event.detail[mutationIndex];
    //         for (let nodeIndex = 0; nodeIndex < mutation.addedNodes.length; nodeIndex++) {
    //             const node = mutation.addedNodes[nodeIndex];
    //             if (node.nodeType === Node.ELEMENT_NODE) {
    //                 const element = <HTMLElement>node;
    //                 if (element.id === self.rootElement.id) {
    //                     self.events.get(`carousel_${self.$cls.MUTATION_EVENT_NAME}`).remove();
    //                     self.bootstrapCarousel = new MrbrBase.mrbrInstance.host["bootstrap"].Carousel(`#${self.rootElement.id}`)
    //                     nodedAdded = true;
    //                     (self.autoPlay) && self.bootstrapCarousel.cycle();
    //                     self.events.add(`slid.bs.carousel`, new Mrbr_System_Events_EventHandler(
    //                         "slid.bs.carousel",
    //                         self.rootElement,
    //                         self.carouselSlid_handler,
    //                         self
    //                     ));
    //                     //     eventName: "slid.bs.carousel",
    //                     //     eventTarget: self.rootElement,
    //                     //     eventHandler: self.carouselSlid_handler,
    //                     //     context: self
    //                     // };
    //                     self.events.add(`slide.bs.carousel`, new Mrbr_System_Events_EventHandler(
    //                         "slide.bs.carousel",
    //                         self.rootElement,
    //                         self.carouselSlide_handler,
    //                         self
    //                     ))
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // }


    public onSlide(handler: (event: Mrbr_System_Events_Event<any>) => void): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        self.events.add(`slide.bs.carousel`, new Mrbr_System_Events_EventHandler(
            "slide.bs.carousel",
            self.rootElement,
            self.carouselSlide_handler,
            self
        ));
        self.eventSubscribers.add("slide.bs.carousel", handler);
        return self;
    }

    public onSlid(handler: (event: Mrbr_System_Events_Event<any>) => void): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        self.events.add(`slid.bs.carousel`, new Mrbr_System_Events_EventHandler(
            "slid.bs.carousel",
            self.rootElement,
            self.carouselSlid_handler,
            self
        ));
        self.eventSubscribers.add("slid.bs.carousel", handler);
        return self;
    }


    private carouselSlid_handler(event): void {
        this.eventSubscribers.raise("slid.bs.carousel", event);
    }
    private carouselSlide_handler(event): void {
        this.eventSubscribers.raise("slide.bs.carousel", event);
    }
    setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Carousel> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Carousel:setDefaultConfig");
        super.setDefaultConfig().then(() => {
            self.elementConfig
                .controlName(self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME])
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
    cycle() { this.bootstrapCarousel.cycle(); }
    next() { this.bootstrapCarousel.next(); }
    nextWhenVisible() { this.bootstrapCarousel.nextWhenVisible(); }
    pause() { this.bootstrapCarousel.pause(); }
    prev() { this.bootstrapCarousel.prev(); }
    to() { this.bootstrapCarousel.to(); }
    //#endregion Public Methods
}