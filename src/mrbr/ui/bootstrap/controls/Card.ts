import { Mrbr_System_Promise } from "../../../system/Promise";//mrbr:exclude
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
type imageLocationType = typeof Mrbr_UI_Bootstrap_Controls_Card.imageLocations[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.imageLocations];
type cardStyleType = typeof Mrbr_UI_Bootstrap_Controls_Card.cardStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.cardStyles];
type imagePropertiesType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Card.ImageCardProperties>;
type imageSizeType = typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSize[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSize];
type imageSplitType = typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSplit[keyof typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalImageSplit];
type horizontalCardStyleType = InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Card.HorizontalCardStyle>;

/**
 * @class Mrbr.UI.Bootstrap.Controls.Card
 * @extends Mrbr.UI.Bootstrap.Controls.BootstrapControl
 * @description A bootstrap card control
 * @date 14/11/2022 - 07:45:52
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_Card
 * @typedef {Mrbr_UI_Bootstrap_Controls_Card}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Controls_Card extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Constants

    /**
     * Internal Card Element Name
     * @date 14/11/2022 - 07:49:56
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_NAME: string = "card";

    /**
     * Internal CardBody Element Name
     * @date 14/11/2022 - 07:50:14
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_BODY_NAME: string = "card_body";

    /**
     * Internal CardTitle Element Name
     * @date 14/11/2022 - 07:50:38
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_TITLE_NAME: string = "card_title";

    /**
     * Internal CardSubtitle Element Name
     * @date 14/11/2022 - 07:51:00
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_SUBTITLE_NAME: string = "card_subtitle";

    /**
     * Internal CardText Element Name
     * @date 14/11/2022 - 07:51:21
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_TEXT_NAME: string = "card_text";

    /**
     * Internal CardLink Element Name
     * @date 14/11/2022 - 07:51:38
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_LINK_NAME: string = "card_link";

    /**
     * Internal CardImage Element Name
     * @date 14/11/2022 - 07:51:58
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_IMAGE_NAME: string = "card_image";

    /**
     * Internal CardHeader Element Name
     * @date 14/11/2022 - 07:52:11
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_HEADER_NAME: string = "card_header";

    /**
     * Internal CardFooter Element Name
     * @date 14/11/2022 - 07:52:34
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_FOOTER_NAME: string = "card_footer";

    /**
     * Internal CardRow Element Name
     * @date 14/11/2022 - 07:52:49
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_ROW_NAME: string = "card_row";

    /**
     * Internal CardImageHolder Element Name
     * @date 14/11/2022 - 07:53:03
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_IMAGE_HOLDER_NAME: string = "card_image_holder";

    /**
     * Internal CardBodyHolder Element Name
     * @date 14/11/2022 - 07:53:20
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CARD_BODY_HOLDER_NAME: string = "card_body_holder";
    //#endregion Public Static Constants
    //#region Public Enums

    /**
     * Horizontal Image Size to Body Size, ratio of left-side:right-side
     * @date 14/11/2022 - 07:53:40
     *
     * @public
     * @static
     * @type {{ readonly i1_11: "1:11"; readonly I2_10: "2:10"; readonly i3_9: "3:9"; readonly i4_8: "4:8"; readonly i5_7: "5:7"; readonly i6_6: "6:6"; readonly i7_7: "7:5"; readonly i8_8: "8:4"; readonly i9_3: "9:3"; readonly i10_2: "10:2"; readonly i11_1: "11:1"; }}
     */
    public static HorizontalImageSize = {
        i1_11: "1:11",
        I2_10: "2:10",
        i3_9: "3:9",
        i4_8: "4:8",
        i5_7: "5:7",
        i6_6: "6:6",
        i7_7: "7:5",
        i8_8: "8:4",
        i9_3: "9:3",
        i10_2: "10:2",
        i11_1: "11:1"
    } as const;

    /**
     * Image split size
     * @date 14/11/2022 - 07:55:46
     *
     * @public
     * @static
     * @type {{ readonly default: "col"; readonly xs: "col-"; readonly sm: "col-sm-"; readonly md: "col-md-"; readonly lg: "col-lg-"; readonly xl: "col-xl-"; readonly xxl: "col-xxl-"; }}
     */
    public static HorizontalImageSplit = {
        default: "col",
        xs: "col-",
        sm: "col-sm-",
        md: "col-md-",
        lg: "col-lg-",
        xl: "col-xl-",
        xxl: "col-xxl-"
    } as const;

    /**
     * Card Styles
     * @date 14/11/2022 - 07:56:48
     *
     * @public
     * @static
     * @type {{ readonly horizontal: "horizontal"; readonly vertical: "vertical"; readonly overlay: "overlay"; readonly empty: "empty"; }}
     */
    public static cardStyles = {
        horizontal: "horizontal",
        vertical: "vertical",
        overlay: "overlay",
        empty: "empty"
    } as const;

    /**
     * Image Position in Card
     * @date 14/11/2022 - 07:57:00
     *
     * @public
     * @static
     * @type {{ readonly top: "top"; readonly bottom: "bottom"; readonly overlay: "overlay"; readonly left: "left"; }}
     */
    public static imageLocations = {
        top: "top",
        bottom: "bottom",
        overlay: "overlay",
        left: "left"
    } as const;
    //#endregion Public Enums
    //#region Public classes

    /**
     * Card Image Class
     * @date 14/11/2022 - 07:57:16
     *
     * @class
     */
    public static ImageCardProperties = class {
        _src: string = "";
        _alt: string = "";

        /**
         * @date 14/11/2022 - 07:58:26
         *
         * @constructor
         * @param {string} src Image Source
         * @param {string} alt Image Alt Text
         */
        constructor(src: string, alt: string) {
            this._src = src;
            this._alt = alt;
        }

        /**
         * Image Source
         * @date 14/11/2022 - 07:57:35
         *
         * @public
         * @type {string}
         */
        public get src(): string { return this._src; }

        /**
         * Image Source
         */
        public set src(value: string) { this.src = value; }

        /**
         * Image Alt Text
         * @date 14/11/2022 - 07:57:46
         *
         * @public
         * @type {string}
         */
        public get alt(): string { return this._alt; }

        /**
         * Image Alt Text
         */
        public set alt(value: string) { this._alt = value; }
    }

    /**
     * Horizontal Card Style Properties
     * @date 14/11/2022 - 07:58:04
     *
     * @class
     */
    public static HorizontalCardStyle = class {
        _imageSize: imageSizeType;
        _imageSplit: imageSplitType;
        _imageCardProperties: imagePropertiesType;

        /**
         * @date 14/11/2022 - 07:58:41
         *
         * @constructor
         * @param {imageSizeType} imageSize Image Size to Body Ratio
         * @param {imageSplitType} imageSplit Image Responsive Split Size
         * @param {string} src Image Source
         * @param {string} alt Image Alt Text
         */
        constructor(imageSize: imageSizeType, imageSplit: imageSplitType, src: string, alt: string) {
            const self = this;
            self._imageSize = imageSize;
            self._imageSplit = imageSplit;
            self._imageCardProperties = new Mrbr_UI_Bootstrap_Controls_Card.ImageCardProperties(src, alt);
        }

        /**
         * Image Card Style Properties
         * @date 14/11/2022 - 07:59:36
         *
         * @public
         * @type {imagePropertiesType}
         */
        public get imageCardProperties(): imagePropertiesType { return this._imageCardProperties; }


        /**
         * Image Card Style Properties
         */
        public set imageCardProperties(value: imagePropertiesType) { this._imageCardProperties = value; }

        /**
         * Image Size to Body Ratio
         * @date 14/11/2022 - 07:59:51
         *
         * @public
         * @type {imageSizeType}
         */
        public get imageSize(): imageSizeType { return this._imageSize; }

        /**
         * Image Size to Body Ratio
         */
        public set imageSize(value: imageSizeType) { this._imageSize = value; }

        /**
         * Image Responsive Split Size
         * @date 14/11/2022 - 08:00:42
         *
         * @public
         * @type {imageSplitType}
         */
        public get imageSplit(): imageSplitType { return this._imageSplit; }

        /**
         * Image Responsive Split Size
         */
        public set imageSplit(value: imageSplitType) { this._imageSplit = value; }
    }
    //#endregion Public classes

    //#region Type Aliases
    /**
     * Card Class Type Alias
     * @date 14/11/2022 - 08:01:46
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Card}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Card { return Mrbr_UI_Bootstrap_Controls_Card; }
    //#endregion Type Aliases
    //#region Private Fields

    /**
     * Card Properties for Images
     * @date 14/11/2022 - 08:02:24
     *
     * @private
     * @type {(imagePropertiesType | horizontalCardStyleType)}
     */
    private _cardImageProperties: imagePropertiesType | horizontalCardStyleType;

    /**
     * Card Style
     * @date 14/11/2022 - 08:02:48
     *
     * @private
     * @type {cardStyleType}
     */
    private _cardStyle: cardStyleType = this.$cls.cardStyles.horizontal;

    /**
     * Image Location in Card
     * @date 14/11/2022 - 08:02:55
     *
     * @private
     * @type {imageLocationType}
     */
    private _imageLocation: imageLocationType = this.$cls.imageLocations.top;
    //#endregion Private Fields

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Card.
     * @date 14/11/2022 - 08:03:10
     *
     * @constructor
     * @param {string} rootElementName
     * @param {cardStyleType} [cardStyle=Mrbr_UI_Bootstrap_Controls_Card.cardStyles.horizontal]
     * @param {?(imagePropertiesType | horizontalCardStyleType)} [cardImageProperties]
     */
    constructor(rootElementName: string, cardStyle: cardStyleType = Mrbr_UI_Bootstrap_Controls_Card.cardStyles.horizontal, cardImageProperties?: imagePropertiesType | horizontalCardStyleType) {
        super(rootElementName);
        const self = this;
        self.cardStyle = cardStyle;
        if (cardStyle === self.$cls.cardStyles.overlay &&
            (!cardImageProperties || !(cardImageProperties instanceof self.$cls.ImageCardProperties))) {
            throw new Error("Overlay card style requires an image properties object");
        }
        else if (cardStyle === self.$cls.cardStyles.horizontal &&
            (!cardImageProperties || !(cardImageProperties instanceof self.$cls.HorizontalCardStyle))) {
            throw new Error("Horizontal card style requires a horizontal card style object");
        }
        this._cardImageProperties = cardImageProperties;
    }
    //#region Public Properties

    /**
     * Image Location in Card
     * @date 14/11/2022 - 08:03:27
     *
     * @public
     * @type {imageLocationType}
     */
    public get imageLocation(): imageLocationType { return this._imageLocation; }

    /**
     * Image Location in Card
     */
    public set imageLocation(value: imageLocationType) { this._imageLocation = value; }

    /**
     * Card Style
     * @date 14/11/2022 - 08:03:50
     *
     * @public
     * @type {cardStyleType}
     */
    public get cardStyle(): cardStyleType { return this._cardStyle; }

    /**
     * Card Style
     */
    public set cardStyle(value: cardStyleType) { this._cardStyle = value; }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Initialise the Control, load manifest and set properties
     * @date 14/11/2022 - 08:04:06
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Card>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Card> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Card>("Mrbr_UI_Bootstrap_Controls_Card:initialise"),
            imageSizeLeftSplit: number = 0,
            imageSizeRightSplit: number = 1;
        self.defaultContainerElementName = self.rootElementName;
        super.initialise(args).then(async _ => {
            await self.loadManifest(self.$cls);
            await self.setDefaultConfig();
            const elements = [];
            switch (self.cardStyle) {
                case self.$cls.cardStyles.vertical:
                    elements.push(self.createBody(self.$cls.CARD_BODY_NAME));
                    break;
                case self.$cls.cardStyles.overlay:
                    const
                        imageProperties: imagePropertiesType = self._cardImageProperties as imagePropertiesType,
                        overlayBody = self.createBody(self.$cls.CARD_BODY_NAME),
                        overlayImage = self.createImage(self.$cls.CARD_IMAGE_NAME, self.imageLocation, imageProperties?.src || "", imageProperties?.alt || "");
                    self.classes(overlayBody, self.$clsActions.add, "card-img-overlay")
                    elements.push(overlayImage, overlayBody);
                    break;
                case self.$cls.cardStyles.horizontal:
                    let horizontalImageProperties: horizontalCardStyleType = self._cardImageProperties as horizontalCardStyleType,
                        imageSplit = horizontalImageProperties.imageSize.split(":"),
                        leftSplit = imageSplit[imageSizeLeftSplit],
                        rightSplit = imageSplit[imageSizeRightSplit],
                        image = self.createImage(self.$cls.CARD_IMAGE_NAME, self.$cls.imageLocations.left, horizontalImageProperties?.imageCardProperties?.src || "", horizontalImageProperties?.imageCardProperties?.alt || ""),
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
                case self.$cls.cardStyles.empty:
                    break;
            }
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.getConfig(self.$cls.CARD_NAME)
                .Children(elements)));
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }

    /**
     * Set default config for the control
     * @date 14/11/2022 - 08:05:11
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Card>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Card> {
        const
            self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Card>(self.$cls[self.$mrbr.COMPONENT_NAME] + ":setDefaultConfig");
        try {
            super.setDefaultConfig().then(() => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
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
    
    /**
     * Create a card body, Div element
     * @date 14/11/2022 - 08:06:24
     *
     * @public
     * @param {string} id
     * @returns {HTMLDivElement}
     */
    public createBody(id: string): HTMLDivElement {
        return this.createElement(new this.$ctrlCfg(id, "div", this.elementConfig.getConfig(this.$cls.CARD_BODY_NAME))) as HTMLDivElement;
    }
    
    /**
     * Create a card title, Header5 element 
     * @date 14/11/2022 - 08:06:32
     *
     * @public
     * @param {string} id
     * @param {string} titleText
     * @returns {HTMLHeadElement}
     */
    public createTitle(id: string, titleText: string): HTMLHeadElement {
        return <HTMLHeadElement>this.createElement(new this.$ctrlCfg(id, "h5", this.elementConfig.getConfig(this.$cls.CARD_TITLE_NAME)
            .Properties({ textContent: titleText })));
    }
    
    /**
     * Create a card subtitle, Heading 6 element
     * @date 14/11/2022 - 08:06:42
     *
     * @public
     * @param {string} id
     * @param {string} subtitleText
     * @returns {HTMLHeadElement}
     */
    public createSubtitle(id: string, subtitleText: string): HTMLHeadElement {
        return <HTMLHeadElement>this.createElement(new this.$ctrlCfg(id, "h6", this.elementConfig.getConfig(this.$cls.CARD_SUBTITLE_NAME)
            .Properties({ textContent: subtitleText })));
    }
    
    /**
     * Create a card text, Paragraph element
     * @date 14/11/2022 - 08:06:50
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @returns {HTMLParagraphElement}
     */
    public createText(id: string, text: string): HTMLParagraphElement {
        return <HTMLParagraphElement>this.createElement(new this.$ctrlCfg(id, "p", this.elementConfig.getConfig(this.$cls.CARD_TEXT_NAME)
            .Id(this.$ctrl.createId("p"))
            .Properties({ textContent: text })));
    }
    
    /**
     * Create a card link, Anchor element
     * @date 14/11/2022 - 08:07:00
     *
     * @public
     * @param {string} id
     * @param {string} href
     * @param {string} text
     * @returns {HTMLAnchorElement}
     */
    public createLink(id: string, href: string, text: string): HTMLAnchorElement {
        return <HTMLAnchorElement>this.createElement(new this.$ctrlCfg(id, "a", this.elementConfig.getConfig(this.$cls.CARD_LINK_NAME)
            .Properties({ href: href, textContent: text })));
    }
    
    /**
     * Create a card image, Image element
     * @date 14/11/2022 - 08:07:25
     *
     * @public
     * @param {string} id
     * @param {imageLocationType} location
     * @param {string} source
     * @param {string} alt
     * @returns {HTMLImageElement}
     */
    public createImage(id: string, location: imageLocationType, source: string, alt: string): HTMLImageElement {
        const classes = [];
        (location === this.$cls.imageLocations.left) && classes.push("img-fluid", "rounded-start") || classes.push(location === this.$cls.imageLocations.top ? "card-img-top" : "card-img-bottom");
        return <HTMLImageElement>this.createElement(new this.$ctrlCfg(id, "img", this.elementConfig.getConfig(this.$cls.CARD_IMAGE_NAME)
            .Classes(classes)
            .Properties({ src: source, alt: alt })));
    }
    
    /**
     * Create a card Header, Div element
     * @date 14/11/2022 - 08:07:38
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @returns {HTMLDivElement}
     */
    public createHeader(id: string, text: string): HTMLDivElement {
        return <HTMLDivElement>this.createElement(new this.$ctrlCfg(id, "div", this.elementConfig.getConfig(this.$cls.CARD_HEADER_NAME)
            .Properties({ textContent: text })));
    }
    
    /**
     * Create a card Footer, Div element
     * @date 14/11/2022 - 08:08:04
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @returns {HTMLDivElement}
     */
    public createFooter(id: string, text: string): HTMLDivElement {
        return <HTMLDivElement>this.createElement(new this.$ctrlCfg(id, "div", this.elementConfig.getConfig(this.$cls.CARD_FOOTER_NAME)
            .Properties({ textContent: text })));
    }
    //#endregion Public Methods
}