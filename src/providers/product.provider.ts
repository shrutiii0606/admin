// src/providers/product.provider.ts
import { BaseProvider } from "@/providers/base.provider";
import {
    products,
    productDetails,
    productImages,
    productCategories,
    productCategoryProducts,
    productColors,
    productSizes,
    productVariants,
    adminInventory,
    retailerInventories
} from "@/db/schema";
import { eq, ilike, desc, and, lte } from "drizzle-orm";

export class ProductDetailsProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db.select().from(productDetails);
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(productDetails).where(eq(productDetails.id, id));
        return result[0] || null;
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(productDetails).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(productDetails)
            .set(updateData)
            .where(eq(productDetails.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(productDetails).where(eq(productDetails.id, id));
    }
}

export class ProductProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db
            .select()
            .from(products)
            .orderBy(desc(products.createdAt));
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(products).where(eq(products.id, id));
        return result[0] || null;
    }

    async getBySku(sku: string): Promise<any> {
        const result = await this.db.select().from(products).where(eq(products.sku, sku));
        return result[0] || null;
    }

    async getWithDetails(id: string): Promise<any> {
        const result = await this.db
            .select({
                id: products.id,
                name: products.name,
                sku: products.sku,
                isPrimary: products.isPrimary,
                price: products.price,
                createdAt: products.createdAt,
                details: {
                    id: productDetails.id,
                    shortDescription: productDetails.shortDescription,
                    longDescription: productDetails.longDescription,
                    categories: productDetails.categories,
                }
            })
            .from(products)
            .innerJoin(productDetails, eq(products.details, productDetails.id))
            .where(eq(products.id, id));

        return result[0] || null;
    }

    async searchProducts(query: string): Promise<any[]> {
        return await this.db
            .select()
            .from(products)
            .where(ilike(products.name, `%${query}%`))
            .orderBy(desc(products.createdAt));
    }

    async getByCategory(categoryId: string): Promise<any[]> {
        return await this.db
            .select({
                id: products.id,
                name: products.name,
                sku: products.sku,
                isPrimary: products.isPrimary,
                price: products.price,
                createdAt: products.createdAt,
            })
            .from(products)
            .innerJoin(productCategoryProducts, eq(products.id, productCategoryProducts.productId))
            .where(eq(productCategoryProducts.categoryId, categoryId))
            .orderBy(desc(products.createdAt));
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(products).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(products)
            .set(updateData)
            .where(eq(products.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(products).where(eq(products.id, id));
    }
}

export class ProductCategoryProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db.select().from(productCategories);
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(productCategories).where(eq(productCategories.id, id));
        return result[0] || null;
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(productCategories).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(productCategories)
            .set(updateData)
            .where(eq(productCategories.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(productCategories).where(eq(productCategories.id, id));
    }
}

export class ProductImageProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db.select().from(productImages);
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(productImages).where(eq(productImages.id, id));
        return result[0] || null;
    }

    async getByProduct(productId: string): Promise<any[]> {
        return await this.db.select().from(productImages).where(eq(productImages.productId, productId));
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(productImages).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(productImages)
            .set(updateData)
            .where(eq(productImages.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(productImages).where(eq(productImages.id, id));
    }
}

export class ProductColorProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db.select().from(productColors);
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(productColors).where(eq(productColors.id, id));
        return result[0] || null;
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(productColors).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(productColors)
            .set(updateData)
            .where(eq(productColors.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(productColors).where(eq(productColors.id, id));
    }
}

export class ProductSizeProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db.select().from(productSizes);
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(productSizes).where(eq(productSizes.id, id));
        return result[0] || null;
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(productSizes).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        const result = await this.db
            .update(productSizes)
            .set(updateData)
            .where(eq(productSizes.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(productSizes).where(eq(productSizes.id, id));
    }
}

export class AdminInventoryProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db
            .select({
                id: adminInventory.id,
                productId: adminInventory.productId,
                quantity: adminInventory.quantity,
                createdAt: adminInventory.createdAt,
                updatedAt: adminInventory.updatedAt,
                product: {
                    id: products.id,
                    name: products.name,
                    sku: products.sku,
                    price: products.price,
                }
            })
            .from(adminInventory)
            .innerJoin(products, eq(adminInventory.productId, products.id));
    }

    async getById(id: string): Promise<any> {
        const result = await this.db.select().from(adminInventory).where(eq(adminInventory.id, id));
        return result[0] || null;
    }

    async getByProduct(productId: string): Promise<any> {
        const result = await this.db.select().from(adminInventory).where(eq(adminInventory.productId, productId));
        return result[0] || null;
    }

    async getLowStock(threshold: number = 10): Promise<any[]> {
        return await this.db
            .select({
                id: adminInventory.id,
                productId: adminInventory.productId,
                quantity: adminInventory.quantity,
                product: {
                    id: products.id,
                    name: products.name,
                    sku: products.sku,
                }
            })
            .from(adminInventory)
            .innerJoin(products, eq(adminInventory.productId, products.id))
            .where(lte(adminInventory.quantity, threshold));
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(adminInventory).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { id, ...updateData } = object;
        updateData.updatedAt = new Date();
        const result = await this.db
            .update(adminInventory)
            .set(updateData)
            .where(eq(adminInventory.id, id))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        await this.db.delete(adminInventory).where(eq(adminInventory.id, id));
    }

    async updateQuantity(productId: string, quantity: number): Promise<any> {
        const result = await this.db
            .update(adminInventory)
            .set({ quantity, updatedAt: new Date() })
            .where(eq(adminInventory.productId, productId))
            .returning();
        return result[0];
    }
}

