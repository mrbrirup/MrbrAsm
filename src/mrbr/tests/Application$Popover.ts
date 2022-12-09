import { Mrbr_UI_Bootstrap_Controls_Popover } from "../ui/bootstrap/controls/Popover";
import { Mrbr_UI_Bootstrap_Controls_PopoverConfig } from "../ui/bootstrap/controls/PopoverConfig";

export class Mrbr_Tests_Application$Popover {

  constructor() {
    const popover = Mrbr_UI_Bootstrap_Controls_Popover;
    let popoverConfig = new Mrbr_UI_Bootstrap_Controls_PopoverConfig("Popover Title", "Popover Contents ");
    const but = document.createElement("button");
    but.classList.add("btn", "btn-primary");
    but.innerText = "Popover 1";
    document.body.appendChild(but);
    let popover1 = new popover(but, "popover1", popoverConfig);
    popover1.initialise()
      .then(() => {
        //popover1.rootElement.innerText = "Popover 1";
        popover1.onShow((e) => { console.log("show", e); });
        popover1.onShown((e) => { console.log("shown", e); });
        popover1.onHide((e) => { console.log("hide", e); });
        popover1.onHidden((e) => { console.log("hidden", e); });
        popover1.onInserted((e) => { console.log("inserted", e); });

        popover1.mount(but);
      })
    //let popover1 = popovers.createPopover("popover1", "Popover Title", "Popover Contents", popovers.elementTypes.button)
    // popover1.placement = popovers.placements.top;


    // popover1.element.classList.add("btn", "btn-primary");
    // popover1.element.innerText = "Popover 1";
    // popover1.mount(document.body, "append");



  }
}