import { Mrbr_UI_Bootstrap_Form_Colour } from "../ui/bootstrap/form/colour";


export class Mrbr_Tests_Application$Colour {
  constructor() {
    const mrbrColour = Mrbr_UI_Bootstrap_Form_Colour,
      colour1 = new mrbrColour()
        .Value("#FF0000")
        .Label("Colour1"),
      colour2 = new mrbrColour()
        .Label("Colour2")
        .Value("#00FF00")
        .Title("Colour 2");
    Promise.all([colour1.initialise(), colour2.initialise()])
      .then(_ => {
        colour1.mount(document.body);
        colour1.onInputChanged(this.inputChange.bind(this));
        document.body.appendChild(document.createElement("hr"));
        colour2.mount(document.body);
        colour2.onInputChanged(this.inputChange.bind(this));
      });
  }
  inputChange(e: Event) {
    console.log("Input Changed", e);
  }
}