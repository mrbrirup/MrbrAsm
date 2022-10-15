import { Mrbr_UI_Bootstrap_Controls_Dropdown } from "../ui/bootstrap/controls/DropDown";
import { Mrbr_UI_Bootstrap_Controls_SplitDropdown } from "../ui/bootstrap/controls/SplitDropdown";


export class Mrbr_Tests_Application$Dropdown {

    constructor() {
        let dropdown: Mrbr_UI_Bootstrap_Controls_Dropdown = new Mrbr_UI_Bootstrap_Controls_Dropdown("dropdown1");
        let submenu2 = new Mrbr_UI_Bootstrap_Controls_Dropdown("submenu2");
        submenu2.isSubMenu = true;
        //let splitDropDown: Mrbr_UI_Bootstrap_Controls_SplitDropdown = new Mrbr_UI_Bootstrap_Controls_SplitDropdown("splitDropdown1");
        //Promise.all([dropdown.initialise(), splitDropDown.initialise()])
        Promise.all([dropdown.initialise(), submenu2.initialise()])
            .then(_ => {
                dropdown.buttonColour = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonColours.danger;
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
                submenu2.alignment = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownAlignments.end;
                dropdown.defaultContainerElement.appendChild(submenu2.rootElement);
                //dropdown.dropdownPosition = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownPositions.dropUp;
                //dropdown.buttonSize = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes.large;
                //dropdown.alignment = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownAlignments.lgEnd;
                //splitDropDown.buttonSize = Mrbr_UI_Bootstrap_Controls_Dropdown.buttonSizes.small;
                //splitDropDown.dropdownPosition = Mrbr_UI_Bootstrap_Controls_Dropdown.dropdownPositions.dropEnd;
                dropdown.autoClose = Mrbr_UI_Bootstrap_Controls_Dropdown.autoClosing.outside;
                document.body.appendChild(dropdown.rootElement);
                //submenu2.offset(100,0)
                //document.body.appendChild(splitDropDown.rootElement);
            });

    }
}