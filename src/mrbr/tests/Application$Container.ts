import { Mrbr_UI_Bootstrap_Layout_Container } from "../ui/bootstrap/layout/Container";
import { Mrbr_UI_Bootstrap_Layout_ContainerTypes } from "../ui/bootstrap/layout/ContainerTypes";

export class Mrbr_Tests_Application$Container {
    constructor() {
        const
            container = new Mrbr_UI_Bootstrap_Layout_Container(),
            fluidContainer = new Mrbr_UI_Bootstrap_Layout_Container()
                .ContainerType(Mrbr_UI_Bootstrap_Layout_ContainerTypes.fluid);

        Promise.all([container.initialise(), fluidContainer.initialise()])

            .then(_ => {
                container.rootElement.style.backgroundColor = "red";
                container.rootElement.style.height = "100px";
                fluidContainer.rootElement.style.backgroundColor = "blue";
                fluidContainer.rootElement.style.height = "100px";
                container.mount(document.body);
                fluidContainer.mount(document.body);
            });

    }
}