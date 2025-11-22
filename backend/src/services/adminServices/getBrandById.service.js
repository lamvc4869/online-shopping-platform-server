import Brand from "../../models/brand.model.js";
import { AppError } from "../../utils/error.js";

const getBrandByIdService = async (brandId) => {
  if (!brandId) {
    throw new AppError("Brand ID là bắt buộc", 400);
  }

  const brand = await Brand.findById(brandId);

  if (!brand) {
    throw new AppError("Brand không tồn tại", 404);
  }

  return brand;
};

export default getBrandByIdService;

