import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_UI_Bootstrap_Layout_GridColumnAlignments } from "./GridColumnAlignments";
import { Mrbr_UI_Bootstrap_Layout_GridColumnOffsets } from "./GridColumnOffsets";
import { Mrbr_UI_Bootstrap_Layout_GridColumnOrders } from "./GridColumnOrders";
import { Mrbr_UI_Bootstrap_Layout_GridColumnSizes } from "./GridColumnSizes";

/**
 * Grid Column Class
 * @date 24/12/2022 - 17:17:32
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Layout_GridColumn
 * @typedef {Mrbr_UI_Bootstrap_Layout_GridColumn}
 */
export class Mrbr_UI_Bootstrap_Layout_GridColumn {


    /**
         * Bootstrap Layout Namespace Alias
         * @date 24/12/2022 - 17:11:21
         *
         * @public
         * @readonly
         * @type {*} MrbrBase.Namespace
    */
    public get $bootstrapLayout(): any { return this[Symbol.for("Mrbr.UI.Bootstrap.Layout")] ??= MrbrBase.mrbrInstance.host["Mrbr"].UI.Bootstrap.Layout; }


    public get $columnSizes(): typeof Mrbr_UI_Bootstrap_Layout_GridColumnSizes { return this.$bootstrapLayout.GridColumnSizes as typeof Mrbr_UI_Bootstrap_Layout_GridColumnSizes }
    public get $columnAlignments(): typeof Mrbr_UI_Bootstrap_Layout_GridColumnAlignments { return this.$bootstrapLayout.GridColumnAlignments as typeof Mrbr_UI_Bootstrap_Layout_GridColumnAlignments }
    public get $columnOrders(): typeof Mrbr_UI_Bootstrap_Layout_GridColumnOrders { return this.$bootstrapLayout.GridColumnOrders as typeof Mrbr_UI_Bootstrap_Layout_GridColumnOrders }
    public get $columnOffsets(): typeof Mrbr_UI_Bootstrap_Layout_GridColumnOffsets { return this.$bootstrapLayout.GridColumnOffsets as typeof Mrbr_UI_Bootstrap_Layout_GridColumnOffsets }


    /**
     * Grid Column Element field
     * @date 24/12/2022 - 17:17:41
     *
     * @private
     * @type {HTMLElement}
     */
    private _element: HTMLElement;

    /**
     * Grid Column Sizes field
     * @date 24/12/2022 - 17:17:54
     *
     * @private
     * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>}
     */
    private _gridColumnSizes: Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>;



    /**
     * Grid Column Alignments field
     * @date 24/12/2022 - 19:56:40
     *
     * @private
     * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments>}
     */
    private _gridColumnAlignments: Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments>;




    /**
     * Grid Column Order in Grid Row field
     * @date 24/12/2022 - 20:04:01
     *
     * @private
     * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders>}
     */
    private _order: Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders>;



    /**
     * Grid Column Offsets field
     * @date 24/12/2022 - 20:08:03
     *
     * @private
     * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets>}
     */
    private _offsets: Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets>;


    /**
     * Grid Column Name field
     * @date 24/12/2022 - 17:18:00
     *
     * @private
     * @type {string}
     */
    private _name: string;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Layout_GridColumn.
     * @date 24/12/2022 - 17:18:31
     *
     * @constructor
     * @param {?string} [name] If blank a random name will be generated
     * @param {?Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>} [columnSizes] if blank the default size will be used
    */
    constructor(name?: string, columnSizes?: Mrbr_UI_Bootstrap_Layout_GridColumnSizes | Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>) {
        this._element = document.createElement("div");        
        this.sizes = columnSizes;
        this._name = name;
    }
    /**
     * Grid Column Alignments property
     * @date 24/12/2022 - 19:58:02
     *
     * @public
     * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments>}
     */
    public get alignments(): Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments> {
        return this._gridColumnAlignments ??= new Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments>();
    }

    /**
     * Grid Column Alignments property
     */
    public set alignments(value: Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments>) {
        const element = this.element;
        this.alignments?.forEach((alignment, index) => { (element.classList.contains(alignment)) && element.classList.remove(alignment); })
        if (value) {
            value = [value].flat();
            value?.forEach((alignment, index) => { (element.classList.contains(alignment)) || element.classList.add(alignment); })
            this._gridColumnAlignments = value;
        }
    }
    /**
     * Grid Column Order in Grid Row property
     * @date 24/12/2022 - 20:04:21
     *
     * @public
     * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders>}
     */
    public get order(): Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders> {
        return this._order ??= new Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders>();
    }

