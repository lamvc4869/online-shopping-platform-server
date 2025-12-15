const calculateItemPrice = (product) => {
    return product?.offerPrice || product.price;
};

const calculateItemTotal = (price, quantity) => {
    return price * quantity;
};

const calculateCartTotal = (products) => {
    if (!products || products.length === 0) return 0;
    const selectedProducts = products.filter(item => item.selected);
    if (selectedProducts.length === 0) return 0;
    return selectedProducts.reduce((total, item) => {
        const itemTotal = calculateItemTotal(calculateItemPrice(item), item.quantity);
        return total + itemTotal;
    }, 0);
};

export {
    calculateItemPrice,
    calculateItemTotal,
    calculateCartTotal
};
