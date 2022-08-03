import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "../controls/ControlConfig";
import { Mrbr_UI_Bootstrap_Forms_Dialog } from "./Dialog";
type NavigationButtons = {
    name: string,
    src: string,
    order: number,
    eventType: string
}

export class Mrbr_UI_Bootstrap_Forms_UrlDialog extends Mrbr_UI_Bootstrap_Forms_Dialog {
    _history: Array<string> = [];
    constructor(rootElementName: string, config) {
        super(rootElementName, config);
        const self = this,
            ctrlCfg = Mrbr_UI_Bootstrap_Controls_ControlConfig;

        let inputTextId = Mrbr_UI_Bootstrap_Forms_UrlDialog.createId("textBox");
        let iFrameId = Mrbr_UI_Bootstrap_Forms_UrlDialog.createId("iFrame");
        let navigationButtons = ([
            { name: "navigationBack", src: "/htmlTest/images/forms/close.svg", eventType: "back", order: 1 },
            { name: "navigationForwards", src: "/htmlTest/images/forms/minimise.svg", eventType: "forwards", order: 2 },
            { name: "navigationGo", src: "/htmlTest/images/forms/maximise.svg", eventType: "go", order: 3 }
        ] as Array<NavigationButtons>)
            .map(navigationButton => {
                let navigationButtonElement = <HTMLElement>self.createElement(new ctrlCfg(navigationButton.name, "button",
                    {
                        classes: ["btn", "btn-transparent border-1"],
                        attributes: { type: "button" },
                        children: [
                            new ctrlCfg(`${navigationButton.name}_image`, "img",
                                {
                                    attributes: {
                                        src: navigationButton.src
                                    },
                                    classes: ["mrbr-invert-color"],
                                    data: {
                                        eventType: navigationButton.eventType.toString(),
                                        order: navigationButton.order.toString()
                                    }

                                })
                        ]
                    }));
                return navigationButtonElement;                    
            })




        let browserPanel = <HTMLElement>this.createElement(new ctrlCfg("browserPanel", "div",
            {
                classes: "h-100 w-100",
                children: [
                    new ctrlCfg("navigationContainer", "div",
                        {
                            classes: "/*d-flex*/ flex-row border-0 bg-dark text-light p-1",
                            children: [
                                new ctrlCfg("buttonBar", "div", {
                                    classes: ["btn-group p-0"],
                                    children: [...navigationButtons]
                                }),
                                new ctrlCfg("formGroupRow", "div", {
                                    classes: "input-group input-group-sm py-0 my-0 ms-2 ps-3",
                                    children: [
                                        new ctrlCfg("span1", "span", {
                                            classes: "input-group-text py-0 my-0 w-100 px-1",
                                            properties: { textContent: "URL: ", id: inputTextId },
                                            children: [

                                                new ctrlCfg("url", "input", {
                                                    properties: {
                                                        type: "text",
                                                        "aria-label": "sizing",
                                                        "aria-describedby": inputTextId
                                                    },
                                                    classes: "form-control ms-2"

                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                    new ctrlCfg("iframeContainer", "iframe", {
                        classes: ["w-100 h-100"],
                        properties: {
                            id: iFrameId
                        }
                    })

                ]
            }));

        self.navigationBar.style.display = "none";
        self._iframe_loadStart_handler = self.iFrameLoadStart.bind(self);
        self._iframe_popstate_handler = self.iFramePopState.bind(self);
        self._iframe_load_handler = self.iFrameLoaded(self);

        this.contentContainer.appendChild(browserPanel);
        // self.iFrame.contentWindow.addEventListener("loadstart",self._iframe_loadStart_handler )
        // self.iFrame.contentWindow.addEventListener("message",self._iframe_loadStart_handler )
        // self.iFrame.contentDocument.body.addEventListener("beforeunload",self._iframe_loadStart_handler )
        // self.iFrame.contentDocument.body.addEventListener("message",self._iframe_loadStart_handler )
        // window.document.addEventListener("load", self._iframe_load_handler)
        // self.iFrame.contentDocument.body.addEventListener("popstate",self._iframe_popstate_handler )
        // //self._controlBoxClickHandler = self.controlBoxClick.bind(self);

        self.iFrame.src = "https://en.wikipedia.org/wiki/Avocado";        
    }
    _iframe_loadStart_handler;
    _iframe_load_handler;
    _iframe_popstate_handler;
    iFrameLoadStart(event) {
        console.log("loadStart:", "event")
    }
    iFramePopState(event) {
        console.log("popstate: ", "event")
    }
    iFrameLoaded(event) {
        console.log("loaded: ", "event")
    }
    private _navigationBar: HTMLElement;
    _navigationButtons: HTMLElement

    public get navigationBar(): HTMLElement {
        return this.elements["navigationContainer"];
    }
    public set navigationBar(value: HTMLElement) {
        this._navigationBar = value;
    }

    public get iFrame(): HTMLIFrameElement {
        return this.elements["iframeContainer"]
    }
    public set iFrame(value: HTMLIFrameElement) {
        this.elements["iframeContainer"] = value;
    }
}