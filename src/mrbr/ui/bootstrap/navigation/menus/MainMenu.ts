import { Mrbr_UI_Bootstrap_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Bootstrap_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "../../controls/ControlConfig";

export class Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu extends Mrbr_UI_Bootstrap_Controls_Control {
    _backdrop: HTMLElement;
    _menuId: string;
    constructor(rootElementName: string) {
        super(rootElementName);
        const self = this;
        //actionsAdd = Mrbr_UI_Bootstrap_Controls_ClassActions.Add,
        //mainMenu = self.createElement(rootElementName, "div"),
        //header = self.createElement("header", "h5"),
        //title = self.createElement("title", "div"),
        //button = self.createElement("button", "button"),
        //body = self.createElement("body", "div"),
        //  text = self.createElement("text", "p");
        //self.classes(mainMenu, actionsAdd, "offcanvas offcanvas-start text-bg-white");
        //self.classes(header, actionsAdd, "offcanvas-header")
        //self.classes(title, actionsAdd, "offcanvas-title")
        //self.classes(button, actionsAdd, "btn-close btn-close-dark")
        //self.classes(body, actionsAdd, "offcanvas-body")
        // self.attributes(mainMenu, {
        //     tabindex: "-1",
        //     id: self.menuId
        // });
        //mainMenu.setAttribute("aria-labelledby", "offcanvasDarkLabel")
        //self.attributes(title, { id: "offcanvasDarkLabel" });
        //self.attributes(button, { type: "button" })
        //button.ariaLabel = "Close";
        //        text.innerText = "Place offcanvas content here."
        //header.textContent = "OffCanvas"

        //header.appendChild(title)
        //header.appendChild(button)
        //mainMenu.appendChild(header);
        //body.appendChild(text)
        //mainMenu.appendChild(body)
        //self.dataset(button, { bsDismiss: "offcanvas" })




        self._menuId = Mrbr_UI_Bootstrap_Controls_Control.createId("mainMenu");
        const ctrlCfg = Mrbr_UI_Bootstrap_Controls_ControlConfig;
        self.createElement(new ctrlCfg(rootElementName, "div", {
            classes: "offcanvas offcanvas-start text-bg-white",
            attributes: { tabindex: "-1", id: self.menuId, "aria-labelledby": "offcanvasDarkLabel" },
            children: [
                new ctrlCfg("header", "h5",
                    {
                        classes: "offcanvas-header",
                        properties: { textContent: "OffCanvas" },
                        children: [
                            new ctrlCfg("title", "div", {
                                classes: "offcanvas-title",
                                id: "offcanvasDarkLabel"
                            }),
                            new ctrlCfg("button", "button", {
                                classes: "btn-close btn-close-dark",
                                attributes: { type: "button" },
                                properties: { ariaLabel: "Close" },
                                data: { bsDismiss: "offcanvas" }
                            })
                        ]
                    }),
                new ctrlCfg("body", "div", {
                    classes: "offcanvas-body",
                    children: [
                        new ctrlCfg("text", "p",
                            {
                                properties: { innerText: "Place offcanvas content here." }
                            })
                    ]
                })
            ]
        }))


        document.body.appendChild(self.rootElement);





    }
    get menuId(): string { return this._menuId }
    set menuId(value: string) { this._menuId = value; }
    show() {
        this._backdrop = document.createElement("div");
        this.classes(this._backdrop, Mrbr_UI_Bootstrap_Controls_ClassActions.Add, "modal-backdrop fade show");
        document.body.appendChild(this._backdrop);
    }
    hide() {
        this.classes(this._backdrop, Mrbr_UI_Bootstrap_Controls_ClassActions.Swap, ["show", "hide"]);
    }
    dispose() {
        document.body.removeChild(this._backdrop);
        this._backdrop = null;
    }
}