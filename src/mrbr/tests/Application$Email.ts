import { Mrbr_UI_Bootstrap_Form_Email } from "../ui/bootstrap/form/email";

export class Mrbr_Tests_Application$Email {
  constructor() {
    const mrbrEmail = Mrbr_UI_Bootstrap_Form_Email,
      email1 = new mrbrEmail()
        .Placeholder("name1@example.com")
        .Label("Email1")
        .Size("large"),
      email2 = new mrbrEmail()
        .Placeholder("name2@example.com")
        .Label("Email2"),
      email3 = new mrbrEmail()
        .Placeholder("name3@example.com")
        .Label("Email3")
        .Size("small"),
      email4 = new mrbrEmail()
        .Placeholder("name4@example.com")
        .Label("Email4")
        .Size("large")
        .ReadOnly(true),
      email5 = new mrbrEmail()
        .Placeholder("email5@example.com")
        .Label("Email5")
        .Size("large")
        .ReadOnly("plaintext"),
      email6 = new mrbrEmail()
        .Placeholder("email6@example.com")
        .Label("Email6")
        .Size("large")
        .Disabled(true);
    Promise.all([email1.initialise(), email2.initialise(), email3.initialise(), email4.initialise(), email5.initialise(), email6.initialise()])
      .then(_ => {
        email1.mount(document.body);
        email2.mount(document.body);
        email3.mount(document.body);
        email4.mount(document.body);
        email5.mount(document.body);
        email6.mount(document.body);
        email1.onInputChanged(this.inputChange.bind(this));
      })
  }
  inputChange(e: Event) {
    console.log("Input Changed", e);
  }
}