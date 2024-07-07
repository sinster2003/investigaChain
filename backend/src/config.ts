import dotenv from "dotenv"; // config env

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CHAIN_URL = process.env.CHAIN_URL;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

export {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    CHAIN_URL,
    CONTRACT_ADDRESS
}