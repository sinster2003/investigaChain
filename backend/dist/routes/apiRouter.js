import express from "express";
import userRouter from "./userRouter.js";
// express.router
const apiRouter = express.Router();
apiRouter.use("/users", userRouter);
export default apiRouter;
