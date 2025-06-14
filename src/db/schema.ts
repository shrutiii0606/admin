import { pgTable, varchar, uuid, timestamp, boolean, foreignKey, index, uniqueIndex, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/// Users Schema
export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    password: varchar("password"),
    email: varchar("email"),
    mobile: varchar("mobile").notNull(),
    role: varchar("role", {
        enum: ["admin", "employee", "retailer"],
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
}, (table) => ([
    index("users_role_idx").on(table.role),
    index("users_mobile_idx").on(table.mobile),
    index("users_email_idx").on(table.email),
]));

export const workers = pgTable("workers", {
    retailerId: uuid("retailer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    employeeId: uuid("employee_id").notNull().references(() => users.id, { onDelete: "cascade" }),
}, (table) => ([
    index("workers_retailer_idx").on(table.retailerId),
    index("workers_employee_idx").on(table.employeeId),
    index("workers_retailer_employee_idx").on(table.retailerId, table.employeeId),
    uniqueIndex("workers_unique_idx").on(table.retailerId, table.employeeId),
]));

/// Accounts Schema
export const retailerAccounts = pgTable("retailer_accounts", {
    id: uuid("id").primaryKey().defaultRandom(),
    retailerId: uuid("retailer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    coins: integer("coins").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
}, (table) => ([
    index("retailer_accounts_retailer_idx").on(table.retailerId),
    uniqueIndex("retailer_accounts_unique_idx").on(table.retailerId),
]));

export const retailerInventories = pgTable("retailer_inventories", {
    retailerId: uuid("retailer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
}, (table) => ([
    index("retailer_inventories_retailer_idx").on(table.retailerId),
    index("retailer_inventories_product_idx").on(table.productId),
    index("retailer_inventories_retailer_product_idx").on(table.retailerId, table.productId),
    uniqueIndex("retailer_inventories_unique_idx").on(table.retailerId, table.productId),
]));

/// Admin Inventory Schema
export const adminInventory = pgTable("admin_inventory", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ([
    index("admin_inventory_product_idx").on(table.productId),
    uniqueIndex("admin_inventory_unique_idx").on(table.productId),
]));

/// Attendance Schema
export const attendance = pgTable("attendance", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    checkIn: timestamp("check_in").notNull(),
    checkOut: timestamp("check_out"),
    date: timestamp("date").notNull(),
    status: varchar("status", {
        enum: ["present", "absent", "leave", "checkin"],
    }).default("absent"),
}, (table) => ([
    index("attendance_user_idx").on(table.userId),
    index("attendance_date_idx").on(table.date),
    index("attendance_user_date_idx").on(table.userId, table.date),
    index("attendance_status_idx").on(table.status),
    uniqueIndex("attendance_unique_idx").on(table.userId, table.date),
]));

/// Products Schema
export const productDetails = pgTable("product_details", {
    id: uuid("id").primaryKey().defaultRandom(),
    shortDescription: varchar("short_description"),
    longDescription: varchar("long_description"),
    categories: varchar("categories"),
});

export const products = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    sku: varchar("sku").notNull().unique(),
    isPrimary: boolean("is_primary").default(false),
    details: uuid("details").notNull().references(() => productDetails.id, { onDelete: "cascade" }),
    price: varchar("price").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
}, (table) => ([
    index("products_sku_idx").on(table.sku),
    index("products_is_primary_idx").on(table.isPrimary),
    index("products_created_at_idx").on(table.createdAt),
    index("products_details_idx").on(table.details),
]));

/// Product Colors, Sizes, Categories Schema
export const productColors = pgTable("product_colors", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    hex: varchar("hex").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const productSizes = pgTable("product_sizes", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const productCategories = pgTable("product_categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const productCategoryProducts = pgTable("product_category_products", {
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id").notNull().references(() => productCategories.id, { onDelete: "cascade" }),
}, (table) => ([
    index("product_category_products_product_idx").on(table.productId),
    index("product_category_products_category_idx").on(table.categoryId),
    uniqueIndex("product_category_products_unique_idx").on(table.productId, table.categoryId),
]));

/// Product Variants Schema (Color-based variants only)
export const productVariants = pgTable("product_variants", {
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    variantId: uuid("variant_id").notNull().references(() => products.id, { onDelete: "cascade" }),
}, (table) => ([
    index("product_variants_product_idx").on(table.productId),
    index("product_variants_variant_idx").on(table.variantId),
]));

/// Product Images Schema
export const productImages = pgTable("product_images", {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    imageUrl: varchar("image_url").notNull(),
    isPrimary: boolean("is_primary").default(false),
}, (table) => ([
    index("product_images_product_idx").on(table.productId),
    index("product_images_is_primary_idx").on(table.isPrimary),
]));

/// Retailer's Orders Schema
export const retailerOrders = pgTable("retailer_orders", {
    id: uuid("id").primaryKey().defaultRandom(),
    retailerId: uuid("retailer_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    paymentDetails: varchar("payment_details"),
    orderStatus: varchar("order_status", {
        enum: ["pending", "completed", "cancelled"],
    }).default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ([
    index("retailer_orders_retailer_idx").on(table.retailerId),
    index("retailer_orders_status_idx").on(table.orderStatus),
    index("retailer_orders_created_at_idx").on(table.createdAt),
    index("retailer_orders_retailer_status_idx").on(table.retailerId, table.orderStatus),
]));

export const retailerOrderItems = pgTable("retailer_order_items", {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id").notNull().references(() => retailerOrders.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    price: varchar("price").notNull(), // Price at time of order
}, (table) => ([
    index("retailer_order_items_order_idx").on(table.orderId),
    index("retailer_order_items_product_idx").on(table.productId),
]));


/// RELATIONS

// Users Relations
export const usersRelations = relations(users, ({ many }) => ({
    // As retailer
    retailerWorkers: many(workers, { relationName: "retailerWorkers" }),
    retailerAccounts: many(retailerAccounts),
    retailerInventories: many(retailerInventories),
    retailerOrders: many(retailerOrders),

    // As employee
    employeeWorkers: many(workers, { relationName: "employeeWorkers" }),
    attendance: many(attendance),
}));

// Workers Relations
export const workersRelations = relations(workers, ({ one }) => ({
    retailer: one(users, {
        fields: [workers.retailerId],
        references: [users.id],
        relationName: "retailerWorkers",
    }),
    employee: one(users, {
        fields: [workers.employeeId],
        references: [users.id],
        relationName: "employeeWorkers",
    }),
}));

// Retailer Accounts Relations
export const retailerAccountsRelations = relations(retailerAccounts, ({ one }) => ({
    retailer: one(users, {
        fields: [retailerAccounts.retailerId],
        references: [users.id],
    }),
}));

// Retailer Inventories Relations
export const retailerInventoryRelations = relations(retailerInventories, ({ one }) => ({
    retailer: one(users, {
        fields: [retailerInventories.retailerId],
        references: [users.id],
    }),
    product: one(products, {
        fields: [retailerInventories.productId],
        references: [products.id],
    }),
}));

// Admin Inventory Relations
export const adminInventoryRelations = relations(adminInventory, ({ one }) => ({
    product: one(products, {
        fields: [adminInventory.productId],
        references: [products.id],
    }),
}));

// Attendance Relations
export const attendanceRelations = relations(attendance, ({ one }) => ({
    employee: one(users, {
        fields: [attendance.userId],
        references: [users.id],
    }),
}));

// Product Details Relations
export const productDetailsRelations = relations(productDetails, ({ many }) => ({
    products: many(products),
}));

// Products Relations
export const productRelations = relations(products, ({ one, many }) => ({
    details: one(productDetails, {
        fields: [products.details],
        references: [productDetails.id],
    }),
    images: many(productImages),
    mainProductVariants: many(productVariants, { relationName: "mainProduct" }),
    variantOfProducts: many(productVariants, { relationName: "variantProduct" }),
    retailerInventories: many(retailerInventories),
    adminInventory: many(adminInventory),
    categoryProducts: many(productCategoryProducts),
    orderItems: many(retailerOrderItems),
}));

// Product Categories Relations
export const productCategoryRelations = relations(productCategories, ({ many }) => ({
    categoryProducts: many(productCategoryProducts),
}));

// Product Category Products Relations
export const productCategoryProductsRelations = relations(productCategoryProducts, ({ one }) => ({
    product: one(products, {
        fields: [productCategoryProducts.productId],
        references: [products.id],
    }),
    category: one(productCategories, {
        fields: [productCategoryProducts.categoryId],
        references: [productCategories.id],
    }),
}));

// Product Variants Relations
export const productVariantRelations = relations(productVariants, ({ one }) => ({
    mainProduct: one(products, {
        fields: [productVariants.productId],
        references: [products.id],
        relationName: "mainProduct",
    }),
    variantProduct: one(products, {
        fields: [productVariants.variantId],
        references: [products.id],
        relationName: "variantProduct",
    }),
}));

// Product Images Relations
export const productImageRelations = relations(productImages, ({ one }) => ({
    product: one(products, {
        fields: [productImages.productId],
        references: [products.id],
    }),
}));

// Retailer Orders Relations
export const retailerOrdersRelations = relations(retailerOrders, ({ one, many }) => ({
    retailer: one(users, {
        fields: [retailerOrders.retailerId],
        references: [users.id],
    }),
    items: many(retailerOrderItems),
}));

// Retailer Order Items Relations
export const retailerOrderItemsRelations = relations(retailerOrderItems, ({ one }) => ({
    order: one(retailerOrders, {
        fields: [retailerOrderItems.orderId],
        references: [retailerOrders.id],
    }),
    product: one(products, {
        fields: [retailerOrderItems.productId],
        references: [products.id],
    }),
}));