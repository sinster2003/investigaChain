import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./db/connectDb.js";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/apiRouter.js";

connectDb(); // asynchronously connects database

const app = express(); // web server

const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true
}

// converts json to js and makes it available in req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsConfig));
app.use(cookieParser());

// express router
app.use("/api", apiRouter);

// to catch errors
app.use(errorHandler);

export default app;