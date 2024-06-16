import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    authOId: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        minLength: 1,
        required: true
    },
    username: {
        type: String,
        minLength: 1,
        unique: true,
        required: true
    },
    email: {
        type: String,
        validate: {
            validator: (email: string) => {
                return /\S+\@+\S+\.+\S{2,}/.test(email)
            }
        },
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    googleAuth: {
        type: Boolean,
        default: false,
        required: true
    }
});

// formatting the documents which is json stringified and sent to client
userSchema.set("toJSON", {
    transform: (document, requestedDocumented) => {
        requestedDocumented.id = requestedDocumented._id;
        delete requestedDocumented._id;
        delete requestedDocumented.__v;
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;