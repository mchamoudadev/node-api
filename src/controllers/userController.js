import User from "../models/User.js";

import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {

    // 404 not found
    // 500 server error
    // 403 unauthorized

    try {

        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).send({ status: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).send({ status: true, message: { username: user.username, email: user.email } });

    } catch (error) {
        console.log("error at user registration", error);
        res.status(500).send({ status: false, message: "unknown error" });
    }


};

export const loginUser = (req, res) => {
    res.send("thsi sis me 🤣");
};