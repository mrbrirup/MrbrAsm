import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";

export class Mrbr_UI_Bootstrap_Controls_ListGroupTabs extends Mrbr_UI_Controls_Control {

    public static readonly LISTGROUPTABS_CONTROL_NAME: string = "tabs_panel";
    public static readonly TABS_LISTGROUP_NAME: string = "tabs_listgroup";
    public static readonly TABS_LISTGROUP_COLUMN_NAME: string = "tabs_listgroup_column";
    public static readonly TABS_PANES_NAME: string = "tabs_panes";
    public static readonly TABS_PANES_COLUMN_NAME: string = "tabs_panes_column";

    public static readonly TABS_LISTGROUP_ITEM_NAME: string = "tabs_listgroup_item";
    public static readonly TABS_PANE_ITEM_NAME: string = "tabs_pane_item";
    public static ContextualStyles = {
        primary: "list-group-item-primary",
        secondary: "list-group-item-secondary",
        success: "list-group-item-success",
        danger: "list-group-item-danger",
        warning: "list-group-item-warning",
        info: "list-group-item-info",
        light: "list-group-item-light",
        dark: "list-group-item-dark",
        none: ""
    } as const;
    public static TabPane = class {
        _tab: HTMLElement;
        _pane: HTMLElement;
        constructor(tab: HTMLElement, pane: HTMLElement) {
            this._tab = tab;
            this._pane = pane;
        }
        public get tab(): HTMLElement { return this._tab; }
        public get pane(): HTMLElement { return this._pane }
    }

    private _tabPanes: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane>> = new Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane>>();
    private _numberedList: boolean = false;
    public get tabPanes(): Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane>> { return this._tabPanes; }
    public set tabPanes(value: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane>>) { this._tabPanes = value; }

    get $cls() { return Mrbr_UI_Bootstrap_Controls_ListGroupTabs; }

    constructor(rootElementName: string) { super(rootElementName); }

