
/**
 * Tooltip Configuration Class for options that can be assigned using data attributes
 * @date 14/12/2022 - 08:48:51
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_TooltipConfig
 * @typedef {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
 */
export class Mrbr_UI_Bootstrap_Controls_TooltipConfig {

    /**
     * If true, tooltip is animated when shown/hidden via CSS transitions.
     * @date 14/12/2022 - 08:50:00
     *
     * @type {boolean}
     */
    animation: boolean;

    /**
     * Overflow constraint boundary of the tooltip (applies only to Popper’s preventOverflow modifier). By default, it’s 'clippingParents' and can accept an HTMLElement reference (via JavaScript only). For more information refer to Popper’s detectOverflow docs.
     * @date 14/12/2022 - 08:50:16
     *
     * @type {string}
     */
    boundary: string;

    /**
     * Appends the tooltip to a specific element. Example: container: 'body'. This option is particularly useful in that it allows you to position the tooltip in the flow of the document near the triggering element - which will prevent the tooltip from floating away from the triggering element during a window resize.
     * @date 14/12/2022 - 08:50:36
     *
     * @type {string}
     */
    container: string;

    /**
     * Add classes to the tooltip when it is shown. Note that these classes will be added in addition to any classes specified in the template. To add multiple classes, separate them with spaces: 'class-1 class-2'. You can also pass a function that should return a single string containing additional class names.
     * @date 14/12/2022 - 08:50:52
     *
     * @type {string}
     */
    customClass: string;

    /**
     * Delay showing and hiding the tooltip (ms)—doesn’t apply to manual trigger type. If a number is supplied, delay is applied to both hide/show. Object structure is: delay: { "show": 500, "hide": 100 }.
     * @date 14/12/2022 - 08:51:14
     *
     * @type {(number | Object)}
     */
    delay: number | Object;

    /**
     * String comprimsed of Mrbr_UI_Bootstrap_Controls_TooltipPlacements enum values
     * Define fallback placements by providing a list of placements in array (in order of preference). For more information refer to Popper’s behavior docs.
     * @date 14/12/2022 - 08:51:40
     *
     * @type {Array<string>}
     */
    fallbackPlacements: Array<string>;

    /**
     * Allow HTML in the tooltip. If true, HTML tags in the tooltip’s title will be rendered in the tooltip. If false, innerText property will be used to insert content into the DOM. Use text if you’re worried about XSS attacks.
     * @date 14/12/2022 - 08:52:00
     *
     * @type {boolean}
     */
    html: boolean;

    /**
     * Offset of the tooltip relative to its target. You can pass a string in data attributes with comma separated values like: data-bs-offset="10,20". When a function is used to determine the offset, it is called with an object containing the popper placement, the reference, and popper rects as its first argument. The triggering element DOM node is passed as the second argument. The function must return an array with two numbers: skidding, distance. For more information refer to Popper’s offset docs.
     * @date 14/12/2022 - 08:52:20
     *
     * @type {(Array<string> | string)}
     */
    offset: Array<string> | string;

    /**
     * String comprimsed of Mrbr_UI_Bootstrap_Controls_TooltipPlacements enum values
     * How to position the tooltip: auto, top, bottom, left, right. When auto is specified, it will dynamically reorient the tooltip. When a function is used to determine the placement, it is called with the tooltip DOM node as its first argument and the triggering element DOM node as its second. The this context is set to the tooltip instance.
     * @date 14/12/2022 - 08:52:30
     *
     * @type {string}
     */
    placement: string;

    /**
     * To change Bootstrap’s default Popper config, see Popper’s configuration. When a function is used to create the Popper configuration, it’s called with an object that contains the Bootstrap’s default Popper configuration. It helps you use and merge the default with your own configuration. The function must return a configuration object for Popper.
     * @date 14/12/2022 - 08:53:40
     *
     * @type {object}
     */
    popperConfig: object;

    /**
     * Enable or disable the sanitization. If activated 'template', 'content' and 'title' options will be sanitized.
     * @date 14/12/2022 - 08:53:46
     *
     * @type {boolean}
     */
    sanitize: boolean;

    /**
     * If a selector is provided, tooltip objects will be delegated to the specified targets. In practice, this is used to also apply tooltips to dynamically added DOM elements (jQuery.on support). See this issue and an informative example. Note: title attribute must not be used as a selector.
     * @date 14/12/2022 - 08:54:24
     *
     * @type {(string | false)}
     */
    selector: string | false;

