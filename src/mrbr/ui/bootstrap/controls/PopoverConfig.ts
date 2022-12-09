import { Mrbr_UI_Bootstrap_Controls_PopoverPlacements } from "./PopoverPlacements";
import { Mrbr_UI_Bootstrap_Controls_PopoverTriggers } from "./PopoverTriggers";


/**
 * Configuration Class for Popover matching Popper Config
 * @date 09/12/2022 - 09:28:06
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_PopoverConfig
 * @typedef {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
 */
export class Mrbr_UI_Bootstrap_Controls_PopoverConfig {

    /**
     * Default title value if title attribute isn’t present. If a function is given, it will be called with its this reference set to the element that the popover is attached to.
     * @date 09/12/2022 - 09:41:28
     *
     * @public
     * @type {string}
     */
    public title: string;

    /**
     * 	Default content value if data-bs-content attribute isn’t present. If a function is given, it will be called with its this reference set to the element that the popover is attached to.
     * @date 09/12/2022 - 09:37:36
     *
     * @public
     * @type {string}
     */
    public content: string;

    /**
     * Object which contains allowed attributes and tags.
     * @date 09/12/2022 - 09:35:07
     *
     * @type {string}
     */
    allowList: string;

    /**
     * Apply a CSS fade transition to the popover.
     * @date 09/12/2022 - 09:36:32
     *
     * @type {boolean}
     */
    animation: boolean = true;

    /**
     * Overflow constraint boundary of the popover (applies only to Popper’s preventOverflow modifier). By default, it’s 'clippingParents' and can accept an HTMLElement reference (via JavaScript only). For more information refer to Popper’s detectOverflow docs.
     * @date 09/12/2022 - 09:36:57
     *
     * @type {string}
     */
    boundary: string = 'clippingParents';

    /**
     * Appends the popover to a specific element. Example: container: 'body'. This option is particularly useful in that it allows you to position the popover in the flow of the document near the triggering element - which will prevent the popover from floating away from the triggering element during a window resize.
     * @date 09/12/2022 - 09:37:21
     *
     * @type {(string | HTMLElement | false)}
     */
    container: string | HTMLElement | false = false;

    /**
     * 	Add classes to the popover when it is shown. Note that these classes will be added in addition to any classes specified in the template. To add multiple classes, separate them with spaces: 'class-1 class-2'. You can also pass a function that should return a single string containing additional class names.
     * @date 09/12/2022 - 09:38:00
     *
     * @type {string}
     */
    customClass: string;

    /**
     * Delay showing and hiding the popover (ms)—doesn’t apply to manual trigger type. If a number is supplied, delay is applied to both hide/show. Object structure is: delay: { "show": 500, "hide": 100 }.
     * @date 09/12/2022 - 09:38:16
     *
     * @type {number}
     */
    delay: number = 0;

    /**
     * Define fallback placements by providing a list of placements in array (in order of preference). For more information refer to Popper’s behavior docs.
     * @date 09/12/2022 - 09:38:41
     *
     * @type {Array<Mrbr_UI_Bootstrap_Controls_PopoverPlacements>}
     */
    fallbackPlacements: Array<Mrbr_UI_Bootstrap_Controls_PopoverPlacements>

    /**
     * Allow HTML in the popover. If true, HTML tags in the popover’s title will be rendered in the popover. If false, innerText property will be used to insert content into the DOM. Use text if you’re worried about XSS attacks.
     * @date 09/12/2022 - 09:39:13
     *
     * @type {boolean}
     */
    html: boolean = false;

    /**
     * Offset of the popover relative to its target. You can pass a string in data attributes with comma separated values like: data-bs-offset="10,20". When a function is used to determine the offset, it is called with an object containing the popper placement, the reference, and popper rects as its first argument. The triggering element DOM node is passed as the second argument. The function must return an array with two numbers: skidding, distance. For more information refer to Popper’s offset docs.
     * @date 09/12/2022 - 09:39:29
     *
     * @type {(number | number[] | string | Function)}
     */
    offset: number | number[] | string | Function;

    /**
     * How to position the popover: auto, top, bottom, left, right. When auto is specified, it will dynamically reorient the popover. When a function is used to determine the placement, it is called with the popover DOM node as its first argument and the triggering element DOM node as its second. The this context is set to the popover instance.
     * @date 09/12/2022 - 09:39:48
     *
     * @type {Mrbr_UI_Bootstrap_Controls_PopoverPlacements}
     */
    placement: Mrbr_UI_Bootstrap_Controls_PopoverPlacements;

    /**
     * To change Bootstrap’s default Popper config, see Popper’s configuration. When a function is used to create the Popper configuration, it’s called with an object that contains the Bootstrap’s default Popper configuration. It helps you use and merge the default with your own configuration. The function must return a configuration object for Popper.
     * @date 09/12/2022 - 09:40:04
     *
     * @type {(Function | object | null)}
     */
    popperConfig: Function | object | null;

    /**
     * Here you can supply your own sanitize function. This can be useful if you prefer to use a dedicated library to perform sanitization.
     * @date 09/12/2022 - 09:40:24
     *
     * @type {boolean}
     */
    sanitize: boolean = true;

    /**
     * If a selector is provided, popover objects will be delegated to the specified targets. In practice, this is used to also apply popovers to dynamically added DOM elements (jQuery.on support). See this issue and an informative example. Note: title attribute must not be used as a selector.
     * @date 09/12/2022 - 09:40:41
     *
     * @type {(string | false)}
     */
    selector: string | false = false;

