type CustomMutationResult = {
    result: boolean;
    mutation: MutationRecord;
}
export class Mrbr_UI_DOM_MutationObserver extends EventTarget {
    private _element: HTMLElement;
    private _observer: MutationObserver;
    private _config: MutationObserverInit;
    public static MUTATION_EVENT_NAMES = {
        ATTRIBUTE_MUTATION: "attribute_mutation",
        CHARACTER_DATA_MUTATION: "characterData_mutation",
        CHILD_LIST_MUTATION: "childList_mutation",
        CUSTOM_MUTATION: "custom_mutation",
        UNKNOWN_MUTATION: "unknown_mutation"
    }
    constructor(element: HTMLElement, config: MutationObserverInit, customFilter?: (mutation: MutationRecord) => CustomMutationResult) {
        super();
        const self = this;
        self._element = element;
        self._config = config;
        self._customFilter = customFilter;
        self._observer = new MutationObserver(self.observerCallback.bind(self));
        self.observe(self._element, self._config);
        debugger
    }
    private _customFilter: (mutation: MutationRecord) => CustomMutationResult;
    public get customFilter(): (mutation: MutationRecord) => CustomMutationResult {
        return this._customFilter;
    }
    public set customFilter(value: (mutation: MutationRecord) => CustomMutationResult) {
        this._customFilter = value;
    }
    observerCallback(mutations: MutationRecord[]): void {
        const self = this,
            mudmoEventNames = Mrbr_UI_DOM_MutationObserver.MUTATION_EVENT_NAMES;
        //debugger
        for (let mutation of mutations) {
            let result: CustomMutationResult = self._customFilter?.(mutation),
                mutationResult: MutationRecord,
                mutationResultEventName: string;
            if (result?.result === true) {
                mutationResult = result.mutation;
                mutationResultEventName = mudmoEventNames.CUSTOM_MUTATION;
            }
            else {
                switch (mutation.type) {
                    case "attributes":
                        mutationResult = mutation;
                        mutationResultEventName = mudmoEventNames.ATTRIBUTE_MUTATION;
                        break;
                    case "characterData":
                        mutationResult = mutation;
                        mutationResultEventName = mudmoEventNames.CHARACTER_DATA_MUTATION;
                        break;
                    case "childList":
                        mutationResult = mutation;
                        mutationResultEventName = mudmoEventNames.CHILD_LIST_MUTATION;
                        break;
                    default:
                        mutationResult = mutation;
                        mutationResultEventName = mudmoEventNames.UNKNOWN_MUTATION;
                        break;
                }
            }
            //debugger
            self.dispatchEvent(new CustomEvent(mutationResultEventName, { detail: mutationResult }));
        }
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
}