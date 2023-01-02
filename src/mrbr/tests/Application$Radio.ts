import { Mrbr_System_Events_Event } from "../system/events/Event";
import { Mrbr_UI_Bootstrap_Form_Radio } from "../ui/bootstrap/form/radio";

export class Mrbr_Tests_Application$Radio {
  constructor() {
    const mrbrRadio = Mrbr_UI_Bootstrap_Form_Radio,
      radio1 = new mrbrRadio()
        .Label("radio")
        .Checked(true)
        .GroupName("group1"),
      radio2 = new mrbrRadio()
        .Label("radio 2")
        .GroupName("group1"),
      radio3 = new mrbrRadio()
        .Label("radio 3")
        .GroupName("group1"),
      radio4 = new mrbrRadio()
        .Label("radio 4")
        .Checked(true)
        .Inline(true)
        .GroupName("group2")
        .Value("value1"),
      radio5 = new mrbrRadio()
        .Label("radio 5")
        .Inline(true)
        .GroupName("group2")
        .Value("value2"),
      radio6 = new mrbrRadio()
        .Label("radio 6")
        .Inline(true)
        .GroupName("group2")
        .Value("value3"),
      radio7 = new mrbrRadio()
        .Label("radio 7")
        .Inline(true)
        .GroupName("group2")
        .Value("value4"),
      groupContainer1 = document.createElement("div"),
      groupContainer2 = document.createElement("div");
    groupContainer1.classList.add("form-group");
    groupContainer2.classList.add("form-group");
    document.body.appendChild(groupContainer1);
    document.body.appendChild(document.createElement("hr"));
    document.body.appendChild(groupContainer2);

    Promise.all([radio1.initialise(), radio2.initialise(), radio3.initialise(), radio4.initialise(), radio5.initialise(), radio6.initialise(), radio7.initialise()])
      .then(_ => {
        const group2 = [
          radio4,
          radio5,
          radio6,
          radio7
        ];
        radio1.mount(groupContainer1);
        radio2.mount(groupContainer1);
        radio3.mount(groupContainer1);
        group2.forEach(radio => {
          radio.onInputChanged(this.inputChange.bind(this));
          radio.mount(groupContainer2);
        });
      })
  }
  inputChange(e: Mrbr_System_Events_Event<any>) {
    console.log("Input Changed", e.data);
  }
}