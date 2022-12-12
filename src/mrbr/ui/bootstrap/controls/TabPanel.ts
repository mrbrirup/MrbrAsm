
/**
 * TabPanel Class
 * @date 12/12/2022 - 09:16:02
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_TabPanel
 * @typedef {Mrbr_UI_Bootstrap_Controls_TabPanel}
 */
export class Mrbr_UI_Bootstrap_Controls_TabPanel {

    /**
     * TabPanel Name field
     * @date 12/12/2022 - 09:17:40
     *
     * @private
     * @type {string}
     */
    private _name: string;

    /**
     * TabPanel Panel field
     * @date 12/12/2022 - 09:18:05
     *
     * @private
     * @type {HTMLDivElement}
     */
    private _panel: HTMLDivElement;

    /**
     * TabPanel Tab field
     * @date 12/12/2022 - 09:18:12
     *
     * @private
     * @type {HTMLButtonElement}
     */
    private _tab: HTMLButtonElement;

    /**
     * TabPanel Disabled field
     * @date 12/12/2022 - 09:18:20
     *
     * @private
     * @type {boolean}
     */
    private _disabled: boolean;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_TabPanel.
     * @date 12/12/2022 - 09:17:30
     *
     * @constructor
     * @param {string} name
     * @param {HTMLButtonElement} tab
     * @param {HTMLDivElement} panel
     */
    constructor(name: string, tab: HTMLButtonElement, panel: HTMLDivElement) {
        this._name = name;
        this._panel = panel;
        this._tab = tab;
    }

    /**
     * TabPanel Name property
     * @date 12/12/2022 - 09:18:27
     *
     * @public
     * @type {string}
     */
    public get name(): string { return this._name; }

    /**
     * TabPanel Name property
     */
    public set name(value: string) { this._name = value; }

    /**
     * TabPanel Panel HTMLElement property
     * @date 12/12/2022 - 09:18:41
     *
     * @public
     * @type {HTMLDivElement}
     */
    public get panel(): HTMLDivElement { return this._panel; }

    /**
     * TabPanel Panel HTMLElement property
     */
    public set panel(value: HTMLDivElement) { this._panel = value; }

    /**
     * TabPanel Tab HTMLElement property
     * @date 12/12/2022 - 09:18:57
     *
     * @public
     * @type {HTMLButtonElement}
     */
    public get tab(): HTMLButtonElement { return this._tab; }

    /**
     * TabPanel Tab HTMLElement property
     */
    public set tab(value: HTMLButtonElement) { this._tab = value; }

    /**
     * TabPanel Disabled property
     * @date 12/12/2022 - 09:19:10
     *
     * @public
     * @type {boolean}
     */
    public get disabled(): boolean { return this._disabled; }

    /**
     * TabPanel Disabled property
     */
    public set disabled(value: boolean) {
        const tab = this.tab;
        if (tab) {
            if (value) { tab.setAttribute("disabled", value.toString()) }
            else { tab.removeAttribute("disabled"); }
        }
        this._disabled = value;
    }
}