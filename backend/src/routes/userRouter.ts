import natural from "natural";
import stopword from "stopword";
import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import storyModel from "../models/story.js";
import { authGoogleController, authLoginController } from "../controller/loginController.js";
import authSignupController from "../controller/signupController.js";
import authMiddleware, { authRequest } from "../middlewares/authMiddleware.js";
import metamaskMiddleware from "../middlewares/metamaskMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", authSignupController);
userRouter.post("/login", authLoginController);
userRouter.post("/google", authGoogleController);

userRouter.post("/uploadstory", authMiddleware, metamaskMiddleware, async (req: authRequest, res: Response) => {
    // access the content of the story from the user
    const { title, content, keywords, images, clippings, articles, references } = req.body;
    const userId = req.userId;
    
    try {
        // store it in mongodb
        const storyDoc = new storyModel({
            title,
            content,
            keywords,
            articles,
            references,
            userId
        });

        await storyDoc.save();

        // images and clippings has to be stored in cloud

        // generate patterns to the story
        const tokenizer = new natural.WordTokenizer();
        const tokenizedWords = tokenizer.tokenize(content); // arrays of words
        const patternizedWords = stopword.removeStopwords(tokenizedWords);

        const patterns = patternizedWords.map(word => natural.PorterStemmer.stem(word));

        // store the patterns in mongodb
        storyDoc.patterns = patterns;
        await storyDoc.save();

        // generate a hash along with patterns
        const saltRounds = await bcrypt.genSalt(10);
        const contentToBeHashed = `${storyDoc.content}${storyDoc.keywords.join("")}${storyDoc.patterns.join("")}${storyDoc.articles.join("")}${storyDoc.references.join("")}`
        const hashedContent = await bcrypt.hash(contentToBeHashed, saltRounds);

        // store the story along with the storyId on chain
        console.log("Hash to store: ", hashedContent);

        res.status(200).json({
            message: `${storyDoc._id} successfully uploaded`
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            message: `Story upload unsuccessful`
        });
    }
});

userRouter.get("/getstory/:storyid", authMiddleware, async (req: Request, res: Response) => {
    // retrieve the storyId from the user
    const { storyid } = req.params;

    try {
        // retrieve the hash of the story from chain

        // retrieve from the story from mongodb
        const storyRetrieved = await storyModel.findById(storyid);

        if(!storyRetrieved) {
            return res.status(404).json({
                message: "Story not found."
            });
        }

        // compare the hash from blockchain and story retrieved from database
        // yet to be added the hash from blockchain
        const contentEqual = await bcrypt.compare(`${storyRetrieved.content}${storyRetrieved.keywords.join("")}${storyRetrieved.patterns.join("")}${storyRetrieved.articles.join("")}${storyRetrieved.references.join("")}`, "");

        // if yes, deliver the story
        if(contentEqual) {

        }
        else {

        }
    }
    catch(error) {
        res.status(500).json({
            message: `Story retrieval unsuccessful`
        });
    }
});

export default userRouter;