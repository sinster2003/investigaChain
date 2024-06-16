import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

const generateToken = (userId: ObjectId | String, res: Response) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string);
    return token;
}

export default generateToken;