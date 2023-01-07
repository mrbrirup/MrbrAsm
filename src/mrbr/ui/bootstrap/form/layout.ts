import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Form_BootstrapFormControl } from "./BootstrapFormControl";
import { Mrbr_UI_Bootstrap_Form_LayoutColumn } from "./layoutColumn";
import { Mrbr_UI_Bootstrap_Form_LayoutRow } from "./layoutRow";

/**
 * Create a Bootstrap Layout
 * @date 07/01/2023 - 07:59:35
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_Layout
 * @typedef {Mrbr_UI_Bootstrap_Form_Layout}
 * @extends {Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_Layout>}
 */
export class Mrbr_UI_Bootstrap_Form_Layout extends Mrbr_UI_Bootstrap_Form_BootstrapFormControl<Mrbr_UI_Bootstrap_Form_Layout> {


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
                        .Classes("col"));
                defaultConfigPromise.resolve(self);
            })
            .catch(error => defaultConfigPromise.reject(error));

        return defaultConfigPromise;
    }

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