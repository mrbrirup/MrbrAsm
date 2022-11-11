import { Mrbr_System_Component } from "../Component";

/**
 * Event class
 * @date 02/11/2022 - 06:22:30
 *
 * @export
 * @class Mrbr_System_Events_Event
 * @typedef {Mrbr_System_Events_Event}
 * @template TDataType
 */
export class Mrbr_System_Events_Event<TDataType> extends Mrbr_System_Component {

    /**
     * Event Name
     * @date 02/11/2022 - 06:22:39
     *
     * @private
     * @type {string}
     */
    private _eventName: string;

    /**
     * Source of the event
     * @date 02/11/2022 - 06:22:52
     *
     * @private
     * @type {unknown}
     */
    private _source: unknown;

    /**
     * Additional Event Specific Data
     * @date 02/11/2022 - 06:23:02
     *
     * @private
     * @type {TDataType}
     */
    private _data: TDataType;


    /**
     * Creates an instance of Mrbr_System_Events_Event.
     * @date 02/11/2022 - 06:23:29
     *
     * @constructor
     * @param {string} eventName
     * @param {unknown} source
     * @param {?TDataType} [data]
     */
    constructor(eventName: string, source: unknown, data?: TDataType) {
        super();
        this._eventName = eventName;
        this._source = source;
        this._data = data;
    }

    /**
     * Event Name
     * @date 02/11/2022 - 06:23:35
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get name(): string { return this._eventName; }

    /**
     * Source of the event
     * @date 02/11/2022 - 06:23:42
     *
     * @public
     * @readonly
     * @type {*}
     */
    public get source(): any { return this._source; }

    /**
     * Additional Event Specific Data
     * @date 02/11/2022 - 06:23:49
     *
     * @public
     * @readonly
     * @type {*}
     */
    public get data(): any { return this._data; }
}