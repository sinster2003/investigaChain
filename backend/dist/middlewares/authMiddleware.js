var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../config.js";
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtToken = req.headers["authorization"];
        const { emailAuth } = jwt.decode(jwtToken);
        if (emailAuth) {
            // type assertion of jwtPayload 
            const user = jwt.verify(jwtToken, JWT_SECRET);
            req.userId = user.userId;
            console.log(req.userId);
        }
        else {
            const client = new OAuth2Client();
            const ticket = yield client.verifyIdToken({
                idToken: jwtToken,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userId = payload === null || payload === void 0 ? void 0 : payload.sub;
            req.userId = userId;
            console.log(req.userId);
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Invalid token"
        });
    }
});
export default authMiddleware;
