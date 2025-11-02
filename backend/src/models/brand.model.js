import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
    },
    brandAdress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("brand", brandSchema);

export default Brand;
