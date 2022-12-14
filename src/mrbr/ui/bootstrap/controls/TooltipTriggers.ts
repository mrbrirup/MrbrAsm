
/**
 * How tooltip is triggered: click, hover, focus, manual. You may pass multiple triggers; separate them with a space. 'manual' indicates that the tooltip will be triggered programmatically via the .tooltip('show'), .tooltip('hide') and .tooltip('toggle') methods; this value cannot be combined with any other trigger. 'hover' on its own will result in tooltips that cannot be triggered via the keyboard, and should only be used if alternative methods for conveying the same information for keyboard users is present.
 * @date 14/12/2022 - 09:05:22
 *
 * @export
 * @enum {number}
 */
export enum Mrbr_UI_Bootstrap_Controls_TooltipTriggers {
    click = 'click',
    hover = 'hover',
    focus = 'focus',
    manual = 'manual'
}
