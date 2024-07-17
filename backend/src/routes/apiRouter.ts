import express from "express";
import userRouter from "./userRouter.js";
import storyRouter from "./storyRouter.js";

// express.router
const apiRouter = express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/story", storyRouter);

export default apiRouter;