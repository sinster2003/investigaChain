import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authGoogleController, authLoginController } from "../controller/loginController.js";
import storyModel from "../models/story.js";

const userRouter = express.Router();

userRouter.post("/login", authLoginController);
userRouter.post("/google", authGoogleController);

userRouter.post("/uploadstory", authMiddleware, async (req: Request, res: Response) => {
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

    await storyDoc.save();

    // generate patterns to the story
    // store the patterns in mongodb
    // generate a hash along with patterns
    // store the story along with the storyId on chain
});

userRouter.get("/getstory/:storyid", authMiddleware, (req: Request, res: Response) => {
    // retrieve the storyId from the user
    // retrieve the hash of the story from chain
    // retriev from the story from mongodb
    // generate the hash
    // compare the hash
    // if yes, deliver the story
    // if no, story verification fails
    res.status(200).json({message: "Storyyy"});
});

export default userRouter;