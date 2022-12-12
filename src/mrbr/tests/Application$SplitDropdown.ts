import { Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing } from "../ui/bootstrap/controls/Dropdown$AutoClosing";
import { Mrbr_UI_Bootstrap_Controls_DropdownEvent } from "../ui/bootstrap/controls/DropdownEvent";
import { Mrbr_UI_Bootstrap_Controls_DropdownEventData } from "../ui/bootstrap/controls/DropdownEventData";
import { Mrbr_UI_Bootstrap_Controls_SplitDropdown } from "../ui/bootstrap/controls/SplitDropdown";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../ui/bootstrap/utilities/buttonColours";


export class Mrbr_Tests_Application$SplitDropdown {
  constructor() {
    const dropdown = Mrbr_UI_Bootstrap_Controls_SplitDropdown,
      splitDropdown1 = new dropdown("splitDropdown1");

    splitDropdown1
      .initialise()
      .then(_ => {
        splitDropdown1.buttonColour = Mrbr_UI_Bootstrap_Utilities_ButtonColours.primary;
        splitDropdown1.buttonText = "Dropdown";
        splitDropdown1.addMenuItem("menuItem1", "Menu Item 1");
        splitDropdown1.addMenuItem("menuItem2", "Menu Item 2");
        splitDropdown1.addMenuItem("menuItem3", "Menu Item 3");
        splitDropdown1.addDividerMenuItem("divider1");
        splitDropdown1.addMenuItem("menuItem4", "Menu Item 4");
        splitDropdown1.addHeaderMenuItem("headerMenuItem1", "Header Menu Item 1");
        splitDropdown1.darkDropdown = true;
        splitDropdown1.autoClose = Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing.true
        splitDropdown1.mount(document.body);
        splitDropdown1.onShow(() => { console.log("Dropdown show"); });
        splitDropdown1.onHidden(() => { console.log("Dropdown hidden"); });
        splitDropdown1.onShown(() => { console.log("Dropdown shown"); });
        splitDropdown1.onHide(() => { console.log("Dropdown hide"); });
        splitDropdown1.onMenuItemClick((e: Mrbr_UI_Bootstrap_Controls_DropdownEvent) => {
          const
            data = <Mrbr_UI_Bootstrap_Controls_DropdownEventData>e.data,
            text = data.target?.querySelector("a")?.innerText;
          text && (splitDropdown1.buttonText = text);
          console.log("Menu item click: ", e);
        });
        splitDropdown1.onMainButtonClick((e) => { console.log("Main button click: ", e); });
      });
  }
}