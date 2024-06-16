import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { NextFunction, Request, Response } from "express";

const authLoginController = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    console.log(username, password);
    try {
        // retrieve the user trying to login
        const user = await userModel.findOne({
            $or: [
                { username },
                { email: username }
            ]
        });

        if(!user) {
            return res.status(404).json({
                message: "User does not exist in the database. Please signup!"
            });
        }

        if(user.googleAuth) {
            return res.status(404).json({
                message: "User signedup using google auth. Please signin with google!"
            });
        }

        const passwordEqual = await bcrypt.compare(password, user.password as string);

        if(!passwordEqual) {
            return res.status(400).json({
                message: "Invalid user credentials!"
            })
        }

        // @ts-ignore
        const token = generateToken(user._id, res);

        // secure transmission
        // @ts-ignore
        user.password = null;

        const userObject = {
            name: user.name,
            username: user.username,
            email: user.email,
        }

        res.status(200).json({ ...userObject, token });
    }
    catch(error) {
        console.log(error);
        next();
    }
}

const authGoogleController = async (req: Request, res: Response, next: NextFunction) => {
    const { user, account, profile } = req.body;

    try {
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        
        const loggedInUser =  await userModel.findOne({ authOId: user.id });

        // if no user in database create a new google auth user
        if(!loggedInUser) {
            const newUser = new userModel({
                authOId: user.id,
                name: user.name,
                username: user.email,
                email: user.email,
                password: await bcrypt.hash(user.email, 10),
                googleAuth: true
            });

            await newUser.save();
        }

        res.status(200).json({ user, account, profile });
    }
    catch(error) {
        console.log(error);
        next();
    }
}

export { authLoginController, authGoogleController };