    /**
     * Base HTML to use when creating the popover. The popover’s title will be injected into the .popover-inner. .popover-arrow will become the popover’s arrow. The outermost wrapper element should have the .popover class and role="popover".
     * @date 09/12/2022 - 09:41:09
     *
     * @type {string}
     */
    template: string;

    /**
     * How popover is triggered: click, hover, focus, manual. You may pass multiple triggers; separate them with a space. 'manual' indicates that the popover will be triggered programmatically via the .popover('show'), .popover('hide') and .popover('toggle') methods; this value cannot be combined with any other trigger. 'hover' on its own will result in popovers that cannot be triggered via the keyboard, and should only be used if alternative methods for conveying the same information for keyboard users is present.
     * @date 09/12/2022 - 09:41:53
     *
     * @type {string}
     */
    trigger: string;

    /**
     * Popover is Dismissable
     * @date 09/12/2022 - 09:43:02
     *
     * @type {boolean}
     */
    dismissable: boolean = true;

    /**
     * Popover is Dismissable on Next Click
     * @date 09/12/2022 - 09:43:23
     *
     * @type {boolean}
     */
    dismissOnNextClick: boolean = false;

    /**
     * Popover is Disabled
     * @date 09/12/2022 - 09:43:36
     *
     * @type {boolean}
     */
    disabled: boolean = false;

    /**
     * Popover Sanitize Function
     * @date 09/12/2022 - 09:43:43
     *
     * @type {Function}
     */
    sanitizeFn: Function = null;

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_PopoverConfig.
     * @date 09/12/2022 - 09:43:51
     *
     * @constructor
     * @param {string} title
     * @param {string} content
     */
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
        const
            pt = Mrbr_UI_Bootstrap_Controls_PopoverTriggers,
            pp = Mrbr_UI_Bootstrap_Controls_PopoverPlacements;
        this
            .Trigger([pt.hover, pt.focus].join(" "))
            .FallbackPlacements([pp.top, pp.right, pp.bottom, pp.left])
            .Placement(pp.top);
    }


    /**
     * Set Title for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:31:12
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Title(value: string): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.title = value;
        return this;
    }

    /**
     * Set Content for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:31:47
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Content(value: string): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.content = value;
        return this;
    }

    /**
     * Set Placement for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:31:56
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_PopoverPlacements} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Placement(value: Mrbr_UI_Bootstrap_Controls_PopoverPlacements): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.placement = value;
        return this;
    }

    /**
     * Set FallbackPlacements for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:32:04
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Dismissable(value: boolean): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.dismissable = value;
        return this;
    }

    /**
     * Set Container for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:32:11
     *
     * @public
     * @param {(string | HTMLElement | false)} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Container(value: string | HTMLElement | false): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.container = value;
        return this;
    }

    /**
     * Set CustomClass for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:32:21
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public CustomClass(value: string): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.customClass = value;
        return this;
    }

    /**
     * Set DismissOnNextClick for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:32:30
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public DismissOnNextClick(value: boolean): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.dismissOnNextClick = value;
        return this;
    }

    /**
     * Set Disabled for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:32:38
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Disabled(value: boolean): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.disabled = value;
        return this;
    }
    public AllowList(value: string): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.allowList = value;
        return this;
    }

    /**
     * Set Animation for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:32:46
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Animation(value: boolean): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.animation = value;
        return this;
    }

    /**
     * Set Boundary for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:32:54
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Boundary(value: string): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.boundary = value;
        return this;
    }

    /**
     * Set Delay for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:03
     *
     * @public
     * @param {number} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Delay(value: number): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.delay = value;
        return this;
    }

    /**
     * Set FallbackPlacements for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:12
     *
     * @public
     * @param {Array<Mrbr_UI_Bootstrap_Controls_PopoverPlacements>} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public FallbackPlacements(value: Array<Mrbr_UI_Bootstrap_Controls_PopoverPlacements>): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.fallbackPlacements = value;
        return this;
    }

    /**
     * Set Html for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:20
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Html(value: boolean): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.html = value;
        return this;
    }

    /**
     * Set Offset for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:27
     *
     * @public
     * @param {(number | number[] | string | Function)} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Offset(value: number | number[] | string | Function): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.offset = value;
        return this;
    }

    /**
     * Set Placement for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:35
     *
     * @public
     * @param {string} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Trigger(value: string): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.trigger = value;
        return this;
    }

    /**
     * Set Sanitize for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:43
     *
     * @public
     * @param {boolean} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Sanitize(value: boolean): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.sanitize = value;
        return this;
    }

    /**
     * Set SanitizeFn for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:50
     *
     * @public
     * @param {Function} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public SanitizeFn(value: Function): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.sanitizeFn = value;
        return this;
    }

    /**
     * Set Selector for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:33:57
     *
     * @public
     * @param {(string | false)} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public Selector(value: string | false): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.selector = value;
        return this;
    }

    /**
     * Set Template for Popover Config - Fluent Interface
     * @date 09/12/2022 - 09:34:04
     *
     * @public
     * @param {(Function | object | null)} value
     * @returns {Mrbr_UI_Bootstrap_Controls_PopoverConfig}
     */
    public PopperConfig(value: Function | object | null): Mrbr_UI_Bootstrap_Controls_PopoverConfig {
        this.popperConfig = value;
        return this;
    }
}