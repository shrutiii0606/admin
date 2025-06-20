import {
    ProductDetailsProvider,
    ProductProvider,
    ProductCategoryProvider,
    ProductImageProvider,
    ProductColorProvider,
    ProductSizeProvider,
    AdminInventoryProvider,
    RetailerInventoryProvider
} from "@/providers/product.provider";
import { BaseRepository } from "./base.repository";
import { db } from "@/db";
import {
    ProductDetails,
    CreateProductDetails,
    Product,
    CreateProduct,
    UpdateProduct,
    ProductWithDetails,
    ProductCategory,
    CreateProductCategory,
    ProductImage,
    CreateProductImage,
    ProductColor,
    CreateProductColor,
    ProductSize,
    CreateProductSize,
    AdminInventory,
    CreateAdminInventory,
    UpdateAdminInventory,
    RetailerInventory,
    CreateRetailerInventory,
    UpdateRetailerInventory,
    ProductDetailsSchema,
    CreateProductDetailsSchema,
    ProductSchema,
    CreateProductSchema,
    UpdateProductSchema,
    ProductWithDetailsSchema,
    ProductCategorySchema,
    CreateProductCategorySchema,
    ProductImageSchema,
    CreateProductImageSchema,
    ProductColorSchema,
    CreateProductColorSchema,
    ProductSizeSchema,
    CreateProductSizeSchema,
    AdminInventorySchema,
    CreateAdminInventorySchema,
    UpdateAdminInventorySchema,
    RetailerInventorySchema,
    CreateRetailerInventorySchema,
    UpdateRetailerInventorySchema
} from "@/models/product/product.model";

class ProductDetailsRepository extends BaseRepository<ProductDetailsProvider> {
    constructor(provider: ProductDetailsProvider) {
        super(provider);
    }

    async getAll(): Promise<ProductDetails[]> {
        const details = await this.provider.getAll();
        return details.map(detail => ProductDetailsSchema.parse(detail));
    }

    async getById(id: string): Promise<ProductDetails | null> {
        const detail = await this.provider.getById(id);
        return detail ? ProductDetailsSchema.parse(detail) : null;
    }

    async create(detailsData: CreateProductDetails): Promise<ProductDetails> {
        const validatedData = CreateProductDetailsSchema.parse(detailsData);
        const details = await this.provider.create(validatedData);
        return ProductDetailsSchema.parse(details);
    }

    async update(detailsData: ProductDetails): Promise<ProductDetails> {
        const validatedData = ProductDetailsSchema.parse(detailsData);
        const details = await this.provider.update(validatedData);
        return ProductDetailsSchema.parse(details);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }
}

class ProductRepository extends BaseRepository<ProductProvider> {
    constructor(provider: ProductProvider) {
        super(provider);
    }

    async getAll(): Promise<Product[]> {
        const products = await this.provider.getAll();
        return products.map(product => ProductSchema.parse(product));
    }

    async getById(id: string): Promise<Product | null> {
        const product = await this.provider.getById(id);
        return product ? ProductSchema.parse(product) : null;
    }

    async getBySku(sku: string): Promise<Product | null> {
        const product = await this.provider.getBySku(sku);
        return product ? ProductSchema.parse(product) : null;
    }

    async getWithDetails(id: string): Promise<ProductWithDetails | null> {
        const productWithDetails = await this.provider.getWithDetails(id);
        return productWithDetails ? ProductWithDetailsSchema.parse(productWithDetails) : null;
    }

    async searchProducts(query: string): Promise<Product[]> {
        const products = await this.provider.searchProducts(query);
        return products.map(product => ProductSchema.parse(product));
    }

    async getByCategory(categoryId: string): Promise<Product[]> {
        const products = await this.provider.getByCategory(categoryId);
        return products.map(product => ProductSchema.parse(product));
    }

    async create(productData: CreateProduct): Promise<Product> {
        const validatedData = CreateProductSchema.parse(productData);
        const product = await this.provider.create(validatedData);
        return ProductSchema.parse(product);
    }

    async update(productData: UpdateProduct): Promise<Product> {
        const validatedData = UpdateProductSchema.parse(productData);
        const product = await this.provider.update(validatedData);
        return ProductSchema.parse(product);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }
}

