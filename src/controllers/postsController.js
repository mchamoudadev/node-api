import Post from "../models/Post.js";
import expressAsyncHandler from "express-async-handler";

export const createPost = async (req, res) => {

    try {

        const newPost = new Post({ ...req.body, author: req.user._id });

        await newPost.save();

        res.status(200).send({ status: 'success', message: newPost });

    } catch (err) {
        console.log("error createPost", err);
        res.status(400).send({ status: "error", message: "give another shot 😊" });
    }

};