
/**
 * ProgressBar Class. Internal Element with progress values for Progress control
 * @date 10/12/2022 - 07:25:15
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ProgressBar
 * @typedef {Mrbr_UI_Bootstrap_Controls_ProgressBar}
 */
export class Mrbr_UI_Bootstrap_Controls_ProgressBar {

    /**
     * ProgressBar name
     * @date 10/12/2022 - 07:26:08
     *
     * @private
     * @type {string}
     */
    private _name: string;

    /**
     * ProgressBar HtmlElement hosted in Progress control
     * @date 10/12/2022 - 07:26:20
     *
     * @private
     * @type {HTMLElement}
     */
    private _element: HTMLElement;

    /**
     * ProgressBar Minimum Value
     * @date 10/12/2022 - 07:26:41
     *
     * @private
     * @type {number}
     */
    private _minValue: number = 0;

    /**
     * ProgressBar Maximum Value
     * @date 10/12/2022 - 07:26:48
     *
     * @private
     * @type {number}
     */
    private _maxValue: number = 100;

    /**
     * ProgressBar Current Value
     * @date 10/12/2022 - 07:26:55
     *
     * @private
     * @type {number}
     */
    private _progress: number = 0;

    /**
     * ProgressBar Weight for Multiple ProgressBars in a single Progress control
     * @date 10/12/2022 - 07:27:03
     *
     * @private
     * @type {number}
     */
    private _weight: number = 1.0;

    /**
     * ProgressBar Text
     * @date 10/12/2022 - 07:27:22
     *
     * @private
     * @type {string}
     */
    private _text: string = "";

    /**
     * ProgressBar Css Classes. Space Separated List
     * @date 10/12/2022 - 07:27:29
     *
     * @private
     * @type {string}
     */
    private _classes: string = "";

    /**
     * ProgressBar onProgress callback function for progress change
     * @date 10/12/2022 - 07:27:47
     *
     * @private
     * @type {(Mrbr_UI_Bootstrap_Controls_ProgressBar) => void}
     */
    private _onProgress: (Mrbr_UI_Bootstrap_Controls_ProgressBar) => void;

    /**
     * ProgressBar Weighted Progress
     * @date 10/12/2022 - 07:28:01
     *
     * @private
     * @type {number}
     */
    private _weightedProgress: number = 0;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ProgressBar.
     * @date 10/12/2022 - 07:25:54
     *
     * @constructor
     * @param {string} name
     */
    constructor(name: string) {
        const self = this;
        self._name = name;
        self._element = document.createElement("div");
        self.MaxValue(self.maxValue);
        self.MinValue(self.minValue);
        self.Progress(self.progress);
        self.Weight(self.weight);
        self.Text(self.text);
        self.Classes(self.classes);
    }

    /**
     * ProgressBar Name
     * @date 10/12/2022 - 07:28:27
     *
     * @public
     * @type {string}
     */
    public get name(): string { return this._name; }

    /**
     * ProgressBar Name
     */
    public set name(value: string) { this._name = value; }

    /**
     * ProgressBar HtmlElement hosted in Progress control
     * @date 10/12/2022 - 07:28:36
     *
     * @public
     * @type {HTMLElement}
     */
    public get element(): HTMLElement { return this._element; }

    /**
     * ProgressBar HtmlElement hosted in Progress control
     */
    public set element(value: HTMLElement) { this._element = value; }

    /**
     * ProgressBar Css Classes. Space Separated List
     * @date 10/12/2022 - 07:28:51
     *
     * @public
     * @type {string}
     */
    public get classes(): string { return this._classes; }

    /**
     * ProgressBar Css Classes. Space Separated List
     */
    public set classes(value: string) {
        const bgc = this._classes?.trim(),
            val = value?.trim(),
            cl = this.element.classList,
            tog = cl.toggle.bind(cl);
        bgc && bgc.split(" ").forEach(className => { tog(className, false); });
        val && val.split(" ").forEach(className => { tog(className, true); });
        this._classes = value;
    }

    /**
     * ProgressBar Minimum Value
     * @date 10/12/2022 - 07:29:18
     *
     * @public
     * @type {number}
     */
    public get minValue(): number { return this._minValue; }

    /**
     * ProgressBar Minimum Value
     */
    public set minValue(value: number) {
        this._minValue = value;
        this.element.setAttribute("aria-valuemin", `${value}`);
    }

