import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";

export class Mrbr_UI_Bootstrap_Controls_Collapse extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Constants

    /**
     * Internal Toggle Control Name
     * @date 14/11/2022 - 09:04:52
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOGGLE_NAME: string = "collapse_toggle";

    /**
     * Internal Toggle Target Name
     * @date 14/11/2022 - 09:05:13
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TARGET_NAME: string = "collapse_target";


    /**
     * Click Event Name
     * @date 14/11/2022 - 15:53:53
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CLICK_EVENT_NAME: string = "click";

    /**
     * Hide Collapse Event Name
     * @date 14/11/2022 - 09:05:26
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly HIDE_COLLAPSE_EVENT_NAME: string = "hide.bs.collapse";

    /**
     * Hidden Collapse Event Name
     * @date 14/11/2022 - 09:05:56
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly HIDDEN_COLLAPSE_EVENT_NAME: string = "hidden.bs.collapse";

    /**
     * Show Collapse Event Name
     * @date 14/11/2022 - 09:06:12
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SHOW_COLLAPSE_EVENT_NAME: string = "show.bs.collapse";

    /**
     * Shown Collapse Event Name
     * @date 14/11/2022 - 09:06:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly SHOWN_COLLAPSE_EVENT_NAME: string = "shown.bs.collapse";
    //#endregion Public Static Constants
    //#region Private Fields

    /**
     * Collpased State
     * @date 14/11/2022 - 09:06:41
     *
     * @private
     * @type {boolean}
     */
    private _collapsed: boolean = false;

    /**
     * Bootstrap Collapse Instance
     * @date 14/11/2022 - 09:06:55
     *
     * @private
     * @type {Map<string, any>}
     */
    private _bootstrapCollapse: Map<string, any> = new Map<string, any>();

    /**
     * Collapse Parent
     * @date 14/11/2022 - 09:07:12
     *
     * @private
     * @type {string}
     */
    private _parent: string;

    /**
     * Use Horizontal Collapse instead of Vertical
     * @date 14/11/2022 - 09:07:24
     *
     * @private
     * @type {boolean}
     */
    private _horizontal: boolean = false;

    /**
     * Collapse Target Elements
     * @date 14/11/2022 - 09:07:56
     *
     * @private
     * @type {Array<HTMLElement>}
     */
    private _targetElements: Array<HTMLElement>;

    /**
     * Button Context Style Class
     * @date 14/11/2022 - 09:08:09
     *
     * @private
     * @type {string}
     */
    private _buttonStyleClass: string = "btn-primary";

    /**
     * Button Text
     * @date 14/11/2022 - 09:08:27
     *
     * @private
     * @type {string}
     */
    private _buttonText: string = "Toggle";

    /**
     * Collapsed Text
     * @date 14/11/2022 - 09:08:37
     *
     * @private
     * @type {string}
     */
    private _collapsedText: string;

    /**
     * Expanded Text
     * @date 14/11/2022 - 09:08:53
     *
     * @private
     * @type {string}
     */
    private _expandedText: string;

    /**
     * Start with Collapsed State Open or Closed
     * @date 14/11/2022 - 09:09:03
     *
     * @private
     * @type {boolean}
     */
    private _startOpen: boolean = true;
    //#endregion Private Fields

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Collapse.
     * @date 14/11/2022 - 09:09:23
     *
     * @constructor
     * @param {(string | HTMLElement)} toggle toggle element or id of toggle element to use
     * @param {?(string | HTMLElement | Array<string> | Array<HTMLElement>)} [target]
     */
    constructor(toggle?: string | HTMLElement, target?: string | HTMLElement | Array<string> | Array<HTMLElement>) {
        super((toggle instanceof HTMLElement ? (toggle.id || (Mrbr_UI_Controls_Control.createId(Mrbr_UI_Bootstrap_Controls_Collapse.TOGGLE_NAME))) : toggle));
        (toggle instanceof HTMLElement) && (this.rootElement = toggle);
        if (!Array.isArray(target)) {
            if (target instanceof HTMLElement) { this._targetElements = [target]; }
            else if (typeof target === "string") { this._targetElements = [document.getElementById(target)]; }
        }
        else {
            !this._targetElements && (this._targetElements = []);
            target.forEach((_target) => {
                if (_target instanceof HTMLElement) { this._targetElements.push(_target); }
                else if (typeof _target === "string") { this._targetElements.push(document.getElementById(_target)); }
            });
        }
    }
    //#region Type Aliases
    get $cls() { return Mrbr_UI_Bootstrap_Controls_Collapse; }
    //#endregion Type Aliases
    //#region Public Properties

    /**
     * Start with Collapsed State Open or Closed
     * @date 14/11/2022 - 09:11:43
     *
     * @public
     * @type {boolean}
     */
    public get startOpen(): boolean { return this._startOpen; }

    /**
     * Start with Collapsed State Open or Closed
     */
    public set startOpen(value: boolean) {
        const
            act = this.$clsActions,
            targetElements = this.targetElements;
        this._startOpen = value;
        if ((this.targetElements?.length || 0) === 0) { return; }
        this.aria(targetElements, { "expanded": value ? value : this.$cls.DELETE });
        this.classes(targetElements, value ? act.add : act.remove, "show");
    }

    /**
     * Collapse Button Text
     * @date 14/11/2022 - 09:12:19
     *
     * @public
     * @type {string}
     */
    public get buttonText(): string { return this._buttonText; }

    /**
     * Collapse Button Text
     */
    public set buttonText(value: string) {
        this._buttonText = value;
        const root = this.rootElement;
        if (!root) { return; }
        //this.collapsedText = (this.rootElement?.ariaExpanded === "false") ? this.collapsedText : this.expandedText;
        requestAnimationFrame(() => {
            let isCollapsed = (
                root.ariaExpanded !== "true" ||
                !root.ariaExpanded ||
                root.classList.contains("collapsed"));
            isCollapsed &&= !this.targetElements.find((target) => target.classList.contains("show"));
            const text = isCollapsed ? this.collapsedText : this.expandedText;
            root && (this.rootElement.textContent = text || value);
        });
    }

    /**
     * Boostrap Collapse Instance
     * @date 14/11/2022 - 09:13:01
     *
     * @public
     * @type {Map<string, any>}
     */
    public get bootstrapCollapse(): Map<string, any> { return this.bootstrap?.Collapse?.getOrCreateInstance(this.rootElement) || null; }


    /**
     * Collapsed State
     * @date 14/11/2022 - 09:13:16
     *
     * @public
     * @type {boolean}
     */
    public get collapsed(): boolean { return this._collapsed; }

    /**
     * Collapsed State
     */
    public set collapsed(value: boolean) { this._collapsed = value; }

    /**
     * Parent Element
     * @date 14/11/2022 - 09:13:36
     *
     * @public
     * @type {string}
     */
    public get parent(): string { return this._parent; }

    /**
     * Parent Element
     */
    public set parent(value: string) {
        this.targetElements && this.targetElements.forEach((target) => { this.dataset(target, { bsParent: value ? value : this.$cls.DELETE }) });
        this._parent = value;
    }

    /**
     * Button Context Style Class
     * @date 14/11/2022 - 09:14:01
     *
     * @public
     * @type {string}
     */
    public get buttonStyleClass(): string { return this._buttonStyleClass; }

    /**
     * Button Context Style Class
     */
    public set buttonStyleClass(value: string) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        root &&
            this.classes(root, act.remove, this._buttonStyleClass) &&
            this.classes(root, act.add, value)
        this._buttonStyleClass = value;
    }

    /**
     * Collapsed Text
     * @date 14/11/2022 - 09:16:00
     *
     * @public
     * @type {string}
     */
    public get collapsedText(): string { return this._collapsedText; }

    /**
     * Collapsed Text
     */
    public set collapsedText(value: string) { this._collapsedText = value; this.buttonText = this._buttonText; }

    /**
     * Expanded Text
     * @date 14/11/2022 - 09:16:14
     *
     * @public
     * @type {string}
     */
    public get expandedText(): string { return this._expandedText; }

    /**
     * Expanded Text
     */
    public set expandedText(value: string) { this._expandedText = value; this.buttonText = this._buttonText; }

    /**
     * Target Elements
     * @date 14/11/2022 - 09:16:31
     *
     * @public
     * @type {Array<HTMLElement>}
     */
    public get targetElements(): Array<HTMLElement> { return this._targetElements; }

    /**
     * Target Elements
     */
    public set targetElements(value: Array<HTMLElement> | Array<string> | HTMLElement | string) {
        if (!value) { return; }
        this._targetElements ??= [];
        const
            _value = (!Array.isArray(value)) ? [value] : value,
            root = this.rootElement,
            targetElements = this._targetElements;
        _value.forEach((_target) => targetElements.push((typeof _target === "string") ? document.getElementById(_target) : _target));
        const controlIds = targetElements.map((target) => { return `#${target.id}`; }).join(" ");
        if (targetElements.length > 1) {
            if (root) {
                this.dataset(root, { bsTarget: ".multi-collapse" });
                this.aria(root, { controls: controlIds })
            };
            this.classes(targetElements, this.$clsActions.add, "multi-collapse");
        }
        else {
            root && this.dataset(root, { bsTarget: controlIds });
        }
    }

    /**
     * Collapse Horizontally instead of Vertically
     * @date 14/11/2022 - 09:18:09
     *
     * @public
     * @type {boolean}
     */
    public get horizontal(): boolean { return this._horizontal; }

    /**
     * Collapse Horizontally instead of Vertically
     */
    public set horizontal(value: boolean) {
        this.targetElements && this.classes(this.targetElements, value ? this.$clsActions.add : this.$clsActions.remove, "collapse-horizontal");
        this._horizontal = value;
    }

    /**
     * Toggle Element
     * @date 14/11/2022 - 09:18:53
     *
     * @public
     * @readonly
     * @type {HTMLElement}
     */
    public get toggleElement(): HTMLElement { return this.rootElement; }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Open Target(s) using Bootstrap Collapse Show
     * @date 14/11/2022 - 09:20:33
     *
     * @public
     */
    public show(): void { Array.from(this.bootstrapCollapse.keys()).forEach(key => this.bootstrapCollapse.get(key).show()); }

    /**
     * Close Target(s) using Bootstrap Collapse Hide
     * @date 14/11/2022 - 09:21:02
     *
     * @public
     */
    public hide(): void { Array.from(this.bootstrapCollapse.keys()).forEach(key => this.bootstrapCollapse.get(key).hide()); }

    /**
     * Toggle Target(s) using Bootstrap Collapse Toggle
     * @date 14/11/2022 - 09:21:10
     *
     * @public
     */
    public toggle(): void { Array.from(this.bootstrapCollapse.keys()).forEach(key => this.bootstrapCollapse.get(key).toggle()); }

    /**
     * Initialise the Collapse, load manifest and set properties
     * @date 14/11/2022 - 09:21:18
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Collapse>}
     */
    public initialise(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Collapse> {
        const self = this,
            initalisePromise = self.$promise.create(`${self.$cls[self.$mrbr.COMPONENT_NAME]}` + ":initialise");
        super
            .initialise()
            .then(async _ => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                const cfg = self.elementConfig.getConfig(self.$cls.TOGGLE_NAME);
                if (self.rootElement) { self.assignElementConfig(self.rootElement, cfg); }
                else { self.createElement(new self.$ctrlCfg(self.rootElementName, HTMLButtonElement, cfg)); }

                self.targetElements = self._targetElements;
                self.buttonStyleClass = self.buttonStyleClass;
                self.buttonText = self._buttonText;
                self.horizontal = self._horizontal;
                self.parent = self._parent;

                let mountId: number = self.onMounted((evt) => {
                    self.rootElement && (this.buttonText = this._buttonText);
                    self.onShown(() => { requestAnimationFrame(_ => this.rootElement && (self.expandedText = self._expandedText)); });
                    self.onHidden(() => { requestAnimationFrame(_ => this.rootElement && (self.collapsedText = self._collapsedText)) });
                    self.onMounted(mountId);
                })
                initalisePromise.resolve(self);
            });
        return initalisePromise;
    }

    /**
     * Dispose of the Collapse and clear Bootstrap Collapse Properties and instance
     * @date 14/11/2022 - 09:22:16
     *
     * @public
     */
    public dispose(): void {
        const self = this;
        Array.from(self.bootstrapCollapse.keys()).forEach((key) => { self.bootstrapCollapse.get(key).dispose(); });
        super.dispose();
    }
    //#endregion Public Methods




    /**
     * Subscribe to the Toggler Click Event
     * @date 14/11/2022 - 15:54:28
     *
     * @public
     * @param {((event: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onClick(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$cls.CLICK_EVENT_NAME,
            this.$cls.CLICK_EVENT_NAME,
            this.rootElement,
            this.click_handler,
            this,
            callback);
    }

    /**
     * Subscribe to the Bootstrap Collapse Show Event
     * @date 14/11/2022 - 15:37:26
     *
     * @public
     * @param {((event: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onShow(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$cls.SHOW_COLLAPSE_EVENT_NAME,
            this.$cls.SHOW_COLLAPSE_EVENT_NAME,
            this.targetElements,
            this.show_handler,
            this,
            callback)
    }

    /**
     * Subscribe to the Bootstrap Collapse Shown Event
     * @date 14/11/2022 - 15:37:39
     *
     * @public
     * @param {((event: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onShown(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$cls.SHOWN_COLLAPSE_EVENT_NAME,
            this.$cls.SHOWN_COLLAPSE_EVENT_NAME,
            this.targetElements,
            this.shown_handler,
            this,
            callback);

    }

    /**
     * Subscribe to the Bootstrap Collapse Hide Event
     * @date 14/11/2022 - 15:37:53
     *
     * @public
     * @param {((event: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onHide(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$cls.HIDE_COLLAPSE_EVENT_NAME,
            this.$cls.HIDE_COLLAPSE_EVENT_NAME,
            this.targetElements,
            this.hide_handler,
            this,
            callback);
    }

    /**
     * Subscribe to the Bootstrap Collapse Hidden Event
     * @date 14/11/2022 - 15:38:03
     *
     * @public
     * @param {((event: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onHidden(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$cls.HIDDEN_COLLAPSE_EVENT_NAME,
            this.$cls.HIDDEN_COLLAPSE_EVENT_NAME,
            this.targetElements,
            this.hidden_handler,
            this,
            callback);
    }

    private click_handler(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this.eventSubscribers.raiseEvent(new this.$event(this.$cls.CLICK_EVENT_NAME, this, event));
    }


    /**
     * Bootstrap Element Show Handler. Raises the Show Event
     * @date 14/11/2022 - 15:38:13
     *
     * @private
     * @param {Event} e
     */
    private show_handler(e: Event) {
        this.eventSubscribers.raiseEvent(new this.$event<any>(this.$cls.SHOW_COLLAPSE_EVENT_NAME, this, e));
    }

    /**
     * Bootstrap Element Shown Handler. Raises the Shown Event
     * @date 14/11/2022 - 15:38:43
     *
     * @private
     * @param {Event} e
     */
    private shown_handler(e: Event) {
        this.eventSubscribers.raiseEvent(new this.$event<any>(this.$cls.SHOWN_COLLAPSE_EVENT_NAME, this, e));
    }

    /**
     * Bootstrap Element Hide Handler. Raises the Hide Event
     * @date 14/11/2022 - 15:39:06
     *
     * @private
     * @param {Event} e
     */
    private hide_handler(e: Event) {
        this.eventSubscribers.raiseEvent(new this.$event<any>(this.$cls.HIDE_COLLAPSE_EVENT_NAME, this, e));
    }

    /**
     * Bootstrap Element Hidden Handler. Raises the Hidden Event
     * @date 14/11/2022 - 15:39:14
     *
     * @private
     * @param {Event} e
     */
    private hidden_handler(e: Event) {
        this.eventSubscribers.raiseEvent(new this.$event<any>(this.$cls.HIDDEN_COLLAPSE_EVENT_NAME, this, e));
    }

    //#region Private Methods
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Collapse> {
        const self = this,
            componentName = self.$cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(componentName + ":setDefaultConfig");
        super
            .setDefaultConfig()
            .then(() => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
                    .setIfNotExist(self.$cls.TOGGLE_NAME, new self.$ctrlPrm()
                        .Classes("btn")
                        .Attributes({ type: "button" })
                        .Data({ bsToggle: "collapse" })
                        .Aria({ expanded: "false" })
                    );
                setDefaultConfigPromise.resolve(self);
            });
        return setDefaultConfigPromise;
    }
    //#endregion Private Methods
}