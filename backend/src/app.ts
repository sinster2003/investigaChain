import { Request, Response } from "express";

import express from "express";
import connectDb from "./db/connectDb.js";

connectDb(); // asynchronously connects database

const app = express(); // web server

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World" });
});

export default app;