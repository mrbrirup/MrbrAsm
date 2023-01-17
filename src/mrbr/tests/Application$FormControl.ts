import { Mrbr_UI_Bootstrap_Controls_Button } from "../ui/bootstrap/controls/Button";
import { Mrbr_UI_Bootstrap_Form_CheckBox } from "../ui/bootstrap/form/checkbox";
import { Mrbr_UI_Bootstrap_Form_Colour } from "../ui/bootstrap/form/colour";
import { Mrbr_UI_Bootstrap_Form_Date } from "../ui/bootstrap/form/date";
import { Mrbr_UI_Bootstrap_Form_DateTimeLocal } from "../ui/bootstrap/form/dateTimeLocal";
import { Mrbr_UI_Bootstrap_Form_Email } from "../ui/bootstrap/form/email";
import { Mrbr_UI_Bootstrap_Form_FileInput } from "../ui/bootstrap/form/fileInput";
import { Mrbr_UI_Bootstrap_Form_Form } from "../ui/bootstrap/form/form";
import { Mrbr_UI_Bootstrap_Form_FormSubmitEvent } from "../ui/bootstrap/form/formSubmitEvent";
import { Mrbr_UI_Bootstrap_Form_Layout } from "../ui/bootstrap/form/layout";
import { Mrbr_UI_Bootstrap_Form_Month } from "../ui/bootstrap/form/month";
import { Mrbr_UI_Bootstrap_Form_Number } from "../ui/bootstrap/form/number";
import { Mrbr_UI_Bootstrap_Form_Radio } from "../ui/bootstrap/form/radio";
import { Mrbr_UI_Bootstrap_Form_Range } from "../ui/bootstrap/form/range";
import { Mrbr_UI_Bootstrap_Form_Search } from "../ui/bootstrap/form/search";
import { Mrbr_UI_Bootstrap_Form_Select } from "../ui/bootstrap/form/select";
import { Mrbr_UI_Bootstrap_Form_Tel } from "../ui/bootstrap/form/tel";
import { Mrbr_UI_Bootstrap_Form_Text } from "../ui/bootstrap/form/text";
import { Mrbr_UI_Bootstrap_Form_Time } from "../ui/bootstrap/form/time";
import { Mrbr_UI_Bootstrap_Form_URL } from "../ui/bootstrap/form/url";
import { Mrbr_UI_Bootstrap_Form_Week } from "../ui/bootstrap/form/week";


export class Mrbr_Tests_Application$FormControl {
  constructor() {
    const
      controlMap = new Map<string, any>();
    controlMap.set("form", new Mrbr_UI_Bootstrap_Form_Form());
    controlMap.set("layout", new Mrbr_UI_Bootstrap_Form_Layout());
    controlMap.set("checkbox1", new Mrbr_UI_Bootstrap_Form_CheckBox());
    controlMap.set("color1", new Mrbr_UI_Bootstrap_Form_Colour());
    controlMap.set("email1", new Mrbr_UI_Bootstrap_Form_Email());
    controlMap.set("select1", new Mrbr_UI_Bootstrap_Form_Select());
    controlMap.set("button1", new Mrbr_UI_Bootstrap_Controls_Button());
    controlMap.set("date1", new Mrbr_UI_Bootstrap_Form_Date());
    controlMap.set("datetime1", new Mrbr_UI_Bootstrap_Form_DateTimeLocal());
    controlMap.set("file1", new Mrbr_UI_Bootstrap_Form_FileInput());
    controlMap.set("month1", new Mrbr_UI_Bootstrap_Form_Month());
    controlMap.set("number1", new Mrbr_UI_Bootstrap_Form_Number());
    controlMap.set("password1", new Mrbr_UI_Bootstrap_Form_Number());
    controlMap.set("range1", new Mrbr_UI_Bootstrap_Form_Range());
    controlMap.set("radio1", new Mrbr_UI_Bootstrap_Form_Radio());
    controlMap.set("search1", new Mrbr_UI_Bootstrap_Form_Search());
    controlMap.set("tel1", new Mrbr_UI_Bootstrap_Form_Tel());
    controlMap.set("text1", new Mrbr_UI_Bootstrap_Form_Text());
    controlMap.set("time1", new Mrbr_UI_Bootstrap_Form_Time());
    controlMap.set("url1", new Mrbr_UI_Bootstrap_Form_URL());
    controlMap.set("week1", new Mrbr_UI_Bootstrap_Form_Week());

    Promise.all(Array.from(controlMap.values()).map((control: any) => control.initialise()))
      .then(_ => {
        const
          form = controlMap.get("form"),
          layout = controlMap.get("layout"),
          rows = layout.createGrid(9, 3),
          cell = layout.cell.bind(layout),
          controlKey = Array.from(controlMap.keys())
            .filter(key => key !== "form" && key !== "layout")
            .filter(key => key !== "radio1" && key !== "checkbox1")
            .filter(key => key !== "button1");
        let row = 0, col = 0;
        controlKey.forEach(key => {
          controlMap.get(key)
            .Label(key)
            .mount(cell(row, col));
          col++;
          if (col > 2) {
            col = 0;
            row++;
          }
        });
        controlMap.get("radio1")
          .Label("radio1")
          .mount(cell(7, 0));
        controlMap.get("checkbox1")
          .Label("checkbox1")
          .mount(cell(7, 1));
        controlMap.get("button1")
          .Text("Submit")
          .mount(cell(8, 2));
        let add = layout.$clsActions.add
        rows.forEach(row => layout.classes(row, add, "g-3"));
        layout.classes(cell(8, 2), add, "d-flex justify-content-end")

        layout.mount(form);
        form.mount(document.body);
      });




  }
}