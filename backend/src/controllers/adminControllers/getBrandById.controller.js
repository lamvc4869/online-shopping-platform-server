import getBrandByIdService from "../../services/adminServices/getBrandById.service.js";
import { AppError } from "../../utils/error.js";

const getBrandByIdController = async (req, res) => {
  try {
    const { brandId } = req.params;

    const brand = await getBrandByIdService(brandId);

    return res.status(200).json({
      message: "Brand details fetched successfully",
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
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export default getBrandByIdController;