    /**
     * Grid Column Order in Grid Row property
     */
    public set order(value: Mrbr_UI_Bootstrap_Layout_GridColumnOrders | Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders>) {
        const element = this.element;
        this.order?.forEach((order, index) => { (element.classList.contains(order)) && element.classList.remove(order); })
        if (value) {
            value = [value].flat();
            value?.forEach((order, index) => { (element.classList.contains(order)) || element.classList.add(order); })
            this.order = value;
        }
    }
    /**
     * Grid Column Offsets property
     * @date 24/12/2022 - 20:08:09
    *
    * @public
    * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets>}
    */
    public get offsets(): Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets> {
        return this._offsets ??= new Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets>();
    }

    /**
     * Grid Column Offsets property
     */
    public set offsets(value: Mrbr_UI_Bootstrap_Layout_GridColumnOffsets | Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets>) {
        const element = this.element;
        this.offsets?.forEach((offset, index) => { (element.classList.contains(offset)) && element.classList.remove(offset); })
        if (value) {
            value = [value].flat();
            value.forEach((offset, index) => { (element.classList.contains(offset)) || element.classList.add(offset); })
            this._offsets = value;
        }
    }

    /**
     * Grid Column Element property
     * @date 24/12/2022 - 17:18:58
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get element(): HTMLElement { return this._element; }

    /**
     * Grid Column Sizes property
     * @date 24/12/2022 - 17:19:08
     *
     * @public
     * @type {Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>}
     */
    public get sizes(): Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes> {
        return this._gridColumnSizes ??= [Mrbr_UI_Bootstrap_Layout_GridColumnSizes.col];
    }

    /**
     * Grid Column Sizes property
     */
    public set sizes(value: Mrbr_UI_Bootstrap_Layout_GridColumnSizes | Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>) {
        const element = this.element;
        this.sizes.forEach((size, index) => { (element.classList.contains(size)) && element.classList.remove(size); })
        if (value) {
            value = [value].flat();
            value.forEach((size, index) => { (element.classList.contains(size)) || element.classList.add(size); })
            this._gridColumnSizes = value;
        }
    }

    /**
     * Grid Column Name property
     * @date 24/12/2022 - 17:19:31
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get name(): string { return this._name ??= `gridColumn_${Date.now()}_${Math.floor(Math.random() * 1000).toString(16)}`; }


    /**
     * Set Grid Column Sizes - fluent interface
     * @date 24/12/2022 - 20:16:55
     *
     * @public
     * @param {(Mrbr_UI_Bootstrap_Layout_GridColumnSizes | Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>)} size
     * @returns {this}
     */
    public Sizes(size: Mrbr_UI_Bootstrap_Layout_GridColumnSizes | Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>): this {
        this.sizes = [size].flat();
        return this;
    }

    /**
     * Set Grid Column Order in Grid Row - fluent interface
     * @date 24/12/2022 - 20:17:21
     *
     * @public
     * @param {(Mrbr_UI_Bootstrap_Layout_GridColumnOrders|  Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders>)} order
     * @returns {this}
     */
    public Order(order: Mrbr_UI_Bootstrap_Layout_GridColumnOrders | Array<Mrbr_UI_Bootstrap_Layout_GridColumnOrders>): this {
        this.order = [order].flat();
        return this;
    }

    /**
     * Set Grid Column Alignments - fluent interface
     * @date 24/12/2022 - 20:17:29
     *
     * @public
     * @param {(Mrbr_UI_Bootstrap_Layout_GridColumnAlignments | Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments>)} alignments
     * @returns {this}
     */
    public Alignments(alignments: Mrbr_UI_Bootstrap_Layout_GridColumnAlignments | Array<Mrbr_UI_Bootstrap_Layout_GridColumnAlignments>): this {
        this.alignments = [alignments].flat();
        return this;
    }

    /**
     * Set Grid Column Offsets - fluent interface
     * @date 24/12/2022 - 20:17:38
     *
     * @public
     * @param {(Mrbr_UI_Bootstrap_Layout_GridColumnOffsets | Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets>)} offsets
     * @returns {this}
     */
    public Offsets(offsets: Mrbr_UI_Bootstrap_Layout_GridColumnOffsets | Array<Mrbr_UI_Bootstrap_Layout_GridColumnOffsets>): this {
        this.offsets = [offsets].flat();
        return this;
    }
}