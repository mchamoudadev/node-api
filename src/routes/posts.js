import express from 'express';
import { createPost } from '../controllers/postsController.js';

const postsRouter = express.Router();

postsRouter.get('/', createPost);

export default postsRouter;