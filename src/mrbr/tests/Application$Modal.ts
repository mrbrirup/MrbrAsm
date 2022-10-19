import { Mrbr_UI_Bootstrap_Controls_Modal } from "../ui/bootstrap/controls/Modal";

export class Mrbr_Tests_Application$Modal {

    constructor() {

        //         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        //   Launch demo modal
        // </button>


        const modal = new Mrbr_UI_Bootstrap_Controls_Modal("modal1");
        modal.dialogTitleText = "Modal title";
        modal.verticalCenter = true;
        modal.fade = true;
        modal.scrollable = true;
        modal.fullScreenSizing = Mrbr_UI_Bootstrap_Controls_Modal.fullScreenSizings.md;
        modal.initialise()
            .then(_ => {
                const button = document.createElement("button");
                button.innerHTML = "Click Me";
                button.dataset.bsToggle = "modal";
                button.dataset.bsTarget = `#${modal.id}`;
                modal.defaultContainerElement.innerHTML = `<p>Modal body text goes here.</p>`;
                document.body.appendChild(button);
                modal.addEventListener(Mrbr_UI_Bootstrap_Controls_Modal.MODAL_SHOWING_EVENT, (e: Event) => {
                    console.log("modal_showing", e);
                });
                modal.addEventListener(Mrbr_UI_Bootstrap_Controls_Modal.MODAL_SHOWN_EVENT, (e: Event) => {
                    console.log("modal_shown", e);
                });
                modal.addEventListener(Mrbr_UI_Bootstrap_Controls_Modal.MODAL_HIDING_EVENT, (e: Event) => {
                    console.log("modal_hiding", e);
                });
                modal.addEventListener(Mrbr_UI_Bootstrap_Controls_Modal.MODAL_HIDDEN_EVENT, (e: Event) => {
                    console.log("modal_hidden", e);
                });
                document.body.appendChild(modal.rootElement);
            });

    }
}