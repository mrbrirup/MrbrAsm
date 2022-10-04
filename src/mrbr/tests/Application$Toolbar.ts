import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";
import { Mrbr_UI_Bootstrap_Controls_ButtonGroup } from "../ui/bootstrap/controls/ButtonGroup";
import { Mrbr_UI_Bootstrap_Controls_Toolbar } from "../ui/bootstrap/controls/Toolbar";

export class Mrbr_Tests_Application$Toolbar {
    mrbrButton: Mrbr_UI_Bootstrap_Controls_Button;
    mrbrButtonGroup: Mrbr_UI_Bootstrap_Controls_ButtonGroup;
    private $button = Mrbr_UI_Bootstrap_Controls_Button;
    private $buttonGroup = Mrbr_UI_Bootstrap_Controls_ButtonGroup;
    private $toolbar = Mrbr_UI_Bootstrap_Controls_Toolbar;
    constructor() {
        const self = this;
        const buttonGroup0 = new self.$buttonGroup("buttonGroup1");
        const buttonGroup1 = new self.$buttonGroup("buttonGroup2");
        const toolbar = new self.$toolbar("toolbar1");
        Promise.all([
            toolbar.initialise(),
            buttonGroup0.initialise(),
            buttonGroup1.initialise()
        ])
            .then(_ => {

                const button1 = new self.$button("button1");
                const button2 = new self.$button("button2");
                const button3 = new self.$button("button3");
                const button4 = new self.$button("button4");
                button1.text = "Button 1";
                button2.text = "Button 2";
                button3.text = "Button 3";
                button4.text = "Button 4";

                buttonGroup0.buttonGroupSize = self.$buttonGroup.buttonGroupSizes.small;
                buttonGroup1.buttonGroupSize = self.$buttonGroup.buttonGroupSizes.small;


                Promise.all([button1.initialise(), button2.initialise(), button3.initialise(), button4.initialise()])
                    .then(_ => {
                        button1.addEventListener(self.$button.CLICK_EVENT_NAME, self.buttonClick.bind(self));
                        button2.addEventListener(self.$button.CLICK_EVENT_NAME, self.buttonClick.bind(self));
                        buttonGroup0.addGroupItem(button1.id, button1.rootElement);
                        buttonGroup0.addGroupItem(button2.id, button2.rootElement);
                        buttonGroup1.addGroupItem(button3.id, button3.rootElement);
                        buttonGroup1.addGroupItem(button4.id, button4.rootElement);
                        toolbar.defaultContainerElement.appendChild(buttonGroup0.rootElement);
                        toolbar.defaultContainerElement.appendChild(buttonGroup1.rootElement);
                        toolbar.spaceButtonGroups();
                        document.body.appendChild(toolbar.rootElement);
                        buttonGroup0.addEventListener(self.$buttonGroup.CLICK_EVENT_NAME, self.buttonGroupClick.bind(self));
                    })
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