import zod from "zod";

// validation for signup
const signinObject = zod.object({
    username: zod.string().min(1, {
        message: "Username has to atleast of 1 character long."
    }),
    password: zod.string().min(6, {
        message: "Password has to atleast 6 characters long."
    })
});

export default signinObject;