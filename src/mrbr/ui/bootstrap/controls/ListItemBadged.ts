
/**
 * A list item with a badge.
 * @date 04/12/2022 - 07:50:48
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ListItemBadged
 * @typedef {Mrbr_UI_Bootstrap_Controls_ListItemBadged}
 */
export class Mrbr_UI_Bootstrap_Controls_ListItemBadged {
    _badgeElement: HTMLElement;
    _textElement: HTMLElement;
    _listItem: HTMLElement;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ListItemBadged.
     * @date 04/12/2022 - 07:51:00
     *
     * @constructor
     * @param {HTMLElement} listItem
     * @param {HTMLElement} textElement
     * @param {HTMLElement} badgeElement
     */
    constructor(listItem: HTMLElement, textElement: HTMLElement, badgeElement: HTMLElement) {
        this._listItem = listItem;
        this._textElement = textElement;
        this._badgeElement = badgeElement;
    }
    
    /**
     * Badge element
     * @date 04/12/2022 - 07:51:15
     *
     * @public
     * @type {HTMLElement}
     */
    public get badgeElement(): HTMLElement { return this._badgeElement; }
    
    /**
     * Badge element
     */
    public set badgeElement(value: HTMLElement) { this._badgeElement = value; }
    
    /**
     * List item containing the badge
     * @date 04/12/2022 - 07:51:27
     *
     * @public
     * @type {HTMLElement}
     */
    public get listItem(): HTMLElement { return this._listItem; }
    
    /**
     * List item containing the badge
     */
    public set listItem(value: HTMLElement) { this._listItem = value; }
    
    /**
     * Text element of ListItem
     * @date 04/12/2022 - 07:51:51
     *
     * @public
     * @type {HTMLElement}
     */
    public get textElement(): HTMLElement { return this._textElement; }
    
    /**
     * Text element of ListItem
     */
    public set textElement(value: HTMLElement) { this._textElement = value; }
}
