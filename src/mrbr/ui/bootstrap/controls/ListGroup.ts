import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles } from "./ListGroup$ContextualStyles";
import { Mrbr_UI_Bootstrap_Controls_ListGroup$HorizontalStyles } from "./ListGroup$HorizontalStyles";
import { Mrbr_UI_Bootstrap_Controls_ListGroupEvent } from "./ListGroupEvent";
import { Mrbr_UI_Bootstrap_Controls_ListGroupEventData } from "./ListGroupEventData";
import { Mrbr_UI_Bootstrap_Controls_ListItemBadged } from "./ListItemBadged";

export class Mrbr_UI_Bootstrap_Controls_ListGroup extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {
    //#region PUblic Static Constants



    /**
     * ListItem Data Attribute Name for ListGroup Item Type
     * @date 03/12/2022 - 16:29:23
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly LISTITEM_TYPE_DATA_ATTRIBUTE: string = "data-mrbr-list-item-type";

    /**
     * ListGroup Click Event Name
     * @date 03/12/2022 - 16:27:52
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_CLICK_EVENT: string = "mrbr.ui.bootstrap.controls.listgroup.click";
    /**
     * ListGroupItem Data Attribute
     * @date 03/12/2022 - 09:55:08
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_ITEM_DATATYPE: string = "list-group-item";



    /**
     * ListGroup Item Class
     * @date 03/12/2022 - 09:56:41
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_ITEM_CLASS: string = "list-group-item";


    /**
     * Internal ListGroup Name
     * @date 03/12/2022 - 09:33:53
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_NAME: string = "listgroup";

    /**
     * Internal ListGroup Item Name
     * @date 03/12/2022 - 09:34:17
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_ITEM_NAME: string = "listgroup_item";

    /**
     * Internal LisGroupItem Badge Name
     * @date 03/12/2022 - 09:34:32
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_ITEM_BADGE_NAME: string = "listgroup_item_badge";

    /**
     * Internal ListBox Item CheckBox Name
     * @date 03/12/2022 - 09:34:53
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_ITEM_CHECKBOX_NAME: string = "listgroup_item_checkbox";

    /**
     * Internal ListBox Item Control Label
     * @date 03/12/2022 - 09:35:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_ITEM_CONTROL_LABEL_NAME: string = "listgroup_item_control_label";

    /**
     * Internal ListGroup Item Radio Button Name
     * @date 03/12/2022 - 09:36:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly LISTGROUP_ITEM_RADIO_NAME: string = "listgroup_item_radio";


    /**
     * Flexfill class for Equal Width List Group Items
     * @date 03/12/2022 - 10:04:45
     *
     * @public
     * @static
     * @readonly
     * @type {"flex-fill"}
     */
    public static readonly LISTGROUP_FLEX_FILL = "flex-fill";


    /**
     * ListGroup Flush Class for Flush Style ListGroup
     * @date 03/12/2022 - 10:05:01
     *
     * @public
     * @static
     * @readonly
     * @type {"list-group-flush"}
     */
    public static readonly LISTGROUP_FLUSH = "list-group-flush";


    /**
     * ListGroup Numbered Class for Numbered ListGroup
     * @date 03/12/2022 - 10:05:24
     *
     * @public
     * @static
     * @readonly
     * @type {"list-group-numbered"}
     */
    public static readonly LISTGROUP_NUMBERED = "list-group-numbered";


    /**
     * ListGroup Class
     * @date 03/12/2022 - 10:05:42
     *
     * @public
     * @static
     * @readonly
     * @type {"list-group"}
     */
    public static readonly LISTGROUP_CLASS = "list-group";

    //#endregion Public Static Constants

    //#region Public Type Aliases

    /**
     * ListGroup Type Alias 
     * @date 03/12/2022 - 09:37:16
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroup}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_ListGroup { return this.$bsc.ListGroup as typeof Mrbr_UI_Bootstrap_Controls_ListGroup; }

    /**
     * ListGroup HorizontalStyles Enum Alias
     * @date 03/12/2022 - 09:37:36
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroup}
     */
    public get $lghs(): typeof Mrbr_UI_Bootstrap_Controls_ListGroup$HorizontalStyles { return this.$bsc.ListGroup$HorizontalStyles as typeof Mrbr_UI_Bootstrap_Controls_ListGroup$HorizontalStyles; }

    /**
     * ListGroup Contextual Styles Enum Alias
     * @date 03/12/2022 - 09:37:54
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListGroup}
     */
    public get $lgcs(): typeof Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles { return this.$bsc.ListGroup$ContextualStyles as typeof Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles; }

