import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_UI_Bootstrap_Controls_Tooltip } from "../ui/bootstrap/controls/Tooltip";
import { Mrbr_UI_Bootstrap_Controls_Tooltip$Placements } from "../ui/bootstrap/controls/Tooltip$Placements";
export class Mrbr_Tests_Application$Tooltip {
  constructor() {
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.innerText = "Hover me";
    document.body.appendChild(button);


    MrbrBase.mrbrInstance.loadManifest(Mrbr_Tests_Application$Tooltip[MrbrBase.MANIFEST])
      .then(async () => {
        const tooltip = new Mrbr_UI_Bootstrap_Controls_Tooltip(button, { title: "This is a tooltip too", popperPlacement: "top" });
        await tooltip.initialise();
        tooltip.placement = Mrbr_UI_Bootstrap_Controls_Tooltip$Placements.bottom;
        tooltip.onHidden(() => {
          console.log("Tooltip hidden");
        });
        tooltip.onShown(() => {
          console.log("Tooltip shown");
        });
        tooltip.onShow(() => {
          console.log("Tooltip show");
        });
        tooltip.onHide(() => {
          console.log("Tooltip hide");
        });
        tooltip.render();

        //tooltip.Placement(Mrbr_UI_Bootstrap_Controls_Tooltip$Placements.top);
        //await tooltip.initialise();
        //tooltip.show();
      });
  }
}