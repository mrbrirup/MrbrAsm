import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_UI_Controls_Control } from "../../controls/control";

export class Mrbr_UI_Bootstrap_Controls_Scrollspies {

    static get $ctrl(): typeof Mrbr_UI_Controls_Control { return Mrbr_UI_Controls_Control; }
    public static Scrollspy = class {
        spyElement: HTMLElement;
        watchedElement: HTMLElement;
        name: string;
        constructor(name: string, spyElement: HTMLElement, watchedElement: HTMLElement) {
            this.spyElement = spyElement;
            this.name = name;
            let ctrl = Mrbr_UI_Bootstrap_Controls_Scrollspies.$ctrl;
            (!spyElement.id) && (this.spyElement.id = ctrl.createId("scrollspy_watched"))
            this.watchedElement = watchedElement;
            (!watchedElement.id) && (this.watchedElement.id = ctrl.createId("scrollspy"))
            this.watchedElement.dataset.bsSpy = "scroll";
            this.watchedElement.dataset.bsTarget = `#${this.spyElement.id}`;
            this.watchedElement.dataset.bsSmoothScroll = "true";
            this.watchedElement.tabIndex = -1;
        }
        dispose() {
            delete this.watchedElement.dataset.bsSpy;
            delete this.watchedElement.dataset.bsTarget;
            delete this.watchedElement.dataset.bsSmoothScroll;
            this.watchedElement.tabIndex = 0;
        }
    }
    private static _scrollSpies: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Scrollspies.Scrollspy>>;
    public static get scrollSpies(): Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Scrollspies.Scrollspy>> {
        const self = Mrbr_UI_Bootstrap_Controls_Scrollspies;
        (!self._scrollSpies) && (self._scrollSpies = new Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Scrollspies.Scrollspy>>());
        return Mrbr_UI_Bootstrap_Controls_Scrollspies._scrollSpies;
    }

    public static attachScrollSpy(name: string, spyElement: HTMLElement, watchedElement: HTMLElement): void {
        const self = Mrbr_UI_Bootstrap_Controls_Scrollspies;
        const scrollSpy = new Mrbr_UI_Bootstrap_Controls_Scrollspies.Scrollspy(name, spyElement, watchedElement);
        self.scrollSpies.set(scrollSpy.name, scrollSpy);
        const bootstrap = MrbrBase.mrbrInstance.host.bootstrap;
        bootstrap.ScrollSpy.getOrCreateInstance(document.body, {
            target: `#${watchedElement.id}`
        })

    }

    public static removeScrollSpy(name: string): void {
        const self = Mrbr_UI_Bootstrap_Controls_Scrollspies;
        const scrollSpy = self.scrollSpies.get(name);
        if (scrollSpy) {
            self.scrollSpies.delete(name);
            scrollSpy.dispose();
        }
    }
    public static joinLinkToSpy(spyElement: HTMLAnchorElement, watchedElement: HTMLElement): void {
        let ctrl = Mrbr_UI_Bootstrap_Controls_Scrollspies.$ctrl;
        (!watchedElement.id) && (watchedElement.id = ctrl.createId("scrollspy_watched_item"));
        spyElement.href = `#${watchedElement.id}`;
    }
}