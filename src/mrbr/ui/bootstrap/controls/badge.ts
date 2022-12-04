import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_MountPosition } from "../../controls/MountPosition";
import { Mrbr_UI_Bootstrap_Controls_Badge$Position } from "./Badge$Position";
import { Mrbr_UI_Bootstrap_Controls_Badge$Shape } from "./Badge$Shape";

export class Mrbr_UI_Bootstrap_Controls_Badge extends Mrbr_UI_Controls_Control {

    //#region Public Static Constants
    /**
     * Internal Badge Element Name
     * @date 11/11/2022 - 06:59:40
     *
     * @public
     * @static
     * @type {string}
     */
    public static readonly BADGE_NAME: string = "badge";

    /**
     * Internal Context Element Name 
     * @date 11/11/2022 - 07:01:36
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly CONTEXT_TEXT_NAME: string = "contextText";

    /**
     * Internal Badge Text Element Name
     * @date 11/11/2022 - 07:02:12
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly BADGE_TEXT_NAME: string = "badgeText";
    //#endregion Public Static Constants
    //#region Private static Constants
    private static readonly positionRelativeClass: string = "position-relative";
    //#endregion Private static Constants
    //#region Type Aliases 

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Controls_Badge
     * @date 11/11/2022 - 07:03:28
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Badge}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Badge { return Mrbr_UI_Bootstrap_Controls_Badge; }

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Controls_Badge$Position
     * @date 11/11/2022 - 07:03:47
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Badge$Position}
     */
    get $badgePosition(): typeof Mrbr_UI_Bootstrap_Controls_Badge$Position { return Mrbr_UI_Bootstrap_Controls_Badge$Position; }

    /**
     * Type Alias for Mrbr_UI_Bootstrap_Controls_Badge$Shape
     * @date 11/11/2022 - 07:04:10
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Badge$Shape}
     */
    get $badgeShape(): typeof Mrbr_UI_Bootstrap_Controls_Badge$Shape { return Mrbr_UI_Bootstrap_Controls_Badge$Shape; }
    //#endregion Type Aliases

    //#region Private Fields

    /**
     * Does parent control contain position relative class when badge is mounted. 
     * If not, it will be added and removed when badge is unmounted.
     * @date 11/11/2022 - 07:04:44
     *
     * @private
     * @type {boolean}
     */
    private hasRelativePosition: boolean = false;
    //#endregion Private Fields

    //#region Private Property Fields

    /**
     * Sets the position of the badge.
     * @date 11/11/2022 - 07:06:16
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Badge}
     */
    private _badgePosition: Mrbr_UI_Bootstrap_Controls_Badge$Position = this.$badgePosition.none;

    /**
     * Sets the position of the badge.
     * @date 11/11/2022 - 07:06:24
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Badge$Shape}
     */
    private _badgeShape: Mrbr_UI_Bootstrap_Controls_Badge$Shape = this.$badgeShape.default;

    /**
     * The Context Text of the badge. Used by assistive technologies.
     * @date 11/11/2022 - 07:06:32
     *
     * @private
     * @type {string}
     */
    private _contextText: string = "";

    /**
     * Visible badge text
     * @date 11/11/2022 - 07:07:00
     *
     * @private
     * @type {string}
     */
    private _badgeText: string = "";

    /**
     * Classes for the badge element
     * @date 11/11/2022 - 07:07:13
     *
     * @private
     * @type {string[]}
     */
    private _badgeClasses: string[] = ["text-bg-primary"];
    //#endregion Private Property Fields

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Badge.
     * @date 11/11/2022 - 07:08:12
     *
     * @constructor
     * @param {string} rootElementName
     */
    constructor(rootElementName: string) {
        super(rootElementName);
        this.defaultContainerElementName = this.$cls.BADGE_TEXT_NAME;
    }

    //#region Public Properties
    /**
     * Sets the shape of the badge.
     * @date 11/11/2022 - 07:08:21
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Badge$Shape}
     */
    public get badgeShape(): Mrbr_UI_Bootstrap_Controls_Badge$Shape { return this._badgeShape; }

    /**
     * Sets the shape of the badge.
     */
    public set badgeShape(value: Mrbr_UI_Bootstrap_Controls_Badge$Shape) {
        this.classes(this.rootElement, this.$clsActions.remove, this._badgeShape);
        this.classes(this.rootElement, this.$clsActions.add, value);
        this._badgeShape = value;
    }

    /**
     * Classes applied to badge
     * @date 11/11/2022 - 07:10:01
     *
     * @public
     * @type {string[]}
     */
    public get badgeClasses(): string[] { return this._badgeClasses; }

    /**
     * Classes applied to badge
     */
    public set badgeClasses(value: string | string[]) {
        if (!value) { return; }
        this.classes(this.rootElement, this.$clsActions.remove, this.badgeClasses);
        this.classes(this.rootElement, this.$clsActions.add, value);
        this._badgeClasses = (typeof value === "string") ? value.split(" ").map(_class => _class.trim()) : value;
    }

    /**
     * Visible badge text
     * @date 11/11/2022 - 07:10:28
     *
     * @public
     * @type {string}
     */
    public get badgeText(): string { return this._badgeText; }

