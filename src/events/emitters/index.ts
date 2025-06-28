import { EventEmitter } from "events";
import { DbEvent, ServiceEvent } from "../events";

class DbEventEmitter {
    private emitter: EventEmitter;
    constructor() {
        this.emitter = new EventEmitter();
    }

    emit(event: DbEvent<any>) {
        this.emitter.emit(`${typeof event}.${typeof event.payload}`, event.payload);
    }

    on(
        name: string,
        listener: (payload: any) => void
    ) {
        console.log(Date.now(), " Started listening on channel: ", name);
        this.emitter.on(name, listener);
    }
}

class ServiceEventEmitter {
    private emitter: EventEmitter;
    constructor() {
        this.emitter = new EventEmitter();
    }

    emit(event: ServiceEvent<any>) {
        this.emitter.emit(`${typeof event}.${typeof event.payload}`, event.payload);
    }

    on(
        name: string,
        listener: (payload: any) => void
    ) {
        console.log(Date.now(), " Started listening on channel: ", name);
        this.emitter.on(name, listener);
    }
}


export const dbEvents = new DbEventEmitter();
export const serviceEvents = new ServiceEventEmitter();