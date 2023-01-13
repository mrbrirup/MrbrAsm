import { Mrbr_UI_Bootstrap_Controls_Navbar } from "../ui/bootstrap/controls/Navbar";
import { Mrbr_UI_Bootstrap_Controls_NavbarBrand } from "../ui/bootstrap/controls/NavbarBrand";
import { Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas } from "../ui/bootstrap/controls/NavbarOffCanvas";
import { Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants } from "../ui/bootstrap/controls/NavbarBackgroundVariants";
import { Mrbr_UI_Bootstrap_Controls_NavbarPlacements } from "../ui/bootstrap/controls/NavbarPlacements";
import { Mrbr_UI_Bootstrap_Utilities_Backgrounds } from "../ui/bootstrap/utilities/backgrounds";
import { Mrbr_UI_Bootstrap_Controls_OffCanvasThemes } from "../ui/bootstrap/controls/OffCanvasThemes";

export class Mrbr_Tests_Application$Navbar$OffCanvas {

  constructor() {
    const navbar = new Mrbr_UI_Bootstrap_Controls_Navbar();
    navbar
      .initialise()
      .then(async _ => {
        navbar.addBrand(new Mrbr_UI_Bootstrap_Controls_NavbarBrand().Text("Brand"));
        let navbarOffCanvas = new Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas();
        await navbarOffCanvas.initialise<Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas>();

        navbarOffCanvas.build(navbar);

        navbar.addToggler(navbarOffCanvas);

        let toggler = (navbar.navbarControls.get("toggler") as Mrbr_UI_Bootstrap_Controls_NavbarOffCanvas)
        navbar.backgroundVariant = Mrbr_UI_Bootstrap_Controls_NavbarBackgroundVariants.dark;
        navbar.backgroundColour = Mrbr_UI_Bootstrap_Utilities_Backgrounds.secondary;
        navbar.placement = Mrbr_UI_Bootstrap_Controls_NavbarPlacements.fixedTop;

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
                <li class="nav-item dropdown">
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

        toggler.offCanvasTheme = Mrbr_UI_Bootstrap_Controls_OffCanvasThemes.dark;
        navbar.mount(document.body);
        navbar.defaultContainerElement.appendChild(toggler.togglerElement)
        navbar.defaultContainerElement.appendChild(toggler.offCanvasElement)
        toggler.defaultContainerElement.innerHTML = template;

      });
  }
}