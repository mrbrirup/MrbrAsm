import { Mrbr_UI_Bootstrap_Controls_ListGroupTabPane } from "./ListGroupTabPane";
import { Mrbr_UI_Bootstrap_Controls_ListGroupTabPane$Events } from "./ListGroupTabPane$Events";

/**
 * Description placeholder
 * @date 04/12/2022 - 06:42:25
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData {
    private _tabEvent: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane$Events;
    private _event: Event;
    private _currentId: string;
    private _previousId: string;
    private _nextId: string;
    private _currentTab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane;
    private _previousTab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane;
    private _nextTab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane;

    
    /**
     * Returns the event name
     * @date 04/12/2022 - 06:42:54
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public get tabEvent(): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane$Events { return this._tabEvent; }

    
    /**
     * Returns the event Raised from HTML Element
     * @date 04/12/2022 - 06:43:04
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }

    
    /**
     * Returns the current tab id
     * @date 04/12/2022 - 06:43:27
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get currentId(): string { return this._currentId; }
    
    /**
     * Returns the Previous tab id
     * @date 04/12/2022 - 06:43:34
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get previousId(): string { return this._previousId; }
    
    /**
     * Returns the Next tab id
     * @date 04/12/2022 - 06:43:52
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get nextId(): string { return this._nextId; }
    
    /**
     * Returns the current tab
     * @date 04/12/2022 - 06:43:59
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public get currentTab(): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane { return this._currentTab; }
    
    /**
     * Returns the Previous tab
     * @date 04/12/2022 - 06:44:07
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public get previousTab(): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane { return this._previousTab; }
    
    /**
     * Returns the Next tab
     * @date 04/12/2022 - 06:44:13
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public get nextTab(): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane { return this._nextTab; }

    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData.
     * @date 04/12/2022 - 06:44:24
     *
     * @constructor
     * @param {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane} tabEvent
     * @param {Event} event
     * @param {string} currentId
     * @param {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane} currentTab
     */
    constructor(tabEvent: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane$Events, event: Event, currentId: string, currentTab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane) {
        this._tabEvent = tabEvent;
        this._event = event;
        this._currentId = currentId;
        this._currentTab = currentTab;
    }
    
    /**
     * Sets the previous id and tab for Show, SHown and Hidden Event
     * @date 04/12/2022 - 06:44:43
     *
     * @public
     * @param {string} id
     * @param {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane} tab
     * @returns {Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData}
     */
    public Previous(id: string, tab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane): Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData {
        this._previousId = id;
        this._previousTab = tab;
        return this;
    }
    
    /**
     * Sets the next id and tab for Hide Event
     * @date 04/12/2022 - 06:45:02
     *
     * @public
     * @param {string} id
     * @param {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane} tab
     * @returns {Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData}
     */
    public Next(id: string, tab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane): Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData {
        this._nextId = id;
        this._nextTab = tab;
        return this;
    }
}
