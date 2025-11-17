import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        orderNumber: {
            type: String,
            unique: true,
            // required: true,
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cart',
            required: true,
        },
        products: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
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
            total: {
                type: Number,
                required: true,
            },
        }],
        shippingAddress: {
            type: String,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ['cod', 'online'], //@todo: [0, 1] 0: COD, 1: Online Payment
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed', 'refunded'], //@todo: [0, 1, 2, 3]
            default: 'pending',
        },
        orderStatus: {
            type: String,
            enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'], //@todo: [0, 1, 2, 3] 0: pending, 1: active, 2: completed, 3: cancelled
            default: 'pending',
        },
        subtotal: {
            type: Number,
        },
        discount: {
            type: Number,
            default: 0,
        },
        totalAmount: {
            type: Number,
        },
        notes: {
            type: String,
        },
        cancelAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

orderSchema.index({ userId: 1, createdAt: -1 });

const Order = mongoose.model("order", orderSchema);

export default Order;
