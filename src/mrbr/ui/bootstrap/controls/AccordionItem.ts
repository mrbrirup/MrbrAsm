import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";


/**
 * Create a new Bootstrap Accordion control.
 * @date 31/10/2022 - 05:17:54
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_AccordionItem
 * @typedef {Mrbr_UI_Bootstrap_Controls_AccordionItem}
 * @extends {Mrbr_UI_Controls_Control}
 * @implements {Mrbr_UI_Controls_IControl}
 */
export class Mrbr_UI_Bootstrap_Controls_AccordionItem extends Mrbr_UI_Controls_Control implements Mrbr_UI_Controls_IControl {

    //#region Static Constants

    /**
     * Internal name for the control.
     * @date 31/10/2022 - 05:18:08
     *
     * @public
     * @static
     * @type {string}
     */
    public static ACCORDION_ITEM: string = "accordion_item";

    /**
     * Internal name for the control header
     * @date 31/10/2022 - 05:18:25
     *
     * @public
     * @static
     * @type {string}
     */
    public static ACCORDION_HEADER_NAME: string = "accordion_header";

    /**
     * Internal name for the control toggle
     * @date 31/10/2022 - 05:18:47
     *
     * @public
     * @static
     * @type {string}
     */
    public static ACCORDION_TOGGLE_NAME: string = "accordion_toggle";

    /**
     * Internal name for the control collapse element
     * @date 31/10/2022 - 05:19:05
     *
     * @public
     * @static
     * @type {string}
     */
    public static ACCORDION_COLLAPSE: string = "accordion_collapse";

    /**
     * Internal name for the control body
     * @date 31/10/2022 - 05:19:24
     *
     * @public
     * @static
     * @type {string}
     */
    public static ACCORDION_BODY: string = "accordion_body";
    //#endregion Static Constants
    //#region Private Property Fields

    /**
     * Accordion Item Header text
     * @date 31/10/2022 - 05:19:43
     *
     * @private
     * @type {string}
     */
    private _title: string = "";
    //#endregion Private Property Fields
    //region Private Properties

