
/**
 * Progress Event Data. This is the data that is passed to the event handler. Total progress is the sum of all progress bars weighted progress plus collection of progress bars progress and progress bars weighted progress.
 * @date 10/12/2022 - 07:34:08
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_ProgressEventData
 * @typedef {Mrbr_UI_Bootstrap_Controls_ProgressEventData}
 */
export class Mrbr_UI_Bootstrap_Controls_ProgressEventData {
    
    /**
     * Total Progress
     * @date 10/12/2022 - 07:38:55
     *
     * @type {number}
     */
    progress: number;
    
    /**
     * Each ProgressBar progress
     * @date 10/12/2022 - 07:39:02
     *
     * @type {Map<string, number>}
     */
    progressBarsProgress: Map<string, number> = new Map<string, number>();
    
    /**
     * Each ProgressBar weighted progress
     * @date 10/12/2022 - 07:39:22
     *
     * @type {Map<string, number>}
     */
    progressBarsWeightedProgress: Map<string, number> = new Map<string, number>();
    constructor() { }
}