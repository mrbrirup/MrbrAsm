export class Mrbr_UI_Bootstrap_Controls_BreadcrumbItem {


    /**
     * Internal name for the BreadcrumbItem Element.
     * @date 11/11/2022 - 07:55:05
     *
     * @public
     * @static
     * @type {string}
     */
    public static BREADCRUMBITEM_NAME: string = "breadcrumb_item";

    /**
     * Internal name for the BreadcrumbItem Link Element.
     * @date 11/11/2022 - 07:55:14
     *
     * @public
     * @static
     * @type {string}
     */
    public static BREADCRUMBITEM_LINK_NAME: string = "breadcrumb_item";

    /**
     * BreadCrumbItem Key
     * @date 11/11/2022 - 07:55:52
     *
     * @private
     * @type {string}
     */
    private _key: string;

    /**
     * BreadCrumbItem Link Href
     * @date 11/11/2022 - 07:56:04
     *
     * @private
     * @type {string}
     */
    private _href: string = "";

    /**
     * Is the BreadcrumbItem Active?
     * @date 11/11/2022 - 07:56:21
     *
     * @private
     * @type {boolean}
     */
    private _active: boolean = false;

    /**
     * Text for Breadcrumb Link Element
     * @date 11/11/2022 - 07:56:36
     *
     * @private
     * @type {string}
     */
    private _linkText: string = "";

    /**
     * Text for Breadcrumb Element
     * @date 11/11/2022 - 07:57:04
     *
     * @private
     * @type {string}
     */
    private _crumbText: string = "";


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_BreadcrumbItem.
     * @date 11/11/2022 - 07:57:24
     *
     * @constructor
     * @param {string} key
     * @param {string} link
     * @param {string} crumbText
     */
    constructor(key: string, link: string, crumbText: string) {
        this.key = key;
        this.href = link;
        this.crumbText = crumbText;
    }

    /**
     * Text for Breadcrumb Element
     * @date 11/11/2022 - 07:57:30
     *
     * @public
     * @type {string}
     */
    public get crumbText(): string { return this._crumbText; }

    /**
     * Text for Breadcrumb Element
     */
    public set crumbText(value: string) { this._crumbText = value; }

    /**
     * BreadcrumbItem Key
     * @date 11/11/2022 - 07:57:45
     *
     * @public
     * @type {string}
     */
    public get key(): string { return this._key; }

    /**
     * BreadcrumbItem Key
     */
    public set key(value: string) { this._key = value; }

    /**
     * Text for Link Element
     * @date 11/11/2022 - 07:57:58
     *
     * @public
     * @type {string}
     */
    public get linkText(): string { return this._linkText; }

    /**
     * Text for Link Element
     */
    public set linkText(value: string) { this._linkText = value; }

    /**
     * HRef for Link Element
     * @date 11/11/2022 - 07:58:22
     *
     * @public
     * @type {string}
     */
    public get href(): string { return this._href; }

    /**
     * HRef for Link Element
     */
    public set href(value: string) { this._href = value; }

    /**
     * Is the BreadcrumbItem Active?
     * @date 11/11/2022 - 07:58:38
     *
     * @public
     * @type {boolean}
     */
    public get active(): boolean { return this._active; }

    /**
     * Is the BreadcrumbItem Active?
     */
    public set active(value: boolean) { this._active = value; }
}