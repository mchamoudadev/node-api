import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
    }

);

const Post = mongoose.model('Post', postSchema);

export default Post;