import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";//mrbr:exclude
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Utilities_Display } from "../utilities/display";
import { Mrbr_UI_Bootstrap_Controls_Alert$Contexts } from "./Alert$contexts";

export class Mrbr_UI_Bootstrap_Controls_Alert extends Mrbr_UI_Controls_Control {
    public static ALERT_CONTROL_NAME: string = "alert_name";
    public static ALERT_CLOSE_BUTTON_NAME: string = "alert_close_button";
    public static ALERT_TEXT_CONTAINER_NAME: string = "alert_text_container";
    public static ALERT_CLOSING_EVENT_NAME: string = "closed.bs.alert";

    //alert alert-warning alert-dismissible fade show
    private _alertContext: Mrbr_UI_Bootstrap_Controls_Alert$Contexts = Mrbr_UI_Bootstrap_Controls_Alert$Contexts.success;
    private _showCloseButton: boolean = true;
    override get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Alert { return Mrbr_UI_Bootstrap_Controls_Alert; }
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    public get showCloseButton(): boolean {
        return this._showCloseButton;
    }
    public set showCloseButton(value: boolean) {
        const self = this;
        if (value === true) {
            if (!self.elements[self.$cls.ALERT_CLOSE_BUTTON_NAME]) {
                self.createElement(new self.$ctrlCfg(self.$cls.ALERT_CLOSE_BUTTON_NAME, "button", self.configuration(self.$cls.ALERT_CLOSE_BUTTON_NAME)))
                self.rootElement.appendChild(self.elements[self.$cls.ALERT_CLOSE_BUTTON_NAME]);
            }
            self.classes(self.rootElement, self.$clsActions.Add, "alert-dismissible fade show");
            self.classes(self.elements[self.$cls.ALERT_CLOSE_BUTTON_NAME], self.$clsActions.Remove, Mrbr_UI_Bootstrap_Utilities_Display.none)
        }
        else {
            if (self.elements[self.$cls.ALERT_CLOSE_BUTTON_NAME]) {
                self.classes(self.elements[self.$cls.ALERT_CLOSE_BUTTON_NAME], self.$clsActions.Add, Mrbr_UI_Bootstrap_Utilities_Display.none)
            }
            self.classes(self.rootElement, self.$clsActions.Remove, "alert-dismissible fade show");
        }
        this._showCloseButton = value;
    }
    public get alertContext(): Mrbr_UI_Bootstrap_Controls_Alert$Contexts {
        return this._alertContext;
    }
    public set alertContext(value: Mrbr_UI_Bootstrap_Controls_Alert$Contexts) {
        const self = this,
            alertContexts = Mrbr_UI_Bootstrap_Controls_Alert$Contexts;
        let rootElement = self.elements[self.rootElementName];
        if (rootElement) {
            self.classes(rootElement, self.$clsActions.Remove, Object.keys(alertContexts).map(key => alertContexts[key]))
            self.classes(rootElement, self.$clsActions.Add, value);
        }

        this._alertContext = value;
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Alert:initialise");
        super.initialise(args)
            .then(async result => {
                await self.setDefaultConfig();
                self.$mrbr.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(manifest => {
                        self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.ALERT_CONTROL_NAME))
                            .Children([
                                new self.$ctrlCfg(self.$cls.ALERT_TEXT_CONTAINER_NAME, "div", self.configuration(self.$cls.ALERT_TEXT_CONTAINER_NAME))
                            ])
                        )
                        self.defaultContainerElementName = self.$cls.ALERT_TEXT_CONTAINER_NAME;
                        self.alertContext = self._alertContext;
                        self.showCloseButton = self._showCloseButton;

                        self.events[self.$cls.ALERT_CLOSING_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
                            context: self,
                            eventName: self.$cls.ALERT_CLOSING_EVENT_NAME,
                            eventTarget: self.rootElement,
                            event: self.alertClosing
                        }
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }
    public alertClosing() {
        this.dispatchEvent(new CustomEvent(this.$cls.ALERT_CLOSING_EVENT_NAME));
    }
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Alert> {

        const self = this;
        self.defaultConfig.add(self.$cls.ALERT_CONTROL_NAME, new self.$ctrlPrm()
            .Classes(["alert", self.alertContext])
            .Attributes({ role: "alert" })
        );
        self.defaultConfig.add(self.$cls.ALERT_TEXT_CONTAINER_NAME, new self.$ctrlPrm());

        self.defaultConfig.add(self.$cls.ALERT_CLOSE_BUTTON_NAME, new self.$ctrlPrm()
            .Attributes({ "type": "button" })
            .Classes("btn-close")
            .Data({ bsDismiss: "alert" })
            .Aria({ label: "Close" })
        )

        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Controls_Alert:setDefaultConfiguration", self);
    }
}