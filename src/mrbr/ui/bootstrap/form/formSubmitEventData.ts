import { Mrbr_UI_Bootstrap_Form_Form } from "./form";

/**
 * Event data for the form submit event. Checks the validity of the form. If the form is invalid, the event can be cancelled.
 * @date 13/01/2023 - 07:23:38
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_FormSubmitEventData
 * @typedef {Mrbr_UI_Bootstrap_Form_FormSubmitEventData}
 */
export class Mrbr_UI_Bootstrap_Form_FormSubmitEventData {

    /**
     * The event that triggered the form submit event.
     * @date 13/01/2023 - 07:24:16
     *
     * @public
     * @type {Event}
     */
    public event: Event;

    /**
     * Indicates if the form is valid.
     * @date 13/01/2023 - 07:24:22
     *
     * @public
     * @type {boolean}
     */
    public valid: boolean;

    /**
     * The form that triggered the event.
     * @date 13/01/2023 - 07:27:06
     *
     * @public
     * @type {HTMLFormElement}
     */
    public form: HTMLFormElement;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_FormSubmitEventData. Checks the validity of the form. If the form is invalid, the event can be cancelled.
     * @date 13/01/2023 - 07:24:29
     *
     * @constructor
     * @param {Event} event
     * @param {HTMLFormElement} form
     */
    constructor(event: Event, form: Mrbr_UI_Bootstrap_Form_Form) {
        this.event = event;
        this.form = <HTMLFormElement>form.rootElement;
        this.valid = this.form.checkValidity();
        form.formValidated(true);
    }

    /**
     * Cancels the event.
     * @date 13/01/2023 - 07:24:43
     *
     * @public
     */
    public cancel(): void {
        this.event.preventDefault();
        this.event.stopPropagation();
    }
}