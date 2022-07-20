import { Mrbr_UI_Bootstrap_Containers_BreakpointSize } from '../containers/breakpointSize';
import { Mrbr_UI_Html_BaseElement } from '../../html/baseElement';
export declare class Mrbr_UI_Containers_Container extends Mrbr_UI_Html_BaseElement {
    breakPointSize: Mrbr_UI_Bootstrap_Containers_BreakpointSize;
    static elementType: string;
    constructor(breakPointSize: Mrbr_UI_Bootstrap_Containers_BreakpointSize, ...args: any[]);
}
