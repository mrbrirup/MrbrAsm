import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
import { Mrbr_UI_Bootstrap_Controls_Toast } from "./Toast";
import { Mrbr_UI_Bootstrap_Controls_Toast$Placements } from "./Toast$Placements";

export class Mrbr_UI_Bootstrap_Controls_ToastRack extends Mrbr_UI_Controls_Control {


    public static readonly TOASTRACK_BODY_NAME: string = "toastrack_body";

    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_ToastRack { return Mrbr_UI_Bootstrap_Controls_ToastRack; }

    private static _toastRack_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;

    public get toastRackConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._toastRack_config) && (
            self.$cls._toastRack_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
                .Classes("position-relative")
                .Template(`<div class="p-3">`)
                .Aria({ "live": "polite", "atomic": "true" }));

        return self.$cls._toastRack_config;
    }
    // <div aria-live="polite" aria-atomic="true" class="position-relative">
    // <!-- Position it: -->
    // <!-- - `.toast-container` for spacing between toasts -->
    // <!-- - `top-0` & `end-0` to position the toasts in the upper right corner -->
    // <!-- - `.p-3` to prevent the toasts from sticking to the edge of the container  -->
    // <div class="toast-container top-0 end-0 p-3">

    private _toasts: Mrbr_UI_Bootstrap_Controls_Toast[] = [];
    public get toasts(): Mrbr_UI_Bootstrap_Controls_Toast[] { return this._toasts; }

    private _maxToasts: number = 5;
    public get maxToasts(): number { return this._maxToasts; }
    public set maxToasts(value: number) { this._maxToasts = value; }
    private _placement: Mrbr_UI_Bootstrap_Controls_Toast$Placements;
    public get placement(): Mrbr_UI_Bootstrap_Controls_Toast$Placements { return this._placement; }
    public set placement(value: Mrbr_UI_Bootstrap_Controls_Toast$Placements) {
        const self = this;
        self._placement = value;
        self.defaultContainerElement && value && self.classes(<HTMLElement>self.defaultContainerElement, this.$clsActions.Add, [value, "toast-container"]);
    }


    constructor(rootElementName: string)
    constructor(rootElementName: string, placement: Mrbr_UI_Bootstrap_Controls_Toast$Placements, maxToasts: number)
    constructor(rootElementName: string, placement?: Mrbr_UI_Bootstrap_Controls_Toast$Placements, maxToasts?: number) {
        super(rootElementName);
        placement && (this._placement = placement);
        maxToasts && (this._maxToasts = maxToasts);
    }

    initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_ToastRack> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ToastRack>("Mrbr_UI_Bootstrap_Controls_ToastRack:initialise");


        super.initialise(args)
            .then(async () => {
                await self.$mrbr.loadManifest(self.$cls[MrbrBase.MRBR_COMPONENT_MANIFEST])
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.toastRackConfig))
                let bodyElement = self.rootElement.querySelector("div");
                bodyElement.id = self.$cls.createId("toastRack");
                self.elements[self.$cls.TOASTRACK_BODY_NAME] = bodyElement;
                self.defaultContainerElementName = self.$cls.TOASTRACK_BODY_NAME;
                self.placement = self._placement;
                initalisePromise.resolve(self);
            })
            .catch((error) => {
                initalisePromise.reject(error);
            });


        return initalisePromise;
    }
    private visibleToastCount: number = 0;
    public addToast(toast: Mrbr_UI_Bootstrap_Controls_Toast) {
        const self = this;
        self.toasts.push(toast);
        const showNext = () => {
            if (self.toasts.length > 0 && self.visibleToastCount < self._maxToasts) {
                let currentToast = self.toasts.shift();
                self.defaultContainerElement.appendChild(currentToast.rootElement);
                currentToast.onShow(() => { self.visibleToastCount++; })
                currentToast.onHidden(() => {
                    self.visibleToastCount--;
                    requestAnimationFrame(() => {
                        currentToast.dispose();
                        showNext();
                    });
                })
                currentToast.show();
            }
            console.log(self.visibleToastCount);
        }
        showNext();
    }
}