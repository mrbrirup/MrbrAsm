import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "../controls/BootstrapControl";
import { Mrbr_UI_Bootstrap_Layout_ContainerTypes } from "./ContainerTypes";

export class Mrbr_UI_Bootstrap_Layout_Container extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {

    /**
     * Container Control Type Alias
     * @date 23/12/2022 - 02:06:35
     *
     * @public
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Layout_Container}
     */
    public get $container(): typeof Mrbr_UI_Bootstrap_Layout_Container { return Mrbr_UI_Bootstrap_Layout_Container; }


    /**
     * Container Types for Bootstrap Responsive Containers
     * @date 23/12/2022 - 02:07:05
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Layout_ContainerTypes}
     */
    private _containerType: Mrbr_UI_Bootstrap_Layout_ContainerTypes;


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Layout_Container.
     * @date 23/12/2022 - 02:07:16
     *
     * @constructor
     * @param {?string} [rootElementName]
     * @param {?Mrbr_UI_Bootstrap_Layout_ContainerTypes} [containerType]
     */
    constructor(rootElementName?: string, containerType?: Mrbr_UI_Bootstrap_Layout_ContainerTypes) {
        super(rootElementName);
        this.containerType = containerType;
    }

    /**
     * Container Type. Default is container
     * @date 23/12/2022 - 02:07:23
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Layout_ContainerTypes}
     */
    public get containerType(): Mrbr_UI_Bootstrap_Layout_ContainerTypes {
        return this._containerType ??= Mrbr_UI_Bootstrap_Layout_ContainerTypes.container;
    }

    /**
     * Container Type. Default is container
     */
    public set containerType(value: Mrbr_UI_Bootstrap_Layout_ContainerTypes) {
        const root = this.rootElement;
        (root) && (this.classes(root, this.$clsActions.replace, [this.containerType, value]));
        this._containerType = value;
    }

    /**
     * Initialise the control, load the manifest and set the default config
     * @date 23/12/2022 - 02:07:45
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Layout_Container>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Layout_Container> {
        const
            self = this,
            controlName = self.$container[self.$mrbr.COMPONENT_NAME],
            initialisePromise = self.$promise.create<Mrbr_UI_Bootstrap_Layout_Container>(`${controlName}:initialise`),
            rootElementName = self.rootElementName;
        super.initialise(...args)
            .then(async _ => {
                await self.loadManifest(self.$container)
                await self.setDefaultConfig();
                self.createElement(new self.$ctrlCfg(rootElementName, self.$htmlt.div, new self.$ctrlPrm()))
                self.defaultContainerElementName = rootElementName;
                self.containerType = self.containerType;
                initialisePromise.resolve(self);
            })
            .catch(_ => initialisePromise.reject());
        return initialisePromise;
    }

    /**
     * Set the default config for the control
     * @date 23/12/2022 - 02:08:41
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<any>}
     */
    public setDefaultConfig(...args: any[]): Mrbr_System_Promise<any> {
        const self = this,
            controlName = self.$container[self.$mrbr.COMPONENT_NAME],
            setDefaultConfigPromise = self.$promise.create<any>(`${controlName}:setDefaultConfig`);
        super.setDefaultConfig(...args)
            .then(async _ => setDefaultConfigPromise.resolve(self))
            .catch(_ => setDefaultConfigPromise.reject());
        return setDefaultConfigPromise;
    }

    /**
     * Set the container type, Returns the container for chaining
     * @date 23/12/2022 - 02:08:50
     *
     * @public
     * @param {Mrbr_UI_Bootstrap_Layout_ContainerTypes} containerType
     * @returns {Mrbr_UI_Bootstrap_Layout_Container}
     */
    public ContainerType(containerType: Mrbr_UI_Bootstrap_Layout_ContainerTypes): Mrbr_UI_Bootstrap_Layout_Container {
        this.containerType = containerType;
        return this;
    }
}