    /**
     * ProgressBar Maximum Value
     * @date 10/12/2022 - 07:29:35
     *
     * @public
     * @type {number}
     */
    public get maxValue(): number { return this._maxValue; }

    /**
     * ProgressBar Maximum Value
     */
    public set maxValue(value: number) {
        this._maxValue = value;
        this.element.setAttribute("aria-valuemax", `${value}`);
    }

    /**
     * ProgressBar Current Value. Defines the width of the ProgressBar, in percentage value / (maxValue - minValue) or 100% if maxValue = minValue
     * @date 10/12/2022 - 07:29:48
     *
     * @public
     * @type {number}
     */
    public get progress(): number { return this._progress; }

    /**
     * ProgressBar Current Value
     */
    public set progress(value: number) {
        if (value < this.minValue) { value = this.minValue; }
        if (value > this.maxValue) { value = this.maxValue; }
        const element = this.element;
        this._progress = value;
        element.setAttribute("aria-valuenow", `${value}`);
        let denom = this.maxValue - this.minValue,
            width = (denom > 0) ? ((value / denom)) : this.maxValue;
        element.style.width = `${width * 100 * this.weight}%`;
        this._weightedProgress = width * this.weight;
        this._onProgress && this._onProgress(this);
    }

    /**
     * ProgressBar Weighted Progress, progrees * weight; 
     * @date 10/12/2022 - 07:30:04
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get weightedProgress(): number { return this._weightedProgress; }

    /**
     * ProgressBar Weight. 1.0 = 100% of parent width
     * @date 10/12/2022 - 07:30:41
     *
     * @public
     * @type {number}
     */
    public get weight(): number { return this._weight; }

    /**
     * ProgressBar Weight. 1.0 = 100% of parent width
     */
    public set weight(value: number) { this._weight = value; }

    /**
     * ProgressBar Text
     * @date 10/12/2022 - 07:31:01
     *
     * @public
     * @type {string}
     */
    public get text(): string { return this._text; }

    /**
     * ProgressBar Text
     */
    public set text(value: string) {
        this._text = value;
        this.element.innerText = value;
    }

    /**
     * ProgressBar set MinValue - fluent interface
     * @date 10/12/2022 - 07:31:22
     *
     * @public
     * @param {number} value
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public MinValue(value: number): Mrbr_UI_Bootstrap_Controls_ProgressBar {
        this.minValue = value;
        return this;
    }

    /**
     * ProgressBar set MaxValue - fluent interface
     * @date 10/12/2022 - 07:31:47
     *
     * @public
     * @param {number} value
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public MaxValue(value: number): Mrbr_UI_Bootstrap_Controls_ProgressBar {
        this.maxValue = value;
        return this;
    }

    /**
     * ProgressBar set Progress - fluent interface
     * @date 10/12/2022 - 07:31:55
     *
     * @public
     * @param {number} value
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public Progress(value: number): Mrbr_UI_Bootstrap_Controls_ProgressBar {
        this.progress = value;
        return this;
    }

    /**
     * ProgressBar set Weight - fluent interface
     * @date 10/12/2022 - 07:32:02
     *
     * @public
     * @param {number} value
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public Weight(value: number): Mrbr_UI_Bootstrap_Controls_ProgressBar {
        this.weight = value;
        return this;
    }

    /**
     * ProgressBar set Text - fluent interface
     * @date 10/12/2022 - 07:32:12
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public Text(value: string): Mrbr_UI_Bootstrap_Controls_ProgressBar {
        this.text = value;
        return this;
    }

    /**
     * ProgressBar set Classes - fluent interface
     * @date 10/12/2022 - 07:32:20
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public Classes(value: string): Mrbr_UI_Bootstrap_Controls_ProgressBar {
        this.classes = value;
        return this;
    }

    /**
     * ProgressBar set onProgress callback - fluent interface
     * @date 10/12/2022 - 07:32:27
     *
     * @public
     * @param {(Mrbr_UI_Bootstrap_Controls_ProgressBar) => void} value
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public onProgress(value: (Mrbr_UI_Bootstrap_Controls_ProgressBar) => void): Mrbr_UI_Bootstrap_Controls_ProgressBar {
        this._onProgress = value;
        return this;
    }
}