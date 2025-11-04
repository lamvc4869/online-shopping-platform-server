import logoutUserService from "../../services/userServices/logoutUser.service.js";

const logoutUserController = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.substring("Bearer ".length) : null;
    
    const result = await logoutUserService(userId, token);
    if (result === "User không tồn tại") {
      return res.status(404).json({
        message: result,
        success: false,
      });
    }
    return res.status(200).json({
      message: result,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default logoutUserController;
