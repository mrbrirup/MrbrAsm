export class Mrbr_System_Events_EventHandler {
    constructor(eventName: string, eventTarget: EventTarget, eventHandler: Function, context?: any, options?: object) {
        this.eventName = eventName;
        this.eventTarget = eventTarget;
        this.eventHandler = eventHandler;
        this.context = context;
        this.options = options;
    }
    private _eventName: string;
    private _eventTarget: EventTarget;
    private _eventHandler: Function;
    private _options?: object;
    private _handler?: EventListenerOrEventListenerObject;
    private _remove?: () => any;
    private _context?: any;
    private _count?: number = 0;
    public get eventName(): string { return this._eventName; }
    public set eventName(value: string) { this._eventName = value; }
    public get eventTarget(): EventTarget { return this._eventTarget; }
    public set eventTarget(value: EventTarget) { this._eventTarget = value; }
    public get eventHandler(): Function { return this._eventHandler; }
    public set eventHandler(value: Function) { this._eventHandler = value; }
    public get options(): any { return this._options; }
    public set options(value: any) { this._options = value; }
    public get handler(): EventListenerOrEventListenerObject { return this._handler; }
    public set handler(value: EventListenerOrEventListenerObject) { this._handler = value; }
    public get remove(): () => any { return this._remove; }
    public set remove(value: () => any) { this._remove = value; }
    public get context(): any { return this._context; }
    public set context(value: any) { this._context = value; }
    public get count(): number { return this._count; }
    public set count(value: number) { this._count = value; }
    public EventName(eventName: string): Mrbr_System_Events_EventHandler {
        this.eventName = eventName;
        return this;
    }
    public EventTarget(eventTarget: EventTarget): Mrbr_System_Events_EventHandler {
        this.eventTarget = eventTarget;
        return this;
    }
    public EventHandler(eventHandler: Function): Mrbr_System_Events_EventHandler {
        this.eventHandler = eventHandler;
        return this;
    }
    public Options(options: any): Mrbr_System_Events_EventHandler {
        this.options = options;
        return this;
    }
    public Context(context: any): Mrbr_System_Events_EventHandler {
        this.context = context;
        return this;
    }

};
