import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet",
    },
    voucherId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "voucher",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      enum: [0, 1, 2], // 0: user, 1: shop, 2: admin
      default: 0,
    },
    age: {
      type: Number,
    },
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
