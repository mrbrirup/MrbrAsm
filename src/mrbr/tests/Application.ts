import { Mrbr_IO_File } from "../io/File";
import { MrbrBase } from "../system/MrbrBase"; //exclude
import { Mrbr_UI_Bootstrap_Controls_Accordion } from "../ui/bootstrap/controls/Accordion";
import { Mrbr_UI_Bootstrap_Controls_AccordionItem } from "../ui/bootstrap/controls/AccordionItem";
import { Mrbr_UI_Bootstrap_Forms_Dialog } from "../ui/bootstrap/Forms/Dialog";
import { Mrbr_UI_Bootstrap_Forms_UrlDialog } from "../ui/bootstrap/Forms/UrlDialog";
import { Mrbr_UI_Controls_Desktop } from "../ui/controls/desktop";

export class Mrbr_Tests_Application {
    //    container = null
    //    desktop: Mrbr_UI_Controls_Desktop
    accordion: Mrbr_UI_Bootstrap_Controls_Accordion;
    accordionItems: Array<Mrbr_UI_Bootstrap_Controls_AccordionItem> = new Array<Mrbr_UI_Bootstrap_Controls_AccordionItem>();
    constructor() {
        const self = this;
        self.accordion = new Mrbr_UI_Bootstrap_Controls_Accordion("accordian-test")
        self.accordion.flush = true;
        self.accordion.initialise()
            .then(async accordion => {
                const
                    accItem1 = new Mrbr_UI_Bootstrap_Controls_AccordionItem("collapseOne"),
                    accItem2 = new Mrbr_UI_Bootstrap_Controls_AccordionItem("collapseTwo");
                accItem1.title = "Collapsable One"
                accItem2.title = "Collapsable Two"

                await [
                    accItem1.initialise(),
                    accItem2.initialise()
                ]
                accItem1.defaultContainerElement.innerHTML = "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</div>";
                accItem2.defaultContainerElement.innerHTML = "<strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.";
                (<Mrbr_UI_Bootstrap_Controls_Accordion>accordion).addItems([accItem1, accItem2]);
                self.accordion.alwaysOpen = true;
                (window as any).accordion = self.accordion;
                document.body.appendChild((<Mrbr_UI_Bootstrap_Controls_Accordion>accordion).rootElement);
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
        // this.desktop = new Mrbr_UI_Controls_Desktop("desktop");
        // MrbrBase.mrbrInstance.loadManifest(Mrbr_IO_File.component(Mrbr_UI_Bootstrap_Forms_UrlDialog))
        //     .then(async _ => {
        //         let form = new Mrbr_UI_Bootstrap_Forms_UrlDialog(
        //             "newDialog1");
        //         form.parentElement = this.desktop.windowContainer;
        //         form.resizable = true;
        //         form.draggable = true;
        //         form.title = "title1";
        //         form.maximiseBox = true;
        //         form.url = "https://en.wikipedia.org/wiki/Avocado";
        //         await form.initialise();
        //         setTimeout(() => {
        //             form.draggable = false;
        //             form.resizable = false;
        //             form.title = "title2";
        //             form.closeBox = true;
        //             setTimeout(() => {
        //                 form.resizable = true;
        //                 form.draggable = true;
        //                 form.title = "title3";
        //                 form.fullScreenBox = true;
        //                 setTimeout(() => {
        //                     form.controlBox = false;
        //                     setTimeout(() => {
        //                         form.controlBox = true;
        //                     }, 500);

        //                 }, 500);

        //             }, 500);
        //         }, 500);
        //         form.show();
        //     })
    }
}