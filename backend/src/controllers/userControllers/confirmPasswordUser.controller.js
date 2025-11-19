import confirmPasswordUserService from "../../services/userServices/confirmPasswordUser.service.js";
import { AppError } from "../../utils/error.js";

const confirmPasswordUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const passwordData = req.body;
    const result = await confirmPasswordUserService(userId, passwordData);
    return res.status(200).json({
      message: result,
      success: true,
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
      error: error.message,
      success: false,
    });
  }
};

export default confirmPasswordUserController;
