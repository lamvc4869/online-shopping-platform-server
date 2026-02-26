import Product from "../../models/product.model.js";

const deleteProductService = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) return "Product not found";

    await Product.findByIdAndDelete(productId);
    return "Product deleted successfully";
  } catch (error) {
    return error.message;
  }
};

export default deleteProductService;
