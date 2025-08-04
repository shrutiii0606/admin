import { EventEmitter } from "events";
import { DbEvent, ServiceEvent } from "../events";

class DbEventEmitter {
    private emitter: EventEmitter;
    constructor() {
        this.emitter = new EventEmitter();
    }

    emit<T>(event: DbEvent<T>) {
        this.emitter.emit(event.constructor.name, event.payload);
    }

    on<T>(name: string, listener: (payload: T) => void) {
        console.log(Date.now(), " Started listening on channel: ", name);
        this.emitter.on(name, listener);
    }
}

class ServiceEventEmitter {
    private emitter: EventEmitter;
    constructor() {
        this.emitter = new EventEmitter();
    }

    emit<T>(event: ServiceEvent<T>) {
        this.emitter.emit(event.constructor.name, event.payload);
    }

    on<T>(name: string, listener: (payload: T) => void) {
        console.log(Date.now(), " Started listening on channel: ", name);
        this.emitter.on(name, listener);
    }
}


export const dbEvents = new DbEventEmitter();
export const serviceEvents = new ServiceEventEmitter();