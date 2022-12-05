import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_INavbarControls } from "./INavbarControls";
import { Mrbr_UI_Bootstrap_Controls_Navbar } from "./Navbar";

export class Mrbr_UI_Bootstrap_Controls_NavbarBrand extends Mrbr_UI_Bootstrap_Controls_BootstrapControl implements Mrbr_UI_Bootstrap_Controls_INavbarControls {
    private static _navbar_brand_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    public static get NAVBAR_BRAND_CONFIG(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const cls = Mrbr_UI_Bootstrap_Controls_NavbarBrand;
        (!cls._navbar_brand_config) && (cls._navbar_brand_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("navbar-brand"))
        return Object.assign(new Mrbr_UI_Controls_ControlConfigOptionalParameters(), cls._navbar_brand_config);
    }

    private _active: boolean = false;
    private _disabled: boolean = false;
    private _imageElement: HTMLImageElement;
    private _imageUrl: string;
    private _name: string;
    private _rootElement: HTMLElement;
    private _text: string = "";
    private _textElement: HTMLElement;
    private _url: string = "#";

    constructor(name: string) {
        super(name);
        this.name = name;
    }

    public get active(): boolean { return this._active; }
    public set active(value: boolean) { this._active = value; }
    public get disabled(): boolean { return this._disabled; }
    public set disabled(value: boolean) {
        const self = this;
        self.rootElement && self.rootElement.classList.toggle("pe-none", value);
        self._disabled = value;

    }

    public get imageElement(): HTMLImageElement { return this._imageElement; }
    public set imageElement(value: HTMLImageElement) { this._imageElement = value; }
    public get imageUrl(): string { return this._imageUrl; }
    public set imageUrl(value: string) { this._imageUrl = value; }
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }
    public get rootElement(): HTMLElement { return this._rootElement; }
    public set rootElement(value: HTMLElement) { this._rootElement = value; }
    public get text(): string { return this._text; }
    public set text(value: string) { this._text = value; }
    public get textElement(): HTMLElement { return this._textElement; }
    public set textElement(value: HTMLElement) { this._textElement = value; }
    public get url(): string { return this._url; }
    public set url(value: string) { this._url = value; }
    public Url(value: string): Mrbr_UI_Bootstrap_Controls_NavbarBrand {
        this.url = value;
        return this;
    }
    public ImageUrl(value: string): Mrbr_UI_Bootstrap_Controls_NavbarBrand {
        this.imageUrl = value;
        return this;
    }
    public Text(value: string): Mrbr_UI_Bootstrap_Controls_NavbarBrand {
        this.text = value;
        return this;
    }
    public build(hostNavbar: Mrbr_UI_Bootstrap_Controls_Navbar, hostElement: HTMLElement = hostNavbar.defaultContainerElement): Mrbr_UI_Bootstrap_Controls_NavbarBrand {
        const
            brandCls = Mrbr_UI_Bootstrap_Controls_NavbarBrand,
            self = this;

        if (self.text) {
            self.textElement = document.createElement("span");
            hostNavbar.properties(self.textElement, { innerText: self.text });
        }
        if (self.imageUrl) {
            self.imageElement = document.createElement("img");
            hostNavbar.properties(self.imageElement, { src: self.imageUrl });
        }
        self.rootElement = <HTMLElement>hostNavbar.createElement(new hostNavbar.$ctrlCfg(self.name, "a", brandCls.NAVBAR_BRAND_CONFIG
            .Properties({ href: self.url })
            .Children([self.textElement, self.imageElement].filter(element => !!element))));
        hostNavbar.navbarControls.set(self.name, self);
        self.disabled = self._disabled;
        hostElement.appendChild(self.rootElement);
        return self;
    }
}