    /**
     * ListItemBadged Type Alias
     * @date 03/12/2022 - 09:38:21
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ListItemBadged}
     */
    public get $lib(): typeof Mrbr_UI_Bootstrap_Controls_ListItemBadged { return this.$bsc.ListItemBadged as typeof Mrbr_UI_Bootstrap_Controls_ListItemBadged; }

    //#endregion Public Type Aliases

    //#region Private Fields


    /**
     * Are ListItems Equal Width
     * @date 03/12/2022 - 09:40:04
     *
     * @private
     * @type {boolean}
     */
    private _equalWidth: boolean = false;

    /**
     * Is ListGroup Flush Styled
     * @date 03/12/2022 - 09:40:19
     *
     * @private
     * @type {boolean}
     */
    private _flush: boolean = false;

    /**
     * Use Ordered List instead of Unordered List
     * @date 03/12/2022 - 09:40:42
     *
     * @private
     * @type {boolean}
     */
    private _orderedList: boolean = false;

    /**
     * Use Numbered List instead of Unordered List
     * @date 03/12/2022 - 09:41:02
     *
     * @private
     * @type {boolean}
     */
    private _numberedList: boolean = false;

    /**
     * Display ListGroup as a Horizontal List
     * @date 03/12/2022 - 09:41:16
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_ListGroup}
     */
    private _horizontal: Mrbr_UI_Bootstrap_Controls_ListGroup$HorizontalStyles;
    //#endregion Private Fields


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_ListGroup.
     * @date 03/12/2022 - 09:41:30
     *
     * @constructor
     * @param {boolean} [orderedList=false] set at initialisation time as the list is created using the UL or OL tag
     */
    constructor(orderedList: boolean = false) {
        super();
        this._orderedList = orderedList;
    }

    /**
     * Display Columns as Equal Width
     * @date 03/12/2022 - 09:42:13
     *
     * @public
     * @type {boolean}
     */
    public get equalWidth(): boolean { return this._equalWidth; }

    /**
     * Display Columns as Equal Width
     */
    public set equalWidth(value: boolean) {
        this._equalWidth = value;
        if ((this.elements?.size || 0) === 0) return;
        (this.horizontal !== this.$lghs.none) && Array.from(this.elements.map.keys()).forEach((key) => {
            const element = this.elements.get(key);
            if (element && element.dataset.mrbrListItemType === this.$cls.LISTGROUP_ITEM_DATATYPE) {
                this.classes(element, value ? this.$clsActions.add : this.$clsActions.remove, this.$cls.LISTGROUP_FLEX_FILL);
            }
        });
    }

    /**
     * Display ListGroup in Flush Style
     * @date 03/12/2022 - 10:08:12
     *
     * @public
     * @type {boolean}
     */
    public get flush(): boolean { return this._flush; }

    /**
     * Display ListGroup in Flush Style
     */
    public set flush(value: boolean) {
        this.classes(this.rootElement, value ? this.$clsActions.add : this.$clsActions.remove, this.$cls.LISTGROUP_FLUSH);
        this._flush = value;
    }

    /**
     * Display ListGroup as a Horizontal List
     * @date 03/12/2022 - 10:08:36
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_ListGroup}
     */
    public get horizontal(): Mrbr_UI_Bootstrap_Controls_ListGroup$HorizontalStyles { return this._horizontal ??= this.$lghs.none; }

    /**
     * Display ListGroup as a Horizontal List
     */
    public set horizontal(value: Mrbr_UI_Bootstrap_Controls_ListGroup$HorizontalStyles) {
        const root = this.rootElement;
        root && (this.classes(root, this.$clsActions.remove, this._horizontal)) && this.classes(root, this.$clsActions.add, value);
        this._horizontal = value;
        this.equalWidth = this._equalWidth;
    }

    /**
     * Use Numbered List instead of Unordered List
     * @date 03/12/2022 - 10:08:52
     *
     * @public
     * @type {boolean}
     */
    public get numberedList(): boolean { return this._numberedList; }

    /**
     * Use Numbered List instead of Unordered List
     */
    public set numberedList(value: boolean) {
        this._numberedList = value;
        this.classes(this.rootElement, value ? this.$clsActions.add : this.$clsActions.remove, this.$cls.LISTGROUP_NUMBERED);
    }

