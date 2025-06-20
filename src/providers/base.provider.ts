import { DB } from "@/db";


export abstract class BaseProvider {
    public db: DB;
    constructor(db: DB) {
        this.db = db;
    }
    abstract getAll(): Promise<any[]>;
    abstract getById(id: string): Promise<any>;
    abstract create(object: any): Promise<any>;
    abstract update(object: any): Promise<any>;
    abstract delete(id: string): Promise<void>;
}