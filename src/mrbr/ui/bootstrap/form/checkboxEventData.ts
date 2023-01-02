import { Mrbr_UI_Bootstrap_Form_CheckBoxStates } from "./checkboxStates";

/**
 * Checkbox event data, event and state of the checkbox
 * @date 02/01/2023 - 00:31:03
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_CheckBoxEventData
 * @typedef {Mrbr_UI_Bootstrap_Form_CheckBoxEventData}
 */
export class Mrbr_UI_Bootstrap_Form_CheckBoxEventData {
    
    /**
     * Event from the checkbox, field
     * @date 02/01/2023 - 22:29:39
     *
     * @private
     * @type {Event}
     */
    private _event: Event;
    
    /**
     * State of the checkbox, field
     * @date 02/01/2023 - 22:30:03
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Form_CheckBoxStates}
     */
    private _state: Mrbr_UI_Bootstrap_Form_CheckBoxStates;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_CheckBoxEventData.
     * @date 02/01/2023 - 22:30:09
     *
     * @constructor
     * @param {Event} event
     * @param {Mrbr_UI_Bootstrap_Form_CheckBoxStates} state
     */
    constructor(event: Event, state: Mrbr_UI_Bootstrap_Form_CheckBoxStates) {
        this._event = event;
        this._state = state;
    }
    
    /**
     * Event from the checkbox, property
     * @date 02/01/2023 - 22:30:14
     *
     * @public
     * @readonly
     * @type {Event}
     */
    public get event(): Event { return this._event; }
    
    /**
     * State of the checkbox, property
     * @date 02/01/2023 - 22:30:31
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Form_CheckBoxStates}
     */
    public get state(): Mrbr_UI_Bootstrap_Form_CheckBoxStates { return this._state; }
}