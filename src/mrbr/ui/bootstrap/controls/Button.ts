import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../utilities/buttonColours";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";

type typeButtonSizes = "sm" | "lg" | "";
type typeButtonTypes = "button" | "submit" | "reset";
type typeElementType = "button" | "a";
type typeToggleStates = "on" | "off";
export class Mrbr_UI_Bootstrap_Controls_Button extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Constants

    /**
     * Internal Name for Button
     * @date 11/11/2022 - 10:35:35
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly BUTTON_NAME: string = "button";

    /**
     * Internal Button Click Event Name
     * @date 11/11/2022 - 10:35:51
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CLICK_EVENT_NAME: string = "click";

    /**
     * Internal Button Toggle Event Name
     * @date 11/11/2022 - 10:36:12
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOGGLE_EVENT_NAME: string = "button_toggle";

    /**
     * Classes to set on a disabled button
     * @date 11/11/2022 - 10:36:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly DISABLED_CLASSES: string = "disabled pointer-events-none";
    //#endregion Public Static Constants
    //#region enums


    //#endregion enums
    //#region aliases

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Controls_Button 
     * @date 11/11/2022 - 10:38:41
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Button}
     */
    get $bsButton(): typeof Mrbr_UI_Bootstrap_Controls_Button { return Mrbr_UI_Bootstrap_Controls_Button; }



    /**
     * Type Alias for Mrbr_UI_Bootstrap_Utilities_ButtonColours
     * @date 15/01/2023 - 10:29:47
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Utilities_ButtonColours}
     */
    public get $bsButtonColours(): typeof Mrbr_UI_Bootstrap_Utilities_ButtonColours { return Mrbr_UI_Bootstrap_Utilities_ButtonColours; }


    //#endregion aliases
    //#region fields

    /**
     * The HRef for a link button
     * @date 11/11/2022 - 10:39:05
     *
     * @private
     * @type {string}
     */
    private _href: string = "";

    /**
     * TabIndex of the button. Used to cache value when button is disabled as tabindex is set to -1
     * @date 11/11/2022 - 10:39:26
     *
     * @private
     * @type {number}
     */
    private _tabIndex: number = null;

    /**
     * Set noWrap to the button text
     * @date 11/11/2022 - 10:40:02
     *
     * @private
     * @type {boolean}
     */
    private _noWrap: boolean = false;

    /**
     * Is button disabled
     * @date 11/11/2022 - 10:40:17
     *
     * @private
     * @type {boolean}
     */
    private _disabled: boolean = false;

    /**
     * Display button as outline, true, or solid, false
     * @date 11/11/2022 - 10:40:30
     *
     * @private
     * @type {boolean}
     */
    private _outline: boolean = false;

    /**
     * Is button a toggle button
     * @date 11/11/2022 - 10:40:59
     *
     * @private
     * @type {boolean}
     */
    private _isToggle: boolean = false;

    /**
     * Button Text, set textContent of button
     * @date 11/11/2022 - 10:41:12
     *
     * @private
     * @type {string}
     */
    private _buttonText: string = null;

    /**
     * Toggle state of the button
     * @date 11/11/2022 - 10:41:28
     *
     * @private
     * @type {typeToggleStates}
     */
    private _toggleState: typeToggleStates;

    /**
     * Colour of the button
     * @date 11/11/2022 - 10:41:41
     *
     * @private
     * @type {typeButtonColor}
     */
    private _colour: Mrbr_UI_Bootstrap_Utilities_ButtonColours;

    /**
     * Size of the button
     * @date 11/11/2022 - 10:41:50
     *
     * @private
     * @type {typeButtonSizes}
     */
    private _size: typeButtonSizes;

    /**
     * Type of the button. Must be set before initialising the control
     * @date 11/11/2022 - 10:42:15
     *
     * @private
     * @type {typeElementType}
     */
    private _elementType: typeElementType;

    /**
     * Button Element Type
     * @date 11/11/2022 - 10:42:30
     *
     * @private
     * @type {typeButtonTypes}
     */
    private _buttonType: typeButtonTypes;
    //#endregion fields

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Button.
     * @date 11/11/2022 - 10:42:42
     *
     * @constructor
     */
    constructor(buttonType: typeButtonTypes = "button", elementType: typeElementType = "button") {
        super();
        this._buttonType = buttonType;
        this._elementType = elementType;
    }


    //#region properties

    /**
     * Button Text, set textContent of button
     * @date 11/11/2022 - 10:42:50
     *
     * @public
     * @type {string}
     */
    public get text(): string { return this._buttonText; }

    /**
     * Button Text, set textContent of button
     */
    public set text(value: string) {
        const root = this.rootElement;
        (root && value) && (root.textContent = value);
        this._buttonText = value;
    }

    /**
     * Toggle state of the button. If isToggle is false, this will always be off
     * @date 11/11/2022 - 10:43:11
     *
     * @public
     * @type {typeToggleStates}
     */
    public get toggleState(): typeToggleStates { return this._toggleState; }

    /**
     * Toggle state of the button. If isToggle is false, this will always be off
     */
    public set toggleState(value: typeToggleStates) {
        const act = this.$clsActions;
        if (this.isToggle) {
            this.rootClasses((value === "on") ? act.add : act.remove, "active");
            this.rootAria({ pressed: value === "on" });
        }
        this._toggleState = value;
    }

    /**
     * Is Button a Toggle Button
     * @date 11/11/2022 - 10:43:56
     *
     * @public
     * @type {boolean}
     */
    public get isToggle(): boolean { return this._isToggle; }

    /**
     * Is Button a Toggle Button
     */
    public set isToggle(value: boolean) {
        const root = this.rootElement;
        this.rootAria({ pressed: value ? value : this.$ctrl.DELETE });
        this._isToggle = value;
        this.toggleState = this._toggleState;
    }

    /**
     * Button Size
     * @date 11/11/2022 - 11:10:15
     *
     * @public
     * @type {typeButtonSizes}
     */
    public get size(): typeButtonSizes { return this._size; }

    /**
     * Button Size
     */
    public set size(value: typeButtonSizes) {
        const
            act = this.$clsActions,
            classes = { lg: "btn-lg", sm: "btn-sm" };
        this.rootElement && Object.keys(classes).forEach(key => {
            if (key === this._size) this.rootClasses(act.remove, classes[key]);
            else if (key === value) this.rootClasses(act.add, classes[key]);
        });
        this._size = value;
    }

    /**
     * Button Element Type. Only for HTMLButtonElement not HTMLAnchorElement
     * @date 11/11/2022 - 10:44:17
     *
     * @public
     * @type {typeButtonTypes}
     */
    public get buttonType(): typeButtonTypes { return this._buttonType; }

    /**
     * Button Element Type. Only for HTMLButtonElement not HTMLAnchorElement
     */
    public set buttonType(value: typeButtonTypes) {
        this.rootAttributes({ type: value });
        this._buttonType = value;
    }

    /**
     * HTMLElement Type of the button
     * @date 11/11/2022 - 10:45:12
     *
     * @public
     * @type {typeElementType}
     */
    public get elementType(): typeElementType { return this._elementType; }

    /**
     * HTMLElement Type of the button
     */
    public set elementType(value: typeElementType) {
        if (!value) { return; }
        if (value && this._elementType !== value) {
            throw new Error("Cannot change elementType after initialisation");
        }
        this.rootAttributes({ role: (value === "a") ? "button" : this.$ctrl.DELETE });
        this._elementType = value;
    }

    /**
     * NoWarp for button text
     * @date 11/11/2022 - 10:45:41
     *
     * @public
     * @type {boolean}
     */
    public get noWrap(): boolean { return this._noWrap; }

    /**
     * NoWarp for button text
     */
    public set noWrap(value: boolean) {
        const act = this.$clsActions;
        this.rootClasses(value ? act.add : act.remove, "btn-no-wrap");
        this._noWrap = value;
    }

    /**
     * Button is outline style
     * @date 11/11/2022 - 10:46:06
     *
     * @public
     * @type {boolean}
     */
    public get outline(): boolean { return this._outline; }
    /**
     * Button is outline style
     */
    public set outline(value: boolean) {
        const colour = this.colour;
        this.rootClasses(this.$clsActions.remove, this.outlineColour(colour));
        this._outline = value;
        this.rootClasses(this.$clsActions.add, this.outlineColour(colour));
    }

    /**
     * Button is disabled
     * @date 11/11/2022 - 10:46:32
     *
     * @public
     * @type {boolean}
     */
    public get disabled(): boolean { return this._disabled; }

    /**
     * Button is disabled
     */
    public set disabled(value: boolean) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        this._disabled = value;
        if (!root) { return; }
        if (value) {
            this._tabIndex = root.tabIndex;
            root.tabIndex = -1;
            if (this.elementType === "a") {
                this._href = (<HTMLAnchorElement>root).href;
                (<HTMLAnchorElement>root).href = "";
            }
        }
        else {
            (this._tabIndex !== null) && (root.tabIndex = this._tabIndex);
            (this.elementType === "a") && ((<HTMLAnchorElement>root).href = this._href)
        }
        this.rootAttributes({ disabled: value ? "" : this.$ctrl.DELETE });
        this.rootClasses(value ? act.add : act.remove, this.$bsButton.DISABLED_CLASSES);
        this.rootAria({ disabled: value ? "true" : this.$ctrl.DELETE });
    }

    /**
     * Button Colour
     * @date 11/11/2022 - 10:46:52
     *
     * @public
     * @type {typeButtonColor}
     */
    public get colour(): Mrbr_UI_Bootstrap_Utilities_ButtonColours { return this._colour ??= Mrbr_UI_Bootstrap_Utilities_ButtonColours.primary; }

    /**
     * Button Colour
     */
    public set colour(value: Mrbr_UI_Bootstrap_Utilities_ButtonColours) {
        this.rootClasses(this.$clsActions.replace, [this.outlineColour(this.colour), this.outlineColour(value)]);
        this._colour = value;
    }

    private outlineColour(value: string): string {
        const arrColour = value.split("-");
        (this.outline) && (arrColour.splice(1, 0, "outline"));
        return arrColour.join("-");
    }


    //#endregion properties

    /**
     * Initialise the Button, load manifest and set properties
     * @date 11/11/2022 - 10:47:24
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Button>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Button> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsButton[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Button>(`${controlName}: initialise`);
        try {
            super.initialise(args).then(async _ => {
                await self.loadManifest(self.$bsButton);
                await self.setDefaultConfig({ controlName });
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.elementType, self.elementConfig.getConfig(self.$bsButton.BUTTON_NAME)));
                self.Colour(self.colour);
                self.Size(self.size);
                self.ButtonType(self.buttonType);
                self.Disabled(self.disabled);
                self.IsToggle(self.isToggle);
                self.NoWrap(self.noWrap);
                self.Outline(self.outline);
                self.ToggleState(self.toggleState);
                self.Text(self.text);

                self.elementType = self._elementType;
                initialisePromise.resolve(self);
            })
        } catch (error) { initialisePromise.reject(error); }
        return initialisePromise;
    }

    /**
     * Set the default configuration for the control
     * @date 11/11/2022 - 10:55:57
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Button>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Button> {
        const
            self = this,
            controlName = args?.find(arg => typeof arg === "object" && arg?.controlName)?.controlName ?? self.$bsButton[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Button>(`${controlName}:setDefaultConfig`);
        try {
            super.setDefaultConfig().then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$bsButton.BUTTON_NAME, new self.$ctrlPrm()
                        .Classes("btn"));
                setDefaultConfigPromise.resolve(self);
            })
        } catch (error) { setDefaultConfigPromise.reject(error); }
        return setDefaultConfigPromise;
    }
    //#region event handlers

    /**
     * Handle the click event
     * @date 11/11/2022 - 10:56:12
     *
     * @public
     * @param {(MouseEvent | TouchEvent)} event
     */
    public buttonClick_handler(event: MouseEvent | TouchEvent): void {
        event.stopPropagation();
        event.preventDefault();
        this.eventSubscribers.raise(this.$bsButton.CLICK_EVENT_NAME, new Mrbr_System_Events_Event(this.$bsButton.CLICK_EVENT_NAME, this));
    }

    /**
     * Handle the toggle event
     * @date 11/11/2022 - 10:56:25
     *
     * @public
     * @param {(MouseEvent | TouchEvent)} event
     */
    public buttonToggle_handler(event: MouseEvent | TouchEvent): void {
        this.toggleState = (this.toggleState === "on") ? "off" : "on";

        event.stopPropagation();
        event.preventDefault();

        this.eventSubscribers.raise(this.$bsButton.TOGGLE_EVENT_NAME, new Mrbr_System_Events_Event(this.$bsButton.TOGGLE_EVENT_NAME, this, { toggleState: this.toggleState }));
    }

    /**
     * Subscribe to the click event and add eventlistener if not set
     * @date 11/11/2022 - 10:56:35
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} callback
     * @returns {number}
     */
    public onClick(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        const eventName = this.$bsButton.CLICK_EVENT_NAME;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.buttonClick_handler,
            this,
            callback
        );
    }

    /**
     * Subscribe to the toggle event and add eventlistener if not set.
     * Listens to HTMLButtonElement Click Event, but raises a toggle event from the ButtonControl
     * @date 11/11/2022 - 10:56:59
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} callback
     * @returns {number}
     */
    public onToggle(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        const
            toggleEventName = this.$bsButton.TOGGLE_EVENT_NAME,
            clickEventName = this.$bsButton.CLICK_EVENT_NAME;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(toggleEventName, callback);
            return null;
        }

        this.addDeferredOnMountFn(
            toggleEventName,
            clickEventName,
            this.rootElement,
            this.buttonToggle_handler,
            this,
            callback
        );
    }

    /**
     * Toggles Button using Bootstrap Toggle Method
     * @date 11/11/2022 - 13:02:51
     *
     * @public
     */
    public toggle(): void {
        this.bootstrap.Button.getOrCreateInstance(this.rootElement)?.toggle();
    }


    /**
     * Dispose of button and Bootstrap button instance
     * @date 11/11/2022 - 13:09:10
     *
     * @public
     */
    public dispose(): void {
        this.bootstrap.Button.getOrCreateInstance(this.rootElement)?.dispose();
        super.dispose();
    }
    //#endregion event handlers


    /**
     * Set the button colour, using Bootstrap Button Colours, fluent interface
     * @date 15/01/2023 - 10:40:44
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Utilities_ButtonColours} value
     * @returns {this}
     */
    public Colour(value: Mrbr_UI_Bootstrap_Utilities_ButtonColours): this {
        this.colour = value;
        return this;
    }

    /**
     * Set the button size, using Bootstrap Button Sizes, fluent interface
     * @date 15/01/2023 - 10:41:04
     *
     * @public
     * @param {typeButtonSizes} value
     * @returns {this}
     */
    public Size(value: typeButtonSizes): this {
        this.size = value;
        return this;
    }


    /**
     * Set the button type, fluent interface
     * @date 15/01/2023 - 10:57:10
     *
     * @public
     * @param {typeButtonTypes} value
     * @returns {this}
     */
    public ButtonType(value: typeButtonTypes): this {
        this.buttonType = value;
        return this;
    }

    /**
     * Set the button disabled state, fluent interface
     * @date 15/01/2023 - 10:57:24
     *
     * @public
     * @param {boolean} value
     * @returns {this}
     */
    public Disabled(value: boolean): this {
        this.disabled = value;
        return this;
    }

    /**
     * Set the button toggle state, fluent interface
     * @date 15/01/2023 - 10:57:32
     *
     * @public
     * @param {boolean} value
     * @returns {this}
     */
    public IsToggle(value: boolean): this {
        this.isToggle = value;
        return this;
    }

    /**
     * Set the button noWrap state, fluent interface
     * @date 15/01/2023 - 10:57:38
     *
     * @public
     * @param {boolean} value
     * @returns {this}
     */
    public NoWrap(value: boolean): this {
        this.noWrap = value;
        return this;
    }

    /**
     * Set the button outline state, fluent interface
     * @date 15/01/2023 - 10:57:46
     *
     * @public
     * @param {boolean} value
     * @returns {this}
     */
    public Outline(value: boolean): this {
        this.outline = value;
        return this;
    }

    /**
     * Set the button toggle state, fluent interface
     * @date 15/01/2023 - 10:57:54
     *
     * @public
     * @param {typeToggleStates} value
     * @returns {this}
     */
    public ToggleState(value: typeToggleStates): this {
        this.toggleState = value;
        return this;
    }

    /**
     * Set the button text, fluent interface
     * @date 15/01/2023 - 10:58:00
     *
     * @public
     * @param {string} value
     * @returns {this}
     */
    public Text(value: string): this {
        this.text = value;
        return this;
    }
}