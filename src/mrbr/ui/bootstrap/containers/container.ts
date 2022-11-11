import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "./container$breakpoints";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";
import { Mrbr_System_IComponent } from "../../../system/IComponent";
import { Mrbr_UI_Controls_ElementsConfigMap } from "../../controls/ElementsConfigMap";

export class Mrbr_UI_Bootstrap_Containers_Container extends Mrbr_UI_Controls_Control implements Mrbr_UI_Controls_IControl, Mrbr_System_IComponent {

    public static CONTAINER_NAME: string = "Mrbr_UI_Bootstrap_Containers_Container";

    public get $cls(): typeof Mrbr_UI_Bootstrap_Containers_Container { return Mrbr_UI_Bootstrap_Containers_Container; }
    public get $breakpoints(): typeof Mrbr_UI_Bootstrap_Containers_Container$Breakpoints { return Mrbr_UI_Bootstrap_Containers_Container$Breakpoints; }

    private _sizing: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.fluid;
    private get $mubcc(): typeof Mrbr_UI_Bootstrap_Containers_Container { return Mrbr_UI_Bootstrap_Containers_Container; }


    constructor(rootElementName: string) { super(rootElementName); }

    get sizing(): Mrbr_UI_Bootstrap_Containers_Container$Breakpoints { return this._sizing; }
    set sizing(value: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints) {
        const rootElement = this.rootElement,
            $breakpoints = this.$breakpoints;
        this._sizing = value;
        if (!this.rootElement) { return; }
        Object
            .keys(this.$breakpoints)
            .forEach(key => rootElement.classList.toggle($breakpoints[key], value === $breakpoints[key]));
    }
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Containers_Container>(`${self.$mubcc[MrbrBase.MRBR_COMPONENT_NAME]}.initialise`);
        try {
            super.initialise(args).then(async result => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.getConfig(self.$cls.CONTAINER_NAME)));
                self.defaultContainerElementName = self.rootElementName;
                self.sizing = self._sizing;
                initialisePromise.resolve(self);
            })
        } catch (error) { initialisePromise.reject(error); }
        return initialisePromise;
    }
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Containers_Container> {
        const self = this,
            defaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Containers_Container>(`${self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME]}:setDefaultConfig`);
        this.elementConfig = new Mrbr_UI_Controls_ElementsConfigMap(this.$ctrl[this.$mrbrBase.MRBR_COMPONENT_NAME]);
        const cfg = self.elementConfig;
        super.setDefaultConfig().then(result => {
            !cfg.has(self.$cls.CONTAINER_NAME) && cfg.add(self.$cls.CONTAINER_NAME, new self.$ctrlPrm()
                .Classes("container"));
            defaultConfigPromise.resolve(self);
        })
        return defaultConfigPromise;
    }
}