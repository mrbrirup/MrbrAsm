import { Mrbr_System_Events_Event } from "../../../system/events/Event";
import { Mrbr_System_Promise } from "../../../system/Promise";
import { Mrbr_UI_Bootstrap_Utilities_Display } from "../utilities/display";
import { Mrbr_UI_Bootstrap_Controls_Alert$Contexts } from "./Alert$contexts";
import { Mrbr_UI_Bootstrap_Controls_BootstrapControl } from "./BootstrapControl";

export class Mrbr_UI_Bootstrap_Controls_Alert extends Mrbr_UI_Bootstrap_Controls_BootstrapControl {


    /**
     * Bootstrap Alert Close Event Name
     * @date 10/11/2022 - 14:49:24
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly CLOSE_BS_ALERT_EVENT_NAME: string = "close.bs.alert";

    /**
     * Boostrap Alert Closed Event Handler
     * @date 10/11/2022 - 14:49:45
     *
     * @private
     * @static
     * @readonly
     * @type {string}
     */
    private static readonly CLOSED_BS_ALERT_EVENT_NAME: string = "closed.bs.alert";

    //#region Public Control Element Names 

    /**
     * Alert Control Name
     * @date 10/11/2022 - 14:50:01
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly ALERT_CONTROL_NAME: string = "alert_name";

    /**
     * Alert Close Button Name
     * @date 10/11/2022 - 14:50:16
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly ALERT_CLOSE_BUTTON_NAME: string = "alert_close_button";

    /**
     * Alert Text Container Name
     * @date 10/11/2022 - 14:50:28
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly ALERT_TEXT_CONTAINER_NAME: string = "alert_text_container";

    //#endregion Public Control Element Names
    //#region Private Property Fields

    /**
     * Alert Colouring Context Field
     * @date 10/11/2022 - 14:50:53
     *
     * @private
     * @type {Mrbr_UI_Bootstrap_Controls_Alert}
     */
    private _alertContext: Mrbr_UI_Bootstrap_Controls_Alert$Contexts = Mrbr_UI_Bootstrap_Controls_Alert$Contexts.success;

    /**
     * Alert flag to Show Close Button Field
     * @date 10/11/2022 - 14:51:45
     *
     * @private
     * @type {boolean}
     */
    private _showCloseButton: boolean = true;

    //#endregion Private Property Fields

    /**
     * Type Alias for Alert
     * @date 10/11/2022 - 14:52:09
     *
     * @readonly
     * @type {typeof Mrbr_UI_Bootstrap_Controls_Alert}
     */
    get $cls(): typeof Mrbr_UI_Bootstrap_Controls_Alert { return Mrbr_UI_Bootstrap_Controls_Alert; }


    /**
     * Creates an instance of Mrbr_UI_Bootstrap_Controls_Alert.
     * @date 10/11/2022 - 14:52:33
     *
     * @constructor
     */
    constructor() { super(); }
    //#region Public Properties

    /**
     * Flag to show the Close Button
     * @date 10/11/2022 - 14:52:40
     *
     * @public
     * @type {boolean}
     */
    public get showCloseButton(): boolean { return this._showCloseButton; }

    /**
     * Flag to show the Close Button
     */
    public set showCloseButton(value: boolean) {
        const
            self = this,
            display = Mrbr_UI_Bootstrap_Utilities_Display,
            rootElement = self.rootElement,
            alertButton =
                self.elements.get(self.$cls.ALERT_CLOSE_BUTTON_NAME) ||
                <HTMLElement>self.createElement(new self.$ctrlCfg(self.$cls.ALERT_CLOSE_BUTTON_NAME, "button", self.elementConfig.getConfig(self.$cls.ALERT_CLOSE_BUTTON_NAME))),
            act = self.$clsActions;
        rootElement && alertButton && alertButton.parentElement !== rootElement && rootElement.appendChild(alertButton);
        alertButton && self.classes(alertButton, value ? act.remove : act.add, display.none);
        rootElement && self.classes(rootElement, value ? act.add : act.remove, "alert-dismissible fade show");
        this._showCloseButton = value;
    }

    /**
     * Set the Alert Context Colour
     * @date 10/11/2022 - 14:54:11
     *
     * @public
     * @type {Mrbr_UI_Bootstrap_Controls_Alert}
     */
    public get alertContext(): Mrbr_UI_Bootstrap_Controls_Alert$Contexts { return this._alertContext; }

    /**
     * Set the Alert Context Colour
     */
    public set alertContext(value: Mrbr_UI_Bootstrap_Controls_Alert$Contexts) {
        const self = this,
            alertContexts = Mrbr_UI_Bootstrap_Controls_Alert$Contexts,
            rootElement = self.rootElement;
        if (rootElement) {
            self.classes(rootElement, self.$clsActions.remove, Object.keys(alertContexts).map(key => alertContexts[key]))
            self.classes(rootElement, self.$clsActions.add, value);
        }
        this._alertContext = value;
    }
    //#endregion Public Properties
    //#region Public Methods

