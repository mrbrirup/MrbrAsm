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
    constructor(rootElementName?: string, rootElement?: HTMLElement | string) { super(rootElementName, rootElement); }
    public get bootstrap(): any { return this.$mrbrInstance.host.bootstrap; }
}