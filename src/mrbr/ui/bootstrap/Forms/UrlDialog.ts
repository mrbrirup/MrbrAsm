import { Mrbr_UI_Bootstrap_Controls_ControlConfig } from "../controls/ControlConfig";
import { Mrbr_UI_Bootstrap_Forms_Dialog } from "./Dialog";

export class Mrbr_UI_Bootstrap_Forms_UrlDialog extends Mrbr_UI_Bootstrap_Forms_Dialog {
    private _iFrame: HTMLElement;
    constructor(rootElementName: string, config) {
        super(rootElementName, config);
        const self = this;
        self.iFrame = <HTMLElement>this.createElement(new Mrbr_UI_Bootstrap_Controls_ControlConfig("iframeContainer", "iframe", {
            classes: ["w-100 h-100"],
            properties: { src: "https://en.wikipedia.org/wiki/Avocado" }
        }));
        this.contentContainer.appendChild(self.iFrame);
    }
    public get iFrame(): HTMLElement {
        return this._iFrame;
    }
    public set iFrame(value: HTMLElement) {
        this._iFrame = value;
    }
}