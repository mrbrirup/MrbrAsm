import { Mrbr_System_Promise } from "../../system/Promise";

/**
 * Interface for all controls.
 * @date 31/10/2022 - 21:26:32
 *
 * @export
 * @interface Mrbr_UI_Controls_IControl
 * @typedef {Mrbr_UI_Controls_IControl}
 */
export interface Mrbr_UI_Controls_IControl {
       
    //TODO: Remove this method from the interface after refactoring configuration
    /**
     * Set the default configuration for the control.
     * @date 31/10/2022 - 21:27:18
     *
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<any>}
     */
    setDefaultConfig(...args): Mrbr_System_Promise<any>;
    
    /**
     * Mount the control.rootElement to the supplied DOM element
     * @date 31/10/2022 - 21:28:11
     *
     * @param {HTMLElement} element Element to mount the control to
     * @param {string} position Position relative to element to mount the control to
     * @param {...*} args Additional arguments to pass to the mount method
     * @returns {Mrbr_UI_Controls_IControl}
     */
    mount(element: HTMLElement, position: string, ...args: any): Mrbr_UI_Controls_IControl;
}