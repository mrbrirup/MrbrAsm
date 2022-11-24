import { Mrbr_UI_Bootstrap_Controls_Collapse } from "../ui/bootstrap/controls/Collapse";
import { Mrbr_UI_Controls_MountPosition } from "../ui/controls/MountPosition";


export class Mrbr_Tests_Application$Collapse {

    constructor() {

        let collapse = new Mrbr_UI_Bootstrap_Controls_Collapse();
        let collapse2 = new Mrbr_UI_Bootstrap_Controls_Collapse();
        //let collapse3 = new Mrbr_UI_Bootstrap_Controls_Collapse("collapse3");
        collapse.startOpen = false;
        collapse2.startOpen = false;

        //Promise.all([collapse.initialise(), collapse2.initialise(), collapse3.initialise()])
        Promise.all([collapse.initialise(), collapse2.initialise()])
            .then(_ => {
                let parentDiv = document.createElement("div");
                parentDiv.style.backgroundColor = "red";
                parentDiv.innerHTML =
                    `<div style="min-height: 120px;" id="exampleParent">
                        <div class="collapse" id="collapseWidthExample1" >                  
                            <div class="card card-body" >
                                1:This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.                
                            </div>
                        </div>
                        <div class="collapse" id="collapseWidthExample2" >            
                            <div class="card card-body">                  
                                2:This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                            </div>        
                        </div>
                    </div>`;

                document.body.appendChild(parentDiv);
                let parent = <HTMLElement>parentDiv.querySelector("#exampleParent");
                collapse.targetElements = "collapseWidthExample1";
                collapse2.targetElements = "collapseWidthExample2";
                collapse.mount(parent, Mrbr_UI_Controls_MountPosition.prepend)
                //collapse3.mount(collapse, Mrbr_UI_Controls_MountPosition.after)
                collapse2.mount(collapse, Mrbr_UI_Controls_MountPosition.after)

                //collapse3.targetElements = ["collapseWidthExample1", "collapseWidthExample2"];
                // collapse.parent = "#exampleParent";
                // collapse2.parent = "#exampleParent";
                collapse.expandedText = "Collapse";
                collapse.collapsedText = "Expand";


                // collapse.onShow(() => { console.log("collapse.onShow"); });
                // collapse.onShown(() => { console.log("collapse.onShown"); });
                // collapse.onHide(() => { console.log("collapse.onHide"); });
                // collapse.onHidden(() => { console.log("collapse.onHidden"); });
                // collapse.onClick(() => { console.log("collapse.onClick"); });

                // collapse2.onShow(() => { console.log("collapse2.onShow"); });
                // collapse2.onShown(() => { console.log("collapse2.onShown"); });
                // collapse2.onHide(() => { console.log("collapse2.onHide"); });
                // collapse2.onHidden(() => { console.log("collapse2.onHidden"); });

                // collapse3.onShow(() => { console.log("collapse3.onShow"); });
                // collapse3.onShown(() => { console.log("collapse3.onShown"); });
                // collapse3.onHide(() => { console.log("collapse3.onHide"); });
                // collapse3.onHidden(() => { console.log("collapse3.onHidden"); });

                // collapse.addEventListener(collapse.$cls.SHOW_COLLAPSE_EVENT_NAME, e => {
                //     console.log("Collapse Show");
                // });
                // collapse.addEventListener(collapse.$cls.SHOWN_COLLAPSE_EVENT_NAME, e => {
                //     console.log("Collapse Shown");
                // });
                // collapse.addEventListener(collapse.$cls.HIDE_COLLAPSE_EVENT_NAME, e => {
                //     console.log("Collapse Hide");
                // });
                // collapse.addEventListener(collapse.$cls.HIDDEN_COLLAPSE_EVENT_NAME, e => {
                //     console.log("Collapse Hidden");
                // });
            })
    }
}