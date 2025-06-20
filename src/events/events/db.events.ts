import { DbEvent } from ".";

export class UserEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): UserEvent<T> {
        return new UserEvent<T>(payload);
    }
    static updated<T>(payload: T): UserEvent<T> {
        return new UserEvent<T>(payload);
    }
    static deleted<T>(payload: T): UserEvent<T> { 
        return new UserEvent<T>(payload);
    }
}

export class WorkerEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): WorkerEvent<T> {
        return new WorkerEvent<T>(payload);
    }
    static updated<T>(payload: T): WorkerEvent<T> {
        return new WorkerEvent<T>(payload);
    }
    static deleted<T>(payload: T): WorkerEvent<T> {
        return new WorkerEvent<T>(payload);
    }
}

export class RetailerAccountEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): RetailerAccountEvent<T> {
        return new RetailerAccountEvent<T>(payload);
    }
    static updated<T>(payload: T): RetailerAccountEvent<T> {
        return new RetailerAccountEvent<T>(payload);
    }
    static deleted<T>(payload: T): RetailerAccountEvent<T> {
        return new RetailerAccountEvent<T>(payload);
    }
}

export class RetailerInventoryEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): RetailerInventoryEvent<T> {
        return new RetailerInventoryEvent<T>(payload);
    }
    static updated<T>(payload: T): RetailerInventoryEvent<T> {
        return new RetailerInventoryEvent<T>(payload);
    }
    static deleted<T>(payload: T): RetailerInventoryEvent<T> {
        return new RetailerInventoryEvent<T>(payload);
    }
}

export class AdminInventoryEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): AdminInventoryEvent<T> {
        return new AdminInventoryEvent<T>(payload);
    }
    static updated<T>(payload: T): AdminInventoryEvent<T> {
        return new AdminInventoryEvent<T>(payload);
    }
    static deleted<T>(payload: T): AdminInventoryEvent<T> {
        return new AdminInventoryEvent<T>(payload);
    }
}

export class AttendanceEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): AttendanceEvent<T> {
        return new AttendanceEvent<T>(payload);
    }
    static updated<T>(payload: T): AttendanceEvent<T> {
        return new AttendanceEvent<T>(payload);
    }
    static deleted<T>(payload: T): AttendanceEvent<T> {
        return new AttendanceEvent<T>(payload);
    }
}

export class ProductDetailEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductDetailEvent<T> {
        return new ProductDetailEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductDetailEvent<T> {
        return new ProductDetailEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductDetailEvent<T> {
        return new ProductDetailEvent<T>(payload);
    }
}

export class ProductEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductEvent<T> {
        return new ProductEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductEvent<T> {
        return new ProductEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductEvent<T> {
        return new ProductEvent<T>(payload);
    }
}

export class ProductColorEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductColorEvent<T> {
        return new ProductColorEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductColorEvent<T> {
        return new ProductColorEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductColorEvent<T> {
        return new ProductColorEvent<T>(payload);
    }
}

export class ProductSizeEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductSizeEvent<T> {
        return new ProductSizeEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductSizeEvent<T> {
        return new ProductSizeEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductSizeEvent<T> {
        return new ProductSizeEvent<T>(payload);
    }
}

export class ProductCategoryEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductCategoryEvent<T> {
        return new ProductCategoryEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductCategoryEvent<T> {
        return new ProductCategoryEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductCategoryEvent<T> {
        return new ProductCategoryEvent<T>(payload);
    }
}

export class ProductCategoryProductEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductCategoryProductEvent<T> {
        return new ProductCategoryProductEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductCategoryProductEvent<T> {
        return new ProductCategoryProductEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductCategoryProductEvent<T> {
        return new ProductCategoryProductEvent<T>(payload);
    }
}

export class ProductVariantEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductVariantEvent<T> {
        return new ProductVariantEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductVariantEvent<T> {
        return new ProductVariantEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductVariantEvent<T> {
        return new ProductVariantEvent<T>(payload);
    }
}

export class ProductImageEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): ProductImageEvent<T> {
        return new ProductImageEvent<T>(payload);
    }
    static updated<T>(payload: T): ProductImageEvent<T> {
        return new ProductImageEvent<T>(payload);
    }
    static deleted<T>(payload: T): ProductImageEvent<T> {
        return new ProductImageEvent<T>(payload);
    }
}

export class RetailerOrderEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): RetailerOrderEvent<T> {
        return new RetailerOrderEvent<T>(payload);
    }
    static updated<T>(payload: T): RetailerOrderEvent<T> {
        return new RetailerOrderEvent<T>(payload);
    }
    static deleted<T>(payload: T): RetailerOrderEvent<T> {
        return new RetailerOrderEvent<T>(payload);
    }
}

export class RetailerOrderItemEvent<T> extends DbEvent<T> {
    constructor(payload: T) {
        super(payload);
        console.log(this.timestamp, " Event Emitted: Type ", typeof this, " Subtype ", typeof payload);
    }
    static created<T>(payload: T): RetailerOrderItemEvent<T> {
        return new RetailerOrderItemEvent<T>(payload);
    }
    static updated<T>(payload: T): RetailerOrderItemEvent<T> {
        return new RetailerOrderItemEvent<T>(payload);
    }
    static deleted<T>(payload: T): RetailerOrderItemEvent<T> {
        return new RetailerOrderItemEvent<T>(payload);
    }
}

