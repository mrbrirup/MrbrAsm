import { Mrbr_UI_Bootstrap_Controls_ListGroup } from "../ui/bootstrap/controls/ListGroup";
import { Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles } from "../ui/bootstrap/controls/ListGroup$ContextualStyles";
import { Mrbr_UI_Bootstrap_Controls_ListGroupEvent } from "../ui/bootstrap/controls/ListGroupEvent";
import { Mrbr_UI_Bootstrap_Controls_ListGroupEventData } from "../ui/bootstrap/controls/ListGroupEventData";

export class Mrbr_Tests_Application$ListGroup {

    constructor() {
        const listGroup = new Mrbr_UI_Bootstrap_Controls_ListGroup("listGroup");
        const radioGroup = new Mrbr_UI_Bootstrap_Controls_ListGroup("radioGroup");
        Promise.all([listGroup.initialise(), radioGroup.initialise()])
            .then(_ => {
                listGroup.numberedList = true;
                const listGroupItem = listGroup.addItem("listGroupItem", "d ListGroupItem", true),
                    listGroupItem2 = listGroup.addItem("listGroupItem2", "b ListGroupItem2", true),
                    listGroupItem3 = listGroup.addItem("listGroupItem3", "c ListGroupItem3"),
                    listGroupItem4 = listGroup.addItem("listGroupItem4", "a ListGroupItem4", true),
                    listGroupItem5 = listGroup.addItem("listGroupItem5", "e ListGroupItem5", true),
                    listGroupItem6 = listGroup.addBadgedItem("listGroupItem6", "f ListGroupItem6", "Some Badge Text", true),
                    listGroupItem7 = listGroup.addCheckBoxItem("listGroupItem7", "g ListGroupItem7", false, true),
                    listGroupItem8 = radioGroup.addRadioItem("listGroupItem8", "h ListGroupItem8", false, true),
                    listGroupItem9 = radioGroup.addRadioItem("listGroupItem9", "i ListGroupItem9", true, true),
                    listGroupItem10 = radioGroup.addRadioItem("listGroupItem10", "j ListGroupItem10", false, true);

                //console.log(listGroupItem6);
                listGroup.customContentContainerItem(listGroupItem5, true, "listGroupItem5Content");
                //listGroup.horizontal = Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles.md;
                //listGroup.equalWidth = true;
                listGroupItem5.innerHTML = `    <div class="ms-2 me-auto">
                <div class="fw-bold">Subheading</div>
                Content for list item
              </div>
              <span class="badge bg-primary rounded-pill">14</span>`
                // listGroupItem.onclick = _ => { alert("ListGroupItem clicked"); };
                // listGroupItem2.onclick = _ => { alert("ListGroupItem2 clicked"); };
                // listGroupItem3.onclick = _ => { alert("ListGroupItem3 clicked"); };
                // listGroupItem4.onclick = _ => { alert("ListGroupItem4 clicked"); };


                listGroup.onClick((e: Mrbr_UI_Bootstrap_Controls_ListGroupEvent) => {
                    listGroup.setActiveItem(e.data.id);
                    //console.log(e);
                })


                listGroup.setItemContextStyle(listGroupItem, Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles.danger);
                listGroup.mount("mrbr-test-list-group")
                radioGroup.mount("mrbr-test-radio-group")
                // document.body.appendChild(listGroup.rootElement);
                // document.body.appendChild(radioGroup.rootElement);




                setTimeout(() => {
                    listGroup.setActiveItem("listGroupItem2");
                    listGroup.disableItem("listGroupItem3");
                }, 2000);

                setTimeout(() => {
                    listGroup.setActiveItem(listGroupItem3);
                    listGroup.enableItem(listGroupItem3);
                    listGroup.disableItem(listGroupItem2);
                }, 5000);

                setTimeout(() => {
                    console.log("removed: ", listGroup.removeItem(listGroupItem2));
                    //listGroup.flush = true;
                }, 10000);
            })
            .catch(error => {
                console.error(error);
            });
        ;
    }
}