import Product from "../models/product.model.js";

const validateProducts = async (products) => {
    if (!Array.isArray(products) || products.length === 0) {
        throw new Error("Products array is required and cannot be empty");
    }

    const productIds = products.map(p => p.productId);
    const existingProducts = await Product.find({
        _id: { $in: productIds },
        isActive: true
    });

    if (existingProducts.length !== productIds.length) {
        throw new Error("Some products not found or not available");
    }

    for (const product of products) {
        const dbProduct = existingProducts.find(p => p._id.toString() === product.productId);
        if (dbProduct.stock < product.quantity) {
            throw new Error(`Insufficient stock for product: ${dbProduct.name}`);
        }
    }

    return existingProducts;
};

export { validateProducts };
