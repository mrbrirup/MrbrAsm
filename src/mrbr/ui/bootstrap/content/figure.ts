import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "../controls/BootstrapControl";

/**
 * Create A Bootstrap Figure
 * @date 29/12/2022 - 17:35:22
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Content_Figure
 * @typedef {Mrbr_UI_Bootstrap_Content_Figure}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Content_Figure extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Internal Figure Name
     * @date 29/12/2022 - 17:34:55
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FIGURE: string = "figure";

    /**
     * Internal Figure Caption Name
     * @date 29/12/2022 - 17:35:10
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FIGURE_CAPTION: string = "figure-caption";

    /**
     * Internal Figure Image Name
     * @date 29/12/2022 - 17:35:16
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly FIGURE_IMAGE: string = "figure-image";


    /**
     * Caption field
     * @date 29/12/2022 - 17:35:45
     *
     * @private
     * @type {string}
     */
    private _caption: string;

    /**
     * Image Source field
     * @date 29/12/2022 - 17:36:05
     *
     * @private
     * @type {string}
     */
    private _imageSrc: string;

    /**
     * Image Alt field
     * @date 29/12/2022 - 17:36:12
     *
     * @private
     * @type {string}
     */
    private _imageAlt: string;

    /**
     * Figure Class Type Alias
     * @date 29/12/2022 - 17:36:21
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Content_Figure}
     */
    public get $figure(): typeof Mrbr_UI_Bootstrap_Content_Figure { return this[Symbol.for("Mrbr.UI.Bootstrap.Controls.Figure")] ??= this[Symbol.for("Mrbr.UI.Bootstrap.Content.Table")] ??= Mrbr_UI_Bootstrap_Content_Figure; };

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Content_Figure.
     * @date 29/12/2022 - 17:36:40
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) { super(rootElementName); }


    /**
     * Caption Property, get caption or create a new one if it doesn't exist and set the caption
     * @date 29/12/2022 - 17:36:45
     *
     * @public
     * @type {string}
     */
    public get caption(): string { return this._caption; }

    /**
     * Caption Property, get caption or create a new one if it doesn't exist and set the caption
     */
    public set caption(value: string) {
        const root = this.rootElement;
        let captionElement = this.elements.get(this.$figure.FIGURE_CAPTION);
        if (!value && captionElement) {
            captionElement.remove();
            this._caption = value;
            return;
        }
        !captionElement && (captionElement = <HTMLElement>this.createElement(new this.$ctrlCfg(this.$figure.FIGURE_CAPTION, this.$htmlt.figcaption, this.elementConfig.getConfig(this.$figure.FIGURE_CAPTION))));
        captionElement.innerText = value;
        root && captionElement.parentElement !== root && root.appendChild(captionElement);
        this._caption = value;
    }

    /**
     * Image Source Property
     * @date 29/12/2022 - 17:37:06
     *
     * @public
     * @type {string}
     */
    public get imageSrc(): string { return this._imageSrc; }

    /**
     * Image Source Property
     */
    public set imageSrc(value: string) {
        (this.rootElement) && (this.createImage().setAttribute("src", value));
        this._imageSrc = value;
    }

    /**
     * Image Alt Property
     * @date 29/12/2022 - 17:37:18
     *
     * @public
     * @type {string}
     */
    public get imageAlt(): string { return this._imageAlt; }

    /**
     * Image Alt Property
     */
    public set imageAlt(value: string) {
        this.rootElement && (this.createImage().setAttribute("alt", value));
        this._imageAlt = value;
    }

    /**
     * Create Image Element or return existing
     * @date 29/12/2022 - 17:37:31
     *
     * @private
     * @returns {HTMLImageElement}
     */
    private createImage(): HTMLImageElement {
        const root = this.rootElement;
        let imageElement = <HTMLImageElement>this.elements.get(this.$figure.FIGURE_IMAGE) || <HTMLImageElement>this.createElement(new this.$ctrlCfg(this.$figure.FIGURE_IMAGE, this.$htmlt.image, this.elementConfig.getConfig(this.$figure.FIGURE_IMAGE)));
        root && imageElement.parentElement !== root && root.prepend(imageElement);
        return imageElement;
    }


    /**
     * Initialise the control, load the manifest and create the root element
     * @date 29/12/2022 - 17:38:28
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Content_Figure>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Content_Figure> {
        const self = this,
            controlName = self.$figure[self.$mrbr.COMPONENT_NAME],
            initialisePromise = Mrbr_System_Promise.create(`${controlName}:initialise`);
        super
            .initialise(...args)
            .then(async _ => {
                await self.loadManifest(self.$figure);
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.figure, self.elementConfig.getConfig(self.$figure.FIGURE)));
                self.imageSrc = self.imageSrc;
                self.imageAlt = self.imageAlt;
                self.caption = self.caption;
                await self.setDefaultConfig();
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error));
        return initialisePromise;
    }

    /**
     * Set the default configuration for the control
     * @date 29/12/2022 - 17:38:45
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<any>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Content_Figure> {
        const self = this,
            controlName = self.$figure[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = Mrbr_System_Promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig(...args)
            .then(() => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$figure.FIGURE, new self.$ctrlPrm()
                        .Classes("figure"))
                    .setIfNotExist(self.$figure.FIGURE_CAPTION, new self.$ctrlPrm()
                        .Classes("figure-caption"))
                    .setIfNotExist(self.$figure.FIGURE_IMAGE, new self.$ctrlPrm()
                        .Classes("figure-img"));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error));
        return setDefaultConfigPromise;
    }

    /**
     * Set the caption, fluent interface
     * @date 29/12/2022 - 17:38:56
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Content_Figure}
     */
    public Caption(value: string): Mrbr_UI_Bootstrap_Content_Figure {
        this.caption = value;
        return this;
    }

    /**
     * Set the image source, fluent interface
     * @date 29/12/2022 - 17:39:03
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Content_Figure}
     */
    public ImageSrc(value: string): Mrbr_UI_Bootstrap_Content_Figure {
        this.imageSrc = value;
        return this;
    }

    /**
     * Set the image alt, fluent interface
     * @date 29/12/2022 - 17:39:30
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Content_Figure}
     */
    public ImageAlt(value: string): Mrbr_UI_Bootstrap_Content_Figure {
        this.imageAlt = value;
        return this;
    }
}
