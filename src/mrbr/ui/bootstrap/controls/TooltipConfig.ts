export class Mrbr_UI_Bootstrap_Controls_TooltipConfig {
    animation: boolean;
    boundary: string;
    container: string;
    customClass: string;
    delay: number | Object;
    fallbackPlacements: Array<string>;
    html: boolean;
    offset: Array<string> | string;
    placement: string;
    popperConfig: object;
    sanitize: boolean;
    selector: string | false;
    template: string;
    title: string;
    trigger: string;
    constructor() { }
    Animation(value: boolean): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.animation = value;
        return this;
    }
    Boundary(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.boundary = value;
        return this;
    }
    Container(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.container = value;
        return this;
    }
    CustomClass(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.customClass = value;
        return this;
    }
    Delay(value: number | Object): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.delay = value;
        return this;
    }
    FallbackPlacements(value: Array<string>): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.fallbackPlacements = value;
        return this;
    }
    Html(value: boolean): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.html = value;
        return this;
    }
    Offset(value: Array<string> | string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.offset = value;
        return this;
    }
    Placement(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.placement = value;
        return this;
    }
    PopperConfig(value: object): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.popperConfig = value;
        return this;
    }
    Sanitize(value: boolean): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.sanitize = value;
        return this;
    }
    Selector(value: string | false): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.selector = value;
        return this;
    }
    Template(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.template = value;
        return this;
    }
    Title(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.title = value;
        return this;
    }
    Trigger(value: string): Mrbr_UI_Bootstrap_Controls_TooltipConfig {
        this.trigger = value;
        return this;
    }
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