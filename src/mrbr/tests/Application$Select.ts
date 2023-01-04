import { Mrbr_UI_Bootstrap_Form_Select } from "../ui/bootstrap/form/select";
import { Mrbr_UI_Bootstrap_Form_TextInputEvent } from "../ui/bootstrap/form/textInputEvent";

export class Mrbr_Tests_Application$Select {
  constructor() {
    const
      self = this,
      mrbrSelect = Mrbr_UI_Bootstrap_Form_Select,
      select1 = new mrbrSelect(),
      select2 = new mrbrSelect(),
      select3 = new mrbrSelect(),
      opt = mrbrSelect.Option,
      options = [
        new opt("1", "One"),
        new opt("2", "Two"),
        new opt("3", "Three"),
        new opt("4", "Four"),
        new opt("5", "Five"),
        new opt("6", "Six"),
        new opt("7", "Seven")
      ];
    select1
      .Options(options)
      .Multiple(true)
      .Label("Select 1");
    select2
      .Options([new opt("", "Select One", true), ...options])
      .Label("Select 2");
    select3
      .Options([new opt("", "Select One", true), ...options])
        .Size("small")
        .Label("Select 3");
    Promise.all([select1.initialise(), select2.initialise(), select3.initialise()])
      .then(() => {
        select1.mount(document.body);
        document.body.appendChild(document.createElement("hr"));
        select2.mount(document.body);
        document.body.appendChild(document.createElement("hr"));
        select3.mount(document.body);
        select1.onInputChanged(self.inputChange.bind(self));
        select2.onInputChanged(self.inputChange.bind(self));
        select3.onInputChanged(self.inputChange.bind(self));
      });
  }
  public inputChange(e: Mrbr_UI_Bootstrap_Form_TextInputEvent): void {
    console.log("Input Changed", e);
  }
}