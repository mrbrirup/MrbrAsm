import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_CloseButton } from "../ui/bootstrap/controls/CloseButton";

export class Mrbr_Tests_Application$CloseButton {
    mrbrButton: Mrbr_UI_Bootstrap_Controls_CloseButton;
    private $button = Mrbr_UI_Bootstrap_Controls_CloseButton;

    constructor() {
        const self = this;
        const button = self.mrbrButton = new self.$button();
        const button2 = new self.$button();
        button.whiteVariant = true;
        button2.disabled = true;
        let div = document.createElement("div");
        div.id = "button1";
        div.style.backgroundColor = "blue";
        button.classes(div, button.$clsActions.add, "p-3 m-3");
        Promise.all([button.initialise(), button2.initialise()])
            .then(_ => {
                button.onClick(self.buttonClick.bind(self));
                button2.onClick(self.buttonClick.bind(self));
                button.mount(div);
                button2.mount(div);
                // div.appendChild(button.rootElement);
                // div.appendChild(button2.rootElement);
                document.body.appendChild(div);
            })
    }
    buttonClick(e: Mrbr_System_Events_Event<any>) {
        console.log("Button Clicked", e);
    }
}