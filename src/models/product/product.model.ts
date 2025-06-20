import { z } from "zod";

export const ProductDetailsSchema = z.object({
    id: z.string().uuid(),
    shortDescription: z.string().optional(),
    longDescription: z.string().optional(),
    categories: z.string().optional(),
});

export const CreateProductDetailsSchema = ProductDetailsSchema.omit({ id: true });

export const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    isPrimary: z.boolean().default(false),
    details: z.string().uuid(),
    price: z.string().min(1, "Price is required"),
    createdAt: z.date().optional(),
});

export const CreateProductSchema = ProductSchema.omit({ id: true, createdAt: true });
export const UpdateProductSchema = CreateProductSchema.partial().extend({
    id: z.string().uuid(),
});

export const ProductWithDetailsSchema = ProductSchema.extend({
    details: ProductDetailsSchema,
    images: z.array(z.object({
        id: z.string().uuid(),
        imageUrl: z.string().url(),
        isPrimary: z.boolean(),
    })).optional(),
    categories: z.array(z.object({
        id: z.string().uuid(),
        name: z.string(),
    })).optional(),
});

export const ProductColorSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Color name is required"),
    hex: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color"),
    createdAt: z.date().optional(),
});

export const CreateProductColorSchema = ProductColorSchema.omit({ id: true, createdAt: true });

export const ProductSizeSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Size name is required"),
    createdAt: z.date().optional(),
});

export const CreateProductSizeSchema = ProductSizeSchema.omit({ id: true, createdAt: true });

export const ProductCategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, "Category name is required"),
    createdAt: z.date().optional(),
});

export const CreateProductCategorySchema = ProductCategorySchema.omit({ id: true, createdAt: true });

export const ProductImageSchema = z.object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    imageUrl: z.string().url("Invalid image URL"),
    isPrimary: z.boolean().default(false),
});

export const CreateProductImageSchema = ProductImageSchema.omit({ id: true });

export const ProductVariantSchema = z.object({
    productId: z.string().uuid(),
    variantId: z.string().uuid(),
});

export const AdminInventorySchema = z.object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    quantity: z.number().int().min(0, "Quantity must be non-negative"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const CreateAdminInventorySchema = AdminInventorySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const UpdateAdminInventorySchema = z.object({
    id: z.string().uuid(),
    quantity: z.number().int().min(0, "Quantity must be non-negative"),
});

export const RetailerInventorySchema = z.object({
    retailerId: z.string().uuid(),
    productId: z.string().uuid(),
    quantity: z.number().int().min(0, "Quantity must be non-negative"),
});

export const CreateRetailerInventorySchema = RetailerInventorySchema;
export const UpdateRetailerInventorySchema = RetailerInventorySchema;

export type ProductDetails = z.infer<typeof ProductDetailsSchema>;
export type CreateProductDetails = z.infer<typeof CreateProductDetailsSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>;
export type ProductWithDetails = z.infer<typeof ProductWithDetailsSchema>;
export type ProductColor = z.infer<typeof ProductColorSchema>;
export type CreateProductColor = z.infer<typeof CreateProductColorSchema>;
export type ProductSize = z.infer<typeof ProductSizeSchema>;
export type CreateProductSize = z.infer<typeof CreateProductSizeSchema>;
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type CreateProductCategory = z.infer<typeof CreateProductCategorySchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;
export type CreateProductImage = z.infer<typeof CreateProductImageSchema>;
export type ProductVariant = z.infer<typeof ProductVariantSchema>;
export type AdminInventory = z.infer<typeof AdminInventorySchema>;
export type CreateAdminInventory = z.infer<typeof CreateAdminInventorySchema>;
export type UpdateAdminInventory = z.infer<typeof UpdateAdminInventorySchema>;
export type RetailerInventory = z.infer<typeof RetailerInventorySchema>;
export type CreateRetailerInventory = z.infer<typeof CreateRetailerInventorySchema>;
export type UpdateRetailerInventory = z.infer<typeof UpdateRetailerInventorySchema>;