import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
type typeButtonColor = typeof Mrbr_UI_Bootstrap_Controls_Button.buttonColours[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.buttonColours];
type typeButtonSize = typeof Mrbr_UI_Bootstrap_Controls_Button.buttonSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.buttonSizes];
type typeButtonType = typeof Mrbr_UI_Bootstrap_Controls_Button.buttonTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.buttonTypes];
type typeElementType = typeof Mrbr_UI_Bootstrap_Controls_Button.elementTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.elementTypes];
type typeToggleState = typeof Mrbr_UI_Bootstrap_Controls_Button.toggleStates[keyof typeof Mrbr_UI_Bootstrap_Controls_Button.toggleStates];
export class Mrbr_UI_Bootstrap_Controls_Button extends Mrbr_UI_Controls_Control {
    public static readonly BUTTON_NAME: string = "button";
    public static readonly CLICK_EVENT_NAME: string = "button_click";
    public static readonly TOGGLE_EVENT_NAME: string = "button_toggle";
    public static readonly DISABLED_CLASSES: string = "disabled pointer-events-none";

    //#region enums
    public static buttonTypes = {
        button: "button",
        submit: "submit",
        reset: "reset"
    } as const;
    public static elementTypes = {
        button: "button",
        link: "a"
    } as const;
    public static buttonSizes = {
        large: "btn-lg",
        small: "btn-sm",
        default: ""
    } as const
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
    public static toggleStates = {
        on: "on",
        off: "off"
    } as const
    //#endregion enums
    //#region aliases
    $cls = Mrbr_UI_Bootstrap_Controls_Button;
    //#endregion aliases
    //#region fields
    private _href: string = "";
    private _tabIndex: string = null;
    private _noWrap: boolean = false;
    private _disabled: boolean = false;
    private _outline: boolean = false;
    private _isToggle: boolean = false;
    private _buttonText: string = null;
    private _toggleState: typeToggleState = this.$cls.toggleStates.off;
    private _colour: typeButtonColor = this.$cls.buttonColours.primary;
    private _size: typeButtonSize = this.$cls.buttonSizes.default;
    private _elementType: typeElementType = this.$cls.elementTypes.button;
    private _buttonType: typeButtonType = this.$cls.buttonTypes.button;
    //#endregion fields

    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = rootElementName;
    }


    //#region properties
    public get text(): string {
        return this._buttonText;
    }
    public set text(value: string) {
        const self = this,
            root = self.rootElement;
        if (root && value) { root.textContent = value; }
        this._buttonText = value;
    }
    public get toggleState(): typeToggleState {
        return this._toggleState;
    }
    public set toggleState(value: typeToggleState) {
        const self = this,
            root = self.rootElement;
        if (root && self.isToggle) {
            self.classes(root,
                value === self.$cls.toggleStates.on ? self.$clsActions.Add : self.$clsActions.Remove,
                "active");
            self.aria(root, { pressed: value === self.$cls.toggleStates.on });
        }
        this._toggleState = value;
    }
    public get isToggle(): boolean {
        return this._isToggle;
    }
    public set isToggle(value: boolean) {
        const self = this,
            root = self.rootElement;
        //(self.rootElement) && self.dataset(self.rootElement, { bsToggle: value ? "button" : Mrbr_UI_Controls_Control.DELETE });
        (root && !value) && self.aria(root, { pressed: self.$ctrl.DELETE });
        self._isToggle = value;
        self.toggleState = this._toggleState;
    }
    public get size(): typeButtonSize {
        return this._size;
    }
    public set size(value: typeButtonSize) {
        const self = this,
            root = self.rootElement;
        root && self.classes(root,
            self.$clsActions.Swap,
            [self.size, value]);
        this._size = value;
    }
    public get buttonType(): typeButtonType {
        return this._buttonType;
    }
    public set buttonType(value: typeButtonType) {
        const self = this,
            root = self.rootElement;
        root && self.attributes(root, { type: value });
        this._buttonType = value;
    }
    public get elementType(): typeElementType {
        return this._elementType;
    }
    public set elementType(value: typeElementType) {
        const self = this,
            root = self.rootElement;
        root && self.attributes(root, {
            role: (value === self.$cls.elementTypes.link) ? "button" : self.$ctrl.DELETE
        });
        this._elementType = value;
    }
    public get noWrap(): boolean {
        return this._noWrap;
    }

    public set noWrap(value: boolean) {
        const self = this,
            root = self.rootElement;
        root &&
            self.classes(root, value ? self.$clsActions.Add : self.$clsActions.Remove, "btn-no-wrap");
        self._noWrap = value;
    }
    public get outline(): boolean {
        return this._outline;
    }
    public set outline(value: boolean) {
        const self = this,
            root = self.rootElement;
        root && (_ => {
            self.classes(root, self.$clsActions.Remove, `btn-${(self._outline ? "outline-" : "")}${self._colour}`);
            self.classes(root, self.$clsActions.Add, `btn-${(value ? "outline-" : "")}${self._colour}`);
        })()
        this._outline = value;
    }
    public get disabled(): boolean {
        return this._disabled;
    }
    public set disabled(value: boolean) {
        const self = this,
            root = self.rootElement;
        if (root) {
            if (value) {
                if (root.hasAttribute("tabIndex")) {
                    this._tabIndex = root.getAttribute("tabIndex");
                    self.attributes(root, { tabIndex: "-1" });
                }
                self.attributes(root, { disabled: "" });
                self.classes(root, self.$clsActions.Add, self.$cls.DISABLED_CLASSES);
                self.aria(root, { disabled: "true" });
                if (self.elementType === self.$cls.elementTypes.link) {
                    self._href = (<HTMLAnchorElement>root).href;
                    (<HTMLAnchorElement>root).href = "";
                }
            }
            else {
                self._tabIndex && self.attributes(root, { tabIndex: self._tabIndex });
                self.attributes(root, { disabled: self.$ctrl.DELETE });
                self.classes(root, self.$clsActions.Remove, self.$cls.DISABLED_CLASSES);
                self.aria(root, { disabled: self.$ctrl.DELETE });
                if (self.elementType === self.$cls.elementTypes.link) {
                    (<HTMLAnchorElement>root).href = self._href;
                }

            }
        }
        this._disabled = value;
    }
    public get colour(): typeButtonColor {
        return this._colour;
    }
    public set colour(value: typeButtonColor) {
        const self = this,
            root = self.rootElement;
        root && (_ => {
            self.classes(root, self.$clsActions.Remove, `btn-${(self.outline ? "outline-" : "")}${self._colour}`);
            self.classes(root, self.$clsActions.Add, `btn-${(self.outline ? "outline-" : "")}${value}`);
        })()
        self._colour = value;

    }
    //#endregion properties

    initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Button> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Button>("Mrbr_UI_Bootstrap_Controls_Button:initialise");
        super.initialise(...args)
            .then(() => {
                self.$mrbr.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(_ => {

                        self.createElement(new self.$ctrlCfg(self.rootElementName, self.elementType, new self.$ctrlPrm().Classes("btn")));
                        self.events[self.$cls.CLICK_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
                            eventName: "click",
                            eventTarget: self.rootElement,
                            event: self.buttonClick_handler,
                            context: self
                        };
                        self.text = self._buttonText;
                        self.colour = self._colour;
                        self.size = self._size;
                        self.buttonType = self._buttonType;
                        self.elementType = self._elementType;
                        self.disabled = self._disabled;
                        self.isToggle = self._isToggle;
                        self.noWrap = self._noWrap;
                        self.outline = self._outline;
                        self.toggleState = self._toggleState;
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }
    //#region event handlers
    protected buttonClick_handler(event: MouseEvent | TouchEvent): void {
        const self = this;
        if (self.isToggle) {
            self.toggleState = self.toggleState === self.$cls.toggleStates.on ? self.$cls.toggleStates.off : self.$cls.toggleStates.on;
            self.dispatchEvent(new CustomEvent(self.$cls.TOGGLE_EVENT_NAME, { detail: { source: self.rootElement, toggleState: self.toggleState } }));
        }
        else {
            self.dispatchEvent(new CustomEvent(self.$cls.CLICK_EVENT_NAME, { detail: { source: self.rootElement } }));
        }
    }
    //#endregion event handlers
}