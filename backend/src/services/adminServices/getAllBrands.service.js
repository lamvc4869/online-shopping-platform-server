import Brand from "../../models/brand.model.js";

const getAllBrandsService = async () => {
  const brands = await Brand.find().sort({ createdAt: -1 });
  return brands;
};

export default getAllBrandsService;

