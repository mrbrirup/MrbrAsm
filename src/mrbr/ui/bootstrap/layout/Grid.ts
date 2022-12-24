import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "../controls/BootstrapControl";
import { Mrbr_UI_Bootstrap_Layout_GridColumn } from "./GridColumn";
import { Mrbr_UI_Bootstrap_Layout_GridColumnSizes } from "./GridColumnSizes";
import { Mrbr_UI_Bootstrap_Layout_GridRowAlignItems } from "./GridRowAlignItems";
import { Mrbr_UI_Bootstrap_Layout_GridRowJustifications } from "./GridRowJustifications";
import { Mrbr_UI_Bootstrap_Layout_GridRowSizes } from "./GridRowSizes";
import { Mrbr_UI_Bootstrap_Layout_Gutters } from "./Gutters";

/**
 * Bootstrap Layout.Grid Class
 * @date 24/12/2022 - 17:12:45
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Layout_Grid
 * @typedef {Mrbr_UI_Bootstrap_Layout_Grid}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Layout_Grid extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Internal Grid Row Name
     * @date 24/12/2022 - 17:08:56
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly GRID_ROW: string = "Mrbr_UI_Bootstrap_Layout_Grid_Row";

    /**
     * GridColumns Collection field
     * @date 24/12/2022 - 17:09:12
     *
     * @private
     * @type {Map<string, Mrbr_UI_Bootstrap_Layout_GridColumn>}
     */
    private _columns: Map<string, Mrbr_UI_Bootstrap_Layout_GridColumn>;

    /**
     * GridRowSize field
     * @date 24/12/2022 - 17:09:28
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Layout_GridRowSizes}
     */
    private _gridRowSize: Mrbr_UI_Bootstrap_Layout_GridRowSizes;


    /**
     * GridRowAlignItems, Align All Items in a Row field
     * @date 24/12/2022 - 19:50:43
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Layout_GridRowAlignItems}
     */
    private _rowAlignItems: Mrbr_UI_Bootstrap_Layout_GridRowAlignItems;

    /**
     * GridRowJustifications, Justify All Items in a Row field
     * @date 24/12/2022 - 19:59:22
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Layout_GridRowJustifications}
     */
    private _gridRowJustifications: Mrbr_UI_Bootstrap_Layout_GridRowJustifications;


    /**
     * Bootstrap Layout Namespace Alias
     * @date 24/12/2022 - 17:11:21
     *
     * @public
     * @readonly
     * @type {*}
     */
    public get $bootstrapLayout(): any { return this[Symbol.for("Mrbr.UI.Bootstrap.Layout")] ??= this.$mrbrInstance.host["Mrbr"].UI.Bootstrap.Layout; }


    /**
     * Row Justifications Enum Alias
     * @date 24/12/2022 - 21:12:19
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Layout_GridRowJustifications}
     */
    public get $rowJustifications(): typeof Mrbr_UI_Bootstrap_Layout_GridRowJustifications { return this.$bootstrapLayout.GridRowJustifications as typeof Mrbr_UI_Bootstrap_Layout_GridRowJustifications; }

    /**
     * GridRowAlignItems Enum Alias
     * @date 24/12/2022 - 19:54:10
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Layout_GridRowAlignItems}
     */
    public get $rowAlignItems(): typeof Mrbr_UI_Bootstrap_Layout_GridRowAlignItems { return this.$bootstrapLayout.GridRowAlignItems as typeof Mrbr_UI_Bootstrap_Layout_GridRowAlignItems; }

    /**
     * Gird Type Alias
     * @date 24/12/2022 - 17:11:52
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Layout_Grid}
     */
    public get $grid(): typeof Mrbr_UI_Bootstrap_Layout_Grid { return this.$bootstrapLayout.Grid as typeof Mrbr_UI_Bootstrap_Layout_Grid; }

    /**
     * GridRowSize Enum Alias
     * @date 24/12/2022 - 17:12:11
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Layout_GridRowSizes}
     */
    public get $gridRowSizes(): typeof Mrbr_UI_Bootstrap_Layout_GridRowSizes { return this.$bootstrapLayout.GridRowSizes as typeof Mrbr_UI_Bootstrap_Layout_GridRowSizes; }

    /**
     * GridColumnSize Enum Alias
     * @date 24/12/2022 - 17:12:27
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Layout_GridColumnSizes}
     */
    public get $gridColumnSizes(): typeof Mrbr_UI_Bootstrap_Layout_GridColumnSizes { return this.$bootstrapLayout.GridColumnSizes as typeof Mrbr_UI_Bootstrap_Layout_GridColumnSizes; }

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Layout_Grid.
     * @date 24/12/2022 - 17:12:36
     *
     * @constructor
     * @param {?string} [rootElementName]
     * @param {?Mrbr_UI_Bootstrap_Layout_GridRowSizes} [gridRowSize]
     */


    /**
     * Gutter Enum Alias
     * @date 24/12/2022 - 21:11:32
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Layout_Gutters}
     */
    public get $gutters(): typeof Mrbr_UI_Bootstrap_Layout_Gutters { return this.$bootstrapLayout.Gutters as typeof Mrbr_UI_Bootstrap_Layout_Gutters; }

    constructor(rootElementName?: string, gridRowSize?: Mrbr_UI_Bootstrap_Layout_GridRowSizes) {
        super(rootElementName);
        this.gridRowSize = gridRowSize;
    }



    private _gutters: Array<Mrbr_UI_Bootstrap_Layout_Gutters>;
    public get gutters(): Array<Mrbr_UI_Bootstrap_Layout_Gutters> {
        return this._gutters ??= new Array<Mrbr_UI_Bootstrap_Layout_Gutters>();
    }
    public set gutters(value: Mrbr_UI_Bootstrap_Layout_Gutters | Array<Mrbr_UI_Bootstrap_Layout_Gutters>) {
        const root = this.rootElement;
        if(root)    {
            this.classes(root, this.$clsActions.remove, this.gutters);
            this.classes(root, this.$clsActions.add, value);
        }
        this._gutters = [value].flat();
    }


    /**
     * GridRowAlignItems, Align All Items in a Row field
     * @date 24/12/2022 - 19:54:29
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Layout_GridRowAlignItems}
     */
    public get rowAlignItems(): Mrbr_UI_Bootstrap_Layout_GridRowAlignItems {
        return this._rowAlignItems ??= this.$rowAlignItems.default;
    }

    /**
     * GridRowAlignItems, Align All Items in a Row field
     */
    public set rowAlignItems(value: Mrbr_UI_Bootstrap_Layout_GridRowAlignItems) {
        const root = this.rootElement;
        root && this.classes(root, this.$clsActions.replace, [this.rowAlignItems, value]);
        this._rowAlignItems = value;
    }

    /**
     * GridRowJustifications, Justify All Items in a Row property
     * @date 24/12/2022 - 20:00:55
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Layout_GridRowJustifications}
     */
    public get gridRowJustifications(): Mrbr_UI_Bootstrap_Layout_GridRowJustifications {
        return this._gridRowJustifications ??= this.$rowJustifications.default;
    }

    /**
     * GridRowJustifications, Justify All Items in a Row property
     */
    public set gridRowJustifications(value: Mrbr_UI_Bootstrap_Layout_GridRowJustifications) {
        const root = this.rootElement;
        root && this.classes(root, this.$clsActions.replace, [this.gridRowJustifications, value]);
        this._gridRowJustifications = value;
    }


    /**
     * GridRowSize Property
     * @date 24/12/2022 - 17:13:04
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Layout_GridRowSizes}
     */
    public get gridRowSize(): Mrbr_UI_Bootstrap_Layout_GridRowSizes { return this._gridRowSize ??= Mrbr_UI_Bootstrap_Layout_GridRowSizes.default; }

    /**
     * GridRowSize Property
     */
    public set gridRowSize(value: Mrbr_UI_Bootstrap_Layout_GridRowSizes) {
        const root = this.rootElement;
        root && (this.classes(root, this.$clsActions.replace, [this.gridRowSize, value]))
        this._gridRowSize = value;
    }

    /**
     * GridColumns Property
     * @date 24/12/2022 - 17:13:23
     *
     * @public
     * @readonly
     * @type {Map<string, Mrbr_UI_Bootstrap_Layout_GridColumn>}
     */
    public get gridColumns(): Map<string, Mrbr_UI_Bootstrap_Layout_GridColumn> { return this._columns ??= new Map<string, Mrbr_UI_Bootstrap_Layout_GridColumn>(); }

    /**
     * Initialises the Grid, load manifest and sets default config
     * @date 24/12/2022 - 17:13:31
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Layout_Grid>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Layout_Grid> {
        const
            self = this,
            controlName = self.$grid[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super
            .initialise(...args)
            .then(async _ => {
                await self.loadManifest(self.$grid);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, self.elementConfig.getConfig(self.$grid.GRID_ROW)));
                self.defaultContainerElementName = self.rootElementName;
                self.gridRowSize = self.gridRowSize;
                self.gridColumns.forEach((column, name) => (column.element.parentElement !== self.rootElement) && (self.rootElement.appendChild(column.element)))
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error))

        return initialisePromise;
    }

    /**
     * Sets the default config for the Grid
     * @date 24/12/2022 - 17:14:50
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Layout_Grid>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Layout_Grid> {
        const
            self = this,
            controlName = self.$grid[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(async _ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$grid.GRID_ROW, new self.$ctrlPrm()
                        .Classes("row"))
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;
    }

    /**
     * Adds a column to the Grid
     * @date 24/12/2022 - 17:14:59
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Layout_GridColumn} gridColumn
     * @returns {string}
     */
    public addColumn(gridColumn: Mrbr_UI_Bootstrap_Layout_GridColumn): string {
        const
            self = this,
            root = self.rootElement;
        self.gridColumns.set(gridColumn.name, gridColumn);
        root && root.appendChild(gridColumn.element);
        return gridColumn.name;
    }

    /**
     * Removes a column from the Grid
     * @date 24/12/2022 - 17:15:11
     *
     * @public
     * @param {(string | Mrbr_UI_Bootstrap_Layout_GridColumn)} column
     * @returns {this}
     */
    public removeColumn(column: string | Mrbr_UI_Bootstrap_Layout_GridColumn): this {
        const
            self = this,
            root = self.rootElement,
            gridColumn = (typeof column === "string") ? self.gridColumns.get(column) : column;
        if (root && gridColumn) {
            gridColumn.element.remove();
            self.gridColumns.delete(gridColumn.name);
        }
        return self;
    }

    /**
     * Adds columns to the Grid
     * @date 24/12/2022 - 17:15:19
     *
     * @public
     * @param {...Mrbr_UI_Bootstrap_Layout_GridColumn[]} gridColumns
     * @returns {string[]}
     */
    public addColumns(...gridColumns: Mrbr_UI_Bootstrap_Layout_GridColumn[]): string[] {
        return gridColumns.map(gridColumn => this.addColumn(gridColumn));
    }


    /**
     * Get Column by name
     * @date 24/12/2022 - 17:16:27
     *
     * @public
     * @param {string} columnName
     * @returns {Mrbr_UI_Bootstrap_Layout_GridColumn}
     */
    public column(columnName: string): Mrbr_UI_Bootstrap_Layout_GridColumn {
        return this.gridColumns.get(columnName);
    }

    /**
     * Get Column Element by name
     * @date 24/12/2022 - 17:16:45
     *
     * @public
     * @param {string} columnName
     * @returns {HTMLElement}
     */
    public columnElement(columnName: string): HTMLElement {
        return this.gridColumns.get(columnName)?.element;
    }
}