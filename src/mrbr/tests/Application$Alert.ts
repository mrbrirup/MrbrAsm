import { Mrbr_UI_Bootstrap_Controls_Alert } from "../ui/bootstrap/controls/Alert";

export class Mrbr_Tests_Application$Alert {
    mrbrAlert: Mrbr_UI_Bootstrap_Controls_Alert;
    constructor() {
        const self = this;
        self.mrbrAlert = new Mrbr_UI_Bootstrap_Controls_Alert("alert1");
        self.mrbrAlert.initialise()
            .then(_ => {
                self.mrbrAlert.defaultContainerElement.textContent = "This is an alert";
                document.body.appendChild(self.mrbrAlert.rootElement);
                self.mrbrAlert.addEventListener(Mrbr_UI_Bootstrap_Controls_Alert.ALERT_CLOSING_EVENT_NAME, self.clearAlert.bind(self));
            })

    }
    clearAlert() {
        const self = this;
        self.mrbrAlert.dispose();
        self.mrbrAlert = null;
    }
}