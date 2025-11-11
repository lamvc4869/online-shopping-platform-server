import Session from "../../models/session.model.js";
import { addTokenToBlacklist, isBlacklisted } from "../../utils/tokenBlacklist.js";
import { AppError } from "../../utils/error.js";

const logoutUserService = async (accessToken, refreshToken) => {
    if (!refreshToken) {
        throw new AppError("Refresh token is required", 400);
    }
    const session = await Session.findOneAndDelete({ refreshToken });
    if (!session) {
        throw new AppError("Session not found", 404);
    }       
    if (accessToken && !(await isBlacklisted(accessToken))) {
        await addTokenToBlacklist(accessToken);
    }
};

export default logoutUserService;
