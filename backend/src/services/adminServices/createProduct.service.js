import Product from "../../models/product.model.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";

const createProductService = async (productData, files) => {
  try {
    const { name, price, category, offerPrice, stock, origin } = productData;

    if (!name || !price || !category || !files || files.length === 0) {
      return "Thiếu thông tin bắt buộc: name, price, category, image";
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) return "Sản phẩm với tên này đã tồn tại";

    if (price <= 0) return "Giá sản phẩm phải lớn hơn 0";
    if (offerPrice && offerPrice >= price)
      return "Giá khuyến mãi phải nhỏ hơn giá gốc";
    if (stock && stock < 0) return "Số lượng tồn kho không thể âm";

    const imageUrls = await Promise.all(
      files.map((file) => uploadToCloudinary(file.path))
    );

    const newProduct = new Product({
      name,
      price,
      category,
      offerPrice,
      stock,
      origin,
      image: imageUrls,
    });

    await newProduct.save();
    return newProduct;
  } catch (error) {
    return error.message;
  }
};

export default createProductService;
