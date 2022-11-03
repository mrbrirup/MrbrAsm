
/**
 * Load Requirements for a file load request
 * @date 03/11/2022 - 05:48:25
 *
 * @export
 * @enum {number}
 */
export enum Mrbr_IO_LoadRequirements {
    "default" = 0,
    "required" = 1,
    "optional" = 2,
    "cascade" = 4,
    "force" = 8,
    "exclude" = 16
};