import getAllUsersService from "../../services/adminServices/getAllUsers.service.js";

const getAllUsersController = async (req, res) => {
  try {
    const result = await getAllUsersService();

    return res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export default getAllUsersController;
