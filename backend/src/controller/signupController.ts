import { NextFunction, Request, Response } from "express";
import userModel from "../models/user.js";
import bcrypt from 'bcrypt';
import signupObject from "../zod/signupValidation.js";

const authSignupController = async (req: Request, res: Response, next: NextFunction) => {
    // retrieve signup info
    const { name, username, email, password } = req.body;

    // zod validation
    const zodResult = signupObject.safeParse({
        name,
        username,
        email,
        password
    });

    if(!zodResult.success) {
        return res.status(400).json({
            message: zodResult.error.message
        })
    }

    try {
        // check if present in database
        const user = await userModel.findOne({
            username
        });

        if(user) {
            return res.status(400).json({
                message: `${user} already present. Please signup!`
            });
        }

        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new userModel({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
    }
    catch(error) {
        console.log(error);
        next();
    }
}

export default authSignupController;