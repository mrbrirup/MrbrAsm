import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_ClassActions } from "../../controls/classActions";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfig } from "../../controls/ControlConfig";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";
type typeButtonGroupSize = typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.buttonGroupSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.buttonGroupSizes];
type typeButtonGroupOrientation = typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.orientation[keyof typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.orientation];
export class Mrbr_UI_Bootstrap_Controls_ButtonGroup extends Mrbr_UI_Controls_Control {
    public static BUTTON_GROUP_NAME = "button_group";
    public static CLICK_EVENT_NAME = "button_group_click";
    //#region enums
    public static buttonGroupSizes = {
        large: "btn-group-lg",
        small: "btn-group-sm",
        default: ""
    } as const;
    public static orientation = {
        vertical: "btn-group-vertical",
        horizontal: "btn-group"
    } as const;
    //#endregion enums

    //#region Aliases

    override get $cls(): typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup { return Mrbr_UI_Bootstrap_Controls_ButtonGroup; }

    //#endregion Aliases
    //#region Private Properties
    private _ariaLabel: string = "";
    private _buttonGroupSize: typeButtonGroupSize = this.$cls.buttonGroupSizes.default;
    private _orientation: typeButtonGroupOrientation = this.$cls.orientation.horizontal;
    //#endregion Private Properties
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = rootElementName;
    }
    //#region Properties
    public get ariaLabel(): string {
        return this._ariaLabel;
    }
    public set ariaLabel(value: string) {
        const self = this,
            root = self.rootElement;
        root && self.attributes(root, { "aria-label": value });
        this._ariaLabel = value;
    }
    public get buttonGroupSize(): typeButtonGroupSize {
        return this._buttonGroupSize;
    }
    public set buttonGroupSize(value: typeButtonGroupSize) {
        const self = this,
            root = self.rootElement;
        root && self.classes(root, self.$clsActions.Remove, self._buttonGroupSize);
        root && self.classes(root, self.$clsActions.Add, value);

        this._buttonGroupSize = value;
    }
    public get orientation(): typeButtonGroupOrientation {
        return this._orientation;
    }
    public set orientation(value: typeButtonGroupOrientation) {
        const self = this,
            root = self.rootElement;
        root && self.classes(root, self.$clsActions.Remove, self._orientation);
        root && self.classes(root, self.$clsActions.Add, value);
        this._orientation = value;
    }
    //#endregion Properties
    initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_ButtonGroup> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ButtonGroup>("Mrbr_UI_Bootstrap_Controls_ButtonGroup:initialise");
        super.initialise(args).then(() => {
            MrbrBase.mrbrInstance.loadManifest(self[MrbrBase.MRBR_COMPONENT_MANIFEST])
                .then(_ => {
                    self.setDefaultConfig();
                    self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.configuration(self.$cls.BUTTON_GROUP_NAME)));
                    self.orientation = self._orientation;
                    self.buttonGroupSize = self._buttonGroupSize;
                    self.ariaLabel = self._ariaLabel;
                    self.events[self.$cls.CLICK_EVENT_NAME] = new Mrbr_System_Events_EventHandler(
                        "click",
                        self.rootElement,
                        self.groupClick_handler,
                        self
                    )
                    initalisePromise.resolve(self);
                })
        })

        return initalisePromise;
    }
    private _groupItems = new Map<string, HTMLElement>();
    private groupClick_handler(event: MouseEvent | TouchEvent) {
        const self = this;
        if (event.currentTarget === self.rootElement) {
            event.stopPropagation();
            event.preventDefault();
            self.dispatchEvent(new CustomEvent(self.$cls.CLICK_EVENT_NAME, { detail: { id: (<HTMLElement>event.target).id, event } }));
        }
    }
    public get groupItems() {
        return this._groupItems;
    }
    public set groupItems(value) {
        this._groupItems = value;
    }
    public addGroupItem(id: string, item: HTMLElement) {
        const self = this,
            root = self.rootElement;
        root && root.appendChild(item);
        self.groupItems.set(id, item);
    }
    public removeGroupItem(id: string) {
        const self = this,
            root = self.rootElement;
        root && root.removeChild(self.groupItems.get(id));
        self.groupItems.delete(id);
    }
    public setActive(id: string) {
        const self = this;
        self.groupItems.forEach((value, key) => self.classes(value, self.$clsActions.Remove, "active"));
        (self.groupItems.has(id)) && self.classes(self.groupItems.get(id), self.$clsActions.Add, "active");

    }
    public setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_ButtonGroup> {
        const self = this;
        self.defaultConfig.add(self.$cls.BUTTON_GROUP_NAME, new self.$ctrlPrm().Attributes({ role: "group" }));
        return self.$promise.createResolved("Mrbr_UI_Bootstrap_Controls_ButtonGroup:setDefaultConfiguration", self);
    }
}