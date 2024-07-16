import mongoose from "mongoose";
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

//@ts-ignore
import target from "../story.json" assert { type: "json" };

const userRouter = express.Router();

userRouter.post("/signup", authSignupController);
userRouter.post("/login", authLoginController);
userRouter.post("/google", authGoogleController);

userRouter.get("/getallstories", async (req: Request, res: Response) => {
    try {
        const stories = await storyModel.find({});
        return res.status(200).json(stories);
    }
    catch(error) {
        console.log(error);
    }
});

userRouter.post("/uploadstory", authMiddleware, metamaskMiddleware, async (req: metamaskType, res: Response) => {
    // access the content of the story from the user
    const { title, content, keywords, description, references } = req.body;
    const userId = req.userId;
    const metamask = req.metamask;
    
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        // zod validation has to be added
        
        try {
            // store it in mongodb
            const storyDoc = new storyModel({
                title,
                content,
                keywords,
                description,
                references,
                userId
            });

            await storyDoc.save({ session });

            // images and clippings has to be stored in cloud

            // generate patterns to the story
            const tokenizer = new natural.WordTokenizer();
            const tokenizedWords = tokenizer.tokenize(content); // arrays of words
            const patternizedWords = stopword.removeStopwords(tokenizedWords);

            let patterns = patternizedWords.map(word => natural.PorterStemmer.stem(word));
            patterns = patterns.filter(word => word.length > 2);

            // store the patterns in mongodb
            storyDoc.patterns = patterns;
            await storyDoc.save({ session });

            // generate a hash along with patterns using ethers
            const contentToBeHashed = `${storyDoc.title}${storyDoc.description}${storyDoc.content}${storyDoc.keywords.join("")}${storyDoc.patterns.join("")}${storyDoc.references.join("")}`
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

            const args = [storyDoc._id.toString(), hashedContent, metamask];
            const unsignedTx = await contract.addStory.populateTransaction(...args);
            
            unsignedTx.to = CONTRACT_ADDRESS as string;
            unsignedTx.from = metamask;

            console.log(unsignedTx);
            await session.commitTransaction();

            res.status(200).json({unsignedTx, contract});
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

userRouter.get("/getstory/:storyid", async (req: Request, res: Response) => {
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
        const storyDoc = await storyModel.findById(storyid);
        
        if(!storyDoc) {
            return res.status(404).json({
                message: "Story not found."
            });
        }
        
        const storyFromChain = await contract.getStory(storyDoc._id.toString());
        
        // compare the hash from blockchain and story retrieved from database
        // yet to be added the hash from blockchain
        const hashedContent = ethers.keccak256(ethers.toUtf8Bytes(`${storyDoc.title}${storyDoc.description}${storyDoc.content}${storyDoc.keywords.join("")}${storyDoc.patterns.join("")}${storyDoc.references.join("")}`));
        const contentFromChain = storyFromChain.storyContent;

        console.log(hashedContent + " " + contentFromChain);

        // if yes, deliver the story
        if(hashedContent === contentFromChain) {
            return res.status(400).json({
                story: storyDoc,
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
        console.log(error)
        res.status(500).json({
            message: `Story retrieval unsuccessful`
        });
    }
});

export default userRouter;