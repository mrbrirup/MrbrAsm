import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Spinners {

    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Spinners { return Mrbr_UI_Bootstrap_Controls_Spinners; }


    //#region Private Static Property Fields
    private static _spinners: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Spinners.Spinner>> = new Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Spinners.Spinner>>();
    //#endregion Private Static Property Fields

    public static get spinners(): Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Spinners.Spinner>> {
        return Mrbr_UI_Bootstrap_Controls_Spinners._spinners;
    }

    //#region Public Enums
    public static types = {
        border: "spinner-border",
        grow: "spinner-grow"
    } as const
    public static sizes = {
        sm: "-sm",
        default: ""
    } as const
    //endregion Public Enums
    //#region Public Classes
    public static Spinner = class {
        public name: string;
        public element: HTMLElement;
        public spinnerType: typeof Mrbr_UI_Bootstrap_Controls_Spinners.types[keyof typeof Mrbr_UI_Bootstrap_Controls_Spinners.types];
        public text: string;
        public set spinnerSize(value: typeof Mrbr_UI_Bootstrap_Controls_Spinners.sizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Spinners.sizes]) {
            const self = this,
                cls = Mrbr_UI_Bootstrap_Controls_Spinners;
            let spinnerSize = this.spinnerType;
            if (value === cls.sizes.sm) {
                spinnerSize += value;
            }

            let sizes = Reflect.ownKeys(cls.sizes).filter(x => x !== "default"),
                types = Reflect.ownKeys(cls.types);
            sizes.forEach(sizeKey => {
                types.forEach(typeKey => {
                    self.element.classList.toggle(`${cls.types[typeKey]}${cls.sizes[sizeKey]}`, false);
                });
            })
            self.element.classList.toggle(spinnerSize, true);
        }
        public get spinnerSize() {
            const self = this,
                cls = Mrbr_UI_Bootstrap_Controls_Spinners;
            let size = cls.sizes.default,
                sizes = Reflect.ownKeys(cls.sizes).filter(x => x !== "default"),
                types = Reflect.ownKeys(cls.types);
            sizes.forEach(sizeKey => {
                types.forEach(typeKey => {
                    if (self.element.classList.contains(`${cls.types[typeKey]}${cls.sizes[sizeKey]}`)) {
                        size = cls.sizes[sizeKey];
                    }
                });
            })
            return size;
        }
        constructor(name: string, spinnerType: typeof Mrbr_UI_Bootstrap_Controls_Spinners.types[keyof typeof Mrbr_UI_Bootstrap_Controls_Spinners.types], text: string) {
            const self = this;
            self.name = name;
            self.spinnerType = spinnerType;
            self.text = text && text.trim() || "";
            self.element = document.createElement("div");
            self.element.classList.add(self.spinnerType);
            self.element.setAttribute("role", "status");
            self.element.innerHTML = `<span class="visually-hidden">${self.text}</span>`;
            self.spinnerSize = self.spinnerSize;
        }
        dispose() {
            const self = this;
            self.element.remove();
        }
    }
    //#endregion Public Classes
    //#region Public Static Methods
    public static addSpinner(name: string, spinnerType: typeof Mrbr_UI_Bootstrap_Controls_Spinners.types[keyof typeof Mrbr_UI_Bootstrap_Controls_Spinners.types], text: string) {
        const self = this,
            cls = Mrbr_UI_Bootstrap_Controls_Spinners;
        let spinner = new cls.Spinner(name, spinnerType, text);
        cls.spinners.set(name, spinner);
        return spinner;
    }
    public static getSpinner(name: string) {
        const self = this,
            cls = Mrbr_UI_Bootstrap_Controls_Spinners;
        return cls.spinners.get(name);
    }
    public static removeSpinner(name: string) {
        const self = this,
            cls = Mrbr_UI_Bootstrap_Controls_Spinners;
        let spinner = cls.getSpinner(name);
        if (spinner) {
            spinner.dispose();
        }
        cls.spinners.delete(name);
    }
    //#endregion Public Static Methods
}