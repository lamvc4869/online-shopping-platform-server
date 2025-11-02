import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        images: {
            type: [String],
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Review = mongoose.model("review", reviewSchema);

export default Review;
