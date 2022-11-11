import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";


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
export class Mrbr_UI_Bootstrap_Controls_AccordionItem extends Mrbr_UI_Bootstrap_Controls_BootstrapControl implements Mrbr_UI_Controls_IControl {

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
     * @returns {Mrbr_System_Promise<any>}
     */
    public initialise(...args: any): Mrbr_System_Promise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_AccordionItem:initialise");
        try {
            super.initialise(args).then(async control => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                const
                    cfg = self.elementConfig,
                    accordionItemHeadingId = self.$ctrl.createId("accordion_item_heading"),
                    accordionCollapsableId = self.$ctrl.createId("accordion_collapsable"),
                    accordionToggle = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_TOGGLE_NAME, "button", cfg.getConfig(self.$cls.ACCORDION_TOGGLE_NAME)
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
                    accordionBody = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_BODY, "div", cfg.getConfig(self.$cls.ACCORDION_BODY))),
                    accordionHeader = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_HEADER_NAME, "h2", cfg.getConfig(self.$cls.ACCORDION_HEADER_NAME)
                        .Id(accordionItemHeadingId)
                        .Children(accordionToggle))),
                    accordionCollapse = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ACCORDION_COLLAPSE, "div", cfg.getConfig(self.$cls.ACCORDION_COLLAPSE)
                        .Id(accordionCollapsableId)
                        .Aria({ "aria-labelledby": accordionItemHeadingId })
                        .Children(accordionBody)));
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", cfg.getConfig(self.$cls.ACCORDION_ITEM)
                    .Children([accordionHeader, accordionCollapse])
                ));
                self.defaultContainerElementName = self.$cls.ACCORDION_BODY;
                self.title = self._title;
                initialisePromise.resolve(self);
            })
        } catch (error) {
            initialisePromise.reject(error);
        }
        return initialisePromise;
    }

    /**
     * Expands the AccordionItem
     * @date 31/10/2022 - 05:26:41
     *
     * @public
     */
    public expand(): void {
        const collapseElement = this.elements.get(this.$cls.ACCORDION_COLLAPSE);
        if (!collapseElement.classList.contains("collapse")) { return; }
        this.bootstrap.Collapse.getOrCreateInstance(collapseElement)?.show();
    }

    /**
     * Collapses the AccordionItem
     * @date 31/10/2022 - 05:26:57
     *
     * @public
     */
    public collapse(): void {
        const collapseElement = this.elements.get(this.$cls.ACCORDION_COLLAPSE);
        if (!(collapseElement.classList.contains("collapse") && collapseElement.classList.contains("show"))) { return; }
        this.bootstrap.Collapse.getOrCreateInstance(collapseElement)?.hide();
    }

    /**
     * Parent for the AccordionItem. Remove parent when Accordion is set to stay open
     * @date 09/11/2022 - 09:43:05
     *
     * @public
     * @param {string} parentId
     */
    public setParent(parentId: string) { this.elements.get(this.$cls.ACCORDION_COLLAPSE).dataset["bsParent"] = `#${parentId}`; }


    /**
     * Set Default Config for the AccordionItem
     * @date 10/11/2022 - 14:11:53
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_AccordionItem>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_AccordionItem> {
        const self = this,
            componentName = self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME],
            defaultConfigPromise = self.$promise.create(`${componentName}:${self.rootElementName}`);
        try {
            super.setDefaultConfig().then(_ => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME])
                    .setIfNotExist(this.$cls.ACCORDION_ITEM, new this.$ctrlPrm()
                        .Classes(["accordion-item"]))
                    .setIfNotExist(this.$cls.ACCORDION_HEADER_NAME, new this.$ctrlPrm()
                        .Classes(["accordion-header"]))
                    .setIfNotExist(this.$cls.ACCORDION_TOGGLE_NAME, new this.$ctrlPrm()
                        .Classes(["accordion-button", "collapsed"]))
                    .setIfNotExist(this.$cls.ACCORDION_COLLAPSE, new this.$ctrlPrm()
                        .Classes(["accordion-collapse", "collapse"]))
                    .setIfNotExist(this.$cls.ACCORDION_BODY, new this.$ctrlPrm()
                        .Classes(["accordion-body"]));

                defaultConfigPromise.resolve(self);
            })
        } catch (error) { defaultConfigPromise.reject(error); }
        return defaultConfigPromise;
    }


    //endregion Public Methods
}
