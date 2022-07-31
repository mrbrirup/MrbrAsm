import { Mrbr_UI_Bootstrap_Containers_Container } from "../bootstrap/containers/container";
import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "../bootstrap/containers/container$breakpoints";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Height } from "../bootstrap/utilities/sizing$height";
import { Mrbr_UI_Bootstrap_Utilities_Sizing$Width } from "../bootstrap/utilities/sizing$width";
import { Mrbr_UI_Controls_Footer } from "./footer";
import { Mrbr_UI_Controls_NavbarWindowManager } from "./navbarWindowManager";

export class Mrbr_UI_Controls_Desktop extends EventTarget {
    desktopContainer: Mrbr_UI_Bootstrap_Containers_Container
    windowContainer: HTMLElement;
    navbar: Mrbr_UI_Controls_NavbarWindowManager;
    constructor() {
        super();
        let self = this;
        self.desktopContainer = new Mrbr_UI_Bootstrap_Containers_Container();
        let desktopContainer = self.desktopContainer;
        desktopContainer.containerType = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.containerFluid;
        desktopContainer.height = Mrbr_UI_Bootstrap_Utilities_Sizing$Height.viewHeight100;
        desktopContainer.width = Mrbr_UI_Bootstrap_Utilities_Sizing$Width.viewWidth100;
        desktopContainer.style.addClasses(desktopContainer.container, ["container-fluid", "vh-100", "vw-100", "px-0","d-flex","flex-column"]);

        self.windowContainer = document.createElement("div");
        //self.desktopContainer.container.style.opacity = "100%";

        self.navbar = new Mrbr_UI_Controls_NavbarWindowManager()
        //self.footer = new Mrbr_UI_Controls_Footer();
        self.windowContainer = document.createElement("div");
        self.windowContainer.id ="windowContainer"
        self.windowContainer.classList.add("h-100")
        self.windowContainer.classList.add("w-100")
        self.windowContainer.classList.add("overflow-hidden")
        
        
        
        //"min-vh-100 min-vw-100"
        desktopContainer.container.appendChild(self.windowContainer)
        desktopContainer.container.appendChild(self.navbar.navbar)

        self.windowContainer.style.position = "relative";

        
        //self.desktopContainer.container.classList.add("mrbr_opacity0");
        self.desktopContainer.container.classList.add("mrbr_fadeIn");
        document.body.appendChild(desktopContainer.container);
        //self.desktopContainer.container.style.paddingBottom = `${self.navbar.navbar.offsetHeight}px`
        //self.desktopContainer.container.classList.remove("mrbr_opacity0");
        //setTimeout(() => {unfade(desktopContainer.container);                    }, 0);
        function unfade(element) {
            let opacity = element?.style?.opacity            
            var initialOpacity =  parseInt(opacity) || 0.0;  // initial opacity
            //element.style.display = 'block';
            var timer = setInterval(function () {
                console.log()
                if (initialOpacity >= 1){
                    clearInterval(timer);
                }
                element.style.opacity = initialOpacity;
                //element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                initialOpacity += 2/60;
            }, 2000/60);
        }
    }
}