import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {
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
    images: {
        type: [String],
    },
    clippings: {
        type: [String],
    },
    articles: {
        type: [String],
    },
    references: {
        type: [String]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author"
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