import { Mrbr_UI_Bootstrap_Controls_Pagination } from "../ui/bootstrap/controls/Pagination";


export class Mrbr_Tests_Application$Pagination {

  constructor() {

    const paginationCls = Mrbr_UI_Bootstrap_Controls_Pagination,
      pagination = new paginationCls("pagination");
    // pagination.showPrevious = true;
    // pagination.showNext = false;
    //pagination.useIconButtons = true;
    //pagination.buttonSize = Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes.small;
    pagination.initialise()
      .then(_ => {
        document.body.appendChild(pagination.rootElement);
        pagination.addPage(2);
        pagination.addPage(1);
        pagination.addPage(4);
        pagination.addPage(3);
        // setTimeout(() => {
        //   pagination.showNext = true;
        //   pagination.showPrevious = true;
        //   pagination.buttonSize = Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes.large;
        // }, 2000);

        // setTimeout(() => {
        //   pagination.useIconButtons = false;
        //   pagination.buttonSize = Mrbr_UI_Bootstrap_Controls_Pagination.buttonSizes.default;
        // }, 4000);


        // setTimeout(() => {
        //   pagination.removePage(1);
        //   pagination.addPage(5);
        // }, 2000);

        // setTimeout(() => {
        //   pagination.removePage(pagination.minPageNumber);
        //   pagination.addPage(pagination.maxPageNumber + 1);
        // }, 4000);


        // setTimeout(() => {
        //   pagination.setActivePage(3);
        //   pagination.justifyPosition = Mrbr_UI_Bootstrap_Controls_Pagination.justifyPositions.end;
        // }, 6000);

        // setTimeout(() => {
        //   pagination.disablePage(4);
        // }, 8000);
        setTimeout(() => {
          pagination.pageButtonCount = 8;
        }, 2000);
        pagination.setActivePage(6);
        pagination.addEventListener(paginationCls.PAGINATION_PAGE_CLICK_EVENT, (e) => {
          let _e = e as CustomEvent;
          console.log(_e.detail.page);
          pagination.setActivePage(_e.detail.page);
        })
      });
  }
}