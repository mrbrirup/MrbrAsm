import { Mrbr_UI_Html_BaseElement } from '../../../html/baseElement'

//I.Bootstrap.Navigation.NavBar = any | null;
export class Mrbr_UI_Bootstrap_Navigation_NavBar extends Mrbr_UI_Html_BaseElement {
        //                        (Mrbr.UI.Bootstrap.Navigation as any).NavBar = class extends Mrbr.UI.BaseElement {
        constructor() {
            super();
            let navbar = document.createElement("nav");
            ["navbar", "navbar-expand-md", "navbar-dark", "bg-dark", "mb-4"].forEach(entry => navbar.classList.add(entry));

            document.body.appendChild(navbar);
        }
    }
    // export function Manifest(mrbr) {
    //     //static Manifest(mrbr) {
    //     let newFile = new Mrbr.System.File(Mrbr.System.FileType.ScriptTag, "/lib/mrbr/ui/baseelement.js", null, false, false);
    //     mrbr.load(newFile)
    //         .then(_ => {
    //             //let newFile2 = new Mrbr.System.File(Mrbr.System.FileType.ScriptTag, "/lib/Mrbr/UI/Bootstrap/Navigation/navbar/navbar.js", null, false, false);
    //             //mrbr.load(newFile2)
    //             //    .then(_ => {     
    //             //Mrbr.UI.Bootstrap.Navigation.NavBar.Manifest.Manifest();
    //             //var nav = new Mrbr.UI.Bootstrap.Navigation.NavBar();
    //             //export Mrbr.UI.Bootstrap.Navigation?.NavBar!;
    //             //    });
    //             console.log("Manifest")
    //         });
    // }    