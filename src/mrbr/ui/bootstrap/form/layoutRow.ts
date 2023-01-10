import { Mrbr_UI_Controls_IRootElement } from "../../controls/IRootElement";
import { Mrbr_UI_HTML_ElementTags } from "../../html/ElementTags";
import { Mrbr_UI_Bootstrap_Form_Layout } from "./layout";
import { Mrbr_UI_Bootstrap_Form_LayoutColumn } from "./layoutColumn";

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
 * Add Columns Result for Bootstrap Layout. Used by Columns for adding multiple rows and columns.
 * @date 07/01/2023 - 08:13:44
 *
 * @typedef {AddColumnsResult}
 */
type AddColumnsResult = {
    rows: Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutRow>;
    row: Mrbr_UI_Bootstrap_Form_LayoutRow;
}

/**
 * Column Parameter Function for Bootstrap Layout. For Column Paramaters when creating columns and returning a function for chaining.
 * @date 07/01/2023 - 08:14:24
 *
 * @typedef {columnParameterFunction}
 */
type columnParameterFunction = (columnParameters?: ColumnParameters) => Function;

/**
 * Layout Row for Bootstrap Layout. Implements IRootElement to allow other controls to use mount function;
 * @date 07/01/2023 - 08:15:05
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_LayoutRow
 * @typedef {Mrbr_UI_Bootstrap_Form_LayoutRow}
 * @implements {Mrbr_UI_Controls_IRootElement}
 */
export class Mrbr_UI_Bootstrap_Form_LayoutRow implements Mrbr_UI_Controls_IRootElement {

    /**
     * Columns for Bootstrap Layout
     * @date 07/01/2023 - 08:16:03
     *
     * @private
     * @type {(Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutColumn>)}
     */
    private _columns: Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutColumn>;

    /**
     * Root Element for Bootstrap Layout Row
     * @date 07/01/2023 - 08:16:14
     *
     * @private
     * @type {HTMLElement}
     */
    private _rootElement: HTMLElement;

    /**
     * ID for Bootstrap Layout Row
     * @date 07/01/2023 - 08:16:30
     *
     * @private
     * @type {(string | number)}
     */
    private _id: string | number;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_LayoutRow.
     * @date 07/01/2023 - 08:16:39
     *
     * @constructor
     * @param {(string | number)} id
     */
    constructor(id: string | number, layout: Mrbr_UI_Bootstrap_Form_Layout) {
        this._id = id;
        this.rootElement.classList.add("row");
        this._layout = layout;
    }

    /**
     * ID for Bootstrap Layout Row
     * @date 07/01/2023 - 08:16:45
     *
     * @public
     * @type {(string | number)}
     */
    public get id(): string | number { return this._id; }

    /**
     * ID for Bootstrap Layout Row
     */
    public set id(value: string | number) { this._id = value; }

    /**
     * Columns for Bootstrap Layout
     * @date 07/01/2023 - 08:17:02
     *
     * @public
     * @type {(Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutColumn>)}
     */
    public get columns(): Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutColumn> { return this._columns ??= new Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutColumn>(); }

    /**
     * Columns for Bootstrap Layout
     */
    public set columns(value: Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutColumn>) { this._columns = value; }

    /**
     * Root Element for Bootstrap Layout Row
     * @date 07/01/2023 - 08:17:14
     *
     * @public
     * @type {HTMLElement}
     */
    public get rootElement(): HTMLElement { return this._rootElement ??= document.createElement(Mrbr_UI_HTML_ElementTags.div); }

    /**
     * Root Element for Bootstrap Layout Row
     */
    public set rootElement(value: HTMLElement) { this._rootElement = value; }


    /**
     * Get the next col id for the layout, check for id as number, e.g. 1, or as string, "col_1", "col1"
     * @date 07/01/2023 - 08:17:30
     *
     * @private
     * @returns {number}
     */
    private nextColumnId(): number {
        const columns = this.columns;
        let columnId = columns.size;
        while ([columnId, `col_${columnId}`, `col${columnId}`].find(columnId => columns.has(columnId))) { columnId++; }
        return columnId;
    }

    /**
     * Layout Parent for the Layout Row
     * @date 07/01/2023 - 08:18:11
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Form_Layout}
     */
    private _layout: Mrbr_UI_Bootstrap_Form_Layout;

    /**
     * Add a row to the layout
     * @date 07/01/2023 - 08:20:44
     *
     * @public
     * @param {?(string | number)} [id]
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public addRow(id?: string | number): Mrbr_UI_Bootstrap_Form_LayoutRow { return this._layout.addRow(id); }

    /**
     * Add a column to the layout using column parameters or a number to create a column with a span of the number
     * @date 07/01/2023 - 08:21:03
     *
     * @public
     * @param {?ColumnParameters} [columnParameters]
     * @returns {columnParameterFunction}
     */
    public CreateColumn(columnParameters?: ColumnParameters): columnParameterFunction;
    
