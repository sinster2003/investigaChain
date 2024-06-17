var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authGoogleController, authLoginController } from "../controller/loginController.js";
import storyModel from "../models/story.js";
const userRouter = express.Router();
userRouter.post("/login", authLoginController);
userRouter.post("/google", authGoogleController);
userRouter.post("/uploadstory", authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // access the content of the story from the user
    const { title, content, keywords, images, clippings, articles, references } = req.body;
    // store it in mongodb
    const storyDoc = new storyModel({
        title,
        content,
        keywords,
        images,
        clippings,
        articles,
        references
    });
    yield storyDoc.save();
    // generate patterns to the story
    // store the patterns in mongodb
    // generate a hash along with patterns
    // store the story along with the storyId on chain
}));
userRouter.get("/getstory/:storyid", authMiddleware, (req, res) => {
    // retrieve the storyId from the user
    // retrieve the hash of the story from chain
    // retriev from the story from mongodb
    // generate the hash
    // compare the hash
    // if yes, deliver the story
    // if no, story verification fails
    res.status(200).json({ message: "Storyyy" });
});
export default userRouter;
