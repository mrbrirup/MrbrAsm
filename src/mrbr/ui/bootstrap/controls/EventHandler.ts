export class Mrbr_UI_Controls_EventHandler {
    constructor(eventName: string, eventTarget: EventTarget, event: Function) {
        const self = this;
        self.eventName = eventName;
        self.eventTarget = eventTarget;
        self.event = event;
    }
    eventName: string;
    eventTarget: EventTarget;
    event: Function;
    options?: object;
    handler?: EventListenerOrEventListenerObject;
    remove?: () => any;
    context?: any;
};
