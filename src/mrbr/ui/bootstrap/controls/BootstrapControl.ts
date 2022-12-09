import { Mrbr_UI_Controls_Control } from "../../controls/Control";

/**
 * Extends Base Control Class to include Bootstrap from MrbrBase.host
 * @date 09/11/2022 - 11:29:10
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_BootstrapControl
 * @typedef {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 * @extends {Mrbr_UI_Controls_Control}
 */
export class Mrbr_UI_Bootstrap_Controls_BootstrapControl extends Mrbr_UI_Controls_Control {

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_BootstrapControl.
     * @date 09/12/2022 - 03:08:43
     *
     * @constructor
     * @param {?string} [rootElementName]
     * @param {?(HTMLElement | string)} [rootElement]
     */
    constructor(rootElementName?: string, rootElement?: HTMLElement | string) { super(rootElementName, rootElement); }

    /**
     * Returns the Bootstrap Instance from MrbrBase.host, usually Window
     * @date 09/12/2022 - 03:09:38
     *
     * @public
     * @readonly
     * @type {unknown}
     */
    public get bootstrap(): any { return this.$mrbrInstance.host.bootstrap; }
}