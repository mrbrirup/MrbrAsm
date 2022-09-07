export class Mrbr_System_Events_EventHandler {
    constructor(eventName: string, eventTarget: EventTarget, event: Function) {
        const self = this;
        self.eventName = eventName;
        self.eventTarget = eventTarget;
        self.event = event;
    }
    eventName: string;
    eventTarget: EventTarget;
    event: Function;
    options?: any;
    handler?: EventListenerOrEventListenerObject;
    remove?: () => any;
    context?: any;
    count?: number = 0; 
};
