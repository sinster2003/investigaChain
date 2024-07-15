import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID, JWT_SECRET } from "../config.js";
import userModel from "../models/user.js";
import { ObjectId } from "mongodb";

// to make sure multiple properties can be added in Request type
export interface authRequest extends Request {
    userId?: string | ObjectId
} 

const authMiddleware = async (req: authRequest, res: Response, next: NextFunction) => {
    try {
        console.log(req);
        const jwtToken = req.body.headers["Authorization"];
        console.log("jwt", jwtToken);
        const decodedJwt = jwt.decode(jwtToken as string) as JwtPayload;
        let userPresent = null;

        // for email auth verify jwt_token
        if(decodedJwt.emailAuth) {
            // type assertion of jwtPayload 
            const user = jwt.verify(jwtToken as string, JWT_SECRET as string) as JwtPayload;
            req.userId = user.userId;
            userPresent = await userModel.findById(req.userId);
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
            userPresent = await userModel.findOne({authOId: userId});
            req.userId = userPresent?._id as ObjectId; // so the userId is the ObjectId and not authOId sent to next middleware
            console.log(req.userId);
        }

        if(!userPresent) {
            return res.status(404).json({
                message: "User not found"
            });
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