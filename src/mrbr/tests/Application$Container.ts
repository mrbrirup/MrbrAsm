import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_Promise } from "../system/Promise";
import { Mrbr_UI_Bootstrap_Containers_Container } from "../ui/bootstrap/containers/Container";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "../ui/bootstrap/containers/container$breakpoints";
import { Mrbr_UI_Controls_Control } from "../ui/controls/Control";

export class Mrbr_Tests_Application$Container extends Mrbr_UI_Controls_Control {
    get $mubcc(): typeof Mrbr_UI_Bootstrap_Containers_Container { return Mrbr_UI_Bootstrap_Containers_Container; }
    get $mubcc$bp(): typeof Mrbr_UI_Bootstrap_Containers_Container$Breakpoints { return Mrbr_UI_Bootstrap_Containers_Container$Breakpoints; }
    constructor() {
        super("Mrbr_Tests_Application$Container");
    }
    initialise(targetElement: HTMLElement, ...args): Mrbr_System_Promise<Mrbr_Tests_Application$Container> {
        const self = this,
            cls: typeof Mrbr_Tests_Application$Container = Mrbr_Tests_Application$Container,
            initialisePromise = self.$promise.create<Mrbr_System_Promise<Mrbr_UI_Bootstrap_Containers_Container>>(`${cls[MrbrBase.COMPONENT_NAME]}:initialise`);
        try {

            super.initialise(targetElement, args).then(async _ => {
                await self.loadManifest(cls)
                const container = await new self.$mubcc(self.rootElementName).initialise() as Mrbr_UI_Bootstrap_Containers_Container;
                self.controls.set(container.rootElementName, container)
                container.sizing = self.$mubcc$bp.sm;
                container.mount(targetElement);
                self.classes(container.rootElement, self.$clsActions.add, "h-100");

                setTimeout(() => { self.changeToBlue(); }, 5000);
                setTimeout(() => { container.sizing = self.$mubcc$bp.lg }, 6000);

                initialisePromise.resolve(self);

            });
        } catch (error) {
            initialisePromise.reject(error);
        }
        return initialisePromise;
    }
    public changeToBlue() {
        this.controls.get(this.rootElementName).rootElement.style.backgroundColor = "blue";
    }
}