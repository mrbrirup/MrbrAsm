import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";
import { Mrbr_UI_Bootstrap_Controls_ProgressBar } from "./ProgressBar";
import { Mrbr_UI_Bootstrap_Controls_ProgressEvent } from "./ProgressEvent";
import { Mrbr_UI_Bootstrap_Controls_ProgressEventData } from "./ProgressEventData";

export class Mrbr_UI_Bootstrap_Controls_Progress extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Internal Progress Name
     * @date 10/12/2022 - 07:20:12
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PROGRESS: string = "progress";

    /**
     * Internal Progress Bar Name
     * @date 10/12/2022 - 07:20:27
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PROGRESS_BAR: string = "progress_bar";

    /**
     * Internal Progress Change Name
     * @date 10/12/2022 - 07:20:35
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PROGRESS_CHANGE_EVENT: string = "progress_change_event";

    /**
     * ProgressBar Striped Css Class 
     * @date 10/12/2022 - 07:20:48
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PROGRESS_BAR_STRIPED: string = "progress-bar-striped";

    /**
     * ProgressBar Animated Css Class
     * @date 10/12/2022 - 07:21:13
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PROGRESS_BAR_ANIMATED: string = "progress-bar-animated";


    /**
     * Progress Class Type Alias
     * @date 10/12/2022 - 07:21:24
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Progress}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Progress { return Mrbr_UI_Bootstrap_Controls_Progress; }

    /**
     * ProgressBar Class Type Alias
     * @date 10/12/2022 - 07:21:43
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public get $bar(): typeof Mrbr_UI_Bootstrap_Controls_ProgressBar { return this.$bsc.ProgressBar as typeof Mrbr_UI_Bootstrap_Controls_ProgressBar; }


    /**
     * ProgressEvent Class Type Alias
     * @date 10/12/2022 - 07:37:05
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ProgressEvent}
     */
    public get $pev(): typeof Mrbr_UI_Bootstrap_Controls_ProgressEvent { return this.$bsc.ProgressEvent as typeof Mrbr_UI_Bootstrap_Controls_ProgressEvent; }

    /**
     * ProgressEventData Class Type Alias
     * @date 10/12/2022 - 07:37:15
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_ProgressEventData}
     */
    public get $ped(): typeof Mrbr_UI_Bootstrap_Controls_ProgressEventData { return this.$bsc.ProgressEventData as typeof Mrbr_UI_Bootstrap_Controls_ProgressEventData; }

    private _useDefaultProgress: boolean;
    constructor(rootElementName?: string, useDefaultProgress: boolean = true) {
        super(rootElementName);
        this._useDefaultProgress = useDefaultProgress;
    }



    /**
     * ProgressBars Collection in Progress Control field
     * @date 10/12/2022 - 07:21:56
     *
     * @private
     * @type {Map<string, Mrbr_UI_Bootstrap_Controls_ProgressBar>}
     */
    private _progressBars: Map<string, Mrbr_UI_Bootstrap_Controls_ProgressBar>;

    /**
     * ProgressBars Collection in Progress Control property
     * @date 10/12/2022 - 07:22:27
     *
     * @public
     * @readonly
     * @type {Map<string, Mrbr_UI_Bootstrap_Controls_ProgressBar>}
     */
    public get progressBars(): Map<string, Mrbr_UI_Bootstrap_Controls_ProgressBar> { return this._progressBars ??= new Map<string, Mrbr_UI_Bootstrap_Controls_ProgressBar>(); }

    /**
     * Get ProgressBar from ProgressBars Collection
     * @date 10/12/2022 - 07:22:51
     *
     * @public
     * @param {string} name
     * @returns {Mrbr_UI_Bootstrap_Controls_ProgressBar}
     */
    public getProgressBar(name: string): Mrbr_UI_Bootstrap_Controls_ProgressBar { return this.progressBars.get(name); }

    /**
     * Initialise Progress Control, load manifest and set default config
     * @date 10/12/2022 - 07:23:03
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Progress>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Progress> {
        const
            self = this,
            cls = self.$cls,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Progress>(`${controlName}:initialise`);
        super.initialise(...args)
            .then(async _ => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, self.elementConfig.getConfig(cls.PROGRESS)));
                self.defaultContainerElementName = this.rootElementName;
                if (self._useDefaultProgress) {
                    self.addProgressBar(new this.$bar(self.rootElementName));
                }
                initialisePromise.resolve(self);
            })
            .catch(error => initialisePromise.reject(error));
        return initialisePromise;
    }


    /**
     * Set Default Config for Progress Control and ProgressBar
     * @date 10/12/2022 - 07:23:27
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Progress>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Progress> {
        const self = this,
            cls = self.$cls,
            controlName = cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Progress>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(() => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(cls.PROGRESS, new self.$ctrlPrm()
                        .Classes("progress"))
                    .setIfNotExist(cls.PROGRESS_BAR, new self.$ctrlPrm()
                        .Classes("progress-bar")
                        .Properties({ role: "progressbar" })
                    );
                setDefaultConfigPromise.resolve(self);
            })
        return setDefaultConfigPromise;
    }

    /**
     * Add ProgressBar to Progress Control
     * @date 10/12/2022 - 07:23:47
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_ProgressBar} progressBar
     * @returns {Mrbr_UI_Bootstrap_Controls_Progress}
     */
    public addProgressBar(progressBar: Mrbr_UI_Bootstrap_Controls_ProgressBar): Mrbr_UI_Bootstrap_Controls_Progress {
        const
            self = this,
            container = self.defaultContainerElement;
        self.assignElementConfig(progressBar.element, self.elementConfig.getConfig(self.$cls.PROGRESS_BAR));
        self.progressBars.set(progressBar.name, progressBar);
        container.appendChild(progressBar.element);
        progressBar.onProgress(self.progress_watcher.bind(self));
        return this;
    }

    /**
     * Progress Watcher callback for ProgressBars change in progress value
     * @date 10/12/2022 - 07:23:59
     *
     * @private
     * @param {Mrbr_UI_Bootstrap_Controls_ProgressBar} progressBar
     */
    private progress_watcher(progressBar: Mrbr_UI_Bootstrap_Controls_ProgressBar): void {
        let totalProgress = 0;
        if ((this.progressBars?.size || 0) === 0) { return; }
        const data = new this.$ped();
        Array.from(this.progressBars.keys()).forEach(key => {
            const bar = this.progressBars.get(key);
            totalProgress += bar.weightedProgress;
            data.progressBarsProgress.set(key, bar.progress);
            data.progressBarsWeightedProgress.set(key, bar.weightedProgress);
        });
        data.progress = totalProgress;
        this.eventSubscribers.raiseEvent(new this.$pev(this.$cls.PROGRESS_CHANGE_EVENT, this, data));
    }

    /**
     * Subscribe to Progress Change Event
     * @date 10/12/2022 - 07:24:37
     *
     * @public
     * @param {((event: Mrbr_UI_Bootstrap_Controls_ProgressEvent) => void | number)} callback
     * @returns {number}
     */
    public onProgressChanged(callback: (event: Mrbr_UI_Bootstrap_Controls_ProgressEvent) => void | number): number {
        const eventName = this.$cls.PROGRESS_CHANGE_EVENT;
        if (typeof callback === "number") {
            this.eventSubscribers.remove(eventName, callback);
            return null;
        }
        return this.eventSubscribers.add(eventName, callback);
    }

    /**
     * Remove ProgressBar from Progress Control and DOM by name
     * @date 10/12/2022 - 07:24:46
     *
     * @public
     * @param {string} name
     * @returns {Mrbr_UI_Bootstrap_Controls_Progress}
     */
    public removeProgressBar(name: string): Mrbr_UI_Bootstrap_Controls_Progress {
        const
            self = this,
            progressBar = self.progressBars.get(name);
        if (progressBar) {
            self.progressBars.delete(name);
            self.defaultContainerElement.removeChild(progressBar.element);
        }
        return this;
    }
}