    /**
     * Use Ordered List instead of Unordered List
     * @date 03/12/2022 - 10:09:10
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get orderedList(): boolean { return this._orderedList; }


    /**
     * Initialise the ListGroup, load manifets and set properties
     * @date 03/12/2022 - 10:09:22
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroup>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroup> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroup>(self.$cls[self.$mrbr.COMPONENT_NAME] + ":initialise");
        super.initialise(args).then(async _ => {
            await self.loadManifest(self.$cls);
            await self.setDefaultConfig();
            self.createElement(new self.$ctrlCfg(self.rootElementName, self.orderedList === true ? self.$htmlt.olist : self.$htmlt.ulist, this.elementConfig.getConfig(self.$cls.LISTGROUP_NAME)));
            self.flush = self.flush;
            self.numberedList = self.numberedList;
            self.horizontal = self.horizontal;

            initialisePromise.resolve(self);
        });
        return initialisePromise;
    }

    /**
     * Set Default Configuration for the ListGroup Controls
     * @date 03/12/2022 - 10:10:30
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroup>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_ListGroup> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroup>(self.$cls[self.$mrbr.COMPONENT_NAME] + ":setDefaultConfig"),
            cls = self.$cls,
            ctrlPrm = self.$ctrlPrm;
        super.setDefaultConfig()
            .then(async _ => {
                self.elementConfig
                    .controlName(cls[self.$mrbr.COMPONENT_NAME])
                    .setIfNotExist(cls.LISTGROUP_NAME, new ctrlPrm()
                        .Classes(this.$cls.LISTGROUP_CLASS))
                    .setIfNotExist(cls.LISTGROUP_ITEM_NAME, new ctrlPrm()
                        .Classes(cls.LISTGROUP_ITEM_CLASS)
                        .Data({ mrbrListItemType: cls.LISTGROUP_ITEM_DATATYPE }))
                    .setIfNotExist(cls.LISTGROUP_ITEM_BADGE_NAME, new ctrlPrm()
                        .Classes("badge bg-primary rounded-pill"))
                    .setIfNotExist(cls.LISTGROUP_ITEM_CHECKBOX_NAME, new ctrlPrm()
                        .Classes("form-check-input me-1")
                        .Attributes({ type: "checkbox", value: "" }))
                    .setIfNotExist(cls.LISTGROUP_ITEM_RADIO_NAME, new ctrlPrm()
                        .Classes("form-check-input me-1")
                        .Attributes({ type: "radio", value: "" }))
                    .setIfNotExist(cls.LISTGROUP_ITEM_CONTROL_LABEL_NAME, new ctrlPrm()
                        .Classes("form-check-label stretched-link")
                    );
                setDefaultConfigPromise.resolve(self);
            });
        return setDefaultConfigPromise;
    }

    /**
     * Add a new ListGroup Item to the ListGroup
     * @date 03/12/2022 - 10:10:53
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @param {boolean} [actionable=false]
     * @returns {HTMLElement}
     */
    public addItem(id: string, text: string, actionable: boolean = false): HTMLElement {
        if (!this.rootElement) { throw new Error("Root element not found"); }
        const listGroupItem: HTMLElement = <HTMLElement>this.createElement(new this.$ctrlCfg(id, "li", this.elementConfig.getConfig(this.$cls.LISTGROUP_ITEM_NAME)));
        text && (listGroupItem.innerText = text);
        this.setItemActionState(listGroupItem, actionable);
        this.rootElement.appendChild(listGroupItem);
        return listGroupItem;
    }

    /**
     * Add a new ListGroup CheckBox Item to the ListGroup
     * @date 03/12/2022 - 10:11:09
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @param {boolean} [checked=false]
     * @param {boolean} [actionable=false]
     * @returns {HTMLElement}
     */
    public addCheckBoxItem(id: string, text: string, checked: boolean = false, actionable: boolean = false): HTMLElement {
        const
            cls = this.$cls,
            ctrlCfg = this.$ctrlCfg,
            listGroupItem: HTMLElement = this.addItem(id, null, actionable),
            checkBoxId = cls.createId("checkbox"),
            checkbox = <HTMLElement>this.createElement(new ctrlCfg(checkBoxId, "input", this.elementConfig.getConfig(cls.LISTGROUP_ITEM_CHECKBOX_NAME)
                .Id(checkBoxId)
                .Properties({ checked: checked }))),
            label = <HTMLElement>this.createElement(new ctrlCfg(`${checkBoxId}_label`, "label", this.elementConfig.getConfig(cls.LISTGROUP_ITEM_CONTROL_LABEL_NAME)));
        this.attributes(label, { "for": checkBoxId });
        label.innerText = text;
        this.children(listGroupItem, [checkbox, label]);
        return listGroupItem;
    }

