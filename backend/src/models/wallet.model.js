import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    type: {
      type: Number,
      enum: [0, 1], // 0: coins, 1: money
      required: true,
    },
    value: {
      type: Number,
      required: true, // enScripted value
    },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("wallet", walletSchema);

export default Wallet;
