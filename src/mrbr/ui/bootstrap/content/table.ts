import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "../controls/BootstrapControl";
import { Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes } from "./responsiveTableSizes";
import { Mrbr_UI_Bootstrap_Content_TableContextClasses } from "./tableContextClasses";

export class Mrbr_UI_Bootstrap_Content_Table extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Internal Table Name
     * @date 29/12/2022 - 13:02:01
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE: string = "table";

    /**
     * Internal Table Body Name
     * @date 29/12/2022 - 13:02:16
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_BODY: string = "table_body";

    /**
     * Internal Table Footer Name
     * @date 29/12/2022 - 13:02:23
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_FOOTER: string = "table_footer";

    /**
     * Internal Table Header Name
     * @date 29/12/2022 - 13:02:30
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_HEADER: string = "table_header";

    /**
     * Internal Table Caption Name
     * @date 29/12/2022 - 13:02:37
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CAPTION: string = "table_caption";

    /**
     * Internal Table Colgroup Name
     * @date 29/12/2022 - 13:02:45
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_COLGROUP: string = "table_colgroup";


    /**
     * Table-Dark Style Class
     * @date 29/12/2022 - 13:02:51
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_DARK: string = "table-dark";

    /**
     * Striped Rows Style Class
     * @date 29/12/2022 - 13:03:12
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_STRIPED_ROWS: string = "table-striped";

    /**
     * Striped-Columns Style Class
     * @date 29/12/2022 - 13:03:20
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_STRIPED_COLUMNS: string = "table-striped-columns";

    /**
     * Bordered Style Class
     * @date 29/12/2022 - 13:03:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_BORDERED: string = "table-bordered";

    /**
     * Borderless Style Class
     * @date 29/12/2022 - 13:03:53
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_BORDERLESS: string = "table-borderless";

    /**
     * Hoverable Style Class
     * @date 29/12/2022 - 13:04:00
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_HOVER: string = "table-hover";

    /**
     * Small Style Class
     * @date 29/12/2022 - 13:04:06
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_SM: string = "table-sm";

    /**
     * Group Divider Style Class
     * @date 29/12/2022 - 13:04:13
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_GROUP_DIVIDER: string = "table-group-divider";

    /**
     * Caption Top Style Class
     * @date 29/12/2022 - 13:04:21
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABLE_CLASS_CAPTION_TOP: string = "caption-top";


    /**
     * Table Class Type Alias
     * @date 29/12/2022 - 13:04:29
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Content_Table}
     */
    public get $table(): typeof Mrbr_UI_Bootstrap_Content_Table { return this[Symbol.for("Mrbr.UI.Bootstrap.Content.Table")] ??= Mrbr_UI_Bootstrap_Content_Table; }

    /**
     * Table Responsive Size Class 
     * @date 29/12/2022 - 13:04:56
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes}
     */
    private _responsiveSize: Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes;


    /**
     * Table Caption Text field
     * @date 29/12/2022 - 15:07:12
     *
     * @private
     * @type {string}
     */
    private _captionText: string;

    /**
     * Table Context Class Field
     * @date 29/12/2022 - 15:07:23
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Content_TableContextClasses}
     */
    private _context: Mrbr_UI_Bootstrap_Content_TableContextClasses;

    /**
     * Show Caption at Top of Table field     
     * @date 29/12/2022 - 15:07:38
     *
     * @private
     * @type {boolean}
     */
    private _captionTop: boolean = false;

    /**
     * Show Table Header field
     * @date 29/12/2022 - 15:08:03
     *
     * @private
     * @type {boolean}
     */
    private _showHeader: boolean = false;

    /**
     * Show Table Footer field
     * @date 29/12/2022 - 15:08:10
     *
     * @private
     * @type {boolean}
     */
    private _showFooter: boolean = false;

    /**
     * Show Table Caption field
     * @date 29/12/2022 - 15:08:17
     *
     * @private
     * @type {boolean}
     */
    private _showCaption: boolean = false;

    /**
     * Style Rows as Striped field
     * @date 29/12/2022 - 15:08:23
     *
     * @private
     * @type {boolean}
     */
    private _stripedRows: boolean = false;

    /**
     * Style Columns as Striped field
     * @date 29/12/2022 - 15:08:44
     *
     * @private
     * @type {boolean}
     */
    private _stripedColumns: boolean = false;

    /**
     * Style Table as Hoverable field
     * @date 29/12/2022 - 15:09:37
     *
     * @private
     * @type {boolean}
     */
    private _hoverable: boolean = false;

    /**
     * Style Table as Dark Theme field
     * @date 29/12/2022 - 15:09:44
     *
     * @private
     * @type {boolean}
     */
    private _darkTheme: boolean = false;

    /**
     * Style Table as Bordered field
     * @date 29/12/2022 - 15:09:52
     *
     * @private
     * @type {boolean}
     */
    private _bordered: boolean = false;

    /**
     * Style Table as Borderless field
     * @date 29/12/2022 - 15:09:58
     *
     * @private
     * @type {boolean}
     */
    private _borderless: boolean = false;

    /**
     * Style Table as Small field
     * @date 29/12/2022 - 15:10:07
     *
     * @private
     * @type {boolean}
     */
    private _small: boolean = false;

    /**
     * Style Header with Group Divider field
     * @date 29/12/2022 - 15:10:15
     *
     * @private
     * @type {boolean}
     */
    private _headerGroupDivider: boolean = false;

    /**
     * Style Footer with Group Divider field
     * @date 29/12/2022 - 15:10:35
     *
     * @private
     * @type {boolean}
     */
    private _footerGroupDivider: boolean = false;

    /**
     * Style Body with Group Divider field
     * @date 29/12/2022 - 15:10:44
     *
     * @private
     * @type {boolean}
     */
    private _bodyGroupDivider: boolean = false;


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Content_Table.
     * @date 29/12/2022 - 15:10:54
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
    }

    /**
     * Show Caption at Top of Table property
     * @date 29/12/2022 - 15:11:00
     *
     * @public
     * @type {boolean}
     */
    public get captionTop(): boolean { return this._captionTop; }

    /**
     * Show Caption at Top of Table property
     */
    public set captionTop(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_CAPTION_TOP, value);
        this._captionTop = value;
    }

    /**
     * Caption Text property. Sets the caption text and shows the caption.
     * @date 29/12/2022 - 15:11:39
     *
     * @public
     * @type {string}
     */
    public get captionText(): string { return this._captionText; }

    /**
     * Caption Text property. Sets the caption text and shows the caption.
     */
    public set captionText(value: string) {
        const caption = this.caption;
        (caption) && (caption.innerText = value);
        this.showCaption = true;
        this._captionText = value;
    }

    /**
     * Set Table Context Colour
     * @date 29/12/2022 - 15:12:09
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Content_TableContextClasses}
     */
    public get context(): Mrbr_UI_Bootstrap_Content_TableContextClasses { return this._context ??= Mrbr_UI_Bootstrap_Content_TableContextClasses.default; }

    /**
     * Set Table Context Colour
     */
    public set context(value: Mrbr_UI_Bootstrap_Content_TableContextClasses) {
        const table = this.table;
        (table) && (this.classes(table, this.$clsActions.replace, [this.context, value]))
        this._context = value;
    }

    /**
     * Style Rows as Striped property
     * @date 29/12/2022 - 15:12:32
     *
     * @public
     * @type {boolean}
     */
    public get stripedRows(): boolean { return this._stripedRows; }

    /**
     * Style Rows as Striped property
     */
    public set stripedRows(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_STRIPED_ROWS, value);
        this._stripedRows = value;
    }

    /**
     * Style Columns as Striped property
     * @date 29/12/2022 - 15:12:53
     *
     * @public
     * @type {boolean}
     */
    public get stripedColumns(): boolean { return this._stripedColumns; }

    /**
     * Style Columns as Striped property
     */
    public set stripedColumns(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_STRIPED_COLUMNS, value);
        this._stripedColumns = value;
    }

    /**
     * Style Table as Dark Theme property
     * @date 29/12/2022 - 15:13:06
     *
     * @public
     * @type {boolean}
     */
    public get darkTheme(): boolean { return this._darkTheme; }

    /**
     * Style Table as Dark Theme property
     */
    public set darkTheme(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_DARK, value);
        this._darkTheme = value;
    }

    /**
     * Style Table as Hoverable property
     * @date 29/12/2022 - 15:13:18
     *
     * @public
     * @type {boolean}
     */
    public get hoverable(): boolean { return this._hoverable; }

    /**
     * Style Table as Hoverable property
     */
    public set hoverable(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_HOVER, value);
        this._hoverable = value;
    }

    /**
     * Style Table as Bordered property
     * @date 29/12/2022 - 15:13:33
     *
     * @public
     * @type {boolean}
     */
    public get bordered(): boolean { return this._bordered; }

    /**
     * Style Table as Bordered property
     */
    public set bordered(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_BORDERED, value);
        this._bordered = value;
    }

    /**
     * Style Table as Borderless property
     * @date 29/12/2022 - 15:13:46
     *
     * @public
     * @type {boolean}
     */
    public get borderless(): boolean { return this._borderless; }

    /**
     * Style Table as Borderless property
     */
    public set borderless(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_BORDERLESS, value);
        this._borderless = value;
    }

    /**
     * Style Table as Small property
     * @date 29/12/2022 - 15:14:00
     *
     * @public
     * @type {boolean}
     */
    public get small(): boolean { return this._small; }

    /**
     * Style Table as Small property
     */
    public set small(value: boolean) {
        this.table?.classList.toggle(this.$table.TABLE_CLASS_SM, value);
        this._small = value;
    }

    /**
     * Style Header with Group Divider property
     * @date 29/12/2022 - 15:14:17
     *
     * @public
     * @type {boolean}
     */
    public get headerGroupDivider(): boolean { return this._headerGroupDivider; }

    /**
     * Style Header with Group Divider property
     */
    public set headerGroupDivider(value: boolean) {
        this.elements.get(this.$table.TABLE_HEADER)?.classList.toggle(this.$table.TABLE_CLASS_GROUP_DIVIDER, value);
        this._headerGroupDivider = value;
    }

    /**
     * Style Footer with Group Divider property
     * @date 29/12/2022 - 15:15:06
     *
     * @public
     * @type {boolean}
     */
    public get footerGroupDivider(): boolean { return this._footerGroupDivider; }

    /**
     * Style Footer with Group Divider property
     */
    public set footerGroupDivider(value: boolean) {
        this.elements.get(this.$table.TABLE_FOOTER)?.classList.toggle(this.$table.TABLE_CLASS_GROUP_DIVIDER, value);
        this._footerGroupDivider = value;
    }

    /**
     * Style Body with Group Divider property
     * @date 29/12/2022 - 15:15:53
     *
     * @public
     * @type {boolean}
     */
    public get bodyGroupDivider(): boolean { return this._bodyGroupDivider; }

    /**
     * Style Body with Group Divider property
     */
    public set bodyGroupDivider(value: boolean) {
        this.elements.get(this.$table.TABLE_BODY)?.classList.toggle(this.$table.TABLE_CLASS_GROUP_DIVIDER, value);
        this._bodyGroupDivider = value;
    }

    /**
     * Show Table Caption property
     * @date 29/12/2022 - 15:16:19
     *
     * @public
     * @type {boolean}
     */
    public get showCaption(): boolean { return this._showCaption; }

    /**
     * Show Table Caption property
     */
    public set showCaption(value: boolean) {
        const caption = this.elements.get(this.$table.TABLE_CAPTION);
        if (!value && caption) { caption.remove(); }
        else if (value && !caption) { this.caption; }
        this._showCaption = value;
    }

    /**
     * Show Table Footer property
     * @date 29/12/2022 - 15:17:11
     *
     * @public
     * @type {boolean}
     */
    public get showFooter(): boolean { return this._showFooter; }

    /**
     * Show Table Footer property
     */
    public set showFooter(value: boolean) {
        const footer = this.elements.get(this.$table.TABLE_FOOTER);
        if (!value && footer) { footer.remove(); }
        else if (value && !footer) { this.footer; }
        this._showFooter = value;
    }

    /**
     * Show Table Header property
     * @date 29/12/2022 - 15:17:33
     *
     * @public
     * @type {boolean}
     */
    public get showHeader(): boolean { return this._showHeader; }

    /**
     * Show Table Header property
     */
    public set showHeader(value: boolean) {
        const header = this.elements.get(this.$table.TABLE_HEADER);
        if (!value && header) { header.remove(); }
        else if (value && !header) {
            this.header;
        }
        this._showHeader = value;
    }


    /**
     * Responsive Table Size property
     * @date 29/12/2022 - 15:17:59
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes}
     */
    public get responsiveSize(): Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes { return this._responsiveSize }

    /**
     * Responsive Table Size property
     */
    public set responsiveSize(value: Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes) {
        let
            self = this,
            root = this.rootElement;
        if (value && root === this.table) {
            const
                oldRoot = root,
                parent = oldRoot.parentElement
            self.elements.set(self.$table.TABLE, oldRoot);
            root.dataset.mrbrId = self.$table.TABLE;
            self.elements.delete(self.rootElementName);
            root = <HTMLElement>self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, new self.$ctrlPrm()
                .Children(self.elements.get(self.$table.TABLE))
            ));
            self.mount(parent)
        }
        (root) && (this.classes(root, this.$clsActions.replace, [this.responsiveSize, value]));
        this._responsiveSize = value;
    }

    /**
     * Initialise the control, load the manifest and set the default configuration
     * @date 29/12/2022 - 15:18:36
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Content_Table>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Content_Table> {
        const
            self = this,
            table = self.$table,
            controlName = table[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Content_Table>(`${controlName}:initialise`);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(table);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.table, self.elementConfig.getConfig(table.TABLE)));
                self.responsiveSize = self.responsiveSize;
                initialisePromise.resolve(self);
            })
            .catch(async _ => {
                initialisePromise.reject(self);
            });
        return initialisePromise;
    }

    /**
     * Set the default configuration
     * @date 29/12/2022 - 15:19:27
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Content_Table>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Content_Table> {
        const
            self = this,
            controlName = self.$table[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Content_Table>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig(args)
            .then(async _ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$table.TABLE, new self.$ctrlPrm()
                        .Classes("table")
                    );
                setDefaultConfigPromise.resolve(self);
            })
            .catch(async _ => setDefaultConfigPromise.reject(self));
        return setDefaultConfigPromise;
    }

    /**
     * Get the table footer element or create it if it doesn't exist
     * @date 29/12/2022 - 15:19:52
     *
     * @public
     * @readonly
     * @type {HTMLTableSectionElement}
     */
    public get header(): HTMLTableSectionElement {
        const
            htmlt = this.$htmlt,
            header = <HTMLTableSectionElement>(this.elements.get(this.$table.TABLE_HEADER) || this.createElement(new this.$ctrlCfg(this.$table.TABLE_HEADER, htmlt.tableHeader))),
            table = this.table,
            selectors = [htmlt.tableCaption, htmlt.tableColGroup];
        if (table && !table.contains(header)) {
            let selectedElement: Element;
            selectors.forEach(selector => {
                let _selected = table.querySelector(selector);
                (_selected) && (selectedElement = _selected);
            });
            if (selectedElement) { selectedElement?.after(header); }
            else { table.prepend(header); }
        }
        return header;
    }

    /**
     * Get the table body element or create it if it doesn't exist
     * @date 29/12/2022 - 15:24:02
     *
     * @public
     * @readonly
     * @type {HTMLTableSectionElement}
     */
    public get body(): HTMLTableSectionElement {
        const
            body = <HTMLTableSectionElement>(this.elements.get(this.$table.TABLE_BODY) || this.createElement(new this.$ctrlCfg(this.$table.TABLE_BODY, this.$htmlt.tableBody))),
            table = this.table;
        if (table && !table.contains(body)) {
            let selectedElement: Element = table.querySelector(this.$htmlt.tableFooter);
            if (selectedElement) { table.insertBefore(body, selectedElement); }
            else { table.appendChild(body); }
        }
        return body;
    }

    /**
     * Get the table footer element or create it if it doesn't exist
     * @date 29/12/2022 - 15:26:13
     *
     * @public
     * @readonly
     * @type {HTMLTableSectionElement}
     */
    public get footer(): HTMLTableSectionElement {
        const
            footer = <HTMLTableSectionElement>(this.elements.get(this.$table.TABLE_FOOTER) || this.createElement(new this.$ctrlCfg(this.$table.TABLE_FOOTER, this.$htmlt.tableFooter))),
            table = this.table;
        (table && !table.contains(footer)) && (table.appendChild(footer))
        return footer;

    }

    /**
     * Get the table caption element or create it if it doesn't exist
     * @date 29/12/2022 - 15:26:57
     *
     * @public
     * @readonly
     * @type {HTMLTableCaptionElement}
     */
    public get caption(): HTMLTableCaptionElement {
        const
            caption = <HTMLTableCaptionElement>(this.elements.get(this.$table.TABLE_CAPTION) || this.createElement(new this.$ctrlCfg(this.$table.TABLE_CAPTION, this.$htmlt.tableCaption))),
            table = this.table;
        (table && !table.contains(caption)) && (table.prepend(caption));
        return caption;
    }

    /**
     * Get the table colgroup element or create it if it doesn't exist
     * @date 29/12/2022 - 15:27:08
     *
     * @public
     * @readonly
     * @type {HTMLTableColElement}
     */
    public get colGroup(): HTMLTableColElement {
        const
            colGroup = <HTMLTableColElement>(this.elements.get(this.$table.TABLE_COLGROUP) || this.createElement(new this.$ctrlCfg(this.$table.TABLE_COLGROUP, this.$htmlt.tableColGroup))),
            table = this.table;
        if (table && !table.contains(colGroup)) {
            let selectedElement: Element = table.querySelector(this.$htmlt.tableCaption);
            if (selectedElement) { selectedElement.after(colGroup); }
            else { table.prepend(colGroup); }
        }
        return colGroup;
    }
    
    /**
     * Set the caption text, show the caption, fluent interface 
     * @date 29/12/2022 - 15:27:38
     *
     * @public
     * @param {string} caption
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public CaptionText(caption: string): Mrbr_UI_Bootstrap_Content_Table {
        this.captionText = caption;
        return this;
    }
    
    /**
     * Set the table context, fluent interface
     * @date 29/12/2022 - 15:28:07
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Content_TableContextClasses} context
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public Context(context: Mrbr_UI_Bootstrap_Content_TableContextClasses): Mrbr_UI_Bootstrap_Content_Table {
        this.context = context;
        return this;
    }
    
    /**
     * Set the table border, fluent interface
     * @date 29/12/2022 - 15:28:15
     *
     * @public
     * @param {boolean} showHeader
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public ShowHeader(showHeader: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.showHeader = showHeader;
        return this;
    }
    
    /**
     * Set the table border, fluent interface
     * @date 29/12/2022 - 15:28:23
     *
     * @public
     * @param {boolean} showFooter
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public ShowFooter(showFooter: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.showFooter = showFooter;
        return this;
    }
    
    /**
     * Show the table caption, fluent interface
     * @date 29/12/2022 - 15:28:30
     *
     * @public
     * @param {boolean} showCaption
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public ShowCaption(showCaption: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.showCaption = showCaption;
        return this;
    }
    
    /**
     * Set Striped rows, fluent interface
     * @date 29/12/2022 - 15:28:44
     *
     * @public
     * @param {boolean} stripedRows
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public StripedRows(stripedRows: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.stripedRows = stripedRows;
        return this;
    }
    
    /**
     * Set Striped columns, fluent interface
     * @date 29/12/2022 - 15:28:51
     *
     * @public
     * @param {boolean} stripedColumns
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public StripedColumns(stripedColumns: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.stripedColumns = stripedColumns;
        return this;
    }
    
    /**
     * Set Hoverable style, fluent interface
     * @date 29/12/2022 - 15:29:18
     *
     * @public
     * @param {boolean} hoverable
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public Hoverable(hoverable: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.hoverable = hoverable;
        return this;
    }
    
    /**
     * Set Dark theme, fluent interface
     * @date 29/12/2022 - 15:29:28
     *
     * @public
     * @param {boolean} darkTheme
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public DarkTheme(darkTheme: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.darkTheme = darkTheme;
        return this;
    }
    
    /**
     * Set the table border, fluent interface
     * @date 29/12/2022 - 15:30:02
     *
     * @public
     * @param {boolean} bordered
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public Bordered(bordered: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.bordered = bordered;
        return this;
    }
    
    /**
     * Set the table border, fluent interface
     * @date 29/12/2022 - 15:30:14
     *
     * @public
     * @param {boolean} borderless
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public Borderless(borderless: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.borderless = borderless;
        return this;
    }
    
    /**
     * Set the table to borderless, fluent interface
     * @date 29/12/2022 - 15:30:21
     *
     * @public
     * @param {boolean} small
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public Small(small: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.small = small;
        return this;
    }
    
    /**
     * Set table responsive size, fluent interface
     * @date 29/12/2022 - 15:30:36
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes} size
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public ResponsiveSize(size: Mrbr_UI_Bootstrap_Content_ResponsiveTableSizes): Mrbr_UI_Bootstrap_Content_Table {
        this.responsiveSize = size;
        return this;
    }
    
    /**
     * Set Caption to top, fluent interface
     * @date 29/12/2022 - 15:30:53
     *
     * @public
     * @param {boolean} captionTop
     * @returns {Mrbr_UI_Bootstrap_Content_Table}
     */
    public CaptionTop(captionTop: boolean): Mrbr_UI_Bootstrap_Content_Table {
        this.captionTop = captionTop;
        return this;
    }
    
    /**
     * Get The table element. If the root element is a table, it will return the root element, otherwise it will return the first table element found in the root element. Used for Responsive tables
     * @date 29/12/2022 - 15:31:09
     *
     * @public
     * @readonly
     * @type {HTMLTableElement}
     */
    public get table(): HTMLTableElement {
        const root = this.rootElement;
        return (root instanceof HTMLTableElement) ? root : <HTMLTableElement>root.querySelector(this.$htmlt.table);
    }

}