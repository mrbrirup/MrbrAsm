import { MrbrBase } from "./MrbrBase";
import { Mrbr_System_Promise } from "./Promise";


/**
 * Base class for all all Mrbr Objects
 * @date 03/11/2022 - 05:32:04
 *
 * @export
 * @class Mrbr_System_Object
 * @typedef {Mrbr_System_Object}
 */
export class Mrbr_System_Object {
    
    /**
     * Alias to global Mrbr class type
     * @date 03/11/2022 - 05:32:27
     *
     * @public
     * @type {typeof MrbrBase}
     */
    public $mrbr: typeof MrbrBase = MrbrBase;
    
    /**
     * Alias to global Mrbr instance
     * @date 03/11/2022 - 05:33:17
     *
     * @public
     * @type {MrbrBase}
     */
    public $mrbrInstance: MrbrBase = MrbrBase.mrbrInstance;
    
    /**
     * Alias to Mrbr.System.Promise
     * @date 03/11/2022 - 05:33:30
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_System_Promise}
     */
    public get $promise() { return Mrbr_System_Promise; }
    constructor() { }
}   