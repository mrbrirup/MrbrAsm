import { Mrbr_UI_Bootstrap_Controls_ListGroupTabs } from "../ui/bootstrap/controls/ListGroupTabs";

export class Mrbr_Tests_Application$ListGroupTabs {

    constructor() {
        const listGroupTabs = new Mrbr_UI_Bootstrap_Controls_ListGroupTabs("listGroupTabs");
        listGroupTabs.numberedList = true;
        listGroupTabs.initialise()
            .then(_ => {
                const
                    tabPanel1 = listGroupTabs.addTab("tab1", "Tab 1", "Tab 1 Content"),
                    tabPanel2 = listGroupTabs.addTab("tab2", "Tab 2", "Tab 2 Content"),
                    tabPanel3 = listGroupTabs.addTab("tab3", "Tab 3", "Tab 3 Content"),
                    tabPanel4 = listGroupTabs.addTab("tab4", "Tab 4", "Tab 4 Content");
                tabPanel4.pane.innerHTML = `<strong>A simple primary list group item</strong>`;
                listGroupTabs.setActiveTab("tab3");
                document.body.appendChild(listGroupTabs.rootElement);
                listGroupTabs.addEventListener("tab_click", (e: Event) => {
                    console.log("tab_click", e);
                });
            });

    }
}