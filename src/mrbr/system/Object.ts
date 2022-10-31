import { MrbrBase } from "./MrbrBase";
import { Mrbr_System_MrbrPromise } from "./MrbrPromise";

export class Mrbr_System_Object {
    public $mrbrBase: typeof MrbrBase = MrbrBase;
    public mrbrInstance: MrbrBase = MrbrBase.mrbrInstance;
    public get $promise() { return Mrbr_System_MrbrPromise; }
    constructor() { }
}   