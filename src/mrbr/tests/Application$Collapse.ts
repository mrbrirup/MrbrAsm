import { Mrbr_UI_Bootstrap_Controls_Collapse } from "../ui/bootstrap/controls/Collapse";


export class Mrbr_Tests_Application$Collapse {

    constructor() {

        let collapse = new Mrbr_UI_Bootstrap_Controls_Collapse("collapse1");
        let collapse2 = new Mrbr_UI_Bootstrap_Controls_Collapse("collapse2");
        let collapse3 = new Mrbr_UI_Bootstrap_Controls_Collapse("collapse3");
        collapse.startOpen = false;
        collapse2.startOpen = false;

        Promise.all([collapse.initialise(), collapse2.initialise(), collapse3.initialise()])
            .then(_ => {
                let parentDiv = document.createElement("div");
                parentDiv.style.backgroundColor = "red";
                parentDiv.innerHTML = `<div style="min-height: 120px;" id="exampleParent">
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
                // parentDiv.innerHTML = `<div style="min-height: 120px;" id="exampleParent">
                // <div class="collapse collapse-horizontal" id="collapseWidthExample1" data-parent="exampleParent">
                //   <div class="card card-body" style="width: 300px;">
                //     This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                //   </div>
                //   <div class="collapse collapse-horizontal" id="collapseWidthExample2" data-parent="exampleParent">
                //   <div class="card card-body" style="width: 300px;">
                //     This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                //   </div>
                // </div>`;
                document.body.appendChild(parentDiv);
                let parent = parentDiv.querySelector("#exampleParent");
                parent.prepend(collapse.rootElement);
                collapse.rootElement.after(collapse2.rootElement);
                collapse2.rootElement.after(collapse3.rootElement);
                //collapse.horizontal = true;
                collapse.targetElements = "collapseWidthExample1";
                collapse2.targetElements = "collapseWidthExample2";
                collapse3.targetElements =["collapseWidthExample1", "collapseWidthExample2"];
                collapse.parent = "#exampleParent";
                collapse2.parent = "#exampleParent";

            })
    }

}