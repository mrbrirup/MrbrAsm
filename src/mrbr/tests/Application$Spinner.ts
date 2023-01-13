import { Mrbr_UI_Bootstrap_Controls_Spinner } from "../ui/bootstrap/controls/Spinner";

export class Mrbr_Tests_Application$Spinner {
  constructor() {
    const spinner = Mrbr_UI_Bootstrap_Controls_Spinner;
    const
      spinner1 = new spinner(),
      spinner2 = new spinner();
    Promise.all([spinner1.initialise(), spinner2.initialise()])
      .then(() => {
        spinner1
          .AriaText("Spinner 1")
          .Type(spinner1.$st.grow)
          .Size(spinner1.$ss.growSmall)
          .Colour(spinner1.$buc.textDanger)
          .mount(document.body);
        spinner2
          .AriaText("Spinner 2")
          .Type(spinner2.$st.border)
          .Colour(spinner2.$buc.textPrimary)
          .mount(document.body);
      });
  }
}