class ProductCategoryRepository extends BaseRepository<ProductCategoryProvider> {
    constructor(provider: ProductCategoryProvider) {
        super(provider);
    }

    async getAll(): Promise<ProductCategory[]> {
        const categories = await this.provider.getAll();
        return categories.map(category => ProductCategorySchema.parse(category));
    }

    async getById(id: string): Promise<ProductCategory | null> {
        const category = await this.provider.getById(id);
        return category ? ProductCategorySchema.parse(category) : null;
    }

    async create(categoryData: CreateProductCategory): Promise<ProductCategory> {
        const validatedData = CreateProductCategorySchema.parse(categoryData);
        const category = await this.provider.create(validatedData);
        return ProductCategorySchema.parse(category);
    }

    async update(categoryData: ProductCategory): Promise<ProductCategory> {
        const validatedData = ProductCategorySchema.parse(categoryData);
        const category = await this.provider.update(validatedData);
        return ProductCategorySchema.parse(category);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }
}

class ProductImageRepository extends BaseRepository<ProductImageProvider> {
    constructor(provider: ProductImageProvider) {
        super(provider);
    }

    async getAll(): Promise<ProductImage[]> {
        const images = await this.provider.getAll();
        return images.map(image => ProductImageSchema.parse(image));
    }

    async getById(id: string): Promise<ProductImage | null> {
        const image = await this.provider.getById(id);
        return image ? ProductImageSchema.parse(image) : null;
    }

    async getByProduct(productId: string): Promise<ProductImage[]> {
        const images = await this.provider.getByProduct(productId);
        return images.map(image => ProductImageSchema.parse(image));
    }

    async create(imageData: CreateProductImage): Promise<ProductImage> {
        const validatedData = CreateProductImageSchema.parse(imageData);
        const image = await this.provider.create(validatedData);
        return ProductImageSchema.parse(image);
    }

    async update(imageData: ProductImage): Promise<ProductImage> {
        const validatedData = ProductImageSchema.parse(imageData);
        const image = await this.provider.update(validatedData);
        return ProductImageSchema.parse(image);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }
}

class ProductColorRepository extends BaseRepository<ProductColorProvider> {
    constructor(provider: ProductColorProvider) {
        super(provider);
    }

    async getAll(): Promise<ProductColor[]> {
        const colors = await this.provider.getAll();
        return colors.map(color => ProductColorSchema.parse(color));
    }

    async getById(id: string): Promise<ProductColor | null> {
        const color = await this.provider.getById(id);
        return color ? ProductColorSchema.parse(color) : null;
    }

    async create(colorData: CreateProductColor): Promise<ProductColor> {
        const validatedData = CreateProductColorSchema.parse(colorData);
        const color = await this.provider.create(validatedData);
        return ProductColorSchema.parse(color);
    }

    async update(colorData: ProductColor): Promise<ProductColor> {
        const validatedData = ProductColorSchema.parse(colorData);
        const color = await this.provider.update(validatedData);
        return ProductColorSchema.parse(color);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }
}

class ProductSizeRepository extends BaseRepository<ProductSizeProvider> {
    constructor(provider: ProductSizeProvider) {
        super(provider);
    }

    async getAll(): Promise<ProductSize[]> {
        const sizes = await this.provider.getAll();
        return sizes.map(size => ProductSizeSchema.parse(size));
    }

    async getById(id: string): Promise<ProductSize | null> {
        const size = await this.provider.getById(id);
        return size ? ProductSizeSchema.parse(size) : null;
    }

    async create(sizeData: CreateProductSize): Promise<ProductSize> {
        const validatedData = CreateProductSizeSchema.parse(sizeData);
        const size = await this.provider.create(validatedData);
        return ProductSizeSchema.parse(size);
    }

    async update(sizeData: ProductSize): Promise<ProductSize> {
        const validatedData = ProductSizeSchema.parse(sizeData);
        const size = await this.provider.update(validatedData);
        return ProductSizeSchema.parse(size);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }
}

class AdminInventoryRepository extends BaseRepository<AdminInventoryProvider> {
    constructor(provider: AdminInventoryProvider) {
        super(provider);
    }

