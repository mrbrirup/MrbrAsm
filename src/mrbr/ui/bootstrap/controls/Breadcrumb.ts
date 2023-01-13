import { Mrbr_Collections_DoubleLinkedList } from "../../../collections/DoubleLinkedList";
import { Mrbr_Collections_DoubleLinkedListNode } from "../../../collections/DoubleLinkedListNode";
import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Bootstrap_Controls_BreadcrumbItem } from "./BreadcrumbItem";

export class Mrbr_UI_Bootstrap_Controls_Breadcrumb extends Mrbr_UI_Controls_Control {
    //#region Public Static Members

    /**
     * Internal BreadCrumb Nav Element Name
     * @date 11/11/2022 - 07:18:53
     *
     * @public
     * @static
     * @readonly
     * @type {"breadcrumb_nav"}
     */
    public static readonly BREADCRUMB_NAV_NAME = "breadcrumb_nav";

    /**
     * Internal Breadcrumb List Element Name
     * @date 11/11/2022 - 07:19:18
     *
     * @public
     * @static
     * @readonly
     * @type {"breadcrumb_list"}
     */
    public static readonly BREADCRUMB_LIST_NAME = "breadcrumb_list";

    /**
     * Internal Breadcrumb Item Element Name 
     * @date 11/11/2022 - 07:19:40
     *
     * @public
     * @static
     * @readonly
     * @type {"breadcrumb_item"}
     */
    public static readonly BREADCRUMB_ITEM_NAME = "breadcrumb_item";

    /**
     * Internal Breadcrumb Item Link Element Name
     * @date 11/11/2022 - 07:20:11
     *
     * @public
     * @static
     * @readonly
     * @type {"breadcrumb_item_link"}
     */
    public static readonly BREADCRUMB_ITEM_LINK_NAME = "breadcrumb_item_link";

    /**
     * Internal Breadcrumb Click Event Name
     * @date 11/11/2022 - 07:20:28
     *
     * @public
     * @static
     * @readonly
     * @type {"breadcrumb_click_event"}
     */
    public static readonly BREADCRUMB_CLICK_EVENT_NAME = "breadcrumb_click_event";
    //#endregion Public Static Members
    //#region Private Properties' Fields

    /**
     * Breadbrumb divider character
     * @date 11/11/2022 - 07:20:44
     *
     * @private
     * @type {string}
     */
    private _breadcrumbDivider: string = "/";

