import { Mrbr_UI_Bootstrap_Controls_TabPanelContainer } from "../ui/bootstrap/controls/TabPanelContainer";
import { Mrbr_UI_Bootstrap_Controls_TabPanelEvent } from "../ui/bootstrap/controls/TabPanelEvent";

export class Mrbr_Tests_Application$TabPanelContainer {

  constructor() {
    const nav = new Mrbr_UI_Bootstrap_Controls_TabPanelContainer("tabPanel_container");
    nav.initialise()
      .then(_ => {
        const homePanel = nav.addTabPanel("homeTab", "Home"),
          aboutPanel = nav.addTabPanel("aboutTab", "About"),
          contactPanel = nav.addTabPanel("contactTab", "Contact");
        homePanel.panel.innerHTML = "This is some placeholder content the Home tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.";
        aboutPanel.panel.innerHTML = "This is some placeholder content the About tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.";
        contactPanel.panel.innerHTML = "This is some placeholder content the Contact tab's associated content. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other .nav-powered navigation.";
        nav.mount(document.body);

        aboutPanel.disabled = true;
        setTimeout(() => {
          nav.setActive("contactTab");
          aboutPanel.disabled = false;
        }, 5000);

        nav.onShow((e: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => {
          console.log("NAV_SHOW_TAB_EVENT", e.data);
        });

        nav.onShown((e: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => {
          console.log("NAV_SHOWN_TAB_EVENT", e.data);
        });

        nav.onHide((e: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => {
          console.log("NAV_HIDE_TAB_EVENT", e.data);
        });

        nav.onHidden((e: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => {
          console.log("NAV_HIDDEN_TAB_EVENT", e.data);
        });
      });
  }
}