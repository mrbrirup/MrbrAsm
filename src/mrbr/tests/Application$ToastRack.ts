import { MrbrBase } from "../system/MrbrBase";
import { Mrbr_UI_Bootstrap_Controls_Toast } from "../ui/bootstrap/controls/Toast";
import { Mrbr_UI_Bootstrap_Controls_ToastPlacements } from "../ui/bootstrap/controls/ToastPlacements";
import { Mrbr_UI_Bootstrap_Controls_ToastRack } from "../ui/bootstrap/controls/ToastRack";

export class Mrbr_Tests_Application$ToastRack {
  constructor() {
    //div2.classList.add("bg-dark", "position-relative");
    MrbrBase.mrbrInstance.loadManifest(Mrbr_Tests_Application$ToastRack[MrbrBase.MANIFEST])
      .then(async () => {
        let toastRack = new Mrbr_UI_Bootstrap_Controls_ToastRack();
        await toastRack.initialise();
        toastRack.Placement(Mrbr_UI_Bootstrap_Controls_ToastPlacements.bottomRight);
        //toastRack.rootElement.classList.add("bg-dark", "w-100");
        //toastRack.rootElement.style.position = "fixed";
        //toastRack.rootElement.style.bottom = "0";
        //toastRack.mount(document.getElementById("a1"));
        toastRack.mount(document.body);
        //document.body.appendChild(toastRack.rootElement);
        //toast.Placement(Mrbr_UI_Bootstrap_Controls_Toast$Placements.topRight);
        //const toast2 = new Mrbr_UI_Bootstrap_Controls_Toast("toast2");
        // toast2.Title("This is a toast 2")
        //   .SubTitle("This is a toast subtitle 2")
        //   .Image("https://via.placeholder.com/32", "Placeholder image")
        //   .BodyText("This is a toast body")

        //await Promise.all([toast.initialise(), toast2.initialise()])


        //toast.onHide((e: any) => { console.log("toast hidden", e); })
        // toast2.onShow((e: any) => { console.log("toast2 shown", e); })
        // toast2.onShown((e: any) => { console.log("toast2 shown", e); })
        //toastRack.addToast(toast);
        //toast.show();
        let toastCounter = 0;
        let fn = () => {
          setTimeout(async () => {
            toastCounter++;
            const toast = new Mrbr_UI_Bootstrap_Controls_Toast(`This is a toast: ${toastCounter}`, `This is a toast body: ${toastCounter}`)
              .SubTitle(`This is a toast subtitle: ${toastCounter}`)
            await toast.initialise();
            toastRack.addToast(toast);
            if (toastCounter < 20) {
              requestAnimationFrame(fn);
            }
          }, 1000);
        }
        fn();
      });

  }
}