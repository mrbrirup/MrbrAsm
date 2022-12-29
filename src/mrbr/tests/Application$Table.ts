import { Mrbr_UI_Bootstrap_Content_Table } from "../ui/bootstrap/content/table";

export class Mrbr_Tests_Application$Table {
  constructor() {
    const
      mrbrTable = Mrbr_UI_Bootstrap_Content_Table,
      table = new mrbrTable();
    table
      .initialise()
      .then(() => {
        table.CaptionText("Test Table")
          .ShowHeader(true)
          .ShowFooter(true)
          .Bordered(true)
          .StripedRows(true);
        table.header.innerHTML = `<tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>`
        table.footer.innerHTML = `<tfoot>
        <tr>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
          <td>Footer</td>
        </tr>
      </tfoot>`
        table.body.innerHTML = `<tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>`
        table.mount(document.body)
      })



  }
}