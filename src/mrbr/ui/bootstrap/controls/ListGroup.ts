import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";

export class Mrbr_UI_Bootstrap_Controls_ListGroup extends Mrbr_UI_Controls_Control {
    public static readonly LISTGROUP_NAME: string = "listgroup";
    public static readonly LISTGROUP_ITEM_NAME: string = "listgroup_item";
    public static readonly LISTGROUP_ITEM_BADGE_NAME: string = "listgroup_item_badge";
    public static readonly LISTGROUP_ITEM_CHECKBOX_NAME: string = "listgroup_item_checkbox";
    public static readonly LISTGROUP_ITEM_CONTROL_LABEL_NAME: string = "listgroup_item_control_label";
    public static readonly LISTGROUP_ITEM_RADIO_NAME: string = "listgroup_item_radio";
    public static HorizontalStyles = {
        sm: "list-group-horizontal-sm",
        md: "list-group-horizontal-md",
        lg: "list-group-horizontal-lg",
        xl: "list-group-horizontal-xl",
        xxl: "list-group-horizontal-xxl",
        default: "list-group-horizontal",
        none: ""
    } as const;

    public static ContextualStyles = {
        primary: "list-group-item-primary",
        secondary: "list-group-item-secondary",
        success: "list-group-item-success",
        danger: "list-group-item-danger",
        warning: "list-group-item-warning",
        info: "list-group-item-info",
        light: "list-group-item-light",
        dark: "list-group-item-dark",
        none: ""
    } as const;


    public static BadgedListItem = class {
        _badgeElement: HTMLElement;
        _textElement: HTMLElement;
        _listItem: HTMLElement;
        constructor(listItem: HTMLElement, textElement: HTMLElement, badgeElement: HTMLElement) {
            this._listItem = listItem;
            this._textElement = textElement;
            this._badgeElement = badgeElement;
        }
        public get badgeElement(): HTMLElement { return this._badgeElement; }
        public set badgeElement(value: HTMLElement) { this._badgeElement = value; }
        public get listItem(): HTMLElement { return this._listItem; }
        public set listItem(value: HTMLElement) { this._listItem = value; }
        public get textElement(): HTMLElement { return this._textElement; }
        public set textElement(value: HTMLElement) { this._textElement = value; }
    }

