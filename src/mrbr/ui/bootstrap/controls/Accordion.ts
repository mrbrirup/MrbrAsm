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
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    public get alwaysOpen(): boolean {
        return this._alwaysOpen;
    }
    public set alwaysOpen(value: boolean) {
        const self = this,
            accordianItem = Mrbr_UI_Bootstrap_Controls_AccordionItem;
        self.controls[Mrbr_UI_Controls_Control.CONTROL_KEYS].forEach(item => {
            const control = self.controls[item];
            if (control instanceof accordianItem) {
                console.log("control: ", control);
                !value && control.setParent(self.rootElement.id);
                value && delete control.elements[accordianItem.ACCORDION_COLLAPSE].dataset.bsParent;
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
            accordionName = Mrbr_UI_Bootstrap_Controls_Accordion.ACCORDION_NAME,
            classActions = Mrbr_UI_Controls_ClassActions,
            flushClass = "accordion-flush";
        ((elements[accordionName]) && flush) && (self.classes((<HTMLHeadingElement>elements[accordionName]), (flush ? classActions.Add : classActions.Remove), flushClass));
        this._flush = flush;
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            mubca = Mrbr_UI_Bootstrap_Controls_Accordion,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            initialisePromise = Mrbr_System_MrbrPromise.create(`Mrbr_UI_Bootstrap_Controls_Accordion:${self.rootElementName}`);
        super.initialise(args)
            .then(async _ => {
                await self.setDefaultConfiguration();
                self.createElement(new ctrlCfg(self.rootElementName, "div", self.configuration(mubca.ACCORDION_NAME)))
                self.flush = self._flush;
                initialisePromise.resolve(self);
            })
        return initialisePromise;

    }

    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Accordion> {
        const self = this,
            mubca = Mrbr_UI_Bootstrap_Controls_Accordion,
            muccop = Mrbr_UI_Controls_ControlConfigOptionalParameters;
        self.defaultConfiguration.add(mubca.ACCORDION_NAME, new muccop()
            .Classes(["accordion"])
        );
        return Mrbr_System_MrbrPromise.createResolved("Mrbr_UI_Bootstrap_Controls_Accordion:setDefaultConfiguration", self);
    }
    public addItems(item: Mrbr_UI_Bootstrap_Controls_AccordionItem | Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>) {
        const self = this;
        if (Array.isArray(item)) { item.forEach(_item => self.addItems(_item)); return; }
        self.controls[item.rootElementName] = item;
        self.alwaysOpen = self._alwaysOpen;
        self.rootElement.appendChild(item.rootElement);
    }
}
