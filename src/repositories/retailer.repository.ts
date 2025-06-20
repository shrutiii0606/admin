import { 
    RetailerAccountProvider, 
    RetailerOrderProvider, 
    RetailerOrderItemProvider 
} from "@/providers/retailer.provider";
import { BaseRepository } from "./base.repository";
import { db } from "@/db";
import {
    RetailerAccount,
    CreateRetailerAccount,
    UpdateRetailerAccount,
    RetailerOrder,
    CreateRetailerOrder,
    UpdateRetailerOrder,
    RetailerOrderItem,
    CreateRetailerOrderItem,
    RetailerOrderWithDetails,
    OrderStatistics,
    RetailerAccountSchema,
    CreateRetailerAccountSchema,
    UpdateRetailerAccountSchema,
    RetailerOrderSchema,
    CreateRetailerOrderSchema,
    UpdateRetailerOrderSchema,
    RetailerOrderItemSchema,
    CreateRetailerOrderItemSchema,
    RetailerOrderWithDetailsSchema,
    OrderStatisticsSchema
} from "@/models/retailer/retailer.model";

class RetailerAccountRepository extends BaseRepository<RetailerAccountProvider> {
    constructor(provider: RetailerAccountProvider) {
        super(provider);
    }

    async getAll(): Promise<any[]> {
        const accounts = await this.provider.getAll();
        return accounts.map(account => ({
            ...RetailerAccountSchema.parse(account),
            retailer: account.retailer
        }));
    }

    async getById(id: string): Promise<RetailerAccount | null> {
        const account = await this.provider.getById(id);
        return account ? RetailerAccountSchema.parse(account) : null;
    }

    async getByRetailer(retailerId: string): Promise<RetailerAccount | null> {
        const account = await this.provider.getByRetailer(retailerId);
        return account ? RetailerAccountSchema.parse(account) : null;
    }

    async create(accountData: CreateRetailerAccount): Promise<RetailerAccount> {
        const validatedData = CreateRetailerAccountSchema.parse(accountData);
        const account = await this.provider.create(validatedData);
        return RetailerAccountSchema.parse(account);
    }

    async update(accountData: UpdateRetailerAccount): Promise<RetailerAccount> {
        const validatedData = UpdateRetailerAccountSchema.parse(accountData);
        const account = await this.provider.update(validatedData);
        return RetailerAccountSchema.parse(account);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }

    async addCoins(retailerId: string, coins: number): Promise<RetailerAccount> {
        const account = await this.provider.addCoins(retailerId, coins);
        return RetailerAccountSchema.parse(account);
    }

    async deductCoins(retailerId: string, coins: number): Promise<RetailerAccount> {
        const account = await this.provider.deductCoins(retailerId, coins);
        return RetailerAccountSchema.parse(account);
    }
}

class RetailerOrderRepository extends BaseRepository<RetailerOrderProvider> {
    constructor(provider: RetailerOrderProvider) {
        super(provider);
    }

    async getAll(): Promise<any[]> {
        const orders = await this.provider.getAll();
        return orders.map(order => ({
            ...RetailerOrderSchema.parse(order),
            retailer: order.retailer
        }));
    }

    async getById(id: string): Promise<RetailerOrder | null> {
        const order = await this.provider.getById(id);
        return order ? RetailerOrderSchema.parse(order) : null;
    }

    async getByRetailer(retailerId: string): Promise<RetailerOrder[]> {
        const orders = await this.provider.getByRetailer(retailerId);
        return orders.map(order => RetailerOrderSchema.parse(order));
    }

    async getOrderWithItems(orderId: string): Promise<RetailerOrderWithDetails | null> {
        const orderWithItems = await this.provider.getOrderWithItems(orderId);
        return orderWithItems ? RetailerOrderWithDetailsSchema.parse({
            ...orderWithItems,
            totalAmount: orderWithItems.items?.reduce((sum: number, item: any) => 
                sum + (parseFloat(item.price) * item.quantity), 0) || 0,
            totalItems: orderWithItems.items?.length || 0
        }) : null;
    }

