
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

    /**
     * Name of the Event from EventTarget
     * @date 31/10/2022 - 21:18:00
     *
     * @public
     * @type {string}
     */
    public get eventName(): string { return this._eventName; }

    /**
     * Name of the Event from EventTarget
     */
    public set eventName(value: string) { this._eventName = value; }

    /**
     * Object inherited from EventTarget
     * @date 31/10/2022 - 21:19:05
     *
     * @public
     * @type {EventTarget}
     */
    public get eventTarget(): EventTarget { return this._eventTarget; }

    /**
     * Object inherited from EventTarget
     */
    public set eventTarget(value: EventTarget) { this._eventTarget = value; }

    /**
     * Supplied method to call when Event is fired
     * @date 31/10/2022 - 21:19:44
     *
     * @public
     * @type {Function}
     */
    public get eventHandler(): Function { return this._eventHandler; }

    /**
     * Supplied method to call when Event is fired
     */
    public set eventHandler(value: Function) { this._eventHandler = value; }

    /**
     * Options supplied to Target.addEventListener
     * @date 31/10/2022 - 21:20:02
     *
     * @public
     * @type {*}
     */
    public get options(): any { return this._options; }

    /**
     * Options supplied to Target.addEventListener
     */
    public set options(value: any) { this._options = value; }

    /**
     * Sets the Event Handler Method to call when Event is fired bound to context
     * @date 31/10/2022 - 21:20:32
     *
     * @public
     * @type {EventListenerOrEventListenerObject}
     */
    public get boundHandler(): EventListenerOrEventListenerObject { return this._boundHandler; }

    /**
     * Sets the Event Handler Method to call when Event is fired bound to context
     */
    public set boundHandler(value: EventListenerOrEventListenerObject) { this._boundHandler = value; }

    /**
     * Generated remove function to remove eventhandler from EventTarget and remoce from EventsMap
     * @date 31/10/2022 - 21:21:02
     *
     * @public
     * @type {() => any}
     */
    public get remove(): () => any { return this._remove; }

    /**
     * Generated remove function to remove eventhandler from EventTarget and remoce from EventsMap
     */
    public set remove(value: () => any) { this._remove = value; }

    /**
     * Context to Bind the Event Handler to
     * @date 31/10/2022 - 21:21:34
     *
     * @public
     * @type {*}
     */
    public get context(): any { return this._context; }

    /**
     * Context to Bind the Event Handler to
     */
    public set context(value: any) { this._context = value; }

    /**
     * Incremented when the same event listener is added to the same event target with the same parameters.
     * @date 31/10/2022 - 21:21:52
     *
     * @public
     * @type {number}
     */
    public get count(): number { return this._count; }

    /**
     * Incremented when the same event listener is added to the same event target with the same parameters.
     */
    public set count(value: number) { this._count = value; }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Sets EventName and return this, for chaining
     * @date 31/10/2022 - 21:22:23
     *
     * @public
     * @param {string} eventName
     * @returns {Mrbr_System_Events_EventHandler}
     */
    public EventName(eventName: string): Mrbr_System_Events_EventHandler {
        this.eventName = eventName;
        return this;
    }

    /**
     * Sets EventTarget and return this for chaining
     * @date 31/10/2022 - 21:22:48
     *
     * @public
     * @param {EventTarget} eventTarget
     * @returns {Mrbr_System_Events_EventHandler}
     */
    public EventTarget(eventTarget: EventTarget): Mrbr_System_Events_EventHandler {
        this.eventTarget = eventTarget;
        return this;
    }

    /**
     * Sets EventHandler and return this for chaining
     * @date 31/10/2022 - 21:23:08
     *
     * @public
     * @param {Function} eventHandler
     * @returns {Mrbr_System_Events_EventHandler}
     */
    public EventHandler(eventHandler: Function): Mrbr_System_Events_EventHandler {
        this.eventHandler = eventHandler;
        return this;
    }

    /**
     * Sets Options and return this for chaining
     * @date 31/10/2022 - 21:23:21
     *
     * @public
     * @param {*} options
     * @returns {Mrbr_System_Events_EventHandler}
     */
    public Options(options: any): Mrbr_System_Events_EventHandler {
        this.options = options;
        return this;
    }

    /**
     * Sets Context and return this for chaining
     * @date 31/10/2022 - 21:23:28
     *
     * @public
     * @param {*} context
     * @returns {Mrbr_System_Events_EventHandler}
     */
    public Context(context: any): Mrbr_System_Events_EventHandler {
        this.context = context;
        return this;
    }
    //#endregion Public Methods
};
