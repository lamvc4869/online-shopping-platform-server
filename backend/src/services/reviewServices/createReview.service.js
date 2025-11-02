import Review from "../../models/review.model.js";
import Order from "../../models/order.model.js";
import Product from "../../models/product.model.js";
import { calculateProductRating } from "../../lib/calcs/ratingCalculator.js"

const createReviewService = async (userId, productId, rating) => {
    const purchasedProduct = await Order.findOne({
        userId,
        "products.productId": productId,
        orderStatus: "delivered",
    });
    if (!purchasedProduct) {
        return "Bạn chỉ có thể đánh giá sản phẩm đã mua và nhận hàng";
    }

    const existingReview = await Review.findOne({ userId, productId });
    if (existingReview) {
        return "Bạn đã đánh giá sản phẩm này rồi";
    }

    const newReview = new Review({
        userId,
        productId,
        rating,
    });

    const product = await Product.findById(productId);
    calculateProductRating(product, rating);

    await product.save();
    await newReview.save();

    return newReview;
};

export default createReviewService;
