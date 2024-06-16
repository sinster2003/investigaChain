import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { authGoogleController, authLoginController } from "../controller/loginController.js";
const userRouter = express.Router();
userRouter.post("/login", authLoginController);
userRouter.post("/google", authGoogleController);
userRouter.post("/uploadstory", (req, res) => {
    // access the content of the story from the user
    // store it in mongodb
    // generate patterns to the story
    // store the patterns in mongodb
    // generate a hash along with patterns
    // store the story along with the storyId on chain
});
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
