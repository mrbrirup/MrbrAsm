import { Mrbr_UI_Bootstrap_Controls_Popovers } from "../ui/bootstrap/controls/Popovers";
import { Mrbr_UI_Bootstrap_Controls_Progress } from "../ui/bootstrap/controls/Progress";

export class Mrbr_Tests_Application$Progress {

  constructor() {
    const progress = Mrbr_UI_Bootstrap_Controls_Progress;

    let progressControl = progress.addProgress("progress1", true),
      progressControl2 = progress.addProgress("progress2", true);
    progressControl2.addProgressBar(new progress.ProgressBar("progress2_bar1"));
    progressControl2.progressBars.get("progress2_bar1").proportion = 65;
    progressControl2.progressBars.get("progress2_progressbar").proportion = 35;
    progressControl2.progressBars.get("progress2_progressbar").element.classList.add("bg-success");

    document.body.appendChild(progressControl.element);
    document.body.appendChild(progressControl2.element);

    let _progressValue = 0;
    let fn = _ => {
      requestAnimationFrame(() => {
        _progressValue += 0.1;
        let progressValue = Math.round(_progressValue * 10) / 10;
        progressControl.progressBars.get("progress1_progressbar").progress = progressValue;
        progressControl2.progressBars.get("progress2_bar1").progress = progressValue;
        progressControl2.progressBars.get("progress2_progressbar").progress = progressValue;
        progressControl2.progressBars.get("progress2_progressbar").text = `${Math.floor(progressValue).toString()}%`;
        progressControl2.progressBars.get("progress2_bar1").text = `${Math.floor(progressValue).toString()}%`;

      })
      _progressValue < 100 && requestAnimationFrame(fn);
    }
    requestAnimationFrame(fn);
  }
}