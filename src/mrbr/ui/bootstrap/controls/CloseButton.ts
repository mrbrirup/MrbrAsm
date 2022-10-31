import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";

export class Mrbr_UI_Bootstrap_Controls_CloseButton extends Mrbr_UI_Controls_Control {
    //#region Static Members
    public static CLOSE_BUTTON_NAME: string = "close_button";
    public static CLOSE_BUTTON_CLICK_EVENT_NAME: string = "close_button_click";
    //#endregion Static Members
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    //#region Private Field
    private _disabled: boolean = false;
    private _whiteVariant: boolean = false;
    //#endregion Private Fields
    //#region Private Property
    get $cls() { return Mrbr_UI_Bootstrap_Controls_CloseButton; }
    //#endregion Private Property
    //#region Public Members
    public get whiteVariant(): boolean { return this._whiteVariant; }
    public set whiteVariant(value: boolean) {
        const self = this;
        self.rootElement && self.classes(self.rootElement, value ? self.$clsActions.Add : self.$clsActions.Remove, "btn-close-white");
        self._whiteVariant = value;
    }
    public get disabled(): boolean { return this._disabled; }
    public set disabled(value: boolean) {
        const self = this;
        self.rootElement && self.attributes(self.rootElement, { disabled: value ? "" : super.$cls.DELETE });
        self._disabled = value;
    }
    //#endregion Public Properties
    public initialise(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_CloseButton> {
        const self = this,
            initalisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_CloseButton:initialise");
        super.initialise().then(async _ => {
            await self.setDefaultConfig();
            self.createElement(new self.$ctrlCfg(self.rootElementName, "button", self.defaultConfig.get(self.$cls.CLOSE_BUTTON_NAME)));
            self.disabled = self._disabled;
            self.whiteVariant = self._whiteVariant;
            self.events[self.$cls.CLOSE_BUTTON_CLICK_EVENT_NAME] = new Mrbr_System_Events_EventHandler(
                "click",
                self.rootElement,
                self.closeButtonClick_handler,
                self
            );
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }
    //#region Private Methods
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_CloseButton> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_CloseButton:setDefaultConfig");
        super.setDefaultConfig().then(() => {
            self.defaultConfig.add(self.$cls.CLOSE_BUTTON_NAME, new self.$ctrlPrm()
                .Aria({ label: "Close" })
                .Attributes({ type: "button" })
                .Classes("btn-close")
            );
            setDefaultConfigPromise.resolve(self);
        })
        return setDefaultConfigPromise;
    }
    closeButtonClick_handler(e: Event) {
        const self = this;
        e.preventDefault();
        e.stopPropagation();
        self.dispatchEvent(new CustomEvent(self.$cls.CLOSE_BUTTON_CLICK_EVENT_NAME, { detail: e }));
    }
    //#endregion Private Methods
}