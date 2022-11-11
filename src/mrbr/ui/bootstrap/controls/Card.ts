import { Mrbr_System_Promise } from "../../../system/Promise";//mrbr:exclude
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
type imageLocationType = typeof Mrbr_UI_Bootstrap_Controls_Card.imageLocations[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.imageLocations];
type cardStyleType = typeof Mrbr_UI_Bootstrap_Controls_Card.cardStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.cardStyles];
type imagePropertiesType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Card.ImageCardProperties>;
type imageSizeType = typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSize[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSize];
type imageSplitType = typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSplit[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSplit];
type horizontalCardStyleType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalCardStyle>;
export class Mrbr_UI_Bootstrap_Controls_Card extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    public static CARD_NAME: string = "card";
    public static CARD_BODY_NAME: string = "card_body";
    public static CARD_TITLE_NAME: string = "card_title";
    public static CARD_SUBTITLE_NAME: string = "card_subtitle";
    public static CARD_TEXT_NAME: string = "card_text";
    public static CARD_LINK_NAME: string = "card_link";
    public static CARD_IMAGE_NAME: string = "card_image";
    public static CARD_HEADER_NAME: string = "card_header";
    public static CARD_FOOTER_NAME: string = "card_footer";
    public static CARD_ROW_NAME: string = "card_row";
    public static CARD_IMAGE_HOLDER_NAME: string = "card_image_holder";
    public static CARD_BODY_HOLDER_NAME: string = "card_body_holder";
    public static HorizontalImageSize = {
        "i1_11": "1:11",
        "I2_10": "2:10",
        "i3_9": "3:9",
        "i4_8": "4:8",
        "i5_7": "5:7",
        "i6_6": "6:6",
        "i7_7": "7:5",
        "i8_8": "8:4",
        "i9_3": "9:3",
        "i10_2": "10:2",
        "i11_1": "11:1"
    } as const;
    public static HorizontalImageSplit = {
        "default": "col",
        "xs": "col-",
        "sm": "col-sm-",
        "md": "col-md-",
        "lg": "col-lg-",
        "xl": "col-xl-",
        "xxl": "col-xxl-"
    } as const;
    public static ImageCardProperties = class {
        _src: string = "";
        _alt: string = "";
        constructor(src: string, alt: string) {
            this._src = src;
            this._alt = alt;
        }
        public get src(): string { return this._src; }
        public set src(value: string) { this.src = value; }
        public get alt(): string { return this._alt; }
        public set alt(value: string) { this._alt = value; }
    }
    public static HorizontalCardStyle = class {
        _imageSize: imageSizeType;
        _imageSplit: imageSplitType;
        _imageCardProperties: imagePropertiesType;
        constructor(imageSize: imageSizeType, imageSplit: imageSplitType, src: string, alt: string) {
            const self = this;
            self._imageSize = imageSize;
            self._imageSplit = imageSplit;
            self._imageCardProperties = new Mrbr_UI_Bootstrap_Controls_Card.ImageCardProperties(src, alt);
        }
        public get imageCardProperties(): imagePropertiesType { return this._imageCardProperties; }
        public set imageCardProperties(value: imagePropertiesType) { this._imageCardProperties = value; }
        public get imageSize(): imageSizeType { return this._imageSize; }
        public set imageSize(value: imageSizeType) { this._imageSize = value; }
        public get imageSplit(): imageSplitType { return this._imageSplit; }
        public set imageSplit(value: imageSplitType) { this._imageSplit = value; }
    }
    public static cardStyles = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        OVERLAY: "overlay",
        EMPTY: "empty"
    } as const;
    public static imageLocations = {
        TOP: "top",
        BOTTOM: "bottom",
        OVERLAY: "overlay",
        LEFT: "left"
    } as const;
    private _cardImageProperties: imagePropertiesType | horizontalCardStyleType;
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Card { return Mrbr_UI_Bootstrap_Controls_Card; }
    private _cardStyle: cardStyleType = this.$cls.cardStyles.HORIZONTAL;
    private _imageLocation: imageLocationType = this.$cls.imageLocations.TOP;
    constructor(rootElementName: string, cardStyle: cardStyleType = Mrbr_UI_Bootstrap_Controls_Card.cardStyles.HORIZONTAL, cardImageProperties?: imagePropertiesType | horizontalCardStyleType) {
        super(rootElementName);
        const self = this;
        self.cardStyle = cardStyle;
        if (cardStyle === self.$cls.cardStyles.OVERLAY &&
            (!cardImageProperties || !(cardImageProperties instanceof self.$cls.ImageCardProperties))) {
            throw new Error("Overlay card style requires an image properties object");
        }
        else if (cardStyle === self.$cls.cardStyles.HORIZONTAL &&
            (!cardImageProperties || !(cardImageProperties instanceof self.$cls.HorizontalCardStyle))) {
            throw new Error("Horizontal card style requires a horizontal card style object");
        }
        this._cardImageProperties = cardImageProperties;
    }
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Card> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Card>("Mrbr_UI_Bootstrap_Controls_Card:initialise"),
            imageSizeLeftSplit: number = 0,
            imageSizeRightSplit: number = 1;
        self.defaultContainerElementName = self.rootElementName;
        super.initialise(args).then(async _ => {
            await self.loadManifest(self.$cls[self.$mrbrBase.MRBR_COMPONENT_MANIFEST]);
            await self.setDefaultConfig();
            const elements = [];
            switch (self.cardStyle) {
                case self.$cls.cardStyles.VERTICAL:
                    elements.push(self.createBody(self.$cls.CARD_BODY_NAME));
                    break;
                case self.$cls.cardStyles.OVERLAY:
                    const
                        imageProperties: imagePropertiesType = self._cardImageProperties as imagePropertiesType,
                        overlayBody = self.createBody(self.$cls.CARD_BODY_NAME),
                        overlayImage = self.createImage(self.$cls.CARD_IMAGE_NAME, self.imageLocation, imageProperties?.src || "", imageProperties?.alt || "");
                    self.classes(overlayBody, self.$clsActions.Add, "card-img-overlay")
                    elements.push(overlayImage, overlayBody);
                    break;
                case self.$cls.cardStyles.HORIZONTAL:
                    let horizontalImageProperties: horizontalCardStyleType = self._cardImageProperties as horizontalCardStyleType,
                        imageSplit = horizontalImageProperties.imageSize.split(":"),
                        leftSplit = imageSplit[imageSizeLeftSplit],
                        rightSplit = imageSplit[imageSizeRightSplit],
                        image = self.createImage(self.$cls.CARD_IMAGE_NAME, self.$cls.imageLocations.LEFT, horizontalImageProperties?.imageCardProperties?.src || "", horizontalImageProperties?.imageCardProperties?.alt || ""),
                        body = self.createBody(self.$cls.CARD_BODY_NAME),
                        imageHolder: HTMLElement = self.createElement(new self.$ctrlCfg(self.$cls.CARD_IMAGE_HOLDER_NAME, "div", self.elementConfig.getConfig(self.$cls.CARD_IMAGE_HOLDER_NAME)
                            .Children([image])
                            .Classes(`${horizontalImageProperties.imageSplit}${leftSplit}`))
                        ) as HTMLElement,
                        bodyHolder: HTMLElement = self.createElement(new self.$ctrlCfg(self.$cls.CARD_BODY_HOLDER_NAME, "div", self.elementConfig.getConfig(self.$cls.CARD_BODY_HOLDER_NAME)
                            .Children([body])
                            .Classes(`${horizontalImageProperties.imageSplit}${rightSplit}`))
                        ) as HTMLElement,
                        cardRow = self.createElement(new self.$ctrlCfg(self.$cls.CARD_ROW_NAME, "div", self.elementConfig.getConfig(self.$cls.CARD_ROW_NAME)
                            .Children([imageHolder, bodyHolder]))
                        );
                    elements.push(cardRow);
                    break;
                case self.$cls.cardStyles.EMPTY:
                    break;
            }
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.getConfig(self.$cls.CARD_NAME).Children(elements)));
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }
    public get imageLocation(): imageLocationType { return this._imageLocation; }
    public set imageLocation(value: imageLocationType) { this._imageLocation = value; }
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Card> {
        const
            self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Card>("Mrbr_UI_Bootstrap_Controls_Card:setDefaultConfig");
        try {
            super.setDefaultConfig().then(() => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME])
                    .setIfNotExist(self.$cls.CARD_NAME, new self.$ctrlPrm()
                        .Classes("card"))
                    .setIfNotExist(self.$cls.CARD_ROW_NAME, new self.$ctrlPrm()
                        .Classes("row g-0"))
                    .setIfNotExist(self.$cls.CARD_IMAGE_HOLDER_NAME, new self.$ctrlPrm())
                    .setIfNotExist(self.$cls.CARD_BODY_HOLDER_NAME, new self.$ctrlPrm())
                    .setIfNotExist(self.$cls.CARD_BODY_NAME, new self.$ctrlPrm()
                        .Classes("card-body"))
                    .setIfNotExist(self.$cls.CARD_TITLE_NAME, new self.$ctrlPrm()
                        .Classes("card-title"))
                    .setIfNotExist(self.$cls.CARD_SUBTITLE_NAME, new self.$ctrlPrm()
                        .Classes("card-subtitle"))
                    .setIfNotExist(self.$cls.CARD_TEXT_NAME, new self.$ctrlPrm()
                        .Classes("card-text"))
                    .setIfNotExist(self.$cls.CARD_LINK_NAME, new self.$ctrlPrm()
                        .Classes("card-link"))
                    .setIfNotExist(self.$cls.CARD_IMAGE_NAME, new self.$ctrlPrm())
                    .setIfNotExist(self.$cls.CARD_HEADER_NAME, new self.$ctrlPrm()
                        .Classes("card-header"))
                    .setIfNotExist(self.$cls.CARD_FOOTER_NAME, new self.$ctrlPrm()
                        .Classes("card-footer"))
                setDefaultConfigPromise.resolve(self);
            });
        } catch (error) { setDefaultConfigPromise.reject(error); }
        return setDefaultConfigPromise;
    }
    public get cardStyle(): cardStyleType { return this._cardStyle; }
    public set cardStyle(value: cardStyleType) { this._cardStyle = value; }

    public createBody(id: string): HTMLDivElement {
        return this.createElement(new this.$ctrlCfg(id, "div", this.elementConfig.getConfig(this.$cls.CARD_BODY_NAME))) as HTMLDivElement;
    }
    public createTitle(id: string, titleText: string): HTMLHeadElement {
        return <HTMLHeadElement>this.createElement(new this.$ctrlCfg(id, "h5", this.elementConfig.getConfig(this.$cls.CARD_TITLE_NAME)
            .Properties({ textContent: titleText })));
    }
    public createSubtitle(id: string, subtitleText: string): HTMLHeadElement {
        return <HTMLHeadElement>this.createElement(new this.$ctrlCfg(id, "h6", this.elementConfig.getConfig(this.$cls.CARD_SUBTITLE_NAME)
            .Properties({ textContent: subtitleText })));
    }
    public createText(id: string, text: string): HTMLParagraphElement {
        return <HTMLParagraphElement>this.createElement(new this.$ctrlCfg(id, "p", this.elementConfig.getConfig(this.$cls.CARD_TEXT_NAME)
            .Id(this.$ctrl.createId("p"))
            .Properties({ textContent: text })));
    }
    public createLink(id: string, href: string, text: string): HTMLAnchorElement {
        return <HTMLAnchorElement>this.createElement(new this.$ctrlCfg(id, "a", this.elementConfig.getConfig(this.$cls.CARD_LINK_NAME)
            .Properties({ href: href, textContent: text })));
    }
    public createImage(id: string, location: imageLocationType, source: string, alt: string): HTMLImageElement {
        const classes = [];
        (location === this.$cls.imageLocations.LEFT) && classes.push("img-fluid", "rounded-start") || classes.push(location === this.$cls.imageLocations.TOP ? "card-img-top" : "card-img-bottom");
        return <HTMLImageElement>this.createElement(new this.$ctrlCfg(id, "img", this.elementConfig.getConfig(this.$cls.CARD_IMAGE_NAME)
            .Classes(classes)
            .Properties({ src: source, alt: alt })));
    }
    public createHeader(id: string, text: string): HTMLDivElement {
        return <HTMLDivElement>this.createElement(new this.$ctrlCfg(id, "div", this.elementConfig.getConfig(this.$cls.CARD_HEADER_NAME)
            .Properties({ textContent: text })));
    }
    public createFooter(id: string, text: string): HTMLDivElement {
        return <HTMLDivElement>this.createElement(new this.$ctrlCfg(id, "div", this.elementConfig.getConfig(this.$cls.CARD_FOOTER_NAME)
            .Properties({ textContent: text })));
    }
}