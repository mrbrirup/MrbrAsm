import { Mrbr_UI_Bootstrap_Controls_Modal } from "../ui/bootstrap/controls/Modal";

export class Mrbr_Tests_Application$Modal {

    constructor() {

        //         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        //   Launch demo modal
        // </button>


        const modal = new Mrbr_UI_Bootstrap_Controls_Modal("modal1");
        modal.dialogTitleText = "Modal title";
        modal.initialise()
            .then(_ => {
                const button = document.createElement("button");
                button.innerHTML = "Click Me";
                button.dataset.bsToggle = "modal";
                button.dataset.bsTarget = `#${modal.id}`;
                document.body.appendChild(button);
                button.addEventListener("click", (e: Event) => {
                    //modal.show();
                });
                document.body.appendChild(modal.rootElement);
            });

    }
}