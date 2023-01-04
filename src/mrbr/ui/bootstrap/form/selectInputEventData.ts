export class Mrbr_UI_Bootstrap_Form_SelectInputEventData {
    public readonly selection: Array<string>
    public readonly event: Event;
    constructor(selection: Array<string>, event: Event) {
        this.selection = selection;
        this.event = event;
    }
}