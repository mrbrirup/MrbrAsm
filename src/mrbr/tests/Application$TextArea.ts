import { Mrbr_UI_Bootstrap_Form_TextArea } from "../ui/bootstrap/form/textArea";

export class Mrbr_Tests_Application$TextArea {
  constructor() {
    const mrbrTextArea = Mrbr_UI_Bootstrap_Form_TextArea,
      textArea1 = new mrbrTextArea()
        .Value("Hello World")
        .Label("TextArea1"),
      textArea2 = new mrbrTextArea()
        .Label("TextArea2")
        .Value("Hello World 2")
        .Rows(10)
        .Cols(30);



    Promise.all([textArea1.initialise(), textArea2.initialise()])
      .then(_ => {
        textArea1.mount(document.body);
        document.body.appendChild(document.createElement("hr"));
        textArea2.mount(document.body);

        setTimeout(() => {
          textArea2.Cols("clear");
          textArea2.Rows("clear");
        }, 5000);
        textArea2.onInputChanged(this.inputChange.bind(this));

      })

  }
  inputChange(e: Event) {
    console.log("Input Changed", e);
  }
}