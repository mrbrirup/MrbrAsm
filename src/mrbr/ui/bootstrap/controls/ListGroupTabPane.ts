
/**
 * ListGroup Tab Pane linking Tab Element to Pane Element
 * @date 04/12/2022 - 03:15:18
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ListGroupTabPane
 * @typedef {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
 */
export class Mrbr_UI_Bootstrap_Controls_ListGroupTabPane {
    _tab: HTMLElement;
    _pane: HTMLElement;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ListGroupTabPane.
     * @date 04/12/2022 - 06:39:32
     *
     * @constructor
     * @param {HTMLElement} tab
     * @param {HTMLElement} pane
     */
    constructor(tab: HTMLElement, pane: HTMLElement) {
        this._tab = tab;
        this._pane = pane;
    }
    
    /**
     * Tab Html Element
     * @date 04/12/2022 - 06:39:38
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get tab(): HTMLElement { return this._tab; }
    
    /**
     * Pane Html Element Element
     * @date 04/12/2022 - 06:39:51
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get pane(): HTMLElement { return this._pane }
}