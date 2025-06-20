import { BaseProvider } from "@/providers/base.provider";
import { users, workers } from "@/db/schema";
import { eq, and, or, ilike } from "drizzle-orm";
import bcrypt from "bcryptjs";

export class UserProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db.select().from(users);
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(users).where(eq(users.id, id));
        return result[0] || null;
    }

    async getByMobile(mobile: string): Promise<any> {
        const result = await this.db.select().from(users).where(eq(users.mobile, mobile));
        return result[0] || null;
    }

    async getByEmail(email: string): Promise<any> {
        const result = await this.db.select().from(users).where(eq(users.email, email));
        return result[0] || null;
    }

    async getByRole(role: "admin" | "employee" | "retailer"): Promise<any[]> {
        return await this.db.select().from(users).where(eq(users.role, role));
    }

    async searchUsers(query: string): Promise<any[]> {
        return await this.db
            .select()
            .from(users)
            .where(
                or(
                    ilike(users.name, `%${query}%`),
                    ilike(users.mobile, `%${query}%`),
                    ilike(users.email, `%${query}%`)
                )
            );
    }

    async create(object: any): Promise<any> {
        // Hash password if provided
        if (object.password) {
            object.password = await bcrypt.hash(object.password, 12);
        }

        const result = await this.db.insert(users).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;

        // Hash password if it's being updated
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 12);
        }

        const result = await this.db
            .update(users)
            .set(updateData)
            .where(eq(users.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(users).where(eq(users.id, id));
    }

    async validatePassword(mobile: string, password: string): Promise<any> {
        const user = await this.getByMobile(mobile);
        if (!user || !user.password) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        return isValid ? user : null;
    }

    async getUsersByRetailer(retailerId: string): Promise<any[]> {
        return await this.db
            .select({
                id: users.id,
                name: users.name,
                mobile: users.mobile,
                email: users.email,
                role: users.role,
                createdAt: users.createdAt,
            })
            .from(users)
            .innerJoin(workers, eq(workers.employeeId, users.id))
            .where(eq(workers.retailerId, retailerId));
    }

    async getRetailersByEmployee(employeeId: string): Promise<any[]> {
        return await this.db
            .select({
                id: users.id,
                name: users.name,
                mobile: users.mobile,
                email: users.email,
                role: users.role,
                createdAt: users.createdAt,
            })
            .from(users)
            .innerJoin(workers, eq(workers.retailerId, users.id))
            .where(eq(workers.employeeId, employeeId));
    }
}

export class WorkerProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db.select().from(workers);
    }

    async getById(id: string): Promise<any> {
        throw new Error("Use getByRetailerAndEmployee instead");
    }

    async getByRetailerAndEmployee(retailerId: string, employeeId: string): Promise<any> {
        const result = await this.db
            .select()
            .from(workers)
            .where(and(eq(workers.retailerId, retailerId), eq(workers.employeeId, employeeId)));
        return result[0] || null;
    }

    async getByRetailer(retailerId: string): Promise<any[]> {
        return await this.db.select().from(workers).where(eq(workers.retailerId, retailerId));
    }

    async getByEmployee(employeeId: string): Promise<any[]> {
        return await this.db.select().from(workers).where(eq(workers.employeeId, employeeId));
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(workers).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { retailerId, employeeId, ...updateData } = object;
        const result = await this.db
            .update(workers)
            .set(updateData)
            .where(and(eq(workers.retailerId, retailerId), eq(workers.employeeId, employeeId)))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        throw new Error("Use deleteByRetailerAndEmployee instead");
    }

    async deleteByRetailerAndEmployee(retailerId: string, employeeId: string): Promise<void> {
        await this.db
            .delete(workers)
            .where(and(eq(workers.retailerId, retailerId), eq(workers.employeeId, employeeId)));
    }
}