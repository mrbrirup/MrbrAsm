import { Mrbr_UI_Bootstrap_Controls_DropdownItemEvents } from "./DropdownItemEvents";

/**
 * Dropdown Event Data for Dropdown Event
 * @date 02/12/2022 - 01:59:05
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_DropdownEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_DropdownEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_DropdownEventData {
    private _menuItemId: string;
    private _event: Event;
    private _target: HTMLElement;
    private _menuEvent: Mrbr_UI_Bootstrap_Controls_DropdownItemEvents;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_DropdownEventData.
     * @date 02/12/2022 - 02:00:34
     *
     * @constructor
     * @param {string} menuItemId
     * @param {Event} event
     * @param {Mrbr_UI_Bootstrap_Controls_Dropdown} eventName
     * @param {HTMLElement} target
     */
    constructor(menuItemId: string, event: Event, eventName: Mrbr_UI_Bootstrap_Controls_DropdownItemEvents, target: HTMLElement) {
        this.menuItemId = menuItemId;
        this.event = event;
        this.target = target;
        this.menuEvent = eventName;
    }

    /**
     * Menu item id
     * @date 02/12/2022 - 02:00:41
     *
     * @public
     * @type {string}
     */
    public get menuItemId(): string { return this._menuItemId; }

    /**
     * Menu item id
     */
    public set menuItemId(value: string) { this._menuItemId = value; }

    /**
     * Event that triggered the dropdown event
     * @date 02/12/2022 - 02:01:23
     *
     * @public
     * @type {Event}
     */
    public get event(): Event { return this._event; }

    /**
     * Event that triggered the dropdown event
     */
    public set event(value: Event) { this._event = value; }

    /**
     * Target element that triggered the dropdown event
     * @date 02/12/2022 - 02:01:38
     *
     * @public
     * @type {HTMLElement}
     */
    public get target(): HTMLElement { return this._target; }

    /**
     * Target element that triggered the dropdown event
     */
    public set target(value: HTMLElement) { this._target = value; }

    /**
     * Dropdown Event Name
     * @date 02/12/2022 - 02:01:55
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Dropdown}
     */
    public get menuEvent(): Mrbr_UI_Bootstrap_Controls_DropdownItemEvents { return this._menuEvent; }

    /**
     * Dropdown Event Name
     */
    public set menuEvent(value: Mrbr_UI_Bootstrap_Controls_DropdownItemEvents) { this._menuEvent = value; }
}