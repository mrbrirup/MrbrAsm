import { Mrbr_UI_Bootstrap_Controls_CloseButton } from "../ui/bootstrap/controls/CloseButton";

export class Mrbr_Tests_Application$CloseButton {
    mrbrButton: Mrbr_UI_Bootstrap_Controls_CloseButton;
    private $button = Mrbr_UI_Bootstrap_Controls_CloseButton;

    constructor() {
        const self = this;
        const button = self.mrbrButton = new self.$button("button1");
        const button2 = new self.$button("button2");
        button.whiteVariant = true;
        button.addEventListener(self.$button.CLOSE_BUTTON_CLICK_EVENT_NAME, self.buttonClick.bind(self));
        button2.addEventListener(self.$button.CLOSE_BUTTON_CLICK_EVENT_NAME, self.buttonClick.bind(self));       
        button2.disabled = true;
        let div = document.createElement("div");
        div.style.backgroundColor = "blue";
        button.classes(div, button.$clsActions.Add, "p-3 m-3");
        Promise.all([button.initialise(), button2.initialise()])
            .then(_ => {
                div.appendChild(button.rootElement);
                div.appendChild(button2.rootElement);
                document.body.appendChild(div);
            })
    }
    buttonClick(e: CustomEvent) {
        console.log("Button Clicked", e);
    }
}