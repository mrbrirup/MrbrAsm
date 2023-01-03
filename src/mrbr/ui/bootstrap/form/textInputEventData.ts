
/**
 * Event data for Text-based elements Input Change Events
 * @date 03/01/2023 - 16:09:36
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_TextInputEventData
 * @typedef {Mrbr_UI_Bootstrap_Form_TextInputEventData}
 */
export class Mrbr_UI_Bootstrap_Form_TextInputEventData {
    
    /**
     * Value of the Input Element
     * @date 03/01/2023 - 16:10:18
     *
     * @public
     * @type {string}
     */
    public value: string;
    
    /**
     * Event that triggered the Input Change
     * @date 03/01/2023 - 16:10:24
     *
     * @public
     * @type {Event}
     */
    public event: Event;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_TextInputEventData.
     * @date 03/01/2023 - 16:10:31
     *
     * @constructor
     * @param {string} value
     * @param {Event} event
     */
    constructor(value: string, event: Event) {
        this.value = value;
        this.event = event;
    }
}