import { Mrbr_UI_Bootstrap_Controls_Navbar } from "../ui/bootstrap/controls/Navbar";
import { Mrbr_UI_Bootstrap_Controls_Navbar$Brand } from "../ui/bootstrap/controls/Navbar$Brand";
import { Mrbr_UI_Bootstrap_Controls_Navbar$Toggler } from "../ui/bootstrap/controls/Navbar$Toggler";


export class Mrbr_Tests_Application$Navbar {

    constructor() {
        const navbar = new Mrbr_UI_Bootstrap_Controls_Navbar("navbar");
        navbar.initialise()
            .then(_ => {
                navbar.addBrand(new Mrbr_UI_Bootstrap_Controls_Navbar$Brand("brand").Text("Brand"));
                navbar.addToggler(new Mrbr_UI_Bootstrap_Controls_Navbar$Toggler("toggler"));
                navbar.navbarControls.get("toggler").disabled = true;
                navbar.navbarControls.get("brand").disabled = true;
                navbar.expandSize = Mrbr_UI_Bootstrap_Controls_Navbar.expandSizes.md;
                navbar.backgroundVariant = Mrbr_UI_Bootstrap_Controls_Navbar.backgroundVariants.dark;
                navbar.backgroundColour = Mrbr_UI_Bootstrap_Controls_Navbar.backgroundColours.secondary;
                navbar.placement = Mrbr_UI_Bootstrap_Controls_Navbar.placements.fixedBottom;

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
                document.body.appendChild(navbar.rootElement);

                setTimeout(() => {
                    navbar.navbarControls.get("toggler").disabled = false;
                    navbar.navbarControls.get("brand").disabled = false;
                }, 10000);
            });
    }
}