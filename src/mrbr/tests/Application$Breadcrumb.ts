import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_System_Promise } from "../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_Breadcrumb } from "../ui/bootstrap/controls/Breadcrumb";
import { Mrbr_UI_Bootstrap_Controls_BreadcrumbItem } from "../ui/bootstrap/controls/BreadcrumbItem";

export class Mrbr_Tests_Application$Breadcrumb {
    breadcrumb: Mrbr_UI_Bootstrap_Controls_Breadcrumb;
    constructor() {
        const self = this;
        self.breadcrumb = new Mrbr_UI_Bootstrap_Controls_Breadcrumb("breadCrumb1");
    }
    initialise(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Breadcrumb> {
        const self = this,
            initialisePromise = Mrbr_System_Promise.create<Mrbr_UI_Bootstrap_Controls_Breadcrumb>("Mrbr_Tests_Application$Breadcrumb:initialise");
        self.breadcrumb
            .initialise()
            .then(_ => {
                let breadcrumb = self.breadcrumb;
                breadcrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home", "#", "Home"));
                breadcrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home1", "#", "Home 1"));
                breadcrumb.onCrumbClick(self.breadcrumbClick.bind(self));

                setTimeout(() => {
                    breadcrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home2", "#", "Home 2"));
                }, 2000);
                setTimeout(() => {
                    breadcrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home3", "#", "Home 3"));
                }, 4000);
                setTimeout(() => {
                    breadcrumb.setCurrentCrumb(breadcrumb.getNode("Home2").value);
                }, 6000);
                breadcrumb.mount(document.body);
                initialisePromise.resolve(breadcrumb);
                //document.body.appendChild(breadcrumb.rootElement);


                setTimeout(() => {
                    breadcrumb.dispose();
                    self.breadcrumb = null;
                    breadcrumb = null;
                }, 60000);


            });

        return initialisePromise;
    }
    breadcrumbClick(e: Mrbr_System_Events_Event<string>) {
        console.log(`Crumb clicked: ${e.data}`);
    }

}