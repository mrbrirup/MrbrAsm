
/**
 * Event data for the ListGroupItem events.
 * @date 03/12/2022 - 16:36:44
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ListGroupEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_ListGroupEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_ListGroupEventData {
    _event: Event;
    _listItem: HTMLElement;
    _id: string;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ListGroupEventData.
     * @date 03/12/2022 - 16:36:54
     *
     * @constructor
     * @param {Event} event
     * @param {HTMLElement} listItem
     * @param {string} id
     */
    constructor(event: Event, listItem: HTMLElement, id: string) {
        this._event = event;
        this._listItem = listItem;
        this._id = id;
    }
    
    /**
     * HTML Element Triggering event.
     * @date 03/12/2022 - 16:37:00
     *
     * @public
     * @type {Event}
     */
    public get event(): Event { return this._event; }
    
    /**
     * Gets the Triggering event.
     */
    public set event(value: Event) { this._event = value; }
    
    /**
     * Id of the list item.
     * @date 03/12/2022 - 16:37:26
     *
     * @public
     * @type {string}
     */
    public get id(): string { return this._id; }
    
    /**
     * Id of the list item.
     */
    public set id(value: string) { this._id = value; }
    
    /**
     * HTML Element of the list item.
     * @date 03/12/2022 - 16:37:46
     *
     * @public
     * @type {HTMLElement}
     */
    public get listItem(): HTMLElement { return this._listItem; }
    
    /**
     * HTML Element of the list item.
     */
    public set listItem(value: HTMLElement) { this._listItem = value; }    
}