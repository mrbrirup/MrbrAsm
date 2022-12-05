import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_UI_Bootstrap_Controls_Nav } from "../ui/bootstrap/controls/Nav";
import { Mrbr_UI_Bootstrap_Controls_NavContainerTypes } from "../ui/bootstrap/controls/NavContainerTypes";


export class Mrbr_Tests_Application$Nav {

  constructor() {
    const nav = new Mrbr_UI_Bootstrap_Controls_Nav("navbar"),
      ct = Mrbr_UI_Bootstrap_Controls_NavContainerTypes,
      name = ct[MrbrBase.COMPONENT_NAME],
      config = {};
    config[name] = ct.nav;
    nav.initialise(config)
      .then(_ => {
        nav.addLink("homeTab", "Home");
        nav.mount(document.body);
      });
  }
}