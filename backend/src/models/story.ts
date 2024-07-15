import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        minLength: 500,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    },
    patterns: {
        type: [String],
        required: true
    },
    references: {
        type: [String],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

// formatting the documents which is json stringified and sent to client
storySchema.set("toJSON", {
    transform: (document, requestedDocumented) => {
        requestedDocumented.id = requestedDocumented._id;
        delete requestedDocumented._id;
        delete requestedDocumented.__v;
    }
});

const storyModel = mongoose.model("Story", storySchema);

export default storyModel;