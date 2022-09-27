import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";

export class Mrbr_Tests_Application$Button {
    mrbrButton: Mrbr_UI_Bootstrap_Controls_Button;
    private $button = Mrbr_UI_Bootstrap_Controls_Button;

    constructor() {
        const self = this;
        const button = self.mrbrButton = new self.$button("button1");
        const button2 = new self.$button("button2");
        button.text = "Click Me";
        button2.text = "Click Me Again";
        button2.size = self.$button.buttonSizes.small;
        button2.colour = self.$button.buttonColours.danger;
        button2.outline = true;
        button.isToggle = true;
        button2.isToggle = false;
        button.addEventListener(self.$button.CLICK_EVENT_NAME, self.buttonClick.bind(self));
        button.addEventListener(self.$button.TOGGLE_EVENT_NAME, self.buttonToggle.bind(self));

        Promise.all([button.initialise(), button2.initialise()])
            .then(_ => {
                document.body.appendChild(button.rootElement);
                document.body.appendChild(button2.rootElement);
            })
    }
    buttonClick(e: CustomEvent) {
        console.log("Button Clicked");
    }
    buttonToggle(e: CustomEvent) {
        console.log("Button Toggled", e.detail, this.mrbrButton.toggleState);
    }
}