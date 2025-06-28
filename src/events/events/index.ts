

abstract class AppEvent<PayLoad> {
    public payload: PayLoad;
    public timestamp: Date;
    constructor(payload: PayLoad) {
        this.payload = payload;
        this.timestamp = new Date();
    }
}

export abstract class DbEvent<T> extends AppEvent<T> {
    constructor(payload: T) {
        super(payload);
    }
}


export abstract class ServiceEvent<T> extends AppEvent<T> {
    constructor(payload: T) {
        super(payload);
    }
}