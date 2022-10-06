import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_AccordionItem extends Mrbr_UI_Controls_Control {
    public static ACCORDION_ITEM: string = "accordion_item";
    public static ACCORDION_HEADER_NAME: string = "accordion_header";
    public static ACCORDION_TOGGLE_NAME: string = "accordion_toggle";
    public static ACCORDION_COLLAPSE: string = "accordion_collapse";
    public static ACCORDION_BODY: string = "accordion_body";
    private _title: string = "";

    override get $cls(): typeof Mrbr_UI_Bootstrap_Controls_AccordionItem { return Mrbr_UI_Bootstrap_Controls_AccordionItem; }

    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = this.$cls.ACCORDION_BODY;
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_AccordionItem:initialise");
        super.initialise(args)
            .then(result => {
                self.setDefaultConfiguration();
                const manifestPromise = self.$mrbr.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST]);
                manifestPromise.then(manifest => {
                    const accordionItemHeadingId = self.$ctrl.createId("accordion_item_heading"),
                        accordionCollapsableId = self.$ctrl.createId("accordion_collapsable");
                    self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.ACCORDION_ITEM))
                        .Children([
                            <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_HEADER_NAME, "h2", self.configuration(self.$cls.ACCORDION_HEADER_NAME))
                                .Id(accordionItemHeadingId)
                                .Children([
                                    <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_TOGGLE_NAME, "button", self.configuration(self.$cls.ACCORDION_TOGGLE_NAME))
                                        .Attributes({
                                            "type": "button"
                                        })
                                        .Aria({
                                            "aria-expanded": false,
                                            "aria-controls": accordionCollapsableId
                                        })
                                        .Data({
                                            "bsToggle": "collapse",
                                            "bsTarget": `#${accordionCollapsableId}`
                                        })
                                    )
                                ])),
                            <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_COLLAPSE, "div", self.configuration(self.$cls.ACCORDION_COLLAPSE))
                                .Id(accordionCollapsableId)
                                .Aria({
                                    "aria-labelledby": accordionItemHeadingId
                                })
                                .Children([
                                    <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_BODY, "div", self.configuration(self.$cls.ACCORDION_BODY)))
                                ])
                            )
                        ])
                    );
                    self.title = self._title;
                    initialisePromise.resolve(self);
                })
            })

        return initialisePromise;
    }
    public expand() {
        const self = this,            
            collapseElement = self.elements[self.$cls.ACCORDION_COLLAPSE];

        if (collapseElement.classList.contains("collapse")) {
            const collapse = (self.$mrbr.host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement);
            collapse.show();
        }
    }
    public collapse() {
        const self = this,
            collapseElement = self.elements[self.$cls.ACCORDION_COLLAPSE];
        if (collapseElement.classList.contains("collapse") && collapseElement.classList.contains("show")) {
            const collapse = (self.$mrbr.host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement);
            collapse.hide();
        }

    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        const self = this,
            elements = self.elements, toggleName = self.$cls.ACCORDION_TOGGLE_NAME;
        (elements[toggleName]) && ((<HTMLHeadingElement>elements[toggleName]).textContent = value)
        this._title = value;
    }
    setParent(parentId: string) {
        this.elements[this.$cls.ACCORDION_COLLAPSE].dataset["bsParent"] = `#${parentId}`;
    }
    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_AccordionItem> {
        const self = this;
        self.defaultConfiguration.add(self.$cls.ACCORDION_ITEM, new self.$ctrlPrm()
            .Classes(["accordion-item"])
        )
        self.defaultConfiguration.add(self.$cls.ACCORDION_HEADER_NAME, new self.$ctrlPrm()
            .Classes(["accordion-header"])
        )
        self.defaultConfiguration.add(self.$cls.ACCORDION_TOGGLE_NAME, new self.$ctrlPrm()
            .Classes(["accordion-button collapsed"])
        )
        self.defaultConfiguration.add(self.$cls.ACCORDION_COLLAPSE, new self.$ctrlPrm()
            .Classes(["accordion-collapse collapse"])
        )
        self.defaultConfiguration.add(self.$cls.ACCORDION_BODY, new self.$ctrlPrm()
            .Classes(["accordion-body"])
        )
        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Controls_AccordionItem:setDefaultConfiguration", self);
    }

}
