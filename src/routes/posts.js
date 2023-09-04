import express from 'express';
import { createPost } from '../controllers/postsController.js';
import { validatePostRegistration } from '../validators/postValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const postsRouter = express.Router();

postsRouter.post('/', validatePostRegistration, authenticate, createPost);
postsRouter.get('/see', (req, res) => { res.send("hi ..."); });

export default postsRouter;