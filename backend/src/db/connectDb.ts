import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

// connects the mongodb database
const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URI || "");
        console.log("Database connected.");
    }
    catch(error) {
        mongoose.connection.close();
        console.log("Database connection terminated.");
    }
}

export default connectDb;