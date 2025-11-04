import loginUserService from "../../services/userServices/loginUser.service.js";

const loginUserController = async (req, res) => {
  try {
    const userData = req.body;
    const result = await loginUserService(userData);

    if (typeof result === "string") {
      return res.status(400).json({
        message: result,
        success: false,
      });
    }
    
    return res.status(200).json({
      message: "Đăng nhập thành công",
      success: true,
      user: result.user,
      accessToken: result.accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};
export default loginUserController;
