import { BaseProvider } from "@/providers/base.provider";

export abstract class BaseRepository<T extends BaseProvider> {
    public provider: T;
    constructor(provider: T) {
        this.provider = provider;
    }

    abstract getAll(): Promise<any[]>;

    abstract getById(id: string): Promise<any>;

    abstract create(object: any): Promise<any>;

    abstract update(object: any): Promise<any>;

    abstract delete(id: string): Promise<void>;
}