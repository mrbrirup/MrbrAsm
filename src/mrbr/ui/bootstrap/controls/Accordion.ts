import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";
import { Mrbr_UI_Bootstrap_Controls_AccordionItem } from "./AccordionItem";

export class Mrbr_UI_Bootstrap_Controls_Accordion extends Mrbr_UI_Controls_Control implements Mrbr_UI_Controls_IControl {
    //#region Static Constants
    public static readonly ACCORDION_NAME: string = "accordion_name";
    //#endregion Static Constants
    //#region Private Property Fields
    private static _accordion_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    //#endregion Private Property Fields
    //#region Properties
    public get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Accordion { return Mrbr_UI_Bootstrap_Controls_Accordion; }
    public get accordionConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        (!this.$cls._accordion_config) && (this.$cls._accordion_config = new this.$ctrlPrm().Classes(["accordion"]));
        return this.$cls._accordion_config;
    }
    //#endregion Private Properties

    //#region Private Property Fields
    private _flush: boolean = false;
    private _alwaysOpen: boolean = false;
    //#endregion Private Property Fields
    //#region Aliases
    private $acrItem = Mrbr_UI_Bootstrap_Controls_AccordionItem;
    //#endregion Aliases
    constructor(rootElementName: string) { super(rootElementName); }
    //#region Public Properties
    public get alwaysOpen(): boolean { return this._alwaysOpen; }
    public set alwaysOpen(value: boolean) {
        const self = this;
        self.controls
            .forEach(control => {
                if (control instanceof self.$acrItem) {
                    !control && control.setParent(self.rootElement.id);
                    control && delete control.elements.get(self.$acrItem.ACCORDION_COLLAPSE).dataset.bsParent;
                }
            })
        self._alwaysOpen = value;
    }
    public get flush(): boolean { return this._flush; }
    public set flush(flush: boolean) {
        const
            elements = this.elements,
            accordionName = this.$cls.ACCORDION_NAME,
            flushClass = "accordion-flush";
        ((elements[accordionName]) && flush) && (this.classes((<HTMLHeadingElement>elements[accordionName]), (flush ? this.$clsActions.Add : this.$clsActions.Remove), flushClass));
        this._flush = flush;
    }
    //#endregion Public Properties
    //#region Public Methods
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create(`Mrbr_UI_Bootstrap_Controls_Accordion:${self.rootElementName}`);
        super.initialise(args)
            .then(async _ => {
                self.mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(manifest => {
                        self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.accordionConfig))
                        self.flush = self._flush;
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;
    }
    public addItems(item: Mrbr_UI_Bootstrap_Controls_AccordionItem | Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>) {
        if (Array.isArray(item)) { item.forEach(_item => this.addItems(_item)); return; }
        this.controls.set(item.rootElementName, item)
        this.alwaysOpen = this._alwaysOpen;
        this.rootElement.appendChild(item.rootElement);
    }
    //#endregion Public Methods
}
