import { Mrbr_Collections_DoubleLinkedList } from "../../../collections/DoubleLinkedList";
import { Mrbr_Collections_DoubleLinkedListNode } from "../../../collections/DoubleLinkedListNode";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_BreadcrumbItem } from "./BreadcrumbItem";

export class Mrbr_UI_Bootstrap_Controls_Breadcrumb extends Mrbr_UI_Controls_Control {
    public static BREADCRUMB_NAV_NAME = "breadcrumb_nav";
    public static BREADCRUMB_LIST_NAME = "breadcrumb_list";
    public static BREADCRUMB_ITEM_NAME = "breadcrumb_item";
    public static BREADCRUMB_ITEM_LINK_NAME = "breadcrumb_item_link";
    public static BREADCRUMB_CLICK_EVENT_NAME = "breadcrumb_click_event";
    private _breadcrumbDivider: string = "/";
    private _breadcrumbTrail: Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> = new Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>(true);

    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Breadcrumb { return Mrbr_UI_Bootstrap_Controls_Breadcrumb; }

    constructor(rootElementName: string) {
        super(rootElementName);
        const self = this;
        self.defaultContainerElementName = self.$cls.BREADCRUMB_LIST_NAME;
    }
    public get breadcrumbTrail(): Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> {
        return this._breadcrumbTrail;
    }
    public set breadcrumbTrail(value: Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>) {
        this._breadcrumbTrail = value;
    }
    public get breadcrumbDivider(): string {
        return this._breadcrumbDivider;
    }
    public set breadcrumbDivider(value: string) {
        this._breadcrumbDivider = value;
    }

    public setCurrentCrumb(breadcrumbItem: Mrbr_UI_Bootstrap_Controls_BreadcrumbItem) {
        const self = this,
            removedCrumbs = self.breadcrumbTrail.removeAfter(breadcrumbItem);
        if (removedCrumbs?.length > 0) {
            removedCrumbs.forEach(crumb => {
                self.defaultContainerElement.removeChild(self.elements[crumb.key]);
                self.elements[crumb.key] = self.$ctrl.DELETE_ENTRY;
            })
        }
        self.renderCrumb(self.breadcrumbTrail.head);
    }

    public getNode(key: any): Mrbr_Collections_DoubleLinkedListNode<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> {
        return this.breadcrumbTrail.getNode(key);
    }
    public add(breadcrumbItem: Mrbr_UI_Bootstrap_Controls_BreadcrumbItem): Mrbr_Collections_DoubleLinkedList<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem> {
        const self = this;
        self.breadcrumbTrail.add(breadcrumbItem, breadcrumbItem.key);
        self.createElement(new self.$ctrlCfg(breadcrumbItem.key, "li", self.configuration(self.$cls.BREADCRUMB_ITEM_NAME)));

        self.defaultContainerElement.appendChild(self.elements[breadcrumbItem.key]);
        self.renderCrumb(self.breadcrumbTrail.head);
        return self.breadcrumbTrail;
    }
    protected renderCrumb(currentNode: Mrbr_Collections_DoubleLinkedListNode<Mrbr_UI_Bootstrap_Controls_BreadcrumbItem>) {
        const self = this;
        if (!currentNode) { return; }
        if (currentNode === self.breadcrumbTrail.tail) {
            let currentCrumb: HTMLLIElement = self.elements[currentNode.key] || self.createElement(new self.$ctrlCfg(currentNode.key, "li", self.configuration(self.$cls.BREADCRUMB_ITEM_NAME)));
            const linkNode = self.elements[currentNode.key].querySelector("a");
            if (linkNode) { currentCrumb.removeChild(linkNode); }
            self.elementAria(currentCrumb, { "current": "page" });
            currentCrumb.textContent = currentNode.value.crumbText;
            self.classes(currentCrumb, self.$clsActions.Add, "active");
        }
        else {
            let currentCrumb: HTMLLIElement = self.elements[currentNode.key] || self.createElement(new self.$ctrlCfg(currentNode.key, "li", self.configuration(self.$cls.BREADCRUMB_ITEM_NAME)));
            let linkNode: HTMLAnchorElement = self.elements[currentNode.key].querySelector("a");
            debugger
            self.classes(currentCrumb, self.$clsActions.Remove, "active");
            if (!linkNode) {
                currentCrumb.textContent = "";
                currentCrumb.removeAttribute("aria-current");
                linkNode = document.createElement("a");
                linkNode.href = currentNode.value.href;
                linkNode.textContent = currentNode.value.crumbText;
                currentCrumb.appendChild(linkNode);
            }
        }
        if (currentNode.next) {
            self.renderCrumb(currentNode.next);
        }
    }


    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Breadcrumb> {
        const self = this,
            initlialisepromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Breadcrumb>("Mrbr_UI_Bootstrap_Controls_Breadcrumb:initialise");
        super.initialise(args)
            .then(result => {
                self.setDefaultConfig();
                MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(manifest => {

                        self.createElement(new self.$ctrlCfg(self.rootElementName, "nav", self.configuration(self.$cls.BREADCRUMB_NAV_NAME)
                            .Children([new self.$ctrlCfg(self.defaultContainerElementName, "ol", self.configuration(self.$cls.BREADCRUMB_LIST_NAME))])
                            ));
                        self.events[self.$cls.BREADCRUMB_CLICK_EVENT_NAME] = new Mrbr_System_Events_EventHandler(
                            "click",
                            self.rootElement,
                            self.crumbClick_handler,
                            self
                        )
                        initlialisepromise.resolve(self);
                    })
            })
        return initlialisepromise;
    }

    crumbClick_handler(event: MouseEvent) {
        const eventTarget = event.target as HTMLElement,
            self = this;
        event.stopPropagation();
        if (eventTarget instanceof HTMLAnchorElement || eventTarget instanceof HTMLLIElement) {
            let id = eventTarget instanceof HTMLAnchorElement ? (<HTMLElement>eventTarget.closest(".breadcrumb-item")).dataset.id : eventTarget.dataset.id;
            self.dispatchEvent(new CustomEvent(self.$cls.BREADCRUMB_CLICK_EVENT_NAME, { detail: { id: id } }));
        }
    }

    public setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Breadcrumb> {
        const self = this;
        self.defaultConfig.addEntries([
            [self.$cls.BREADCRUMB_NAV_NAME, new self.$ctrlPrm().Aria({ label: "breadcrumb" })],
            [self.$cls.BREADCRUMB_LIST_NAME, new self.$ctrlPrm().Classes(["breadcrumb"])],
            [self.$cls.BREADCRUMB_ITEM_NAME, new self.$ctrlPrm().Classes(["breadcrumb-item user-select-none"])],
            [self.$cls.BREADCRUMB_ITEM_LINK_NAME, new self.$ctrlPrm()]
        ])
        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Controls_Breadcrumb:setDefaultConfiguration", self);
    }
}