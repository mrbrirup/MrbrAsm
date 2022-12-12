
/**
 * Bootstrap Toast Event Data
 * @date 12/12/2022 - 14:56:05
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ToastEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_ToastEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_ToastEventData {
    private _event: Event;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ToastEventData.
     * @date 12/12/2022 - 14:56:21
     *
     * @constructor
     * @param {Event} event
     */
    constructor(event: Event) {
        this._event = event;
    }
    
    /**
     * Event Raised from Toast
     * @date 12/12/2022 - 14:56:26
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }
}