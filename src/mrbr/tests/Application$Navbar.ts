import { Mrbr_UI_Bootstrap_Controls_Navbar } from "../ui/bootstrap/controls/Navbar";
import { Mrbr_UI_Bootstrap_Controls_NavbarBrand } from "../ui/bootstrap/controls/NavbarBrand";
import { Mrbr_UI_Bootstrap_Controls_NavbarToggler } from "../ui/bootstrap/controls/NavbarToggler";
import { Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants } from "../ui/bootstrap/controls/NavbarBackgroundVariants";
import { Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes } from "../ui/bootstrap/controls/NavBarExpandSizes";
import { Mrbr_UI_Bootstrap_Controls_NavbarPlacements } from "../ui/bootstrap/controls/NavbarPlacements";
import { Mrbr_UI_Bootstrap_Utilities_Backgrounds } from "../ui/bootstrap/utilities/backgrounds";


export class Mrbr_Tests_Application$Navbar {

  constructor() {
    const navbar = new Mrbr_UI_Bootstrap_Controls_Navbar("navbar");
    navbar.initialise()
      .then(_ => {
        navbar.addBrand(new Mrbr_UI_Bootstrap_Controls_NavbarBrand("brand").Text("Brand"));
        navbar.addToggler(new Mrbr_UI_Bootstrap_Controls_NavbarToggler("toggler"));
        //navbar.navbarControls.get("toggler").disabled = true;
        //navbar.navbarControls.get("brand").disabled = true;
        navbar.expandSize = Mrbr_UI_Bootstrap_Controls_NavbarExpandSizes.md;
        navbar.backgroundVariant = Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants.dark;
        navbar.backgroundColour = Mrbr_UI_Bootstrap_Utilities_Backgrounds.secondary;
        navbar.placement = Mrbr_UI_Bootstrap_Controls_NavbarPlacements.fixedBottom;

        const template =
          ` <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item dropup">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>`;
        navbar.defaultContainerElement.innerHTML = template;
        navbar.mount(document.body);

        // setTimeout(() => {
        //   navbar.navbarControls.get("toggler").disabled = false;
        //   navbar.navbarControls.get("brand").disabled = false;
        // }, 10000);
      });
  }
}