    /**
     * Initialise the Alert Control, load manifest and set properties
     * @date 10/11/2022 - 14:55:00
     *
     * @public
     * @param {...*} args
     * @returns {Mrbr_System_Promise<any>}
     */
    public initialise(...args: any): Mrbr_System_Promise<any> {
        const self = this,
            initialisePromise = self.$promise.create(`${self.$cls[self.$mrbr.COMPONENT_NAME]}:initialise`);
        try {
            super.initialise(args).then(async result => {
                await self.loadManifest(self.$cls);
                await self.setDefaultConfig();
                const cfg = self.elementConfig;
                self.createElement(new self.$ctrlCfg(self.rootElementName, "div", cfg.get(self.$cls.ALERT_CONTROL_NAME)
                    .Children([
                        new self.$ctrlCfg(self.$cls.ALERT_TEXT_CONTAINER_NAME, "div", cfg.get(self.$cls.ALERT_TEXT_CONTAINER_NAME))
                    ])))
                self.defaultContainerElementName = self.$cls.ALERT_TEXT_CONTAINER_NAME;
                self.alertContext = self._alertContext;
                self.showCloseButton = self._showCloseButton;
                initialisePromise.resolve(self);
            })
        } catch (error) { initialisePromise.reject(error); }
        return initialisePromise;
    }

    /**
     * Set the Default Configuration for the Control
     * @date 10/11/2022 - 14:55:45
     *
     * @public
     * @returns {Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Alert>}
     */
    public setDefaultConfig(): Mrbr_System_Promise<Mrbr_UI_Bootstrap_Controls_Alert> {
        const
            self = this,
            defaultConfigPromise = self.$promise.create(`${self.$cls[self.$mrbr.MANIFEST]}:setDefaultConfig`);
        try {
            super.setDefaultConfig().then(result => {
                self.elementConfig
                    .controlName(self.$cls[self.$mrbr.COMPONENT_NAME])
                    .setIfNotExist(self.$cls.ALERT_CONTROL_NAME, new self.$ctrlPrm()
                        .Classes(["alert", self.alertContext])
                        .Attributes({ role: "alert" }))
                    .setIfNotExist(self.$cls.ALERT_TEXT_CONTAINER_NAME, new self.$ctrlPrm())
                    .setIfNotExist(self.$cls.ALERT_CLOSE_BUTTON_NAME, new self.$ctrlPrm()
                        .Attributes({ "type": "button" })
                        .Classes("btn-close")
                        .Data({ bsDismiss: "alert" })
                        .Aria({ label: "Close" }))
            });
            defaultConfigPromise.resolve(self);
        } catch (error) { defaultConfigPromise.reject(error); }

        return defaultConfigPromise
    }

    /**
     * Dispose of the Control and bootstrap instance
     * @date 10/11/2022 - 14:56:05
     *
     * @public
     */
    public dispose(): void {
        this.rootElement && this.bootstrap.Alert.getOrCreateInstance(this.rootElement)?.dispose();
        super.dispose();
    }
    //#endregion Public Methods

    //#region Events

    /**
     * Add Event Subscriber to Close Method. Fires immediately when the close instance method is called.
     * @date 10/11/2022 - 14:57:55
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} callback
     * @returns {number}
     */
    public onClose(callback: (event: Mrbr_System_Events_Event<any>) => void): number {
        const self = this;
        (!self.events.has(self.$cls.CLOSE_BS_ALERT_EVENT_NAME)) && (self.events.addEventHandler(new self.$evtHandler(
            self.$cls.CLOSE_BS_ALERT_EVENT_NAME,
            self.rootElement,
            self.alertClose,
            self
        )));;
        return this.eventSubscribers.add(this.$cls.CLOSE_BS_ALERT_EVENT_NAME, callback);
    }

    /**
     * Add Event Subscriber to Closed Method. Fired when the alert has been closed (will wait for CSS transitions to complete).
     * @date 10/11/2022 - 14:58:39
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<any>) => void} callback
     * @returns {number}
     */
    public onClosed(callback: (event: Mrbr_System_Events_Event<any>) => void): number {
        const self = this;
        (!self.events.has(self.$cls.CLOSED_BS_ALERT_EVENT_NAME)) && (self.events.addEventHandler(new self.$evtHandler(
            self.$cls.CLOSED_BS_ALERT_EVENT_NAME,
            self.rootElement,
            self.alertClosed,
            self
        )));
        return this.eventSubscribers.add(this.$cls.CLOSED_BS_ALERT_EVENT_NAME, callback);
    }

    /**
     * Event handler for Event Name: close.bs.alert
     * @date 10/11/2022 - 14:59:08
     *
     * @private
     * @param {Mrbr_System_Events_Event<any>} event
     */
    private alertClose(event: Mrbr_System_Events_Event<any>): void { this.eventSubscribers.raise(this.$cls.CLOSE_BS_ALERT_EVENT_NAME, event); }

    /**
     * Event handler for Event Name: closed.bs.alert
     * @date 10/11/2022 - 14:59:33
     *
     * @private
     * @param {Mrbr_System_Events_Event<any>} event
     */
    private alertClosed(event: Mrbr_System_Events_Event<any>): void { this.eventSubscribers.raise(this.$cls.CLOSED_BS_ALERT_EVENT_NAME, event); }
    //#endregion Events

}