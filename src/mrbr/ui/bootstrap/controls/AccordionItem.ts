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
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = Mrbr_UI_Bootstrap_Controls_AccordionItem.ACCORDION_BODY;
    }




    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            mubcai = Mrbr_UI_Bootstrap_Controls_AccordionItem,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            initialisePromise = Mrbr_System_MrbrPromise.create("Mrbr_UI_Bootstrap_Controls_AccordionItem:initialise");


        super.initialise(args)
            .then(result => {
                self.setDefaultConfiguration();

                const accordionItemHeadingId = Mrbr_UI_Controls_Control.createId("accordion_item_heading");
                const accordionCollapsableId = Mrbr_UI_Controls_Control.createId("accordion_collapsable");
                self.createElement(new ctrlCfg(self.rootElementName, "div", self.configuration(mubcai.ACCORDION_ITEM))
                    .Children([
                        <HTMLElement>self.createElement(new ctrlCfg(mubcai.ACCORDION_HEADER_NAME, "h2", self.configuration(mubcai.ACCORDION_HEADER_NAME))
                            .Id(accordionItemHeadingId)
                            .Children([
                                <HTMLElement>self.createElement(new ctrlCfg(mubcai.ACCORDION_TOGGLE_NAME, "button", self.configuration(mubcai.ACCORDION_TOGGLE_NAME))
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
                        <HTMLElement>self.createElement(new ctrlCfg(mubcai.ACCORDION_COLLAPSE, "div", self.configuration(mubcai.ACCORDION_COLLAPSE))
                            .Id(accordionCollapsableId)
                            .Aria({
                                "aria-labelledby": accordionItemHeadingId
                            })
                            .Children([
                                <HTMLElement>self.createElement(new ctrlCfg(mubcai.ACCORDION_BODY, "div", self.configuration(mubcai.ACCORDION_BODY)))
                            ])
                        )
                    ])
                );
                self.title = self._title;
                initialisePromise.resolve(self);
            })

        return initialisePromise;
    }
    public expand() {
        const self = this,
            host = MrbrBase.mrbrInstance.host,
            collapseElement = self.elements[Mrbr_UI_Bootstrap_Controls_AccordionItem.ACCORDION_COLLAPSE];

        if (collapseElement.classList.contains("collapse")) {
            const collapse = (host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement);
            collapse.show();
        }
    }
    public collapse() {
        const self = this,
            host = MrbrBase.mrbrInstance.host,
            collapseElement = self.elements[Mrbr_UI_Bootstrap_Controls_AccordionItem.ACCORDION_COLLAPSE];
        if (collapseElement.classList.contains("collapse") && collapseElement.classList.contains("show")) {
            const collapse = (host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement);
            collapse.hide();
        }

    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        const elements = this.elements, toggleName = Mrbr_UI_Bootstrap_Controls_AccordionItem.ACCORDION_TOGGLE_NAME;
        (elements[toggleName]) && ((<HTMLHeadingElement>elements[toggleName]).textContent = value)
        this._title = value;
    }
    setParent(parentId: string) {
        this.elements[Mrbr_UI_Bootstrap_Controls_AccordionItem.ACCORDION_COLLAPSE].dataset["bsParent"] = `#${parentId}`;
    }
    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_AccordionItem> {
        const self = this,
            mubca = Mrbr_UI_Bootstrap_Controls_AccordionItem,
            muccop = Mrbr_UI_Controls_ControlConfigOptionalParameters;
        self.defaultConfiguration.add(mubca.ACCORDION_ITEM, new muccop()
            .Classes(["accordion-item"])
        )
        self.defaultConfiguration.add(mubca.ACCORDION_HEADER_NAME, new muccop()
            .Classes(["accordion-header"])
        )
        self.defaultConfiguration.add(mubca.ACCORDION_TOGGLE_NAME, new muccop()
            .Classes(["accordion-button collapsed"])
        )
        self.defaultConfiguration.add(mubca.ACCORDION_COLLAPSE, new muccop()
            .Classes(["accordion-collapse collapse"])
        )
        self.defaultConfiguration.add(mubca.ACCORDION_BODY, new muccop()
            .Classes(["accordion-body"])
        )
        return Mrbr_System_MrbrPromise.createResolved(this);
    }

}
