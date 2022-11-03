import { Mrbr_UI_Controls_Themes } from "./themes";

/**
 * @fileoverview Theme change event.
 * @date 31/10/2022 - 21:24:22
 *
 * @export
 * @class Mrbr_UI_Controls_ThemeChangeEvent
 * @typedef {Mrbr_UI_Controls_ThemeChangeEvent}
 * @extends {CustomEvent<Mrbr_UI_Controls_ThemeChangeEventDetail>}
 */
export class Mrbr_UI_Controls_ThemeChangeEvent extends CustomEvent<Mrbr_UI_Controls_ThemeChangeEventDetail>{

    /**
     * Theme change event name.
     * @date 31/10/2022 - 21:24:54
     *
     * @public
     * @static
     * @type {string}
     */
    public static themeChangeEvent: string = "themeChange";

    /**
     * Initialisation data for the event.
     * @date 31/10/2022 - 21:25:08
     *
     * @protected
     * @type {Mrbr_UI_Controls_ThemeChangeEventInit}
     */
    protected init: Mrbr_UI_Controls_ThemeChangeEventInit

    /**
     * Creates an instance of Mrbr_UI_Controls_ThemeChangeEvent.
     * @date 31/10/2022 - 21:25:19
     *
     * @constructor
     * @param {Mrbr_UI_Controls_ThemeChangeEventInit} init
     */
    constructor(init: Mrbr_UI_Controls_ThemeChangeEventInit) {
        let typeName: string = Mrbr_UI_Controls_ThemeChangeEvent.themeChangeEvent;
        super(typeName, init);
        this.init = init
    }
}

/**
 * Theme change event detail and init for CustomEvent
 * @date 31/10/2022 - 21:25:38
 *
 * @interface Mrbr_UI_Controls_ThemeChangeEventInit
 * @typedef {Mrbr_UI_Controls_ThemeChangeEventInit}
 * @extends {CustomEventInit<Mrbr_UI_Controls_ThemeChangeEventDetail>}
 */
interface Mrbr_UI_Controls_ThemeChangeEventInit extends CustomEventInit<Mrbr_UI_Controls_ThemeChangeEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: Mrbr_UI_Controls_ThemeChangeEventDetail
}

/**
 * Theme change event detail.
 * @date 31/10/2022 - 21:25:49
 *
 * @interface Mrbr_UI_Controls_ThemeChangeEventDetail
 * @typedef {Mrbr_UI_Controls_ThemeChangeEventDetail}
 */
interface Mrbr_UI_Controls_ThemeChangeEventDetail {
    theme: Mrbr_UI_Controls_Themes
}
