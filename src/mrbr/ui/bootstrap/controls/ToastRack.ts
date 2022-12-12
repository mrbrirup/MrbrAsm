import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_Toast } from "./Toast";
import { Mrbr_UI_Bootstrap_Controls_ToastPlacements } from "./ToastPlacements";


/**
 * ToastRack control, contains a collection of Toast controls
 * @date 12/12/2022 - 14:28:30
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ToastRack
 * @typedef {Mrbr_UI_Bootstrap_Controls_ToastRack}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Controls_ToastRack extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * The name of the ToastRack control
     * @date 12/12/2022 - 14:28:52
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOASTRACK_NAME: string = "toastrack";

    /**
     * The name of the ToastRack body element, default container for Toast controls
     * @date 12/12/2022 - 14:29:01
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOASTRACK_BODY_NAME: string = "toastrack_body";

    /**
     * The name of the ToastRack container element, contains ToastRack Control and aligns with top and bottom of the Mounted Contaner to match ToastPlacement
     * @date 12/12/2022 - 14:29:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOASTRACK_CONTAINER_NAME: string = "toastrack_container";


    /**
     * ToastRack control alias
     * @date 12/12/2022 - 14:30:35
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ToastRack}
     */
    get $ToastRack(): typeof Mrbr_UI_Bootstrap_Controls_ToastRack { return Mrbr_UI_Bootstrap_Controls_ToastRack; }

    /**
     * Toast control alias
     * @date 12/12/2022 - 14:30:42
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Toast}
     */
    get $Toast(): typeof Mrbr_UI_Bootstrap_Controls_Toast { return this.$bsc.Toast as typeof Mrbr_UI_Bootstrap_Controls_Toast; }

    /**
     * ToastPlacements enum alias
     * @date 12/12/2022 - 14:31:07
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ToastPlacements}
     */
    get $ToastPlacements(): typeof Mrbr_UI_Bootstrap_Controls_ToastPlacements { return this.$bsc.ToastPlacements as typeof Mrbr_UI_Bootstrap_Controls_ToastPlacements; }


    /**
     * Array of all Toasts, visible and hidden field
     * @date 12/12/2022 - 14:31:19
     *
     * @private
     * @type {Array<Mrbr_UI_Bootstrap_Controls_Toast>}
     */
    private _toasts: Array<Mrbr_UI_Bootstrap_Controls_Toast>;

    /**
     * Maximum number of Toasts to display at one time field
     * @date 12/12/2022 - 14:31:42
     *
     * @private
     * @type {number}
     */
    private _maxToasts: number = 5;

    /**
     * Placement of the ToastRack field
     * @date 12/12/2022 - 14:32:00
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_ToastPlacements}
     */
    private _placement: Mrbr_UI_Bootstrap_Controls_ToastPlacements;

    /**
     * Number of currently visible Toasts field
     * @date 12/12/2022 - 14:32:08
     *
     * @private
     * @type {number}
     */
    private visibleToastCount: number = 0;


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ToastRack.
     * @date 12/12/2022 - 14:32:27
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) { super(rootElementName); }

    /**
     * Array of all Toasts, visible and hidden property
     * @date 12/12/2022 - 14:32:31
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_Toast[]}
     */
    public get toasts(): Mrbr_UI_Bootstrap_Controls_Toast[] { return this._toasts ??= new Array<Mrbr_UI_Bootstrap_Controls_Toast>(); }

    /**
     * Maximum number of Toasts to display at one time property
     * @date 12/12/2022 - 14:32:40
     *
     * @public
     * @type {number}
     */
    public get maxToasts(): number { return this._maxToasts; }

    /**
     * Maximum number of Toasts to display at one time property
     */
    public set maxToasts(value: number) { this._maxToasts = value; }

    /**
     * Placement of the ToastRack property
     * @date 12/12/2022 - 14:32:53
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_ToastPlacements}
     */
    public get placement(): Mrbr_UI_Bootstrap_Controls_ToastPlacements { return this._placement ??= this.$ToastPlacements.bottomLeft; }

    /**
     * Placement of the ToastRack property
     */
    public set placement(value: Mrbr_UI_Bootstrap_Controls_ToastPlacements) {
        const self = this,
            defaultContainerElement = self.defaultContainerElement,
            root = self.rootElement;
        if (defaultContainerElement) {
            self.classes(defaultContainerElement, self.$clsActions.replace, [self.placement, value])
            self.classes(defaultContainerElement, this.$clsActions.add, "toast-container");
        }
        if (root) {
            self.classes(root, self.$clsActions.replace, [self.placement, value]);
        }
        self._placement = value;
    }

    /**
     * Initialises the ToastRack control, loadmanifest, set default config and set properties
     * @date 12/12/2022 - 14:33:16
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ToastRack>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ToastRack> {
        const self = this,
            toastRack = self.$ToastRack,
            controlName = toastRack[self.$mrbr.COMPONENT_NAME],
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ToastRack>(`${controlName}:initialise`);
        super.initialise(args)
            .then(async () => {
                await self.loadManifest(toastRack);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.getConfig(toastRack.TOASTRACK_CONTAINER_NAME)
                    .Children(
                        self.createElement(new self.$ctrlCfg(toastRack.TOASTRACK_NAME, "div", self.elementConfig.getConfig(toastRack.TOASTRACK_NAME))))
                ));
                const bodyElement = self.elements.get(toastRack.TOASTRACK_NAME).querySelector("div");
                bodyElement.id = toastRack.createId("toastRack");
                self.elements.set(toastRack.TOASTRACK_BODY_NAME, bodyElement);
                self.defaultContainerElementName = toastRack.TOASTRACK_BODY_NAME;
                self.placement = self.placement;
                initalisePromise.resolve(self);
            })
            .catch(error => initalisePromise.reject(error));
        return initalisePromise;
    }
    
    /**
     * Sets the default config for the ToastRack control
     * @date 12/12/2022 - 14:34:12
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ToastRack>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ToastRack> {
        const self = this,
            controlName = self.$ToastRack[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ToastRack>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(async _ => {
                self
                    .elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$ToastRack.TOASTRACK_CONTAINER_NAME, new self.$ctrlPrm()
                        .Classes("position-fixed w-100"))
                    .setIfNotExist(self.$ToastRack.TOASTRACK_NAME, new self.$ctrlPrm()
                        .Classes("position-relative")
                        .Template(`<div class="p-3">`)
                        .Aria({ "live": "polite", "atomic": "true" }));
                setDefaultConfigPromise.resolve(self);
            })
            .catch(error => setDefaultConfigPromise.reject(error));
        return setDefaultConfigPromise;
    }
    
    /**
     * Placement of the ToastRack property - fluent interface
     * @date 12/12/2022 - 14:34:25
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_ToastPlacements} placement
     * @returns {Mrbr_UI_Bootstrap_Controls_ToastRack}
     */
    public Placement(placement: Mrbr_UI_Bootstrap_Controls_ToastPlacements): Mrbr_UI_Bootstrap_Controls_ToastRack {
        this.placement = placement;
        return this;
    }
    
    /**
     * MaxToasts of the ToastRack property - fluent interface
     * @date 12/12/2022 - 14:34:38
     *
     * @public
     * @param {number} maxToasts
     * @returns {Mrbr_UI_Bootstrap_Controls_ToastRack}
     */
    public MaxToasts(maxToasts: number): Mrbr_UI_Bootstrap_Controls_ToastRack {
        this.maxToasts = maxToasts;
        return this;
    }
    
    /**
     * Adds a toast to the ToastRack control - fluent interface
     * @date 12/12/2022 - 14:34:49
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_Toast} toast
     * @returns {Mrbr_UI_Bootstrap_Controls_ToastRack}
     */
    public AddToast(toast: Mrbr_UI_Bootstrap_Controls_Toast): Mrbr_UI_Bootstrap_Controls_ToastRack {
        this.addToast(toast);
        return this;
    }
    
    /**
     * Adds a toast to the ToastRack control - fluent interface
     * @date 12/12/2022 - 14:35:00
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_Toast} toast
     */
    public addToast(toast: Mrbr_UI_Bootstrap_Controls_Toast): void {
        const self = this;
        self.toasts.push(toast);
        self.showNext();
    }
    
    /**
     * Shows the next toast in the queue, immediately if there is space or when a toast is hidden
     * @date 12/12/2022 - 14:35:13
     *
     * @private
     */
    private showNext(): void {
        const self = this;
        if (self.toasts.length > 0 && self.visibleToastCount < self._maxToasts) {
            let currentToast = self.toasts.shift();
            self.defaultContainerElement.appendChild(currentToast.rootElement);
            currentToast.onShow(() => { self.visibleToastCount++; })
            currentToast.onHidden(() => {
                self.visibleToastCount--;
                requestAnimationFrame(() => {
                    currentToast.dispose();
                    self.showNext();
                });
            })
            currentToast.show();
        }
    }
}