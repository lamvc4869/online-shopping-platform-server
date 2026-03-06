import updateUserService from "../../services/sharedServices/updateUser.service.js";

const updateUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    const updateFile = req.file;

    if (updateData?.role && !["user", "admin"].includes(updateData.role)) {
      return res.status(400).json({
        message: "Invalid role",
        success: false,
      });
    }

    const result = await updateUserService(userId, updateData, updateFile);

    if (typeof result === "string") {
      return res.status(400).json({
        message: result,
        success: false,
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
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

export default updateUserController;
