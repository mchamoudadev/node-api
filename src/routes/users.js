import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import { validateUserRegistration } from '../validators/userValidator.js';

const usersRouter = express.Router();


// usersRouter.route('/')

usersRouter.post('/register-user', validateUserRegistration, registerUser);
usersRouter.post('/login', loginUser);

export default usersRouter;