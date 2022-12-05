import { Mrbr_UI_Bootstrap_Controls_OffCanvas } from "../ui/bootstrap/controls/OffCanvas";
import { Mrbr_UI_Controls_MountPosition } from "../ui/controls/MountPosition";

export class Mrbr_Tests_Application$OffCanvas {

  constructor() {
    const offCanvas = new Mrbr_UI_Bootstrap_Controls_OffCanvas("offCanvas");
    offCanvas.initialise()
      .then(_ => {
        //let oc = offCanvas.build();
        offCanvas.mount(document.body, Mrbr_UI_Controls_MountPosition.append, offCanvas.togglerElement);
        offCanvas.mount(document.body);
        offCanvas.togglerElement.style.scale = "2";
      });
  }
}