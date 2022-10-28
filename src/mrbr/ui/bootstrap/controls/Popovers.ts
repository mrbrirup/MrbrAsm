import { MrbrBase } from "../../../system/MrbrBase";

export class Mrbr_UI_Bootstrap_Controls_Popovers {

    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Popovers { return Mrbr_UI_Bootstrap_Controls_Popovers; }

    //#region Public Static Enums
    public static elementTypes = {
        button: "button",
        link: "a"
    } as const;
    public static placements = {
        top: "top",
        right: "right",
        bottom: "bottom",
        left: "left"
    } as const;
    public static triggers = {
        click: "click",
        hover: "hover",
        focus: "focus"
    } as const;

    //#endregion Public Static Enums

    private static _popovers: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Popovers.Popover>>;
    public static get popovers(): Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Popovers.Popover>> {
        const cls = Mrbr_UI_Bootstrap_Controls_Popovers;
        (!cls._popovers) && (cls._popovers = new Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Popovers.Popover>>());
        return cls._popovers;
    }
    public static set popovers(value: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Popovers.Popover>>) { Mrbr_UI_Bootstrap_Controls_Popovers._popovers = value; }


    //#region Public Classes
    public static Popover = class Popover {
        name: string;
        title: string;
        content: string;
        elementType: typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes];
        element: HTMLElement;
        placement: typeof Mrbr_UI_Bootstrap_Controls_Popovers.placements[keyof typeof Mrbr_UI_Bootstrap_Controls_Popovers.placements] = Mrbr_UI_Bootstrap_Controls_Popovers.placements.top;
        dismissable: boolean = true;
        container: string | HTMLElement | false = false;
        customClass: string;
        dismissOnNextClick: boolean = false;
        disabled: boolean = false;
        allowList: string;
        animation: boolean = true;
        boundary: string = 'clippingParents';
        delay: number = 0;
        fallbackPlacements: typeof Mrbr_UI_Bootstrap_Controls_Popovers.placements[keyof typeof Mrbr_UI_Bootstrap_Controls_Popovers.placements][]
            = [
                Mrbr_UI_Bootstrap_Controls_Popovers.placements.top,
                Mrbr_UI_Bootstrap_Controls_Popovers.placements.right,
                Mrbr_UI_Bootstrap_Controls_Popovers.placements.bottom,
                Mrbr_UI_Bootstrap_Controls_Popovers.placements.left
            ];
        html: boolean = false;
        offset: number | number[] | string | Function;
        template: string;
        trigger: string =
            [
                Mrbr_UI_Bootstrap_Controls_Popovers.triggers.hover,
                Mrbr_UI_Bootstrap_Controls_Popovers.triggers.focus
            ].join(" ");
        sanitize: boolean = true;
        sanitizeFn: Function = null;
        selector: string | false = false;
        popperConfig: Function | object | null;
        constructor(name: string, title: string, content: string, element: typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes] | HTMLElement) {
            const self = this;
            self.title = title;
            self.content = content;
            self.name = name;
            if (element instanceof HTMLElement) {
                self.element = element;
                self.elementType = element.tagName.toLowerCase() as typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes];
            } else {
                self.elementType = element;
                self.element = document.createElement(element);
            }
        }
        initialise(...args) {
            const
                self = this;
            Mrbr_UI_Bootstrap_Controls_Popovers.popovers.set(self.name, self);
            return self;
        }

        mount(element: HTMLElement, position: "replace" | "prepend" | "before" | "after" | "append" = "append"): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Popovers.Popover> {
            const self = this;
            switch (position) {
                case "append":
                    element.appendChild(self.element);
                    break;
                case "before":
                    element.before(self.element);
                    break;
                case "after":
                    element.after(self.element);
                    break;
                case "prepend":
                    element.prepend(self.element);
                    break;
                case "replace":
                    element.replaceWith(self.element);
            }
            const
                bootstrap: any = MrbrBase.mrbrInstance.host.bootstrap,
                config = {};
            Reflect
                .ownKeys(self)
                .filter(key => key !== "element" && key !== "elementType" && key !== "name" && self[key])
                .forEach(key => config[key] = self[key]);
            (bootstrap) && requestAnimationFrame(_ => bootstrap.Popover.getOrCreateInstance(self.element, config));
            return self;
        }
    }
    public static addPopover(popover: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Popovers.Popover>) {
        Mrbr_UI_Bootstrap_Controls_Popovers.popovers.set(popover.name, popover);
    }
    public static createPopover(name: string, title: string, content: string, elementType: typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes[keyof typeof Mrbr_UI_Bootstrap_Controls_Popovers.elementTypes] | HTMLElement, ...args) {
        const popover = new Mrbr_UI_Bootstrap_Controls_Popovers.Popover(name, title, content, elementType);
        return popover.initialise(...args);
    }
    public static addPopoverToElement(name: string, element: HTMLElement, title: string, content: string, ...args) {
        const popover = new Mrbr_UI_Bootstrap_Controls_Popovers.Popover(name, title, content, element);
        return popover.initialise(...args);
    }
    //#endregion Public Classes
}