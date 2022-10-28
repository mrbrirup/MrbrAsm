import { MrbrBase } from "../../../system/MrbrBase";
import { Mrbr_UI_Controls_ControlConfigOptionalParameters } from "../../controls/ControlConfigOptionalParameters";

export class Mrbr_UI_Bootstrap_Controls_Progress {


    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Progress { return Mrbr_UI_Bootstrap_Controls_Progress; }

    //#region Private Static Fields
    private static _progress_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    private static _progress_bar_config: Mrbr_UI_Controls_ControlConfigOptionalParameters;
    //#endregion Private Static Fields



    //#region Public Properties
    public get progress_config(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._progress_config) && (self.$cls._progress_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("progress"));
        return Mrbr_UI_Bootstrap_Controls_Progress._progress_config;
    }
    public get progress_bar_config(): Mrbr_UI_Controls_ControlConfigOptionalParameters {
        const self = this;
        (!self.$cls._progress_bar_config) && (self.$cls._progress_bar_config = new Mrbr_UI_Controls_ControlConfigOptionalParameters()
            .Classes("progress-bar")
            .Properties({ role: "progressbar" })
        );
        return Mrbr_UI_Bootstrap_Controls_Progress._progress_bar_config;
    }

    //#endregion Public Properties


    private static _progresses: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.Progress>> = new Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.Progress>>();
    public static get progresses(): Map<string, object> {
        return Mrbr_UI_Bootstrap_Controls_Progress._progresses;
    }
    public static ProgressBar = class {
        public name: string;
        public element: HTMLElement;
        public get minValue(): number {
            return this.element.getAttribute("aria-valuemin") ? parseInt(this.element.getAttribute("aria-valuemin")) : 0;
        }
        public set minValue(value: number) { this.element.setAttribute("aria-valuemin", `${value}`); }
        public get maxValue(): number {
            return this.element.getAttribute("aria-valuemax") ? parseInt(this.element.getAttribute("aria-valuemax")) : 100;
        }
        public set maxValue(value: number) { this.element.setAttribute("aria-valuemax", `${value}`); }
        public get progress(): number {
            return this.element.getAttribute("aria-valuenow") ? parseInt(this.element.getAttribute("aria-valuenow")) : 0;
        }
        public set progress(value: number) {
            if (value < this.minValue) { value = this.minValue; }
            if (value > this.maxValue) { value = this.maxValue; }
            this.element.setAttribute("aria-valuenow", `${value}`);
            this.element.style.width = `${value / 100 * this.proportion}%`;
        }
        public set text(value: string) {
            !!value && (this.element.innerText = value);
        }
        proportion: number = 100;
        constructor(name: string, minValue: number = 0, maxValue: number = 100, progress: number = 0) {
            const self = this;
            self.name = name;
            self.element = document.createElement("div");
            self.element.classList.add("progress-bar");
            self.minValue = minValue;
            self.maxValue = maxValue;
            self.progress = progress;
        }
        dispose() {
            const self = this;
            self.element.remove();
        }
    }
    //#region Public Static Classes
    public static Progress = class {
        public name: string;
        public element: HTMLElement;
        public progressBars: Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.ProgressBar>> = new Map<string, InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.ProgressBar>>();
        constructor(name: string) {
            const self = this;
            self.name = name;
            self.element = document.createElement("div");
            self.element.classList.add("progress");
        }
        public addNewProgressBar(name: string): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.ProgressBar> {
            const self = this;
            const progressBar = new Mrbr_UI_Bootstrap_Controls_Progress.ProgressBar(name);
            self.progressBars.set(progressBar.name, progressBar);
            self.element.appendChild(progressBar.element);
            return progressBar;
        }
        public addProgressBar(progressBar: InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.ProgressBar>): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.ProgressBar> {
            const self = this;
            self.progressBars.set(progressBar.name, progressBar);
            self.element.appendChild(progressBar.element);
            return progressBar;
        }
        public removeProgressBar(name: string): void {
            const self = this;
            const progressBar = self.progressBars.get(name);
            if (progressBar) {
                self.progressBars.delete(name);
                progressBar.dispose();
            }
        }
    }
    //endregion Public Static Classes
    public static addProgress(name: string, addDefaultProgreesBar: boolean = true): InstanceType<typeof Mrbr_UI_Bootstrap_Controls_Progress.Progress> {
        const self = this;
        const progress = new Mrbr_UI_Bootstrap_Controls_Progress.Progress(name),
            progressBar = addDefaultProgreesBar ? progress.addNewProgressBar(`${name}_progressbar`) : null;
        progressBar && progress.element.appendChild(progressBar.element);
        self._progresses.set(progress.name, progress);
        return progress;
    }
    public static removeProgress(name: string): void {
        const self = this;
        const progress = self._progresses.get(name);
        if (progress) {
            Reflect.ownKeys(progress.progressBars).forEach((key) => {
                progress.removeProgressBar(key.toString());
            });
            progress.element.remove();
        }
    }
}