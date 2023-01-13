import { Mrbr_UI_Bootstrap_Controls_Badge } from "../ui/bootstrap/controls/badge";
import { Mrbr_UI_Bootstrap_Controls_Badge$Position } from "../ui/bootstrap/controls/Badge$Position";
import { Mrbr_UI_Bootstrap_Controls_Badge$Shape } from "../ui/bootstrap/controls/Badge$Shape";
import { Mrbr_UI_Controls_ClassActions } from "../ui/controls/classActions";

export class Mrbr_Tests_Application$Badge {
    mrbrBadge: Mrbr_UI_Bootstrap_Controls_Badge;
    constructor() {
        const self = this;
        self.mrbrBadge = new Mrbr_UI_Bootstrap_Controls_Badge();
        self.mrbrBadge.initialise()
            .then(async _ => {
                let badge = self.mrbrBadge;
                await badge.initialise();
                let button = document.createElement("button");
                badge.classes(button, Mrbr_UI_Controls_ClassActions.add, "btn btn-dark m-4");
                button.textContent = "In-Box";
                button.id = "button1";
                badge.badgeText = "9";
                badge.contextText = "Unread Messages";
                badge.badgeShape = Mrbr_UI_Bootstrap_Controls_Badge$Shape.rounded;
                badge.badgePosition = Mrbr_UI_Bootstrap_Controls_Badge$Position.topRight;
                badge.mount(button);
                document.body.appendChild(button);
                let num = setInterval(() => {
                    const val = parseInt(self.mrbrBadge.badgeText) - 1;
                    badge.badgeText = val.toString();
                    if (val === 0) {
                        clearInterval(num);
                    }
                }, 1000);
                setTimeout(() => {
                    badge.dispose();
                    self.mrbrBadge = null;
                }, 12000);
            })
    }
}