    private _equalWidth: boolean = false;
    private _flush: boolean = false;
    private _orderedList: boolean = false;
    private _numberedList: boolean = false;
    private _horizontal: typeof Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles] = Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles.none;
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_ListGroup { return Mrbr_UI_Bootstrap_Controls_ListGroup; }


    constructor(rootElementName: string, orderedList: boolean = false) {
        super(rootElementName);
        this._orderedList = orderedList;
    }



    public get equalWidth(): boolean { return this._equalWidth; }
    public set equalWidth(value: boolean) {
        const self = this;
        (self.horizontal !== self.$cls.HorizontalStyles.none) && Reflect.ownKeys(self.elements).forEach((key) => {
            const element = self.elements[key as string];
            if (element && element.dataset.mrbrListItemType === "list-group-item") {
                self.classes(element, value ? self.$clsActions.Add : self.$clsActions.Remove, "flex-fill");
            }
        });
        this._equalWidth = value;
    }
    public get flush(): boolean { return this._flush; }
    public set flush(value: boolean) {
        const self = this;
        self.classes(self.rootElement, value ? self.$clsActions.Add : self.$clsActions.Remove, "list-group-flush");
        self._flush = value;
    }
    public get horizontal(): typeof Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles] { return this._horizontal; }
    public set horizontal(value: typeof Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_ListGroup.HorizontalStyles]) {
        const self = this;
        self.rootElement && (self.classes(self.rootElement, self.$clsActions.Remove, self._horizontal)) && self.classes(self.rootElement, self.$clsActions.Add, value);
        self._horizontal = value;
        self.equalWidth = self._equalWidth;
    }
    public get numberedList(): boolean { return this._numberedList; }
    public set numberedList(value: boolean) {
        const self = this;
        self._numberedList = value;
        self.classes(self.rootElement, value ? self.$clsActions.Add : self.$clsActions.Remove, "list-group-numbered");
    }
    public get orderedList(): boolean { return this._orderedList; }



    public initialise(...args): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_ListGroup> {
        const self = this,
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroup>("Mrbr_UI_Bootstrap_Controls_ListGroup:initilise");
        super.initialise(args).then(async _ => {
            await self.setDefaultConfig();

            self.createElement(new self.$ctrlCfg(self.rootElementName, self.orderedList === true ? "ol" : "ul", self.configuration(self.$cls.LISTGROUP_NAME)));

            self.flush = self._flush;
            self.numberedList = self._numberedList;
            self.horizontal = self._horizontal;

            initialisePromise.resolve(self);
        });
        return initialisePromise;
    }
    setDefaultConfig(): Mrbr_System_MrbrPromise<Mrbr_UI_Bootstrap_Controls_ListGroup> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_ListGroup>("Mrbr_UI_Bootstrap_Controls_ListGroup:setDefaultConfig");
        super.setDefaultConfig().then(async _ => {
            !self.hasConfiguration[self.$cls.LISTGROUP_NAME] && self.defaultConfig.add(self.$cls.LISTGROUP_NAME, new self.$ctrlPrm().Classes("list-group"));
            !self.hasConfiguration[self.$cls.LISTGROUP_ITEM_NAME] && self.defaultConfig.add(self.$cls.LISTGROUP_ITEM_NAME, new self.$ctrlPrm()
                .Classes("list-group-item")
                .Data({ mrbrListItemType: "list-group-item" })
            );
            !self.hasConfiguration[self.$cls.LISTGROUP_ITEM_BADGE_NAME] && self.defaultConfig.add(self.$cls.LISTGROUP_ITEM_BADGE_NAME, new self.$ctrlPrm()
                .Classes("badge bg-primary rounded-pill")
            );
            !self.hasConfiguration[self.$cls.LISTGROUP_ITEM_CHECKBOX_NAME] && self.defaultConfig.add(self.$cls.LISTGROUP_ITEM_CHECKBOX_NAME, new self.$ctrlPrm()
                .Classes("form-check-input me-1")
                .Attributes({ type: "checkbox", value: "" })
            );
            !self.hasConfiguration[self.$cls.LISTGROUP_ITEM_RADIO_NAME] && self.defaultConfig.add(self.$cls.LISTGROUP_ITEM_RADIO_NAME, new self.$ctrlPrm()
                .Classes("form-check-input me-1")
                .Attributes({ type: "radio", value: "" })
            );
            !self.hasConfiguration[self.$cls.LISTGROUP_ITEM_CONTROL_LABEL_NAME] && self.defaultConfig.add(self.$cls.LISTGROUP_ITEM_CONTROL_LABEL_NAME, new self.$ctrlPrm()
                .Classes("form-check-label stretched-link")

            );

            setDefaultConfigPromise.resolve(self);
        });
        return setDefaultConfigPromise;
    }




    public addItem(id: string, text: string, actionable: boolean = false): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = <HTMLElement>self.createElement(new self.$ctrlCfg(id, "li", self.configuration(self.$cls.LISTGROUP_ITEM_NAME))
            );
        text && (listGroupItem.innerText = text);
        self.setItemActionState(listGroupItem, actionable);
        self.rootElement.appendChild(listGroupItem);
        return listGroupItem;
    }


    public addCheckBoxItem(id: string, text: string, checked: boolean = false, actionable: boolean = false): HTMLElement {
        const
            self = this,
            listGroupItem: HTMLElement = self.addItem(id, null, actionable),
            checkBoxId = self.$cls.createId("checkbox"),
            checkbox = <HTMLElement>self.createElement(new self.$ctrlCfg(checkBoxId, "input", self.configuration(self.$cls.LISTGROUP_ITEM_CHECKBOX_NAME)
                .Id(checkBoxId)
                .Properties({ checked: checked }))),
            label = <HTMLElement>self.createElement(new self.$ctrlCfg(`${checkBoxId}_label`, "label", self.configuration(self.$cls.LISTGROUP_ITEM_CONTROL_LABEL_NAME)));
        self.elementAttributes(label, { "for": checkBoxId });
        label.innerText = text;
        self.elementChildren(listGroupItem, [checkbox, label]);
        return listGroupItem;
    }

    public addRadioItem(id: string, text: string, checked: boolean = false, actionable: boolean = false): HTMLElement {
        const
            self = this,
            listGroupItem: HTMLElement = self.addItem(id, null, actionable),
            radioId = self.$cls.createId("radio"),
            radio = <HTMLElement>self.createElement(new self.$ctrlCfg(radioId, "input", self.configuration(self.$cls.LISTGROUP_ITEM_RADIO_NAME)
                .Id(radioId)
                .Properties({ checked: checked, name: self.rootElement.id }))),
            label = <HTMLElement>self.createElement(new self.$ctrlCfg(`${radioId}_label`, "label", self.configuration(self.$cls.LISTGROUP_ITEM_CONTROL_LABEL_NAME)));
        self.elementAttributes(label, { "for": radioId });
        label.innerText = text;
        self.elementChildren(listGroupItem, [radio, label]);
        return listGroupItem;
    }



    public addBadgedItem(id: string, text: string, badgeText: string, actionable: boolean = false): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_ListGroup.BadgedListItem> {
        const self = this,
            listGroupItem: HTMLElement = self.addItem(id, null, actionable),
            textItem: HTMLElement = <HTMLElement>self.createElement(new self.$ctrlCfg(`${id}_text`, "span")),
            badgedItem: HTMLElement = <HTMLElement>self.createElement(new self.$ctrlCfg(`${id}_badge`, "span", self.configuration(self.$cls.LISTGROUP_ITEM_BADGE_NAME))),
            returnValue = new self.$cls.BadgedListItem(listGroupItem, textItem, badgedItem);
        self.customContentContainerItem(listGroupItem, true);
        self.classes(textItem, self.$clsActions.Add, "ms-2 me-auto");
        listGroupItem.appendChild(textItem)
        listGroupItem.appendChild(badgedItem)
        textItem.innerText = text;
        badgedItem.innerText = badgeText;
        return returnValue;
    }


    public removeItem(element: string | HTMLElement): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = typeof element === "string" ? self.elements[element] : element;
        self.elements[listGroupItem.id] = self.$cls.DELETE_ENTRY;
        (listGroupItem) && self.rootElement.removeChild(listGroupItem);
        return listGroupItem;
    }
    public customContentContainerItem(element: string | HTMLElement, customContentContainer: boolean, defaultText?: string): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = typeof element === "string" ? self.elements[element] : element;
        (listGroupItem) && self.classes(listGroupItem, customContentContainer ? self.$clsActions.Add : self.$clsActions.Remove, "d-flex justify-content-between align-items-start");
        (listGroupItem && defaultText) && (listGroupItem.innerText = defaultText);
        return listGroupItem;
    }
    public setActiveItem(element: string | HTMLElement): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = typeof element === "string" ? self.elements[element] : element;
        Reflect.ownKeys(self.elements).forEach(key => {
            const _element: HTMLElement = self.elements[key as string];
            _element.dataset?.mrbrListItemType === "list-group-item" && self.classes(_element, self.$clsActions.Remove, "active");
            self.elementAria(_element, { "current": self.$cls.DELETE });
        });
        (listGroupItem) && self.classes(listGroupItem, self.$clsActions.Add, "active") && self.elementAria(listGroupItem, { "current": true });
        return listGroupItem;
    }
    public disableItem(element: string | HTMLElement): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = typeof element === "string" ? self.elements[element] : element;
        (listGroupItem) && self.classes(listGroupItem, self.$clsActions.Add, "disabled") && self.elementAria(listGroupItem, { "disabled": true });
        return listGroupItem;
    }
    public enableItem(element: string | HTMLElement): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = typeof element === "string" ? self.elements[element] : element;
        (listGroupItem) && self.classes(listGroupItem, self.$clsActions.Remove, "disabled") && self.elementAria(listGroupItem, { "disabled": self.$cls.DELETE });
        return listGroupItem;
    }

    public setItemActionState(element: string | HTMLElement, actionable: boolean): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = typeof element === "string" ? self.elements[element] : element;
        (listGroupItem) && self.classes(listGroupItem, actionable ? self.$clsActions.Add : self.$clsActions.Remove, "list-group-item-action");
        return listGroupItem;
    }
    public setItemContextStyle(element: string | HTMLElement, style: typeof Mrbr_UI_Bootstrap_Controls_ListGroup.ContextualStyles[keyof typeof Mrbr_UI_Bootstrap_Controls_ListGroup.ContextualStyles]): HTMLElement {
        const self = this,
            listGroupItem: HTMLElement = typeof element === "string" ? self.elements[element] : element;
        Reflect.ownKeys(self.$cls.ContextualStyles).forEach(key => {
            const _style: string = self.$cls.ContextualStyles[key as keyof typeof self.$cls.ContextualStyles];
            (listGroupItem) && self.classes(listGroupItem, self.$clsActions.Remove, _style);
        });
        (listGroupItem) && self.classes(listGroupItem, self.$clsActions.Add, style);
        return listGroupItem;
    }
}