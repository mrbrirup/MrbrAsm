import { Mrbr_UI_Controls_Themes } from "./themes";

export class Mrbr_UI_Controls_ThemeChangeEvent extends CustomEvent<Mrbr_UI_Controls_ThemeChangeEventDetail>{
    public static themeChangeEvent:string = "themeChange";
    protected init: Mrbr_UI_Controls_ThemeChangeEventInit
    constructor(init: Mrbr_UI_Controls_ThemeChangeEventInit) {
        let typeName: string = Mrbr_UI_Controls_ThemeChangeEvent.themeChangeEvent;
        super(typeName, init);
        this.init = init
    }    
}

interface Mrbr_UI_Controls_ThemeChangeEventInit extends CustomEventInit<Mrbr_UI_Controls_ThemeChangeEventDetail> {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail: Mrbr_UI_Controls_ThemeChangeEventDetail
}

interface Mrbr_UI_Controls_ThemeChangeEventDetail {
    theme: Mrbr_UI_Controls_Themes
}
