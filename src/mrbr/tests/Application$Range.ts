import { Mrbr_UI_Bootstrap_Form_Range } from "../ui/bootstrap/form/range";
import { Mrbr_UI_Bootstrap_Form_TextInputEvent } from "../ui/bootstrap/form/textInputEvent";

export class Mrbr_Tests_Application$Range {
  constructor() {
    const
      mrbrRange = Mrbr_UI_Bootstrap_Form_Range,
      range1 = new mrbrRange(),
      range2 = new mrbrRange();
    Promise.all([range1.initialise(), range2.initialise()])
      .then(_ => {
        range1.mount(document.body);
        range1
          .Value(4)
          .Label("Range 1");
        document.body.appendChild(document.createElement("hr"));
        range2.mount(document.body);
        range2
          .Value(25)
          .Label("Range 2")
          .Step(5);
        range1.onInputChanged(this.inputChange.bind(this));
        range2.onInputChanged(this.inputChange.bind(this));
      })

  }
  public inputChange(e: Mrbr_UI_Bootstrap_Form_TextInputEvent): void {
    console.log("Input Changed", e);
  }
}