import { AppError } from "../../utils/error.js";
import Product from "../../models/product.model.js";
import Cart from "../../models/cart.model.js";

const validateProductExistingInCart = async (cart, product) => {
    const existingProduct = cart.products.find(p => p.productId.toString() === product.productId);
    if (existingProduct) {
        const quantity = existingProduct.quantity;
        const dbProduct = await Product.findById(product.productId);
        if (!dbProduct) {
            throw new AppError("Product not found", 404);
        }
        if (dbProduct.stock < quantity + product.quantity) {
            throw new AppError(`Lỗi quá số lượng tồn kho: ${dbProduct.name}`, 400);
        }
    }
}

const validateCartExistingOrEmpty = async (cart) => {
    if (!cart) {
        throw new AppError("Cart not found", 404);
    }
    if (!cart.products || cart.products.length === 0) {
        throw new AppError("Cart is empty", 400);
    }
}

export { validateProductExistingInCart, validateCartExistingOrEmpty };