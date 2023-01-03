
/**
 * File Input Event Data
 * @date 03/01/2023 - 15:37:23
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Form_FileInputEventData
 * @typedef {Mrbr_UI_Bootstrap_Form_FileInputEventData}
 */
export class Mrbr_UI_Bootstrap_Form_FileInputEventData {
    
    /**
     * List of selected Files
     * @date 03/01/2023 - 15:37:30
     *
     * @public
     * @type {FileList}
     */
    public files: FileList;
    
    /**
     * Event that triggered the File Input
     * @date 03/01/2023 - 15:37:51
     *
     * @public
     * @type {Event}
     */
    public event: Event;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Form_FileInputEventData.
     * @date 03/01/2023 - 15:37:59
     *
     * @constructor
     * @param {FileList} files
     * @param {Event} event
     */
    constructor(files: FileList, event: Event) {
        this.files = files;
        this.event = event;
    }
}