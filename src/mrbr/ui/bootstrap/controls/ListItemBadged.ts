export class Mrbr_UI_Bootstrap_Controls_ListItemBadged {
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
