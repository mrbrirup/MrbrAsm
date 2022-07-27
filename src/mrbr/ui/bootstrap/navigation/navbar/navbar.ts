import { Mrbr_UI_Html_StyleClasses } from '../../../html/StyleClasses';
import { Mrbr_UI_Bootstrap_Controls_Control } from '../../controls/control';
import { Mrbr_UI_Bootstrap_Helpers_Positions } from '../../helpers/positions';
import { Mrbr_UI_Bootstrap_Utilities_Backgrounds } from '../../utilities/backgrounds';
import { Mrbr_UI_Bootstrap_Utilities_Spacing } from '../../utilities/spacing';
import { Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar$classes } from './navbar$classes';

export class Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar extends Mrbr_UI_Bootstrap_Controls_Control {
    navbar: HTMLElement
    style: typeof Mrbr_UI_Html_StyleClasses
    constructor() {
        super();
        this.navbar = document.createElement("nav");
        let navbar = this.navbar;
        this.style = Mrbr_UI_Html_StyleClasses;
        let navStyles = Mrbr_UI_Bootstrap_Navigation_NavBar_NavBar$classes,
            bgStyles = Mrbr_UI_Bootstrap_Utilities_Backgrounds,
            spacingStyles = Mrbr_UI_Bootstrap_Utilities_Spacing,
            positionHelperStyles = Mrbr_UI_Bootstrap_Helpers_Positions
        let styles = [
            navStyles.navbar,
            navStyles.navbarDark,
            bgStyles.dark
            //,            positionHelperStyles.fixedBottom
        ];
        this.style.addClasses(navbar, styles)
        document.body.appendChild(navbar);
    }
}
