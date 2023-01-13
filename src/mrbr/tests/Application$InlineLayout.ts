import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";
import { Mrbr_UI_Bootstrap_Form_Email } from "../ui/bootstrap/form/email";
import { Mrbr_UI_Bootstrap_Form_Layout } from "../ui/bootstrap/form/layout";
import { Mrbr_UI_Bootstrap_Form_Select } from "../ui/bootstrap/form/select";


export class Mrbr_Tests_Application$InlineLayout {
  constructor() {
    const
      mrbrButton = Mrbr_UI_Bootstrap_Controls_Button,
      mrbrLayout = Mrbr_UI_Bootstrap_Form_Layout,
      mrbrEmail = Mrbr_UI_Bootstrap_Form_Email,
      mrbrSelect = Mrbr_UI_Bootstrap_Form_Select,
      button = new mrbrButton(),
      select1 = new mrbrSelect(),
      layout = new mrbrLayout(),
      email1 = new mrbrEmail()
        .Placeholder("name1@example.com")
        .Label("Email 1"),
      opt = mrbrSelect.Option,
      options = [
        new opt("", "Choose One"),
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
      .Label("Select 1");
    button.text = "Button 1";
    layout.controls.setMultiple(
      ["email1", email1],
      ["select1", select1],
      ["button", button]);
    Promise.all([layout.initialise(), email1.initialise(), select1.initialise(), button.initialise()])
      .then(_ => {
        const inlineRow = layout.addInlineRow("sm", "auto", 3, 3);
        layout.mount(document.body);
        email1.mount(layout.cell(0, 0));
        select1.mount(layout.cell(0, 1));
        email1.hiddenLabel = true;
        select1.hiddenLabel = true;
        button.mount(layout.cell(0, 2));
      })
      .catch(error => console.log("Error", error));

  }
  inputChange(e: Event) {
    console.log("Input Changed", e);
  }
}