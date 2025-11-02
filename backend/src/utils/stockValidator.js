import Product from "../models/product.model.js";

const isStockAvailable = async (cartProducts) => {
  for (const item of cartProducts) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Sản phẩm với ID ${item.productId} không tồn tại`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Sản phẩm ${product.name} không đủ số lượng trong kho`);
    }
  }
  return true;
};

export { isStockAvailable };
