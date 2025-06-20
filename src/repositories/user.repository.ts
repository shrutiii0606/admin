import { UserProvider, WorkerProvider } from "@/providers/user.provider";
import { BaseRepository } from "./base.repository";
import { db } from "@/db";
import {
    User,
    CreateUser,
    UpdateUser,
    UserResponse,
    Worker,
    CreateWorker,
    UserSchema,
    CreateUserSchema,
    UpdateUserSchema,
    UserResponseSchema,
    WorkerSchema,
    CreateWorkerSchema
} from "@/models/user/user.model";

class UserRepository extends BaseRepository<UserProvider> {
    constructor(provider: UserProvider) {
        super(provider);
    }

    async getAll(): Promise<UserResponse[]> {
        const users = await this.provider.getAll();
        return users.map(user => UserResponseSchema.parse(user));
    }

    async getById(id: string): Promise<UserResponse | null> {
        const user = await this.provider.getById(id);
        return user ? UserResponseSchema.parse(user) : null;
    }

    async getByMobile(mobile: string): Promise<User | null> {
        const user = await this.provider.getByMobile(mobile);
        return user ? UserSchema.parse(user) : null;
    }

    async getByEmail(email: string): Promise<UserResponse | null> {
        const user = await this.provider.getByEmail(email);
        return user ? UserResponseSchema.parse(user) : null;
    }

    async getByRole(role: "admin" | "employee" | "retailer"): Promise<UserResponse[]> {
        const users = await this.provider.getByRole(role);
        return users.map(user => UserResponseSchema.parse(user));
    }

    async searchUsers(query: string): Promise<UserResponse[]> {
        const users = await this.provider.searchUsers(query);
        return users.map(user => UserResponseSchema.parse(user));
    }

    async create(userData: CreateUser): Promise<UserResponse> {
        const validatedData = CreateUserSchema.parse(userData);
        const user = await this.provider.create(validatedData);
        return UserResponseSchema.parse(user);
    }

    async update(userData: UpdateUser): Promise<UserResponse> {
        const validatedData = UpdateUserSchema.parse(userData);
        const user = await this.provider.update(validatedData);
        return UserResponseSchema.parse(user);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }

    async validatePassword(mobile: string, password: string): Promise<User | null> {
        const user = await this.provider.validatePassword(mobile, password);
        return user ? UserSchema.parse(user) : null;
    }

    async getUsersByRetailer(retailerId: string): Promise<UserResponse[]> {
        const users = await this.provider.getUsersByRetailer(retailerId);
        return users.map(user => UserResponseSchema.parse(user));
    }

    async getRetailersByEmployee(employeeId: string): Promise<UserResponse[]> {
        const retailers = await this.provider.getRetailersByEmployee(employeeId);
        return retailers.map(retailer => UserResponseSchema.parse(retailer));
    }
}

class WorkerRepository extends BaseRepository<WorkerProvider> {
    constructor(provider: WorkerProvider) {
        super(provider);
    }

    async getAll(): Promise<Worker[]> {
        const workers = await this.provider.getAll();
        return workers.map(worker => WorkerSchema.parse(worker));
    }

    async getById(id: string): Promise<Worker | null> {
        throw new Error("Use getByRetailerAndEmployee instead");
    }

    async getByRetailerAndEmployee(retailerId: string, employeeId: string): Promise<Worker | null> {
        const worker = await this.provider.getByRetailerAndEmployee(retailerId, employeeId);
        return worker ? WorkerSchema.parse(worker) : null;
    }

    async getByRetailer(retailerId: string): Promise<Worker[]> {
        const workers = await this.provider.getByRetailer(retailerId);
        return workers.map(worker => WorkerSchema.parse(worker));
    }

    async getByEmployee(employeeId: string): Promise<Worker[]> {
        const workers = await this.provider.getByEmployee(employeeId);
        return workers.map(worker => WorkerSchema.parse(worker));
    }

    async create(workerData: CreateWorker): Promise<Worker> {
        const validatedData = CreateWorkerSchema.parse(workerData);
        const worker = await this.provider.create(validatedData);
        return WorkerSchema.parse(worker);
    }

    async update(workerData: Worker): Promise<Worker> {
        const validatedData = WorkerSchema.parse(workerData);
        const worker = await this.provider.update(validatedData);
        return WorkerSchema.parse(worker);
    }

    async delete(id: string): Promise<void> {
        throw new Error("Use deleteByRetailerAndEmployee instead");
    }

    async deleteByRetailerAndEmployee(retailerId: string, employeeId: string): Promise<void> {
        await this.provider.deleteByRetailerAndEmployee(retailerId, employeeId);
    }
}

export const userRepository = new UserRepository(new UserProvider(db));
export const workerRepository = new WorkerRepository(new WorkerProvider(db));