import { Mrbr_UI_Bootstrap_Controls_Progress } from "../ui/bootstrap/controls/Progress";

export class Mrbr_Tests_Application$Progress {

  constructor() {
    const progress = Mrbr_UI_Bootstrap_Controls_Progress;
    let progressControl = new progress();
    progressControl.initialise()
      .then(() => {
        progressControl.mount(document.body);
        let _progressValue = 0;
        let fn = _ => {
          requestAnimationFrame(() => {
            _progressValue += 0.1;
            let progressValue = Math.round(_progressValue * 10) / 10;
            progressControl.progressBars.get(progressControl.rootElementName).progress = progressValue;
          })
          _progressValue < 100 && requestAnimationFrame(fn);
        }
        requestAnimationFrame(fn);
      });
    const progressControl2 = new progress(false);
    progressControl2.initialise()
      .then(() => {
        const progressBar1 = new progressControl2.$bar("progress2_bar1")
          .Weight(.65),
          progressBar2 = new progressControl2.$bar("progress2_progressbar")
            .Weight(.25)
            .Classes(`${progress.PROGRESS_BAR_STRIPED} bg-warning`),
          progressBar3 = new progressControl2.$bar("progress2_progressbar1")
            .Weight(.1)
            .Classes(`${progress.PROGRESS_BAR_ANIMATED} ${progress.PROGRESS_BAR_STRIPED} bg-danger`);
        progressControl2.addProgressBar(progressBar1);
        progressControl2.addProgressBar(progressBar2);
        progressControl2.addProgressBar(progressBar3);

        progressControl.onProgressChanged((e) => { console.log("progressControl: ", e); });
        progressControl2.onProgressChanged((e) => { console.log("progressControl2", e); });
        progressControl2.mount(document.body);
        let _progressValue = 0;

        let fn = _ => {
          requestAnimationFrame(() => {
            _progressValue += 0.1;
            let progressValue = Math.round(_progressValue * 10) / 10;
            [progressBar1, progressBar2, progressBar3].forEach(bar => {
              bar.progress = progressValue;
              bar.progress = progressValue;
              bar.text = `${Math.floor(progressValue).toString()}%`;
            });
          })
          _progressValue < 100 && requestAnimationFrame(fn);
        }
        requestAnimationFrame(fn);
      });
  }
}