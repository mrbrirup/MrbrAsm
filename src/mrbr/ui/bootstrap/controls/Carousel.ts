import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
type carouselItemType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Carousel.CarouselItem>;
export class Mrbr_UI_Bootstrap_Controls_Carousel extends Mrbr_UI_Controls_Control {
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
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    //#region Public Properties
    public get pauseOnHover(): boolean {
        return this._pauseOnHover;
    }
    public set pauseOnHover(value: boolean) {
        const self = this;
        if (self.rootElement) {
            self.dataset(self.rootElement, { bsPause: value ? "hover" : "false" });
        }
        this._pauseOnHover = value;
    }
    public get interval(): number {
        return this._interval;
    }
    public set interval(value: number) {
        const self = this;
        if (self.rootElement && value > 0) {
            self.dataset(self.rootElement, { bsInterval: value });
            this._interval = value;
        }
    }
    public get keyboard(): boolean {
        return this._keyboard;
    }
    public set keyboard(value: boolean) {
        const self = this;
        if (self.rootElement) {
            self.dataset(self.rootElement, { bsKeyboard: value });
        }
        this._keyboard = value;
    }
    public get touch(): boolean {
        return this._touch;
    }
    public set touch(value: boolean) {
        const self = this;
        if (self.rootElement) {
            self.dataset(self.rootElement, { bsTouch: value });
        }
        this._touch = value;
    }
    public get wrap(): boolean {
        return this._wrap;
    }
    public set wrap(value: boolean) {
        const self = this;
        if (self.rootElement) {
            self.dataset(self.rootElement, { bsWrap: value });
        }
        this._wrap = value;
    }

