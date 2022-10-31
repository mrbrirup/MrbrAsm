import { Mrbr_IO_File } from "../io/File";
import { MrbrBase } from "../system/MrbrBase"; //optional
import { Mrbr_UI_Bootstrap_Controls_Accordion } from "../ui/bootstrap/controls/Accordion";
import { Mrbr_UI_Bootstrap_Controls_AccordionItem } from "../ui/bootstrap/controls/AccordionItem";
import { Mrbr_UI_Bootstrap_Forms_Dialog } from "../ui/bootstrap/Forms/Dialog";
import { Mrbr_UI_Bootstrap_Forms_UrlDialog } from "../ui/bootstrap/Forms/UrlDialog";
import { Mrbr_UI_Controls_Desktop } from "../ui/controls/desktop";


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
export class Mrbr_Tests_Application$Accordion {
    //    container = null
    //    desktop: Mrbr_UI_Controls_Desktop
    accordion: Mrbr_UI_Bootstrap_Controls_Accordion;
    accordionItems: Array<Mrbr_UI_Bootstrap_Controls_AccordionItem> = new Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>();
    constructor() {
        const self = this;
        self.accordion = new Mrbr_UI_Bootstrap_Controls_Accordion("accordian-test")
        self.accordion.flush = true;
        self.accordion
            .initialise()
            .then(async accordion => {
                const
                    accItem1 = new Mrbr_UI_Bootstrap_Controls_AccordionItem("collapseOne"),
                    accItem2 = new Mrbr_UI_Bootstrap_Controls_AccordionItem("collapseTwo");
                accItem1.title = "Collapsable One"
                accItem2.title = "Collapsable Two"

                await Promise.all([
                    accItem1.initialise(),
                    accItem2.initialise()
                ])
                accItem1.defaultContainerElement.innerHTML = "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</div>";
                accItem2.defaultContainerElement.innerHTML = "<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.";
                (<Mrbr_UI_Bootstrap_Controls_Accordion>accordion).addItems([accItem1, accItem2]);
                self.accordion.alwaysOpen = true;
                (window as any).accordion = self.accordion;
                self.accordion.mount(document.body);
                //document.body.appendChild((<Mrbr_UI_Bootstrap_Controls_Accordion>accordion).rootElement);
                setTimeout(() => {
                    accItem2.expand();
                }, 2000);

                setTimeout(() => {
                    accItem2.collapse();
                }, 4000);
                setTimeout(() => {
                    accItem1.expand();
                }, 3000);

            })
    }
}