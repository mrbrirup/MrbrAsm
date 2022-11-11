import { Mrbr_System_Promise } from "../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";
import { Mrbr_UI_Bootstrap_Controls_ButtonGroup } from "../ui/bootstrap/controls/ButtonGroup";
import { Mrbr_UI_Controls_Control } from "../ui/controls/Control";

export class Mrbr_Tests_Application$ButtonGroup extends Mrbr_UI_Controls_Control {
    mrbrButton: Mrbr_UI_Bootstrap_Controls_Button;
    mrbrButtonGroup: Mrbr_UI_Bootstrap_Controls_ButtonGroup;
    private $button = Mrbr_UI_Bootstrap_Controls_Button;
    private $buttonGroup = Mrbr_UI_Bootstrap_Controls_ButtonGroup;
    get $cls(): typeof Mrbr_Tests_Application$ButtonGroup { return Mrbr_Tests_Application$ButtonGroup; }
    constructor() {
        super("Mrbr_Tests_Application$ButtonGroup");
    }
    buttonClick(e: CustomEvent) {
        console.log("Button Clicked: ", e);
    }
    buttonGroupClick(e: CustomEvent) {
        console.log("Button Group Clicked: ", e);
    }
    public initialise(...args): Mrbr_System_Promise<any> {
        const
            self = this,
            controlName = self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME],
            initalisePromise = self.$promise.create(`${controlName}.initialise`);
        try {
            super.initialise(args).then(async _ => {
                await self.loadManifest(self.$cls[self.$mrbrBase.MRBR_COMPONENT_MANIFEST])
                const
                    buttonGroup = self.mrbrButtonGroup = new self.$buttonGroup("buttonGroup1"),
                    button = self.mrbrButton = new self.$button("button1"),
                    button2 = new self.$button("button2");
                button.text = "Click Me";
                button2.text = "Click Me Again";
                button2.size = self.$button.buttonSizes.small;
                button2.colour = self.$button.buttonColours.danger;
                button2.outline = true;
                buttonGroup.buttonGroupSize = self.$buttonGroup.groupSizes.large;
                await Promise.all([button.initialise(), button2.initialise(), buttonGroup.initialise()]);
                button.onClick(self.buttonClick.bind(self));

                buttonGroup
                    .addGroupItem(button.id, button.rootElement)
                    .addGroupItem(button2.id, button2.rootElement)
                    .mount(document.body)
                    .onClick(self.buttonGroupClick.bind(self));
                initalisePromise.resolve(self);
            })
        } catch (error) { initalisePromise.reject(error); }
        return initalisePromise;
    }
}

