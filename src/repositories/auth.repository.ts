import { BaseRepository } from "@/repositories/base.repository";
import { AuthProvider } from "@/providers/auth.provider";

export class AuthRepository extends BaseRepository<AuthProvider> {
    constructor(provider: AuthProvider) {
        super(provider);
    }

    async getAll(): Promise<any[]> {
        throw new Error("Method 'getAll' not implemented in AuthRepository.");
    }

    async getById({}) {
        throw new Error("Method 'getById' not implemented in AuthRepository.");
    }

    async create(object: Object) {
        throw new Error("Method 'create' not implemented in AuthRepository.");
    }

    async update(object: Object) {
        throw new Error("Method 'update' not implemented in AuthRepository.");
    }

    async delete(object: Object) {
        throw new Error("Method 'delete' not implemented in AuthRepository.");
    }
}