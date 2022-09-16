import { Mrbr_IO_File } from "../io/File";
import { MrbrBase } from "../system/MrbrBase"; //exclude
import { Mrbr_UI_Bootstrap_Forms_Dialog } from "../ui/bootstrap/Forms/Dialog";
import { Mrbr_UI_Bootstrap_Forms_UrlDialog } from "../ui/bootstrap/Forms/UrlDialog";
import { Mrbr_UI_Controls_Desktop } from "../ui/controls/desktop";

export class Mrbr_Tests_Application {
    container = null
    desktop: Mrbr_UI_Controls_Desktop
    constructor() {
        this.desktop = new Mrbr_UI_Controls_Desktop("desktop");
        MrbrBase.mrbrInstance.loadManifest(Mrbr_IO_File.component(Mrbr_UI_Bootstrap_Forms_UrlDialog))
            .then(async _ => {
                let form = new Mrbr_UI_Bootstrap_Forms_UrlDialog(
                    "newDialog1");
                form.parentElement = this.desktop.windowContainer;
                form.resizable = true;
                form.draggable = true;
                form.title = "title1";
                form.maximiseBox = true;
                form.url = "https://en.wikipedia.org/wiki/Avocado";
                await form.initialise();
                setTimeout(() => {
                    form.draggable = false;
                    form.resizable = false;
                    form.title = "title2";
                    form.closeBox = true;
                    setTimeout(() => {
                        form.resizable = true;
                        form.draggable = true;
                        form.title = "title3";
                        form.fullScreenBox = true;
                        setTimeout(() => {
                            form.controlBox = false;
                            setTimeout(() => {
                                form.controlBox = true;
                            }, 500);

                        }, 500);

                    }, 500);
                }, 500);
                form.show();
            })
    }
}