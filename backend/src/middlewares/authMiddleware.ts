import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../config.js";

// to make sure multiple properties can be added in Request type
interface authRequest extends Request {
    userId?: string 
} 

const authMiddleware = async (req: authRequest, res: Response, next: NextFunction) => {
    try {
        const jwtToken = req.headers["authorization"];
        const { emailAuth } = jwt.decode(jwtToken as string) as JwtPayload;
        
        // for email auth verify jwt_token
        if(emailAuth) {
            // type assertion of jwtPayload 
            const user = jwt.verify(jwtToken as string, JWT_SECRET as string) as JwtPayload;
            req.userId = user.userId;
            console.log(req.userId);
        }
        // for google auth verify id_token
        else {
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: jwtToken as string,
                audience: GOOGLE_CLIENT_ID
            });
            const payload = ticket.getPayload();
            const userId = payload?.sub;
            req.userId = userId;
            console.log(req.userId);
        }
        next();
    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            message: "Invalid token"
        })
    }
}

export default authMiddleware;