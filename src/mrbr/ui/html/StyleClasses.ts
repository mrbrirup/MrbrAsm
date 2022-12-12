
/**
 * @fileoverview Defines the style classes used by the HTML UI.
 * @date 31/10/2022 - 14:47:40
 *
 * @export
 * @class Mrbr_UI_Html_StyleClasses
 * @typedef {Mrbr_UI_Html_StyleClasses}
 */
export class Mrbr_UI_Html_StyleClasses {
    constructor() { }
    //#region Static Methods
    /**
     * Adds a class to the target element.
     * @date 31/10/2022 - 14:48:39
     *
     * @static
     * @param {HTMLElement} target
     * @param {string} className
     */
    static addClassToElement(target: HTMLElement, className: string) {
        (!Mrbr_UI_Html_StyleClasses.hasClass(target, className)) && (target.classList.add(className));
    }

    /**
     * Adds classes to the target element.
     * @date 31/10/2022 - 14:48:49
     *
     * @static
     * @param {HTMLElement} target
     * @param {(string | Array<string> | DOMTokenList)} classes
     */
    static addClasses(target: HTMLElement, classes: string | Array<string> | DOMTokenList) {
        const self_addClassToElement = Mrbr_UI_Html_StyleClasses.addClassToElement;
        if (typeof classes === 'string') {
            if (classes.length === 0) { return; }
            let classNames = classes.split(" ");
            for (let classCounter = 0; classCounter < classNames.length; classCounter++) {
                const className = classNames[classCounter].trim();
                (className.length > 0) && (self_addClassToElement(target, className))
            }
        }
        else if (Array.isArray(classes)) {
            if (classes.length === 0) { return; }
            for (let classCounter = 0; classCounter < classes.length; classCounter++) {
                const className = classes[classCounter].trim();
                (className.length > 0) && (self_addClassToElement(target, className));
            }
        }
        else if (Object.prototype.toString.call(classes).toLowerCase().includes("domtokenlist")) {
            if ((classes as DOMTokenList).length === 0) { return; }
            (classes as DOMTokenList).forEach(className => self_addClassToElement(target, className));
        }
    }

    /**
     * Checks if the target element has the specified class.
     * @date 31/10/2022 - 14:49:12
     *
     * @static
     * @param {HTMLElement} target
     * @param {string} className
     * @returns {*}
     */
    static hasClass(target: HTMLElement, className: string) { return target.classList.contains(className); }

    /**
     * Removes a class from the target element.
     * @date 31/10/2022 - 14:49:27
     *
     * @static
     * @param {HTMLElement} target
     * @param {string} className
     */
    static removeClass(target: HTMLElement, className: string) {
        className.split(" ")
            .map(_className => _className.trim())
            .filter(_className => _className.length > 0)
            .forEach(_className => (Mrbr_UI_Html_StyleClasses.hasClass(target, _className)) && (target.classList.remove(_className)));
    }

    /**
     * Toggles a class on target element.
     * @date 31/10/2022 - 14:49:42
     *
     * @static
     * @param {HTMLElement} target
     * @param {string} className
     */
    static toggleClass(target: HTMLElement, className: string) {
        const self = Mrbr_UI_Html_StyleClasses;
        if (self.hasClass(target, className)) { self.removeClass(target, className); }
        else { self.addClassToElement(target, className); }
    }
    //#endregion Static Methods
}