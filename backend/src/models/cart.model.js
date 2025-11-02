import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    { _id: false }
);

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            unique: true,
        },
        products: {
            type: [cartItemSchema],
            default: [],
        },
        totalAmount: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['active', 'locked'],
            default: 'active',
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order',
        }
    },
    { timestamps: true }
);


cartSchema.index({ userId: 1 }, { unique: true });
cartSchema.index({ 'products.productId': 1 });
cartSchema.index({ userId: 1, status: 1 }, { unique: true, partialFilterExpression: { status: 'active' } });

const Cart = mongoose.models.cart || mongoose.model("cart", cartSchema);

export default Cart;
