import express from 'express';
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/postsController.js';
import { validatePostRegistration } from '../validators/postValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const postsRouter = express.Router();

// postsRouter.post('/', validatePostRegistration, authenticate, createPost);
// postsRouter.get('/get-post/:id', getPostById);
// postsRouter.get('/get-posts', getPosts);
// postsRouter.post('/update-post/:id', authenticate, updatePost);
// postsRouter.delete('/delete-post/:id', authenticate, deletePost);

// combination

postsRouter.route("/:id")
    .get(getPostById)
    .put(authenticate, updatePost)
    .delete(authenticate, deletePost);

postsRouter.route("/")
    .post(validatePostRegistration, authenticate, createPost)
    .get(getPosts);



export default postsRouter;