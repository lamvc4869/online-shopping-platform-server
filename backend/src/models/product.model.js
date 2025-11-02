import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        brandId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "brand",
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        offerPrice: {
            type: Number,
        },
        category: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
        },
        image: {
            type: [String],
            required: true,
        },
        bestseller: {
            type: Boolean,
            default: false,
        },
        stock: {
            type: Number,
            default: 0,
        },
        unit: {
            type: String,
            default: 'kg',
        },
        origin: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviewCount: {
            type: Number,
            default: 0,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

export default Product;
