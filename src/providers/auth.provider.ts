import { BaseProvider } from "./base.provider";


export class AuthProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        throw new Error("Method 'getAll' not implemented in AuthProvider.");
    }

    async getById(id: string): Promise<any> {
        throw new Error("Method 'getById' not implemented in AuthProvider.");
    }

    async create(object: Object): Promise<any> {
        throw new Error("Method 'create' not implemented in AuthProvider.");
    }

    async update(object: Object): Promise<any> {
        throw new Error("Method 'update' not implemented in AuthProvider.");
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method 'delete' not implemented in AuthProvider.");
    }
}