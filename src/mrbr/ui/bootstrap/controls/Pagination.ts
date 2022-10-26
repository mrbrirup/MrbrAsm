import { Mrbr_System_Events_EventHandler } from "../../../system/events/EventHandler";
import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_System_MrbrPromise } from "../../../system/MrbrPromise";
import { Mrbr_UI_Controls_Control } from "../../controls/control";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Pagination extends Mrbr_UI_Controls_Control {


    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Pagination { return Mrbr_UI_Bootstrap_Controls_Pagination; }

    //#region Private Static Configuration
    private static _pagination_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _pagination_list_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _pagination_previous_button_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    //#endregion Private Static Configuration

    //#endregion Public Names
    public static readonly PAGINATION_LIST_NAME = "pagination_list";
    public static readonly PAGINATION_PREVIOUS_BUTTON_NAME = "pagination_previous_button";
    public static readonly PAGINATION_NEXT_BUTTON_NAME = "pagination_next_button";
    public static readonly PAGINATION_PAGE_BUTTON_NAME = "pagination_button";
    public static readonly PAGINATION_PAGE_CLICK_EVENT = "pagination_page_click";

    //#endregion Public Names

    //#region Public Enums
    public static buttonSizes = {
        small: "pagination-sm",
        large: "pagination-lg",
        default: ""
    } as const

    public static justifyPositions = {
        start: "justify-content-start",
        end: "justify-content-end",
        center: "justify-content-center"
    } as const



    //#region Public Configuration Properties
    public get pagination_config(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const
            self = this;
        (!self.$cls._pagination_config) && (self.$cls._pagination_config = new self.$ctrlPrm()
            .Aria({ label: "Page navigation" }))
        return Object.assign(new self.$ctrlPrm(), self.$cls._pagination_config);
    }
    public get pagination_list_config(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._pagination_list_config) && (self.$cls._pagination_list_config = new self.$ctrlPrm()
            .Classes("pagination"));
        return Object.assign(new self.$ctrlPrm(), self.$cls._pagination_list_config);
    }
    public get paginationButtonConfig(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._pagination_previous_button_config) && (self.$cls._pagination_previous_button_config = new self.$ctrlPrm()
            .Classes("page-item")
            .Template(`<a class="page-link" href="#"></a>`));
        return Object.assign(new self.$ctrlPrm(), self.$cls._pagination_previous_button_config);
    }


    //#endregion Public Configuration Properties

    //#region Private Property Fields
    private _showPrevious: boolean = true;
    private _showNext: boolean = true;
    private _useIconButtons: boolean = false;
    private _buttonSize: typeof Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes] = Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes.default;
    private _pageButtonCount: number = 11;
    private _maxTotalPages: number = Number.MAX_SAFE_INTEGER;
    private _justifyPosition: typeof Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions[keyof typeof Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions] = Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions.start;
    public get justifyPosition(): typeof Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions[keyof typeof Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions] {
        return this._justifyPosition;
    }
    public set justifyPosition(value: typeof Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions[keyof typeof Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions]) {
        const self = this;
        if (self.defaultContainerElement) {
            self.defaultContainerElement.classList.toggle(self._justifyPosition, false);
            self.defaultContainerElement.classList.toggle(value, true);
        }
        self._justifyPosition = value;
    }
    //#endregion Private Property Fields




    constructor(rootElementName: string) {
        super(rootElementName);
    }

    //#region Public Properties

    public get buttonSize(): typeof Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes] {
        return this._buttonSize;
    }
    public set buttonSize(value: typeof Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes[keyof typeof Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes]) {
        const self = this;
        if (self.defaultContainerElement) {
            self.defaultContainerElement.classList.remove(...Object.values(self.$cls.buttonSizes).filter(value => value !== ""));
            value !== Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes.default && self.defaultContainerElement.classList.add(value);
        }

        this._buttonSize = value;
    }

    public get useIconButtons(): boolean { return this._useIconButtons; }
    public set useIconButtons(value: boolean) {
        const self = this;
        self._useIconButtons = value;
        self.showPrevious = self._showPrevious;
        self.showNext = self._showNext;
    }
    public get showPrevious(): boolean { return this._showPrevious; }
    public set showPrevious(value: boolean) {
        const self = this;
        if (self.defaultContainerElement) {
            let previousButton = self.elements[self.$cls.PAGINATION_PREVIOUS_BUTTON_NAME];
            if (!previousButton && value) {
                self.elements[self.$cls.PAGINATION_PREVIOUS_BUTTON_NAME] = self.createElement(new self.$ctrlCfg(self.$cls.PAGINATION_PREVIOUS_BUTTON_NAME, "li", self.paginationButtonConfig
                    .Aria({ label: "Previous" })
                    .Data({ mrbrPaginationPage: 0 })
                ));
                previousButton = self.elements[self.$cls.PAGINATION_PREVIOUS_BUTTON_NAME];
            }
            if (previousButton) {
                previousButton.style.display = value ? "" : "none";
                previousButton.querySelector("a").innerHTML = self.useIconButtons ? `<span aria-hidden="true">&laquo;</span>` : "Previous";
                self.defaultContainerElement.prepend(previousButton);
            }
        }
        self._showPrevious = value;
    }
    public get showNext(): boolean { return this._showNext; }
    public set showNext(value: boolean) {
        const self = this;
        if (self.defaultContainerElement) {
            let nextButton = self.elements[self.$cls.PAGINATION_NEXT_BUTTON_NAME];
            if (!nextButton && value) {
                self.elements[self.$cls.PAGINATION_NEXT_BUTTON_NAME] = self.createElement(new self.$ctrlCfg(self.$cls.PAGINATION_NEXT_BUTTON_NAME, "li", self.paginationButtonConfig
                    .Aria({ label: "Next" })
                    .Data({ mrbrPaginationPage: Number.MAX_SAFE_INTEGER })
                ));
                nextButton = self.elements[self.$cls.PAGINATION_NEXT_BUTTON_NAME];
            }
            if (nextButton) {
                nextButton.style.display = value ? "" : "none";
                nextButton.querySelector("a").innerHTML = self.useIconButtons ? `<span aria-hidden="true">&raquo;</span>` : "Next";
                self.defaultContainerElement.appendChild(nextButton);
            }
        }
        this._showNext = value;
    }
    public get pageButtonCount(): number { return this._pageButtonCount; }
    public set pageButtonCount(value: number) {
        const self = this;
        this._pageButtonCount = value;
        self.setActivePage(self.activePageNumber);
    }
    public get maxTotalPages(): number { return this._maxTotalPages; }
    public set maxTotalPages(value: number) { this._maxTotalPages = value; }

    //#endregion Public Properties




    //#region Public Methods
    public initialise<T>(...args): Mrbr_System_MrbrPromise<T> {
        const self = this,
            initialisePromise = self.$promise.create("initialise");
        super.initialise(args)
            .then(async superInit => {
                await self.$mrbr.loadManifest(Mrbr_UI_Bootstrap_Controls_Pagination[MrbrBase.MRBR_COMPONENT_MANIFEST]);
                const paginationList = <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.PAGINATION_LIST_NAME, "ul", self.pagination_list_config));
                self.createElement(new this.$ctrlCfg(self.rootElementName, "nav", self.pagination_config
                    .Children([paginationList])
                ));
                self.defaultContainerElementName = self.$cls.PAGINATION_LIST_NAME;
                self.showPrevious = self._showPrevious;
                self.showNext = self._showNext;
                self.buttonSize = self._buttonSize;

                self.events[self.$cls.PAGINATION_PAGE_CLICK_EVENT] = new Mrbr_System_Events_EventHandler(
                    "click",
                    self.defaultContainerElement,
                    self.pagination_click_handler,
                    self);
                let pageCounter = 0;
                while (pageCounter++ < self.pageButtonCount) { self.addPage(pageCounter); }

                initialisePromise.resolve(self);
            })
            .catch((error) => {
                initialisePromise.reject(error);
            });
        return initialisePromise;
    }

    private pagination_click_handler(event: Event) {
        const self = this,
            target = <HTMLElement>event.target;
        event.stopPropagation();
        let page = parseInt(target.dataset.mrbrPaginationPage || (<HTMLElement>target.closest("li[data-mrbr-pagination-page]")).dataset.mrbrPaginationPage);
        if (page === Number.MAX_SAFE_INTEGER && self.activePageNumber < self.maxTotalPages) {
            page = self.activePageNumber + 1;
            self.setActivePage(page);
        } else if (page === 0 && self.activePageNumber > 1) {
            page = self.activePageNumber - 1;
            self.setActivePage(page);
        }
        (page) && (self.dispatchEvent(new CustomEvent(self.$cls.PAGINATION_PAGE_CLICK_EVENT, { detail: { page: page } })));
    }


    public addPage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const self = this;
        const buttonName = `${self.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`;
        if (self.defaultContainerElement && !self.elements[buttonName]) {
            const pageButton = <HTMLElement>self.createElement(new self.$ctrlCfg(buttonName, "li", self.paginationButtonConfig
                .Aria({ label: `Page ${pageNumber}` })
                .Data({ mrbrPaginationPage: pageNumber })
            ));
            pageButton.querySelector("a").innerHTML = pageNumber.toString();
            if (self.defaultContainerElement.children.length === 0) {
                self.defaultContainerElement.appendChild(pageButton);
            }
            else {
                let elements = Array.from(self.defaultContainerElement.children).filter(element => parseInt((<HTMLElement>element).dataset.mrbrPaginationPage) > pageNumber);
                if (elements.length === 0) {
                    self.defaultContainerElement.append(pageButton);
                }
                else {
                    self.defaultContainerElement.insertBefore(pageButton, elements[0]);
                }
            }
        }
        return self;
    }
    public removePage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const self = this;
        if (self.defaultContainerElement) {
            const buttonName = `${self.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`,
                pageButton = self.elements[buttonName];
            if (pageButton) {
                self.defaultContainerElement.removeChild(pageButton);
                self.elements[buttonName] = self.$cls.DELETE_ENTRY;
            }
        }
        return self;
    }
    public clearPages(): Mrbr_UI_Bootstrap_Controls_Pagination {
        const self = this;
        if (self.defaultContainerElement) {
            let elements = self.pageElements();
            for (let elementCounter = 0; elementCounter < elements.length; elementCounter++) {
                const element = <HTMLElement>elements[elementCounter];
                if (element.dataset.mrbrPaginationPage) {
                    self.defaultContainerElement.removeChild(element);
                    self.elements[`${self.$cls.PAGINATION_PAGE_BUTTON_NAME}_${element.dataset.mrbrPaginationPage}`] = self.$cls.DELETE_ENTRY;
                }
            }
            return self;
        }
    }
    public addRange(startPage: number, endPage: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const self = this;
        if (self.defaultContainerElement) {
            for (let page = startPage; page <= endPage; page++) {
                self.addPage(page);
            }
        }
        return self;
    }

    public get minPageNumber(): number {
        const self = this;
        if (self.defaultContainerElement) {
            let elements = self.pageElements();
            if (elements.length > 0) {
                return parseInt((<HTMLElement>elements[0]).dataset.mrbrPaginationPage);
            }
        }
        return 0;
    }
    public get maxPageNumber(): number {
        const self = this;
        if (self.defaultContainerElement) {
            let elements = self.pageElements();
            if (elements.length > 0) {
                return parseInt((<HTMLElement>elements[elements.length - 1]).dataset.mrbrPaginationPage);
            }
        }
        return 0;
    }

    public setActivePage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const self = this;
        if (self.defaultContainerElement) {
            let elements = self.pageElements();
            let pageNumbers = elements.map(element => parseInt((<HTMLElement>element).dataset.mrbrPaginationPage)),
                centre = Math.floor(self.pageButtonCount / 2),
                left = pageNumber - centre + (centre === (self.pageButtonCount / 2) ? 1 : 0),
                right = pageNumber + centre;
            if (left < 1) {
                right += Math.abs(left) + 1;
                left = 1;
            }
            if (right > self.maxTotalPages) {
                left -= right - self.maxTotalPages;
                right = self.maxTotalPages;
            }
            pageNumbers.filter(pageNumber => pageNumber < left || pageNumber > right).forEach(pageNumber => self.removePage(pageNumber));
            self.addRange(left, right);
            for (let elementCounter = 0; elementCounter < elements.length; elementCounter++) {
                const element = <HTMLElement>elements[elementCounter];
                if (element.dataset.mrbrPaginationPage) {
                    element.classList.toggle("active", parseInt(element.dataset.mrbrPaginationPage) === pageNumber);
                    self.aria(element, { current: parseInt(element.dataset.mrbrPaginationPage) === pageNumber ? "page" : self.$cls.DELETE })
                }
            }
        }
        return self;
    }
    public get activePageNumber(): number {
        const self = this;
        if (self.defaultContainerElement) {
            let elements = self.pageElements();
            for (let elementCounter = 0; elementCounter < elements.length; elementCounter++) {
                const element = <HTMLElement>elements[elementCounter];
                if (element.dataset.mrbrPaginationPage && element.classList.contains("active")) {
                    return parseInt(element.dataset.mrbrPaginationPage);
                }
            }
        }
        return 0;
    }
    public disablePage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const self = this;
        if (self.defaultContainerElement) {
            const buttonName = `${self.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`,
                pageButton = self.elements[buttonName];
            pageButton && pageButton.classList.toggle("disabled", true);
        }
        return self;
    }
    public enablePage(pageNumber: number): Mrbr_UI_Bootstrap_Controls_Pagination {
        const self = this;
        if (self.defaultContainerElement) {
            const buttonName = `${self.$cls.PAGINATION_PAGE_BUTTON_NAME}_${pageNumber}`,
                pageButton = self.elements[buttonName];
            pageButton && (pageButton.classList.toggle("disabled", false))

        }
        return self;
    }

    //#endregion Public Methods
    //#region Private Methods
    private pageElements(): HTMLElement[] {
        const self = this;
        return <HTMLElement[]>Array.from(self.defaultContainerElement.children).filter(element => {
            const _element = <HTMLElement>element;
            return _element.dataset.mrbrPaginationPage !== "0" && _element.dataset.mrbrPaginationPage !== Number.MAX_SAFE_INTEGER.toString();
        });
    }
    //#endregion Private Methods
}