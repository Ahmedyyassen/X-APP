import { verifyToken } from "../utils/jsonwebtoken.js";
const optionalAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.userId = null;
        return next();
    }
    try {
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        req.username = decoded.username;
    }
    catch {
        req.userId = null; // invalid token → treat as guest
    }
    next();
};
export default optionalAuth;
