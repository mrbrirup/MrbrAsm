import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_Alert } from "../ui/bootstrap/controls/Alert";

export class Mrbr_Tests_Application$Alert {
    mrbrAlert: Mrbr_UI_Bootstrap_Controls_Alert;
    constructor() {
        const self = this;
        self.mrbrAlert = new Mrbr_UI_Bootstrap_Controls_Alert();
        self.mrbrAlert.initialise()
            .then(_ => {
                self.mrbrAlert.defaultContainerElement.textContent = "This is an alert";

                self.mrbrAlert.onClose(self.alertClose.bind(self));
                self.mrbrAlert.onClosed(self.alertClosed.bind(self));
                self.mrbrAlert.mount(document.body);
            });

    }
    private alertClose(source: Mrbr_UI_Bootstrap_Controls_Alert, event: Mrbr_System_Events_Event<any>) {
        console.log("alertClose");
    }
    private alertClosed(source: Mrbr_UI_Bootstrap_Controls_Alert, event: Mrbr_System_Events_Event<any>) {
        const self = this;
        self.mrbrAlert.dispose();
        self.mrbrAlert = null;
        console.log("alertClosed");
    }
}