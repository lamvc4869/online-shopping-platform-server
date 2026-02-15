import Product from "../../models/product.model.js";
import { AppError } from "../../utils/error.js";

const getProductsService = async (page = 1, limit = 4) => {
  page = Math.max(page, 1);
  limit = Math.min(limit, 10); // tại đây có thể tự quyết định cho mỗi trang có bao nhiêu phần tử mà không cần đợi truyền props
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments();
  const totalPages = Math.ceil(total / limit);
  if (page > totalPages && totalPages !== 0) {
    return {
      products: [],
      page,
      limit,
      total,
      totalPages,
      nextPage: false,
      prevPage: page > 1,
    };
  }
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return {
    products,
    page,
    limit,
    total,
    totalPages,
    nextPage: page < totalPages,
    prevPage: page > 1,
  };
};

export default getProductsService;
