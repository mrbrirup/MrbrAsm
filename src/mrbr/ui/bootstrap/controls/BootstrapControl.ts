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
     * Alias Mrbr.UI.Bootstrap.Controls Namespace
     * @date 03/12/2022 - 17:19:58
     *
     * @public
     * @readonly
     * @type {*}
     */
    public get $bsc(): any { return this[Symbol.for("Mrbr.UI.Bootstrap.Controls")] ??= this.$mrbrInstance.host["Mrbr"].UI.Bootstrap.Controls; }


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_BootstrapControl.
     * @date 09/12/2022 - 03:08:43
     *
     * @constructor
     * @param {?(HTMLElement | string)} [rootElement]
     */
    constructor() { super(); }

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