import { calculateItemPrice } from "../calcs/priceCalculation.service.js";

const processCartItems = (cart, products, existingProducts) => {
    for (const product of products) {
        const dbProduct = existingProducts.find(p => p._id.toString() === product.productId);
        
        const existingItemIndex = cart.products.findIndex(
            item => item.productId.toString() === product.productId
        );

        if (existingItemIndex > -1) {
            cart.products[existingItemIndex].quantity += product.quantity;
        } else {
            cart.products.push({
                productId: product.productId,
                quantity: product.quantity,
                price: calculateItemPrice(dbProduct)
            });
        }
    }
};

export { processCartItems };
