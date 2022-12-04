import { Mrbr_UI_Bootstrap_Controls_Modal } from "../ui/bootstrap/controls/Modal";
import { Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings } from "../ui/bootstrap/controls/ModalFullScreenSizings";

export class Mrbr_Tests_Application$Modal {

    constructor() {

        //         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        //   Launch demo modal
        // </button>


        const
            modal = new Mrbr_UI_Bootstrap_Controls_Modal("modal1"),
            oa = Object.assign;
        oa(modal, {
            titleText: "Modal title",
            verticalCenter: true,
            fade: true,
            scrollable: true,
            fullScreenSizing: Mrbr_UI_Bootstrap_Controls_ModalFullScreenSizings.md,
            closeButton: true,
            staticBackdrop: true

        })
        modal.initialise()
            .then(_ => {
                modal.defaultContainerElement.innerHTML = `<p>Modal body text goes here.</p>`;
                oa(document.body.appendChild(
                    oa(document.createElement("button"), {
                        innerHTML: "Show Modal",
                    })).dataset, {
                    bsToggle: "modal",
                    bsTarget: `#${modal.id}`
                });
                modal.onShow((event) => { console.log("onShow", event); });
                modal.onShown((event) => { console.log("onShown", event); });
                modal.onHide((event) => { console.log("onHide", event); });
                modal.onHidden((event) => { console.log("onHidden", event); });
                modal.onHidePrevented((event) => { console.log("onHidePrevented", event); });

                modal.mount(document.body);
            });

    }
}