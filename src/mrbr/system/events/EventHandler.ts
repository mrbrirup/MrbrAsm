
/**
 * The EventHandler helper class for configuring and removing event handlers.
 * @date 31/10/2022 - 15:48:40
 *
 * @export
 * @class Mrbr_System_Events_EventHandler
 * @typedef {Mrbr_System_Events_EventHandler}
 */
export class Mrbr_System_Events_EventHandler {
    
    /**
     * Creates an instance of Mrbr_System_Events_EventHandler.
     * @date 31/10/2022 - 15:49:34
     *
     * @constructor
     * @param {string} eventName Event Name to Listener for from EventTarget
     * @param {EventTarget} eventTarget EventTarget to listen for EventName from
     * @param {Function} eventHandler Event Handler Method to call when EventName is fired from EventTarget
     * @param {?*} [context] Context to call Event Handler in (defaults to EventTarget)
     * @param {?object} [options] Options to pass to EventTarget.addEventListener
     */
    constructor(eventName: string, eventTarget: EventTarget, eventHandler: Function, context?: any, options?: object) {
        this.eventName = eventName;
        this.eventTarget = eventTarget;
        this.eventHandler = eventHandler;
        this.context = context;
        this.options = options;
    }
    //#region Private Property Fields
    
    /**
     * Event Name to Listener for from EventTarget
     * @date 31/10/2022 - 15:51:34
     *
     * @private
     * @type {string}
     */
    private _eventName: string;
    
    /**
     * EventTarget to listen for EventName from
     * @date 31/10/2022 - 15:52:10
     *
     * @private
     * @type {EventTarget}
     */
    private _eventTarget: EventTarget;
    
    /**
     * Event Handler Methods for the Event
     * @date 31/10/2022 - 15:52:27
     *
     * @private
     * @type {Function}
     */
    private _eventHandler: Function;
    
    /**
     * EvventListener options for addEventListener
     * @date 31/10/2022 - 15:53:02
     *
     * @private
     * @type {?object}
     */
    private _options?: object;
    
    /**
     * Event Handler Methods for the Event bound to context. This is the Method called, not the eventHandler
     * @date 31/10/2022 - 15:56:01
     *
     * @private
     * @type {?EventListenerOrEventListenerObject}
     */
    private _boundHandler?: EventListenerOrEventListenerObject;
    
    /**
     * Removes the Handler and references to in EventsMap
     * @date 31/10/2022 - 15:56:55
     *
     * @private
     * @type {?() => any}
     */
    private _remove?: () => any;
    
    /**
     * Context for the Event Handler to be called in
     * @date 31/10/2022 - 15:57:48
     *
     * @private
     * @type {?*} defaults to the EventTarget
     */
    private _context?: any;
    
    /**
     * Incremented when the same event listener is added to the same event target with the same parameters.
     * @date 31/10/2022 - 15:58:25
     *
     * @private
     * @type {?number}
     */
    private _count?: number = 0;
    //#endregion Private Property Fields
    //#region Public Properties
    public get eventName(): string { return this._eventName; }
    public set eventName(value: string) { this._eventName = value; }
    public get eventTarget(): EventTarget { return this._eventTarget; }
    public set eventTarget(value: EventTarget) { this._eventTarget = value; }
    public get eventHandler(): Function { return this._eventHandler; }
    public set eventHandler(value: Function) { this._eventHandler = value; }
    public get options(): any { return this._options; }
    public set options(value: any) { this._options = value; }
    public get boundHandler(): EventListenerOrEventListenerObject { return this._boundHandler; }
    public set boundHandler(value: EventListenerOrEventListenerObject) { this._boundHandler = value; }
    public get remove(): () => any { return this._remove; }
    public set remove(value: () => any) { this._remove = value; }
    public get context(): any { return this._context; }
    public set context(value: any) { this._context = value; }
    public get count(): number { return this._count; }
    public set count(value: number) { this._count = value; }
    //#endregion Public Properties
    //#region Public Methods
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
    //#endregion Public Methods
};
