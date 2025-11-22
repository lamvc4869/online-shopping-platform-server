import Brand from "../../models/brand.model.js";
import { validateBrandData } from "../../utils/validates.js";

const createBrandService = async (brandData) => {
  const { brandName, brandAdress } = brandData;

  await validateBrandData(brandData);

  const newBrand = new Brand({
    brandName: brandName.trim(),
    brandAdress: brandAdress.trim(),
  });

  await newBrand.save();

  return newBrand;
};

export default createBrandService;