    /**
     * Alias for this class type
     * @date 31/10/2022 - 05:20:08
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_AccordionItem}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_AccordionItem { return Mrbr_UI_Bootstrap_Controls_AccordionItem; }
    //endregion Private Properties

    //#region Private Static Fields

    /**
     * AccordionItem default Configuration
     * @date 31/10/2022 - 05:20:41
     *
     * @private
     * @static
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private static _accordion_item_config: Mrbr_UI_Controls_ControlConfigOptionalParameters

    /**
     * AccordionItem Header Default Configuration
     * @date 31/10/2022 - 05:21:07
     *
     * @private
     * @static
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private static _accordion_header_config: Mrbr_UI_Controls_ControlConfigOptionalParameters

    /**
     * AccordionItem Toggle default Configuration
     * @date 31/10/2022 - 05:21:29
     *
     * @private
     * @static
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private static _accordion_toggle_config: Mrbr_UI_Controls_ControlConfigOptionalParameters

    /**
     * AccordionItem Collpase Default Configuration
     * @date 31/10/2022 - 05:21:48
     *
     * @private
     * @static
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private static _accordion_collapse_config: Mrbr_UI_Controls_ControlConfigOptionalParameters

    /**
     * AccordionItem Body Default Configuration
     * @date 31/10/2022 - 05:22:10
     *
     * @private
     * @static
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private static _accordion_body_config: Mrbr_UI_Controls_ControlConfigOptionalParameters
    //#endregion Private Static Fields
    //#region Private Properties

    /**
     * AccordionItem Instance Configuration
     * @date 31/10/2022 - 05:22:53
     *
     * @private
     * @readonly
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private get accordionItemConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_item_config) && (this.$cls._accordion_item_config = new this.$ctrlPrm().Classes(["accordion-item"]))
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_item_config);
    }

    /**
     * AccordionItem Header Instance Configuration
     * @date 31/10/2022 - 05:23:24
     *
     * @private
     * @readonly
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private get accordionHeaderConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_header_config) && (this.$cls._accordion_header_config = new this.$ctrlPrm().Classes(["accordion-header"]))
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_header_config);
    }

    /**
     * AccordionItem Toggle Instance Configuration
     * @date 31/10/2022 - 05:23:37
     *
     * @private
     * @readonly
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private get accordionToggleConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_toggle_config) && (this.$cls._accordion_toggle_config = new this.$ctrlPrm().Classes(["accordion-button", "collapsed"]));
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_toggle_config);
    }

    /**
     * AccordionItem Collapse Instance Configuration
     * @date 31/10/2022 - 05:23:44
     *
     * @private
     * @readonly
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private get accordionCollapseConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_collapse_config) && (this.$cls._accordion_collapse_config = new this.$ctrlPrm().Classes(["accordion-collapse", "collapse"]));
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_collapse_config);
    }

    /**
     * AccordionItem Body Instance Configuration
     * @date 31/10/2022 - 05:23:53
     *
     * @private
     * @readonly
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private get accordionBodyConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_body_config) && (this.$cls._accordion_body_config = new this.$ctrlPrm().Classes(["accordion-body"]))
        return Object.assign(new this.$ctrlPrm(), this.$cls._accordion_body_config);
    }
    //#endregion Private Properties

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_AccordionItem.
     * @date 31/10/2022 - 05:24:09
     *
     * @constructor
     * @param {string} rootElementName
     */
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = this.$cls.ACCORDION_BODY;
    }
    //#region Public Properties

    /**
     * AccordionItem Header Text. Sets property value and update element if it exists      
     * @date 31/10/2022 - 05:24:28
     *
     * @public
     * @type {string}
     */
    public get title(): string { return this._title; }

    /**
     * AccordionItem Header Text. Sets property value and update element if it exists
     */
    public set title(value: string) {
        const
            elements = this.elements,
            toggleName = this.$cls.ACCORDION_TOGGLE_NAME;
        elements.get(toggleName) && ((<HTMLHeadingElement>elements.get(toggleName)).textContent = value);
        this._title = value;
    }
    //#endregion Private Properties

    //#region Public Methods

    /**
     * Initialises the AccordionItem, loading manifest and assigning default values
     * @date 31/10/2022 - 05:25:58
     *
     * @public
     * @param {...*} args
     * @returns {Mrbr_System_MrbrPromise<any>}
     */
    public initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_AccordionItem:initialise");
        super
            .initialise(args)
            .then(control => {
                self.mrbrInstance
                    .loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(manifest => {
                        const accordionItemHeadingId = self.$ctrl.createId("accordion_item_heading"),
                            accordionCollapsableId = self.$ctrl.createId("accordion_collapsable"),
                            accordionToggle = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_TOGGLE_NAME, "button", self.accordionToggleConfig
                                .Attributes({ "type": "button" })
                                .Aria({
                                    "aria-expanded": false,
                                    "aria-controls": accordionCollapsableId
                                })
                                .Data({
                                    "bsToggle": "collapse",
                                    "bsTarget": `#${accordionCollapsableId}`
                                })
                            )),
                            accordionBody = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_BODY, "div", self.accordionBodyConfig)),
                            accordionHeader = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_HEADER_NAME, "h2", self.accordionHeaderConfig
                                .Id(accordionItemHeadingId)
                                .Children(accordionToggle))),
                            accordionCollapse = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_COLLAPSE, "div", self.accordionCollapseConfig
                                .Id(accordionCollapsableId)
                                .Aria({ "aria-labelledby": accordionItemHeadingId })
                                .Children(accordionBody)));
                        self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.accordionItemConfig
                            .Children([accordionHeader, accordionCollapse])
                        ));
                        self.defaultContainerElementName = self.$cls.ACCORDION_BODY;
                        self.title = self._title;
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }

    /**
     * Expands the AccordionItem
     * @date 31/10/2022 - 05:26:41
     *
     * @public
     */
    public expand() {
        const collapseElement = this.elements.get(this.$cls.ACCORDION_COLLAPSE);
        if (!collapseElement.classList.contains("collapse")) { return; }
        (this.mrbrInstance.host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement)?.show();
    }

    /**
     * Collapses the AccordionItem
     * @date 31/10/2022 - 05:26:57
     *
     * @public
     */
    public collapse() {
        const collapseElement = this.elements.get(this.$cls.ACCORDION_COLLAPSE);
        if (!(collapseElement.classList.contains("collapse") && collapseElement.classList.contains("show"))) { return; }
        (this.mrbrInstance.host.bootstrap as any).Collapse.getOrCreateInstance(collapseElement)?.hide();
    }
    public setParent(parentId: string) { this.elements.get(this.$cls.ACCORDION_COLLAPSE).dataset["bsParent"] = `#${parentId}`; }
    //endregion Public Methods
}