    /**
     * When passing "addNew" as the columnParameter rowId will be used as the new Id for the row
     * @date 07/01/2023 - 08:23:45
     *
     * @public
     * @param {ColumnParameters} columnParameters
     * @param {(number | string)} rowId
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public CreateColumn(columnParameters: ColumnParameters, rowId: number | string): Mrbr_UI_Bootstrap_Form_LayoutRow;
    
    /**
     * Add a column to the layout using column parameters or create a new row
     * @date 07/01/2023 - 08:25:08
     *
     * @public
     * @param {?ColumnParameters} [columnParameters]
     * @param {?(number | string | undefined)} [rowId]
     * @returns {(columnParameterFunction | Mrbr_UI_Bootstrap_Form_LayoutRow)}
     */
    public CreateColumn(columnParameters?: ColumnParameters, rowId?: number | string | undefined): columnParameterFunction | Mrbr_UI_Bootstrap_Form_LayoutRow {
        if (typeof columnParameters === "string" && columnParameters === "addRow") { return this._layout.addRow(rowId); }
        if (typeof columnParameters === "number") { columnParameters = { span: columnParameters }; }
        else if (!columnParameters) { columnParameters = {}; }
        const
            layoutColumn = new Mrbr_UI_Bootstrap_Form_LayoutColumn(columnParameters?.id ?? columnParameters?.i ?? this.nextColumnId()),
            elementId = this._layout.$bsLayout.createId("layoutColumn"),
            element = layoutColumn.rootElement,
            colClass = ["col", (columnParameters?.break ?? columnParameters?.b ?? ""), (columnParameters?.span ?? columnParameters?.s ?? 12)].filter(prm => prm).join("-");
        element.classList.add(colClass);
        element.id = elementId.toString();
        element.dataset.mrbrId = layoutColumn.id.toString();
        this.columns.set(layoutColumn.id, layoutColumn);
        this.rootElement.appendChild(element);
        return this.CreateColumn.bind(this) as columnParameterFunction;
    }
    
    /**
     * Add a LayoutColumn to the layout, fluent interface
     * @date 07/01/2023 - 08:26:30
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Form_LayoutColumn} column
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public AddColumn(column: Mrbr_UI_Bootstrap_Form_LayoutColumn): Mrbr_UI_Bootstrap_Form_LayoutRow {
        this.columns.set(column.id, column);
        this.rootElement.appendChild(column.rootElement);
        return this;
    }
    
    /**
     * Remove a LayoutColumn from the layout, fluent interface
     * @date 07/01/2023 - 08:27:44
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Form_LayoutColumn} column
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public RemoveColumn(column: Mrbr_UI_Bootstrap_Form_LayoutColumn): Mrbr_UI_Bootstrap_Form_LayoutRow {
        column?.rootElement?.remove();
        this.columns.delete(column.id);
        return this;
    }
    
    /**
     * Clear all LayoutColumns from the layout, fluent interface
     * @date 07/01/2023 - 08:27:53
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutRow}
     */
    public ClearColumns(): Mrbr_UI_Bootstrap_Form_LayoutRow {
        const root = this.rootElement;
        this.columns.forEach(column => column.rootElement.remove());
        this.columns.clear();
        return this;
    }
    
    /**
     * Get a LayoutColumn from the layout by id
     * @date 07/01/2023 - 08:28:34
     *
     * @public
     * @param {(string | number)} columnId
     * @returns {Mrbr_UI_Bootstrap_Form_LayoutColumn}
     */
    public column(columnId: string | number): Mrbr_UI_Bootstrap_Form_LayoutColumn {
        return this.columns.get(columnId);
    }
    
    /**
     * Add a collection of columns to the layout using column parameters or a number to create a column with a span of the number
     * @date 07/01/2023 - 08:28:45
     *
     * @public
     * @param {...ColumnParameters[]} args
     * @returns {AddColumnsResult} collection of rows from the starting Row in .rows to the last row added in .row
     */
    public CreateColumns(...args: ColumnParameters[]): AddColumnsResult {
        const
            currentRow: Mrbr_UI_Bootstrap_Form_LayoutRow = this,
            addColumnsResult = { rows: new Map<string | number, Mrbr_UI_Bootstrap_Form_LayoutRow>(), row: currentRow };
        addColumnsResult.rows.set(currentRow.id, currentRow);
        args.forEach(columnParameters => {
            if (typeof columnParameters === "string" && columnParameters === "addRow") {
                const row = this._layout.addRow();
                addColumnsResult.row = row;
                addColumnsResult.rows.set(row.id, row);
            }
            else { addColumnsResult.row.CreateColumn(columnParameters) }
        });
        return addColumnsResult;
    }
}