    async getAll(): Promise<any[]> {
        const inventories = await this.provider.getAll();
        return inventories.map(inventory => ({
            ...AdminInventorySchema.parse(inventory),
            product: inventory.product
        }));
    }

    async getById(id: string): Promise<AdminInventory | null> {
        const inventory = await this.provider.getById(id);
        return inventory ? AdminInventorySchema.parse(inventory) : null;
    }

    async getByProduct(productId: string): Promise<AdminInventory | null> {
        const inventory = await this.provider.getByProduct(productId);
        return inventory ? AdminInventorySchema.parse(inventory) : null;
    }

    async getLowStock(threshold?: number): Promise<any[]> {
        const inventories = await this.provider.getLowStock(threshold);
        return inventories.map(inventory => ({
            ...AdminInventorySchema.parse(inventory),
            product: inventory.product
        }));
    }

    async create(inventoryData: CreateAdminInventory): Promise<AdminInventory> {
        const validatedData = CreateAdminInventorySchema.parse(inventoryData);
        const inventory = await this.provider.create(validatedData);
        return AdminInventorySchema.parse(inventory);
    }

    async update(inventoryData: UpdateAdminInventory): Promise<AdminInventory> {
        const validatedData = UpdateAdminInventorySchema.parse(inventoryData);
        const inventory = await this.provider.update(validatedData);
        return AdminInventorySchema.parse(inventory);
    }

    async delete(id: string): Promise<void> {
        await this.provider.delete(id);
    }

    async updateQuantity(productId: string, quantity: number): Promise<AdminInventory> {
        const inventory = await this.provider.updateQuantity(productId, quantity);
        return AdminInventorySchema.parse(inventory);
    }
}

class RetailerInventoryRepository extends BaseRepository<RetailerInventoryProvider> {
    constructor(provider: RetailerInventoryProvider) {
        super(provider);
    }

    async getAll(): Promise<any[]> {
        const inventories = await this.provider.getAll();
        return inventories.map(inventory => ({
            ...RetailerInventorySchema.parse(inventory),
            product: inventory.product
        }));
    }

    async getById(id: string): Promise<RetailerInventory | null> {
        throw new Error("Use getByRetailerAndProduct instead");
    }

    async getByRetailer(retailerId: string): Promise<any[]> {
        const inventories = await this.provider.getByRetailer(retailerId);
        return inventories.map(inventory => ({
            ...RetailerInventorySchema.parse(inventory),
            product: inventory.product
        }));
    }

    async getByRetailerAndProduct(retailerId: string, productId: string): Promise<RetailerInventory | null> {
        const inventory = await this.provider.getByRetailerAndProduct(retailerId, productId);
        return inventory ? RetailerInventorySchema.parse(inventory) : null;
    }

    async create(inventoryData: CreateRetailerInventory): Promise<RetailerInventory> {
        const validatedData = CreateRetailerInventorySchema.parse(inventoryData);
        const inventory = await this.provider.create(validatedData);
        return RetailerInventorySchema.parse(inventory);
    }

    async update(inventoryData: UpdateRetailerInventory): Promise<RetailerInventory> {
        const validatedData = UpdateRetailerInventorySchema.parse(inventoryData);
        const inventory = await this.provider.update(validatedData);
        return RetailerInventorySchema.parse(inventory);
    }

    async delete(id: string): Promise<void> {
        throw new Error("Use deleteByRetailerAndProduct instead");
    }

    async deleteByRetailerAndProduct(retailerId: string, productId: string): Promise<void> {
        await this.provider.deleteByRetailerAndProduct(retailerId, productId);
    }
}

export const productDetailsRepository = new ProductDetailsRepository(new ProductDetailsProvider(db));
export const productRepository = new ProductRepository(new ProductProvider(db));
export const productCategoryRepository = new ProductCategoryRepository(new ProductCategoryProvider(db));
export const productImageRepository = new ProductImageRepository(new ProductImageProvider(db));
export const productColorRepository = new ProductColorRepository(new ProductColorProvider(db));
export const productSizeRepository = new ProductSizeRepository(new ProductSizeProvider(db));
export const adminInventoryRepository = new AdminInventoryRepository(new AdminInventoryProvider(db));
export const retailerInventoryRepository = new RetailerInventoryRepository(new RetailerInventoryProvider(db));
