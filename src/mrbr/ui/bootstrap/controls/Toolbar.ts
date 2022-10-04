import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Toolbar extends Mrbr_UI_Controls_Control {
    static TOOLBAR_NAME: string = "toolbar";
    static DIVIDER_CLASS: string = "me-2";
    private $promise = Mrbr_System_MrbrPromise;
    private $clsAct = Mrbr_UI_Controls_ClassActions;
    private $cls = Mrbr_UI_Bootstrap_Controls_Toolbar;
    private $ctrlCfg = Mrbr_UI_Controls_ControlConfig;
    private $ctrlCfgOpt = Mrbr_UI_Controls_ControlConfigOptionalParameters;
    constructor(rootElementName: string) {
        super(rootElementName);
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Toolbar:initialise");
        super.initialise(args)
            .then(async result => {
                await self.setDefaultConfiguration();
                await MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST]);
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.TOOLBAR_NAME)))
                self.defaultContainerElementName = self.rootElementName;
                initialisePromise.resolve(self);
            })
        return initialisePromise;
    }
    public spaceButtonGroups() {
        const self = this,
            children = self.rootElement.children,
            childrenLength = children.length || 0 as number;
        if (childrenLength <= 1) { return; }
        for (let childCounter = 0; childCounter < childrenLength - 1; childCounter++) {
            self.classes(<HTMLElement>children[childCounter], self.$clsAct.Add, self.$cls.DIVIDER_CLASS);
        }
        self.classes(<HTMLElement>children[childrenLength - 1], self.$clsAct.Remove, self.$cls.DIVIDER_CLASS);
    }
    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Toolbar> {
        const self = this;
        self.defaultConfiguration.add(self.$cls.TOOLBAR_NAME, new self.$ctrlCfgOpt()
            .Classes("btn-toolbar")
            .Attributes({ role: "toolbar" })
            .Aria({ "label": "Toolbar with button groups" })
        )
        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Toolbar:setDefaultConfiguration", self);
    }
}