
/**
 * Popover Event Data
 * @date 09/12/2022 - 09:29:19
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_PopoverEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_PopoverEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_PopoverEventData {
    _event: Event;
    _popoverName: string;
    _id: string;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_PopoverEventData.
     * @date 09/12/2022 - 09:29:52
     *
     * @constructor
     * @param {string} popoverName
     * @param {Event} event
     */
    constructor(popoverName: string, event: Event) {
        this._event = event;
        this._popoverName = popoverName;
    }

    /**
     * Event That triggered the popover
     * @date 09/12/2022 - 09:29:31
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }

    /**
     * Name of the popover
     * @date 09/12/2022 - 09:29:44
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get popoverName(): string { return this._popoverName; }
}