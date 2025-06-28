import { z } from "zod";

export const RetailerAccountSchema = z.object({
    id: z.string().uuid(),
    retailerId: z.string().uuid(),
    coins: z.number().int().min(0, "Coins must be non-negative"),
    createdAt: z.date().optional(),
});

export const CreateRetailerAccountSchema = RetailerAccountSchema.omit({
    id: true,
    createdAt: true
});

export const UpdateRetailerAccountSchema = z.object({
    id: z.string().uuid(),
    coins: z.number().int().min(0, "Coins must be non-negative"),
});

export const RetailerOrderSchema = z.object({
    id: z.string().uuid(),
    retailerId: z.string().uuid(),
    paymentDetails: z.string().optional(),
    orderStatus: z.enum(["pending", "completed", "cancelled"]).default("pending"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateRetailerOrderSchema = RetailerOrderSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const UpdateRetailerOrderSchema = z.object({
    id: z.string().uuid(),
    orderStatus: z.enum(["pending", "completed", "cancelled"]).optional(),
    paymentDetails: z.string().optional(),
});

export const RetailerOrderItemSchema = z.object({
    id: z.string().uuid(),
    orderId: z.string().uuid(),
    productId: z.string().uuid(),
    quantity: z.number().int().min(1, "Quantity must be at least 1"),
    price: z.string().min(1, "Price is required"),
});

export const CreateRetailerOrderItemSchema = RetailerOrderItemSchema.omit({ id: true });

export const CompleteRetailerOrderSchema = z.object({
    retailerId: z.string().uuid(),
    paymentDetails: z.string().optional(),
    items: z.array(z.object({
        productId: z.string().uuid(),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
        price: z.string().min(1, "Price is required"),
    })).min(1, "At least one item is required"),
});

export const RetailerOrderWithDetailsSchema = RetailerOrderSchema.extend({
    items: z.array(RetailerOrderItemSchema.extend({
        product: z.object({
            id: z.string().uuid(),
            name: z.string(),
            sku: z.string(),
            price: z.string(),
        }),
    })),
    retailer: z.object({
        id: z.string().uuid(),
        name: z.string(),
        mobile: z.string(),
        email: z.string().optional(),
    }),
    totalAmount: z.number().optional(),
    totalItems: z.number().optional(),
});

export const OrderStatisticsSchema = z.object({
    totalOrders: z.number(),
    pendingOrders: z.number(),
    completedOrders: z.number(),
    cancelledOrders: z.number(),
    totalRevenue: z.number(),
    averageOrderValue: z.number(),
});

export const RetailerDashboardSchema = z.object({
    retailerId: z.string().uuid(),
    totalCoins: z.number(),
    totalOrders: z.number(),
    pendingOrders: z.number(),
    completedOrders: z.number(),
    totalInventoryValue: z.number(),
    lowStockProducts: z.number(),
    recentOrders: z.array(RetailerOrderSchema).optional(),
});

export type RetailerAccount = z.infer<typeof RetailerAccountSchema>;
export type CreateRetailerAccount = z.infer<typeof CreateRetailerAccountSchema>;
export type UpdateRetailerAccount = z.infer<typeof UpdateRetailerAccountSchema>;
export type RetailerOrder = z.infer<typeof RetailerOrderSchema>;
export type CreateRetailerOrder = z.infer<typeof CreateRetailerOrderSchema>;
export type UpdateRetailerOrder = z.infer<typeof UpdateRetailerOrderSchema>;
export type RetailerOrderItem = z.infer<typeof RetailerOrderItemSchema>;
export type CreateRetailerOrderItem = z.infer<typeof CreateRetailerOrderItemSchema>;
export type CompleteRetailerOrder = z.infer<typeof CompleteRetailerOrderSchema>;
export type RetailerOrderWithDetails = z.infer<typeof RetailerOrderWithDetailsSchema>;
export type OrderStatistics = z.infer<typeof OrderStatisticsSchema>;
export type RetailerDashboard = z.infer<typeof RetailerDashboardSchema>;