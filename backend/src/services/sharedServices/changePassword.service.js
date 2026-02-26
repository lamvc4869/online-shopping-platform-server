import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId);
  if (!user) return "User not found";

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) return "Current password is incorrect";

  const comparePassword = currentPassword === newPassword;
  if (comparePassword)
    return "New password must be different from the current one";

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  return "Password changed successfully";
};

export default changePasswordService;
