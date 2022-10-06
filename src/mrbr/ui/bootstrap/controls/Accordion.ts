import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_AccordionItem } from "./AccordionItem";

export class Mrbr_UI_Bootstrap_Controls_Accordion extends Mrbr_UI_Controls_Control {
    public static ACCORDION_NAME: string = "accordion_name";
    private _flush: boolean = false;
    private _alwaysOpen: boolean = false;
    
    override get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Accordion { return Mrbr_UI_Bootstrap_Controls_Accordion; }

    private $acrItem = Mrbr_UI_Bootstrap_Controls_AccordionItem;
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    public get alwaysOpen(): boolean {
        return this._alwaysOpen;
    }
    public set alwaysOpen(value: boolean) {
        const self = this;
        self.controls[self.$ctrl.CONTROL_KEYS].forEach(item => {
            const control = self.controls[item];
            if (control instanceof self.$acrItem) {
                !value && control.setParent(self.rootElement.id);
                value && delete control.elements[self.$acrItem.ACCORDION_COLLAPSE].dataset.bsParent;
            }
        })
        this._alwaysOpen = value;
    }
    public get flush(): boolean {
        return this._flush;
    }
    public set flush(flush: boolean) {
        const self = this,
            elements = self.elements,
            accordionName = self.$cls.ACCORDION_NAME,
            flushClass = "accordion-flush";
        ((elements[accordionName]) && flush) && (self.classes((<HTMLHeadingElement>elements[accordionName]), (flush ? self.$clsActions.Add : self.$clsActions.Remove), flushClass));
        this._flush = flush;
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create(`Mrbr_UI_Bootstrap_Controls_Accordion:${self.rootElementName}`);
        super.initialise(args)
            .then(async _ => {
                await self.setDefaultConfiguration();
                const manifestPromise = self.$mrbr.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(manifest => {
                        self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.ACCORDION_NAME)))
                        self.flush = self._flush;
                        initialisePromise.resolve(self);
                    })
            })
        return initialisePromise;

    }

    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Accordion> {
        const self = this;
        self.defaultConfiguration.add(self.$cls.ACCORDION_NAME, new self.$ctrlPrm()
            .Classes(["accordion"])
        );
        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Controls_Accordion:setDefaultConfiguration", self);
    }
    public addItems(item: Mrbr_UI_Bootstrap_Controls_AccordionItem | Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>) {
        const self = this;
        if (Array.isArray(item)) { item.forEach(_item => self.addItems(_item)); return; }
        self.controls[item.rootElementName] = item;
        self.alwaysOpen = self._alwaysOpen;
        self.rootElement.appendChild(item.rootElement);
    }
}
