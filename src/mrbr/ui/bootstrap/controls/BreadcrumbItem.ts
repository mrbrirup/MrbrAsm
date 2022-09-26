import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_BreadcrumbItem {

    public static BREADCRUMBITEM_NAME: string = "breadcrumb_item";
    public static BREADCRUMBITEM_LINK_NAME: string = "breadcrumb_item";
    private _key: string;
    private _href: string = "";
    private _active: boolean = false;
    private _linkText: string = "";
    private _crumbText: string = "";

    constructor(key: string, link: string, crumbText: string) {
        this.key = key;
        this.href = link;
        this.crumbText = crumbText;
    }
    public get crumbText(): string {
        return this._crumbText;
    }
    public set crumbText(value: string) {
        this._crumbText = value;
    }
    public get key(): string {
        return this._key;
    }
    public set key(value: string) {
        this._key = value;
    }
    public get linkText(): string {
        return this._linkText;
    }
    public set linkText(value: string) {
        this._linkText = value;
    }
    public get href(): string {
        return this._href;
    }
    public set href(value: string) {
        this._href = value;
    }
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }
    // public set active(value: boolean) {
    //     const self = this,
    //         muibcbi = Mrbr_UI_Bootstrap_ControlsBreadcrumbItem,
    //         muccop = Mrbr_UI_Controls_ControlConfigOptionalParameters,
    //         ctrlCfg = Mrbr_UI_Controls_ControlConfig;
    //     if (self.rootElement) {
    //         if (!self.elements[muibcbi.BREADCRUMBITEM_LINK_NAME]) {
    //             self.createElement(new ctrlCfg(self.rootElementName, "a", self.configuration(muibcbi.BREADCRUMBITEM_LINK_NAME))
    //                 .Aria({ current: "page" }))
    //         }
    //     }
    //     this._active = value;
    // }
    // initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_ControlsBreadcrumbItem> {
    //     const self = this,
    //         muibcbi = Mrbr_UI_Bootstrap_ControlsBreadcrumbItem,
    //         ctrlCfg = Mrbr_UI_Controls_ControlConfig;

    //     super.initialise(args)
    //         .then(async result => {
    //             await self.setDefaultConfiguration();
    //             self.createElement(new ctrlCfg(self.rootElementName, "nav", self.configuration(muibcbi.BREADCRUMBITEM_NAME)));
    //         })
    //     return Mrbr_System_MrbrPromise.CreateResolvedMrbrPromise(self);
    // }
    // setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_ControlsBreadcrumbItem> {
    //     const self = this,
    //         muibcbi = Mrbr_UI_Bootstrap_ControlsBreadcrumbItem,
    //         muccop = Mrbr_UI_Controls_ControlConfigOptionalParameters
    //     self.defaultConfiguration.add(muibcbi.BREADCRUMBITEM_NAME, new muccop().Classes("breadcrumb-item"));
    //     self.defaultConfiguration.add(muibcbi.BREADCRUMBITEM_LINK_NAME, new muccop());
    //     return Mrbr_System_MrbrPromise.CreateResolvedMrbrPromise(self);
    // }
}