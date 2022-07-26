/// <reference types="web" />
import { Mrbr_System_Collections_KeyValuePair } from '../../system/collections/keyvaluepair';
export declare class Mrbr_UI_Html_BaseElement {
    _element: HTMLElement;
    childElements: Array<any>;
    constructor(...args: any[]);
    createElement(elementType: string): Mrbr_UI_Html_BaseElement;
    addClassToElement(target: HTMLElement, className: string): void;
    addClasses(classes: string | Array<string> | DOMTokenList): void;
    hasClass(target: HTMLElement, className: string): boolean;
    setAttributes(attributes: Array<Mrbr_System_Collections_KeyValuePair<string>>): void;
    addChild(element: any): this;
    addChildren(elements: any): this;
    shiftChild(element: any): this;
    shiftChildren(elements: any): this;
    setAttribute(name: any, value: any): void;
    getAttribute(name: any): string;
    get element(): HTMLElement;
    set element(value: HTMLElement);
    get id(): string;
    set id(value: string);
    get accessKey(): string;
    set accessKey(value: string);
    get class(): DOMTokenList;
    set class(value: string | Array<string> | DOMTokenList);
    get contentEditable(): string;
    set contentEditable(value: string);
    get dir(): string;
    set dir(value: string);
    get draggable(): boolean;
    set draggable(value: boolean);
    get dropzone(): string;
    set dropzone(value: string);
    get hidden(): boolean;
    set hidden(value: boolean);
    get lang(): string;
    set lang(value: string);
    get style(): CSSStyleDeclaration;
    clearStyle(name: string): void;
    setStyle(styleValues: Mrbr_System_Collections_KeyValuePair<string> | Array<Mrbr_System_Collections_KeyValuePair<string>>): void;
    get spellcheck(): boolean;
    set spellcheck(value: boolean);
    get tabIndex(): number;
    set tabIndex(value: number);
    get title(): string;
    set title(value: string);
    get translate(): boolean;
    set translate(value: boolean);
    get attributes(): NamedNodeMap;
    get childElementCount(): number;
    get childNodes(): NodeListOf<ChildNode>;
    get children(): HTMLCollection;
    get classList(): DOMTokenList;
    get className(): string;
    set className(value: string);
    get clientHeight(): number;
    get clientLeft(): number;
    get clientTop(): number;
    get clientWidth(): number;
    get firstChild(): ChildNode;
    get firstElementChild(): Element;
    get innerHTML(): string;
    set innerHTML(value: string);
    get innerText(): string;
    set innerText(value: string);
    get isContentEditable(): boolean;
    get lastChild(): ChildNode;
    get lastElementChild(): Element;
    get namespaceURI(): string;
    get nextSibling(): ChildNode;
    get nextElementSibling(): Element;
    get nodeName(): string;
    get nodeType(): number;
    get nodeValue(): number;
    get offsetHeight(): number;
    get offsetWidth(): number;
    get offsetLeft(): number;
    get offsetParent(): Element;
    get offsetTop(): number;
    get ownerDocument(): Document;
    get parentNode(): ParentNode;
    get parentElement(): HTMLElement;
    get previousSibling(): ChildNode;
    get previousElementSibling(): Element;
    get scrollHeight(): number;
    get scrollLeft(): number;
    set scrollLeft(value: number);
    get scrollTop(): number;
    set scrollTop(value: number);
    get scrollWidth(): number;
    get tagName(): string;
    get textContent(): string;
    set textContent(value: string);
    addEventListener(eventName: any, fn: any, capture?: boolean): void;
    appendChild(node: any): void;
    prepend(node: any): void;
    blur(): void;
    click(): void;
    cloneNode(cloneChildren: any): Node;
    compareDocumentPosition(node: any): number;
    contains(node: any): boolean;
    exitFullscreen(): void;
    focus(): void;
    getAttributeNode(name: any): Attr;
    getBoundingClientRect(): DOMRect;
    getElementsByClassName(className: any): HTMLCollectionOf<Element>;
    getElementsByTagName(name: any): HTMLCollectionOf<any>;
    hasAttribute(name: any): boolean;
    hasAttributes(): boolean;
    hasChildNodes(): boolean;
    insertAdjacentElement(position: any, node: any): void;
    insertAdjacentHTML(position: any, node: any): void;
    insertAdjacentText(position: any, node: any): void;
    insertBefore(newnode: any, existingnode: any): void;
    isDefaultNamespace(namespace: any): boolean;
    isEqualNode(node: any): boolean;
    isSameNode(node: any): boolean;
    normalize(): void;
    querySelector(selectors: any): any;
    querySelectorAll(selectors: any): NodeListOf<any>;
    removeAttribute(attributename: any): void;
    removeAttributeNode(attributenode: any): void;
    removeChild(node: any): void;
    removeEventListener(event: any, fn: any, useCapture: any): void;
    replaceChild(newnode: any, oldnode: any): void;
    requestFullscreen(): void;
    scrollIntoView(): void;
    setAttributeNode(attributenode: any): void;
    toString(): string;
}
