import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_LayoutColumn } from "./layoutColumn";
import { Mrbr_UI_Bootstrap_Form_LayoutRow } from "./layoutRow";


/**
 * Responsive column breaks for Bootstrap Layout
 * @date 07/01/2023 - 08:11:04
 *
 * @typedef {ColumnBreaks}
 */
type ColumnBreaks = "sm" | "md" | "lg" | "xl" | "xxl" | "auto" | "";

/**
 * Column Parameters for Bootstrap Layout. size or s is the number of columns to span. break or b is the responsive break point. id or is the column ID. addRow will add a new row. A number will add a column with this columns span.
 * @date 07/01/2023 - 08:11:32
 *
 * @typedef {ColumnParameters}
 */
type ColumnParameters = "addRow" | number | {
    id?: string | number;
    break?: ColumnBreaks;
    span?: number;
    i?: string | number;
    b?: ColumnBreaks;
    s?: number;
}


/**
 * Responsive row breaks for Horizontal Bootstrap Layout
 * @date 10/01/2023 - 22:18:02
 *
 * @typedef {horizontalResponsiveSizes}
 */
type horizontalResponsiveSizes = "sm" | "md" | "lg" | "xl" | "";

/**
 * Responsive row breaks Inline for Bootstrap Layout
 * @date 10/01/2023 - 22:18:18
 *
 * @typedef {inlineResponsiveSizes}
 */
type inlineResponsiveSizes = "sm" | "md" | "lg" | "xl";


/**
 * Layout Gutter Sizes for Bootstrap Layout
 * @date 10/01/2023 - 23:31:45
 *
 * @typedef {gutterSizes}
 */
type gutterSizes = 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Inline Span Sizes for Bootstrap Inline Layout
 * @date 10/01/2023 - 22:19:21
 *
 * @typedef {inlineSpanSizes}
 */
type inlineSpanSizes = "auto" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12";


/**
 * Create a Bootstrap Layout
 * @date 07/01/2023 - 07:59:35
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_Layout
 * @typedef {Mrbr_UI_Bootstrap_Form_Layout}
 * @extends {Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_Layout>}
 */
export class Mrbr_UI_Bootstrap_Form_Layout extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl {


    /**
     * Internal Layout Name
     * @date 07/01/2023 - 07:59:53
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LAYOUT: string = "layout";

    /**
     * Internal Layout Row Name
     * @date 07/01/2023 - 08:00:04
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LAYOUT_ROW: string = "layout_row";

    /**
     * Internal Layout Column Name
     * @date 07/01/2023 - 08:00:15
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LAYOUT_COLUMN: string = "layout_column";


    /**
     * Internal Layout Control Wrapper 
     * @date 10/01/2023 - 05:58:04
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LAYOUT_FORMCONTROL_WRAPPER: string = "form_control_wrapper";

    /**
     * Internal Layout Horizontal Label
     * @date 10/01/2023 - 07:17:08
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LAYOUT_HORIZONTAL_LABEL: string = "horizontal_label";

    /**
     * Layout Type Alias
     * @date 07/01/2023 - 08:00:31
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_Layout}
     */
    public get $bsLayout(): typeof Mrbr_UI_Bootstrap_Form_Layout { return this.$bsForm.Layout as typeof Mrbr_UI_Bootstrap_Form_Layout; }

    /**
     * Layout Row Type Alias
     * @date 07/01/2023 - 08:01:42
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public get $bsLayoutRow(): typeof Mrbr_UI_Bootstrap_Form_LayoutRow { return this.$bsForm.LayoutRow as typeof Mrbr_UI_Bootstrap_Form_LayoutRow; }

    /**
     * Layout Column Type Alias
     * @date 07/01/2023 - 08:01:48
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Form_LayoutColumn}
     */
    public get $bsLayoutColumn(): typeof Mrbr_UI_Bootstrap_Form_LayoutColumn { return this.$bsForm.LayoutColumn as typeof Mrbr_UI_Bootstrap_Form_LayoutColumn; }


    /**
     * Layout Rows Map
     * @date 07/01/2023 - 08:01:54
     *
     * @private
     * @type {(Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutRow>)}
     */
    private _rows: Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutRow>;



    /**
     * Layout is Horizontal
     * @date 10/01/2023 - 08:16:10
     *
     * @private
     * @type {boolean}
     */
    private _horizontal: boolean = false;

    /**
     * Layout is Horizontal
     * @date 10/01/2023 - 08:16:22
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get horizontal(): boolean { return this._horizontal; }


    /**
     * Layout Horizontal Label Size, 1-12. Label Size and Control Size must add up to 12
     * @date 10/01/2023 - 08:16:29
     *
     * @private
     * @type {number}
     */
    private _horizontalLabelSize: number = 0;

