import { BaseProvider } from "@/providers/base.provider";
import {
    retailerAccounts,
    retailerOrders,
    retailerOrderItems,
    users,
    products
} from "@/db/schema";
import { eq, desc, and, sql, sum } from "drizzle-orm";

export class RetailerAccountProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db
            .select({
                id: retailerAccounts.id,
                retailerId: retailerAccounts.retailerId,
                coins: retailerAccounts.coins,
                createdAt: retailerAccounts.createdAt,
                retailer: {
                    id: users.id,
                    name: users.name,
                    mobile: users.mobile,
                    email: users.email,
                }
            })
            .from(retailerAccounts)
            .innerJoin(users, eq(retailerAccounts.retailerId, users.id));
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(retailerAccounts).where(eq(retailerAccounts.id, id));
        return result[0] || null;
    }

    async getByRetailer(retailerId: string): Promise<any> {
        const result = await this.db
            .select()
            .from(retailerAccounts)
            .where(eq(retailerAccounts.retailerId, retailerId));
        return result[0] || null;
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(retailerAccounts).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(retailerAccounts)
            .set(updateData)
            .where(eq(retailerAccounts.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(retailerAccounts).where(eq(retailerAccounts.id, id));
    }

    async addCoins(retailerId: string, coins: number): Promise<any> {
        const account = await this.getByRetailer(retailerId);
        if (!account) {
            throw new Error("Retailer account not found");
        }

        return await this.update({
            id: account.id,
            coins: account.coins + coins
        });
    }

    async deductCoins(retailerId: string, coins: number): Promise<any> {
        const account = await this.getByRetailer(retailerId);
        if (!account) {
            throw new Error("Retailer account not found");
        }

        if (account.coins < coins) {
            throw new Error("Insufficient coins");
        }

        return await this.update({
            id: account.id,
            coins: account.coins - coins
        });
    }
}

export class RetailerOrderProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db
            .select({
                id: retailerOrders.id,
                retailerId: retailerOrders.retailerId,
                paymentDetails: retailerOrders.paymentDetails,
                orderStatus: retailerOrders.orderStatus,
                createdAt: retailerOrders.createdAt,
                updatedAt: retailerOrders.updatedAt,
                retailer: {
                    id: users.id,
                    name: users.name,
                    mobile: users.mobile,
                    email: users.email,
                }
            })
            .from(retailerOrders)
            .innerJoin(users, eq(retailerOrders.retailerId, users.id))
            .orderBy(desc(retailerOrders.createdAt));
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(retailerOrders).where(eq(retailerOrders.id, id));
        return result[0] || null;
    }

    async getByRetailer(retailerId: string): Promise<any[]> {
        return await this.db
            .select()
            .from(retailerOrders)
            .where(eq(retailerOrders.retailerId, retailerId))
            .orderBy(desc(retailerOrders.createdAt));
    }

    async getOrderWithItems(orderId: string): Promise<any> {
        const order = await this.getById(orderId);
        if (!order) return null;

        const items = await this.db
            .select({
                id: retailerOrderItems.id,
                orderId: retailerOrderItems.orderId,
                productId: retailerOrderItems.productId,
                quantity: retailerOrderItems.quantity,
                price: retailerOrderItems.price,
                product: {
                    id: products.id,
                    name: products.name,
                    sku: products.sku,
                    price: products.price,
                }
            })
            .from(retailerOrderItems)
            .innerJoin(products, eq(retailerOrderItems.productId, products.id))
            .where(eq(retailerOrderItems.orderId, orderId));

        return { ...order, items };
    }

    async getOrdersByStatus(status: "pending" | "completed" | "cancelled"): Promise<any[]> {
        return await this.db
            .select({
                id: retailerOrders.id,
                retailerId: retailerOrders.retailerId,
                paymentDetails: retailerOrders.paymentDetails,
                orderStatus: retailerOrders.orderStatus,
                createdAt: retailerOrders.createdAt,
                updatedAt: retailerOrders.updatedAt,
                retailer: {
                    id: users.id,
                    name: users.name,
                    mobile: users.mobile,
                    email: users.email,
                }
            })
            .from(retailerOrders)
            .innerJoin(users, eq(retailerOrders.retailerId, users.id))
            .where(eq(retailerOrders.orderStatus, status))
            .orderBy(desc(retailerOrders.createdAt));
    }

    async getOrderStatistics(): Promise<any> {
        const result = await this.db
            .select({
                total: sql<number>`count(*)`,
                pending: sql<number>`count(case when ${retailerOrders.orderStatus} = 'pending' then 1 end)`,
                completed: sql<number>`count(case when ${retailerOrders.orderStatus} = 'completed' then 1 end)`,
                cancelled: sql<number>`count(case when ${retailerOrders.orderStatus} = 'cancelled' then 1 end)`,
            })
            .from(retailerOrders);

        return result[0] || { total: 0, pending: 0, completed: 0, cancelled: 0 };
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(retailerOrders).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        updateData.updatedAt = new Date();
        const result = await this.db
            .update(retailerOrders)
            .set(updateData)
            .where(eq(retailerOrders.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(retailerOrders).where(eq(retailerOrders.id, id));
    }

    async updateStatus(id: string, status: "pending" | "completed" | "cancelled"): Promise<any> {
        return await this.update({ id, orderStatus: status });
    }
}

export class RetailerOrderItemProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db
            .select({
                id: retailerOrderItems.id,
                orderId: retailerOrderItems.orderId,
                productId: retailerOrderItems.productId,
                quantity: retailerOrderItems.quantity,
                price: retailerOrderItems.price,
                product: {
                    id: products.id,
                    name: products.name,
                    sku: products.sku,
                    price: products.price,
                }
            })
            .from(retailerOrderItems)
            .innerJoin(products, eq(retailerOrderItems.productId, products.id));
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(retailerOrderItems).where(eq(retailerOrderItems.id, id));
        return result[0] || null;
    }

    async getByOrder(orderId: string): Promise<any[]> {
        return await this.db
            .select({
                id: retailerOrderItems.id,
                orderId: retailerOrderItems.orderId,
                productId: retailerOrderItems.productId,
                quantity: retailerOrderItems.quantity,
                price: retailerOrderItems.price,
                product: {
                    id: products.id,
                    name: products.name,
                    sku: products.sku,
                    price: products.price,
                }
            })
            .from(retailerOrderItems)
            .innerJoin(products, eq(retailerOrderItems.productId, products.id))
            .where(eq(retailerOrderItems.orderId, orderId));
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(retailerOrderItems).values(object).returning();
        return result[0];
    }

    async createMany(items: any[]): Promise<any[]> {
        const result = await this.db.insert(retailerOrderItems).values(items).returning();
        return result;
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(retailerOrderItems)
            .set(updateData)
            .where(eq(retailerOrderItems.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(retailerOrderItems).where(eq(retailerOrderItems.id, id));
    }

    async deleteByOrder(orderId: string): Promise<void> {
        await this.db.delete(retailerOrderItems).where(eq(retailerOrderItems.orderId, orderId));
    }

    async getOrderTotal(orderId: string): Promise<number> {
        const result = await this.db
            .select({
                total: sql<number>`sum(cast(${retailerOrderItems.price} as numeric) * ${retailerOrderItems.quantity})`
            })
            .from(retailerOrderItems)
            .where(eq(retailerOrderItems.orderId, orderId));

        return result[0]?.total || 0;
    }
}