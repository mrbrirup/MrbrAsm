import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Controls_Control } from "../../controls/Control";
import { Mrbr_UI_Controls_IControl } from "../../controls/IControl";
import { Mrbr_UI_Controls_MountPosition } from "../../controls/MountPosition";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";

/**
 * Toolbar control
 * @date 13/12/2022 - 15:32:55
 *
 * @export
 * @class Mrbr_UI_Bootstrap_Controls_Toolbar
 * @typedef {Mrbr_UI_Bootstrap_Controls_Toolbar}
 * @extends {Mrbr_UI_Bootstrap_Controls_BootstrapControl}
 */
export class Mrbr_UI_Bootstrap_Controls_Toolbar extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    /**
     * Internal Toolbar control name
     * @date 13/12/2022 - 15:33:09
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOOLBAR_NAME: string = "toolbar";


    /**
     * Internal Toolbar Divider name
     * @date 13/12/2022 - 15:41:57
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly TOOLBAR_DIVIDER: string = "toolbar_divider";

    /**
     * Toolbar Type Alias
     * @date 13/12/2022 - 15:42:11
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Toolbar}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Toolbar { return Mrbr_UI_Bootstrap_Controls_Toolbar; }

    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Toolbar.
     * @date 13/12/2022 - 15:42:34
     *
     * @constructor
     * @param {?string} [rootElementName]
     */
    constructor(rootElementName?: string) {
        super(rootElementName);
        this.defaultContainerElementName = rootElementName;
    }

    /**
     * Initialise the control, load manifest and set default config
     * @date 13/12/2022 - 15:42:41
     *
     * @public
     * @param {...*} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toolbar>}
     */
    public initialise(...args: any): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toolbar> {
        const
            self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create(`${controlName}:initialise`);
        super.initialise(args)
            .then(async _ => {
                await self.loadManifest(this.$cls);
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(self.rootElementName, self.$htmlt.div, self.elementConfig.getConfig(self.$cls.TOOLBAR_NAME)))
                initialisePromise.resolve(self);
            })
        return initialisePromise;
    }

    /**
     * Set default config
     * @date 13/12/2022 - 15:42:54
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toolbar>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Toolbar> {
        const self = this,
            controlName = self.$cls[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create(`${controlName}:setDefaultConfig`);
        super
            .setDefaultConfig()
            .then(async => {
                self.elementConfig
                    .controlName(controlName)
                    .setIfNotExist(self.$cls.TOOLBAR_NAME, new self.$ctrlPrm()
                        .Classes("btn-toolbar")
                        .Attributes({ role: "toolbar" })
                        .Aria({ "label": "Toolbar with button groups" }))
                    .setIfNotExist(self.$cls.TOOLBAR_DIVIDER, new self.$ctrlPrm()
                        .Classes("me-2"))
                setDefaultConfigPromise.resolve(self);
            })
        return setDefaultConfigPromise
    }

    /**
     * Space the Toolbar child button groups
     * @date 13/12/2022 - 15:43:08
     *
     * @public
     */
    public spaceButtonGroups() {
        const
            self = this,
            children = self.rootElement.children,
            childrenLength = children.length || 0 as number,
            act = self.$clsActions,
            cfg = self.elementConfig.getConfig(self.$cls.TOOLBAR_DIVIDER);
        if (childrenLength <= 1) { return; }
        for (let childCounter = 0; childCounter < childrenLength - 1; childCounter++) {
            self.assignElementConfig(<HTMLElement>children[childCounter], cfg);
        }
    }
    
    /**
     * Mount the control to the host element and space the button groups 
     * @date 13/12/2022 - 15:43:30
     *
     * @public
     * @param {(HTMLElement | Mrbr_UI_Controls_Control | string)} hostElement
     * @param {Mrbr_UI_Controls_MountPosition} [position=Mrbr_UI_Controls_MountPosition.append]
     * @param {(HTMLElement | Mrbr_UI_Controls_Control)} [mountingElement=null]
     * @param {...*} args
     * @returns {Mrbr_UI_Controls_IControl}
     */
    public mount(hostElement: HTMLElement | Mrbr_UI_Controls_Control | string, position: Mrbr_UI_Controls_MountPosition = Mrbr_UI_Controls_MountPosition.append, mountingElement: HTMLElement | Mrbr_UI_Controls_Control = null, ...args: any): Mrbr_UI_Controls_IControl {
        super.mount(hostElement, position, mountingElement, args);
        this.spaceButtonGroups();
        return this;
    }
}