    public get autoPlay(): boolean { return this._autoPlay; }
    public set autoPlay(value: boolean) {
        const self = this;
        if (self.rootElement) {
            if (value) {
                self.dataset(self.rootElement, { bsRide: "carousel" });
            } else {
                self.dataset(self.rootElement, { bsRide: "true" });
            }
        }
        self._autoPlay = value;
    }
    public get bootstrapCarousel(): any {
        return this._bootstrapCarousel;
    }
    public set bootstrapCarousel(value: any) {
        this._bootstrapCarousel = value;
    }
    public get withControls(): boolean { return this._withControls; }
    public set withControls(value: boolean) {
        const self = this;
        if (self.rootElement) {
            if (value) {
                let prevIcon = document.createElement("span"),
                    prevText = document.createElement("span"),
                    nextIcon = document.createElement("span"),
                    nextText = document.createElement("span");
                self.classes(prevIcon, self.$clsActions.Add, "carousel-control-prev-icon");
                self.classes(nextIcon, self.$clsActions.Add, "carousel-control-next-icon");
                self.aria([prevIcon, nextIcon], { hidden: "true" });
                self.classes([prevText, nextText], self.$clsActions.Add, "visually-hidden");
                prevText.innerText = "Previous";
                nextText.innerText = "Next";
                let prev = <HTMLButtonElement>self.createElement(new this.$ctrlCfg(self.$cls.CAROUSEL_CONTROL_PREV_NAME, "button", self.configuration(self.$cls.CAROUSEL_CONTROL_PREV_NAME))
                    .Data({ bsTarget: `#${self.rootElement.id}` })
                    .Children([prevIcon, prevText])
                );
                let next = <HTMLButtonElement>self.createElement(new this.$ctrlCfg(self.$cls.CAROUSEL_CONTROL_NEXT_NAME, "button", self.configuration(self.$cls.CAROUSEL_CONTROL_NEXT_NAME))
                    .Data({ bsTarget: `#${self.rootElement.id}` })
                    .Children([nextIcon, nextText])
                );
                self.rootElement.appendChild(self.elements[self.$cls.CAROUSEL_CONTROL_PREV_NAME]);
                self.rootElement.appendChild(self.elements[self.$cls.CAROUSEL_CONTROL_NEXT_NAME]);
            }
        }
        self._withControls = value;
    }
    public get withIndicators(): boolean { return this._withIndicators; }
    public set withIndicators(value: boolean) {
        const self = this;
        if (self.rootElement) {
            if (value && !self.elements[self.$cls.CAROUSEL_INDICATORS_NAME]) {
                let indicators = [];
                Array.from(self.carouselItems.values()).forEach((item: carouselItemType) => {
                    let isActive = item.container.classList.contains("active");
                    let indicator = <HTMLElement>self.createElement(new self.$ctrlCfg(`indicator_${indicators.length}`, "button", self.configuration(self.$cls.CAROUSEL_INDICATOR_NAME))
                        .Data({ bsTarget: `#${self.rootElement.id}`, bsSlideTo: indicators.length })
                        .Aria({ label: item.slideName, current: isActive ? "true" : "false" })
                    );
                    (isActive) && self.classes(indicator, self.$clsActions.Add, "active");
                    indicators.push(indicator);
                });
                self.createElement(new this.$ctrlCfg(self.$cls.CAROUSEL_INDICATORS_NAME, "div", self.configuration(self.$cls.CAROUSEL_INDICATORS_NAME))
                    .Children(indicators)
                )
                self.rootElement.prepend(self.elements[self.$cls.CAROUSEL_INDICATORS_NAME]);
            }
            else if (!value && self.elements[self.$cls.CAROUSEL_INDICATORS_NAME]) {
                self.rootElement.removeChild(self.elements[self.$cls.CAROUSEL_INDICATORS_NAME]);
            }
        }
        this._withIndicators = value;
    }
    public get withCaptions(): boolean { return this._withCaptions; }
    public set withCaptions(value: boolean) {
        const self = this;
        if (self.rootElement) {
            if (value) {
                Array.from(self.carouselItems.values()).forEach((item: carouselItemType) => {
                    if (!item.captionContainer) {
                        item.captionContainer = <HTMLElement>self.createElement(new self.$ctrlCfg(`${item.id}_caption`, "div", self.configuration(self.$cls.CAROUSEL_ITEM_CAPTION_NAME)));
                        item.container.appendChild(item.captionContainer);
                    }
                });
            }
            self._withCaptions = value;
        }
    }
    public get useCrossFade(): boolean { return this._useCrossFade; }
    public set useCrossFade(value: boolean) {
        const self = this;
        if (self.rootElement) {
            if (value) {
                self.classes(self.rootElement, self.$clsActions.Add, "carousel-fade");
            } else {
                self.classes(self.rootElement, self.$clsActions.Remove, "carousel-fade");
            }
        }
        self._useCrossFade = value;
    }
    public get disableTouchSwipe(): boolean { return this._disableTouchSwipe; }
    public set disableTouchSwipe(value: boolean) {
        const self = this;
        if (self.rootElement) {
            if (value) {
                self.dataset(self.rootElement, { bsTouch: "false" });
            } else {
                self.dataset(self.rootElement, { bsTouch: self.$cls.DELETE });
            }
        }
        self._disableTouchSwipe = value;
    }
    public get darkVariant(): boolean { return this._darkVariant; }
    public set darkVariant(value: boolean) {
        const self = this;
        if (self.rootElement) {
            if (value) {
                self.classes(self.rootElement, self.$clsActions.Add, "carousel-dark");
            } else {
                self.classes(self.rootElement, self.$clsActions.Remove, "carousel-dark");
            }
        }
        self._darkVariant = value;
    }
    public get carouselItems(): Map<string, carouselItemType> { return this._carouselItems; }
    public set carouselItems(value: Map<string, carouselItemType>) { this._carouselItems = value; }
    //#endregion Public Properties
    public setActiveItem(item: string | carouselItemType): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        if (typeof item === "string") {
            if (!self.carouselItems.has(item)) {
                throw new Error(`Carousel item with id ${item} does not exist`);
            }
            item = self.carouselItems.get(item);
        }
        self.carouselItems.forEach((value, key) => self.classes(value.container, self.$clsActions.Remove, "active"));
        self.carouselItems.forEach((value, key) => {
            if (value.id === (item as carouselItemType).id) {
                self.classes(value.container, self.$clsActions.Add, "active");
            }
        })
        return self;
    }
    public addCarouselItem(item: carouselItemType): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        if (self.carouselItems.has(item.id)) {
            throw new Error(`Carousel item with id ${item.id} already exists`);
        }
        self.carouselItems.set(item.id, item);
        const image: HTMLImageElement = <HTMLImageElement>self.createElement(new self.$ctrlCfg(`${item.id}_image`, "img", self.configuration(self.$cls.CAROUSEL_ITEM_IMAGE_NAME))
            .Attributes({ src: item.src, alt: item.alt })),
            carouselItem: HTMLElement = <HTMLElement>self.createElement(new self.$ctrlCfg(item.id, "div", self.configuration(self.$cls.CAROUSEL_ITEM_NAME))
                .Children([image])
            );
        if (item.interval > 0) {
            self.dataset(carouselItem, { bsInterval: item.interval });
        }
        item.container = carouselItem;
        item.image = image;

        if (self.withCaptions) {
            const captionContainer: HTMLElement = <HTMLElement>self.createElement(new self.$ctrlCfg(`${item.id}_caption`, "div", self.configuration(self.$cls.CAROUSEL_ITEM_CAPTION_NAME)));
            item.captionContainer = captionContainer;
            carouselItem.appendChild(captionContainer);
        }

        if (self.elements[self.$cls.CAROUSEL_INNER_NAME]) {
            self.elements[self.$cls.CAROUSEL_INNER_NAME].appendChild(carouselItem);
        }
        return self;
    }
    public addCarouselItems(items: Array<carouselItemType>): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        const errors = [];
        items.forEach((item) => {
            if (self.carouselItems.has(item.id)) {
                errors.push(`Carousel item with id ${item.id} already exists`);
            }
        })
        if (errors.length > 0) {
            throw new Error(errors.join(", "));
        }
        items.forEach((item) => self.addCarouselItem(item));
        return self;
    }
    public removeCarouselItem(item: carouselItemType): Mrbr_UI_Bootstrap_Controls_Carousel {
        const self = this;
        if (!self.carouselItems.has(item.id)) {
            throw new Error(`Carousel item with id ${item.id} does not exist`);
        }
        if (self.elements[self.$cls.CAROUSEL_INNER_NAME]) {
            const carouselItem: HTMLElement = self.carouselItems.get(item.id).container;
            self.elements[self.$cls.CAROUSEL_INNER_NAME].removeChild(carouselItem);
        }
        self.carouselItems.delete(item.id);
        return self;
    }
    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Carousel> {
        const self = this,
            initalisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Carousel:initialise");
        super.initialise(...args).then(async () => {
            await self.setDefaultConfig();
            await self.$mrbr.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST]);
            const carouselInner: HTMLElement = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.CAROUSEL_INNER_NAME, "div", self.defaultConfig.get(self.$cls.CAROUSEL_INNER_NAME)));
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.defaultConfig.get(self.$cls.CAROUSEL_NAME))
                .Children([carouselInner])
            );
            self.withControls = self._withControls;
            self.withIndicators = self._withIndicators;
            self.withCaptions = self._withCaptions;
            self.disableTouchSwipe = self._disableTouchSwipe;
            self.darkVariant = self._darkVariant;
            self.autoPlay = self._autoPlay;
            self.useCrossFade = self._useCrossFade;
            self.interval = self._interval;
            self.pauseOnHover = self._pauseOnHover;
            let active = Array.from(self.carouselItems.keys()).find((value, key) => self.carouselItems.get(value).container.classList.contains("active"));
            if (!active) {
                let [first] = self.carouselItems.keys();
                self.setActiveItem(first);
            }
            self.events[`carousel_${self.$cls.MUTATION_EVENT_NAME}`] = <Mrbr_System_Events_EventHandler>{
                eventName: self.$cls.MUTATION_EVENT_NAME,
                eventTarget: self.$cls.mutations,
                event: self.mutation_handler,
                context: self
            };
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }
    public mutation_handler(event: InstanceType<typeof Mrbr_UI_Controls_Control.MutationEvent>): void {
        const self = this;
        let nodedAdded: boolean = false;
        for (let mutationIndex = 0; mutationIndex < event.detail.length; mutationIndex++) {
            if (nodedAdded === true) { break; }
            const mutation = event.detail[mutationIndex];
            for (let nodeIndex = 0; nodeIndex < mutation.addedNodes.length; nodeIndex++) {
                const node = mutation.addedNodes[nodeIndex];
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const element = <HTMLElement>node;
                    if (element.id === self.rootElement.id) {
                        self.events[`carousel_${self.$cls.MUTATION_EVENT_NAME}`].remove();
                        self.bootstrapCarousel = new MrbrBase.mrbrInstance.host["bootstrap"].Carousel(`#${self.rootElement.id}`)
                        nodedAdded = true;
                        (self.autoPlay) && self.bootstrapCarousel.cycle();
                        self.events[`slid.bs.carousel`] = <Mrbr_System_Events_EventHandler>{
                            eventName: "slid.bs.carousel",
                            eventTarget: self.rootElement,
                            event: self.carouselSlid_handler,
                            context: self
                        };
                        self.events[`slide.bs.carousel`] = <Mrbr_System_Events_EventHandler>{
                            eventName: "slid.bs.carousel",
                            eventTarget: self.rootElement,
                            event: self.carouselSlide_handler,
                            context: self
                        };
                        break;
                    }
                }
            }
        }
    }
    private carouselSlid_handler(event): void {
        const self = this;
        self.dispatchEvent(new CustomEvent(self.$cls.CAROUSEL_SLID_EVENT_NAME, { detail: event }));
    }
    private carouselSlide_handler(event): void {
        const self = this;
        self.dispatchEvent(new CustomEvent(self.$cls.CAROUSEL_SLIDE_EVENT_NAME, { detail: event }));
    }
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Carousel> {
        super.setDefaultConfig();
        const self = this,
            setDefaultConfigPromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Carousel:setDefaultConfig");
        super.setDefaultConfig().then(() => {
            self.defaultConfig.add(self.$cls.CAROUSEL_NAME, new self.$ctrlPrm().Classes("carousel slide"));
            self.defaultConfig.add(self.$cls.CAROUSEL_INNER_NAME, new self.$ctrlPrm().Classes("carousel-inner"));
            self.defaultConfig.add(self.$cls.CAROUSEL_ITEM_NAME, new self.$ctrlPrm().Classes("carousel-item"));
            self.defaultConfig.add(self.$cls.CAROUSEL_INDICATOR_NAME, new self.$ctrlPrm()
                .Attributes({ type: "button" })
            );
            self.defaultConfig.add(self.$cls.CAROUSEL_INDICATORS_NAME, new self.$ctrlPrm().Classes("carousel-indicators"));
            self.defaultConfig.add(self.$cls.CAROUSEL_CONTROL_PREV_NAME, new self.$ctrlPrm()
                .Classes("carousel-control-prev")
                .Attributes({ type: "button" })
                .Data({ bsSlide: "prev" })
            );
            self.defaultConfig.add(self.$cls.CAROUSEL_CONTROL_NEXT_NAME, new self.$ctrlPrm()
                .Classes("carousel-control-next")
                .Attributes({ type: "button" })
                .Data({ bsSlide: "next" })
            );
            self.defaultConfig.add(self.$cls.CAROUSEL_ITEM_IMAGE_NAME, new self.$ctrlPrm().Classes("d-block w-100"));
            self.defaultConfig.add(self.$cls.CAROUSEL_ITEM_CAPTION_NAME, new self.$ctrlPrm().Classes("carousel-caption d-none d-md-block"));

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

}