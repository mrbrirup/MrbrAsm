import { Mrbr_UI_Bootstrap_Controls_Pagination } from "../ui/bootstrap/controls/Pagination";
import { Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes } from "../ui/bootstrap/controls/PaginationButtonSizes";
import { Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions } from "../ui/bootstrap/controls/PaginationJustifyPositions";


export class Mrbr_Tests_Application$Pagination {

  constructor() {

    const paginationCls = Mrbr_UI_Bootstrap_Controls_Pagination,
      pagination = new paginationCls();
    pagination.showPrevious = true;
    pagination.showNext = false;
    pagination.useIconButtons = true;
    pagination.buttonSize = Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes.small;
    pagination.pageButtonCount = 8;
    pagination.maxTotalPages = 20;
    pagination.initialise()
      .then(_ => {

        pagination.onPageChange((event) => { console.log(event.data); });

        pagination.mount(document.body);
        pagination.onMounted((event) => {
          requestAnimationFrame(() => {
            pagination.setActivePage(1);
            debugger
          });
        });
        setTimeout(() => {
          pagination.showNext = true;
          pagination.showPrevious = true;
          pagination.buttonSize = Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes.large;
        }, 2000);

        setTimeout(() => {
          pagination.useIconButtons = false;
          pagination.buttonSize = Mrbr_UI_Bootstrap_Controls_PaginationButtonSizes.default;
        }, 4000);


        // setTimeout(() => {
        //   pagination.removePage(1);
        //   pagination.addPage(5);
        // }, 2000);

        // setTimeout(() => {
        //   pagination.removePage(pagination.minPageNumber);
        //   pagination.addPage(pagination.maxPageNumber + 1);
        // }, 4000);


        setTimeout(() => {
          pagination.setActivePage(3);
          pagination.justifyPosition = Mrbr_UI_Bootstrap_Controls_PaginationJustifyPositions.end;
        }, 6000);

        setTimeout(() => {
          pagination.disablePage(4);
        }, 8000);
        setTimeout(() => {
          pagination.setActivePage(6);
        }, 2000);
        // pagination.addEventListener(paginationCls.PAGINATION_PAGE_CLICK_EVENT, (e) => {
        //   let _e = e as CustomEvent;
        //   console.log(_e.detail.page);
        //   pagination.setActivePage(_e.detail.page);
        // })
      });
  }
}