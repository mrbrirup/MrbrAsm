import { Mrbr_UI_Bootstrap_Controls_Badge } from "../ui/bootstrap/controls/badge";
import { Mrbr_UI_Controls_ClassActions } from "../ui/controls/classActions";

export class Mrbr_Tests_Application$Badge {
    mrbrBadge: Mrbr_UI_Bootstrap_Controls_Badge;
    constructor() {
        const self = this;
        self.mrbrBadge = new Mrbr_UI_Bootstrap_Controls_Badge("badge1");
        self.mrbrBadge.initialise()
            .then(async _ => {


                await self.mrbrBadge.initialise();

                let button = document.createElement("button");                
                self.mrbrBadge.classes(button, Mrbr_UI_Controls_ClassActions.Add, "btn btn-dark m-4");

                button.textContent = "In-Box";

                button.id = "button1";

                self.mrbrBadge.badgeText = "9";
                self.mrbrBadge.contextText = "Unread Messages";
                self.mrbrBadge.badgeShape = Mrbr_UI_Bootstrap_Controls_Badge.BADGE_SHAPE.ROUNDED;
                self.mrbrBadge.badgePosition = Mrbr_UI_Bootstrap_Controls_Badge.BADGE_POSITION.TOP_RIGHT;


                button.append(self.mrbrBadge.rootElement);

                const targetNode = document.getElementById('accordionExample');

                setTimeout(() => {
                    targetNode.appendChild(button);                    
                }, 1000);
                //document.body.appendChild(button);
            })
    }
    clearAlert() {
        const self = this;
        self.mrbrBadge.dispose();
        self.mrbrBadge = null;
    }
}