import loginUserService from "../../services/userServices/loginUser.service.js";
import ms from "ms";

const loginUserController = async (req, res) => {
  try {
    const userData = req.body;
    const result = await loginUserService(userData, res);
    const { user, accessToken, refreshToken, refreshTokenExpires } = result;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: refreshTokenExpires,
    });
    return res.status(200).json({
      message: "Login successfully!",
      success: true,
      user: user,
      accessToken: accessToken,
      refreshToken: refreshToken,
      refreshTokenExpires: ms(refreshTokenExpires, { long: true }),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export default loginUserController;