    /**
     * Add a new ListGroup Radio Item to the ListGroup
     * @date 03/12/2022 - 10:11:26
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @param {boolean} [checked=false]
     * @param {boolean} [actionable=false]
     * @returns {HTMLElement}
     */
    public addRadioItem(id: string, text: string, checked: boolean = false, actionable: boolean = false): HTMLElement {
        const
            cls = this.$cls,
            ctrlCfg = this.$ctrlCfg,
            listGroupItem: HTMLElement = this.addItem(id, null, actionable),
            radioId = cls.createId("radio"),
            radio = <HTMLElement>this.createElement(new ctrlCfg(radioId, "input", this.elementConfig.getConfig(cls.LISTGROUP_ITEM_RADIO_NAME)
                .Id(radioId)
                .Properties({ checked: checked, name: this.rootElement.id }))),
            label = <HTMLElement>this.createElement(new ctrlCfg(`${radioId}_label`, "label", this.elementConfig.getConfig(cls.LISTGROUP_ITEM_CONTROL_LABEL_NAME)));
        this.attributes(label, { "for": radioId });
        label.innerText = text;
        this.children(listGroupItem, [radio, label]);
        return listGroupItem;
    }



    /**
     * Add a new Badged ListGroup Item to the ListGroup
     * @date 03/12/2022 - 10:12:04
     *
     * @public
     * @param {string} id
     * @param {string} text
     * @param {string} badgeText
     * @param {boolean} [actionable=false]
     * @returns {Mrbr_UI_Bootstrap_Controls_ListItemBadged}
     */
    public addBadgedItem(id: string, text: string, badgeText: string, actionable: boolean = false): Mrbr_UI_Bootstrap_Controls_ListItemBadged {
        const
            cls = this.$cls,
            ctrlCfg = this.$ctrlCfg,
            listGroupItem: HTMLElement = this.addItem(id, null, actionable),
            textItem: HTMLElement = <HTMLElement>this.createElement(new ctrlCfg(`${id}_text`, "span")),
            badgedItem: HTMLElement = <HTMLElement>this.createElement(new ctrlCfg(`${id}_badge`, "span", this.elementConfig.getConfig(cls.LISTGROUP_ITEM_BADGE_NAME))),
            returnValue = new this.$lib(listGroupItem, textItem, badgedItem);
        this.customContentContainerItem(listGroupItem, true);
        this.classes(textItem, this.$clsActions.add, "ms-2 me-auto");
        listGroupItem.appendChild(textItem)
        listGroupItem.appendChild(badgedItem)
        textItem.innerText = text;
        badgedItem.innerText = badgeText;
        return returnValue;
    }


    /**
     * Remove ListGroup Item from the ListGroup
     * @date 03/12/2022 - 10:12:46
     *
     * @public
     * @param {(string | HTMLElement)} element
     * @returns {HTMLElement}
     */
    public removeItem(element: string | HTMLElement): HTMLElement {
        const listGroupItem: HTMLElement = typeof element === "string" ? this.elements.get(element) : element;
        this.elements.remove(listGroupItem.id);
        (listGroupItem) && this.rootElement.removeChild(listGroupItem);
        return listGroupItem;
    }

    /**
     * Add a new ListGroup Item with Custom Content to the ListGroup
     * @date 03/12/2022 - 10:13:10
     *
     * @public
     * @param {(string | HTMLElement)} element
     * @param {boolean} customContentContainer
     * @param {?string} [defaultText]
     * @returns {HTMLElement}
     */
    public customContentContainerItem(element: string | HTMLElement, customContentContainer: boolean, defaultText?: string): HTMLElement {
        const listGroupItem: HTMLElement = typeof element === "string" ? this.elements.get(element) : element;
        (listGroupItem) && this.classes(listGroupItem, customContentContainer ? this.$clsActions.add : this.$clsActions.remove, "d-flex justify-content-between align-items-start");
        (listGroupItem && defaultText) && (listGroupItem.innerText = defaultText);
        return listGroupItem;
    }

    /**
     * Set the ListGroup Item as Active
     * @date 03/12/2022 - 10:13:36
     *
     * @public
     * @param {(string | HTMLElement)} element
     * @returns {HTMLElement}
     */
    public setActiveItem(element: string | HTMLElement): HTMLElement {
        const listGroupItem: HTMLElement = typeof element === "string" ? this.elements.get(element) : element;
        Array.from(this.elements.keys()).forEach(key => {
            const _element: HTMLElement = this.elements.get(key as string);
            _element.dataset?.mrbrListItemType === this.$cls.LISTGROUP_ITEM_DATATYPE && this.classes(_element, this.$clsActions.remove, "active");
            this.aria(_element, { "current": this.$cls.DELETE });
        });
        (listGroupItem) && this.classes(listGroupItem, this.$clsActions.add, "active") && this.aria(listGroupItem, { "current": true });
        return listGroupItem;
    }

