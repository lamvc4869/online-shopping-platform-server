import Product from "../../models/product.model.js";
import { AppError } from "../../utils/error.js";

const getProductsByAdminService = async (adminId) => {
  if (!adminId) {
    throw new AppError("Admin ID là bắt buộc", 400);
  }

  const products = await Product.find({ createdBy: adminId })
    .populate("brandId", "brandName brandAdress")
    .populate("createdBy", "firstName lastName email")
    .sort({ createdAt: -1 });

  return products;
};

export default getProductsByAdminService;

