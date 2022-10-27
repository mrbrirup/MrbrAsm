import { Mrbr_UI_Bootstrap_Controls_Placeholder } from "../ui/bootstrap/controls/Placeholder";

export class Mrbr_Tests_Application$Placeholder {

  constructor() {
    const placeholder = Mrbr_UI_Bootstrap_Controls_Placeholder;
    let placeholder1 = placeholder.createItem("placeholder1", placeholder.widths.col9, placeholder.elementTypes.span, placeholder.sizings.lg);
    let placeholder2 = placeholder.createItem("placeholder2", placeholder.widths.col3, placeholder.elementTypes.span, placeholder.sizings.xs);
    let para1 = document.createElement("p");

    document.body.appendChild(placeholder1.placeholderElement);
    para1.appendChild(placeholder2.placeholderElement);
    document.body.appendChild(para1);

    let placeholderParent;
    setTimeout(() => {
      console.log(placeholder.placeholders);
      placeholderParent = placeholder.setParent("parent1", para1, placeholder.animations.glow);
      console.log(placeholder.placeholders);
    }, 3000);

    setTimeout(() => {
      placeholder.removePlaceholder(placeholderParent);
    }, 6000)
    setTimeout(() => {
      placeholder.removePlaceholder(placeholder2);
      console.log(placeholder.placeholders);
    }, 9000);
  }
}