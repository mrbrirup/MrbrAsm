import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_TabPanel } from "./TabPanel";
import { Mrbr_UI_Bootstrap_Controls_TabPanelEvent } from "./TabPanelEvent";
import { Mrbr_UI_Bootstrap_Controls_TabPanelEventData } from "./TabPanelEventData";
import { Mrbr_UI_Bootstrap_Controls_TabStyles } from "./TabStyles";

/**
 * TabsPanel Container Control
 * @date 12/12/2022 - 08:58:19
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_TabPanelContainer
 * @typedef {Mrbr_UI_Bootstrap_Controls_TabPanelContainer}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Controls_TabPanelContainer extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Internal Tabs Panel Container Name
     * @date 12/12/2022 - 08:58:37
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABPANEL_CONTAINER: string = "tabpanel_container";

    /**
     * Internal Tabs Container Name
     * @date 12/12/2022 - 08:59:00
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABPANEL_TABS_CONTAINER: string = "tabs_container";

    /**
     * Internal Panels Container Name
     * @date 12/12/2022 - 08:59:11
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABPANEL_PANELS_CONTAINER: string = "tab_panels_container";

    /**
     * Internal Tab Panel Name
     * @date 12/12/2022 - 08:59:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TAB_PANEL: string = "tab_panel";

    /**
     * Internal Tab Button Name
     * @date 12/12/2022 - 08:59:35
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TAB_BUTTON: string = "tab_button";


    /**
     * Boostrap Tab Hide Event Name
     * @date 12/12/2022 - 08:59:43
     *
     * @public
     * @static
     * @type {string}
     */
    public static NAV_HIDE_TAB_EVENT: string = "hide.bs.tab";

    /**
     * Boostrap Tab Show Event Name
     * @date 12/12/2022 - 08:59:59
     *
     * @public
     * @static
     * @type {string}
     */
    public static NAV_SHOW_TAB_EVENT: string = "show.bs.tab";

    /**
     * Boostrap Tab Hidden Event Name
     * @date 12/12/2022 - 09:00:06
     *
     * @public
     * @static
     * @type {string}
     */
    public static NAV_HIDDEN_TAB_EVENT: string = "hidden.bs.tab";

    /**
     * Boostrap Tab Shown Event Name
     * @date 12/12/2022 - 09:00:13
     *
     * @public
     * @static
     * @type {string}
     */
    public static NAV_SHOWN_TAB_EVENT: string = "shown.bs.tab";


    /**
     * TabPanel Container Horizontal Orientation field
     * @date 12/12/2022 - 09:00:22
     *
     * @private
     * @type {boolean}
     */
    private _horizontal: boolean = false;

    /**
     * TabPanel Collection
     * @date 12/12/2022 - 09:01:22
     *
     * @private
     * @type {Map<string, Mrbr_UI_Bootstrap_Controls_TabPanel>}
     */
    private _tabPanels: Map<string, Mrbr_UI_Bootstrap_Controls_TabPanel>;

    /**
     * TabPanel Container Tab Style
     * @date 12/12/2022 - 09:01:37
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_TabStyles}
     */
    private _tabStyle: Mrbr_UI_Bootstrap_Controls_TabStyles;


    /**
     * TabPanel Container Type Alias
     * @date 12/12/2022 - 09:01:50
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_TabPanelContainer}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_TabPanelContainer { return Mrbr_UI_Bootstrap_Controls_TabPanelContainer; }


    /**
     * TabPanel Styles Enum Alias
     * @date 12/12/2022 - 09:02:04
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_TabStyles}
     */
    public get $TabStyles(): typeof Mrbr_UI_Bootstrap_Controls_TabStyles { return this.$bsc.TabStyles as typeof Mrbr_UI_Bootstrap_Controls_TabStyles; }

    /**
     * TabPanel Type Alias
     * @date 12/12/2022 - 09:02:23
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_TabPanel}
     */
    public get $TabPanel(): typeof Mrbr_UI_Bootstrap_Controls_TabPanel { return this.$bsc.TabPanel as typeof Mrbr_UI_Bootstrap_Controls_TabPanel; }


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_TabPanelContainer.
     * @date 12/12/2022 - 09:02:54
     *
     * @constructor
     * @param {string} rootElementName
     */
    constructor(rootElementName: string) { super(rootElementName); }

    /**
     * TabPanel Container Tab Style
     * @date 12/12/2022 - 09:02:59
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_TabStyles}
     */
    public get tabStyle(): Mrbr_UI_Bootstrap_Controls_TabStyles { return this._tabStyle ??= this.$TabStyles.tabs }

    /**
     * TabPanel Container Tab Style
     */
    public set tabStyle(value: Mrbr_UI_Bootstrap_Controls_TabStyles) {
        const
            self = this,
            tabsContainer = self.elements.get(self.$cls.TABPANEL_TABS_CONTAINER);
        tabsContainer && self.classes(tabsContainer, self.$clsActions.replace, [self._tabStyle, value]);
        self._tabStyle = value;
        const linkToggleStyle = self.linkToggleStyle();
        self.tabPanels.forEach((element, key) => self.dataset(element.tab, { bsToggle: linkToggleStyle }));
    }

    /**
     * TabPanel Collection
     * @date 12/12/2022 - 09:03:37
     *
     * @public
     * @type {Map<string, Mrbr_UI_Bootstrap_Controls_TabPanel>}
     */
    public get tabPanels(): Map<string, Mrbr_UI_Bootstrap_Controls_TabPanel> { return this._tabPanels ??= new Map<string, Mrbr_UI_Bootstrap_Controls_TabPanel>(); }

    /**
     * TabPanel Collection
     */
    public set tabPanels(value: Map<string, Mrbr_UI_Bootstrap_Controls_TabPanel>) { this._tabPanels = value; }


    /**
     * TabPanel Panels Container Element
     * @date 12/12/2022 - 09:03:56
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get panelsContainer(): HTMLElement { return this.elements.get(this.$cls.TABPANEL_PANELS_CONTAINER); }

    /**
     * TabPanel Tabs Container Element
     * @date 12/12/2022 - 09:04:06
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get tabsContainer(): HTMLElement { return this.elements.get(this.$cls.TABPANEL_TABS_CONTAINER); }


    /**
     * TabPanel Container Horizontal Orientation Property
     * @date 12/12/2022 - 09:04:24
     *
     * @public
     * @type {boolean}
     */
    public get horizontal(): boolean { return this._horizontal; }

    /**
     * TabPanel Container Horizontal Orientation Property
     */
    public set horizontal(value: boolean) {
        const self = this,
            root = self.rootElement,
            act = self.$clsActions;
        (root) && self.classes(root, value ? act.add : act.remove, "d-flex align-items-start");
        self._horizontal = value;
    }

    /**
     * Returns Boostrap Tab Toggle Style from TabPanel Container Tab Style
     * @date 12/12/2022 - 09:04:47
     *
     * @private
     * @returns {("tab" | "pill")}
     */
    private linkToggleStyle() { return this.tabStyle !== this.$TabStyles.pills ? "tab" : "pill"; }



    /**
     * Initialises the TabPanel Container, loads manifest and creates TabPanels
     * @date 12/12/2022 - 09:05:37
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_TabPanelContainer>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_TabPanelContainer> {
        const self = this,
            cls = self.$cls,
            ctrlCfg = self.$ctrlCfg,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_TabPanelContainer>("Mrbr_UI_Bootstrap_Controls_TabPanelsContainer:initialise"),
            tabsContainerId = cls.createId("tabs"),
            panelsContainerId = cls.createId("panels"),
            elementConfig = self.elementConfig;
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(cls);
                await self.setDefaultConfig();
                const
                    tabsContainer = <HTMLDivElement>self.createElement(new ctrlCfg(cls.TABPANEL_TABS_CONTAINER, "div", elementConfig.getConfig(cls.TABPANEL_TABS_CONTAINER)
                        .Id(tabsContainerId))),
                    panelsContainer = <HTMLDivElement>self.createElement(new ctrlCfg(cls.TABPANEL_PANELS_CONTAINER, "div", elementConfig.getConfig(cls.TABPANEL_PANELS_CONTAINER)
                        .Id(panelsContainerId)));
                self.createElement(new ctrlCfg(self.rootElementName, "nav", elementConfig.getConfig(cls.TABPANEL_CONTAINER)
                    .Children([tabsContainer, panelsContainer])));
                self.horizontal = self.horizontal;
                self.tabStyle = self.tabStyle;

                initialisePromise.resolve(self);
            });
        return initialisePromise;
    }
    /**
     * Set default configuration
     * @date 12/12/2022 - 09:05:09
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_TabPanelContainer>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_TabPanelContainer> {
        const self = this,
            cls = self.$cls,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .initialise()
            .then(() => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(cls.TABPANEL_CONTAINER, new self.$ctrlPrm()
                        .Classes("nav"))
                    .setIfNotExist(cls.TABPANEL_TABS_CONTAINER, new self.$ctrlPrm()
                        .Classes("nav")
                        .Attributes({ role: "tablist" }))
                    .setIfNotExist(cls.TABPANEL_PANELS_CONTAINER, new self.$ctrlPrm()
                        .Classes("tab-content"))
                    .setIfNotExist(cls.TAB_PANEL, new self.$ctrlPrm())
                    .setIfNotExist(cls.TAB_BUTTON, new self.$ctrlPrm()
                        .Classes("nav-link")
                        .Attributes({ role: "tab", type: "button" })
                        .Aria({ "selected": "false" }));


                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error))
        return setDefaultConfigPromise;

    }

    /**
     * Get TabPanel Event Data from Boostrap Event for TabPanel Event
     * @date 12/12/2022 - 09:05:59
     *
     * @private
     * @param {string} eventName
     * @param {MouseEvent} event
     * @returns {Mrbr_UI_Bootstrap_Controls_TabPanelEventData}
     */
    private getTabPanelEventData(eventName: string, event: MouseEvent): Mrbr_UI_Bootstrap_Controls_TabPanelEventData {
        const eventData = new Mrbr_UI_Bootstrap_Controls_TabPanelEventData(event),
            cls = this.$cls,
            target = <HTMLElement>event.target,
            relatedTarget = <HTMLElement>event.relatedTarget;
        let targetTab,
            relatedTargetTab;
        if (target) { this.tabPanels.forEach((value, key) => { if (value.tab.id === target.id) { targetTab = value; } }); }
        if (relatedTarget) { this.tabPanels.forEach((value, key) => { if (value.tab.id === relatedTarget.id) { relatedTargetTab = value; } }); }
        switch (eventName) {
            case cls.NAV_HIDE_TAB_EVENT:
                eventData
                    .CurrentTab(targetTab)
                    .NextTab(relatedTargetTab);
                break;
            case cls.NAV_HIDDEN_TAB_EVENT:
                eventData
                    .CurrentTab(relatedTargetTab)
                    .PreviousTab(targetTab);
                break;
            case cls.NAV_SHOW_TAB_EVENT:
            case cls.NAV_SHOWN_TAB_EVENT:
                eventData
                    .CurrentTab(targetTab)
                    .PreviousTab(relatedTargetTab);
                break;
        }
        return eventData;
    }

    /**
     * OnHide Event Subscriber
     * @date 12/12/2022 - 09:06:30
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number)} callback
     * @returns {number}
     */
    public onHide(callback: (event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number): number {
        const eventName = this.$cls.NAV_HIDE_TAB_EVENT;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.hideTab_handler,
            this,
            callback)
    }


    /**
     * OnHidden Event Subscriber
     * @date 12/12/2022 - 09:06:48
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number)} callback
     * @returns {number}
     */
    public onHidden(callback: (event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number): number {
        const
            self = this,
            eventName = this.$cls.NAV_HIDDEN_TAB_EVENT;
        if (typeof callback === "number") {
            self.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            self.rootElement,
            self.hiddenTab_handler,
            self,
            callback)
    }

    /**
     * OnShow Event Subscriber
     * @date 12/12/2022 - 09:07:27
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number)} callback
     * @returns {number}
     */
    public onShow(callback: (event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number): number {
        const eventName = this.$cls.NAV_SHOW_TAB_EVENT;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.showTab_handler,
            this,
            callback)
    }

    /**
     * OnShown Event Subscriber
     * @date 12/12/2022 - 09:07:35
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number)} callback
     * @returns {number}
     */
    public onShown(callback: (event: Mrbr_UI_Bootstrap_Controls_TabPanelEvent) => void | number): number {
        const eventName = this.$cls.NAV_SHOWN_TAB_EVENT;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.addDeferredOnMountFn(
            eventName,
            eventName,
            this.rootElement,
            this.shownTab_handler,
            this,
            callback)
    }

    /**
     * Hide Tab Event Handler
     * @date 12/12/2022 - 09:07:43
     *
     * @private
     * @param {MouseEvent} event
     */
    private hideTab_handler(event: MouseEvent) {
        const
            eventName = this.$cls.NAV_HIDE_TAB_EVENT,
            tabEvent = new Mrbr_UI_Bootstrap_Controls_TabPanelEvent(eventName, this, this.getTabPanelEventData(eventName, event));
        this.eventSubscribers.raiseEvent(tabEvent);
    }

    /**
     * Hidden Tab Event Handler
     * @date 12/12/2022 - 09:07:55
     *
     * @private
     * @param {MouseEvent} event
     */
    private hiddenTab_handler(event: MouseEvent) {
        const eventName = this.$cls.NAV_HIDDEN_TAB_EVENT;
        this.eventSubscribers.raiseEvent(new Mrbr_UI_Bootstrap_Controls_TabPanelEvent(eventName, this, this.getTabPanelEventData(eventName, event)));
    }

    /**
     * Show Tab Event Handler
     * @date 12/12/2022 - 09:08:04
     *
     * @private
     * @param {MouseEvent} event
     */
    private showTab_handler(event: MouseEvent) {
        const eventName = this.$cls.NAV_SHOW_TAB_EVENT;
        this.eventSubscribers.raiseEvent(new Mrbr_UI_Bootstrap_Controls_TabPanelEvent(eventName, this, this.getTabPanelEventData(eventName, event)));
    }

    /**
     * Shown Tab Event Handler
     * @date 12/12/2022 - 09:08:12
     *
     * @private
     * @param {MouseEvent} event
     */
    private shownTab_handler(event: MouseEvent) {
        const eventName = this.$cls.NAV_SHOWN_TAB_EVENT;
        this.eventSubscribers.raiseEvent(new Mrbr_UI_Bootstrap_Controls_TabPanelEvent(eventName, this, this.getTabPanelEventData(eventName, event)));
    }

    /**
     * Add TabPanel, adds a Tab and Panel to respective containers
     * @date 12/12/2022 - 09:08:20
     *
     * @public
     * @param {string} name
     * @param {string} text
     * @returns {Mrbr_UI_Bootstrap_Controls_TabPanel}
     */
    public addTabPanel(name: string, text: string): Mrbr_UI_Bootstrap_Controls_TabPanel {
        const
            self = this,
            cls = self.$cls,
            tabId = cls.createId("tab"),
            panelId = cls.createId("panel"),
            linkToggleStyle = self.linkToggleStyle(),
            ctrlCfg = self.$ctrlCfg,
            elementConfig = self.elementConfig,
            rootName = self.rootElementName,
            tabName = `${rootName}_tab_${name}`,
            panelName = `${rootName}_panel_${name}`,
            elements = self.elements,
            tab = <HTMLButtonElement>self.createElement(new ctrlCfg(tabName, "button", elementConfig.getConfig(cls.TAB_BUTTON)
                .Id(tabId)
                .Data({ "bsTarget": `#${panelId}`, "bsToggle": linkToggleStyle })
                .Aria({ "controls": panelId, "selected": "false" })
                .Properties({ innerText: text }))),
            panel = <HTMLDivElement>self.createElement(new ctrlCfg(panelName, "div", elementConfig.getConfig(cls.TAB_PANEL)
                .Id(panelId)
                .Classes("tab-pane fade")
                .Aria({ "labelledby": tabId })
                .Attributes({ role: "tabpanel" })
                .Properties({ tabIndex: 0 }))),
            tabPanel = new self.$TabPanel(name, tab, panel)
        elements.get(cls.TABPANEL_TABS_CONTAINER).appendChild(tab);
        elements.get(cls.TABPANEL_PANELS_CONTAINER).appendChild(panel);
        if (self.tabPanels.size === 0) { self.classes([tab, panel], self.$clsActions.add, "active"); self.classes(panel, self.$clsActions.add, "show"); }
        self.tabPanels.set(name, tabPanel);
        return tabPanel;
    }

    /**
     * Set Active Tab
     * @date 12/12/2022 - 09:09:00
     *
     * @public
     * @param {string} name
     * @returns {Mrbr_UI_Bootstrap_Controls_TabPanelContainer}
     */
    public setActive(name: string): Mrbr_UI_Bootstrap_Controls_TabPanelContainer {
        const activetab = this._tabPanels.get(name).tab;
        activetab && this.bootstrap?.Tab?.getOrCreateInstance(activetab)?.show();
        return this;
    }

    /**
     * Get Active Tab
     * @date 12/12/2022 - 09:09:21
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Controls_TabPanel}
     */
    public getActive(): Mrbr_UI_Bootstrap_Controls_TabPanel {
        let activeTabPanel: Mrbr_UI_Bootstrap_Controls_TabPanel;
        this._tabPanels.forEach((value, key) => !activeTabPanel && value.tab.classList.contains("active") && (activeTabPanel = value));
        return activeTabPanel;
    }

    /**
     * Enable/Disable Tab
     * @date 12/12/2022 - 09:09:29
     *
     * @public
     * @param {string} name
     * @param {boolean} disabled
     * @returns {Mrbr_UI_Bootstrap_Controls_TabPanelContainer}
     */
    public setDisabled(name: string, disabled: boolean): Mrbr_UI_Bootstrap_Controls_TabPanelContainer {
        this._tabPanels.has(name) && (this._tabPanels.get(name).disabled = disabled);
        return this;
    }

    
    /**
     * Remove TabPanel from Collection and Tab and Panel from respective containers
     * @date 12/12/2022 - 09:12:52
     *
     * @public
     * @param {string} name
     * @returns {Mrbr_UI_Bootstrap_Controls_TabPanelContainer}
     */
    public removeTabPanel(name: string): Mrbr_UI_Bootstrap_Controls_TabPanelContainer {
        const tabPanel = this._tabPanels.get(name);
        if (this.rootElement && tabPanel) {
            this.tabPanels.delete(name);
            tabPanel.tab.remove();
            tabPanel.panel.remove();
        }
        return this;
    }
}