import { Mrbr_System_Events_EventSubscribers } from "../../system/events/EventSubscribers";
import { Mrbr_System_IComponent } from "../../system/IComponent";
import { Mrbr_System_Promise } from "../../system/Promise";
import { Mrbr_System_Object } from "../../system/Object";
import { MrbrBase } from "../../system/MrbrBase";

/**
 * Creates a new instance of the Mrbr_UI_Controls_ElementsMap class.
 * Raises Events for each Mutation that occurs on the selected Element
 * @date 31/10/2022 - 05:00:58
 *
 * @export
 * @class Mrbr_UI_DOM_MutationObserver
 * @typedef {Mrbr_UI_DOM_MutationObserver}
 * @extends {Mrbr_System_Object}
 * @implements {Mrbr_System_IComponent}
 */
export class Mrbr_UI_DOM_MutationObserver extends Mrbr_System_Object implements Mrbr_System_IComponent {

    //#region Private Static Members
    /**
     * MutationObserver mutation type and the EventMap events to raise
     * @date 31/10/2022 - 04:52:46
     *
     * @private
     * @static
     * @type {{ readonly attributes: "onAttributesChange"; readonly characterData: "onCharacterDataChange"; readonly childList: "onChildListChange"; readonly custom: "onCustomChange"; }}
     */
    private static MUTATION_EVENT_NAMES = {
        "attributes": "onAttributesChange",
        "characterData": "onCharacterDataChange",
        "childList": "onChildListChange",
        "custom": "onCustomChange"
    } as const
    //#region Private Members

    /**
     * EventSubscribers for MutationObserver events
     * @date 31/10/2022 - 04:53:15
     *
     * @private
     * @type {Mrbr_System_Events_EventSubscribers}
     */
    private eventSubscribers: Mrbr_System_Events_EventSubscribers

    /**
     * HTMLElement being observed
     * @date 31/10/2022 - 04:53:44
     *
     * @private
     * @type {HTMLElement}
     */
    private _element: HTMLElement;

    /**
     * MutationObserver on _element
     * @date 31/10/2022 - 04:54:00
     *
     * @private
     * @type {MutationObserver}
     */
    private _observer: MutationObserver;

    /**
     * Configuration used to create the MutationObserver
     * @date 31/10/2022 - 04:54:17
     *
     * @private
     * @type {MutationObserverInit}
     */
    private _config: MutationObserverInit;
    //#endregion Private Members
    /**
     * Creates an instance of Mrbr_UI_DOM_MutationObserver.
     * @date 31/10/2022 - 04:57:40
     *
     * @constructor
     * @param {HTMLElement} element element to observe
     * @param {MutationObserverInit} config MutationObserverInit configuration
     */
    constructor(element: HTMLElement, config: MutationObserverInit) {
        super();
        this._element = element;
        this._config = config;
        this._observer = new MutationObserver(this.observerCallback.bind(this));
        this.observe(this._element, this._config);
    }
    //#region Private Properties

    /**
     * Allias for this class type
     * @date 31/10/2022 - 04:54:43
     *
     * @private
     * @readonly
     * @type {typeof Mrbr_UI_DOM_MutationObserver}
     */
    private get $cls(): typeof Mrbr_UI_DOM_MutationObserver { return Mrbr_UI_DOM_MutationObserver; }
    //#endregion Private Properties
    //#region Public Methods

    /**
     * Initialse the component
     * Load any dependencies from manifests
     * 
     * @date 31/10/2022 - 04:55:10
     *
     * @public
     * @param {...any[]} args
     * @returns {Mrbr_System_Promise<Mrbr_System_IComponent>}
     */
    public initialise(...args: any[]): Mrbr_System_Promise<Mrbr_System_IComponent> {
        const self = this,
            componentManifest = Symbol.for(`${self.$cls[MrbrBase.MRBR_COMPONENT_NAME]}:componentManifest`),
            initalisePromise = self.$promise.create<Mrbr_UI_DOM_MutationObserver>("MutationObserver.initialise");
        !self.$cls[componentManifest] && (self.$cls[componentManifest] = MrbrBase.mrbrInstance.loadManifest(self.$cls[MrbrBase.MRBR_COMPONENT_MANIFEST]));
        self.$cls[componentManifest]
            .then(() => {
                self.eventSubscribers = new Mrbr_System_Events_EventSubscribers();
                initalisePromise.resolve(self);
            })
        return initalisePromise;
    }

    /**
     * Observer Callback function
     * Raises mutation Events for each mutation
     * @date 31/10/2022 - 04:55:56
     *
     * @private
     * @param {MutationRecord[]} mutations
     */
    private observerCallback(mutations: MutationRecord[]): void {
        const
            eventNames = this.$cls.MUTATION_EVENT_NAMES,
            eventSubscribers = this.eventSubscribers;
        (function* () {
            for (let mutation of mutations) {
                let mutationType = mutation.type;
                (!mutationType) && (mutationType = eventNames[eventNames.custom]);
                eventSubscribers.raise(eventNames[mutationType], mutation);
            }
        })();
    }

    /**
     * Disconnects the MutationObserver
     * @date 31/10/2022 - 04:56:40
     */
    disconnect(): void { this._observer.disconnect(); }

    /**
     * Starts MutationObserver
     * @date 31/10/2022 - 04:56:57
     *
     * @public
     * @param {HTMLElement} element element to observe
     * @param {MutationObserverInit} config MutationObserverInit configuration
     */
    public observe(element: HTMLElement, config: MutationObserverInit): void { this._observer.observe(element, config); }

    /**
     * Takes Mutation Observer Records
     * @date 31/10/2022 - 04:58:12
     *
     * @public
     * @returns {MutationRecord[]}
     */
    public takeRecords(): MutationRecord[] { return this._observer.takeRecords(); }
    //#endregion Public Methods
    //#region Public Events

    /**
     * Event raised when attributes change
     * @date 31/10/2022 - 04:58:38
     *
     * @public
     * @param {(source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void} callback
     * @returns {number} Id of the event
     */
    public onAttributesChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.attributes, callback);
    }

    /**
     * Event raised when character data changes
     * @date 31/10/2022 - 04:58:55
     *
     * @public
     * @param {(source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void} callback
     * @returns {number} Id of the event
     */
    public onCharacterDataChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.characterData, callback);
    }

    /**
     * Event raised when child list changes
     * @date 31/10/2022 - 04:59:06
     *
     * @public
     * @param {(source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void} callback
     * @returns {number} Id of the event
     */
    public onChildListChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.childList, callback);
    }

    /**
     * Event raised when a custom mutation occurs
     * @date 31/10/2022 - 04:59:19
     *
     * @public
     * @param {(source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void} callback
     * @returns {number} Id of the event
     */
    public onCustomChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.custom, callback);
    }
    //#endregion Public Events
}