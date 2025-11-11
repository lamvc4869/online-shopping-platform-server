import createUserService from "../../services/userServices/registerUser.service.js";
import { AppError } from "../../utils/error.js";

const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUserService(userData);
    return res.status(201).json({
      message: "Registered successfully",
      success: true,
      user: newUser,
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
    });
  }
};

export default createUserController;
