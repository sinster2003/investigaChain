import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    console.log(req.cookies["next-auth.session-token"]);
    console.log(process.env.JWT_SECRET);
    const user = jwt.decode(req.cookies["next-auth.session-token"]);
    console.log(user);
    next();
};
export default authMiddleware;
