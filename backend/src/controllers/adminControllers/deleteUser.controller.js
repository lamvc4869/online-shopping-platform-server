import deleteUserService from "../../services/adminServices/deleteUser.service.js";

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await deleteUserService(userId);

    return res.status(200).json({
      message: result,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export default deleteUserController;
