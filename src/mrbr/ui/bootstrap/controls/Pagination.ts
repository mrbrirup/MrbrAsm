import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_Display } from "../utilities/display";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes } from "./PaginationButtonSizes";
import { Mrbr_UI_Bootstrap_Controls_PaginationEvent } from "./PaginationEvent";
import { Mrbr_UI_Bootstrap_Controls_PaginationEventData } from "./PaginationEventData";
import { Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions } from "./PaginationJustifyPositions";

export class Mrbr_UI_Bootstrap_Controls_Pagination extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    //#endregion Public Static Constants

    /**
     * Internal Nav Element Name
     * @date 09/12/2022 - 02:42:25
     *
     * @public
     * @static
     * @readonly
     * @type {"pagination"}
     */
    public static readonly PAGINATION_NAV_NAME = "pagination";

    /**
     * Internal Button Element Name
     * @date 09/12/2022 - 02:42:44
     *
     * @public
     * @static
     * @readonly
     * @type {"pagination_button"}
     */
    public static readonly PAGINATION_BUTTON_NAME = "pagination_button";

    /**
     * Internal List Element Name
     * @date 09/12/2022 - 02:42:52
     *
     * @public
     * @static
     * @readonly
     * @type {"pagination_list"}
     */
    public static readonly PAGINATION_LIST_NAME = "pagination_list";

    /**
     * Internal Previous Button Element Name
     * @date 09/12/2022 - 02:42:59
     *
     * @public
     * @static
     * @readonly
     * @type {"pagination_previous_button"}
     */
    public static readonly PAGINATION_PREVIOUS_BUTTON_NAME = "pagination_previous_button";

    /**
     * Internal Next Button Element Name
     * @date 09/12/2022 - 02:43:09
     *
     * @public
     * @static
     * @readonly
     * @type {"pagination_next_button"}
     */
    public static readonly PAGINATION_NEXT_BUTTON_NAME = "pagination_next_button";

    /**
     * Internal Page Button Element Name
     * @date 09/12/2022 - 02:43:16
     *
     * @public
     * @static
     * @readonly
     * @type {"pagination_button"}
     */
    public static readonly PAGINATION_PAGE_BUTTON_NAME = "pagination_button";

    /**
     * Internal Page Change Event Name
     * @date 09/12/2022 - 02:43:24
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PAGINATION_PAGE_CHANGE_EVENT: string = "pagination_page_change";

    /**
     * Internal Pagination Click Event Name
     * @date 09/12/2022 - 02:43:33
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PAGINATION_CLICK_EVENT: string = "pagination_click";
    //#endregion Public Static Constants

    //#region Type Aliases

    /**
     * Type Alias for Pagination Control    
     * @date 09/12/2022 - 02:44:05
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Pagination { return Mrbr_UI_Bootstrap_Controls_Pagination; }

    /**
     * Enum Alias for Pagination Control Justify Positions
     * @date 09/12/2022 - 02:44:22
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions}
     */
    public get $pjp(): typeof Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions { return this.$bsc.PaginationJustifyPositions as typeof Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions; }

    /**
     * Enum Alias for Pagination Control Button Sizes
     * @date 09/12/2022 - 02:44:42
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes}
     */
    public get $pbs(): typeof Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes { return this.$bsc.PaginationButtonSizes as typeof Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes; }

    /**
     * Type Alias for Pagination Control Event
     * @date 09/12/2022 - 02:44:50
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PaginationEvent}
     */
    public get $pge(): typeof Mrbr_UI_Bootstrap_Controls_PaginationEvent { return this.$bsc.PaginationEvent as typeof Mrbr_UI_Bootstrap_Controls_PaginationEvent; }

    /**
     * Type Alias for Pagination Control Event Data
     * @date 09/12/2022 - 02:45:05
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PaginationEventData}
     */
    public get $pged(): typeof Mrbr_UI_Bootstrap_Controls_PaginationEventData { return this.$bsc.PaginationEventData as typeof Mrbr_UI_Bootstrap_Controls_PaginationEventData; }

    /**
     * Type Alias for Bootstrap Display Utilities
     * @date 09/12/2022 - 02:45:13
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Utilities_Display}
     */
    public get $bud(): typeof Mrbr_UI_Bootstrap_Utilities_Display { return Mrbr_UI_Bootstrap_Utilities_Display; }
    //#endregion Type Aliases



    //#region Private Property Fields

    /**
     * Show/Hide Previous Button field 
     * @date 09/12/2022 - 02:45:58
     *
     * @private
     * @type {boolean}
     */
    private _showPrevious: boolean = true;

    /**
     * Show/Hide Next Button field
     * @date 09/12/2022 - 02:46:21
     *
     * @private
     * @type {boolean}
     */
    private _showNext: boolean = true;

    /**
     * Use Icon Buttons or Text field
     * @date 09/12/2022 - 02:46:29
     *
     * @private
     * @type {boolean}
     */
    private _useIconButtons: boolean = false;

    /**
     * Button Size field
     * @date 09/12/2022 - 02:46:43
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes}
     */
    private _buttonSize: Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes;

    /**
     * Number of Page Buttons field
     * @date 09/12/2022 - 02:46:52
     *
     * @private
     * @type {number}
     */
    private _pageButtonCount: number = 0;

    /**
     * Highest Navigable Page Number field
     * @date 09/12/2022 - 02:48:49
     *
     * @private
     * @type {number}
     */
    private _maxTotalPages: number = Number.MAX_SAFE_INTEGER;

    /**
     * Pagination Control Justify Position field
     * @date 09/12/2022 - 02:49:08
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions}
     */
    private _justifyPosition: Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions;
    //#endregion Private Property Fields




    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Pagination.
     * @date 09/12/2022 - 02:49:27
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) { super(rootElementName); }

    //#region Public Properties

    /**
     * Pagination Control Justify Position
     * @date 09/12/2022 - 02:51:42
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions}
     */
    public get justifyPosition(): Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions { return this._justifyPosition ??= this.$pjp.start }

    /**
     * Pagination Control Justify Position
     */
    public set justifyPosition(value: Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions) {
        const container = this.defaultContainerElement;
        (container) && (this.classes(container, this.$clsActions.replace, [this.justifyPosition, value]));
        this._justifyPosition = value;
    }

    /**
     * Pagination Button Sizes
     * @date 09/12/2022 - 02:52:16
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes}
     */
    public get buttonSize(): Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes { return this._buttonSize ??= this.$pbs.default }

    /**
     * Pagination Button Sizes
     */
    public set buttonSize(value: Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes) {
        const self = this,
            pbs = self.$pbs;
        if (self.defaultContainerElement) {
            self.defaultContainerElement.classList.remove(...Object.values(pbs).filter(value => value !== ""));
            value !== pbs.default && self.defaultContainerElement.classList.add(value);
        }
        this._buttonSize = value;
    }

    /**
     * Use Icon or Text Nevigation Buttons
     * @date 09/12/2022 - 02:52:51
     *
     * @public
     * @type {boolean}
     */
    public get useIconButtons(): boolean { return this._useIconButtons; }

    /**
     * Use Icon or Text Nevigation Buttons
     */
    public set useIconButtons(value: boolean) {
        this._useIconButtons = value;
        this.showPrevious = this._showPrevious;
        this.showNext = this._showNext;
    }

    /**
     * Show/Hide Previous Button
     * @date 09/12/2022 - 02:53:32
     *
     * @public
     * @type {boolean}
     */
    public get showPrevious(): boolean { return this._showPrevious; }

    /**
     * Show/Hide Previous Button
     */
    public set showPrevious(value: boolean) {
        const previousButton = this.createNavigationButton(value, this.$cls.PAGINATION_PREVIOUS_BUTTON_NAME, "Previous", 0, "&laquo;");
        previousButton && this.defaultContainerElement.prepend(previousButton);
    }

    /**
     * Show/Hide Next Button
     * @date 09/12/2022 - 02:53:45
     *
     * @public
     * @type {boolean}
     */
    public get showNext(): boolean { return this._showNext; }

    /**
     * Show/Hide Next Button
     */
    public set showNext(value: boolean) {
        this._showNext = value;
        const nextButton = this.createNavigationButton(value, this.$cls.PAGINATION_NEXT_BUTTON_NAME, "Next", Number.MAX_SAFE_INTEGER, "&raquo;");
        nextButton && this.defaultContainerElement.append(nextButton);
    }

    /**
     * Create Navigation Buttons for Next and Previous
     * @date 09/12/2022 - 02:54:04
     *
     * @private
     * @param {boolean} value
     * @param {string} buttonName
     * @param {string} label
     * @param {number} pageNumber
     * @param {string} iconText
     * @returns {HTMLElement}
     */
    private createNavigationButton(value: boolean, buttonName: string, label: string, pageNumber: number, iconText: string): HTMLElement {
        const
            container = this.defaultContainerElement,
            act = this.$clsActions;
        if (!container) { return null; }
        let navButton = this.elements.get(buttonName);
        if (!navButton && !value) { return null; }
        if (!navButton && value) {
            navButton = <HTMLElement>this.createElement(new this.$ctrlCfg(buttonName, this.$htmlt.li, this.elementConfig.getConfig(this.$cls.PAGINATION_BUTTON_NAME)
                .Aria({ label: label })
                .Data({ mrbrPaginationPage: pageNumber })
            ));
        }
        navButton.querySelector("a").innerHTML = this.useIconButtons ? `<span aria-hidden="true">${iconText}</span>` : label;
        this.classes(navButton, value ? act.remove : act.add, this.$bud.none);
        return navButton;
    }

    /**
     * Number of Page Buttons
     * @date 09/12/2022 - 02:54:38
     *
     * @public
     * @type {number}
     */
    public get pageButtonCount(): number { return this._pageButtonCount; }

    /**
     * Number of Page Buttons
     */
    public set pageButtonCount(value: number) {
        this._pageButtonCount = value;
        this.setActivePage(this.activePageNumber);
    }

    /**
     * Maximum Navigable Page Button
     * @date 09/12/2022 - 02:55:04
     *
     * @public
     * @type {number}
     */
    public get maxTotalPages(): number { return this._maxTotalPages; }

    /**
     * Maximum Navigable Page Button
     */
    public set maxTotalPages(value: number) { this._maxTotalPages = value; }

    //#endregion Public Properties




    //#region Public Methods

    /**
     * Initialise the Control, load manifest and set properties
     * @date 09/12/2022 - 02:55:31
     *
     * @public
     * @template T
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<T>}
     */
    public initialise<T>(...args): Mrbr_System_Promise<T> {
        const self = this,
            initialisePromise = self.$promise.create("initialise"),
            cls = self.$cls,
            ctrlCfg = self.$ctrlCfg;
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(cls);
                await self.setDefaultConfig();

                self.createElement(new ctrlCfg(self.rootElementName, this.$htmlt.nav, self.elementConfig.getConfig(cls.PAGINATION_NAV_NAME)
                    .Children(<HTMLElement>self.createElement(new ctrlCfg(cls.PAGINATION_LIST_NAME, this.$htmlt.ulist, self.elementConfig.getConfig(cls.PAGINATION_LIST_NAME))))
                ));

                self.defaultContainerElementName = self.$cls.PAGINATION_LIST_NAME;
                self.showPrevious = self.showPrevious;
                self.showNext = self.showNext;
                self.buttonSize = self.buttonSize;
                self.addDeferredOnMountFn(
                    cls.PAGINATION_CLICK_EVENT,
                    "click",
                    self.defaultContainerElement,
                    self.pagination_click_handler,
                    self,
                    null);
                this.addRange(1, self.pageButtonCount);
                initialisePromise.resolve(self);
            })
            .catch((error) => {
                initialisePromise.reject(error);
            });
        return initialisePromise;
    }

    /**
     * Set Default Config
     * @date 09/12/2022 - 02:59:18
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Pagination>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Pagination> {
        const
            cls = this.$cls,
            controlName = cls[this.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = this.$promise.create(`${controlName}:setDefaultConfig`),
            ctrlPrm = this.$ctrlPrm;
        super.setDefaultConfig()
            .then(async _ => {
                const eCfg = this.elementConfig,
                    sine = eCfg.setIfNotExist.bind(eCfg);
                eCfg.controlName(controlName);
                sine(cls.PAGINATION_NAV_NAME, new ctrlPrm()
                    .Classes("pagination")
                    .Aria({ label: "Pagination" }));
                sine(cls.PAGINATION_LIST_NAME, new ctrlPrm()
                    .Classes("pagination"));
                sine(cls.PAGINATION_BUTTON_NAME, new ctrlPrm()
                    .Classes("page-item")
                    .Template(`<a class="page-link" href="#"></a>`));
                setDefaultConfigPromise.resolve(this);
            })
            .catch((error) => {
                setDefaultConfigPromise.reject(error);
            });
        return setDefaultConfigPromise;
    }

    /**
     * Pagination Click Handler - Handles the click event on the page or navigation buttons
     * @date 09/12/2022 - 02:59:29
     *
     * @private
     * @param {Event} event
     */
    private pagination_click_handler(event: Event): void {
        const
            target = <HTMLElement>event.target,
            currentPage = this.activePageNumber;
        event.stopPropagation();
        let page = parseInt(target.dataset.mrbrPaginationPage || (<HTMLElement>target.closest("li[data-mrbr-pagination-page]")).dataset.mrbrPaginationPage);
        if (page === Number.MAX_SAFE_INTEGER && this.activePageNumber < this.maxTotalPages) { page = this.activePageNumber + 1; }
        else if (page === 0 && this.activePageNumber > 1) { page = this.activePageNumber - 1; }
        page && (0 < page && page < Number.MAX_SAFE_INTEGER) && this.setActivePage(page, event);
    }

    /**
     * Subscribe to the Page Change Event
     * @date 09/12/2022 - 03:00:13
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_PaginationEvent) => void | number)} callback
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public onPageChange(callback: (event: Mrbr_UI_Bootstrap_Controls_PaginationEvent) => void | number): Mrbr_UI_Bootstrap_Controls_Pagination {
        if (typeof callback === "number") { this.eventSubscribers.remove(this.$cls.PAGINATION_PAGE_CHANGE_EVENT, callback); }
        else if (typeof callback === "function") { this.eventSubscribers.add(this.$cls.PAGINATION_PAGE_CHANGE_EVENT, callback); }
        return this;
    }

    /**
     * Add Page to the Pagination Control
     * @date 09/12/2022 - 03:00:27
     *
     * @public
     * @param {number} pageNumber
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public addPage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const
            buttonName = `${this.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`,
            container = this.defaultContainerElement,
            firstFoundPage = 0;
        if (!container || this.elements.get(buttonName)) { return this; }
        const pageButton = <HTMLElement>this.createElement(new this.$ctrlCfg(buttonName, "li", this.elementConfig.getConfig(this.$cls.PAGINATION_BUTTON_NAME)
            .Aria({ label: `Page ${pageNumber}` })
            .Data({ mrbrPaginationPage: pageNumber })
        ));
        pageButton.querySelector("a").innerHTML = `${pageNumber}`;
        const elements = Array.from(container.children).filter(element => parseInt((<HTMLElement>element).dataset.mrbrPaginationPage) > pageNumber).sort((a, b) => parseInt((<HTMLElement>a).dataset.mrbrPaginationPage) - parseInt((<HTMLElement>b).dataset.mrbrPaginationPage));
        (elements.length === 0) ? container.append(pageButton) : container.insertBefore(pageButton, elements[firstFoundPage]);
        return this;
    }

    /**
     * Remove Page from the Pagination Control
     * @date 09/12/2022 - 03:00:58
     *
     * @public
     * @param {number} pageNumber
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public removePage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const container = this.defaultContainerElement;
        if (!container) { return this; }
        const buttonName = `${this.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`,
            elements = this.elements;
        if (!elements.has(buttonName)) { return this; }
        container.removeChild(elements.get(buttonName));
        elements.remove(buttonName);
        return this;
    }

    /**
     * Clear all Pages from the Pagination Control
     * @date 09/12/2022 - 03:01:11
     *
     * @public
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public clearPages(): Mrbr_UI_Bootstrap_Controls_Pagination {
        const container = this.defaultContainerElement;
        if (!container) { return this; }
        const
            elements: Array<HTMLElement> = this.pageElements(),
            buttonName = this.$cls.PAGINATION_PAGE_BUTTON_NAME;
        for (let elementCounter = 0; elementCounter < elements.length; elementCounter++) {
            const
                element = <HTMLElement>elements[elementCounter],
                page = element.dataset?.mrbrPaginationPage;
            if (!page) { continue; }
            container.removeChild(element);
            this.elements.remove(`${buttonName}_${page}`);
        }
        return this;
    }

    /**
     * Add a Range of Pages to the Pagination Control
     * @date 09/12/2022 - 03:01:23
     *
     * @public
     * @param {number} startPage
     * @param {number} endPage
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public addRange(startPage: number, endPage: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const container = this.defaultContainerElement;
        if (!container) { return this; }
        for (let page = startPage; page <= endPage; page++) { this.addPage(page); }
        return this;
    }

    /**
     * Get Lowest Page Number from the Pagination Control Page buttons
     * @date 09/12/2022 - 03:01:31
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get minPageNumber(): number {
        if (!this.defaultContainerElement) { return 0; }
        let pageNumbers = this.pageNumbers();
        return (pageNumbers?.length || 0 === 0) ? 0 : Math.min(...pageNumbers);
    }

    /**
     * Get Highest Page Number from the Pagination Control Page buttons
     * @date 09/12/2022 - 03:01:54
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get maxPageNumber(): number {
        if (!this.defaultContainerElement) { return 0; }
        let pageNumbers = this.pageNumbers();
        return (pageNumbers?.length || 0 === 0) ? 0 : Math.max(...pageNumbers);
    }

    /**
     * Get Page Numbers from the Pagination Control Page buttons
     * @date 09/12/2022 - 03:02:06
     *
     * @public
     * @returns {Array<number>}
     */
    public pageNumbers(): Array<number> {
        if (!this.defaultContainerElement) { return []; }
        let elements = this.pageElements();
        return ((elements?.length || 0) === 0) ? [] : elements.map(element => parseInt((<HTMLElement>element).dataset.mrbrPaginationPage)).sort((a, b) => a - b);
    }

    /**
     * Set the Active Page Number
     * @date 09/12/2022 - 03:02:16
     *
     * @public
     * @param {number} pageNumber
     * @param {?Event} [event]
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public setActivePage(pageNumber: number, event?: Event): Mrbr_UI_Bootstrap_Controls_Pagination {
        const container = this.defaultContainerElement;
        if (!container) { return this; }
        const
            self = this,
            currentPage = self.activePageNumber,
            pageNumbers = self.pageNumbers(),
            pbc = self.pageButtonCount,
            centre = Math.floor(pbc / 2),
            maxTotalPages = self.maxTotalPages;
        let left = pageNumber - centre + (centre === (pbc / 2) ? 1 : 0),
            right = pageNumber + centre;
        if (left < 1) {
            right += Math.abs(left) + 1;
            left = 1;
        }
        if (right > maxTotalPages) {
            left -= right - maxTotalPages;
            right = maxTotalPages;
        }
        pageNumbers.filter(pageNumber => pageNumber < left || pageNumber > right).forEach(pageNumber => self.removePage(pageNumber));
        self.addRange(left, right);
        const
            elements = self.pageElements(),
            requestedElement = elements.find(element => parseInt((<HTMLElement>element).dataset.mrbrPaginationPage) === pageNumber),
            act = this.$clsActions,
            cls = this.$cls;
        if (!requestedElement || requestedElement.classList.contains("disabled")) { return this; }
        for (let elementCounter = 0; elementCounter < elements.length; elementCounter++) {
            const
                element = <HTMLElement>elements[elementCounter],
                elementPageNumber = parseInt(element.dataset?.mrbrPaginationPage || "");
            if (isNaN(elementPageNumber)) { continue; }
            this.classes(element, elementPageNumber === pageNumber ? act.add : act.remove, "active");
            this.aria(element, { current: elementPageNumber === pageNumber ? "page" : this.$cls.DELETE })
        }
        (currentPage !== pageNumber) &&
            (this.eventSubscribers
                .raiseEvent(new this.$pge(cls.PAGINATION_PAGE_CHANGE_EVENT, this,
                    new this.$pged(cls.PAGINATION_PAGE_CHANGE_EVENT, pageNumber, currentPage, event))));
        return this;
    }

    /**
     * Get the Active Page Number
     * @date 09/12/2022 - 03:06:03
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get activePageNumber(): number {
        if (!this.defaultContainerElement) { return 0; }
        let foundPageNumber = parseInt(this.pageElements().find(element => element.dataset?.mrbrPaginationPage && element.classList.contains("active"))?.dataset?.mrbrPaginationPage || "");
        return !isNaN(foundPageNumber) ? foundPageNumber : 0;
    }

    /**
     * Disable a Page Control
     * @date 09/12/2022 - 03:06:42
     *
     * @public
     * @param {number} pageNumber
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public disablePage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        this.elements.get(`${this.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`)?.classList.toggle("disabled", true);
        return this;
    }

    /**
     * Enable a Page Control
     * @date 09/12/2022 - 03:07:03
     *
     * @public
     * @param {number} pageNumber
     * @returns {Mrbr_UI_Bootstrap_Controls_Pagination}
     */
    public enablePage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        this.elements.get(`${this.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`)?.classList.toggle("disabled", false);
        return this;
    }
    /**
     * Get the Page Elements from the Pagination Control
     * @date 09/12/2022 - 03:07:24
     *
     * @private
     * @returns {Array<HTMLElement>}
     */
    public pageElements(): Array<HTMLElement> {
        const maxNum = Number.MAX_SAFE_INTEGER.toString();
        return <Array<HTMLElement>>Array.from(this.defaultContainerElement.children).filter(element => {
            const page = (<HTMLElement>element)?.dataset?.mrbrPaginationPage
            return page && page !== "0" && page !== maxNum;
        });
    }
    //#endregion Public Methods
}