    initialise(...args: any[]): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_ListGroupTabs> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroupTabs>("Mrbr_UI_Bootstrap_Controls_ListGroupTabs:initialise");
        super.initialise(args)
            .then(async _ => {
                await self.setDefaultConfig();

                const listGroupId = self.$cls.createId("listGroup"),
                    panesPanelId = self.$cls.createId("panesPanel"),
                    listGroup = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.TABS_LISTGROUP_NAME, "div", self.configuration(self.$cls.TABS_LISTGROUP_NAME))
                        .Id(listGroupId)),
                    listGroupColumn = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.TABS_LISTGROUP_COLUMN_NAME, "div", self.configuration(self.$cls.TABS_LISTGROUP_COLUMN_NAME)
                        .Classes("col-4")
                        .Children([listGroup]),
                    )),
                    panesPanel = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.TABS_PANES_NAME, "div", self.configuration(self.$cls.TABS_PANES_NAME))
                        .Id(panesPanelId),
                    ),
                    panesColumn = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.TABS_PANES_COLUMN_NAME, "div", self.configuration(self.$cls.TABS_PANES_COLUMN_NAME))
                        .Classes("col-8")
                        .Children([panesPanel])
                    );
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.LISTGROUPTABS_CONTROL_NAME))
                    .Children([listGroupColumn, panesColumn])
                )
                self.events["tab_click"] = new Mrbr_System_Events_EventHandler("shown.bs.tab", self.elements[self.$cls.TABS_LISTGROUP_NAME], (e: Event) => {
                    e.stopPropagation();
                    self.dispatchEvent(new CustomEvent("tab_click", e));
                });
                self.numberedList = self._numberedList;
                initalisePromise.resolve(self);
            })

        return initalisePromise;
    }
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_ListGroupTabs> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroupTabs>("Mrbr_UI_Bootstrap_Controls_ListGroupTabs:setDefaultConfig");

        super.setDefaultConfig()
            .then(async _ => {

                !self.hasConfiguration(self.$cls.LISTGROUPTABS_CONTROL_NAME) && self.defaultConfig.add(self.$cls.LISTGROUPTABS_CONTROL_NAME, new self.$ctrlPrm()
                    .Attributes({ role: "tabpanel" })
                    .Classes("row")
                );
                !self.hasConfiguration(self.$cls.TABS_LISTGROUP_COLUMN_NAME) && self.defaultConfig.add(self.$cls.TABS_LISTGROUP_COLUMN_NAME, new self.$ctrlPrm())
                !self.hasConfiguration(self.$cls.TABS_LISTGROUP_NAME) && self.defaultConfig.add(self.$cls.TABS_LISTGROUP_NAME, new self.$ctrlPrm()
                    .Classes("list-group")
                    .Attributes({ role: "tablist" }));
                !self.hasConfiguration(self.$cls.TABS_PANES_COLUMN_NAME) && self.defaultConfig.add(self.$cls.TABS_PANES_COLUMN_NAME, new self.$ctrlPrm())
                !self.hasConfiguration(self.$cls.TABS_PANES_NAME) && self.defaultConfig.add(self.$cls.TABS_PANES_NAME, new self.$ctrlPrm()
                    .Classes("tab-content"));

                !self.hasConfiguration(self.$cls.TABS_LISTGROUP_ITEM_NAME) && self.defaultConfig.add(self.$cls.TABS_LISTGROUP_ITEM_NAME, new self.$ctrlPrm()
                    .Classes("list-group-item list-group-item-action")
                    .Data({ bsToggle: "list", role: "tab" })
                );
                !self.hasConfiguration(self.$cls.TABS_PANE_ITEM_NAME) && self.defaultConfig.add(self.$cls.TABS_PANE_ITEM_NAME, new self.$ctrlPrm()
                    .Classes("tab-pane fade")
                    .Attributes({ role: "tabpanel" })
                );


                setDefaultConfigPromise.resolve(self);
            });

        return setDefaultConfigPromise;
    }
    public addTab(tabName: string, title: string, panelContents?: string): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane> {
        const
            self = this,
            id = self.$cls.createId("tab"),
            tabId = `${id}_tab`,
            tabPaneId = `${id}_pane`,
            listItemText = document.createElement("span"),
            listItem = <HTMLElement>self.createElement(new self.$ctrlCfg(tabName, "a", self.configuration(self.$cls.TABS_LISTGROUP_ITEM_NAME))
                .Id(tabId)
                .Properties({ href: `#${tabPaneId}` })
                .Aria({ controls: tabPaneId })
                .Children([listItemText])
            ),
            pane = <HTMLElement>self.createElement(new self.$ctrlCfg(`${tabName}_pane`, "div", self.configuration(self.$cls.TABS_PANE_ITEM_NAME))
                .Id(tabPaneId)
                .Aria({ labelledby: tabId })),
            tabPane = new self.$cls.TabPane(listItem, pane);
        self.properties(listItemText, { innerText: title, id: `${id}_text` });
        panelContents && self.properties(pane, { innerHTML: panelContents })
        self.elements[self.$cls.TABS_LISTGROUP_NAME].appendChild(listItem);
        self.elements[self.$cls.TABS_PANES_NAME].appendChild(pane);
        self.tabPanes.set(tabName, tabPane);
        return tabPane;
    }
    public removeTab(tabName: string): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane> {
        const self = this;
        let tabPane: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane>;
        if (self.tabPanes.has(tabName)) {
            tabPane = self.tabPanes.get(tabName);
            self.elements[self.$cls.TABS_LISTGROUP_NAME].removeChild(tabPane.tab);
            self.elements[self.$cls.TABS_PANES_NAME].removeChild(tabPane.pane);
            self.tabPanes.delete(tabName);
            self.elements[tabName] = self.$cls.DELETE_ENTRY;
            self.elements[`${tabName}_pane`] = self.$cls.DELETE_ENTRY;
            return tabPane;
        }
        return null;
    }
    public setItemContextStyle(tabName: string, style: typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.ContextualStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.ContextualStyles]): HTMLElement {
        const self = this,
            tabPane = self.tabPanes.get(tabName);
        if (!tabPane) { return null; }
        const listGroupItem: HTMLElement = tabPane.tab;
        Reflect.ownKeys(self.$cls.ContextualStyles).forEach(key => {
            const _style: string = self.$cls.ContextualStyles[key as keyof typeof self.$cls.ContextualStyles];
            (listGroupItem) && self.classes(listGroupItem, self.$clsActions.Remove, _style);
        });
        (listGroupItem) && self.classes(listGroupItem, self.$clsActions.Add, style);
        return listGroupItem;
    }
    public getActiveTab(): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane> {
        const self = this;
        let activeTab: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane>;
        self.tabPanes.forEach(tabPane => {
            if (tabPane.tab.classList.contains("active")) {
                activeTab = tabPane;
            }
        }
        );
        return activeTab;
    }
    public setActiveTab(tabName: string): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane> {
        const self = this;
        let activeTab: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs.TabPane>;
        if (self.tabPanes.has(tabName)) {
            activeTab = self.tabPanes.get(tabName);
            self.classes(activeTab.tab, self.$clsActions.Add, "active");
            self.classes(activeTab.pane, self.$clsActions.Add, "active show");
            let bootstrapTab = self.$mrbr.host["bootstrap"]?.Tab?.getOrCreateInstance(activeTab.tab);
            bootstrapTab?.show();
        }
        return activeTab;
    }
    public get numberedList(): boolean { return this._numberedList; }
    public set numberedList(value: boolean) {
        const self = this;
        self._numberedList = value;
        self.elements[self.$cls.TABS_LISTGROUP_NAME] && self.classes(self.elements[self.$cls.TABS_LISTGROUP_NAME], value ? self.$clsActions.Add : self.$clsActions.Remove, "list-group-numbered");
    }
}