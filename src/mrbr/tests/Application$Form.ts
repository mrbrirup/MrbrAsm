import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";
import { Mrbr_UI_Bootstrap_Form_Email } from "../ui/bootstrap/form/email";
import { Mrbr_UI_Bootstrap_Form_Form } from "../ui/bootstrap/form/form";
import { Mrbr_UI_Bootstrap_Form_FormSubmitEvent } from "../ui/bootstrap/form/formSubmitEvent";
import { Mrbr_UI_Bootstrap_Form_Layout } from "../ui/bootstrap/form/layout";
import { Mrbr_UI_Bootstrap_Form_Select } from "../ui/bootstrap/form/select";


export class Mrbr_Tests_Application$Form {
  constructor() {
    const
      mrbrForm = Mrbr_UI_Bootstrap_Form_Form,
      mrbrButton = Mrbr_UI_Bootstrap_Controls_Button,
      mrbrLayout = Mrbr_UI_Bootstrap_Form_Layout,
      mrbrEmail = Mrbr_UI_Bootstrap_Form_Email,
      mrbrSelect = Mrbr_UI_Bootstrap_Form_Select,
      form = new mrbrForm(),
      button = new mrbrButton(),
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
    Promise.all([form.initialise(), layout.initialise(), email1.initialise(), select1.initialise(), button.initialise()])
      .then(_ => {
        form.mount(document.body);
        layout
          .addRow().CreateColumns({ i: 0, s: 6 }, 6, "addRow")
          .row.CreateColumns(9, 3)
          .row.rootElement.classList.add("mt-3");
        const cell = layout.cell.bind(layout);
        layout.mount(form);
        email1.mount(cell(0, 0));
        select1.mount(cell(0, 1));
        button.rootClasses(button.$clsActions.add, "float-end");
        button.mount(cell(1, 1));
        email1
          .Required(true)
          .ValidMessage("Email 1 is valid")
          .InvalidMessage("Email 1 is invalid");
        button.buttonType = "submit";
        form.onSubmit((event: Mrbr_UI_Bootstrap_Form_FormSubmitEvent) => {
          console.log("Form Submitted");
          const data = event.data;
          if (!data.valid) {
            data.cancel();
            console.log("Form is invalid");
          }
          else {
            console.log("Email 1:", email1.value);
            console.log("Select 1:", select1.value);
            data.event.preventDefault()
            data.event.stopPropagation()

          }

          data.form.classList.add('was-validated')

        });
      })
      .catch(error => console.log("Error", error));

  }
  inputChange(e: Event) {
    console.log("Input Changed", e);
  }
}