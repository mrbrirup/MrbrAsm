export type MrbrEventHandler = {
    eventName: string;
    eventTarget: EventTarget;
    event: Function;
    options?: object;
    handler?: EventListenerOrEventListenerObject;
    remove?: () => any;
    context? :any;
};
