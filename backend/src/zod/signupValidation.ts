import zod from "zod";

// validation for signup
const signupObject = zod.object({
    name: zod.string().min(1, {
        message: "Name has to atleast of 1 character long."
    }), 
    username: zod.string().min(1, {
        message: "Username has to atleast of 1 character long."
    }), 
    email: zod.string().email({
        message: "Email is invalid"
    }), 
    password: zod.string().min(6, {
        message: "Password has to atleast 6 characters long."
    })
});

export default signupObject;