    /**
     * Double linked list for breadcrumb trail
     * @date 11/11/2022 - 07:20:59
     *
     * @private
     * @type {Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>}
     */
    private _breadcrumbTrail: Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> = new Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>(true);
    //#endregion Private Properties' Fields
    //#region Type Aliases

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Controls_Breadcrumb
     * @date 11/11/2022 - 07:21:20
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Breadcrumb}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Breadcrumb { return Mrbr_UI_Bootstrap_Controls_Breadcrumb; }
    //#endregion Public Methods


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Breadcrumb.
     * @date 11/11/2022 - 07:21:39
     *
     * @constructor
     */
    constructor() {
        super();
        const self = this;
        self.defaultContainerElementName = self.$cls.BREADCRUMB_LIST_NAME;
    }

    //#region Public Properties

    /**
     * Breadcrumb trail
     * @date 11/11/2022 - 07:22:06
     *
     * @public
     * @type {Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>}
     */
    public get breadcrumbTrail(): Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> { return this._breadcrumbTrail; }

    /**
     * Breadcrumb trail
     */
    public set breadcrumbTrail(value: Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>) { this._breadcrumbTrail = value; }

    /**
     * Breadcrumb divider
     * @date 11/11/2022 - 07:22:32
     *
     * @public
     * @type {string}
     */
    public get breadcrumbDivider(): string { return this._breadcrumbDivider; }

    /**
     * Breadcrumb divider, default to "/"
     */
    public set breadcrumbDivider(value: string) { this._breadcrumbDivider = value; }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Set the current crumb and remove all crumb after it
     * @date 11/11/2022 - 07:25:27
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_BreadcrumbItem} breadcrumbItem
     */
    public setCurrentCrumb(breadcrumbItem: Mrbr_UI_Bootstrap_Controls_BreadcrumbItem) {
        const removedCrumbs = this.breadcrumbTrail.removeAfter(breadcrumbItem);
        removedCrumbs.forEach(crumb => {
            this.defaultContainerElement.removeChild(this.elements.get(crumb.key));
            this.elements.delete(crumb.key);
        })
        this.renderCrumb(this.breadcrumbTrail.head);
    }

    /**
     * Get Breadcrumb by key
     * @date 11/11/2022 - 07:32:45
     *
     * @public
     * @param {*} key
     * @returns {Mrbr_Collections_DoubleLinkedListNode<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>}
     */
    public getNode(key: any): Mrbr_Collections_DoubleLinkedListNode<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> { return this.breadcrumbTrail.getNode(key); }

    /**
     * Add a new crumb to the breadcrumb trail
     * @date 11/11/2022 - 07:33:01
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_BreadcrumbItem} breadcrumbItem
     * @returns {Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>}
     */
    public add(breadcrumbItem: Mrbr_UI_Bootstrap_Controls_BreadcrumbItem): Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> {
        this.breadcrumbTrail.add(breadcrumbItem, breadcrumbItem.key);
        this.createElement(new this.$ctrlCfg(breadcrumbItem.key, "li", this.elementConfig.get(this.$cls.BREADCRUMB_ITEM_NAME)));
        this.defaultContainerElement.appendChild(this.elements.get(breadcrumbItem.key));
        this.renderCrumb(this.breadcrumbTrail.head);
        return this.breadcrumbTrail;
    }

    /**
     * Render the crumb to the DOM
     * @date 11/11/2022 - 07:33:15
     *
     * @public
     * @param {Mrbr_Collections_DoubleLinkedListNode<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>} currentNode
     */
    public renderCrumb(currentNode: Mrbr_Collections_DoubleLinkedListNode<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>) {
        if (!currentNode) { return; }
        if (currentNode === this.breadcrumbTrail.tail) {
            let currentCrumb: HTMLLIElement = <HTMLLIElement>this.elements.get(currentNode.key) || <HTMLLIElement>this.createElement(new this.$ctrlCfg(currentNode.key, "li", this.elementConfig.get(this.$cls.BREADCRUMB_ITEM_NAME)));
            const linkNode = this.elements.get(currentNode.key).querySelector("a");
            if (linkNode) { currentCrumb.removeChild(linkNode); }
            this.aria(currentCrumb, { "current": "page" });
            currentCrumb.textContent = currentNode.value.crumbText;
            this.classes(currentCrumb, this.$clsActions.add, "active");
        }
        else {
            let currentCrumb: HTMLLIElement = <HTMLLIElement>this.elements.get(currentNode.key) || <HTMLLIElement>this.createElement(new this.$ctrlCfg(currentNode.key, "li", this.elementConfig.get(this.$cls.BREADCRUMB_ITEM_NAME)));
            let linkNode: HTMLAnchorElement = this.elements.get(currentNode.key).querySelector("a");
            this.classes(currentCrumb, this.$clsActions.remove, "active");
            if (!linkNode) {
                currentCrumb.textContent = "";
                currentCrumb.removeAttribute("aria-current");
                linkNode = document.createElement("a");
                linkNode.href = currentNode.value.href;
                linkNode.textContent = currentNode.value.crumbText;
                currentCrumb.appendChild(linkNode);
            }
        }
        (currentNode.next) && (this.renderCrumb(currentNode.next));
    }


    /**
     * Initialise the control, load manifest and set properties
     * @date 11/11/2022 - 07:33:59
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Breadcrumb>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Breadcrumb> {
        const
            self = this,
            initialisepromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Breadcrumb>(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:initialise`);
        try {
            super.initialise(args).then(async result => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, "nav", self.elementConfig.get(self.$cls.BREADCRUMB_NAV_NAME)
                    .Children([new self.$ctrlCfg(self.defaultContainerElementName, "ol", self.elementConfig.get(self.$cls.BREADCRUMB_LIST_NAME))])
                ));
                initialisepromise.resolve(self);
            })
        } catch (error) { initialisepromise.reject(error); }
        return initialisepromise;
    }


    /**
     * Set the default configuration for the control
     * @date 11/11/2022 - 07:34:41
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Breadcrumb>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Breadcrumb> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            defaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Breadcrumb>(`${controlName}:setDefaultConfig`);
        try {
            super.setDefaultConfig().then(result => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$cls.BREADCRUMB_NAV_NAME, new self.$ctrlPrm()
                        .Aria({ label: "breadcrumb" }))
                    .setIfNotExist(self.$cls.BREADCRUMB_LIST_NAME, new self.$ctrlPrm()
                        .Classes(["breadcrumb"]))
                    .setIfNotExist(self.$cls.BREADCRUMB_ITEM_NAME, new self.$ctrlPrm()
                        .Classes(["breadcrumb-item user-select-none"]))
                    .setIfNotExist(self.$cls.BREADCRUMB_ITEM_LINK_NAME, new self.$ctrlPrm());
                defaultConfigPromise.resolve(self);
            });
        } catch (error) { defaultConfigPromise.reject(error); }
        return defaultConfigPromise;
    }
    //#endregion Public Methods

    //#region Event Handlers

    /**
     * Handle the click event on the breadcrumb
     * @date 11/11/2022 - 07:38:24
     *
     * @private
     * @param {MouseEvent} event
     */
    private crumbClick_handler(event: MouseEvent) {
        const eventTarget = event.target as HTMLElement,
            self = this;
        event.stopPropagation();
        if ((!(eventTarget instanceof HTMLAnchorElement) && (!(eventTarget instanceof HTMLLIElement)))) { return; }
        const id = eventTarget instanceof HTMLAnchorElement ? (<HTMLElement>eventTarget.closest(".breadcrumb-item")).dataset.mrbrId : eventTarget.dataset.mrbrId;
        self.eventSubscribers.raise(self.$cls.BREADCRUMB_CLICK_EVENT_NAME, new Mrbr_System_Events_Event(self.$cls.BREADCRUMB_CLICK_EVENT_NAME, this, id));
    }

    /**
     * Add eventHandler to the control for the crumb click event
     * @date 11/11/2022 - 07:52:00
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<string>) => void} callback
     * @returns {number}
     */
    public onCrumbClick(callback: (event: Mrbr_System_Events_Event<string>) => void): number {
        const self = this;
        self.events.has(self.$cls.BREADCRUMB_CLICK_EVENT_NAME) ||
            self.events.add(self.$cls.BREADCRUMB_CLICK_EVENT_NAME, new Mrbr_System_Events_EventHandler(
                "click",
                self.rootElement,
                self.crumbClick_handler,
                self
            ));
        return self.eventSubscribers.add(self.$cls.BREADCRUMB_CLICK_EVENT_NAME, callback);
    }
    //#endregion Event Handlers
}