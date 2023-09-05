import Post from "../models/Post.js";


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



export const getPostById = async (req, res) => {
    try {

        const postId = req.params.id;
        const post = await Post.findById(postId).populate("author", "-password");

        if (!post) {
            return res.status(400).send({ status: false, message: "unknown post" });
        }

        return res.status(200).send({ status: true, message: post });

    } catch (err) {
        console.log("error getting post", err);
        return res.status(400).send({ status: false, message: "something went wrong" });
    }
};

export const getPosts = async (req, res) => {

    try {
        const posts = await Post.find().populate("author", "-password").sort({ createdAt: -1 });

        return res.status(200).send(posts);
    } catch (err) {
        console.log("error getting posts", err);
    }

};


export const updatePost = async (req, res) => {
    try {

        const { title, content } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).send("Not Found");

        // get current user

        const currentUser = req.user._id;

        if (currentUser.toString() !== post.author.toString()) {
            return res.status(403).send("posts must update the original author ");
        }

        // update post now
        await Post.findOneAndUpdate({ _id: req.params.id }, { title, content }, { new: true });

        res.status(200).send("updated successfully");

    } catch (err) {
        console.log("error updating post", err);
        res.status(400).send("error updating post");
    }
};

// TODO: delete specific post


export const deletePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).send("Not Found");

        // get current user

        const currentUser = req.user._id;

        if (currentUser.toString() !== post.author.toString()) {
            return res.status(403).send("posts must delete the original author ");
        }

        await Post.findByIdAndRemove(req.params.id);

        res.status(200).send("deleted successfully");

    } catch (err) {
        console.log("error deleting post", err);
        res.status(404).send("error deleting post");
    }
};