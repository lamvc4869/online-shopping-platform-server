// Làm nhanh, sau này cần chỉnh sửa
import User from "../../models/user.model.js";

const getUserByIdService = async (userId) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getUserByIdService;
