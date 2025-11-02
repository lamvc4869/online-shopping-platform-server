import mongoose from "mongoose";

const productVoucherSchema = new mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brand",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const orderVoucherSchema = new mongoose.Schema({
  limited: {
    type: Number,
    required: true,
  },
  orderVoucherType: {
    type: Number,
    enum: [0, 1], // 0: Áp dụng cho tổng tiền đơn hàng, 1: Áp dụng cho tiền vận chuyển
    required: true,
  },
  usedBy: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      usedAt: {
        type: Date,
        default: Date.now,
      },
    }
  ],
});

const voucherSchema = new mongoose.Schema(
  {
    voucherCode: {
      type: String,
      required: true,
      unique: true,
    },
    voucherTitle: {
      type: String,
      required: true,
    },
    voucherCalc: {
      type: Number,
      enum: [0, 1], // 0: Giảm theo %, 1: Giảm theo số tiền
      required: true,
    },
    voucherValue: {
      type: Number,
      required: true,
    },
    voucherStatus: {
      type: Number,
      enum: [0, 1], // 0: hết hạn, 1: còn hạn
      default: 1,
    },
    voucherDueDate: {
      type: Date,
      required: true,
    },
    voucherType: {
      type: Number,
      enum: [0, 1], // 0: productVoucher, 1: orderVoucher
      required: true,
    },
    productVoucher: {
      type: productVoucherSchema,
      required: () => this.voucherType === 0,
    },
    orderVoucher: {
      type: orderVoucherSchema,
      required: () => this.voucherType === 1,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model("voucher", voucherSchema);

export default Voucher;
