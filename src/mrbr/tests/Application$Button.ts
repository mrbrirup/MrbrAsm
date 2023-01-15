import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";

export class Mrbr_Tests_Application$Button {
    mrbrButton: Mrbr_UI_Bootstrap_Controls_Button;
    private $button = Mrbr_UI_Bootstrap_Controls_Button;

    constructor() {
        const
            button = new this.$button(),
            button2 = new this.$button(),
            buttons = [button, button2];
        button.text = "Click Me";

        Promise.all(buttons.map(btn => btn.initialise()))
            .then(_ => {
                button2
                    .Text("Click me too")
                    .Size("sm")
                    .Colour(button2.$bsButtonColours.danger)
                    .Outline(true)
                    .IsToggle(true);
                button.onClick(this.buttonClick.bind(this));
                button2.onToggle(this.buttonToggle.bind(this));
                buttons.forEach(btn => btn.mount(document.body))
                console.log("Buttons Mounted");
                console.log("Button 1", button);
                console.log("Button 2", button2);
                setTimeout(() => {
                    button2.toggle();
                }, 5000);
                setTimeout(() => {
                    button2.toggle();
                }, 10000);
            })
    }
    buttonClick(e: Mrbr_System_Events_Event<any>) {
        console.log("Button Clicked");
    }
    buttonToggle(e: Mrbr_System_Events_Event<any>) {
        console.log("Button Toggled", e.data);
    }
}