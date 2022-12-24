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
    constructor(name?: string, columnSizes?: Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>) {
        this._element = document.createElement("div");
        this.gridColumnSizes = columnSizes;
        this._name = name || (`gridColumn_${Date.now()}_${Math.floor(Math.random() * 1000).toString(16)}`);
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
    public get gridColumnSizes(): Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes> {
        return this._gridColumnSizes ??= [Mrbr_UI_Bootstrap_Layout_GridColumnSizes.col];
    }
    
    /**
     * Grid Column Sizes property
     */
    public set gridColumnSizes(value: Array<Mrbr_UI_Bootstrap_Layout_GridColumnSizes>) {
        const element = this.element;
        this.gridColumnSizes.forEach((size, index) => { (element.classList.contains(size)) && element.classList.remove(size); })
        value.forEach((size, index) => { (element.classList.contains(size)) || element.classList.add(size); })
        this._gridColumnSizes = value;
    }
    
    /**
     * Grid Column Name property
     * @date 24/12/2022 - 17:19:31
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get name(): string { return this._name; }

}