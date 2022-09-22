import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_AccordionItem } from "./AccordionItem";

export class Mrbr_UI_Bootstrap_Controls_Accordion extends Mrbr_UI_Controls_Control {
    public static ACCORDION_NAME: string = "accordion_name";
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            mubca = Mrbr_UI_Bootstrap_Controls_Accordion,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            initialisePromise = Mrbr_System_MrbrPromise.CreateMrbrPromise(`Mrbr_UI_Bootstrap_Controls_Accordion:${self.rootElementName}`);
        super.initialise(args)
            .then(async _ => {
                await self.setDefaultConfiguration();
                self.createElement(new ctrlCfg(self.rootElementName, "div", self.configuration(mubca.ACCORDION_NAME)))
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
        return Mrbr_System_MrbrPromise.CreateResolvedMrbrPromise(this);
    }
    public addItems(item: Mrbr_UI_Bootstrap_Controls_AccordionItem | Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>) {
        const self = this;
        if (Array.isArray(item)) { item.forEach(_item => self.addItems(_item)); return; }
        self.controls[item.rootElementName] = item;
        item.setParent(self.rootElement.id);
        self.rootElement.appendChild(item.rootElement);
    }
}
