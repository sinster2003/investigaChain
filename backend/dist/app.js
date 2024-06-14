import express from "express";
import connectDb from "./db/connectDb.js";
connectDb(); // asynchronously connects database
const app = express(); // web server
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
export default app;
