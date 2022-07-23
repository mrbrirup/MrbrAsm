export class Mrbr_UI_Html_StyleClasses {
    constructor() { }
    static addClassToElement(target: HTMLElement, className: string) {
        const self = Mrbr_UI_Html_StyleClasses;
        if (!self.hasClass(target, className)) {
            target.classList.add(className);
        }
    }
    static addClasses(target: HTMLElement, classes: string | Array<string> | DOMTokenList) {
        const self = Mrbr_UI_Html_StyleClasses,
            self_addClassToElement = self.addClassToElement;
        if (typeof classes === 'string') {
            if (classes.length === 0) { return; }
            let classNames = classes.split(" ");
            for (let classCounter = 0; classCounter < classNames.length; classCounter++) {
                const className = classNames[classCounter].trim();
                if (className.length > 0) {
                    self_addClassToElement(target, className);
                }
            }
        }
        else if (Array.isArray(classes)) {
            if (classes.length === 0) { return; }
            for (let classCounter = 0; classCounter < classes.length; classCounter++) {
                const className = classes[classCounter].trim();
                if (className.length > 0) {
                    self_addClassToElement(target, className);
                }
            }
        }
        else if (Object.prototype.toString.call(classes).toLowerCase().includes("domtokenlist")) {
            if ((classes as DOMTokenList).length === 0) { return; }
            (classes as DOMTokenList).forEach(className => self_addClassToElement(target, className));
        }
    }
    static hasClass(target: HTMLElement, className: string) {
        return target.classList.contains(className);
    }
    static removeClass(target: HTMLElement, className: string) {
        const self = Mrbr_UI_Html_StyleClasses;
        if (self.hasClass(target, className)) {
            target.classList.remove(className)
        };
    }
    static toggleClass(target: HTMLElement, className: string) {
        const self = Mrbr_UI_Html_StyleClasses;
        if (self.hasClass(target, className)) {
            target.classList.remove(className)
        }
        else {
            target.classList.add(className)
        }
    }
}