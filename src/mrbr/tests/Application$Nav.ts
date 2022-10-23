import { Mrbr_UI_Bootstrap_Controls_Nav } from "../ui/bootstrap/controls/Nav";


export class Mrbr_Tests_Application$Nav {

  constructor() {
    const nav = new Mrbr_UI_Bootstrap_Controls_Nav("navbar");
    nav.initialise()
      .then(_ => {
        nav.addLink("homeTab", "Home");
        document.body.appendChild(nav.rootElement);
      });
  }
}