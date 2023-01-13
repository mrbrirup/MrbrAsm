import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
type typeButtonColor = typeof Mrbr_UI_Bootstrap_Controls_Button.buttonColours[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.buttonColours];
type typeButtonSize = typeof Mrbr_UI_Bootstrap_Controls_Button.buttonSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.buttonSizes];
type typeButtonType = typeof Mrbr_UI_Bootstrap_Controls_Button.buttonTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.buttonTypes];
type typeElementType = typeof Mrbr_UI_Bootstrap_Controls_Button.elementTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.elementTypes];
type typeToggleState = typeof Mrbr_UI_Bootstrap_Controls_Button.toggleStates[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.toggleStates];
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
    public static readonly CLICK_EVENT_NAME: string = "button_click";

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

    /**
     * Button Element Types
     * @date 11/11/2022 - 10:36:56
     *
     * @public
     * @static
     * @type {{ readonly button: "button"; readonly submit: "submit"; readonly reset: "reset"; }}
     */
    public static buttonTypes = {
        button: "button",
        submit: "submit",
        reset: "reset"
    } as const;

    /**
     * Element Type to Use for a Button. Must eb set before intialising the control
     * @date 11/11/2022 - 10:37:13
     *
     * @public
     * @static
     * @type {{ readonly button: "button"; readonly link: "a"; }}
     */
    public static elementTypes = {
        button: "button",
        link: "a"
    } as const;

    /**
     * Button Sizes 
     * @date 11/11/2022 - 10:37:26
     *
     * @public
     * @static
     * @type {{ readonly large: "btn-lg"; readonly small: "btn-sm"; readonly default: ""; }}
     */
    public static buttonSizes = {
        large: "btn-lg",
        small: "btn-sm",
        default: ""
    } as const

    /**
     * The colour for the button
     * @date 11/11/2022 - 10:37:57
     *
     * @public
     * @static
     * @type {{ readonly primary: "primary"; readonly secondary: "secondary"; readonly success: "success"; readonly danger: "danger"; readonly warning: "warning"; readonly info: "info"; readonly light: "light"; readonly dark: "dark"; readonly link: "link"; }}
     */
    public static buttonColours = {
        primary: "primary",
        secondary: "secondary",
        success: "success",
        danger: "danger",
        warning: "warning",
        info: "info",
        light: "light",
        dark: "dark",
        link: "link"
    } as const;

    /**
     * Toggle state for the button when isToggle is true
     * @date 11/11/2022 - 10:38:10
     *
     * @public
     * @static
     * @type {{ readonly on: "on"; readonly off: "off"; }}
     */
    public static toggleStates = {
        on: "on",
        off: "off"
    } as const
    //#endregion enums
    //#region aliases

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Controls_Button 
     * @date 11/11/2022 - 10:38:41
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Button}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Button { return Mrbr_UI_Bootstrap_Controls_Button; }
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
     * @type {typeToggleState}
     */
    private _toggleState: typeToggleState = this.$cls.toggleStates.off;

    /**
     * Colour of the button
     * @date 11/11/2022 - 10:41:41
     *
     * @private
     * @type {typeButtonColor}
     */
    private _colour: typeButtonColor = this.$cls.buttonColours.primary;

    /**
     * Size of the button
     * @date 11/11/2022 - 10:41:50
     *
     * @private
     * @type {typeButtonSize}
     */
    private _size: typeButtonSize = this.$cls.buttonSizes.default;

    /**
     * Type of the button. Must be set before initialising the control
     * @date 11/11/2022 - 10:42:15
     *
     * @private
     * @type {typeElementType}
     */
    private _elementType: typeElementType = this.$cls.elementTypes.button;

    /**
     * Button Element Type
     * @date 11/11/2022 - 10:42:30
     *
     * @private
     * @type {typeButtonType}
     */
    private _buttonType: typeButtonType = this.$cls.buttonTypes.button;
    //#endregion fields

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Button.
     * @date 11/11/2022 - 10:42:42
     *
     * @constructor
     */
    constructor() {
        super();        
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
     * @type {typeToggleState}
     */
    public get toggleState(): typeToggleState { return this._toggleState; }

    /**
     * Toggle state of the button. If isToggle is false, this will always be off
     */
    public set toggleState(value: typeToggleState) {
        const root = this.rootElement,
            act = this.$clsActions,
            states = this.$cls.toggleStates;

        this._toggleState = value;
        if (!root || !this.isToggle) { return; }
        this.classes(root, (value === states.on) ? act.add : act.remove, "active");
        this.aria(root, { pressed: value === states.on });
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
        (root && !value) && this.aria(root, { pressed: this.$ctrl.DELETE });
        this._isToggle = value;
        this.toggleState = this._toggleState;
    }

    /**
     * Button Size
     * @date 11/11/2022 - 11:10:15
     *
     * @public
     * @type {typeButtonSize}
     */
    public get size(): typeButtonSize { return this._size; }

    /**
     * Button Size
     */
    public set size(value: typeButtonSize) {
        const root = this.rootElement,
            act = this.$clsActions;
        if (!root) { this._size = value; return; }
        this.classes(root, act.remove, this.size)
        this.classes(root, act.add, value)
        this._size = value;
    }

    /**
     * Button Element Type. Only for HTMLButtonElement not HTMLAnchorElement
     * @date 11/11/2022 - 10:44:17
     *
     * @public
     * @type {typeButtonType}
     */
    public get buttonType(): typeButtonType { return this._buttonType; }

    /**
     * Button Element Type. Only for HTMLButtonElement not HTMLAnchorElement
     */
    public set buttonType(value: typeButtonType) {
        const root = this.rootElement;
        root && this.attributes(root, { type: value });
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
        const root = this.rootElement;
        root && this.attributes(root, { role: (value === this.$cls.elementTypes.link) ? "button" : this.$ctrl.DELETE });
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
        const root = this.rootElement,
            act = this.$clsActions;
        root && this.classes(root, value ? act.add : act.remove, "btn-no-wrap");
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
        const root = this.rootElement;
        root && (_ => {
            this.classes(root, this.$clsActions.remove, `btn-${(this._outline ? "outline-" : "")}${this._colour}`);
            this.classes(root, this.$clsActions.add, `btn-${(value ? "outline-" : "")}${this._colour}`);
        })()
        this._outline = value;
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
            if (this.elementType === this.$cls.elementTypes.link) {
                this._href = (<HTMLAnchorElement>root).href;
                (<HTMLAnchorElement>root).href = "";
            }
        }
        else {
            (this._tabIndex !== null) && (root.tabIndex = this._tabIndex);
            (this.elementType === this.$cls.elementTypes.link) && ((<HTMLAnchorElement>root).href = this._href)
        }
        this.attributes(root, { disabled: value ? "" : this.$ctrl.DELETE });
        this.classes(root, value ? act.add : act.remove, this.$cls.DISABLED_CLASSES);
        this.aria(root, { disabled: value ? "true" : this.$ctrl.DELETE });
    }

    /**
     * Button Colour
     * @date 11/11/2022 - 10:46:52
     *
     * @public
     * @type {typeButtonColor}
     */
    public get colour(): typeButtonColor { return this._colour; }

    /**
     * Button Colour
     */
    public set colour(value: typeButtonColor) {
        const root = this.rootElement;
        if (!root) { this._colour = value; return; }
        this.classes(root, this.$clsActions.remove, `btn-${(this.outline ? "outline-" : "")}${this._colour}`);
        this.classes(root, this.$clsActions.add, `btn-${(this.outline ? "outline-" : "")}${value}`);
        this._colour = value;

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
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Button>(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:initialise`);
        try {
            super.initialise(args).then(async _ => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.elementType, self.elementConfig.get(self.$cls.BUTTON_NAME)));
                self.colour = self._colour;
                self.size = self._size;
                self.buttonType = self._buttonType;
                self.elementType = self._elementType;
                self.disabled = self._disabled;
                self.isToggle = self._isToggle;
                self.noWrap = self._noWrap;
                self.outline = self._outline;
                self.toggleState = self._toggleState;
                self.text = self._buttonText;
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
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Button> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Button>(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:setDefaultConfig`);
        try {
            super.setDefaultConfig().then(_ => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
                    .setIfNotExist(self.$cls.BUTTON_NAME, new self.$ctrlPrm()
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
        this.eventSubscribers.raise(this.$cls.CLICK_EVENT_NAME, new Mrbr_System_Events_Event(this.$cls.CLICK_EVENT_NAME, this));
    }

    /**
     * Handle the toggle event
     * @date 11/11/2022 - 10:56:25
     *
     * @public
     * @param {(MouseEvent | TouchEvent)} event
     */
    public buttonToggle_handler(event: MouseEvent | TouchEvent): void {
        const ts = this.$cls.toggleStates;
        this.toggleState = (this.toggleState === ts.on) ? ts.off : ts.on;
        this.eventSubscribers.raise(this.$cls.TOGGLE_EVENT_NAME, new Mrbr_System_Events_Event(this.$cls.TOGGLE_EVENT_NAME, this, { toggleState: this.toggleState }));
    }

    /**
     * Subscribe to the click event and add eventlistener if not set
     * @date 11/11/2022 - 10:56:35
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} callback
     * @returns {number}
     */
    public onClick(callback: (event: Mrbr_System_Events_Event<any>) => void): number {
        (!this.events.has(this.$cls.CLICK_EVENT_NAME)) && this.events.addEventHandler(new Mrbr_System_Events_EventHandler(
            "click",
            this.rootElement,
            this.buttonClick_handler,
            this
        ));
        return this.eventSubscribers.add(this.$cls.CLICK_EVENT_NAME, callback);
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
    public onToggle(callback: (event: Mrbr_System_Events_Event<any>) => void): number {
        (!this.events.has(this.$cls.TOGGLE_EVENT_NAME)) && this.events.add(this.$cls.TOGGLE_EVENT_NAME, new Mrbr_System_Events_EventHandler(
            "click",
            this.rootElement,
            this.buttonToggle_handler,
            this
        ));
        return this.eventSubscribers.add(this.$cls.TOGGLE_EVENT_NAME, callback);
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
}