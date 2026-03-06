import Product from "../../models/product.model.js";

const getProductByIdService = async (productId) => {
  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return "Product not found";
    }
    return existingProduct;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getProductByIdService;
