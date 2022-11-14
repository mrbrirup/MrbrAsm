import { Mrbr_System_Events_Event } from "../system/events/Event";
import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_System_Promise } from "../system/Promise";
import { Mrbr_UI_Bootstrap_Containers_Container } from "../ui/bootstrap/containers/Container";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "../ui/bootstrap/containers/container$breakpoints";
import { Mrbr_UI_Bootstrap_Controls_Accordion } from "../ui/bootstrap/controls/Accordion";
import { Mrbr_UI_Bootstrap_Controls_AccordionItem } from "../ui/bootstrap/controls/AccordionItem";
import { Mrbr_UI_Bootstrap_Utilities_Interactions } from "../ui/bootstrap/utilities/interactions";
import { Mrbr_UI_Controls_Control } from "../ui/controls/Control";
import { Mrbr_UI_DOM_MutationObserver } from "../ui/dom/mutationObserver";

/**
 * Create a new Bootstrap Accordion control.
 * Add AccordionItems
 * Run Open/Close
 * @date 31/10/2022 - 06:01:11
 *
 * @export
 * @class Mrbr_Tests_Application
 * @typedef {Mrbr_Tests_Application$Accordion}
 */
export class Mrbr_Tests_Application$Accordion extends Mrbr_UI_Controls_Control {
    get $mubcc(): typeof Mrbr_UI_Bootstrap_Containers_Container { return Mrbr_UI_Bootstrap_Containers_Container; }
    get $mubcc$bp(): typeof Mrbr_UI_Bootstrap_Containers_Container$Breakpoints { return Mrbr_UI_Bootstrap_Containers_Container$Breakpoints; }
    get $mta$a(): typeof Mrbr_Tests_Application$Accordion { return Mrbr_Tests_Application$Accordion; }
    constructor() {
        super("Mrbr_Tests_Application$Accordion");
    }
    initialise(targetElement: HTMLElement, ...args): Mrbr_System_Promise<Mrbr_Tests_Application$Accordion> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_System_Promise<Mrbr_UI_Bootstrap_Containers_Container>>(`${self.$mubcc[MrbrBase.COMPONENT_NAME]}.initialise`);
        super.initialise(targetElement, args).then(async _ => {
            await self.loadManifest(self.$mta$a);
            await Promise.all([
                self.createAccordion(),
                self.createContainer()
            ]);
            const
                container = self.controls.get("container") as Mrbr_UI_Bootstrap_Containers_Container,
                accordion = self.controls.get("accordion") as Mrbr_UI_Bootstrap_Controls_Accordion;
            self.createContent();
            self.classes(container.rootElement, self.$clsActions.Add, "h-100");
            container.sizing = self.$mubcc$bp.md;
            container.defaultContainerElement.appendChild(self.elements.get("contentDiv"));
            accordion.mount(container);
            container.mount(targetElement);
            this.mutationRecordAddedId = this.mutationObserver.onAddNodes(this.mutationRecordAdded.bind(self));

            initialisePromise.resolve(self);
        });
        return initialisePromise;
    }
    mutationRecordAddedId: number = 0;
    mutationRecordAdded(event: Mrbr_System_Events_Event<NodeList[]>) {
        const id = this.controls.get("container").rootElement.id
        if ((event.source as Mrbr_UI_DOM_MutationObserver).inNodeList(id, event.data)) {
            console.log(`mutationRecordAdded: ` + this.controls.get("container").rootElement.id);
        }
    }
    private async createAccordion() {
        const
            self = this,
            selfControls = self.controls,
            accordion = new Mrbr_UI_Bootstrap_Controls_Accordion("accordionTest"),
            collapseOne = new Mrbr_UI_Bootstrap_Controls_AccordionItem("collapseOne"),
            collapseTwo = new Mrbr_UI_Bootstrap_Controls_AccordionItem("collapseTwo");
        selfControls
            .set("accordion", accordion)
            .set("collapseOne", collapseOne)
            .set("collapseOne", collapseOne);
        await Promise.all([
            accordion.initialise(),
            collapseOne.initialise(),
            collapseTwo.initialise()
        ])
        collapseOne.title = "Header One";
        collapseTwo.title = "Header Two";
        collapseOne.defaultContainerElement.innerHTML = "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</div>";
        collapseTwo.defaultContainerElement.innerHTML = "<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.";
        accordion.addItems([collapseOne, collapseTwo]);
    }
    private async createContainer() {
        await this.controls
            .set("container", new this.$mubcc(this.rootElementName))
            .get("container")
            .initialise();
    }
    private createContent() {
        this.createElement(new this.$ctrlCfg("contentDiv", "content", new this.$ctrlPrm()
            .Children(
                <HTMLHeadElement>this.createElement(new this.$ctrlCfg("header", "h1", new this.$ctrlPrm()
                    .Properties({ innerHTML: "Accordion Test" })
                    .Classes(["text-center p-1", Mrbr_UI_Bootstrap_Utilities_Interactions.userSelectNone])
                ))
            )
            .Classes("m-1")
        ))
    }
}