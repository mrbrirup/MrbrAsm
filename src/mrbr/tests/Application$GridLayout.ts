import { Mrbr_UI_Bootstrap_Layout_Grid } from "../ui/bootstrap/layout/Grid";
import { Mrbr_UI_Bootstrap_Layout_GridColumn } from "../ui/bootstrap/layout/GridColumn";
import { Mrbr_UI_Bootstrap_Layout_GridColumnOffsets } from "../ui/bootstrap/layout/GridColumnOffsets";
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
          gc = Mrbr_UI_Bootstrap_Layout_GridColumn,
          gcs = Mrbr_UI_Bootstrap_Layout_GridColumnSizes,
          col1 = new gc("col1", gcs.colMd8),
          col2 = new gc("col2", gcs.colMd4),
          col3 = new gc("col3", gcs.colMd4),
          col4 = new gc("col4", gcs.colMd4);
        col1.element.innerHTML = "col1";
        col2.element.innerHTML = "col2";
        col1.element.style.backgroundColor = "red";
        col2.element.style.backgroundColor = "blue";
        col2.element.style.color = "white";

        col3.element.innerHTML = "col3";
        col4.element.innerHTML = "col4";
        col3.element.style.backgroundColor = "red";
        col4.element.style.backgroundColor = "blue";
        col4.element.style.color = "white";
        col4.Offsets(col4.$columnOffsets.offsetMd3);
        gridLayout3.addColumns(col3, col4);
        gridLayout3.mount(document.body);
        document.body.appendChild(document.createElement("hr"));



        gridLayout1.addColumns(col1, col2);
        gridLayout1.mount(document.body);
        document.body.appendChild(document.createElement("hr"));
        gridLayout2.mount(document.body);
        gridLayout2.gridRowSize = Mrbr_UI_Bootstrap_Layout_GridRowSizes.rowCols3;
        let columns = [];
        [...Array(12).keys()].forEach(i => {
          const col = new gc(`col${i}`, [gcs.col]);
          col.element.innerHTML = `col${i}`;
          col.element.style.backgroundColor = i / 2 === Math.floor(i / 2) ? "red" : "blue";
          col.element.style.color = i / 2 === Math.floor(i / 2) ? "black" : "white";
          columns.push(gridLayout2.addColumn(col));
        });
        setTimeout(() => {
          gridLayout1.removeColumn(col1);
        }, 5000);
        setTimeout(() => {
          gridLayout2.columnElement(columns[6]).innerText = "Changed";
        }, 10000);

      })
  }
}