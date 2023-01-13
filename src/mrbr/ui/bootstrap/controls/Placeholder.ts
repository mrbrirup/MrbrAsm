import { Mrbr_System_Promise } from "../../../system/Promise"
import { Mrbr_UI_Controls_Control } from "../../controls/Control"
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl"
import { Mrbr_UI_Controls_MountPosition } from "../../controls/MountPosition"
import { Mrbr_UI_Bootstrap_Utilities_Backgrounds } from "../utilities/backgrounds"
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl"
import { Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations } from "./PlaceholderAnimations"
import { Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes } from "./PlaceholderElementTypes"
import { Mrbr_UI_Bootstrap_Controls_PlaceholderSizings } from "./PlaceholderSizings"
import { Mrbr_UI_Bootstrap_Controls_PlaceholderWidths } from "./PlaceholderWidths"

export class Mrbr_UI_Bootstrap_Controls_Placeholder extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    //#region Public Static Constants

    /**
     * Internal Placeholder Name
     * @date 09/12/2022 - 05:55:47
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly PLACEHOLDER_NAME: string = "placeholder";
    //#endregion Public Static Constants

    //#region Public Type Aliases

    /**
     * Placeholder Class Type Alias
     * @date 09/12/2022 - 05:56:02
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Placeholder}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Placeholder { return Mrbr_UI_Bootstrap_Controls_Placeholder }

    /**
     * Placeholder Animations Enum Alias
     * @date 09/12/2022 - 05:56:12
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations}
     */
    public get $pha(): typeof Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations { return this.$bsc.PlaceholderAnimations as typeof Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations }

    /**
     * Placeholder Element Types Enum Alias
     * @date 09/12/2022 - 05:56:31
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes}
     */
    public get $phet(): typeof Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes { return this.$bsc.PlaceholderElementTypes as typeof Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes }

    /**
     * Placeholder Sizings Enum Alias
     * @date 09/12/2022 - 05:56:41
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PlaceholderSizings}
     */
    public get $phs(): typeof Mrbr_UI_Bootstrap_Controls_PlaceholderSizings { return this.$bsc.PlaceholderSizings as typeof Mrbr_UI_Bootstrap_Controls_PlaceholderSizings }

    /**
     * Placeholder Widths Enum Alias
     * @date 09/12/2022 - 05:56:48
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_PlaceholderWidths}
     */
    public get $phw(): typeof Mrbr_UI_Bootstrap_Controls_PlaceholderWidths { return this.$bsc.PlaceholderWidths as typeof Mrbr_UI_Bootstrap_Controls_PlaceholderWidths }
    //#endregion Public Type Aliases


    //#region Private Fields

    /**
     * Placeholder Width Field
     * @date 09/12/2022 - 05:57:04
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderWidths}
     */
    private _width: Mrbr_UI_Bootstrap_Controls_PlaceholderWidths;

    /**
     * Placeholder Animation Field
     * @date 09/12/2022 - 05:57:13
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations}
     */
    private _animation: Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations;

    /**
     * Placeholder Element Type Field
     * @date 09/12/2022 - 05:57:19
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes}
     */
    private _elementType: Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes;

    /**
     * Placeholder Sizing Field
     * @date 09/12/2022 - 05:57:25
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderSizings}
     */
    private _sizing: Mrbr_UI_Bootstrap_Controls_PlaceholderSizings;

    /**
     * Placeholder Colour Field
     * @date 09/12/2022 - 05:57:33
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Utilities_Backgrounds}
     */
    private _colour: Mrbr_UI_Bootstrap_Utilities_Backgrounds
    //#endregion Private Fields
    //#region Public Properties

    /**
     * Placeholder Animation Property. Animations are only applied to the parent element of the placeholder.
     * Animation classes are removed from the parent element when all placeholders are removed.
     * @date 09/12/2022 - 05:57:48
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations}
     */
    public get animation(): Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations { return this._animation ??= this.$pha.none }


    /**
     * Placeholder Animation Property. Animations are only applied to the parent element of the placeholder.
     * Animation classes are removed from the parent element when all placeholders are removed.
     */
    public set animation(value: Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations) {
        const root = this.rootElement,
            parent = root?.parentElement;
        (parent) && (this.classes(parent, this.$clsActions.replace, [this.animation, value]));
        this._animation = value
    }

    /**
     * Placeholder Colour Property
     * @date 09/12/2022 - 05:58:57
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Utilities_Backgrounds}
     */
    public get colour(): Mrbr_UI_Bootstrap_Utilities_Backgrounds { return this._colour }

    /**
     * Placeholder Colour Property
     */
    public set colour(value: Mrbr_UI_Bootstrap_Utilities_Backgrounds) {
        const
            self = this,
            root = self.rootElement;
        (root) && (self.classes(root, self.$clsActions.replace, [self.colour, value]));
        this._colour = value
    }

    /**
     * Placeholder Element Type Property
     * @date 09/12/2022 - 05:59:13
     *
     * @public
     * @readonly
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes}
     */
    public get elementType(): Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes { return this._elementType ??= this.$phet.span }

    /**
     * Placeholder Element Sizing Property
     * @date 09/12/2022 - 05:59:21
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderSizings}
     */
    public get sizing(): Mrbr_UI_Bootstrap_Controls_PlaceholderSizings { return this._sizing ??= this.$phs.default }

    /**
     * Placeholder Element Sizing Property
     */
    public set sizing(value: Mrbr_UI_Bootstrap_Controls_PlaceholderSizings) {
        const
            self = this,
            root = self.rootElement;
        (root) && (self.classes(root, self.$clsActions.replace, [self.sizing, value]));
        this._sizing = value
    }

    /**
     * Placeholder Element Width Property
     * @date 09/12/2022 - 05:59:51
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_PlaceholderWidths}
     */
    public get width(): Mrbr_UI_Bootstrap_Controls_PlaceholderWidths { return this._width ??= this.$phw.w100 }

    /**
     * Placeholder Element Width Property
     */
    public set width(value: Mrbr_UI_Bootstrap_Controls_PlaceholderWidths) {
        const
            self = this,
            root = self.rootElement;
        (root) && (self.classes(root, self.$clsActions.replace, [self.width, value]));
        this._width = value
    }
    //#endregion Public Properties
    constructor(elementType?: Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes, width?: Mrbr_UI_Bootstrap_Controls_PlaceholderWidths, sizing?: Mrbr_UI_Bootstrap_Controls_PlaceholderSizings) {
        super();
        width && (this.width = width);
        elementType && (this._elementType = elementType);
        sizing && (this.sizing = sizing);
    }
    //#region Public Methods

    /**
     * Placeholder Dispose Method
     * @date 09/12/2022 - 06:00:08
     *
     * @public
     */
    public dispose(): void {
        const root = this.rootElement,
            parent = root?.parentElement;
        (parent && !(parent.querySelector(Object.values(this.$pha).filter(val => val !== "").map(val => "." + val).join(", ")))) && (this.classes(parent, this.$clsActions.remove, this.animation));
        super.dispose();
    }

    /**
     * Placeholder Width Property Setter Method - Fluent Interface
     * @date 09/12/2022 - 06:00:24
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_PlaceholderWidths} width
     * @returns {Mrbr_UI_Bootstrap_Controls_Placeholder}
     */
    public Width(width: Mrbr_UI_Bootstrap_Controls_PlaceholderWidths): Mrbr_UI_Bootstrap_Controls_Placeholder {
        this.width = width;
        return this;
    }

    /**
     * Placeholder Sizing Property Setter Method - Fluent Interface
     * @date 09/12/2022 - 06:01:21
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations} animation
     * @returns {Mrbr_UI_Bootstrap_Controls_Placeholder}
     */
    public Animation(animation: Mrbr_UI_Bootstrap_Controls_PlaceholderAnimations): Mrbr_UI_Bootstrap_Controls_Placeholder {
        this.animation = animation;
        return this;
    }

    /**
     * Placeholder Colour Property Setter Method - Fluent Interface
     * @date 09/12/2022 - 06:01:31
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes} elementType
     * @returns {Mrbr_UI_Bootstrap_Controls_Placeholder}
     */
    public ElementType(elementType: Mrbr_UI_Bootstrap_Controls_PlaceholderElementTypes): Mrbr_UI_Bootstrap_Controls_Placeholder {
        if (this.rootElement) { throw new Error("Cannot change element type after control has been initialised") }
        this._elementType = elementType;
        return this;
    }

    /**
     * Placeholder Sizing Property Setter Method - Fluent Interface
     * @date 09/12/2022 - 06:01:39
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Controls_PlaceholderSizings} sizing
     * @returns {Mrbr_UI_Bootstrap_Controls_Placeholder}
     */
    public Sizing(sizing: Mrbr_UI_Bootstrap_Controls_PlaceholderSizings): Mrbr_UI_Bootstrap_Controls_Placeholder {
        this.sizing = sizing;
        return this;
    }

    /**
     * Placeholder Colour Property Setter Method - Fluent Interface
     * @date 09/12/2022 - 06:01:47
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Utilities_Backgrounds} colour
     * @returns {Mrbr_UI_Bootstrap_Controls_Placeholder}
     */
    public Colour(colour: Mrbr_UI_Bootstrap_Utilities_Backgrounds): Mrbr_UI_Bootstrap_Controls_Placeholder {
        this.colour = colour;
        return this;
    }

    /**
     * Placeholder Initialise Method, load manifest and sets properties
     * @date 09/12/2022 - 06:01:56
     *
     * @public
     * @param {...{}} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Placeholder>}
     */
    public initialise(...args): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Placeholder> {
        const cls = Mrbr_UI_Bootstrap_Controls_Placeholder,
            placeholder = this,
            self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = this.$promise.create(`${controlName}:initialise`);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(this.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.elementType, self.elementConfig.getConfig(self.$cls.PLACEHOLDER_NAME)))
                self.width = self.width;
                self.animation = self.animation;
                self.sizing = self.sizing;
                self.colour = self.colour;
                initialisePromise.resolve(self);
            })
        return initialisePromise;
    }

    /**
     * Placeholder Set Default Config Method
     * @date 09/12/2022 - 06:02:20
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Placeholder>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Placeholder> {
        const cls = Mrbr_UI_Bootstrap_Controls_Placeholder,
            self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig()
            .then(_ => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$cls.PLACEHOLDER_NAME, new self.$ctrlPrm()
                        .Classes("placeholder"));
                setDefaultConfigPromise.resolve(self);
            })
        return setDefaultConfigPromise;
    }

    /**
     * Placeholder Mount Method overrides base control mount method. If Animation is set then it is applied to the parent element
     * @date 09/12/2022 - 06:02:32
     *
     * @public
     * @param {(HTMLElement | Mrbr_UI_Controls_Control | string)} hostElement
     * @param {Mrbr_UI_Controls_MountPosition} [position=Mrbr_UI_Controls_MountPosition.append]
     * @param {(HTMLElement | Mrbr_UI_Controls_Control)} [mountingElement=null]
     * @param {...*} args
     * @returns {Mrbr_UI_Controls_IControl}
     */
    public mount(hostElement: HTMLElement | Mrbr_UI_Controls_Control | string, position: Mrbr_UI_Controls_MountPosition = Mrbr_UI_Controls_MountPosition.append, mountingElement: HTMLElement | Mrbr_UI_Controls_Control = null, ...args: any): Mrbr_UI_Controls_IControl {
        super.mount(hostElement, position, mountingElement, ...args);
        return this.Animation(this.animation);
    }
    //#endregion Public Methods



}