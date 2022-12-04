import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";
import { Mrbr_UI_Bootstrap_Controls_AccordionItem } from "./AccordionItem";

/**
 * Create a new Bootstrap Accordion control.
 * @date 31/10/2022 - 04:59:54
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_Accordion
 * @typedef {Mrbr_UI_Bootstrap_Controls_Accordion}
 * @extends {Mrbr_UI_Controls_Control}
 * @implements {Mrbr_UI_Controls_IControl}
 */
export class Mrbr_UI_Bootstrap_Controls_Accordion extends Mrbr_UI_Controls_Control implements Mrbr_UI_Controls_IControl {
    //#region Aliases
    /**
     * Alias for Accordion type
     * @date 31/10/2022 - 05:02:44
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Accordion}
     */
    public get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Accordion { return Mrbr_UI_Bootstrap_Controls_Accordion; }

    /**
     * Alias for the AccordionItem class.
     * @date 31/10/2022 - 05:04:39
     *
     * @private
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_AccordionItem}
     */
    private get $acrItem(): typeof Mrbr_UI_Bootstrap_Controls_AccordionItem { return Mrbr_UI_Bootstrap_Controls_AccordionItem; }
    //#endregion Aliases

    //#region Static Constants

    /**
     * Name for the accordion element.
     * @date 31/10/2022 - 05:01:55
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly ACCORDION_NAME: string = "accordion_name";
    //#endregion Static Constants
    //#region Private Property Fields

    /**
     * Default configuration for the accordion element.
     * @date 31/10/2022 - 05:02:20
     *
     * @private
     * @static
     * @type {Mrbr_UI_Controls_ControlConfigOptionalParameters}
     */
    private static _accordion_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    //#endregion Private Property Fields
    //#region Properties


    //#endregion Private Properties

    //#region Private Property Fields

    /**
     * Field for Bootstrap Flush Setting for Accordions.
     * @date 31/10/2022 - 05:04:54
     *
     * @private
     * @type {boolean}
     */
    private _flush: boolean = false;

    /**
     * Field for Bootstrap Always Open Setting for Accordions.
     * @date 31/10/2022 - 05:05:43
     *
     * @private
     * @type {boolean}
     */
    private _alwaysOpen: boolean = false;
    //#endregion Private Property Fields

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Accordion.
     * @date 31/10/2022 - 05:06:09
     *
     * @constructor
     * @param {string} rootElementName Name for the root element.
     */
    constructor(rootElementName: string) { super(rootElementName); }
    //#region Public Properties

    /**
     * Accordion Allways Open setting. 
     * Setting value assigns it to the element and backing field
     * @date 31/10/2022 - 05:06:33
     *
     * @public
     * @type {boolean}
     */
    public get alwaysOpen(): boolean { return this._alwaysOpen; }


    /**
     * Accordion Allways Open setting.
     */
    public set alwaysOpen(value: boolean) {
        const self = this;
        self.controls
            .forEach(control => {
                if (control instanceof self.$acrItem) {
                    !value && control.setParent(self.rootElement.id);
                    value && delete control.elements.get(self.$acrItem.ACCORDION_COLLAPSE).dataset.bsParent;
                }
            })
        self._alwaysOpen = value;
    }

    /**
     * Accordion Flush setting.
     * Setting value assigns it to the element and backing field
     * @date 31/10/2022 - 05:07:49
     *
     * @public
     * @type {boolean}
     */
    public get flush(): boolean { return this._flush; }

    /**
     * Accordion Flush setting.
     * Setting value assigns it to the element and backing field
     */
    public set flush(flush: boolean) {
        const
            elements = this.elements,
            accordionName = this.$cls.ACCORDION_NAME,
            flushClass = "accordion-flush";
        ((elements[accordionName]) && flush) && (this.classes((<HTMLHeadingElement>elements[accordionName]), (flush ? this.$clsActions.add : this.$clsActions.remove), flushClass));
        this._flush = flush;
    }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Initialize the accordion element returns promise for completion
     * Loads Accordion manifest, creates the element and assigns property values. 
     * @date 31/10/2022 - 05:08:47
     *
     * @public
     * @param {...*} args
     * @returns {Mrbr_System_Promise<any>}
     */
    public initialise(...args: any): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Accordion> {
        const self = this,
            initialisePromise = self.$promise.create(`Mrbr_UI_Bootstrap_Controls_Accordion:${self.rootElementName}`);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.getConfig(self.$cls.ACCORDION_NAME)));
                self.flush = self._flush;
                self.defaultContainerElementName = self.rootElementName;
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error))

        return initialisePromise;
    }

    /**
     * Adds an Accordion Item to the Accordion.
     * @date 31/10/2022 - 05:17:03
     *
     * @public
     * @param {(Mrbr_UI_Bootstrap_Controls_AccordionItem | Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>)} item Accordion Item or Array of Accordion Items to add.
     */
    public addItems(item: Mrbr_UI_Bootstrap_Controls_AccordionItem | Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>) {
        if (Array.isArray(item)) { item.forEach(_item => this.addItems(_item)); return; }
        this.controls.set(item.rootElementName, item)
        this.alwaysOpen = this._alwaysOpen;
        item.mount(this.defaultContainerElement);
    }



    /**
     * Configuration for the Accordion elements
     * @date 09/11/2022 - 10:54:39
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Accordion>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Accordion> {
        const self = this,
            componentName = self.$cls[self.$mrbr.COMPONENT_NAME],
            defaultConfigPromise = self.$promise.create(`${componentName}:${self.rootElementName}`);
        try {
            super.setDefaultConfig().then(_ => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
                    .setIfNotExist(self.$cls.ACCORDION_NAME, new this.$ctrlPrm().Classes(["accordion"]));
                defaultConfigPromise.resolve(self);
            })
        } catch (error) { defaultConfigPromise.reject(error); }
        return defaultConfigPromise;
    }
    //#endregion Public Methods
}
