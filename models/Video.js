import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required"
    },
    title: {
        type:String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    CreatedAt: {
        type: Date,
        Default: Date.now  //whenever i save document its going to execute Date
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const model = mongoose.model("Video", VideoSchema);
export default model;