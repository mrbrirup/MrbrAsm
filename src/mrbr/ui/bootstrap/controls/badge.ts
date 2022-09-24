import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
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

    private _badgePosition: string = Mrbr_UI_Bootstrap_Controls_Badge.BADGE_POSITION.NONE;
    private _badgeShape: string = Mrbr_UI_Bootstrap_Controls_Badge.BADGE_SHAPE.DEFAULT;
    private _contextText: string = "";
    private _badgeText: string = "";
    private _badgeClasses: string[] = ["text-bg-primary"];
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = Mrbr_UI_Bootstrap_Controls_Badge.BADGE_TEXT_NAME;
    }
    public get badgeShape(): string {
        return this._badgeShape;
    }
    public set badgeShape(value: string) {
        const self = this,
            mubcb = Mrbr_UI_Bootstrap_Controls_Badge,
            mucca = Mrbr_UI_Controls_ClassActions;
        if (self.badgeShape === mubcb.BADGE_SHAPE.DEFAULT) {
            self.classes(self.rootElement, mucca.Add, value);
        }
        else {
            if (self.badgeShape !== value) {
                self.classes(self.rootElement, mucca.Swap, [self.badgeShape, value]);
            }
        }
        this._badgeShape = value;
    }
    public get badgeClasses(): string[] {
        return this._badgeClasses;
    }
    public set badgeClasses(value: string | string[]) {
        if (!value) { return; }
        const self = this,
            mucca = Mrbr_UI_Controls_ClassActions;
        self.classes(self.rootElement, mucca.Remove, self.badgeClasses);
        self.classes(self.rootElement, mucca.Add, value);
        self._badgeClasses = (typeof value === "string") ? value.split(" ").map(_class => _class.trim()) : value;
    }
    public get badgeText(): string {
        return this._badgeText;
    }
    public set badgeText(value: string) {
        const self = this,
            mubcb = Mrbr_UI_Bootstrap_Controls_Badge;
        self.elements[mubcb.BADGE_TEXT_NAME].textContent = value;
        this._badgeText = value;
    }
    public get contextText(): string {
        return this._contextText;
    }
    public set contextText(value: string) {
        if (!value) { return; }
        const self = this,
            mubcb = Mrbr_UI_Bootstrap_Controls_Badge;
        if (!self.elements[mubcb.CONTEXT_TEXT_NAME]) {
            self.createElement(new Mrbr_UI_Controls_ControlConfig(mubcb.CONTEXT_TEXT_NAME, "span", self.defaultConfiguration.get(mubcb.CONTEXT_TEXT_NAME)));
            self.rootElement.appendChild(self.elements[mubcb.CONTEXT_TEXT_NAME]);
        }
        self.elements[mubcb.CONTEXT_TEXT_NAME].textContent = value;
        this._contextText = value;
    }
    public get badgePosition(): string {
        return this._badgePosition;
    }
    public set badgePosition(value: string) {
        const self = this,
            mubcb = Mrbr_UI_Bootstrap_Controls_Badge,
            mucca = Mrbr_UI_Controls_ClassActions;
        if (self.badgePosition === mubcb.BADGE_POSITION.NONE) {
            self.classes(self.rootElement, mucca.Add, value);
        }
        else {

            let classes = Array.from(new Set(Object.keys(mubcb.BADGE_POSITION).map(_key => mubcb.BADGE_POSITION[_key].split(" ").map(_class => _class.trim())).flat(3)));
            self.classes(self.rootElement, mucca.Remove, classes);
            self.classes(self.rootElement, mucca.Add, value);

        }
        this._badgePosition = value;
    }
    private setParentAttributes(parent: HTMLElement) {
        const self = this,
            mucca = Mrbr_UI_Controls_ClassActions;
        if (parent) {
            self.classes(parent, mucca.Add, "position-relative");
            self.classes(self.rootElement, mucca.Remove, "d-none");
        }
        else {
            requestAnimationFrame(_ => { self.setParentAttributes(self.rootElement.parentElement); })
        }
    }
    initialise(...args: any): Mrbr_System_MrbrPromise<any> {
        const self = this,
            ctrlCfg = Mrbr_UI_Controls_ControlConfig,
            mucca = Mrbr_UI_Controls_ClassActions,
            mubcb = Mrbr_UI_Bootstrap_Controls_Badge,
            initialisePromise = Mrbr_System_MrbrPromise.CreateMrbrPromise("Mrbr_UI_Bootstrap_Controls_Badge:initialise");
        super.initialise(args)
            .then(result => {
                self.setDefaultConfiguration();
                self.createElement(new ctrlCfg(self.rootElementName, "span", self.defaultConfiguration.get(mubcb.BADGE_NAME))
                    .Children([
                        new ctrlCfg(mubcb.BADGE_TEXT_NAME, "span", self.defaultConfiguration.get(mubcb.BADGE_TEXT_NAME))
                    ])
                )
                self.badgeText = self._badgeText;
                self.contextText = self._contextText;
                self.badgePosition = self._badgePosition;
                self.badgeShape = self._badgeShape;
                self.badgeClasses = self._badgeClasses;
                self.classes(self.rootElement, mucca.Add, "d-none");
                self.setParentAttributes(self.rootElement.parentElement);
                initialisePromise.resolve(self);
            })
            .catch(error => {
                initialisePromise.reject(error);
            });
        return initialisePromise;
    }
    private logMutation(mutation: any) {
        console.log(mutation);
    }
    setDefaultConfiguration(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_Badge> {
        const self = this,
            mubcb = Mrbr_UI_Bootstrap_Controls_Badge,
            muccop = Mrbr_UI_Controls_ControlConfigOptionalParameters;
        self.defaultConfiguration.add(mubcb.BADGE_NAME, new muccop().Classes(["badge"]));
        self.defaultConfiguration.add(mubcb.BADGE_TEXT_NAME, new muccop());
        self.defaultConfiguration.add(mubcb.CONTEXT_TEXT_NAME, new muccop().Classes(["visually-hidden"]));


        return Mrbr_System_MrbrPromise.CreateResolvedMrbrPromise(this);

    }
}