    /**
     * Layout Horizontal Label Size, 1-12. Label Size and Control Size must add up to 12
     * @date 10/01/2023 - 08:16:43
     *
     * @public
     * @type {number}
     */
    public get horizontalLabelSize(): number { return this._horizontalLabelSize; }

    /**
     * Layout Horizontal Label Size, 1-12. Label Size and Control Size must add up to 12
     */
    public set horizontalLabelSize(value: number) { this._horizontalLabelSize = value; this.horizontalLayoutChanged = true; }


    /**
     * Layout Horizontal Control Size, 1-12. Label Size and Control Size must add up to 12
     * @date 10/01/2023 - 08:16:56
     *
     * @private
     * @type {number}
     */
    private _horizontalControlSize: number = 0;

    /**
     * Layout Horizontal Control Size, 1-12. Label Size and Control Size must add up to 12
     * @date 10/01/2023 - 08:17:33
     *
     * @public
     * @type {number}
     */
    public get horizontalControlSize(): number { return this._horizontalControlSize; }

    /**
     * Layout Horizontal Control Size, 1-12. Label Size and Control Size must add up to 12
     */
    public set horizontalControlSize(value: number) { this._horizontalControlSize = value; this.horizontalLayoutChanged = true; }

    /**
     * Layout Horizontal Responsive Size
     * @date 10/01/2023 - 08:17:50
     *
     * @private
     * @type {horizontalResponsiveSizes}
     */
    private _horizontalResponsiveSize: horizontalResponsiveSizes;
    public get horizontalResponsiveSize(): horizontalResponsiveSizes { return this._horizontalResponsiveSize ?? "" }

    /**
     * Layout Horizontal Responsive Size
     * @date 10/01/2023 - 08:17:58
     *
     * @public
     * @type {horizontalResponsiveSizes}
     */
    public set horizontalResponsiveSize(value: horizontalResponsiveSizes) { this._horizontalResponsiveSize = value; this.horizontalLayoutChanged = true; }
    /**
     * Set all Horizontal Layout Properties
     * @date 10/01/2023 - 08:18:00
     * 
     * @param labelSize 
     * @param controlSize 
     * @param responsiveSize 
     * @returns 
     */
    public HorizontalLayout(labelSize: number, controlSize: number, responsiveSize: horizontalResponsiveSizes): this {
        this.horizontalLabelSize = labelSize;
        this.horizontalControlSize = controlSize;
        this.horizontalResponsiveSize = responsiveSize;
        this._horizontal = true;
        return this;
    }

    /**
     * Layout Label Column Class
     * @date 10/01/2023 - 08:18:43
     *
     * @private
     * @type {string}
     */
    private layoutLabelColumnClass: string;

    /**
     * Layout Label Form Class
     * @date 10/01/2023 - 08:18:54
     *
     * @private
     * @type {string}
     */
    private layoutLabelFormClass: string;

    /**
     * Layout Control Class
     * @date 10/01/2023 - 08:19:02
     *
     * @private
     * @type {string}
     */
    private layoutControlClass: string;

    /**
     * Apply Horizontal Layout to Control, fluent interface
     * @date 10/01/2023 - 08:19:37
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Form_BootstrapFormControl<any>} control
     * @returns {this}
     */
    public ApplyHorizontalLayout(control: Mrbr_UI_Bootstrap_Form_BootstrapFormControl): this {
        let
            labelColumnClass,
            labelFormClass,
            controlClass,
            currentLayoutControlClass = this.layoutControlClass,
            currentLayoutLabelColumnClass = this.layoutLabelColumnClass,
            currentLayoutLabelFormClass = this.layoutLabelFormClass;
        if (this.horizontalLayoutChanged) {
            let
                labelSize = this.horizontalLabelSize,
                controlSize = this.horizontalControlSize,
                responsiveSize = this.horizontalResponsiveSize;
            if (!labelSize || !controlSize) {
                (!labelSize && !controlSize) && (labelSize = 2, controlSize = 10);
                (!labelSize && controlSize) && (labelSize = 12 - controlSize);
                (!controlSize && labelSize) && (controlSize = 12 - labelSize);
            }
            (labelSize + controlSize > 12) && (labelSize = 2, controlSize = 10);
            labelColumnClass = ["col", responsiveSize, labelSize].filter(entry => entry).join("-");
            labelFormClass = ["col-form-label", responsiveSize].filter(entry => entry).join("-");
            controlClass = ["col", responsiveSize, controlSize].filter(entry => entry).join("-");
        }
        else {
            labelColumnClass = this.layoutLabelColumnClass;
            labelFormClass = this.layoutLabelFormClass;
            controlClass = this.layoutControlClass;
        }

        const
            labelElement = control.labelElement,
            inputElement = control.inputElement,
            controlRootElement = control.rootElement;
        let controlWrapperElement = control.elements.get(this.$bsLayout.LAYOUT_FORMCONTROL_WRAPPER);
        if (controlRootElement && inputElement) {
            (!controlWrapperElement) && (controlWrapperElement = <HTMLElement>control.createElement(new this.$ctrlCfg(this.$bsLayout.LAYOUT_FORMCONTROL_WRAPPER, this.$htmlt.div)));
            inputElement.before(controlWrapperElement);
        }
        inputElement && controlWrapperElement && (this.wrapElement(inputElement, controlWrapperElement));
        if (labelElement) {
            control.classes(labelElement, this.$clsActions.replace, [currentLayoutLabelColumnClass, labelColumnClass]);
            control.classes(labelElement, this.$clsActions.replace, [currentLayoutLabelFormClass, labelFormClass]);
        }
        control.rootClasses(this.$clsActions.add, "row");
        controlWrapperElement && control.classes(controlWrapperElement, this.$clsActions.replace, [currentLayoutControlClass, controlClass]);
        this.layoutLabelColumnClass = labelColumnClass;
        this.layoutLabelFormClass = labelFormClass;
        this.layoutControlClass = controlClass;
        this.horizontalLayoutChanged = false;
        return this;
    }

