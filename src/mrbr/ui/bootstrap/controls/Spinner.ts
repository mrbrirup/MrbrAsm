import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_Colours } from "../utilities/colours";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_SpinnerSizes } from "./SpinnerSizes";
import { Mrbr_UI_Bootstrap_Controls_SpinnerTypes } from "./SpinnerTypes";

/**
 * Boostrap Spinner Control
 * @date 11/12/2022 - 06:18:56
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_Spinner
 * @typedef {Mrbr_UI_Bootstrap_Controls_Spinner}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Controls_Spinner extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    
    /**
     * Internal Spinner Name
     * @date 11/12/2022 - 06:19:11
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SPINNER_NAME: string = "spinner";

    
    /**
     * Spinner Type Alias
     * @date 11/12/2022 - 06:19:25
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Spinner}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Spinner { return Mrbr_UI_Bootstrap_Controls_Spinner; }
    
    /**
     * Spinner Sizes Type Alias
     * @date 11/12/2022 - 06:19:39
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_SpinnerSizes}
     */
    public get $ss(): typeof Mrbr_UI_Bootstrap_Controls_SpinnerSizes { return this.$bsc.SpinnerSizes as typeof Mrbr_UI_Bootstrap_Controls_SpinnerSizes; }
    
    /**
     * Spinner Types Type Alias
     * @date 11/12/2022 - 06:19:54
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_SpinnerTypes}
     */
    public get $st(): typeof Mrbr_UI_Bootstrap_Controls_SpinnerTypes { return this.$bsc.SpinnerTypes as typeof Mrbr_UI_Bootstrap_Controls_SpinnerTypes; }
    
    /**
     * Bootstrap Utilities Colours Type Alias
     * @date 11/12/2022 - 06:20:00
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Utilities_Colours}
     */
    public get $buc(): typeof Mrbr_UI_Bootstrap_Utilities_Colours { return Mrbr_UI_Bootstrap_Utilities_Colours; }
    
    /**
     * Spinner Aria Text field
     * @date 11/12/2022 - 06:20:08
     *
     * @private
     * @type {string}
     */
    private _ariaText: string = "";
    
    /**
     * Spinner Colour field. Default to Current Text Colour
     * @date 11/12/2022 - 06:20:18
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Utilities_Colours}
     */
    private _colour: Mrbr_UI_Bootstrap_Utilities_Colours;
    
    /**
     * Spinner Type field
     * @date 11/12/2022 - 06:20:26
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_SpinnerTypes}
     */
    private _type: Mrbr_UI_Bootstrap_Controls_SpinnerTypes;
    
    /**
     * Spinner Size field
     * @date 11/12/2022 - 06:20:45
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_SpinnerSizes}
     */
    private _size: Mrbr_UI_Bootstrap_Controls_SpinnerSizes;
    
    /**
     * Spinner Aria Text property
     * @date 11/12/2022 - 06:20:56
     *
     * @public
     * @type {string}
     */
    public get ariaText(): string { return this._ariaText; }
    
    /**
     * Spinner Aria Text property
     */
    public set ariaText(value: string) {
        const root = this.rootElement,
            textContainer = root?.querySelector("span");
        (textContainer) && (textContainer.innerText = value);
        this._ariaText = value;
    }
    
    /**
     * Spinner Colour property
     * @date 11/12/2022 - 06:21:13
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Utilities_Colours}
     */
    public get colour(): Mrbr_UI_Bootstrap_Utilities_Colours { return this._colour; }
    
    /**
     * Spinner Colour property
     */
    public set colour(value: Mrbr_UI_Bootstrap_Utilities_Colours) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this._colour, value]));
        this._colour = value;
    }
    
    /**
     * Spinner Type property
     * @date 11/12/2022 - 06:21:33
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_SpinnerTypes}
     */
    public get type(): Mrbr_UI_Bootstrap_Controls_SpinnerTypes { return this._type ??= this.$st.border; }
    
    /**
     * Spinner Type property
     */
    public set type(value: Mrbr_UI_Bootstrap_Controls_SpinnerTypes) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this.type, value]));
        this._type = value;
    }
    
    /**
     * Spinner Size property
     * @date 11/12/2022 - 06:21:48
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_SpinnerSizes}
     */
    public get size(): Mrbr_UI_Bootstrap_Controls_SpinnerSizes { return this._size ??= this.$ss.default; }
    
    /**
     * Spinner Size property
     */
    public set size(value: Mrbr_UI_Bootstrap_Controls_SpinnerSizes) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this.size, value]));
        this._size = value;
    }
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Spinner.
     * @date 11/12/2022 - 06:22:05
     *
     * @constructor
     */
    constructor() {
        super();
    }
    
    /**
     * Spinner Size method to set the size of the spinner control - fluent interface
     * @date 11/12/2022 - 06:22:11
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_SpinnerSizes} size
     * @returns {Mrbr_UI_Bootstrap_Controls_Spinner}
     */
    public Size(size: Mrbr_UI_Bootstrap_Controls_SpinnerSizes): Mrbr_UI_Bootstrap_Controls_Spinner {
        this.size = size;
        return this;
    }
    
    /**
     * Spinner Type method to set the type of the spinner control - fluent interface
     * @date 11/12/2022 - 06:22:35
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_SpinnerTypes} type
     * @returns {Mrbr_UI_Bootstrap_Controls_Spinner}
     */
    public Type(type: Mrbr_UI_Bootstrap_Controls_SpinnerTypes): Mrbr_UI_Bootstrap_Controls_Spinner {
        this.type = type;
        return this;
    }
    
    /**
     * Spinner Colour method to set the colour of the spinner control - fluent interface
     * @date 11/12/2022 - 06:22:44
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Utilities_Colours} colour
     * @returns {Mrbr_UI_Bootstrap_Controls_Spinner}
     */
    public Colour(colour: Mrbr_UI_Bootstrap_Utilities_Colours): Mrbr_UI_Bootstrap_Controls_Spinner {
        this.colour = colour;
        return this;
    }
    
    /**
     * Spinner AriaText method to set the aria text of the spinner control - fluent interface
     * @date 11/12/2022 - 06:22:51
     *
     * @public
     * @param {string} ariaText
     * @returns {Mrbr_UI_Bootstrap_Controls_Spinner}
     */
    public AriaText(ariaText: string): Mrbr_UI_Bootstrap_Controls_Spinner {
        this.ariaText = ariaText;
        return this;
    }
    
    /**
     * Spinner Initialise method to initialise the spinner control, load manifest, set default config and set properties
     * @date 11/12/2022 - 06:23:02
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Spinner>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Spinner> {
        const self = this,
            cls = this.$cls,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(controlName);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(cls)
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, self.elementConfig.getConfig(cls.SPINNER_NAME)));
                self.colour = self.colour;
                self.type = self.type;
                self.size = self.size;
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error));
        return initialisePromise;
    }
    
    /**
     * Spinner SetDefaultConfig method to set the default config for the spinner control
     * @date 11/12/2022 - 06:23:55
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Spinner>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Spinner> {
        const self = this,
            cls = self.$cls,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(cls.name + ":setDefaultConfig");
        super.setDefaultConfig()
            .then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(cls.SPINNER_NAME, new self.$ctrlPrm()
                        .Properties({ role: "status" })
                        .Template("<span class='visually-hidden'></span>"))
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error));
        return setDefaultConfigPromise;
    }

}