import { Mrbr_UI_Controls_ClassActions } from "../../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../../controls/Control";
import { Mrbr_UI_Controls_ControlConfig } from "../../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Navigation_Menus_MainMenu extends Mrbr_UI_Controls_Control {
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
        self._menuId = Mrbr_UI_Controls_Control.createId("mainMenu");
        const ctrlCfg = Mrbr_UI_Controls_ControlConfig;
        self.createElement(new ctrlCfg(rootElementName, "div",
            new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes("offcanvas offcanvas-start text-bg-white")
                .Attributes({ tabindex: "-1", id: self.menuId, "aria-labelledby": "offcanvasDarkLabel" })
                .Children([
                    new ctrlCfg("header", "h5",
                        new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                            .Classes("offcanvas-header")
                            .Properties({ textContent: "OffCanvas" })
                            .Children([
                                new ctrlCfg("title", "div",
                                    new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                                        .Classes("offcanvas-title")
                                        .Id("offcanvasDarkLabel")
                                ),
                                new ctrlCfg("button", "button",
                                    new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                                        .Classes("btn-close btn-close-dark")
                                        .Attributes({ type: "button" })
                                        .Properties({ ariaLabel: "Close" })
                                        .Data({ bsDismiss: "offcanvas" })
                                )
                            ])
                    ),
                    new ctrlCfg("body", "div",
                        new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                            .Classes("offcanvas-body")
                            .Children([
                                new ctrlCfg("text", "p",
                                    new Mrbr_UI_Controls_ControlConfigOptionalParameters()

                                        .Properties({ innerText: "Place offcanvas content here." })
                                )
                            ])
                    )
                ])
        )
        )
        document.body.appendChild(self.rootElement);
    }
    get menuId(): string { return this._menuId }
    set menuId(value: string) { this._menuId = value; }
    show() {
        this._backdrop = document.createElement("div");
        this.classes(this._backdrop, Mrbr_UI_Controls_ClassActions.add, "modal-backdrop fade show");
        document.body.appendChild(this._backdrop);
    }
    hide() {
        this.classes(this._backdrop, Mrbr_UI_Controls_ClassActions.swap, ["show", "hide"]);
    }
    dispose() {
        document.body.removeChild(this._backdrop);
        this._backdrop = null;
    }
}