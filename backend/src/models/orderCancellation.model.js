import mongoose from "mongoose";

const orderCancellationSchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    cancelAt: {
        type: Date,
        default: Date.now,
    }
});

const OrderCancellation = mongoose.model("orderCancellation", orderCancellationSchema);

export default OrderCancellation;