
/**
 * Tooltip placement options
 * How to position the tooltip: auto, top, bottom, left, right. When auto is specified, it will dynamically reorient the tooltip. When a function is used to determine the placement, it is called with the tooltip DOM node as its first argument and the triggering element DOM node as its second. The this context is set to the tooltip instance.
 * @date 14/12/2022 - 09:01:30
 *
 * @export
 * @enum {number}
 */
export enum Mrbr_UI_Bootstrap_Controls_TooltipPlacements {
    top = "top",
    bottom = "bottom",
    left = "left",
    right = "right",
    auto = "auto"
}