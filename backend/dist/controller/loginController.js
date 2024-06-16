var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
const authLoginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        // retrieve the user trying to login
        const user = yield userModel.findOne({
            $or: [
                { username },
                { email: username }
            ]
        });
        if (!user) {
            return res.status(404).json({
                message: "User does not exist in the database. Please signup!"
            });
        }
        if (user.googleAuth) {
            return res.status(404).json({
                message: "User signedup using google auth. Please signin with google!"
            });
        }
        const passwordEqual = yield bcrypt.compare(password, user.password);
        if (!passwordEqual) {
            return res.status(400).json({
                message: "Invalid user credentials!"
            });
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
        };
        res.status(200).json(Object.assign(Object.assign({}, userObject), { token }));
    }
    catch (error) {
        console.log(error);
        next();
    }
});
const authGoogleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, account, profile } = req.body;
    try {
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const loggedInUser = yield userModel.findOne({ authOId: user.id });
        // if no user in database create a new google auth user
        if (!loggedInUser) {
            const newUser = new userModel({
                authOId: user.id,
                name: user.name,
                username: user.email,
                email: user.email,
                password: yield bcrypt.hash(user.email, 10),
                googleAuth: true
            });
            yield newUser.save();
        }
        res.status(200).json({ user, account, profile });
    }
    catch (error) {
        console.log(error);
        next();
    }
});
export { authLoginController, authGoogleController };
