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
    private _event: Event;
    private _state: Mrbr_UI_Bootstrap_Form_CheckBoxStates;
    constructor(event: Event, state: Mrbr_UI_Bootstrap_Form_CheckBoxStates) {
        this._event = event;
        this._state = state;
    }
    public get event(): Event {
        return this._event;
    }
    public get state(): Mrbr_UI_Bootstrap_Form_CheckBoxStates {
        return this._state;
    }
}