    async getOrdersByStatus(status: "pending" | "completed" | "cancelled"): Promise<any[]> {
        const orders = await this.provider.getOrdersByStatus(status);
        return orders.map(order => ({
            ...RetailerOrderSchema.parse(order),
            retailer: order.retailer
        }));
    }

    async getOrderStatistics(): Promise<OrderStatistics> {
        const stats = await this.provider.getOrderStatistics();
        return OrderStatisticsSchema.parse({
            totalOrders: stats.total,
            pendingOrders: stats.pending,
            completedOrders: stats.completed,
            cancelledOrders: stats.cancelled,
            totalRevenue: 0, // Calculate based on completed orders
            averageOrderValue: 0 // Calculate based on total revenue / completed orders
        });
    }

    async create(orderData: CreateRetailerOrder): Promise<RetailerOrder> {
        const validatedData = CreateRetailerOrderSchema.parse(orderData);
        const order = await this.provider.create(validatedData);
        return RetailerOrderSchema.parse(order);
    }

    async update(orderData: UpdateRetailerOrder): Promise<RetailerOrder> {
        const validatedData = UpdateRetailerOrderSchema.parse(orderData);
        const order = await this.provider.update(validatedData);
        return RetailerOrderSchema.parse(order);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }

    async updateStatus(id: string, status: "pending" | "completed" | "cancelled"): Promise<RetailerOrder> {
        const order = await this.provider.updateStatus(id, status);
        return RetailerOrderSchema.parse(order);
    }
}

class RetailerOrderItemRepository extends BaseRepository<RetailerOrderItemProvider> {
    constructor(provider: RetailerOrderItemProvider) {
        super(provider);
    }

    async getAll(): Promise<any[]> {
        const items = await this.provider.getAll();
        return items.map(item => ({
            ...RetailerOrderItemSchema.parse(item),
            product: item.product
        }));
    }

    async getById(id: string): Promise<RetailerOrderItem | null> {
        const item = await this.provider.getById(id);
        return item ? RetailerOrderItemSchema.parse(item) : null;
    }

    async getByOrder(orderId: string): Promise<any[]> {
        const items = await this.provider.getByOrder(orderId);
        return items.map(item => ({
            ...RetailerOrderItemSchema.parse(item),
            product: item.product
        }));
    }

    async create(itemData: CreateRetailerOrderItem): Promise<RetailerOrderItem> {
        const validatedData = CreateRetailerOrderItemSchema.parse(itemData);
        const item = await this.provider.create(validatedData);
        return RetailerOrderItemSchema.parse(item);
    }

    async createMany(items: CreateRetailerOrderItem[]): Promise<RetailerOrderItem[]> {
        const validatedItems = items.map(item => CreateRetailerOrderItemSchema.parse(item));
        const createdItems = await this.provider.createMany(validatedItems);
        return createdItems.map(item => RetailerOrderItemSchema.parse(item));
    }

    async update(itemData: RetailerOrderItem): Promise<RetailerOrderItem> {
        const validatedData = RetailerOrderItemSchema.parse(itemData);
        const item = await this.provider.update(validatedData);
        return RetailerOrderItemSchema.parse(item);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }

    async deleteByOrder(orderId: string): Promise<void> {
        await this.provider.deleteByOrder(orderId);
    }

    async getOrderTotal(orderId: string): Promise<number> {
        return await this.provider.getOrderTotal(orderId);
    }
}

export const retailerAccountRepository = new RetailerAccountRepository(new RetailerAccountProvider(db));
export const retailerOrderRepository = new RetailerOrderRepository(new RetailerOrderProvider(db));
export const retailerOrderItemRepository = new RetailerOrderItemRepository(new RetailerOrderItemProvider(db));
