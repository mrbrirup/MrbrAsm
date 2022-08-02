type Mrbr_UI_Bootstrap_Controls_ControlConfig$OptionalParameters = {
    id?: string;
    classes?: Array<string> | string;
    attributes?: object;
    data?: object;
    properties?: object;
    styles?: object;
    children?: (Mrbr_UI_Bootstrap_Controls_ControlConfig | HTMLElement)[]
}
export class Mrbr_UI_Bootstrap_Controls_ControlConfig {
    private _elementName: string;
    private _elementType: string;
    private _id: string;
    private _classes: Array<string> | string;
    private _attributes: object;
    private _data: object;
    private _children:  (Mrbr_UI_Bootstrap_Controls_ControlConfig | HTMLElement)[];
    private _properties: object;
    private _styles: object;
    constructor(elementName: string, elementType: string, optionalParameters?: Mrbr_UI_Bootstrap_Controls_ControlConfig$OptionalParameters) {
        const self = this;
        self.elementName = elementName;
        self.elementType = elementType;
        self.id = optionalParameters?.id;
        self.classes = optionalParameters?.classes;
        self.attributes = optionalParameters?.attributes;
        self.data = optionalParameters?.data;
        self.properties = optionalParameters?.properties;
        self.styles = optionalParameters?.styles
        self.children = optionalParameters?.children
    }
    public get styles(): object {
        return this._styles;
    }
    public set styles(value: object) {
        this._styles = value;
    }
    public get properties(): object {
        return this._properties;
    }
    public set properties(value: object) {
        this._properties = value;
    }
    public get elementName(): string {
        return this._elementName;
    }
    public set elementName(value: string) {
        this._elementName = value;
    }
    public get elementType(): string {
        return this._elementType;
    }
    public set elementType(value: string) {
        this._elementType = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get classes(): Array<string> | string {
        return this._classes;
    }
    public set classes(value: Array<string> | string) {
        this._classes = value;
    }
    public get attributes(): object {
        return this._attributes;
    }
    public set attributes(value: object) {
        this._attributes = value;
    }
    public get data(): object {
        return this._data;
    }
    public set data(value: object) {
        this._data = value;
    }
    public get children():  (Mrbr_UI_Bootstrap_Controls_ControlConfig | HTMLElement)[] {
        return this._children;
    }
    public set children(value:  (Mrbr_UI_Bootstrap_Controls_ControlConfig | HTMLElement)[]) {
        this._children = value;
    }
}
