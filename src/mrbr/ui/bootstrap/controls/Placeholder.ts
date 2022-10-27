// import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
// import { Mrbr_UI_Controls_Control } from "../../controls/control";
// import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
type placeHolderType = typeof Mrbr_UI_Bootstrap_Controls_Placeholder.placeHolderTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Placeholder.placeHolderTypes]
type placeHolderWidthsType = typeof Mrbr_UI_Bootstrap_Controls_Placeholder.widths[keyof typeof Mrbr_UI_Bootstrap_Controls_Placeholder.widths]
type placeholderAnimationType = typeof Mrbr_UI_Bootstrap_Controls_Placeholder.animations[keyof typeof Mrbr_UI_Bootstrap_Controls_Placeholder.animations]
type elementType = typeof Mrbr_UI_Bootstrap_Controls_Placeholder.elementTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Placeholder.elementTypes]
type placeholderSizingsType = typeof Mrbr_UI_Bootstrap_Controls_Placeholder.sizings[keyof typeof Mrbr_UI_Bootstrap_Controls_Placeholder.sizings]
type placeholderClassType = Mrbr_UI_Bootstrap_Controls_Placeholder;
export class Mrbr_UI_Bootstrap_Controls_Placeholder {

    //#region Public Enums
    public static placeHolderTypes = {
        item: "item",
        parent: "parent"
    } as const;

    public static widths = {
        col1: "col-1",
        col2: "col-2",
        col3: "col-3",
        col4: "col-4",
        col5: "col-5",
        col6: "col-6",
        col7: "col-7",
        col8: "col-8",
        col9: "col-9",
        col10: "col-10",
        col11: "col-11",
        col12: "col-12",
        w25: "w-25",
        w50: "w-50",
        w75: "w-75",
        w100: "w-100"
    } as const;


    public static animations = {
        glow: "placeholder-glow",
        wave: "placeholder-wave",
        none: ""
    } as const;

    public static elementTypes = {
        span: "span",
        link: "a"
    } as const;

    public static sizings = {
        xs: "placeholder-xs",
        sm: "placeholder-sm",
        lg: "placeholder-lg",
        default: ""
    } as const;
    //#endregion Public Enums

    //#region Public Classes
    public static Placeholder = class {
        public name: string;
        public placeholderType: placeHolderType;
        public width: placeHolderWidthsType;
        public placeholderElement: HTMLElement;
        public animation: placeholderAnimationType;
        public elementType: elementType;
        public sizing: placeholderSizingsType = Mrbr_UI_Bootstrap_Controls_Placeholder.sizings.default
        constructor(name: string, placeholderType: placeHolderType) {
            this.name = name;
            this.placeholderType = placeholderType;
        }
        public dispose: () => void;
    }
    //#endregion Public Classes

    //#region Private Property Fields
    private static _placeholders: Map<string, placeholderClassType> = new Map<string, placeholderClassType>();
    //#endregion Private Property Fields
    //#region Public Static Properties
    public static get placeholders(): Map<string, placeholderClassType> { return Mrbr_UI_Bootstrap_Controls_Placeholder._placeholders; }
    //#endregion Public Static Properties
    //#region Public Static Methods
    public static createItem(name: string, width: placeHolderWidthsType, elementType: elementType, sizing?: placeholderSizingsType): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Placeholder.Placeholder> {
        const cls = Mrbr_UI_Bootstrap_Controls_Placeholder,
            placeholder = new cls.Placeholder(name, Mrbr_UI_Bootstrap_Controls_Placeholder.placeHolderTypes.item);
        placeholder.width = width;
        placeholder.elementType = elementType;
        let element = document.createElement(elementType);
        placeholder.placeholderElement = element;
        element.classList.add("placeholder", width);
        element.ariaHidden = "true";
        if (elementType === cls.elementTypes.link) { (<HTMLAnchorElement>element).href = "#"; element.tabIndex = -1; }
        if (sizing !== cls.sizings.default) { element.classList.add(sizing) }
        placeholder.dispose = () => { element.remove(); };
        cls.addPlaceholder(placeholder);
        return placeholder;
    }
    public static setParent(name: string, element: HTMLElement, animation: placeholderAnimationType): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Placeholder.Placeholder> {
        const cls = Mrbr_UI_Bootstrap_Controls_Placeholder,
            placeholder = new cls.Placeholder(name, Mrbr_UI_Bootstrap_Controls_Placeholder.placeHolderTypes.parent);
        placeholder.animation = animation;
        placeholder.placeholderElement = element;
        element.classList.add("placeholder-parent");
        if (animation !== cls.animations.none) { element.classList.add(animation) };
        element.ariaHidden = "true";
        placeholder.dispose = () => {
            element.classList.remove("placeholder-parent");
            if (animation !== cls.animations.none) { element.classList.remove(animation) };
            element.removeAttribute("aria=hidden");
        };
        cls.addPlaceholder(placeholder);
        return placeholder;
    }
    public static addPlaceholder(placeholder: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Placeholder.Placeholder>): typeof Mrbr_UI_Bootstrap_Controls_Placeholder {
        const self = Mrbr_UI_Bootstrap_Controls_Placeholder;
        self.placeholders.set(placeholder.name, placeholder);
        return self;
    }
    public static removePlaceholder(placeholder: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Placeholder.Placeholder>): typeof Mrbr_UI_Bootstrap_Controls_Placeholder {
        const self = Mrbr_UI_Bootstrap_Controls_Placeholder;
        placeholder.dispose();
        self.placeholders.delete(placeholder.name);
        return self;
    }
    //#endregion Public Static Methods
}