    /**
     * Horizontal Layout Changed, used to determine if the layout needs to be recalculated
     * @date 10/01/2023 - 08:27:20
     *
     * @private
     * @type {boolean}
     */
    private horizontalLayoutChanged: boolean = false;

    /**
     * Apply Horizontal Layout to All Controls. Control must be an instance of Mrbr_UI_Bootstrap_Form_BootstrapFormControl, fluent interface.
     * set using this.controls.set(controlKey, controlValue)
     * @date 10/01/2023 - 08:19:48
     *
     * @public
     * @returns {this}
     */
    public ApplyHorizontalLayouts(): this {
        this.controls.forEach(control => (control instanceof this.$bsFormControl) && (this.ApplyHorizontalLayout(<Mrbr_UI_Bootstrap_Form_BootstrapFormControl>control)));
        return this;
    }

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_Layout.
     * @date 07/01/2023 - 08:02:08
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
    }


    /**
     * Initialise the Layout, load the manifest and set the default config
     * @date 07/01/2023 - 08:02:48
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            controlName = args?.find((arg) => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsLayout[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}.initialise`);
        super
            .initialise([{ controlName }, ...args].flat())
            .then(async _ => {
                await self.loadManifest(self.$bsLayout);
                await self.setDefaultConfig({ controlName });
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, self.elementConfig.get(self.$bsLayout.LAYOUT)));
                self.setProperties();
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error));
        return initialisePromise
    }

    /**
     * Set the default config for the Layout
     * @date 07/01/2023 - 08:04:26
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<this>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<this> {
        const
            self = this,
            ctrlPrm = self.$ctrlPrm,
            bsLayout = self.$bsLayout,
            controlName = args?.find((arg) => typeof arg === "object" && arg?.controlName)?.controlName ?? bsLayout[self.$mrbr.COMPONENT_NAME],
            defaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig({ controlName })
            .then(async _ => {
                self
                    .elementConfig
                    .controlName(controlName)
                    .setIfNotExist(bsLayout.LAYOUT, new ctrlPrm())
                    .setIfNotExist(bsLayout.LAYOUT_ROW, new ctrlPrm()
                        .Classes("row"))
                    .setIfNotExist(bsLayout.LAYOUT_COLUMN, new ctrlPrm()
                        .Classes("col"))
                    .setIfNotExist(bsLayout.LAYOUT_HORIZONTAL_LABEL, new ctrlPrm()
                        .Classes("col-form-label"))
                defaultConfigPromise.resolve(self);
            })
            .catch(error => defaultConfigPromise.reject(error));

        return defaultConfigPromise;
    }

    /**
     * Layout Rows Map
     * @date 07/01/2023 - 08:02:13
     *
     * @public
     * @type {(Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutRow>)}
     */
    public get rows(): Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutRow> { return this._rows ??= new Map<string, Mrbr_UI_Bootstrap_Form_LayoutRow>(); }

    /**
     * Layout Rows Map
     */
    public set rows(value: Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutRow>) { this._rows = value; }

    /**
     * Get the next row id for the layout, check for id as number, e.g. 1, or as string, "row_1", "row1"
     * @date 07/01/2023 - 08:06:01
     *
     * @private
     * @returns {number}
     */
    private nextRowId(): number {
        const rows = this.rows;
        let rowId = rows.size;
        while ([rowId, `row_${rowId}`, `row${rowId}`].find(rowId => rows.has(rowId))) { rowId++; }
        return rowId;
    }

    /**
     * Add a row to the layout
     * @date 07/01/2023 - 08:07:00
     *
     * @public
     * @param {?(string | number)} [id]
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public addRow(id?: string | number): Mrbr_UI_Bootstrap_Form_LayoutRow {
        id = id ?? this.nextRowId();
        const
            self = this,
            root = self.rootElement;
        let row = self.rows.get(id),
            rowRootElement: HTMLElement = row?.rootElement;
        if (!row) {
            const rowElementId = self.$bsLayout.createId("layoutColumn");
            row = new this.$bsLayoutRow(id, this);
            rowRootElement = row.rootElement;
            rowRootElement.id = rowElementId;
            rowRootElement.dataset.mrbrId = id.toString();
            self.rows.set(id, row);
            self.assignElementConfig(rowRootElement, self.elementConfig.get(self.$bsLayout.LAYOUT_ROW));
        }
        root && rowRootElement.parentElement !== root && root.appendChild(rowRootElement);
        return row;
    }


    /**
     * Add an Inline Style row to the layout. This is a row with columns that are responsive to the screen size. The columns are inline with fixed size of col-12.
     * @date 10/01/2023 - 23:36:33
     *
     * @public
     * @param {inlineResponsiveSizes} responsiveSize
     * @param {inlineSpanSizes} spanSize
     * @param {number} [columnCount=1]
     * @param {gutterSizes} [gutterSize=3]
     * @param {?(string | number)} [id]
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public addInlineRow(responsiveSize: inlineResponsiveSizes, spanSize: inlineSpanSizes, columnCount: number = 1, gutterSize: gutterSizes = 3, id?: string | number): Mrbr_UI_Bootstrap_Form_LayoutRow {
        const
            row = this.addRow(id),
            responsiveRowClass = ["row-cols", responsiveSize, spanSize].filter(entry => entry).join("-");
        this.classes(row, this.$clsActions.add, [responsiveRowClass, `g-${gutterSize}`]);
        for (let columnCounter = 0; columnCounter < columnCount; columnCounter++) { row.CreateColumn(); }
        return row;
    }

    /**
     * Create a grid of rows and with identical columns
     * @date 10/01/2023 - 09:15:53
     *
     * @public
     * @param {number} rows
     * @param {ColumnParameters[]} columns
     * @returns {Array<Mrbr_UI_Bootstrap_Form_LayoutRow>}
     */
    public createGrid(rows: number, columns: ColumnParameters[]): Array<Mrbr_UI_Bootstrap_Form_LayoutRow> {
        const addRowResult = Array<Mrbr_UI_Bootstrap_Form_LayoutRow>();
        for (let rowCounter: number = 0; rowCounter < rows; rowCounter++) {
            const row = this.addRow();
            addRowResult.push(row);
            for (let columnCounter: number = 0; columnCounter < columns.length; columnCounter++) {
                row.CreateColumn(columns[columnCounter]);
            }
        }
        return addRowResult;
    }

    /**
     * Remove a row from the layout
     * @date 07/01/2023 - 08:07:58
     *
     * @public
     * @param {(string | number)} id
     * @returns {Mrbr_UI_Bootstrap_Form_Layout}
     */
    public removeRow(id: string | number): Mrbr_UI_Bootstrap_Form_Layout {
        const row = this.rows.get(id);
        row?.rootElement?.remove();
        this.rows.delete(id);
        return this;
    }

    /**
     * Get a row from the layout by id
     * @date 07/01/2023 - 08:08:11
     *
     * @public
     * @param {(string | number)} id
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public row(id: string | number): Mrbr_UI_Bootstrap_Form_LayoutRow { return this.rows.get(id); }


    /**
     * Get a cell from the layout by rowId and columnId
     * @date 07/01/2023 - 08:08:27
     *
     * @public
     * @param {(string | number)} rowId
     * @param {(string | number)} columnId
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutColumn}
     */
    public cell(rowId: string | number, columnId: string | number): Mrbr_UI_Bootstrap_Form_LayoutColumn { return this.row(rowId)?.column(columnId); }

    /**
     * Get the root element of a cell from the layout by rowId and columnId
     * @date 07/01/2023 - 08:08:40
     *
     * @public
     * @param {(string | number)} rowId
     * @param {(string | number)} columnId
     * @returns {HTMLElement}
     */
    public cellElement(rowId: string | number, columnId: string | number): HTMLElement { return this.cell(rowId, columnId)?.rootElement; }

    /**
     * Set the properties of the layout
     * @date 07/01/2023 - 08:08:53
     *
     * @public
     */
    public setProperties(): void {
        super.setProperties();
        this.addAllRows();
    }

    /**
     * Add all rows to the layout
     * @date 07/01/2023 - 08:09:01
     *
     * @public
     */
    public addAllRows() { this.rows.forEach((row) => { this.addRow(row.id); }) }


}