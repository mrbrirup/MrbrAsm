import { Mrbr_UI_Bootstrap_Controls_Navbar } from "./Navbar";

export interface Mrbr_UI_Bootstrap_Controls_INavbarControls {
    name: string;
    build(hostNavbar: Mrbr_UI_Bootstrap_Controls_Navbar, hostElement?: HTMLElement): unknown;
    disabled: boolean;
    active: boolean;
}