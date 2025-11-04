import logoutUserService from "../../services/userServices/logoutUser.service.js";
import { AppError } from "../../utils/error.js";

const logoutUserController = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const accessToken = req.headers.authorization?.split(" ")[1];
    await logoutUserService(accessToken, refreshToken);
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({
      message: "Logout successfully!",
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
    });
  }
};

export default logoutUserController;
