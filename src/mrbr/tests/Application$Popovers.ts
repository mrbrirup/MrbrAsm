import { Mrbr_UI_Bootstrap_Controls_Popovers } from "../ui/bootstrap/controls/Popovers";

export class Mrbr_Tests_Application$Popovers {

  constructor() {
    const popovers = Mrbr_UI_Bootstrap_Controls_Popovers;

    let popover1 = popovers.createPopover("popover1", "Popover Title", "Popover Contents", popovers.elementTypes.button)
    popover1.placement = popovers.placements.top;
    

    popover1.element.classList.add("btn", "btn-primary");
    popover1.element.innerText = "Popover 1";
    popover1.mount(document.body, "append");



  }
}