import { Mrbr_UI_Bootstrap_Controls_Dropdown } from "../ui/bootstrap/controls/DropDown";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing } from "../ui/bootstrap/controls/Dropdown$AutoClosing";
import { Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments } from "../ui/bootstrap/controls/Dropdown$MenuAlignments";
import { Mrbr_UI_Bootstrap_Controls_SplitDropdown } from "../ui/bootstrap/controls/SplitDropdown";
import { Mrbr_UI_Bootstrap_Utilities_ButtonColours } from "../ui/bootstrap/utilities/buttonColours";


export class Mrbr_Tests_Application$Dropdown {

    constructor() {
        let dropdown: Mrbr_UI_Bootstrap_Controls_Dropdown = new Mrbr_UI_Bootstrap_Controls_Dropdown("dropdown1");
        let submenu2 = new Mrbr_UI_Bootstrap_Controls_Dropdown("submenu2");
        submenu2.isSubMenu = true;
        //let splitDropDown: Mrbr_UI_Bootstrap_Controls_SplitDropdown = new Mrbr_UI_Bootstrap_Controls_SplitDropdown("splitDropdown1");
        //Promise.all([dropdown.initialise(), splitDropDown.initialise()])
        Promise.all([dropdown.initialise(), submenu2.initialise()])
            .then(_ => {
                dropdown.buttonColour = Mrbr_UI_Bootstrap_Utilities_ButtonColours.secondary;
                submenu2.buttonColour = Mrbr_UI_Bootstrap_Utilities_ButtonColours.secondary;
                dropdown.buttonText = "Dropdown";
                //splitDropDown.buttonColour = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonColours.primary;
                //splitDropDown.buttonText = "Split Dropdown";
                //dropdown.splitButton = true;
                //dropdown.addMenuItem("Item 1", () => { alert("Item 1"); });
                //dropdown.addMenuItem("Item 2", () => { alert("Item 2"); });
                //dropdown.addMenuItem("Item 3", () => { alert("Item 3"); });
                dropdown.addMenuItem("menuItem1", "Menu Item 1");
                dropdown.addMenuItem("menuItem2", "Menu Item 2");
                dropdown.addMenuItem("menuItem3", "Menu Item 3");
                dropdown.addDividerMenuItem("divider1");
                dropdown.addMenuItem("menuItem4", "Menu Item 4");
                dropdown.addHeaderMenuItem("headerMenuItem1", "Header Menu Item 1");
                dropdown.darkDropdown = true;

                //submenu2.menuStyle = Mrbr_UI_Bootstrap_Controls_Dropdown.menuStyles.subMenu;
                //let submenu = dropdown.addSubMenuItem("submenu1", "Submenu 1", menu2);
                submenu2.addMenuItem("submenuItem1", "Submenu Item 1");
                submenu2.addMenuItem("submenuItem2", "Submenu Item 2");
                submenu2.alignment = Mrbr_UI_Bootstrap_Controls_Dropdown$MenuAlignments.end;
                dropdown.addSubMenuItem(submenu2);
                //dropdown.autoClose = Mrbr_UI_Bootstrap_Controls_Dropdown.autoClosing.outside;
                dropdown.autoClose = Mrbr_UI_Bootstrap_Controls_Dropdown$AutoClosing.true
                //document.body.appendChild(dropdown.rootElement);
                dropdown.mount(document.body);
                dropdown.onShow(() => { console.log("Dropdown show"); });
                dropdown.onHidden(() => { console.log("Dropdown hidden"); });
                dropdown.onShown(() => { console.log("Dropdown shown"); });
                dropdown.onHide(() => { console.log("Dropdown hide"); });
                dropdown.onMenuItemClick((e) => { console.log("Menu item click: ", e); });
                submenu2.onMenuItemClick((e) => { console.log("Submenu item click: ", e); });
                // dropdown.addEventListener(Mrbr_UI_Bootstrap_Controls_Dropdown.menuItemEvents.buttonClick, (e: Event) => {
                //     console.log("dropdown_button_click", (<InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Dropdown.DropdownEvent>>e));
                // });
                // dropdown.addEventListener("dropdown_menuitem_click", (e: Event) => {
                //     //console.log("dropdown_menuitem_click", (<InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Dropdown.DropdownEvent>>e));
                //     console.log("dropdown_menuitem_click", e)
                // });
                // dropdown.addEventListener("dropdown_submenu_click", (e: Event) => {
                //     console.log("dropdown_submenu_click", (<InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Dropdown.DropdownEvent>>e));
                // })





                //     self.dispatchEvent(new CustomEvent(`${targetDropdownType}_click`, event));
                //     break;
                // case "dropdown_submenu":
                //     self.dispatchEvent(new CustomEvent(`${targetDropdownType}_click`, event));
                //     break;
                // case "dropdown_menuitem":
                //     self.dispatchEvent(new CustomEvent(`${targetDropdownType}_click`, event));
                //dropdown.defaultContainerElement.appendChild(submenu2.rootElement);
                //dropdown.dropdownPosition = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownPositions.dropUp;
                //dropdown.buttonSize = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes.large;
                //dropdown.alignment = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownAlignments.lgEnd;
                //splitDropDown.buttonSize = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes.small;
                //splitDropDown.dropdownPosition = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownPositions.dropEnd;
                //submenu2.offset(100,0)
                //document.body.appendChild(splitDropDown.rootElement);
            });

    }
}