import createBrandService from "../../services/adminServices/createBrand.service.js";
import { AppError } from "../../utils/error.js";

const createBrandController = async (req, res) => {
  try {
    const brandData = req.body;

    const brand = await createBrandService(brandData);

    return res.status(201).json({
      message: "Tạo thương hiệu thành công",
      success: true,
      data: brand,
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
      error: error.message,
    });
  }
};

export default createBrandController;

