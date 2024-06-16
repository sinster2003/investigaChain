import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 1,
        required: true
    },
    username: {
        type: String,
        minLength: 1,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    storyId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        required: true
    }]
});

// formatting the documents which is json stringified and sent to client
authorSchema.set("toJSON", {
    transform: (document, requestedDocumented) => {
        requestedDocumented.id = requestedDocumented._id;
        delete requestedDocumented._id;
        delete requestedDocumented.__v;
    }
});

const authorModel = mongoose.model("Author", authorSchema);

export default authorModel;