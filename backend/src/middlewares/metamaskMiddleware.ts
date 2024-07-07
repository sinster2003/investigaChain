import { NextFunction, Response } from "express";
import { authRequest } from "./authMiddleware";

export interface metamaskType extends authRequest{
    metamask?: string
}

const metamaskMiddleware = async (req: metamaskType, res: Response, next: NextFunction) => {
    try {
        const { metamask } : { metamask: string | null } = req.body;
        
        if(!metamask) {
            return res.status(400).json({
                message: "Please connect your wallet to access our services."
            });
        }

        if(!metamask?.startsWith("0x")) {
            return res.status(400).json({
                message: "Invalid metamask address"
            });
        }
        
        // add public addres to req object
        req.metamask = metamask;

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