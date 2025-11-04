import createUserService from "../../services/userServices/registerUser.service.js";

const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUserService(userData);

    if (
      newUser === "Không được nhập thiếu thông tin nào" ||
      newUser === "Email đã được sử dụng"
    ) {
      return res.status(400).json({
        message: newUser,
        success: false,
      });
    }

    return res.status(200).json({
      message: "create user successfully!",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

export default createUserController;
