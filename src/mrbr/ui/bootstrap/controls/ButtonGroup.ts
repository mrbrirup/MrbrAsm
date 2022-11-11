import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_MountPosition } from "../../controls/MountPosition";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
type typeButtonGroupSize = typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.groupSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.groupSizes];
type typeButtonGroupOrientation = typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.orientation[keyof typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup.orientation];
export class Mrbr_UI_Bootstrap_Controls_ButtonGroup extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region Public Static Constants

    /**
     * Internal Name of the Button Group Element
     * @date 11/11/2022 - 11:14:56
     *
     * @public
     * @static
     * @readonly
     * @type {"button_group"}
     */
    public static readonly BUTTON_GROUP_NAME = "button_group";

    /**
     * Internal Name for Button Group Click Event
     * @date 11/11/2022 - 11:15:10
     *
     * @public
     * @static
     * @readonly
     * @type {"button_group_click"}
     */
    public static readonly CLICK_EVENT_NAME = "button_group_click";
    //#region Public Static Constants
    //#region enums

    /**
     * Button Group Sizes
     * @date 11/11/2022 - 11:15:36
     *
     * @public
     * @static
     * @type {{ readonly large: "btn-group-lg"; readonly small: "btn-group-sm"; readonly default: ""; }}
     */
    public static groupSizes = {
        large: "btn-group-lg",
        small: "btn-group-sm",
        default: ""
    } as const;

    /**
     * ButtonGroup Orientations
     * @date 11/11/2022 - 11:15:50
     *
     * @public
     * @static
     * @type {{ readonly vertical: "btn-group-vertical"; readonly horizontal: "btn-group"; }}
     */
    public static orientation = {
        vertical: "btn-group-vertical",
        horizontal: "btn-group"
    } as const;
    //#endregion enums

    //#region Aliases

    /**
     * Tpe Alias for Mrbr_UI_Bootstrap_Controls_ButtonGroup
     * @date 11/11/2022 - 11:16:07
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_ButtonGroup { return Mrbr_UI_Bootstrap_Controls_ButtonGroup; }

    //#endregion Aliases
    //#region Private Properties


    /**
     * HTMLElements in group
     * @date 11/11/2022 - 11:32:02
     *
     * @private
     * @type {*}
     */
    private _groupItems = new Map<string, HTMLElement>();

    /**
     * Aria Label for the Button Group
     * @date 11/11/2022 - 11:16:28
     *
     * @private
     * @type {string}
     */
    private _ariaLabel: string = "";

    /**
     * Button Group Size
     * @date 11/11/2022 - 11:16:49
     *
     * @private
     * @type {typeButtonGroupSize}
     */
    private _groupSize: typeButtonGroupSize = this.$cls.groupSizes.default;

    /**
     * Button Group Orientation
     * @date 11/11/2022 - 11:17:02
     *
     * @private
     * @type {typeButtonGroupOrientation}
     */
    private _orientation: typeButtonGroupOrientation = this.$cls.orientation.horizontal;
    //#endregion Private Properties

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ButtonGroup.
     * @date 11/11/2022 - 11:17:13
     *
     * @constructor
     * @param {string} rootElementName
     */
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = rootElementName;
    }
    //#region Properties

    /**
     * Aria Label for the Button Group
     * @date 11/11/2022 - 11:17:22
     *
     * @public
     * @type {string}
     */
    public get ariaLabel(): string { return this._ariaLabel; }

    /**
     * Aria Label for the Button Group
     */
    public set ariaLabel(value: string) {
        const root = this.rootElement;
        root && this.elementAria(root, { label: value });
        this._ariaLabel = value;
    }

    /**
     * Button Group Size
     * @date 11/11/2022 - 11:20:02
     *
     * @public
     * @type {typeButtonGroupSize}
     */
    public get buttonGroupSize(): typeButtonGroupSize { return this._groupSize; }

    /**
     * Button Group Size
     */
    public set buttonGroupSize(value: typeButtonGroupSize) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        root && this.classes(root, act.Remove, this._groupSize);
        root && this.classes(root, act.Add, value);
        this._groupSize = value;
    }

    /**
     * Button Group Orientation
     * @date 11/11/2022 - 11:20:52
     *
     * @public
     * @type {typeButtonGroupOrientation}
     */
    public get orientation(): typeButtonGroupOrientation { return this._orientation; }

    /**
     * Button Group Orientation
     */
    public set orientation(value: typeButtonGroupOrientation) {
        const
            root = this.rootElement,
            act = this.$clsActions;
        root && this.classes(root, act.Remove, this._orientation);
        root && this.classes(root, act.Add, value);
        this._orientation = value;
    }
    //#endregion Properties

    /**
     * Initialise the Button Group, load manifest and set properties
     * @date 11/11/2022 - 11:32:38
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ButtonGroup>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ButtonGroup> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ButtonGroup>(`${self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME]}:initialise`);
        super.initialise(args).then(async _ => {
            await self.loadManifest(self.$cls);
            await self.setDefaultConfig();
            self.createElement(new self.$ctrlCfg(self.rootElementName, "div", self.elementConfig.get(self.$cls.BUTTON_GROUP_NAME)));
            self.orientation = self._orientation;
            self.buttonGroupSize = self._groupSize;
            self.ariaLabel = self._ariaLabel;
            self.defaultContainerElementName = self.rootElementName;
            initalisePromise.resolve(self);
        });
        return initalisePromise;
    }

    /**
     * Group click event handler
     * @date 11/11/2022 - 11:33:46
     *
     * @private
     * @param {(MouseEvent | TouchEvent)} event
     */
    private groupClick_handler(event: MouseEvent | TouchEvent) {
        const self = this;
        //debugger
        if (event.currentTarget === self.rootElement) {
            event.stopPropagation();
            event.preventDefault();
            self.eventSubscribers.raise(self.$cls.CLICK_EVENT_NAME, new Mrbr_System_Events_Event(self.$cls.CLICK_EVENT_NAME, this, { id: (<HTMLElement>event.target).id, event }));
        }
    }

    /**
     * Subscribe to onclick event of the group and addL:istener to Group if not already done
     * @date 11/11/2022 - 11:34:07
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} callback
     * @returns {number}
     */
    public onClick(callback: (event: Mrbr_System_Events_Event<any>) => void): number {
        (!this.events.has(this.$cls.CLICK_EVENT_NAME)) && (this.events.addEventHandler(new Mrbr_System_Events_EventHandler(
            "click",
            this.rootElement,
            this.groupClick_handler,
            this
        )));
        return this.eventSubscribers.add(this.$cls.CLICK_EVENT_NAME, callback);
    }

    /**
     * HTMLElements in the group
     * @date 11/11/2022 - 11:34:41
     *
     * @public
     * @type {Map<string, HTMLElement>}
     */
    public get groupItems(): Map<string, HTMLElement> { return this._groupItems; }

    /**
     * HTMLElements in the group
     */
    public set groupItems(value) { this._groupItems = value; }

    /**
     * Add an Item to the Group Default Container Element
     * @date 11/11/2022 - 11:36:03
     *
     * @public
     * @param {string} id
     * @param {HTMLElement} item
     */
    public addGroupItem(id: string, item: HTMLElement): Mrbr_UI_Bootstrap_Controls_ButtonGroup {
        const container = this.defaultContainerElement;
        if (!container) { throw new Error("DefaultContainer element not found"); }
        container.appendChild(item);
        this.groupItems.set(id, item);
        return this;
    }

    public override mount(element: HTMLElement | Mrbr_UI_Controls_Control, position: Mrbr_UI_Controls_MountPosition = Mrbr_UI_Controls_MountPosition.append, ...args: any): Mrbr_UI_Bootstrap_Controls_ButtonGroup {
        super.mount(element, position, ...args);
        return this;
    }

    /**
     * Remove an Item from the Group Default Container Element. Returns null if not in group
     * @date 11/11/2022 - 11:38:50
     *
     * @public
     * @param {string} id
     */
    public removeGroupItem(id: string): HTMLElement {
        const root = this.rootElement,
            item = this.groupItems.get(id);
        if (!item || !root) { return null; }
        root && root.removeChild(item);
        this.groupItems.delete(id);
        return item;
    }

    /**
     * Set an element to Active by its ID
     * @date 11/11/2022 - 11:40:53
     *
     * @public
     * @param {string} id
     */
    public setActive(id: string): void {
        this.groupItems.forEach((value, key) => this.classes(value, this.$clsActions.Remove, "active"));
        (this.groupItems.has(id)) && this.classes(this.groupItems.get(id), this.$clsActions.Add, "active");
    }

    /**
     * Set default configuration for the Button Group
     * @date 11/11/2022 - 11:41:25
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ButtonGroup>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ButtonGroup> {
        const
            self = this,
            controlName = self.$cls[self.$mrbrBase.MRBR_COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ButtonGroup>(`${controlName}:setDefaultConfig`);
        try {
            super.setDefaultConfig().then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$cls.BUTTON_GROUP_NAME, new self.$ctrlPrm()
                        .Attributes({ role: "group" }));
                setDefaultConfigPromise.resolve(self);
            })
        } catch (error) { setDefaultConfigPromise.reject(error); }
        return setDefaultConfigPromise;
    }
}