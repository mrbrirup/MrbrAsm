import { Mrbr_System_MrbrPromise } from "../../system/MrbrPromise";

export interface Mrbr_UI_Controls_IControl {
    initialise(...args): Mrbr_System_MrbrPromise<any>;
    setDefaultConfig(...args): Mrbr_System_MrbrPromise<any>;
}