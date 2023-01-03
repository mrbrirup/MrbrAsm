import { Mrbr_UI_Bootstrap_Form_FileInput } from "../ui/bootstrap/form/fileInput";
import { Mrbr_UI_Bootstrap_Form_FileInputEvent } from "../ui/bootstrap/form/fileInputEvent";


export class Mrbr_Tests_Application$FileInput {
  constructor() {
    const mrbrFileInput = Mrbr_UI_Bootstrap_Form_FileInput,
      fileInput1 = new mrbrFileInput()
        .Label("File Input 1"),
      fileInput2 = new mrbrFileInput()
        .Label("File Input 2")
        .Multiple(true)
    Promise.all([fileInput1.initialise(), fileInput2.initialise()])
      .then(_ => {
        fileInput1.onInputChanged(this.inputChange.bind(this));
        fileInput2.onInputChanged(this.inputChange.bind(this));
        fileInput1.mount(document.body);
        document.body.appendChild(document.createElement("hr"));
        fileInput2.mount(document.body);
      })
  }
  inputChange(e: Mrbr_UI_Bootstrap_Form_FileInputEvent) {
    console.log("Input Changed", e.data);
  }
}