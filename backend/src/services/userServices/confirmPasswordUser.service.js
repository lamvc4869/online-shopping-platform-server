import User from "../../models/user.model.js";
import { AppError } from "../../utils/error.js";
import bcrypt from "bcrypt";

const confirmPasswordUserService = async (userId, passwordData) => {
  const existingUser = await User.findById(userId);
  if (!existingUser) {
    throw new AppError("User not found", 404);
  }
  const { confirmPassword } = passwordData;
  if (!confirmPassword) {
    throw new AppError("Confirm password is required", 400);
  }
  const isMatch = await bcrypt.compare(confirmPassword, existingUser.password);
  if (!isMatch) {
    throw new AppError("Password and confirm password do not match", 400);
  }
  return "Password and confirm password match successfully";
};

export default confirmPasswordUserService;
