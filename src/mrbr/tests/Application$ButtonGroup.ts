import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";
import { Mrbr_UI_Bootstrap_Controls_ButtonGroup } from "../ui/bootstrap/controls/ButtonGroup";

export class Mrbr_Tests_Application$ButtonGroup {
    mrbrButton: Mrbr_UI_Bootstrap_Controls_Button;
    mrbrButtonGroup: Mrbr_UI_Bootstrap_Controls_ButtonGroup;
    private $button = Mrbr_UI_Bootstrap_Controls_Button;
    private $buttonGroup = Mrbr_UI_Bootstrap_Controls_ButtonGroup;

    constructor() {
        const self = this;
        const button = self.mrbrButton = new self.$button("button1");
        const button2 = new self.$button("button2");
        button.text = "Click Me";
        button2.text = "Click Me Again";
        //button2.size = self.$button.buttonSizes.small;
        //button2.colour = self.$button.buttonColours.danger;
        //button2.outline = true;
        //button.isToggle = true;
        //button2.isToggle = false;
        button.addEventListener(self.$button.CLICK_EVENT_NAME, self.buttonClick.bind(self));
        button2.addEventListener(self.$button.CLICK_EVENT_NAME, self.buttonClick.bind(self));

        const buttonGroup = self.mrbrButtonGroup = new self.$buttonGroup("buttonGroup1");
        buttonGroup.buttonGroupSize = self.$buttonGroup.buttonGroupSizes.large;


        Promise.all([button.initialise(), button2.initialise(), buttonGroup.initialise()])
            .then(_ => {
                buttonGroup.addGroupItem(button.id, button.rootElement);
                buttonGroup.addGroupItem(button2.id, button2.rootElement);
                document.body.appendChild(buttonGroup.rootElement);
                buttonGroup.addEventListener(self.$buttonGroup.CLICK_EVENT_NAME, self.buttonGroupClick.bind(self));
                setTimeout(() => {
                    //buttonGroup.setActive(button2.id);
                    buttonGroup.removeGroupItem(button2.id);
                    // setTimeout(() => {
                    //     buttonGroup.setActive(button.id);
                    // }, 5000);
                }, 2000);
            })
    }
    buttonClick(e: CustomEvent) {
        e.stopPropagation();
        e.preventDefault();
        console.log("Button Clicked: ", e.detail);
    }
    buttonGroupClick(e: CustomEvent) {
        e.stopPropagation();
        e.preventDefault();
        console.log("Button Group Clicked: ", e.detail);
    }
}