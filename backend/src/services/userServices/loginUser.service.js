import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../../models/session.model.js";
import { validatePasswordLogin } from "../../utils/validates.js";
import { AppError } from "../../utils/error.js";
import { createCartService } from "../cartServices/createCart.service.js";

const loginUserService = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) {
    throw new AppError("Email and password are required!", 400);
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new AppError("Account does not exist! Please register", 404);
  }
  if (!(await validatePasswordLogin(password, existingUser.password))) {
    throw new AppError("Invalid password! Please try again", 401);
  }
  if (existingUser.loginCount === 0) {
    await createCartService(existingUser._id);
  }
  existingUser.loginCount += 1;
  await existingUser.save();
  const accessToken = jwt.sign(
    {
      id: existingUser._id,
      email: existingUser.email,
      role: existingUser.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    }
  );
  const refreshToken = crypto.randomBytes(64).toString("hex");
  const refreshTokenExpires = parseInt(process.env.REFRESH_TOKEN_EXPIRES) * 60 * 1000;
  await Session.create({
    userId: existingUser._id,
    refreshToken,
    expiresAt: new Date(Date.now() + refreshTokenExpires),
  });
  const { password: _pw, confirmPassword: _cpw, ...userWithoutPassword } = existingUser.toObject();
  return {
    user: userWithoutPassword,
    role: existingUser.role === 2 ? "admin" : (existingUser.role === 1 ? "shop" : "user"),
    accessToken,
    refreshToken,
    refreshTokenExpires,
  };
};

export default loginUserService;
