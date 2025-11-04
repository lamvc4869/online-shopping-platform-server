import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
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
    selected: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
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
      type: Number,
      enum: [0, 1, 2], // 0: locked, 1: active, 2: checkedOut
      default: 1,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  },
  { timestamps: true }
);

cartSchema.index({ "products.productId": 1 });
cartSchema.index(
  { userId: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: 1 } }
);

const Cart = mongoose.models.cart || mongoose.model("cart", cartSchema);

export default Cart;
