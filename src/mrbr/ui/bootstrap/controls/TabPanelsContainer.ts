import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_TabPanelsContainer extends Mrbr_UI_Controls_Control {

    private static _tabpanels_container_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _tab_tabs_container_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _tab_panels_container_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _tab_panel_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _tab_buttons_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;

    public static TabPanel = class {
        panel: HTMLDivElement;
        tab: HTMLButtonElement;
        _disabled: boolean;
        constructor(tab: HTMLButtonElement, panel: HTMLDivElement) {
            this.panel = panel;
            this.tab = tab;
        }
        public get disabled(): boolean { return this._disabled; }
        public set disabled(value: boolean) {
            const self = this;
            if (self.tab) {
                (value) ? self.tab.setAttribute("disabled", value.toString()) : self.tab.removeAttribute("disabled");
            }
            self._disabled = value;
        }
    }
    public static tabStyles = {
        "tabs": "tabs",
        "pills": "pills"
    } as const;
    private _horizontal: boolean = false;
    private _navbarControls: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel>> = new Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel>>();
    private _panelsContainer: HTMLElement;
    private _tabsContainer: HTMLElement;
    private _tabStyle: typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles] = Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles.tabs;

    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer { return Mrbr_UI_Bootstrap_Controls_TabPanelsContainer; }

    constructor(rootElementName: string) { super(rootElementName); }


    public get tabPanelsContainerConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        !self.$cls._tabpanels_container_config && (
            self.$cls._tabpanels_container_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters())
        return self.$cls._tabpanels_container_config;
    }

    public get tabsContainerConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        !self.$cls._tab_tabs_container_config && (self.$cls._tab_tabs_container_config =
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes("nav")
                .Attributes({ role: "tablist" }))
        return self.$cls._tab_tabs_container_config;
    }


    public get panelsContainerConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        !self.$cls._tab_panels_container_config && (self.$cls._tab_panels_container_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("tab-content"))
        return self.$cls._tab_panels_container_config;
    }


    public get panelConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        !self.$cls._tab_panel_config && (self.$cls._tab_panel_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters())
        return self.$cls._tab_panel_config;
    }


    public get navButtonConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        !self.$cls._tab_buttons_config && (self.$cls._tab_buttons_config =
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes("nav-link")
                .Attributes({ role: "tab", type: "button" })
                .Aria({ "selected": "false" }))
        return self.$cls._tab_buttons_config;
    }

    public get tabStyle(): typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles] { return this._tabStyle; }
    public set tabStyle(value: typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.tabStyles]) {
        const self = this;
        self.navbarControls.forEach((element, key) => {
            self.dataset(element.tab, { bsToggle: value })
        });
        self.tabsContainer && self.classes(self.tabsContainer, self.$clsActions.Remove, `nav-${self._tabStyle}`);
        self.tabsContainer && self.classes(self.tabsContainer, self.$clsActions.Add, `nav-${value}`);
        self._tabStyle = value;
    }

    public get navbarControls(): Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel>> { return this._navbarControls; }
    public set navbarControls(value: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel>>) { this._navbarControls = value; }

    public get panelsContainer(): HTMLElement { return this._panelsContainer; }
    public set panelsContainer(value: HTMLElement) { this._panelsContainer = value; }
    public get tabsContainer(): HTMLElement { return this._tabsContainer; }
    public set tabsContainer(value: HTMLElement) { this._tabsContainer = value; }


    public get horizontal(): boolean { return this._horizontal; }
    public set horizontal(value: boolean) {
        const self = this;
        (self.rootElement) && self.classes(self.rootElement, value ? self.$clsActions.Add : self.$clsActions.Remove, "d-flex align-items-start");
        self._horizontal = value;
    }


    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_TabPanelsContainer> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_TabPanelsContainer>("Mrbr_UI_Bootstrap_Controls_TabPanelsContainer:initialise"),
            tabsContainerName = `${self.rootElementName}_tabsContainer`,
            panelsContainerName = `${self.rootElementName}_panelsContainer`,
            tabsContainerId = self.$cls.createId("tabs"),
            panelsContainerId = self.$cls.createId("panels");
        super.initialise(args)
            .then(async _ => {
                self.tabsContainer = <HTMLDivElement>self.createElement(new self.$ctrlCfg(tabsContainerName, "div", self.tabsContainerConfig
                    .Id(tabsContainerId)));
                self.panelsContainer = <HTMLDivElement>self.createElement(new self.$ctrlCfg(panelsContainerName, "div", self.panelsContainerConfig
                    .Id(panelsContainerId)));
                self.createElement(new self.$ctrlCfg(self.rootElementName, "nav", self.tabPanelsContainerConfig
                    .Children([self.tabsContainer, self.panelsContainer])));
                self.horizontal = self._horizontal;
                self.tabStyle = self._tabStyle;
                initialisePromise.resolve(self);
            });
        return initialisePromise;
    }

    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_TabPanelsContainer> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_TabPanelsContainer>("Mrbr_UI_Bootstrap_Controls_TabPanelsContainer:setDefaultConfig");
        super.setDefaultConfig()
            .then(_ => {
                setDefaultConfigPromise.resolve(self);
            });
        return setDefaultConfigPromise;
    }

    public addTabPanel(name: string, text: string): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel> {
        const
            self = this,
            tabId = self.$cls.createId("tab"),
            panelId = self.$cls.createId("panel"),
            tabPanel = new Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel(
                <HTMLButtonElement>self.createElement(new self.$ctrlCfg(`${self.rootElementName}_tab_${name}`, "button", self.navButtonConfig
                    .Id(tabId)
                    .Data({ "bsTarget": `#${panelId}`, "bsToggle": self._tabStyle })
                    .Aria({ "controls": panelId, "selected": "false" })
                    .Properties({ innerText: text }))),
                <HTMLDivElement>self.createElement(new self.$ctrlCfg(`${self.rootElementName}_panel_${name}`, "div", self.panelConfig
                    .Id(panelId)
                    .Classes("tab-pane fade")
                    .Aria({ "labelledby": tabId })
                    .Attributes({ role: "tabpanel" })
                    .Properties({ tabIndex: 0 })))
            )
        self.tabsContainer.appendChild(tabPanel.tab);
        self.panelsContainer.appendChild(tabPanel.panel);
        self._navbarControls.size === 0 && (self.classes([tabPanel.tab, tabPanel.panel], self.$clsActions.Add, "active show"));
        self._navbarControls.set(name, tabPanel);
        return tabPanel;
    }
    public setActive(name: string): Mrbr_UI_Bootstrap_Controls_TabPanelsContainer {
        const self = this;
        let activetab = self._navbarControls.get(name).tab;
        activetab && self.$mrbr.host["bootstrap"].Tab.getOrCreateInstance(activetab).show();
        return self;
    }
    public getActive(): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel> {
        const self = this;
        let activeTabPanel: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_TabPanelsContainer.TabPanel>;
        self._navbarControls.forEach((value, key) => !activeTabPanel && value.tab.classList.contains("active") && (activeTabPanel = value));
        return activeTabPanel;
    }
    public setDisabled(name: string, disabled: boolean): Mrbr_UI_Bootstrap_Controls_TabPanelsContainer {
        const self = this;
        self._navbarControls.has(name) && (self._navbarControls.get(name).disabled = disabled);
        return self;
    }
}