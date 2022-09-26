import { Mrbr_System_MrbrPromise } from "../system/MrbrPromise";
import { Mrbr_UI_Bootstrap_Controls_Breadcrumb } from "../ui/bootstrap/controls/Breadcrumb";
import { Mrbr_UI_Bootstrap_Controls_BreadcrumbItem } from "../ui/bootstrap/controls/BreadcrumbItem";

export class Mrbr_Tests_Application$Breadcrumb {
    breadCrumb: Mrbr_UI_Bootstrap_Controls_Breadcrumb;
    constructor() {
        const self = this;
        self.breadCrumb = new Mrbr_UI_Bootstrap_Controls_Breadcrumb("breadCrumb1");
    }
    initialise(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Breadcrumb> {
        const self = this,
            initialisePromise = Mrbr_System_MrbrPromise.CreateMrbrPromise<Mrbr_UI_Bootstrap_Controls_Breadcrumb>("Mrbr_Tests_Application$Breadcrumb:initialise");
        self.breadCrumb
            .initialise()
            .then(_ => {
                self.breadCrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home", "#", "Home"));
                self.breadCrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home1", "#", "Home 1"));
                self.breadCrumb.addEventListener(Mrbr_UI_Bootstrap_Controls_Breadcrumb.BREADCRUMB_CLICK_EVENT_NAME, self.breadCrumbClick.bind(self));

                setTimeout(() => {
                    self.breadCrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home2", "#", "Home 2"));
                }, 2000);
                setTimeout(() => {
                    self.breadCrumb.add(new Mrbr_UI_Bootstrap_Controls_BreadcrumbItem("Home3", "#", "Home 3"));
                }, 4000);
                setTimeout(() => {
                    self.breadCrumb.setCurrentCrumb(self.breadCrumb.getNode("Home2").value);
                }, 6000);
                initialisePromise.resolve(self.breadCrumb);
                document.body.appendChild(self.breadCrumb.rootElement);



                setTimeout(() => {
                    self.breadCrumb.dispose();
                    self.breadCrumb = null;
                }, 60000);


            });

        return initialisePromise;
    }
    breadCrumbClick(e: CustomEvent) {
        console.log(`Crumb clicked: ${e.detail.id}`);
    }

}