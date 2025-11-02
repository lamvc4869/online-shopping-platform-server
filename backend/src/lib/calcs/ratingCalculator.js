const calculateProductRating = (product, newRating) => {
    product.reviewCount += 1;
    product.rating += newRating;
    product.averageRating = Math.round((product.rating / product.reviewCount) * 10) / 10;
    return product;
};

export { calculateProductRating };