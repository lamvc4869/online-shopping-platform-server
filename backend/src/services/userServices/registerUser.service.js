import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { validateUserDataRegister } from "../../utils/validates.js";

const createUserService = async (userData, res) => {
  validateUserDataRegister(userData, res);
  const hashedPassword = await bcrypt.hash(userData?.password, 10);
  const newUser = new User({
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    email: userData?.email,
    password: hashedPassword,
    role: userData?.role,
  });
  await newUser.save();
  const { password: _pw, walletId: _wl, voucherId: _vc, __v: _v, ...userWithoutPassword } = newUser.toObject();
  return {
    ...userWithoutPassword,
    role: newUser.role === 2 ? "admin" : (newUser.role === 1 ? "shop" : "user"),
  };
};

export default createUserService;
