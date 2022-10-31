import { Mrbr_System_Collections_Map } from "../collections/Map";
import { Mrbr_System_Events_EventHandler } from "./EventHandler";

export class Mrbr_System_Events_EventsMap extends Mrbr_System_Collections_Map<string, Mrbr_System_Events_EventHandler> {
    private _events: Map<string, Mrbr_System_Events_EventHandler>;
    constructor() { super(); }
    public addEventHandler(event: Mrbr_System_Events_EventHandler): void {
        this.add(event.eventName, event);
    }
    public add(key: string, event: Mrbr_System_Events_EventHandler): void {
        const self = this;
        if (self.has(key)) {
            self._events.get(key).count++;
            return;
        }
        if (!event.handler) {
            event.handler = event.eventHandler.bind((event.context || event.eventTarget));
            (event.options !== undefined) ?
                event.eventTarget.addEventListener(event.eventName, event.handler, event.options) :
                event.eventTarget.addEventListener(event.eventName, event.handler);
        }
        event.remove = () => {
            if (!self.has(key)) { return; }
            if (event.count > 1) {
                self.get(key).count--;
                return;
            }
            (event.options) ?
                event.eventTarget.removeEventListener(key, event.handler, event.options) :
                event.eventTarget.removeEventListener(key, event.handler);
            setTimeout(() => { self.delete(key); }, 0);
        }
        this.map.set(event.eventName, event);
    }
}