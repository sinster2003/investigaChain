import jwt from "jsonwebtoken";
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId, emailAuth: true }, process.env.JWT_SECRET);
    return token;
};
export default generateToken;
