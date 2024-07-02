import { NextFunction, Response } from "express";
import { authRequest } from "./authMiddleware";
import userModel from "../models/user.js";

const metamaskMiddleware = async (req: authRequest, res: Response, next: NextFunction) => {
    try {
        const user = await userModel.findById(req.userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }
        
        if(!user?.metamask) {
            return res.status(400).json({
                message: "Please connect your wallet to access our services."
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

export default metamaskMiddleware;