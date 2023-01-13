import { Mrbr_UI_Bootstrap_Form_DataList } from "../ui/bootstrap/form/datalist";


export class Mrbr_Tests_Application$DataList {
  constructor() {
    const
      dataList = new Mrbr_UI_Bootstrap_Form_DataList();
    dataList
      .initialise()
      .then(_ => {
        dataList
          .Options(["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"])
          .Label("Greek Data List")
          .Size("small")
          .mount(document.body);
        dataList.onInputChanged(this.inputChange.bind(this))
      });
    setTimeout(() => {
      dataList.AddOption("New Option");
    }, 10000);
  }
  inputChange(e: Event) {
    console.log("Input Changed", e);
  }
}