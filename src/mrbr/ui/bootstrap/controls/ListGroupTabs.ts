import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles } from "./ListGroup$ContextualStyles";
import { Mrbr_UI_Bootstrap_Controls_ListGroupTabPane } from "./ListGroupTabPane";
import { Mrbr_UI_Bootstrap_Controls_ListGroupTabPane$Events } from "./ListGroupTabPane$Events";
import { Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent } from "./ListGroupTabPaneEvent";
import { Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData } from "./ListGroupTabPaneEventData";

export class Mrbr_UI_Bootstrap_Controls_ListGroupTabs extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    //#region Public Static Constants

    /**
     * Internal ListGroupTabs Control Name
     * @date 04/12/2022 - 06:21:38
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUPTABS_CONTROL_NAME: string = "tabs_panel";

    /**
     * Internal Tabs Container Element Name
     * @date 04/12/2022 - 06:22:07
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABS_LISTGROUP_NAME: string = "tabs_listgroup";

    /**
     * Internal Tabs Column Element Name
     * @date 04/12/2022 - 06:22:40
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABS_LISTGROUP_COLUMN_NAME: string = "tabs_listgroup_column";

    /**
     * Internal Tabs Pane Element Name
     * @date 04/12/2022 - 06:23:00
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABS_PANES_NAME: string = "tabs_panes";

    /**
     * Internal Tabs Pane Column Element Name
     * @date 04/12/2022 - 06:23:20
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABS_PANES_COLUMN_NAME: string = "tabs_panes_column";

    /**
     * Internal ListGroup Tabs Container Element
     * @date 04/12/2022 - 06:23:37
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABS_LISTGROUP_ITEM_NAME: string = "tabs_listgroup_item";

    /**
     * Internal Tabs Pane Element Name
     * @date 04/12/2022 - 06:23:59
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TABS_PANE_ITEM_NAME: string = "tabs_pane_item";
    //#endregion Public Static Constants

    //#region Type Aliases
    /**
     * ListGroup Contextual Styles Enum Alias
     * @date 03/12/2022 - 09:37:54
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroup}
     */
    public get $lgcs(): typeof Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles { return this.$bsc.ListGroup$ContextualStyles as typeof Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles; }


    /**
     * ListGroup TabPane Type Alias
     * @date 04/12/2022 - 06:25:01
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public get $lgtp(): typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPane { return this.$bsc.ListGroupTabPane as typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPane; }


    /**
     * ListGroupTabPane Event Names Enum Alias
     * @date 04/12/2022 - 06:25:35
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public get $lgtpes(): typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPane$Events { return this.$bsc.ListGroupTabPane$Events as typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPane$Events; }

    /**
     * ListGroupTabPane Event Data Type Alias
     * @date 04/12/2022 - 06:25:54
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData}
     */
    public get $lgtped(): typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData { return this.$bsc.ListGroupTabPaneEventData as typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEventData; }

    /**
     * ListGroupTab Event Type Alias
     * @date 04/12/2022 - 06:26:20
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent}
     */
    public get $lgtpe(): typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent { return this.$bsc.ListGroupTabPaneEvent as typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent; }


    /**
     * ListGroupTab Type Alias
     * @date 04/12/2022 - 06:26:45
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs { return this.$bsc.ListGroupTabs as typeof Mrbr_UI_Bootstrap_Controls_ListGroupTabs; }
    //#endregion Type Aliases

    //#region Private Fields

    /**
     * TabPanes Collection
     * @date 04/12/2022 - 06:27:22
     *
     * @private
     * @type {Map<string, Mrbr_UI_Bootstrap_Controls_ListGroupTabPane>}
     */
    private _tabPanes: Map<string, Mrbr_UI_Bootstrap_Controls_ListGroupTabPane>;

    /**
     * Use Numbered List Element
     * @date 04/12/2022 - 06:27:37
     *
     * @private
     * @type {boolean}
     */
    private _numberedList: boolean = false;
    //#endregion Private Fields

    //#region Public Properties

    /**
     * TabPanes Collection
     * @date 04/12/2022 - 06:28:13
     *
     * @public
     * @type {Map<string, Mrbr_UI_Bootstrap_Controls_ListGroupTabPane>}
     */
    public get tabPanes(): Map<string, Mrbr_UI_Bootstrap_Controls_ListGroupTabPane> { return this._tabPanes ??= new Map<string, Mrbr_UI_Bootstrap_Controls_ListGroupTabPane>(); }

    /**
     * TabPanes Collection
     */
    public set tabPanes(value: Map<string, Mrbr_UI_Bootstrap_Controls_ListGroupTabPane>) { this._tabPanes = value; }


    /**
     * Use Numbered List Element
     * @date 04/12/2022 - 06:31:26
     *
     * @public
     * @type {boolean}
     */
    public get numberedList(): boolean { return this._numberedList; }

    /**
     * Use Numbered List Element
     */
    public set numberedList(value: boolean) {
        const act = this.$clsActions;
        this._numberedList = value;
        let element = this.elements.get(this.$cls.TABS_LISTGROUP_NAME)
        if (!element) { return; }
        this.classes(element, value ? act.Add : act.Remove, "list-group-numbered");
    }

    //#endregion Public Properties


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ListGroupTabs.
     * @date 04/12/2022 - 06:28:38
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) { super(rootElementName); }

    //#region Public Methods

    /**
     * Initialise TabPane Control, load manifest and set properties
     * @date 04/12/2022 - 06:29:23
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroupTabs>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroupTabs> {
        const self = this,
            componentName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroupTabs>(`${componentName}:initialise`);
        super.initialise(args)
            .then(async _ => {
                await this.loadManifest(self.$cls);
                await self.setDefaultConfig();
                const
                    listGroupId = self.$cls.createId("listGroup"),
                    panesPanelId = self.$cls.createId("panesPanel"),
                    ctrlCfg = self.$ctrlCfg,
                    cls = self.$cls,
                    listGroup = <HTMLElement>self.createElement(new ctrlCfg(cls.TABS_LISTGROUP_NAME, self.$hmt.div, self.elementConfig.getConfig(cls.TABS_LISTGROUP_NAME)
                        .Id(listGroupId))),
                    listGroupColumn = <HTMLElement>self.createElement(new ctrlCfg(cls.TABS_LISTGROUP_COLUMN_NAME, self.$hmt.div, self.elementConfig.getConfig(self.$cls.TABS_LISTGROUP_COLUMN_NAME)
                        .Classes("col-4")
                        .Children([listGroup]),
                    )),
                    panesPanel = <HTMLElement>self.createElement(new ctrlCfg(cls.TABS_PANES_NAME, self.$hmt.div, self.elementConfig.getConfig(self.$cls.TABS_PANES_NAME)
                        .Id(panesPanelId)),
                    ),
                    panesColumn = <HTMLElement>self.createElement(new ctrlCfg(cls.TABS_PANES_COLUMN_NAME, self.$hmt.div, self.elementConfig.getConfig(cls.TABS_PANES_COLUMN_NAME)
                        .Classes("col-8")
                        .Children([panesPanel]))
                    );
                self.createElement(new ctrlCfg(self.rootElementName, self.$hmt.div, self.elementConfig.getConfig(cls.LISTGROUPTABS_CONTROL_NAME)
                    .Children([listGroupColumn, panesColumn])))
                self.numberedList = self._numberedList;
                initalisePromise.resolve(self);
            })
        return initalisePromise;
    }

    /**
     * Set default configuration for TabPanes Control
     * @date 04/12/2022 - 06:30:16
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroupTabs>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroupTabs> {
        const
            self = this,
            componentName = self.$cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroupTabs>(`${componentName}:setDefaultConfig`),
            cls = self.$cls,
            ctrlPrm = self.$ctrlPrm;
        super.setDefaultConfig()
            .then(async _ => {
                self.elementConfig
                    .controlName(componentName)
                    .setIfNotExist(cls.LISTGROUPTABS_CONTROL_NAME, new ctrlPrm()
                        .Attributes({ role: "tabpanel" })
                        .Classes("row"))
                    .setIfNotExist(cls.TABS_LISTGROUP_COLUMN_NAME, new ctrlPrm())
                    .setIfNotExist(cls.TABS_LISTGROUP_NAME, new ctrlPrm()
                        .Classes("list-group")
                        .Attributes({ role: "tablist" }))
                    .setIfNotExist(cls.TABS_PANES_COLUMN_NAME, new ctrlPrm())
                    .setIfNotExist(cls.TABS_PANES_NAME, new ctrlPrm()
                        .Classes("tab-content"))
                    .setIfNotExist(cls.TABS_LISTGROUP_ITEM_NAME, new ctrlPrm()
                        .Classes("list-group-item list-group-item-action")
                        .Data({ bsToggle: "list", role: "tab" }))
                    .setIfNotExist(cls.TABS_PANE_ITEM_NAME, new ctrlPrm()
                        .Classes("tab-pane fade")
                        .Attributes({ role: "tabpanel" })
                    );
                setDefaultConfigPromise.resolve(self);
            });

        return setDefaultConfigPromise;
    }


    /**
     * Add TabPane to TabPanes Control
     * @date 04/12/2022 - 06:34:25
     *
     * @public
     * @param {string} tabName
     * @param {string} title
     * @param {?string} [panelContents]
     * @returns {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public addTab(tabName: string, title: string, panelContents?: string): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane {
        const
            id = this.$cls.createId("tab"),
            tabId = `${id}_tab`,
            tabPaneId = `${id}_pane`,
            cls = this.$cls,
            ctrlCfg = this.$ctrlCfg,

            //this.properties(listItemText, { innerText: title, id: `${id}_text` });
            listItemText = <HTMLElement>this.createElement(new ctrlCfg(tabName + "_text", this.$hmt.span, new this.$ctrlPrm()
                .Id(`${id}_text`)
                .Properties({ innerText: title })
            )),
            listItem = <HTMLElement>this.createElement(new ctrlCfg(tabName + "_tab", this.$hmt.anchor, this.elementConfig.getConfig(cls.TABS_LISTGROUP_ITEM_NAME)
                .Id(tabId)
                .Properties({ href: `#${tabPaneId}` })
                .Aria({ controls: tabPaneId })
                .Children([listItemText])
            )
            ),
            pane = <HTMLElement>this.createElement(new ctrlCfg(`${tabName}_pane`, this.$hmt.div, this.elementConfig.getConfig(cls.TABS_PANE_ITEM_NAME)
                .Id(tabPaneId)
                .Aria({ labelledby: tabId }))),
            tabPane = new this.$lgtp(listItem, pane);
        panelContents && this.properties(pane, { innerHTML: panelContents })
        this.elements.get(cls.TABS_LISTGROUP_NAME).appendChild(listItem);
        this.elements.get(cls.TABS_PANES_NAME).appendChild(pane);
        this.tabPanes.set(tabName, tabPane);
        return tabPane;
    }

    /**
     * Remove TabPane from TabPanes Control
     * @date 04/12/2022 - 06:34:36
     *
     * @public
     * @param {string} tabName
     * @returns {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public removeTab(tabName: string): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane {
        const
            elements = this.elements,
            cls = this.$cls;
        let tabPane: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane;
        if (this.tabPanes.has(tabName)) {
            tabPane = this.tabPanes.get(tabName);
            elements.get(cls.TABS_LISTGROUP_NAME).removeChild(tabPane.tab);
            elements.get(cls.TABS_PANES_NAME).removeChild(tabPane.pane);
            this.tabPanes.delete(tabName);
            elements.remove(tabName);
            elements.remove(`${tabName}_pane`);
            return tabPane;
        }
        return null;
    }

    /**
     * Set Tabs ContextStyle
     * @date 04/12/2022 - 06:34:50
     *
     * @public
     * @param {string} tabName
     * @param {Mrbr_UI_Bootstrap_Controls_ListGroup} style
     * @returns {HTMLElement}
     */
    public setItemContextStyle(tabName: string, style: Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles): HTMLElement {
        const tabPane = this.tabPanes.get(tabName);
        if (!tabPane) { return null; }
        const
            listGroupItem: HTMLElement = tabPane.tab,
            act = this.$clsActions;
        if (!listGroupItem) { return null; }
        Reflect.ownKeys(this.$lgcs).forEach(key => {
            const _style: string = this.$lgcs[key];
            _style !== style ? this.classes(listGroupItem, act.Remove, _style) : this.classes(listGroupItem, act.Add, style);
        });
        return listGroupItem;
    }

    /**
     * Get Active TabPane
     * @date 04/12/2022 - 06:35:08
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public getActiveTab(): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane {
        let activeTab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane;
        for (let tabPane of this.tabPanes.values()) {
            if (tabPane.tab.classList.contains("active")) {
                activeTab = tabPane;
                break;
            }
        }
        return activeTab;
    }

    /**
     * Set Active TabPane
     * @date 04/12/2022 - 06:35:23
     *
     * @public
     * @param {string} tabName
     * @returns {Mrbr_UI_Bootstrap_Controls_ListGroupTabPane}
     */
    public setActiveTab(tabName: string): Mrbr_UI_Bootstrap_Controls_ListGroupTabPane {
        let activeTab: Mrbr_UI_Bootstrap_Controls_ListGroupTabPane,
            add = this.$clsActions.Add;
        if (this.tabPanes.has(tabName)) {
            activeTab = this.tabPanes.get(tabName);
            this.classes(activeTab.tab, add, "active");
            this.classes(activeTab.pane, add, "active show");
            let bootstrapTab = this.bootstrap?.Tab?.getOrCreateInstance(activeTab.tab);
            bootstrapTab?.show();
        }
        return activeTab;
    }
    //#endregion Public Methods

    //#region Event Methods

    /**
     * Add onShow event handler
     * @date 04/12/2022 - 06:31:56
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number)} callback
     * @returns {number}
     */
    public onTabShow(callback: (event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$lgtpes.show,
            this.$lgtpes.show,
            this.rootElement,
            this.tabShow_handler,
            this,
            callback
        )
    }

    /**
     * Add onShown event handler
     * @date 04/12/2022 - 06:32:16
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number)} callback
     * @returns {number}
     */
    public onTabShown(callback: (event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$lgtpes.shown,
            this.$lgtpes.shown,
            this.rootElement,
            this.tabShown_handler,
            this,
            callback
        )
    }

    /**
     * Add onHide event handler
     * @date 04/12/2022 - 06:32:24
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number)} callback
     * @returns {number}
     */
    public onTabHide(callback: (event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$lgtpes.hide,
            this.$lgtpes.hide,
            this.rootElement,
            this.tabHide_handler,
            this,
            callback
        )
    }

    /**
     * Add onHidden event handler
     * @date 04/12/2022 - 06:32:33
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number)} callback
     * @returns {number}
     */
    public onTabHidden(callback: (event: Mrbr_UI_Bootstrap_Controls_ListGroupTabPaneEvent) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$lgtpes.hidden,
            this.$lgtpes.hidden,
            this.rootElement,
            this.tabHidden_handler,
            this,
            callback
        )
    }

    /**
     * onShow event handler, calls all registered callbacks
     * @date 04/12/2022 - 06:32:42
     *
     * @private
     * @param {MouseEvent} event
     */
    private tabShow_handler(event: MouseEvent): void {
        event.stopPropagation();
        let tabEvent = this.$lgtpes.show,
            currentTab = <HTMLElement>event.target,
            currentId = currentTab.dataset.mrbrId,
            previousTab = <HTMLElement>event.relatedTarget,
            previousId = previousTab?.dataset?.mrbrId,
            evData = new this.$lgtped(tabEvent, event, currentId, this.tabPanes.get(currentId)),
            tabPaneEvent = new this.$lgtpe(tabEvent, this, evData);
        previousTab && evData.Previous(previousId, this.tabPanes.get(previousId));
        this.eventSubscribers.raiseEvent(tabPaneEvent);
    }

    /**
     * onShown event handler, calls all registered callbacks
     * @date 04/12/2022 - 06:33:05
     *
     * @private
     * @param {MouseEvent} event
     */
    private tabShown_handler(event: MouseEvent): void {
        event.stopPropagation();
        let tabEvent = this.$lgtpes.shown,
            currentTab = <HTMLElement>event.target,
            currentId = currentTab.dataset.mrbrId,
            previousTab = <HTMLElement>event.relatedTarget,
            previousId = previousTab?.dataset?.mrbrId,
            evData = new this.$lgtped(tabEvent, event, currentId, this.tabPanes.get(currentId)),
            tabPaneEvent = new this.$lgtpe(tabEvent, this, evData);
        previousTab && evData.Previous(previousId, this.tabPanes.get(previousId));
        this.eventSubscribers.raiseEvent(tabPaneEvent);
    }

    /**
     * onHide event handler, calls all registered callbacks
     * @date 04/12/2022 - 06:33:16
     *
     * @private
     * @param {MouseEvent} event
     */
    private tabHide_handler(event: MouseEvent): void {
        event.stopPropagation();
        let tabEvent = this.$lgtpes.hide,
            currentTab = <HTMLElement>event.target,
            currentId = currentTab.dataset.mrbrId,
            previousTab = <HTMLElement>event.relatedTarget,
            previousId = previousTab?.dataset?.mrbrId,
            evData = new this.$lgtped(tabEvent, event, currentId, this.tabPanes.get(currentId)),
            tabPaneEvent = new this.$lgtpe(tabEvent, this, evData);
        previousTab && evData.Next(previousId, this.tabPanes.get(previousId));
        this.eventSubscribers.raiseEvent(tabPaneEvent);
    }

    /**
     * onHidden event handler, calls all registered callbacks
     * @date 04/12/2022 - 06:33:26
     *
     * @private
     * @param {MouseEvent} event
     */
    private tabHidden_handler(event: MouseEvent): void {
        event.stopPropagation();
        let tabEvent = this.$lgtpes.hidden,
            currentTab = <HTMLElement>event.relatedTarget,
            currentId = currentTab && currentTab.dataset.mrbrId,
            previousTab = <HTMLElement>event.target,
            previousId = previousTab?.dataset?.mrbrId,
            evData = new this.$lgtped(tabEvent, event, currentId, this.tabPanes.get(currentId)),
            tabPaneEvent = new this.$lgtpe(tabEvent, this, evData);
        previousTab && evData.Previous(previousId, this.tabPanes.get(previousId));
        this.eventSubscribers.raiseEvent(tabPaneEvent);
    }
    //#endregion Event Methods



}