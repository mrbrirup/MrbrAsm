import { Mrbr_UI_Bootstrap_Controls_OffCanvas } from "../ui/bootstrap/controls/OffCanvas";

export class Mrbr_Tests_Application$OffCanvas {

  constructor() {
    const offCanvas = new Mrbr_UI_Bootstrap_Controls_OffCanvas("offCanvas");
    offCanvas.initialise()
      .then(_ => {
        //let oc = offCanvas.build();
        document.body.appendChild(offCanvas.togglerElement);
        document.body.appendChild(offCanvas.rootElement);

      });
  }
}