    /**
     * Visible badge text
     */
    public set badgeText(value: string) {
        const element = this.elements.get(this.$cls.BADGE_TEXT_NAME)
        element && (element.textContent = value);
        this._badgeText = value;
    }

    /**
     * Context Text of the badge. Used by assistive technologies.
     * @date 11/11/2022 - 07:10:50
     *
     * @public
     * @type {string}
     */
    public get contextText(): string { return this._contextText; }

    /**
     * Context Text of the badge. Used by assistive technologies.
     */
    public set contextText(value: string) {
        if (!value) { return; }
        if (!this.elements.get(this.$cls.CONTEXT_TEXT_NAME)) {
            this.createElement(new this.$ctrlCfg(this.$cls.CONTEXT_TEXT_NAME, "span", this.elementConfig.get(this.$cls.CONTEXT_TEXT_NAME)));
            this.rootElement.appendChild(this.elements.get(this.$cls.CONTEXT_TEXT_NAME));
        }
        this.elements.get(this.$cls.CONTEXT_TEXT_NAME).textContent = value;
        this._contextText = value;
    }

    /**
     * Sets the position of the badge.
     * @date 11/11/2022 - 07:11:39
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Badge}
     */
    public get badgePosition(): Mrbr_UI_Bootstrap_Controls_Badge$Position { return this._badgePosition; }

    /**
     * Sets the position of the badge.
     */
    public set badgePosition(value: Mrbr_UI_Bootstrap_Controls_Badge$Position) {
        const self = this;
        self.classes(self.rootElement, self.$clsActions.remove,
            Array.from(new Set(Object.keys(self.$badgePosition).map(_key => self.$badgePosition[_key].split(" ").map(_class => _class.trim())).flat(3))));
        (self.badgePosition === self.$badgePosition.none) && (self.classes(self.rootElement, self.$clsActions.add, value));
        self._badgePosition = value;
    }
    //#endregion Public Properties

    /**
     * Initialises the control, load manifest and set properties 
     * @date 11/11/2022 - 07:11:54
     *
     * @public
     * @param {...*} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Badge>}
     */
    public initialise(...args: any): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Badge> {
        const self = this,
            initialisePromise = self.$promise.create(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:initialise`);
        super.initialise(args)
            .then(async result => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, "span", self.elementConfig.get(self.$cls.BADGE_NAME)
                    .Children([
                        new self.$ctrlCfg(self.$cls.BADGE_TEXT_NAME, "span", self.elementConfig.get(self.$cls.BADGE_TEXT_NAME))
                    ])))
                self.badgeText = self._badgeText;
                self.contextText = self._contextText;
                self.badgePosition = self._badgePosition;
                self.badgeShape = self._badgeShape;
                self.badgeClasses = self._badgeClasses;
                initialisePromise.resolve(self);
            })
            .catch(error => {
                initialisePromise.reject(error);
            });
        return initialisePromise;
    }

    /**
     * Mount the badge to the parent and sets relative-positioning to parent if missing
     * @date 11/11/2022 - 07:12:36
     *
     * @public
     * @override
     * @param {HTMLElement} parent
     * @param {Mrbr_UI_Controls_MountPosition} [position=Mrbr_UI_Controls_MountPosition.append]
     * @param {...*} args
     * @returns {Mrbr_UI_Bootstrap_Controls_Badge}
     */
    public override mount(parent: HTMLElement, position: Mrbr_UI_Controls_MountPosition = Mrbr_UI_Controls_MountPosition.append, ...args: any): Mrbr_UI_Bootstrap_Controls_Badge {
        super.mount(parent, position, args);
        this.hasRelativePosition = parent.classList.contains(this.$cls.positionRelativeClass);
        this.classes(parent, this.$clsActions.add, this.$cls.positionRelativeClass);
        return this;
    }

    /**
     * Set the default configuration for the control
     * @date 11/11/2022 - 07:13:06
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Badge>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Badge> {
        const self = this,
            setDefaultConfigPromise = self.$promise.create<Mrbr_UI_Bootstrap_Controls_Badge>(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:setDefaultConfig`);
        try {
            super.setDefaultConfig().then(_ => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
                    .setIfNotExist(self.$cls.BADGE_NAME, new self.$ctrlPrm()
                        .Classes(["badge"]))
                    .setIfNotExist(self.$cls.BADGE_TEXT_NAME, new self.$ctrlPrm())
                    .setIfNotExist(self.$cls.CONTEXT_TEXT_NAME, new self.$ctrlPrm()
                        .Classes(["visually-hidden"]));
                setDefaultConfigPromise.resolve(self);
            })
        } catch (error) { setDefaultConfigPromise.reject(error); }
        return setDefaultConfigPromise;
    }

    /**
     * Dispose of the control. Removes the control from the DOM and removes all event listeners
     * Remove relative positioning from parent if it was added by the control
     * @date 11/11/2022 - 07:13:28
     *
     * @public
     * @override
     */
    public override dispose() {
        !this.hasRelativePosition && this.classes(this.rootElement.parentElement, this.$clsActions.remove, this.$cls.positionRelativeClass);
        super.dispose();
    }
}