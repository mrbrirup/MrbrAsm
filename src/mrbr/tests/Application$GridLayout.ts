import { Mrbr_UI_Bootstrap_Layout_Grid } from "../ui/bootstrap/layout/Grid";
import { Mrbr_UI_Bootstrap_Layout_GridColumn } from "../ui/bootstrap/layout/GridColumn";
import { Mrbr_UI_Bootstrap_Layout_GridColumnSizes } from "../ui/bootstrap/layout/GridColumnSizes";
import { Mrbr_UI_Bootstrap_Layout_GridRowSizes } from "../ui/bootstrap/layout/GridRowSizes";

export class Mrbr_Tests_Application$GridLayout {
  constructor() {
    const
      lg = Mrbr_UI_Bootstrap_Layout_Grid,
      gridLayout1 = new lg(),
      gridLayout2 = new lg(),
      gridLayout3 = new lg();

    Promise.all([gridLayout1.initialise(), gridLayout2.initialise(), gridLayout3.initialise()])
      .then(() => {
        const
          container = document.getElementById("container"),
          gc = Mrbr_UI_Bootstrap_Layout_GridColumn,
          gcs = Mrbr_UI_Bootstrap_Layout_GridColumnSizes,
          col1 = new gc("col1", gcs.colMd8),
          col2 = new gc("col2", gcs.colMd4),
          col11 = new gc("col1", gcs.colMd8),
          col21 = new gc("col2", gcs.colMd4),
          col3 = new gc("col3", gcs.colMd4),
          col4 = new gc("col4", gcs.colMd4);
        col1.element.innerHTML = `<div class="p-3 border bg-primary">Col 1</div>`;
        col2.element.innerHTML = `<div class="p-3 border bg-primary">Col 2</div>`;
        col11.element.innerHTML = `<div class="p-3 border bg-primary">Col 11</div>`;
        col21.element.innerHTML = `<div class="p-3 border bg-primary">Col 21</div>`;
        // col1.element.style.backgroundColor = "red";
        // col2.element.style.backgroundColor = "blue";
        // col1.element.classList.add("bg-primary");
        // col2.element.classList.add("bg-secondary");
        // col11.element.classList.add("bg-primary");
        // col21.element.classList.add("bg-secondary");

        col2.element.style.color = "white";
        col21.element.style.color = "white";

        col3.element.innerHTML = "col3";
        col4.element.innerHTML = "col4";
        col3.element.style.backgroundColor = "red";
        col4.element.style.backgroundColor = "blue";
        col4.element.style.color = "white";
        col4.Offsets(col4.$columnOffsets.offsetMd3);
        gridLayout3.addColumns(col3, col4);
        gridLayout3.mount(container);
        container.appendChild(document.createElement("hr"));



        gridLayout1.addColumns(col1, col2, col11, col21);
        gridLayout1.mount(container);
        container.appendChild(document.createElement("hr"));
        gridLayout2.mount(container);
        gridLayout2.gridRowSize = Mrbr_UI_Bootstrap_Layout_GridRowSizes.rowCols3;
        //gridLayout2.gutters = gridLayout3.$gutters.xy3;
        gridLayout1.gutters = gridLayout1.$gutters.xy3;
        let columns = [];
        [...Array(12).keys()].forEach(i => {
          const col = new gc(`col${i}`, [gcs.col]);
          col.element.innerHTML = `col${i}`;
          col.element.style.backgroundColor = i / 2 === Math.floor(i / 2) ? "red" : "blue";
          col.element.style.color = i / 2 === Math.floor(i / 2) ? "black" : "white";
          columns.push(gridLayout2.addColumn(col));
        });
        setTimeout(() => {
          gridLayout1.gutters = gridLayout1.$gutters.xy0;
        }, 5000);
        setTimeout(() => {
          gridLayout2.columnElement(columns[6]).innerText = "Changed";
          gridLayout2.removeColumn(columns[7]);
        }, 10000);

      })
  }
}