import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";
import { Mrbr_UI_Bootstrap_Form_Email } from "../ui/bootstrap/form/email";
import { Mrbr_UI_Bootstrap_Form_Layout } from "../ui/bootstrap/form/layout";
import { Mrbr_UI_Bootstrap_Form_Select } from "../ui/bootstrap/form/select";


export class Mrbr_Tests_Application$Layout {
  constructor() {
    const
      mrbrButton = Mrbr_UI_Bootstrap_Controls_Button,
      mrbrLayout = Mrbr_UI_Bootstrap_Form_Layout,
      mrbrEmail = Mrbr_UI_Bootstrap_Form_Email,
      mrbrSelect = Mrbr_UI_Bootstrap_Form_Select,
      button = new mrbrButton("button1"),
      select1 = new mrbrSelect(),
      layout = new mrbrLayout(),
      email1 = new mrbrEmail()
        .Placeholder("name1@example.com")
        .Label("Email 1"),
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
      .Label("Select 1");
    button.text = "Button 1";
    Promise.all([layout.initialise(), email1.initialise(), select1.initialise(), button.initialise()])
      .then(_ => {
        //  All three of these produce the same result, creating a 2x2 grid with a button in the bottom right corner
        /*
          layout.addRow().Column({ s: 6 })({ s: 6 })("addRow").Column({ s: 9 })({ s: 3 })
          layout.row(1).rootElement.classList.add("mt-3");
          */
        /*
          layout.addRow().Columns(6, 6, "addRow", 9, 3).row.rootElement.classList.add("mt-3");
        */
        layout
          .addRow().Columns({ i: 0, s: 6 }, 6, "addRow")
          .row.Columns(9, 3)
          .row.rootElement.classList.add("mt-3");
        layout.mount(document.body);
        email1.mount(layout.cell(0, 0));
        select1.mount(layout.cell(0, 1));
        button.rootClasses(button.$clsActions.add, "float-end");
        button.mount(layout.cell(1, 1));

      })
      .catch(error => console.log("Error", error));


  }
  inputChange(e: Event) {
    console.log("Input Changed", e);
  }
}