import { Mrbr_System_Events_EventSubscribers } from "../../system/events/EventSubscribers";
import { Mrbr_System_IComponent } from "../../system/IComponent";
import { Mrbr_System_Promise } from "../../system/Promise";
import { Mrbr_System_Component } from "../../system/Component";
import { Mrbr_System_Events_Event } from "../../system/events/Event";

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
export class Mrbr_UI_DOM_MutationObserver extends Mrbr_System_Component implements Mrbr_System_IComponent {

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
    private static NODE_EVENT_NAMES = {
        "onAddNodes": "onAddNodes",
        "onRemoveNodes": "onRemoveNodes",
    } as const;
    //#region Private Members
    /**
     * EventSubscribers for MutationObserver events
     * @date 31/10/2022 - 04:53:15
     *
     * @private
     * @type {Mrbr_System_Events_EventSubscribers}
     */
    private eventSubscribers: Mrbr_System_Events_EventSubscribers = new Mrbr_System_Events_EventSubscribers();

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
            initalisePromise = self.$promise.create<Mrbr_UI_DOM_MutationObserver>("MutationObserver.initialise");
        super.initialise().then(async () => {
            try {
                await self.loadManifest(self.$cls);
                self.eventSubscribers = new Mrbr_System_Events_EventSubscribers();
                await self.eventSubscribers.initialise();
                initalisePromise.resolve(self);
            } catch (error) {

                initalisePromise.reject(error);
            }
        });
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
            self = this,
            eventNames = this.$cls.MUTATION_EVENT_NAMES,
            eventSubscribers = this.eventSubscribers,
            evt = Mrbr_System_Events_Event

        for (const mutation of self.mutationGenerator(mutations)) {
            const eventSubscriberName = eventNames[mutation.type];
            eventSubscribers.raise(eventSubscriberName, new evt(eventSubscriberName, self, mutation.mutation));
            if (mutation.type === "childList") {
                (mutation.mutation.addedNodes) && eventSubscribers.raise(this.$cls.NODE_EVENT_NAMES.onAddNodes, new evt(eventSubscriberName, self, mutation.mutation.addedNodes));
                (mutation.mutation.removedNodes) && eventSubscribers.raise(this.$cls.NODE_EVENT_NAMES.onRemoveNodes, new evt(eventSubscriberName, self, mutation.mutation.removedNodes));
            }
        }
    }

    /**
     * Generator function to yield mutation records
     * @date 08/11/2022 - 21:27:12
     *
     * @private
     * @param {MutationRecord[]} mutations
     * @returns {IterableIterator<{ type: keyof typeof Mrbr_UI_DOM_MutationObserver.MUTATION_EVENT_NAMES, mutation: MutationRecord }>}
     */
    private *mutationGenerator(mutations: MutationRecord[]): IterableIterator<{ type: keyof typeof Mrbr_UI_DOM_MutationObserver.MUTATION_EVENT_NAMES, mutation: MutationRecord }> {
        const eventNames = this.$cls.MUTATION_EVENT_NAMES;
        for (let mutation of mutations) {
            let mutationType = mutation.type;
            (!mutationType) && (mutationType = eventNames[eventNames.custom]);
            yield { type: mutationType, mutation: mutation }
        }
    };

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



    /**
     * Event Raised when a childList Mutation with addedNodes is observed
     * @date 08/11/2022 - 21:26:16
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<NodeList>) => void} callback
     * @returns {number}
     */
    public onAddNodes(callback: (event: Mrbr_System_Events_Event<NodeList>) => void): number {
        return this.eventSubscribers.add(this.$cls.NODE_EVENT_NAMES.onAddNodes, callback);
    }

    /**
     * Event Raised when a childList Mutation with removedNodes is observed
     * @date 08/11/2022 - 21:26:52
     *
     * @public
     * @param {(event: Mrbr_System_Events_Event<NodeList>) => void} callback
     * @returns {number}
     */
    public onRemoveNodes(callback: (event: Mrbr_System_Events_Event<NodeList>) => void): number {
        return this.eventSubscribers.add(this.$cls.NODE_EVENT_NAMES.onRemoveNodes, callback);
    }
    //#region Public Events


    /**
     * Event raised when attributes change
     * @date 31/10/2022 - 04:58:38
     *
     * @public
     * @param {(source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void} callback
     * @returns {number} Id of the event
     */
    public onAttributesChange(callback: (event: Mrbr_System_Events_Event<MutationRecord[]>) => void): number {
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
    public onCharacterDataChange(callback: (event: Mrbr_System_Events_Event<MutationRecord[]>) => void): number {
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
    public onChildListChange(callback: (event: Mrbr_System_Events_Event<MutationRecord[]>) => void): number {
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
    public onCustomChange(callback: (event: Mrbr_System_Events_Event<MutationRecord[]>) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.custom, callback);
    }

    /**
     * Check if an element, using the element or its id, is contained in the NodeList, returned from Mutation Added or Removed Nodes
     * @date 06/11/2022 - 05:56:06
     *
     * @public
     * @param {(string | HTMLElement)} element HTMLElement or Id of the element to check
     * @param {NodeList} nodeList
     * @returns {boolean}
     */
    public inNodeList(element: string | HTMLElement, nodeList: NodeList): boolean {
        let inNodeList = false;
        if ((nodeList?.length ?? 0) === 0) { return inNodeList; }
        if (typeof element === "string") {
            for (let nodeCounter = 0; nodeCounter < nodeList.length; nodeCounter++) {
                const item = nodeList[nodeCounter];
                console.log(item);
                if (!(item instanceof HTMLElement)) { continue; }
                if (item.id !== element) { continue; }
                inNodeList = true;
                break;
            }
            return inNodeList;
        }
        for (let nodeCounter = 0; nodeCounter < nodeList.length; nodeCounter++) {
            const item = nodeList[nodeCounter];
            if (!(item instanceof HTMLElement)) { continue; }
            if (item !== element) { continue; }
            inNodeList = true;
            break;
        }
        return inNodeList;




    }
    //#endregion Public Events
}