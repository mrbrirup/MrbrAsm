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
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    public get showCloseButton(): boolean {
        return this._showCloseButton;
    }
    public set showCloseButton(value: boolean) {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            mubca = Mrbr_UI_Bootstrap_Controls_Alert,
            mucc = Mrbr_UI_Controls_ClassActions;
        if (value === true) {
            if (!self.elements[mubca.ALERT_CLOSE_BUTTON_NAME]) {
                self.createElement(new ctrlCfg(mubca.ALERT_CLOSE_BUTTON_NAME, "button", self.configuration(mubca.ALERT_CLOSE_BUTTON_NAME)))
                self.rootElement.appendChild(self.elements[mubca.ALERT_CLOSE_BUTTON_NAME]);



            }
            self.classes(self.rootElement, mucc.Add, "alert-dismissible fade show");
            self.classes(self.elements[mubca.ALERT_CLOSE_BUTTON_NAME], mucc.Remove, Mrbr_UI_Bootstrap_Utilities_Display.none)
        }
        else {
            if (self.elements[mubca.ALERT_CLOSE_BUTTON_NAME]) {
                self.classes(self.elements[mubca.ALERT_CLOSE_BUTTON_NAME], mucc.Add, Mrbr_UI_Bootstrap_Utilities_Display.none)
            }
            self.classes(self.rootElement, mucc.Remove, "alert-dismissible fade show");
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
            self.classes(rootElement, Mrbr_UI_Controls_ClassActions.Remove, Object.keys(alertContexts).map(key => alertContexts[key]))
            self.classes(rootElement, Mrbr_UI_Controls_ClassActions.Add, value);
        }

        this._alertContext = value;
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            mubca = Mrbr_UI_Bootstrap_Controls_Alert,
            initialisePromise = Mrbr_System_MrbrPromise.create("Mrbr_UI_Bootstrap_Controls_Alert:initialise");
        super.initialise(args)
            .then(async result => {
                await self.setDefaultConfiguration();
                MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(manifest => {
                        self.createElement(new ctrlCfg(self.rootElementName, "div", self.configuration(mubca.ALERT_CONTROL_NAME))
                            .Children([
                                new ctrlCfg(mubca.ALERT_TEXT_CONTAINER_NAME, "div", self.configuration(mubca.ALERT_TEXT_CONTAINER_NAME))
                            ])
                        )
                        self.defaultContainerElementName = mubca.ALERT_TEXT_CONTAINER_NAME;
                        self.alertContext = self._alertContext;
                        self.showCloseButton = self._showCloseButton;

                        self.events[Mrbr_UI_Bootstrap_Controls_Alert.ALERT_CLOSING_EVENT_NAME] = <Mrbr_System_Events_EventHandler>{
                            context: self,
                            eventName: Mrbr_UI_Bootstrap_Controls_Alert.ALERT_CLOSING_EVENT_NAME,
                            eventTarget: self.rootElement,
                            event: self.alertClosing
                        }
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }
    public alertClosing() {
        this.dispatchEvent(new CustomEvent(Mrbr_UI_Bootstrap_Controls_Alert.ALERT_CLOSING_EVENT_NAME));
    }
    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Alert> {

        const self = this,
            mubca = Mrbr_UI_Bootstrap_Controls_Alert,
            muccop = Mrbr_UI_Controls_ControlConfigOptionalParameters;
        self.defaultConfiguration.add(mubca.ALERT_CONTROL_NAME, new muccop()
            .Classes(["alert", self.alertContext])
            .Attributes({ role: "alert" })
        );
        self.defaultConfiguration.add(mubca.ALERT_TEXT_CONTAINER_NAME, new muccop());

        self.defaultConfiguration.add(mubca.ALERT_CLOSE_BUTTON_NAME, new muccop()
            .Attributes({ "type": "button" })
            .Classes("btn-close")
            .Data({ bsDismiss: "alert" })
            .Aria({ label: "Close" })
        )

        return Mrbr_System_MrbrPromise.createResolved("Mrbr_UI_Bootstrap_Controls_Alert:setDefaultConfiguration", self);
    }
}