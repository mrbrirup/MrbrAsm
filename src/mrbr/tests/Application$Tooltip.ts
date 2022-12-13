import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_UI_Bootstrap_Controls_Tooltip } from "../ui/bootstrap/controls/Tooltip";
import { Mrbr_UI_Bootstrap_Controls_TooltipConfig } from "../ui/bootstrap/controls/TooltipConfig";
import { Mrbr_UI_Bootstrap_Controls_TooltipPlacements } from "../ui/bootstrap/controls/TooltipPlacements";
export class Mrbr_Tests_Application$Tooltip {
  constructor() {
    let button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.style.top = "100px";
    button.style.left = "100px";
    button.style.position = "absolute";
    button.innerText = "Hover me";
    document.body.appendChild(button);
    MrbrBase.mrbrInstance.loadManifest(Mrbr_Tests_Application$Tooltip[MrbrBase.MANIFEST])
      .then(async () => {
        const
          config = new Mrbr_UI_Bootstrap_Controls_TooltipConfig()
            .Title("This is a tooltip a2")
            .Placement(Mrbr_UI_Bootstrap_Controls_TooltipPlacements.bottom);
        const tooltip = new Mrbr_UI_Bootstrap_Controls_Tooltip(button, config);
        await tooltip.initialise();
        tooltip.onHide(() => { console.log("Tooltip hide"); });
        tooltip.onInserted(() => { console.log("Tooltip insert"); });
        tooltip.onHidden(() => { console.log("Tooltip hidden"); });
        tooltip.onShown(() => { console.log("Tooltip shown"); });
        tooltip.onShow(() => { console.log("Tooltip show"); });
        tooltip.mount();
      });
  }
}