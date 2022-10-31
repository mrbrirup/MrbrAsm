import { Mrbr_System_Events_EventSubscribers } from "../../system/events/EventSubscribers";
import { Mrbr_System_IComponent } from "../../system/IComponent";
import { Mrbr_System_MrbrPromise } from "../../system/MrbrPromise";
import { Mrbr_System_Object } from "../../system/Object";

export class Mrbr_UI_DOM_MutationObserver extends Mrbr_System_Object implements Mrbr_System_IComponent {
    private get $cls(): typeof Mrbr_UI_DOM_MutationObserver { return Mrbr_UI_DOM_MutationObserver; }
    private eventSubscribers: Mrbr_System_Events_EventSubscribers
    private _element: HTMLElement;
    private _observer: MutationObserver;
    private _config: MutationObserverInit;
    private static MUTATION_EVENT_NAMES = {
        "attributes": "onAttributesChange",
        "characterData": "onCharacterDataChange",
        "childList": "onChildListChange",
        "custom": "onCustomChange"
    };
    constructor(element: HTMLElement, config: MutationObserverInit) {
        super();
        const self = this;
        self._element = element;
        self._config = config;
        self._observer = new MutationObserver(self.observerCallback.bind(self));
        self.observe(self._element, self._config);
    }
    public initialise(...args: any[]): Mrbr_System_MrbrPromise<Mrbr_System_IComponent> {
        const self = this,
            initalisePromise = self.$promise.create<Mrbr_UI_DOM_MutationObserver>("MutationObserver.initialise");
        self.mrbrInstance.loadManifest(self.$cls[self.$mrbrBase.MRBR_COMPONENT_MANIFEST])
            .then(() => {
                self.eventSubscribers = new Mrbr_System_Events_EventSubscribers();
                initalisePromise.resolve(self);
            })
        return initalisePromise;
    }
    private observerCallback(mutations: MutationRecord[]): void {
        const self = this,
            eventNames = self.$cls.MUTATION_EVENT_NAMES;
        (function* () {
            for (let mutation of mutations) {
                let mutationType = eventNames[mutation.type];
                (!mutationType) && (mutationType = eventNames.custom);
                self.eventSubscribers.raise(eventNames[mutation.type], mutation);
            }
        })();
    }
    disconnect(): void {
        this._observer.disconnect();
    }
    observe(element: HTMLElement, config: MutationObserverInit): void {
        this._observer.observe(element, config);
    }
    takeRecords(): MutationRecord[] {
        return this._observer.takeRecords();
    }
    onAttributesChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.attributes, callback);
    }
    onCharacterDataChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.characterData, callback);
    }
    onChildListChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.childList, callback);
    }
    onCustomChange(callback: (source: Mrbr_UI_DOM_MutationObserver, event: any, mutation: MutationRecord) => void): number {
        return this.eventSubscribers.add(this.$cls.MUTATION_EVENT_NAMES.custom, callback);
    }
}