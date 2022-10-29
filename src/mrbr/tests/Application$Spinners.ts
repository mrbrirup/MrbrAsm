import { Mrbr_UI_Bootstrap_Controls_Spinners } from "../ui/bootstrap/controls/Spinners";

export class Mrbr_Tests_Application$Spinners {
  constructor() {
    const spinners = Mrbr_UI_Bootstrap_Controls_Spinners;
    let
      spinner1 = spinners.addSpinner("spinner1", spinners.types.border, "Spinner 1"),
      spinner2 = spinners.addSpinner("spinner2", spinners.types.grow, "Spinner 2"),
      spinner3 = spinners.addSpinner("spinner3", spinners.types.grow, "Spinner 3"),
      spinner4 = spinners.addSpinner("spinner4", spinners.types.grow, "Spinner 4");

    spinner3.spinnerSize = spinners.sizes.sm;
    spinner4.spinnerSize = spinners.sizes.sm;
    spinner3.element.classList.add("text-primary");
    spinner1.element.classList.add("text-warning");
    document.body.appendChild(spinner1.element);
    document.body.appendChild(spinner2.element);
    document.body.appendChild(spinner3.element);
    document.body.appendChild(spinner4.element);
  }
}