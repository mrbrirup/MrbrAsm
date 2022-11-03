import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Badge extends Mrbr_UI_Controls_Control {
    public static BADGE_NAME: string = "badge";
    public static CONTEXT_TEXT_NAME: string = "contextText";
    public static BADGE_TEXT_NAME: string = "badgeText";
    public static BADGE_POSITION = {
        LEFT: "top-50 start-0 translate-middle position-absolute",
        RIGHT: "top-50 start-100 translate-middle position-absolute",
        TOP: "top-0 start-50 translate-middle position-absolute",
        BOTTOM: "top-100 start-50 translate-middle position-absolute",
        TOP_LEFT: "top-0 start-0 translate-middle position-absolute",
        TOP_RIGHT: "top-0 start-100 translate-middle position-absolute",
        BOTTOM_LEFT: "top-100 start-0 translate-middle position-absolute",
        BOTTOM_RIGHT: "top-100 start-100 translate-middle position-absolute",
        NONE: ""
    }
    public static BADGE_SHAPE = {
        ROUNDED: "rounded-pill",
        CIRCLE: "p-2 border border-light rounded-circle",
        DEFAULT: "m-1"
    }


    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Badge { return Mrbr_UI_Bootstrap_Controls_Badge; }

    private _badgePosition: string = this.$cls.BADGE_POSITION.NONE;
    private _badgeShape: string = this.$cls.BADGE_SHAPE.DEFAULT;
    private _contextText: string = "";
    private _badgeText: string = "";
    private _badgeClasses: string[] = ["text-bg-primary"];
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = this.$cls.BADGE_TEXT_NAME;
    }
    public get badgeShape(): string {
        return this._badgeShape;
    }
    public set badgeShape(value: string) {
        const self = this;
        if (self.badgeShape === self.$cls.BADGE_SHAPE.DEFAULT) {
            self.classes(self.rootElement, self.$clsActions.Add, value);
        }
        else {
            if (self.badgeShape !== value) {
                self.classes(self.rootElement, self.$clsActions.Swap, [self.badgeShape, value]);
            }
        }
        this._badgeShape = value;
    }
    public get badgeClasses(): string[] {
        return this._badgeClasses;
    }
    public set badgeClasses(value: string | string[]) {
        if (!value) { return; }
        const self = this;
        self.classes(self.rootElement, self.$clsActions.Remove, self.badgeClasses);
        self.classes(self.rootElement, self.$clsActions.Add, value);
        self._badgeClasses = (typeof value === "string") ? value.split(" ").map(_class => _class.trim()) : value;
    }
    public get badgeText(): string {
        return this._badgeText;
    }
    public set badgeText(value: string) {
        const self = this;
        self.elements[self.$cls.BADGE_TEXT_NAME].textContent = value;
        this._badgeText = value;
    }
    public get contextText(): string {
        return this._contextText;
    }
    public set contextText(value: string) {
        if (!value) { return; }
        const self = this;
        if (!self.elements[self.$cls.CONTEXT_TEXT_NAME]) {
            self.createElement(new self.$ctrlCfg(self.$cls.CONTEXT_TEXT_NAME, "span", self.defaultConfig.get(self.$cls.CONTEXT_TEXT_NAME)));
            self.rootElement.appendChild(self.elements[self.$cls.CONTEXT_TEXT_NAME]);
        }
        self.elements[self.$cls.CONTEXT_TEXT_NAME].textContent = value;
        this._contextText = value;
    }
    public get badgePosition(): string {
        return this._badgePosition;
    }
    public set badgePosition(value: string) {
        const self = this;
        if (self.badgePosition === self.$cls.BADGE_POSITION.NONE) {
            self.classes(self.rootElement, self.$clsActions.Add, value);
        }
        else {

            let classes = Array.from(new Set(Object.keys(self.$cls.BADGE_POSITION).map(_key => self.$cls.BADGE_POSITION[_key].split(" ").map(_class => _class.trim())).flat(3)));
            self.classes(self.rootElement, self.$clsActions.Remove, classes);
            self.classes(self.rootElement, self.$clsActions.Add, value);

        }
        this._badgePosition = value;
    }
    private setParentAttributes(parent: HTMLElement) {
        const self = this;
        if (parent) {
            self.classes(parent, self.$clsActions.Add, "position-relative");
            self.classes(self.rootElement, self.$clsActions.Remove, "d-none");
        }
        else {
            requestAnimationFrame(_ => { self.setParentAttributes(self.rootElement.parentElement); })
        }
    }
    initialise(...args: any): Mrbr_System_Promise<any> {
        const self = this,
            initialisePromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Badge:initialise");
        super.initialise(args)
            .then(result => {
                self.$mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                    .then(_ => {

                        self.setDefaultConfig();
                        self.createElement(new self.$ctrlCfg(self.rootElementName, "span", self.defaultConfig.get(self.$cls.BADGE_NAME)
                            .Children([
                                new self.$ctrlCfg(self.$cls.BADGE_TEXT_NAME, "span", self.defaultConfig.get(self.$cls.BADGE_TEXT_NAME))
                            ]))
                        )
                        self.badgeText = self._badgeText;
                        self.contextText = self._contextText;
                        self.badgePosition = self._badgePosition;
                        self.badgeShape = self._badgeShape;
                        self.badgeClasses = self._badgeClasses;
                        self.classes(self.rootElement, self.$clsActions.Add, "d-none");
                        self.setParentAttributes(self.rootElement.parentElement);
                        initialisePromise.resolve(self);
                    })
            })
            .catch(error => {
                initialisePromise.reject(error);
            });
        return initialisePromise;
    }
    private logMutation(mutation: any) {
        console.log(mutation);
    }
    setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Badge> {
        const self = this;
        self.defaultConfig.add(self.$cls.BADGE_NAME, new self.$ctrlPrm().Classes(["badge"]));
        self.defaultConfig.add(self.$cls.BADGE_TEXT_NAME, new self.$ctrlPrm());
        self.defaultConfig.add(self.$cls.CONTEXT_TEXT_NAME, new self.$ctrlPrm().Classes(["visually-hidden"]));

        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Controls_Badge:setDefaultConfiguration", self);

    }
}