export class RetailerInventoryProvider extends BaseProvider {
    async getAll(): Promise<any[]> {
        return await this.db
            .select({
                retailerId: retailerInventories.retailerId,
                productId: retailerInventories.productId,
                quantity: retailerInventories.quantity,
                product: {
                    id: products.id,
                    name: products.name,
                    sku: products.sku,
                    price: products.price,
                }
            })
            .from(retailerInventories)
            .innerJoin(products, eq(retailerInventories.productId, products.id));
    }

    async getById(id: string): Promise<any> {
        throw new Error("Use getByRetailerAndProduct instead");
    }

    async getByRetailer(retailerId: string): Promise<any[]> {
        return await this.db
            .select({
                retailerId: retailerInventories.retailerId,
                productId: retailerInventories.productId,
                quantity: retailerInventories.quantity,
                product: {
                    id: products.id,
                    name: products.name,
                    sku: products.sku,
                    price: products.price,
                }
            })
            .from(retailerInventories)
            .innerJoin(products, eq(retailerInventories.productId, products.id))
            .where(eq(retailerInventories.retailerId, retailerId));
    }

    async getByRetailerAndProduct(retailerId: string, productId: string): Promise<any> {
        const result = await this.db
            .select()
            .from(retailerInventories)
            .where(and(eq(retailerInventories.retailerId, retailerId), eq(retailerInventories.productId, productId)));
        return result[0] || null;
    }

    async create(object: any): Promise<any> {
        const result = await this.db.insert(retailerInventories).values(object).returning();
        return result[0];
    }

    async update(object: any): Promise<any> {
        const { retailerId, productId, ...updateData } = object;
        const result = await this.db
            .update(retailerInventories)
            .set(updateData)
            .where(and(eq(retailerInventories.retailerId, retailerId), eq(retailerInventories.productId, productId)))
            .returning();
        return result[0];
    }

    async delete(id: string): Promise<void> {
        throw new Error("Use deleteByRetailerAndProduct instead");
    }

    async deleteByRetailerAndProduct(retailerId: string, productId: string): Promise<void> {
        await this.db
            .delete(retailerInventories)
            .where(and(eq(retailerInventories.retailerId, retailerId), eq(retailerInventories.productId, productId)));
    }
}