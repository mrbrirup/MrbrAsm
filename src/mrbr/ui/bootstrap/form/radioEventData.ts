
/**
 * Radio Event Data
 * @date 02/01/2023 - 22:59:38
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_RadioEventData
 * @typedef {Mrbr_UI_Bootstrap_Form_RadioEventData}
 */
export class Mrbr_UI_Bootstrap_Form_RadioEventData {
    
    /**
     * DOMEvent that triggered the event
     * @date 02/01/2023 - 22:59:49
     *
     * @private
     * @type {Event}
     */
    private _event: Event;
    
    /**
     * Is Selected value for the radio, field
     * @date 02/01/2023 - 23:00:08
     *
     * @private
     * @type {boolean}
     */
    private _selected: boolean;
    
    /**
     * Radio Input element
     * @date 02/01/2023 - 23:00:23
     *
     * @private
     * @type {HTMLInputElement}
     */
    private _radioElement: HTMLInputElement;
    
    /**
     * Group name for the radio, field
     * @date 02/01/2023 - 23:00:36
     *
     * @private
     * @type {string}
     */
    private _groupName: string;
    
    /**
     * Value for the radio, field
     * @date 02/01/2023 - 23:00:44
     *
     * @private
     * @type {string}
     */
    private _value: string;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_RadioEventData.
     * @date 02/01/2023 - 23:00:52
     *
     * @constructor
     * @param {Event} event
     * @param {boolean} selected
     * @param {HTMLInputElement} radioElement
     * @param {string} groupName
     * @param {string} value
     */
    constructor(event: Event, selected: boolean, radioElement: HTMLInputElement, groupName: string, value: string) {
        this._event = event;
        this._selected = selected;
        this._radioElement = radioElement;
        this._groupName = groupName;
        this._value = value;
    }
    
    /**
     * DOMEvent that triggered the event
     * @date 02/01/2023 - 23:01:00
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }
    
    /**
     * Is Selected value for the radio, Property
     * @date 02/01/2023 - 23:01:06
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get selected(): boolean { return this._selected; }
    
    /**
     * Radio Input element
     * @date 02/01/2023 - 23:01:13
     *
     * @public
     * @readonly
     * @type {HTMLInputElement}
     */
    public get radioElement(): HTMLInputElement { return this._radioElement; }
    
    /**
     * Group name for the radio, Property. Groups by name and only allows one to be selected at a time
     * @date 02/01/2023 - 23:01:20
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get groupName(): string { return this._groupName; }
    
    /**
     * Value for the radio, Property
     * @date 02/01/2023 - 23:01:28
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get value(): string { return this._value; }
}