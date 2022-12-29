import { Mrbr_UI_Bootstrap_Content_Figure } from "../ui/bootstrap/content/figure";

export class Mrbr_Tests_Application$Figure {
  constructor() {
    const
      mrbrFigure = Mrbr_UI_Bootstrap_Content_Figure,
      figure = new mrbrFigure();
    figure
      .initialise()
      .then(() => {
        figure
          .Caption("Test Figure")
          .ImageSrc("https://via.placeholder.com/200x200")
          .ImageAlt("Test Image");
        figure.mount(document.body);


      });
  }
}