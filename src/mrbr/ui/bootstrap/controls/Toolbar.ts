import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Toolbar extends Mrbr_UI_Controls_Control {
    static TOOLBAR_NAME: string = "toolbar";
    static DIVIDER_CLASS: string = "me-2";
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Toolbar { return Mrbr_UI_Bootstrap_Controls_Toolbar; }
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = rootElementName;
    }
    initialise(...args: any): Mrbr_System_Promise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Toolbar:initialise");
        super.initialise(args)
            .then(async result => {
                await self.setDefaultConfig();
                await self.$mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST]);
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.TOOLBAR_NAME)))
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
            self.classes(<HTMLElement>children[childCounter], self.$clsActions.Add, self.$cls.DIVIDER_CLASS);
        }
        self.classes(<HTMLElement>children[childrenLength - 1], self.$clsActions.Remove, self.$cls.DIVIDER_CLASS);
    }
    setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toolbar> {
        const self = this;
        self.defaultConfig.add(self.$cls.TOOLBAR_NAME, new self.$ctrlPrm()
            .Classes("btn-toolbar")
            .Attributes({ role: "toolbar" })
            .Aria({ "label": "Toolbar with button groups" })
        )
        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Toolbar:setDefaultConfiguration", self);
    }
}