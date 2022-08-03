import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "../controls/ControlConfig";
import { Mrbr_UI_Bootstrap_Forms_Dialog } from "./Dialog";
type NavigationButtons = {
    name: string,
    src: string,
    order: number,
    eventType: string
}

export class Mrbr_UI_Bootstrap_Forms_UrlDialog extends Mrbr_UI_Bootstrap_Forms_Dialog {
    private _iFrame: HTMLElement;
    constructor(rootElementName: string, config) {
        super(rootElementName, config);
        const self = this,
            ctrlCfg = Mrbr_UI_Bootstrap_Controls_ControlConfig;

        let inputTextId = Mrbr_UI_Bootstrap_Forms_UrlDialog.createId("textBox");
        let iFrameId = Mrbr_UI_Bootstrap_Forms_UrlDialog.createId("iFrame");
        let browserPanel = <HTMLElement>this.createElement(new ctrlCfg("browserPanel", "div",
            {
                classes: "h-100 w-100",
                children: [
                    new ctrlCfg("navigationContainer", "div",
                        {
                            classes: "d-flex flex-row border-0 bg-dark text-light p-1",
                            children: [
                                new ctrlCfg("buttonBar", "div", {
                                    classes: ["btn-group p-0"],
                                    styles: {
                                        //height: "1rem"
                                    }
                                }),
                                new ctrlCfg("formGroupRow", "div", {
                                    classes: "input-group input-group-sm py-0 m-0 ps-3",
                                    children: [
                                        new ctrlCfg("span1", "span", {
                                            classes: "input-group-text py-0 m-0 ps-3",
                                            properties: { textContent: "URL: ", id: inputTextId },
                                            children: [

                                                new ctrlCfg("url", "input", {
                                                    properties: {
                                                        type: "text",
                                                        "aria-label": "sizing",
                                                        "aria-describedby": inputTextId
                                                    },
                                                    classes: "form-control"

                                                })



                                            ]
                                        })
                                    ]
                                }




                                    // {
                                    //     properties: {textContent : "URL:"},
                                    //     //styles: {width: "100px"},
                                    //     classes: "align-self-center w-100",
                                    //     children: [
                                    //         new ctrlCfg("url", "input",{
                                    //             properties: {type:"text"},
                                    //             classes: "p-0"
                                    //         })
                                    //     ]
                                    // }
                                ),
                            ]
                        }),
                    new ctrlCfg("iframeContainer", "iframe", {
                        classes: ["w-100 h-100"],
                        properties: {
                            src: "https://en.wikipedia.org/wiki/Avocado",
                            id: iFrameId
                        }
                    })

                ]
            }));

        let navigationButtons: Array<NavigationButtons> = [
            { name: "closeButton", src: "/htmlTest/images/forms/close.svg", eventType: "close", order: 1 },
            { name: "minButton", src: "/htmlTest/images/forms/minimise.svg", eventType: "minimise", order: 2 },
            { name: "maxButton", src: "/htmlTest/images/forms/maximise.svg", eventType: "maximise", order: 3 },
            { name: "fullScreenButton", src: "/htmlTest/images/forms/fullscreen.svg", eventType: "fullScreen", order: 4 }
        ]
        //self._controlBoxClickHandler = self.controlBoxClick.bind(self);
        navigationButtons.forEach(controlBoxControl => {
            let controlBoxControlElement = <HTMLElement>self.createElement(new ctrlCfg(controlBoxControl.name, "button",
                {
                    //styles: { width: "2em" },
                    classes: ["btn", "btn-transparent"],
                    //classes: ["p-0", "btn", "ms-1", "btn-light", "btn-secondary", "rounded-0"],
                    attributes: { type: "button" },
                    children: [
                        new ctrlCfg(`${controlBoxControl.name}_image`, "img",
                            {
                                attributes: {
                                    src: controlBoxControl.src
                                },
                                //classes: ["w-100", "h-100", "mrbr-invert-color"],
                                classes: ["mrbr-invert-color"],
                                data: {
                                    eventType: controlBoxControl.eventType.toString(),
                                    order: controlBoxControl.order.toString()
                                }

                            })
                    ]
                }));
            controlBoxControlElement.addEventListener("click", function () {
                const frames = window.frames; // or // var frames = window.parent.frames;
                for (let i = 0; i < frames.length; i++) {
                    // do something with each subframe as frames[i]
                    frames[0].document.body.style.background = "red";
                }
                console.log(window.frames)
                console.log("click", self.iFrame);
                (<HTMLIFrameElement>self.iFrame).contentWindow.history.back();
            })
            this.elements["buttonBar"].appendChild(controlBoxControlElement);

        })
        this.contentContainer.appendChild(browserPanel);
    }
    private _navigationBar: HTMLElement;
    _navigationButtons: HTMLElement

    public get navigationBar(): HTMLElement {
        return this._navigationBar;
    }
    public set navigationBar(value: HTMLElement) {
        this._navigationBar = value;
    }

    public get iFrame(): HTMLElement {
        return this.elements["iframeContainer"]
    }
    public set iFrame(value: HTMLElement) {
        this.elements["iframeContainer"] = value;
    }
}