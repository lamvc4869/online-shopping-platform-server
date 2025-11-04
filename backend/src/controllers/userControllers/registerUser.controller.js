import createUserService from "../../services/userServices/registerUser.service.js";

const createUserController = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUserService(userData, res);
    return res.status(201).json({
      message: "Registered successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default createUserController;
