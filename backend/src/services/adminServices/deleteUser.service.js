import User from "../../models/user.model.js";

const deleteUserService = async (userId) => {
  try {
    if (!userId) {
      return "User ID is required";
    }

    const user = await User.findById(userId);
    if (!user) {
      return "User not found";
    }

    if (user.role === "admin") {
      return "Admin accounts cannot be deleted";
    }

    await User.findByIdAndDelete(userId);
    return "User deleted successfully";
  } catch (error) {
    return error.message;
  }
};

export default deleteUserService;
