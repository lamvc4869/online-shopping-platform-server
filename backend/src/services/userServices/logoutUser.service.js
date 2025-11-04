import User from "../../models/user.model.js";
import { addToBlacklist } from "../../utils/tokenBlacklist.js";

const logoutUserService = async (userId, token) => {
  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return "User không tồn tại";
    }

    if (token) {
      addToBlacklist(token);
    }

    return "Đăng xuất thành công";
  } catch (error) {
    return error.message;
  }
};

export default logoutUserService;
