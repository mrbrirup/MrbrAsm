import { Mrbr_UI_Bootstrap_Controls_TabPanel } from "../controls/TabPanel";


/**
 * TabPanel Event Data
 * @date 12/12/2022 - 09:13:43
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_TabPanelEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_TabPanelEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_TabPanelEventData {
    private _currentTab: Mrbr_UI_Bootstrap_Controls_TabPanel;
    private _previousTab: Mrbr_UI_Bootstrap_Controls_TabPanel;
    private _nextTab: Mrbr_UI_Bootstrap_Controls_TabPanel;
    private _event: Event;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_TabPanelEventData.
     * @date 12/12/2022 - 09:13:51
     *
     * @constructor
     * @param {Event} event
     */
    constructor(event: Event) {
        this._event = event;
    }
    
    /**
     * Dom Event Source
     * @date 12/12/2022 - 09:13:59
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }
    
    /**
     * Current Tab
     * @date 12/12/2022 - 09:14:37
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_TabPanel}
     */
    public get currentTab(): Mrbr_UI_Bootstrap_Controls_TabPanel { return this._currentTab; }
    
    /**
     * Previous Tab
     * @date 12/12/2022 - 09:14:44
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_TabPanel}
     */
    public get previousTab(): Mrbr_UI_Bootstrap_Controls_TabPanel { return this._previousTab; }
    
    /**
     * Next Tab
     * @date 12/12/2022 - 09:14:49
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_TabPanel}
     */
    public get nextTab(): Mrbr_UI_Bootstrap_Controls_TabPanel { return this._nextTab; }
    
    /**
     * Set Current Tab Value - Fluent Interface
     * @date 12/12/2022 - 09:14:55
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_TabPanel} value
     * @returns {this}
     */
    public CurrentTab(value: Mrbr_UI_Bootstrap_Controls_TabPanel) { this._currentTab = value; return this; }
    
    /**
     * Set Previous Tab Value - Fluent Interface
     * @date 12/12/2022 - 09:15:14
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_TabPanel} value
     * @returns {this}
     */
    public PreviousTab(value: Mrbr_UI_Bootstrap_Controls_TabPanel) { this._previousTab = value; return this; }
    
    /**
     * Set Next Tab Value - Fluent Interface
     * @date 12/12/2022 - 09:15:21
     *
     * @public
     * @param {*} relatedTargetPanel
     * @returns {this}
     */
    public NextTab(relatedTargetPanel: any) { this._nextTab = relatedTargetPanel; return this; }

}