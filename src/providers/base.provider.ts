

export abstract class BaseProvider {
    abstract getAll(): Promise<any[]>;
    abstract getById(id: string): Promise<any>;
    abstract create(object: Object): Promise<any>;
    abstract update(object: Object): Promise<any>;
    abstract delete(id: string): Promise<void>;
}