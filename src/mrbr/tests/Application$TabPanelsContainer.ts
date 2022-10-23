import { Mrbr_UI_Bootstrap_Controls_TabPanelsContainer } from "../ui/bootstrap/controls/TabPanelsContainer";

export class Mrbr_Tests_Application$TabPanelsContainer {

  constructor() {
    const nav = new Mrbr_UI_Bootstrap_Controls_TabPanelsContainer("navbar");
    nav.initialise()
      .then(_ => {
        const homePanel = nav.addTabPanel("homeTab", "Home"),
          aboutPanel = nav.addTabPanel("aboutTab", "About"),
          contactPanel = nav.addTabPanel("contactTab", "Contact");
        homePanel.panel.innerHTML = "This is some placeholder content the Home tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.";
        aboutPanel.panel.innerHTML = "This is some placeholder content the About tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.";
        contactPanel.panel.innerHTML = "This is some placeholder content the Contact tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.";
        document.body.appendChild(nav.rootElement);

        aboutPanel.disabled = true;
        setTimeout(() => {
          nav.setActive("contactTab");
          aboutPanel.disabled = false;
        }, 5000);
        nav.addEventListener(Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.NAV_SHOW_TAB_EVENT,
          (e: Event) => {
            console.log("NAV_SHOW_TAB_EVENT", (e as CustomEvent).detail);
          });

        setTimeout(() => {
          nav.horizontal = true;
          nav.tabStyle = Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles.pills;
        }, 10000);

      });
  }
}