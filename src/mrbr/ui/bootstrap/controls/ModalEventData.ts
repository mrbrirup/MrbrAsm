import { Mrbr_UI_Bootstrap_Controls_ModalEvents } from "./ModalEvents";

export class Mrbr_UI_Bootstrap_Controls_ModalEventData {
    private _eventName: Mrbr_UI_Bootstrap_Controls_ModalEvents;
    private _event: Event;
    private _sourceElement: HTMLElement;
    constructor(eventName: Mrbr_UI_Bootstrap_Controls_ModalEvents, event: Event, sourceElement: HTMLElement) {
        this._eventName = eventName;
        this._event = event;
        this._sourceElement = sourceElement;
    }
    
    /**
     * Bootstrap modal event.
     * @date 04/12/2022 - 21:16:10
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }
    
    /**
     * Bootstrap modal event name.
     * @date 04/12/2022 - 21:16:38
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_Modal}
     */
    public get eventName(): Mrbr_UI_Bootstrap_Controls_ModalEvents { return this._eventName; }
    
    /**
     * Source Element if triggered by a click event.
     * @date 04/12/2022 - 21:16:45
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get sourceElement(): HTMLElement { return this._sourceElement; }
}