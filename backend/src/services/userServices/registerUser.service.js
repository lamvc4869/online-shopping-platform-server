import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import { validateUserDataRegister } from "../../utils/validates.js";

const createUserService = async (userData) => {
  await validateUserDataRegister(userData);
  const { email, password, role = 0, firstName, lastName } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });
  await newUser.save();
  const { password: _pw, walletId: _wl, voucherId: _vc, __v: _v, ...userWithoutPassword } = newUser.toObject();
  return {
    ...userWithoutPassword,
    role: newUser.role === 2 ? "admin" : (newUser.role === 1 ? "shop" : "user"),
  };
};

export default createUserService;
