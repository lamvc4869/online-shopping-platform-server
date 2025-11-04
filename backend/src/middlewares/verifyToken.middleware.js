import jwt from "jsonwebtoken";
import { isBlacklisted } from "../utils/tokenBlacklist.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided, please log in",
        success: false,
      });
    }
    const accessToken = authHeader.substring("Bearer ".length);
    if (await isBlacklisted(accessToken)) {
      return res.status(401).json({
        message: "Token has been blacklisted, please log in again",
        success: false,
      });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Access token is invalid or has expired",
      success: false,
    });
  }
};

export default verifyToken;
