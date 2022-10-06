import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";//mrbr:exclude
import { Mrbr_UI_Controls_Control } from "../../controls/control";
type imageLocationType = typeof Mrbr_UI_Bootstrap_Controls_Card.imageLocations[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.imageLocations];
type cardStyleType = typeof Mrbr_UI_Bootstrap_Controls_Card.cardStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.cardStyles];
type imagePropertiesType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Card.ImageCardProperties>;
export class Mrbr_UI_Bootstrap_Controls_Card extends Mrbr_UI_Controls_Control {
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
    public static cardStyles = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        OVERLAY: "overlay",
        EMPTY: "empty"
    } as const;
    public static imageLocations = {
        TOP: "top",
        BOTTOM: "bottom",
        OVERLAY: "overlay"
    } as const;
    private _cardImageProperties: imagePropertiesType;
    // public static CARD_BACKGROUND_NAME: string = "card_background";
    // public static CARD_BORDER_NAME: string = "card_border";
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Card { return Mrbr_UI_Bootstrap_Controls_Card; }
    get c() { return this.$cls.ImageCardProperties; }
    private _cardStyle: cardStyleType = this.$cls.cardStyles.HORIZONTAL;
    private _imageLocation: imageLocationType = this.$cls.imageLocations.TOP;
    constructor(rootElementName: string)
    constructor(rootElementName: string, cardStyle?: cardStyleType, cardImageProperties?: imagePropertiesType) {
        super(rootElementName);
        this.cardStyle = cardStyle || this.$cls.cardStyles.HORIZONTAL;
        this._cardImageProperties = cardImageProperties;
    }
    initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Card> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Card>("Mrbr_UI_Bootstrap_Controls_Card:initialise");
        self.defaultContainerElementName = self.rootElementName;

        super.initialise(args).then(() => {
            const elements = [];
            switch (self.cardStyle) {
                case self.$cls.cardStyles.VERTICAL:
                    elements.push(self.createBody(self.$cls.CARD_BODY_NAME));
                    break;
                case self.$cls.cardStyles.HORIZONTAL:
                    elements.push(
                        self.createBody(self.$cls.CARD_BODY_NAME),
                        self.createImage(self.$cls.CARD_IMAGE_NAME, self.imageLocation, self._cardImageProperties.src || "", self._cardImageProperties?.alt || ""));
                    break;
                case self.$cls.cardStyles.OVERLAY:
                    let image = self.createImage(self.$cls.CARD_IMAGE_NAME, self.$cls.imageLocations.OVERLAY, self._cardImageProperties?.src || "", self._cardImageProperties?.alt || ""),
                        body = self.createBody(self.$cls.CARD_BODY_NAME),
                        imageHolder = self.createElement(new self.$ctrlCfg(self.$cls.CARD_IMAGE_HOLDER_NAME, self.configuration[self.$cls.CARD_IMAGE_HOLDER_NAME])
                            .Children([image])
                        ),
                        bodyHolder = self.createElement(new self.$ctrlCfg(self.$cls.CARD_BODY_HOLDER_NAME, self.configuration[self.$cls.CARD_BODY_HOLDER_NAME])
                            .Children([body])
                        );
                    elements.push(imageHolder, bodyHolder);
                    break;
                case self.$cls.cardStyles.EMPTY:
                    break;
            }
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.CARD_NAME)).Children(elements));
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }
    public get imageLocation(): imageLocationType {
        return this._imageLocation;
    }
    public set imageLocation(value: imageLocationType) {
        this._imageLocation = value;
    }
    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Card> {
        const self = this;
        self.defaultConfiguration.add(self.$cls.CARD_NAME, new self.$ctrlPrm().Classes("card"));
        self.defaultConfiguration.add(self.$cls.CARD_ROW_NAME, new self.$ctrlPrm().Classes("row g-0"));
        self.defaultConfiguration.add(self.$cls.CARD_IMAGE_HOLDER_NAME, new self.$ctrlPrm().Classes("col-md-4"));
        self.defaultConfiguration.add(self.$cls.CARD_BODY_HOLDER_NAME, new self.$ctrlPrm().Classes("col-md-8"));

        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Controls_Card:setDefaultConfiguration", self);
    }
    public get cardStyle(): cardStyleType { return this._cardStyle; }
    public set cardStyle(value: cardStyleType) { this._cardStyle = value; }

    createBody(id: string): HTMLDivElement {
        const self = this;
        self.defaultConfiguration.has(self.$cls.CARD_BODY_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_BODY_NAME, new self.$ctrlPrm()
                .Classes("card-body")
            );
        return self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.CARD_BODY_NAME))) as HTMLDivElement;
    }
    createTitle(id: string, titleText: string): HTMLHeadElement {
        const self = this;
        self.defaultConfiguration.has(self.$cls.CARD_TITLE_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_TITLE_NAME, new self.$ctrlPrm()
                .Classes("card-title"));
        const element = self.createElement(new self.$ctrlCfg(self.rootElementName, "h5", self.configuration(self.$cls.CARD_TITLE_NAME))) as HTMLHeadElement;
        element.textContent = titleText;
        return element;
    }
    createSubtitle(id: string, subtitleText: string): HTMLHeadElement {
        const self = this;
        self.defaultConfiguration.has(self.$cls.CARD_SUBTITLE_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_SUBTITLE_NAME, new self.$ctrlPrm()
                .Classes("card-subtitle"));
        const element = self.createElement(new self.$ctrlCfg(self.rootElementName, "h6", self.configuration(self.$cls.CARD_SUBTITLE_NAME))) as HTMLHeadElement;
        element.textContent = subtitleText;
        return element;
    }
    createText(id: string, text: string): HTMLParagraphElement {
        const self = this;
        self.defaultConfiguration.has(self.$cls.CARD_TEXT_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_TEXT_NAME, new self.$ctrlPrm()
                .Classes("card-text"));
        const element = self.createElement(new self.$ctrlCfg(self.rootElementName, "p", self.configuration(self.$cls.CARD_TEXT_NAME))) as HTMLParagraphElement;
        element.textContent = text;
        return element;
    }
    createLink(id: string, href: string, text: string): HTMLAnchorElement {
        const self = this;
        self.defaultConfiguration.has(self.$cls.CARD_LINK_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_LINK_NAME, new self.$ctrlPrm()
                .Classes("card-link"));
        const element = self.createElement(new self.$ctrlCfg(self.rootElementName, "a", self.configuration(self.$cls.CARD_LINK_NAME))) as HTMLAnchorElement;
        element.href = href;
        element.textContent = text;
        return element;
    }

    createImage(id: string, location: imageLocationType, source: string, alt: string): HTMLImageElement {
        const self = this,
            classes = [];
        if (location === self.$cls.imageLocations.OVERLAY) {
            classes.push("img-fluid");
            classes.push("rounded-start");
        }
        else {
            classes.push(location === self.$cls.imageLocations.TOP ? "card-img-top" : "card-img-bottom");
        }
        self.defaultConfiguration.has(self.$cls.CARD_IMAGE_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_IMAGE_NAME, new self.$ctrlPrm()
                .Classes(classes)
            );
        const element = self.createElement(new self.$ctrlCfg(self.rootElementName, "img", self.configuration(self.$cls.CARD_IMAGE_NAME))) as HTMLImageElement;
        element.src = source;
        element.alt = alt;
        return element;
    }
    createHeader(id: string, text: string): HTMLDivElement {
        const self = this;
        self.defaultConfiguration.has(self.$cls.CARD_HEADER_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_HEADER_NAME, new self.$ctrlPrm()
                .Classes("card-header"));
        const element = self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.CARD_HEADER_NAME))) as HTMLDivElement;
        element.textContent = text;
        return element;
    }
    createFooter(id: string, text: string): HTMLDivElement {
        const self = this;
        self.defaultConfiguration.has(self.$cls.CARD_FOOTER_NAME) === false
            && self.defaultConfiguration.add(self.$cls.CARD_FOOTER_NAME, new self.$ctrlPrm()
                .Classes("card-footer"));
        const element = self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.CARD_FOOTER_NAME))) as HTMLDivElement;
        element.textContent = text;
        return element;
    }
}