    /**
     * Base HTML to use when creating the tooltip. The tooltip’s title will be injected into the .tooltip-inner. .tooltip-arrow will become the tooltip’s arrow. The outermost wrapper element should have the .tooltip class and role="tooltip".
     * @date 14/12/2022 - 08:54:43
     *
     * @type {string}
     */
    template: string;

    /**
     * Default title value if title attribute isn’t present. If a function is given, it will be called with its this reference set to the element that the popover is attached to.
     * @date 14/12/2022 - 08:54:56
     *
     * @type {string}
     */
    title: string;

    /**
     * String comprised of Mrbr_UI_Boostrap_Controls_TooltipTriggers enum values
     * How tooltip is triggered: click, hover, focus, manual. You may pass multiple triggers; separate them with a space. 'manual' indicates that the tooltip will be triggered programmatically via the .tooltip('show'), .tooltip('hide') and .tooltip('toggle') methods; this value cannot be combined with any other trigger. 'hover' on its own will result in tooltips that cannot be triggered via the keyboard, and should only be used if alternative methods for conveying the same information for keyboard users is present.
     * @date 14/12/2022 - 08:55:10
     *
     * @type {string}
     */
    trigger: string;
    
    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_TooltipConfig.
     * @date 14/12/2022 - 08:56:15
     *
     * @constructor
     * @param {?string} [title]
     */
    constructor(title?: string) {
        this.title = title;
    }
    
    /**
     * Set the animation - fluent interface
     * @date 14/12/2022 - 08:56:22
     *
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Animation(value: boolean): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.animation = value;
        return this;
    }
    
    /**
     * Set tooltip boundary - fluent interface
     * @date 14/12/2022 - 08:57:00
     *
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Boundary(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.boundary = value;
        return this;
    }
    
    /**
     * Set the container - fluent interface
     * @date 14/12/2022 - 08:57:45
     *
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Container(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.container = value;
        return this;
    }
    
    /**
     * Set the custom class - fluent interface
     * @date 14/12/2022 - 08:57:53
     *
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    CustomClass(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.customClass = value;
        return this;
    }
    
    /**
     * Set the delay - fluent interface
     * @date 14/12/2022 - 08:58:01
     *
     * @param {(number | Object)} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Delay(value: number | Object): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.delay = value;
        return this;
    }
    
    /**
     * Set the fallback placements - fluent interface
     * @date 14/12/2022 - 08:58:09
     *
     * @param {Array<string>} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    FallbackPlacements(value: Array<string>): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.fallbackPlacements = value;
        return this;
    }
    
    /**
     * Set the html - fluent interface
     * @date 14/12/2022 - 08:58:16
     *
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Html(value: boolean): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.html = value;
        return this;
    }
    
    /**
     * Set the offset - fluent interface
     * @date 14/12/2022 - 08:58:24
     *
     * @param {(Array<string> | string)} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Offset(value: Array<string> | string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.offset = value;
        return this;
    }
    
    /**
     * Set the placement - fluent interface
     * @date 14/12/2022 - 08:58:30
     *
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Placement(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.placement = value;
        return this;
    }
    
    /**
     * Set the popper config - fluent interface
     * @date 14/12/2022 - 08:58:38
     *
     * @param {object} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    PopperConfig(value: object): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.popperConfig = value;
        return this;
    }
    
    /**
     * Set the sanitize - fluent interface
     * @date 14/12/2022 - 08:58:45
     *
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Sanitize(value: boolean): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.sanitize = value;
        return this;
    }
    
    /**
     * Set the selector - fluent interface
     * @date 14/12/2022 - 08:58:52
     *
     * @param {(string | false)} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Selector(value: string | false): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.selector = value;
        return this;
    }
    
    /**
     * Set the template - fluent interface
     * @date 14/12/2022 - 08:59:09
     *
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Template(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.template = value;
        return this;
    }
    
    /**
     * Set the title - fluent interface
     * @date 14/12/2022 - 08:59:15
     *
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Title(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.title = value;
        return this;
    }
    
    /**
     * Set the trigger - fluent interface
     * @date 14/12/2022 - 08:59:22
     *
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_TooltipConfig}
     */
    Trigger(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.trigger = value;
        return this;
    }
    
    /**
     * Create an object that can set host elements data attributes
     * @date 14/12/2022 - 08:59:30
     *
     * @public
     * @returns {object}
     */
    public toBootstrapConfig(): object {
        let config = {};
        Object.keys(this).forEach(key => {
            if (this[key] !== undefined) {
                config[`bs${key[0].toUpperCase()}${key.substring(1)}`] = this[key];
            }
        });
        config["bsToggle"] = "tooltip"
        return config;
    }
}