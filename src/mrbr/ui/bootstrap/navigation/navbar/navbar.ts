import { Mrbr_UI_Bootstrap_Controls_ClassActions } from '../../controls/classActions';
import { Mrbr_UI_Controls_Control } from '../../../controls/control';
import { Mrbr_UI_Controls_ControlConfig } from '../../../controls/ControlConfig';
import { Mrbr_UI_Bootstrap_Utilities_Backgrounds } from '../../utilities/backgrounds';
import { Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar$classes } from './navbar$classes';

export class Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar extends Mrbr_UI_Controls_Control {

    constructor(rootElementName: string) {
        super(rootElementName);
        const self = this;
        let navbar = <HTMLElement>this.createElement(new Mrbr_UI_Controls_ControlConfig(this.rootElementName, "nav"));
        let navStyles = Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar$classes,
            bgStyles = Mrbr_UI_Bootstrap_Utilities_Backgrounds;
        let styles = [
            navStyles.navbar,
            navStyles.navbarDark,
            bgStyles.dark
        ];
        this.classes(navbar, Mrbr_UI_Bootstrap_Controls_ClassActions.Add, styles)
        document.body.appendChild(self.rootElement);
    }
}
