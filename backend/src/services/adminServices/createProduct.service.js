import Product from "../../models/product.model.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";
import {
  validateProductData,
  validateBrandExists,
  validateProductNameUnique,
} from "../../utils/validates.js";

const createProductService = async (productData, files, adminId) => {
  const {
    name,
    price,
    category,
    brandId,
    offerPrice,
    stock,
    origin,
    description,
    subCategory,
    unit,
    bestseller,
  } = productData;

  await validateProductData(productData, files);

  await validateBrandExists(brandId);

  await validateProductNameUnique(name);

  const imageUrls = await Promise.all(
    files.map((file) => uploadToCloudinary(file.path))
  );

  const newProduct = new Product({
    createdBy: adminId,
    brandId,
    name: name.trim(),
    price: Number(price),
    category,
    image: imageUrls,
    // Optional fields - only include if provided
    ...(description && { description }),
    ...(offerPrice && { offerPrice: Number(offerPrice) }),
    ...(subCategory && { subCategory }),
    ...(unit && { unit }),
    ...(origin && { origin }),
    ...(stock !== undefined && stock !== null && { stock: Number(stock) }),
    ...(bestseller !== undefined && { bestseller: Boolean(bestseller) }),
  });

  await newProduct.save();

  await newProduct.populate("brandId", "brandName brandAdress");
  await newProduct.populate("createdBy", "firstName lastName email");

  return newProduct;
};

export default createProductService;
