
/**
 * Pagaination Event Data
 * @date 09/12/2022 - 03:10:45
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_PaginationEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_PaginationEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_PaginationEventData {
    private _eventName: string;
    private _currentPage: number;
    private _previousPage: number;
    private _event: Event;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_PaginationEventData.
     * @date 09/12/2022 - 03:10:58
     *
     * @constructor
     * @param {string} eventName
     * @param {number} currentPage
     * @param {number} previousPage
     * @param {Event} event
     */
    constructor(eventName: string, currentPage: number, previousPage: number, event: Event) {
        this._eventName = eventName;
        this._currentPage = currentPage;
        this._previousPage = previousPage;
        this._event = event;
    }
    
    /**
     * Returns the Event Name
     * @date 09/12/2022 - 03:11:24
     *
     * @readonly
     * @type {string}
     */
    get eventName(): string { return this._eventName; }
    
    /**
     * Returns the Current Page
     * @date 09/12/2022 - 03:11:34
     *
     * @readonly
     * @type {number}
     */
    get currentPage(): number { return this._currentPage; }
    
    /**
     * Returns the Previous Page. Can be 0 if no previous page.
     * @date 09/12/2022 - 03:11:41
     *
     * @readonly
     * @type {number}
     */
    get previousPage(): number { return this._previousPage; }
    
    /**
     * Returns the Event. Can be null if no event as Page was changed programmatically.
     * @date 09/12/2022 - 03:11:49
     *
     * @readonly
     * @type {Event}
     */
    get event(): Event { return this._event; }

}