    /**
     * Set the ListGroup Item as Disabled
     * @date 03/12/2022 - 10:13:58
     *
     * @public
     * @param {(string | HTMLElement)} element
     * @returns {HTMLElement}
     */
    public disableItem(element: string | HTMLElement): HTMLElement {
        const listGroupItem: HTMLElement = typeof element === "string" ? this.elements.get(element) : element;
        (listGroupItem) && this.classes(listGroupItem, this.$clsActions.add, "disabled") && this.aria(listGroupItem, { "disabled": true });
        return listGroupItem;
    }

    /**
     * Set the ListGroup Item as Enabled
     * @date 03/12/2022 - 10:14:08
     *
     * @public
     * @param {(string | HTMLElement)} element
     * @returns {HTMLElement}
     */
    public enableItem(element: string | HTMLElement): HTMLElement {
        const listGroupItem: HTMLElement = typeof element === "string" ? this.elements.get(element) : element;
        (listGroupItem) && this.classes(listGroupItem, this.$clsActions.remove, "disabled") && this.aria(listGroupItem, { "disabled": this.$cls.DELETE });
        return listGroupItem;
    }

    /**
     * Set the Item as Actionable. Hover State is set
     * @date 03/12/2022 - 10:14:18
     *
     * @public
     * @param {(string | HTMLElement)} element
     * @param {boolean} actionable
     * @returns {HTMLElement}
     */
    public setItemActionState(element: string | HTMLElement, actionable: boolean): HTMLElement {
        const listGroupItem: HTMLElement = typeof element === "string" ? this.elements.get(element) : element;
        (listGroupItem) && this.classes(listGroupItem, actionable ? this.$clsActions.add : this.$clsActions.remove, "list-group-item-action");
        return listGroupItem;
    }

    /**
     * Set the Item Context Style class
     * @date 03/12/2022 - 10:15:58
     *
     * @public
     * @param {(string | HTMLElement)} element
     * @param {Mrbr_UI_Bootstrap_Controls_ListGroup} style
     * @returns {HTMLElement}
     */
    public setItemContextStyle(element: string | HTMLElement, style: Mrbr_UI_Bootstrap_Controls_ListGroup$ContextualStyles): HTMLElement {
        const listGroupItem: HTMLElement = typeof element === "string" ? this.elements.get(element) : element;
        Reflect.ownKeys(this.$lgcs).forEach(key => {
            const _style: string = this.$lgcs[key as keyof typeof this.$lgcs];
            (listGroupItem) && this.classes(listGroupItem, this.$clsActions.remove, _style);
        });
        (listGroupItem) && this.classes(listGroupItem, this.$clsActions.add, style);
        return listGroupItem;
    }

    /**
     * Add Click Handler to ListGroup. The Click Event is fired on the ListGroup Item 
     * @date 03/12/2022 - 16:54:06
     *
     * @public
     * @param {((event: Mrbr_System_Events_Event<any>) => void | number)} callback
     * @returns {number}
     */
    public onClick(callback: (event: Mrbr_System_Events_Event<any>) => void | number): number {
        return this.addDeferredOnMountFn(
            this.$cls.LISTGROUP_CLICK_EVENT,
            "click",
            this.rootElement,
            this.click_handler,
            this,
            callback);
    }

    /**
     * Click Handler for the ListGroup Item Click Event
     * @date 03/12/2022 - 16:54:33
     *
     * @private
     * @param {MouseEvent} event
     * @returns {(void | number)}
     */
    private click_handler(event: MouseEvent): void | number {
        const target: HTMLElement = event.target as HTMLElement,
            dataAttributeName = this.$cls.LISTITEM_TYPE_DATA_ATTRIBUTE,
            bsc = this.$mrbrInstance.host["Mrbr"].UI.Bootstrap.Controls,
            lge = bsc.ListGroupEvent as typeof Mrbr_UI_Bootstrap_Controls_ListGroupEvent,
            lged = bsc.ListGroupEventData as typeof Mrbr_UI_Bootstrap_Controls_ListGroupEventData;
        let listGroupItem: HTMLElement;
        if (target.hasAttribute(dataAttributeName)) { listGroupItem = target; }
        else { listGroupItem = target.closest(`[${dataAttributeName}]`); }
        if (!listGroupItem) { return; }
        event.stopPropagation();
        return this.eventSubscribers.raise(this.$cls.LISTGROUP_CLICK_EVENT,
            new lge(this.$cls.LISTGROUP_CLICK_EVENT, this, new lged(event, target, listGroupItem.dataset.mrbrId)));
    }
}