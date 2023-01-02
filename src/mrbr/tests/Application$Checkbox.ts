import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_CheckBox } from "../ui/bootstrap/form/checkbox";
import { Mrbr_UI_Bootstrap_Form_CheckBoxStates } from "../ui/bootstrap/form/checkboxStates";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../ui/bootstrap/utilities/buttonColours";

export class Mrbr_Tests_Application$Checkbox {
  constructor() {
    const mrbrCheckbox = Mrbr_UI_Bootstrap_Form_CheckBox,
      checkbox1 = new mrbrCheckbox()
        .Label("Checkbox"),
      checkbox2 = new mrbrCheckbox()
        .Label("Checkbox 2")
        .Checked(true),
      checkbox3 = new mrbrCheckbox()
        .Label("Checkbox 3")
        .Disabled(true)
        .Checked(Mrbr_UI_Bootstrap_Form_CheckBoxStates.indeterminate),
      checkbox4 = new mrbrCheckbox()
        .Label("Checkbox 4")
        .ToggleStyle(true),
      checkbox5 = new mrbrCheckbox()
        .Label("Checkbox 5")
        .Switch(true),
      checkbox6 = new mrbrCheckbox()
        .Label("Checkbox 6")
        .Inline(true),
      checkbox7 = new mrbrCheckbox()
        .Label("Checkbox 7")
        .Inline(true);
      
    Promise.all([checkbox1.initialise(), checkbox2.initialise(), checkbox3.initialise(), checkbox4.initialise(), checkbox5.initialise(), checkbox6.initialise(), checkbox7.initialise()])
      .then(_ => {
        checkbox1.mount(document.body);
        checkbox2.mount(document.body);
        checkbox3.mount(document.body);
        checkbox4.mount(document.body);
        checkbox5.mount(document.body);
        checkbox6.mount(document.body);
        checkbox7.mount(document.body);
        checkbox4.onInputChanged(this.inputChange.bind(this));
        checkbox4.ButtonContextStyle(Mrbr_UI_Bootstrap_Utilities_ButtonColours.primary);
      })
  }
  inputChange(e: Mrbr_System_Events_Event<any>) {
    console.log("Input Changed", e.data);
  }
}