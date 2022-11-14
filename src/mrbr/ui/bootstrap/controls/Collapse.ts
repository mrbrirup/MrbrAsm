import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";

export class Mrbr_UI_Bootstrap_Controls_Collapse extends Mrbr_UI_Controls_Control {
    public static readonly TOGGLE_NAME: string = "collapse_toggle";
    public static readonly TARGET_NAME: string = "collapse_target";
    public static readonly HIDE_COLLAPSE_EVENT_NAME: string = "hide.bs.collapse";
    public static readonly HIDDEN_COLLAPSE_EVENT_NAME: string = "hidden.bs.collapse";
    public static readonly SHOW_COLLAPSE_EVENT_NAME: string = "show.bs.collapse";
    public static readonly SHOWN_COLLAPSE_EVENT_NAME: string = "shown.bs.collapse";

    //#region Private Fields
    private _collapsed: boolean = false;
    private _bootstrapCollapse: Map<string, any> = new Map<string, any>();
    private _parent: string;
    private _horizontal: boolean = false;
    private _targetElements: Array<HTMLElement>;
    private _buttonStyleClass: string = "btn-primary";
    private _buttonText: string = "Toggle";
    private _collapsedText: string;
    private _expandedText: string;
    private _startOpen: boolean = true;
    //#endregion Private Fields
    constructor(toggle: string | HTMLElement, target?: string | HTMLElement | Array<string> | Array<HTMLElement>) {
        super((toggle instanceof HTMLElement ? (toggle.id || (Mrbr_UI_Controls_Control.createId(Mrbr_UI_Bootstrap_Controls_Collapse.TOGGLE_NAME))) : toggle));
        const self = this;
        (toggle instanceof HTMLElement) && (self.rootElement = toggle);
        if (!Array.isArray(target)) {
            if (target instanceof HTMLElement) { self._targetElements = [target]; }
            else if (typeof target === "string") { self._targetElements = [document.getElementById(target)]; }
        }
        else {
            !self._targetElements && (self._targetElements = []);
            target.forEach((_target) => {
                if (_target instanceof HTMLElement) { self._targetElements.push(_target); }
                else if (typeof _target === "string") { self._targetElements.push(document.getElementById(_target)); }
            });
        }
    }
    //#region Private Property
    get $cls() { return Mrbr_UI_Bootstrap_Controls_Collapse; }
    //#endregion Private Property
    //#region Public Properties
    public get startOpen(): boolean { return this._startOpen; }
    public set startOpen(value: boolean) {
        const
            act = this.$clsActions,
            targetElements = this.targetElements;
        this.elementAria(targetElements, { "expanded": value ? value : this.$cls.DELETE });
        this.classes(targetElements, value ? act.Add : act.Remove, "show");
        this._startOpen = value;
    }
    public get buttonText(): string { return this._buttonText; }
    public set buttonText(value: string) {
        this._buttonText = value;
        const root = this.rootElement;
        if (!root) { return; }
        this.collapsedText = (this.rootElement?.ariaExpanded === "false") ? this.collapsedText : this.expandedText;
        root && (this.rootElement.innerHTML = value);
    }
    public get bootstrapCollapse(): Map<string, any> { return this._bootstrapCollapse; }
    public set bootstrapCollapse(value: Map<string, any>) { this._bootstrapCollapse = value; }
    public get collapsed(): boolean { return this._collapsed; }
    public set collapsed(value: boolean) { this._collapsed = value; }
    public get parent(): string { return this._parent; }
    public set parent(value: string) {
        this.targetElements && this.targetElements.forEach((target) => { this.elementDataset(target, { bsParent: value ? value : this.$cls.DELETE }) });
        this._parent = value;
    }
    public get buttonStyleClass(): string { return this._buttonStyleClass; }
    public set buttonStyleClass(value: string) {
        this.classes(this.rootElement, this.$clsActions.Remove, this._buttonStyleClass);
        this.classes(this.rootElement, this.$clsActions.Add, value);
        this._buttonStyleClass = value;
    }
    public get collapsedText(): string { return this._collapsedText; }
    public set collapsedText(value: string) { this._collapsedText = value; this.buttonText = this._buttonText; }
    public get expandedText(): string { return this._expandedText; }
    public set expandedText(value: string) { this._expandedText = value; this.buttonText = this._buttonText; }
    public get targetElements(): Array<HTMLElement> { return this._targetElements; }
    public set targetElements(value: Array<HTMLElement> | Array<string> | HTMLElement | string) {
        if (!value) { return; }
        (!this._targetElements) && (this._targetElements = []);

        const _value = (!Array.isArray(value)) ? [value] : value,
            root = this.rootElement,
            targetElements = this._targetElements;
        _value.forEach((_target) => targetElements.push((typeof _target === "string") ? document.getElementById(_target) : _target));
        const hashId = (targetElements.length < 2) ? "" : "#";
        let controlIds = targetElements.map((target) => { return `${hashId}${target.id}`; }).join(" ");
        if (this.targetElements.length > 1) {
            if (root) {
                this.elementDataset(root, { bsTarget: ".multi-collapse" });
                this.elementAria(root, { controls: controlIds })
            };
            this.classes(targetElements, this.$clsActions.Add, "multi-collapse");
        }
        else {
            root && this.elementDataset(root, { bsTarget: controlIds });
        }
        this.setTargetEvents();
    }
    public get horizontal(): boolean { return this._horizontal; }
    public set horizontal(value: boolean) {
        this.targetElements && this.classes(this.targetElements, value ? this.$clsActions.Add : this.$clsActions.Remove, "collapse-horizontal");
        this._horizontal = value;
    }
    public get toggleElement(): HTMLElement { return this.rootElement; }
    //#endregion Public Properties
    //#region Public Methods
    public show() { Array.from(this.bootstrapCollapse.keys()).forEach(key => this.bootstrapCollapse.get(key).show()); }
    public hide() { Array.from(this.bootstrapCollapse.keys()).forEach(key => this.bootstrapCollapse.get(key).hide()); }
    public toggle() { Array.from(this.bootstrapCollapse.keys()).forEach(key => this.bootstrapCollapse.get(key).toggle()); }
    //#endregion Public Methods
    public initialise(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Collapse> {
        const self = this,
            initalisePromise = self.$promise.create(`${self.$cls[self.$mrbr.COMPONENT_NAME]}` + ":initialise");
        super.initialise().then(async _ => {
            await self.loadManifest(self.$cls);
            await self.setDefaultConfig();
            (!self.rootElement) && (self.createElement(new self.$ctrlCfg(self.rootElementName, "button", self.elementConfig.getConfig(self.$cls.TOGGLE_NAME))));
            self.targetElements = self._targetElements;
            self.buttonStyleClass = self.buttonStyleClass;
            self.buttonText = self._buttonText;
            self.horizontal = self._horizontal;
            self.parent = self._parent;
            let handlerId = self.$cls.mutationObserver.onChildListChange(self.mutation_handler)
            document.getElementById(self.rootElement.id) && self.rootElementAdded();
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }
    public dispose(): void {
        const self = this;
        Array.from(self.bootstrapCollapse.keys()).forEach((key) => { self.bootstrapCollapse.get(key).dispose(); });
        super.dispose();
    }
    private mutation_handler(event: Mrbr_System_Events_Event<MutationRecord[]>): void {
        const self = this;
        let nodedAdded: boolean = false;
        for (let mutationIndex = 0; mutationIndex < event.data.length; mutationIndex++) {
            if (nodedAdded === true) { break; }
            const mutation = event.data[mutationIndex];
            for (let nodeIndex = 0; nodeIndex < mutation.addedNodes.length; nodeIndex++) {
                const node = mutation.addedNodes[nodeIndex];
                if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).id === self.rootElement.id) {
                    self.rootElementAdded();
                    nodedAdded = true;
                    break;
                }
            }
        }
    }
    private rootElementAdded() {
        const self = this;
        if (self.events[`carousel_${self.$cls.MUTATION_EVENT_NAME}`]) { self.events[`carousel_${self.$cls.MUTATION_EVENT_NAME}`].remove(); }
        self.targetElements = self._targetElements;
        self.startOpen = self._startOpen;
        self.targetElements.forEach((targetElement) => {
            self.bootstrapCollapse.set(targetElement.id, MrbrBase.mrbrInstance.host["bootstrap"].Collapse.getOrCreateInstance(`#${targetElement.id}`));
        });
        self.parent = self._parent;
    }
    private setTargetEvents() {
        const self = this;
        self.targetElements.forEach((targetElement) => {
            !self.events[`collapse_${targetElement.id}_${self.$cls.SHOW_COLLAPSE_EVENT_NAME}`] && (self.events[`collapse_${targetElement.id}_${self.$cls.SHOW_COLLAPSE_EVENT_NAME}`] = new Mrbr_System_Events_EventHandler(
                self.$cls.SHOW_COLLAPSE_EVENT_NAME,
                targetElement,
                self.collapseShow_handler,
                self));
            !self.events[`collapse_${targetElement.id}_${self.$cls.SHOWN_COLLAPSE_EVENT_NAME}`] && (self.events[`collapse_${targetElement.id}_${self.$cls.SHOWN_COLLAPSE_EVENT_NAME}`] = new Mrbr_System_Events_EventHandler(
                self.$cls.SHOWN_COLLAPSE_EVENT_NAME,
                targetElement,
                self.collapseShown_handler,
                self));
            !self.events[`collapse_${targetElement.id}_${self.$cls.HIDE_COLLAPSE_EVENT_NAME}`] && (self.events[`collapse_${targetElement.id}_${self.$cls.HIDE_COLLAPSE_EVENT_NAME}`] = new Mrbr_System_Events_EventHandler(
                self.$cls.HIDE_COLLAPSE_EVENT_NAME,
                targetElement,
                self.collapseHide_handler,
                self));
            !self.events[`collapse_${targetElement.id}_${self.$cls.HIDDEN_COLLAPSE_EVENT_NAME}`] && (self.events[`collapse_${targetElement.id}_${self.$cls.HIDDEN_COLLAPSE_EVENT_NAME}`] = new Mrbr_System_Events_EventHandler(
                self.$cls.HIDDEN_COLLAPSE_EVENT_NAME,
                targetElement,
                self.collapseHidden_handler,
                self));
        });
    }
    private collapseShow_handler(event): void {
        const self = this;
        self.dispatchEvent(new CustomEvent(self.$cls.SHOW_COLLAPSE_EVENT_NAME, { detail: event }));
    }
    private collapseShown_handler(event): void {
        const self = this;
        self.dispatchEvent(new CustomEvent(self.$cls.SHOWN_COLLAPSE_EVENT_NAME, { detail: event }));
        self.rootElement.innerText = self.expandedText || self.buttonText;
    }
    private collapseHide_handler(event): void {
        const self = this;
        self.dispatchEvent(new CustomEvent(self.$cls.HIDE_COLLAPSE_EVENT_NAME, { detail: event }));
    }
    private collapseHidden_handler(event): void {
        const self = this;
        self.dispatchEvent(new CustomEvent(self.$cls.HIDDEN_COLLAPSE_EVENT_NAME, { detail: event }));
        self.rootElement.innerText = self.collapsedText || self.buttonText;
    }
    //#region Private Methods
    setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Collapse> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create("Mrbr_UI_Bootstrap_Controls_Collapse:setDefaultConfig");
        super.setDefaultConfig().then(() => {
            self.defaultConfig.add(self.$cls.TOGGLE_NAME, new self.$ctrlPrm()
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