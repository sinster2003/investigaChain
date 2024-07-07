import natural from "natural";
import stopword from "stopword";
import { ethers } from "ethers";
import express, { Request, Response } from "express";
import storyModel from "../models/story.js";
import { authGoogleController, authLoginController } from "../controllers/loginController.js";
import authSignupController from "../controllers/signupController.js";
import authMiddleware, { authRequest } from "../middlewares/authMiddleware.js";
import metamaskMiddleware, { metamaskType } from "../middlewares/metamaskMiddleware.js";
import { CHAIN_URL, CONTRACT_ADDRESS } from "../config.js";
import target from "../story.json";
import mongoose from "mongoose";

const userRouter = express.Router();

userRouter.post("/signup", authSignupController);
userRouter.post("/login", authLoginController);
userRouter.post("/google", authGoogleController);

userRouter.post("/uploadstory", authMiddleware, metamaskMiddleware, async (req: metamaskType, res: Response) => {
    // access the content of the story from the user
    const { title, content, keywords, images, clippings, articles, references } = req.body;
    const userId = req.userId;
    const metamask = req.metamask;
    
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            // store it in mongodb
            const storyDoc = new storyModel({
                title,
                content,
                keywords,
                articles,
                references,
                userId
            }, {
                session
            });

            await storyDoc.save();

            // images and clippings has to be stored in cloud

            // generate patterns to the story
            const tokenizer = new natural.WordTokenizer();
            const tokenizedWords = tokenizer.tokenize(content); // arrays of words
            const patternizedWords = stopword.removeStopwords(tokenizedWords);

            let patterns = patternizedWords.map(word => natural.PorterStemmer.stem(word));
            patterns = patterns.filter(word => word.length > 2);

            // store the patterns in mongodb
            storyDoc.patterns = patterns;
            await storyDoc.save();

            // generate a hash along with patterns using ethers
            const contentToBeHashed = `${storyDoc.content}${storyDoc.keywords.join("")}${storyDoc.patterns.join("")}${storyDoc.articles.join("")}${storyDoc.references.join("")}`
            const hashedContent = ethers.keccak256(ethers.toUtf8Bytes(contentToBeHashed));

            // store the story along with the storyId on chain
            console.log("Hash to store: ", hashedContent);
            
            const ABI = target.abi;
            const provider = new ethers.JsonRpcProvider(CHAIN_URL);
            const contract = new ethers.Contract(
                CONTRACT_ADDRESS as string,
                ABI,
                provider
            );

            const unsignedTx = await contract.addStory.populateTransaction([storyDoc._id, hashedContent, metamask]);
            
            unsignedTx.to = CONTRACT_ADDRESS as string;
            unsignedTx.from = metamask;

            console.log(unsignedTx);
            await session.commitTransaction();

            res.status(200).json(unsignedTx);
        }
        catch(error) {
            console.log(error);
            await session.abortTransaction();

            res.status(500).json({
                message: `Story upload unsuccessful`
            });
        }
        session.endSession();
    }
    catch(error) {
        res.status(500).json({
            message: "Session Error"
        });
    } 
});

userRouter.get("/getstory/:storyid", authMiddleware, async (req: Request, res: Response) => {
    // retrieve the storyId from the user
    const { storyid } = req.params;

    try {
        // retrieve the hash of the story from chain
        const ABI = target.abi;
        const provider = new ethers.JsonRpcProvider(CHAIN_URL);
        const contract = new ethers.Contract(
            CONTRACT_ADDRESS as string,
            ABI,
            provider
        );

        // retrieve from the story from mongodb
        const storyRetrieved = await storyModel.findById(storyid);
        
        if(!storyRetrieved) {
            return res.status(404).json({
                message: "Story not found."
            });
        }
        
        const storyFromChain = await contract.getStory(storyRetrieved._id);
        
        // compare the hash from blockchain and story retrieved from database
        // yet to be added the hash from blockchain
        const hashedContent = ethers.keccak256(ethers.toUtf8Bytes(`${storyRetrieved.content}${storyRetrieved.keywords.join("")}${storyRetrieved.patterns.join("")}${storyRetrieved.articles.join("")}${storyRetrieved.references.join("")}`));
        const contentFromChain = storyFromChain.storyContent;

        console.log(hashedContent + " " + contentFromChain);

        // if yes, deliver the story
        if(hashedContent === contentFromChain) {
            return res.status(400).json({
                story: storyRetrieved,
                message: "Story delivered successfully."
            });
        }
        else {
            return res.status(400).json({
                message: "Story verification failed. Could not be delivered."
            });
        }
    }
    catch(error) {
        res.status(500).json({
            message: `Story retrieval unsuccessful`
        });
    }
});

export default userRouter;