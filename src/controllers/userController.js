import User from "../models/User.js";

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { JWT_Secret } from "../config/config.js";

export const registerUser = async (req, res) => {

    // 404 not found
    // 500 server error
    // 403 unauthorized

    try {

        const { username, email, password } = req.body;

        const userExists = await User.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }  // Assuming you meant 'username' instead of 'useraname'
            ]
        });

        if (userExists) {
            if (userExists.email === email.toLowerCase()) {
                return res.status(400).send({ status: false, message: "email already exists" });
            } else if (userExists.username === username.toLowerCase()) {
                return res.status(400).send({ status: false, message: "Username already exists" });
            }
        } else {
            console.log('No user found with this email or username. You can proceed.');
        }



        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword
        });

        await user.save();

        res.status(201).send({ status: true, message: { username: user.username, email: user.email } });

    } catch (error) {
        console.log("error at user registration", error);
        res.status(500).send({ status: false, message: "unknown error" });
    }


};

export const loginUser = async (req, res) => {
    //  validation user
    // secure
    // JWT token 

    try {


        const { username, password } = req.body;

        // checking from database

        const isExists = await User.findOne({ username: username.toLowerCase() });

        if (!isExists) {
            return res.status(400).send({ status: false, message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(password, isExists.password);

        if (!validPassword) {
            return res.status(400).send({ status: false, message: "Invalid username or password" });
        }


        // JWT Authentication


        const token = jwt.sign({ _id: isExists._id }, JWT_Secret);

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).send({
            status: true,
            message: {
                _id: isExists._id,
                username: isExists.username,
                email: isExists.email,
            }
        });
    } catch (err) {
        console.log("error at login", err);
    }


};