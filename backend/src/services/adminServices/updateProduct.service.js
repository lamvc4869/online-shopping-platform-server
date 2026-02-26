import Product from "../../models/product.model.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

const updateProductService = async (productId, updateData, updateFiles) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return "Product not found";
    }

    if (updateData.name && updateData.name !== product.name) {
      const existingProduct = await Product.findOne({
        name: updateData.name.trim(),
      });
      if (existingProduct) {
        return `A product named "${updateData.name}" already exists`;
      }
    }

    for (const key in updateData) {
      const value = updateData[key];
      if (key === "price" && value <= 0) {
        return "Price must be greater than 0";
      }
      if (
        key === "offerPrice" &&
        value >= (updateData.price ?? product.price)
      ) {
        return "Sale price must be lower than the original price";
      }
      if (key === "stock" && value < 0) {
        return "Stock quantity cannot be negative";
      }
      if (key === "nutritionInfo" && typeof value === "object") {
        product.nutritionInfo = {
          ...product.nutritionInfo,
          ...value,
        };
      } else {
        product[key] = value;
      }
    }

    if (updateFiles && updateFiles.length > 0) {
      product.image = await Promise.all(
        updateFiles.map((file) => uploadToCloudinary(file.path)),
      );
    }

    await product.save();
    return product;
  } catch (error) {
    return error.message;
  }
};

export default updateProductService;
