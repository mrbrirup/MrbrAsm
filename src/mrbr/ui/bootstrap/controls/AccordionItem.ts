import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";

export class Mrbr_UI_Bootstrap_Controls_AccordionItem extends Mrbr_UI_Controls_Control implements Mrbr_UI_Controls_IControl {

    //#region Static Constants
    public static ACCORDION_ITEM: string = "accordion_item";
    public static ACCORDION_HEADER_NAME: string = "accordion_header";
    public static ACCORDION_TOGGLE_NAME: string = "accordion_toggle";
    public static ACCORDION_COLLAPSE: string = "accordion_collapse";
    public static ACCORDION_BODY: string = "accordion_body";
    //#endregion Static Constants
    //#region Private Property Fields
    private _title: string = "";
    //#endregion Private Property Fields
    //region Private Properties
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_AccordionItem { return Mrbr_UI_Bootstrap_Controls_AccordionItem; }
    //endregion Private Properties

    //#region Private Static Fields
    private static _accordion_item_config: Mrbr_UI_Controls_ControlConfigOptionalParameters
    private static _accordion_header_config: Mrbr_UI_Controls_ControlConfigOptionalParameters
    private static _accordion_toggle_config: Mrbr_UI_Controls_ControlConfigOptionalParameters
    private static _accordion_collapse_config: Mrbr_UI_Controls_ControlConfigOptionalParameters
    private static _accordion_body_config: Mrbr_UI_Controls_ControlConfigOptionalParameters
    //#endregion Private Static Fields
    //#region Private Properties
    private get accordionItemConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_item_config) && (this.$cls._accordion_item_config = new this.$ctrlPrm().Classes(["accordion-item"]))
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_item_config);
    }
    private get accordionHeaderConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_header_config) && (this.$cls._accordion_header_config = new this.$ctrlPrm().Classes(["accordion-header"]))
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_header_config);
    }
    private get accordionToggleConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_toggle_config) && (this.$cls._accordion_toggle_config = new this.$ctrlPrm().Classes(["accordion-button", "collapsed"]));
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_toggle_config);
    }
    private get accordionCollapseConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_collapse_config) && (this.$cls._accordion_collapse_config = new this.$ctrlPrm().Classes(["accordion-collapse", "collapse"]));
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_collapse_config);
    }
    private get accordionBodyConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_body_config) && (this.$cls._accordion_body_config = new this.$ctrlPrm().Classes(["accordion-body"]))
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_body_config);
    }
    //#endregion Private Properties

    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = this.$cls.ACCORDION_BODY;
    }
    //#region Public Properties
    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        const 
            elements = this.elements, 
            toggleName = this.$cls.ACCORDION_TOGGLE_NAME;
        elements.get(toggleName) && ((<HTMLHeadingElement>elements.get(toggleName)).textContent = value);
        this._title = value;
    }
    //#endregion Private Properties

    //#region Public Methods
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_AccordionItem:initialise");
        super.initialise(args)
            .then(control => {
                self.mrbrInstance
                    .loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(manifest => {
                        const accordionItemHeadingId = self.$ctrl.createId("accordion_item_heading"),
                            accordionCollapsableId = self.$ctrl.createId("accordion_collapsable"),
                            accordionToggle = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_TOGGLE_NAME, "button", self.accordionToggleConfig)
                                .Attributes({ "type": "button" })
                                .Aria({
                                    "aria-expanded": false,
                                    "aria-controls": accordionCollapsableId
                                })
                                .Data({
                                    "bsToggle": "collapse",
                                    "bsTarget": `#${accordionCollapsableId}`
                                })
                            ),
                            accordionBody = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_BODY, "div", self.accordionBodyConfig)),
                            accordionHeader = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_HEADER_NAME, "h2", self.accordionHeaderConfig)
                                .Id(accordionItemHeadingId)
                                .Children(accordionToggle)),
                            accordionCollapse = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_COLLAPSE, "div", self.accordionCollapseConfig)
                                .Id(accordionCollapsableId)
                                .Aria({ "aria-labelledby": accordionItemHeadingId })
                                .Children(accordionBody));
                        self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.accordionItemConfig)
                            .Children([accordionHeader, accordionCollapse])
                        );
                        self.defaultContainerElementName = self.$cls.ACCORDION_BODY;
                        self.title = self._title;
                        initialisePromise.resolve(self);
                    })
            })

        return initialisePromise;
    }
    public expand() {
        const collapseElement = this.elements.get(this.$cls.ACCORDION_COLLAPSE);
        if (!collapseElement.classList.contains("collapse")) { return; }
        const collapse = (this.mrbrInstance.host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement);
        collapse.show();
    }
    public collapse() {
        const collapseElement = this.elements.get(this.$cls.ACCORDION_COLLAPSE);
        if (!(collapseElement.classList.contains("collapse") && collapseElement.classList.contains("show"))) { return; }
        const collapse = (this.mrbrInstance.host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement);
        collapse.hide();
    }
    public setParent(parentId: string) { this.elements.get(this.$cls.ACCORDION_COLLAPSE).dataset["bsParent"] = `#${parentId}`; }
    //endregion Public Methods
}
