import { Mrbr_UI_Bootstrap_Containers_Container$Breakpoints } from "./container$breakpoints";

export class Mrbr_UI_Bootstrap_Containers_Container {
    _containerWidth: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints;
    _containerElement: HTMLElement;
    constructor(host?: HTMLElement) {
        const self = this;
        self._containerElement = document.createElement("div");
        self.containerWidth = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints.containerFluid;    
        if(host){
            host.appendChild(self._containerElement);
        }
        self._containerElement.style.height = "200px";
        self._containerElement.style.backgroundColor = "blue";
    }
    get containerWidth():Mrbr_UI_Bootstrap_Containers_Container$Breakpoints { return this._containerWidth; }
    set containerWidth(value: Mrbr_UI_Bootstrap_Containers_Container$Breakpoints) {
        const self = this;
        const classList = self._containerElement.classList
        if(classList.contains(value)){ return; }
        let obj = Mrbr_UI_Bootstrap_Containers_Container$Breakpoints;
        Object
            .keys(obj)
            .forEach(key => { 
                if (classList.contains(key)){classList.remove(key)}
            })
        this._containerWidth = value;
        classList.add(value);
    }

}