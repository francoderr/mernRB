import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type:String,
        default: ''
    },
    message: {
        type:String,
        default: ''
    },
    creator: {
        type:String,
        default: ''
    },
    tags: {
        type:[String],
        default: ''
    },
    selectedFile: {
        type:String,
        default: ''
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage;