
/**
 * Scrollspy event data
 * @date 11/12/2022 - 04:40:09
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ScrollspyEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_ScrollspyEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_ScrollspyEventData {
    
    /**
     * Scrollspy Event
     * @date 11/12/2022 - 04:40:34
     *
     * @private
     * @type {Event}
     */
    private _event: Event;
    
    /**
     * Navigation element related to the scrollspy event
     * @date 11/12/2022 - 04:40:47
     *
     * @private
     * @type {HTMLAnchorElement}
     */
    private _navigationElement: HTMLAnchorElement;
    
    /**
     * Id of the element related to the scrollspy event
     * @date 11/12/2022 - 04:41:05
     *
     * @private
     * @type {string}
     */
    private _id: string;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ScrollspyEventData.
     * @date 11/12/2022 - 04:40:25
     *
     * @constructor
     * @param {Event} event
     * @param {HTMLAnchorElement} navigationElement
     * @param {string} id
     */
    constructor(event: Event, navigationElement: HTMLAnchorElement, id: string) {
        this._event = event;
        this._navigationElement = navigationElement;
        this._id = id;
    }
    
    /**
     * Scrollspy Event
     * @date 11/12/2022 - 04:41:15
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }
    
    /**
     * Navigation element related to the scrollspy event
     * @date 11/12/2022 - 04:41:21
     *
     * @public
     * @readonly
     * @type {HTMLAnchorElement}
     */
    public get navigationElement(): HTMLAnchorElement { return this._navigationElement; }
    
    /**
     * Id of the element related to the scrollspy event
     * @date 11/12/2022 - 04:41:28
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get id(): string { return this._id; }
}