import { Mrbr_System_MrbrPromise } from "./MrbrPromise";

export interface Mrbr_System_IComponent {
    initialise(...args): Mrbr_System_MrbrPromise<Mrbr_System_IComponent>;
}